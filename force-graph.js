/* ==========================================================
   Custom force-directed graph for graf.html
   No external deps. Verlet-ish integration.
   ========================================================== */

(function () {
  const { NODES, EDGES, COMMUNITIES, SCORES, topBy } = window.GRAPH;
  const svg = document.getElementById('graf-svg');
  const VB_W = 900, VB_H = 600;

  // ----- State -----
  const state = {
    sizeMetric: 'pagerank',
    showLabels: true,
    hiddenComs: new Set(),
    selected: null,
    zoom: window.PAGE_SCALE || 1,
    pan: { x: 0, y: 0 },
  };

  // Init positions: cluster by community for nicer starting layout
  const comAngles = {};
  const comKeys = Object.keys(COMMUNITIES);
  comKeys.forEach((k, i) => { comAngles[k] = (i / comKeys.length) * Math.PI * 2; });

  const nodes = NODES.map(n => {
    const a = comAngles[n.com] + (Math.random() - 0.5) * 0.6;
    const r = 180 + Math.random() * 80;
    return {
      ...n,
      x: VB_W/2 + Math.cos(a) * r,
      y: VB_H/2 + Math.sin(a) * r,
      vx: 0, vy: 0,
      fixed: false,
    };
  });
  const idx = {}; nodes.forEach((n,i) => idx[n.id] = i);
  const edges = EDGES
    .filter(e => idx[e.source] !== undefined && idx[e.target] !== undefined)
    .map(e => ({ source: idx[e.source], target: idx[e.target] }));

  // ----- Build adjacency for neighbor lookup -----
  const adj = {}; nodes.forEach(n => adj[n.id] = new Set());
  edges.forEach(e => {
    adj[nodes[e.source].id].add(nodes[e.target].id);
    adj[nodes[e.target].id].add(nodes[e.source].id);
  });

  // ----- Build SVG groups -----
  const ns = 'http://www.w3.org/2000/svg';
  const gRoot = document.createElementNS(ns, 'g');
  gRoot.setAttribute('id', 'g-root');
  svg.appendChild(gRoot);
  const gEdges = document.createElementNS(ns, 'g'); gRoot.appendChild(gEdges);
  const gNodes = document.createElementNS(ns, 'g'); gRoot.appendChild(gNodes);

  // Create edge lines
  const edgeEls = edges.map(e => {
    const l = document.createElementNS(ns, 'line');
    l.classList.add('edge');
    l.setAttribute('stroke-width', '1');
    gEdges.appendChild(l);
    return l;
  });

  // Create node groups
  const nodeEls = nodes.map(n => {
    const g = document.createElementNS(ns, 'g');
    g.classList.add('node');
    g.dataset.id = n.id;
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('fill', COMMUNITIES[n.com].color);
    g.appendChild(c);
    const t = document.createElementNS(ns, 'text');
    t.classList.add('node-label');
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('dy', '0');
    t.textContent = n.name;
    g.appendChild(t);
    gNodes.appendChild(g);

    // Interaction: drag
    let dragging = false, startX, startY, origX, origY;
    g.addEventListener('mousedown', (ev) => {
      ev.stopPropagation();
      dragging = true; n.fixed = true;
      const pt = svgPt(ev);
      startX = pt.x; startY = pt.y;
      origX = n.x; origY = n.y;
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    });
    function move(ev) {
      if (!dragging) return;
      const pt = svgPt(ev);
      n.x = origX + (pt.x - startX);
      n.y = origY + (pt.y - startY);
      n.vx = 0; n.vy = 0;
    }
    function up() {
      dragging = false; n.fixed = false;
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    }
    g.addEventListener('click', (ev) => { ev.stopPropagation(); selectNode(n.id); });
    return g;
  });

  // ----- Score-based radius -----
  function sizeFor(n) {
    const s = SCORES[state.sizeMetric][n.id];
    const arr = Object.values(SCORES[state.sizeMetric]);
    const min = Math.min(...arr), max = Math.max(...arr);
    const t = (s - min) / Math.max(1e-9, max - min);
    return 4 + t * 14;  // 4..18
  }
  function paintNodeSizes() {
    nodes.forEach((n, i) => {
      const r = sizeFor(n);
      nodeEls[i].querySelector('circle').setAttribute('r', r);
      nodeEls[i].querySelector('text').setAttribute('dy', -(r + 4));
    });
  }
  paintNodeSizes();

  // ----- Simulation loop -----
  // Forces: repulsion (all-pairs), spring along edges, centering, community pull
  let alpha = 1.0;
  function step() {
    const k = 60; // ideal edge length
    // Reset forces
    nodes.forEach(n => { n.fx = 0; n.fy = 0; });

    // Repulsion
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (state.hiddenComs.has(a.com)) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        if (state.hiddenComs.has(b.com)) continue;
        let dx = a.x - b.x, dy = a.y - b.y;
        let d2 = dx*dx + dy*dy + 0.01;
        const f = 700 / d2;
        const d = Math.sqrt(d2);
        const ux = dx/d, uy = dy/d;
        a.fx += ux * f * alpha;
        a.fy += uy * f * alpha;
        b.fx -= ux * f * alpha;
        b.fy -= uy * f * alpha;
      }
    }

    // Spring
    edges.forEach(e => {
      const a = nodes[e.source], b = nodes[e.target];
      if (state.hiddenComs.has(a.com) || state.hiddenComs.has(b.com)) return;
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.sqrt(dx*dx + dy*dy) + 0.01;
      const f = (d - k) * 0.04;
      const ux = dx/d, uy = dy/d;
      a.fx += ux * f * alpha;
      a.fy += uy * f * alpha;
      b.fx -= ux * f * alpha;
      b.fy -= uy * f * alpha;
    });

    // Centering
    nodes.forEach(n => {
      n.fx += (VB_W/2 - n.x) * 0.005 * alpha;
      n.fy += (VB_H/2 - n.y) * 0.005 * alpha;
    });

    // Apply velocity
    nodes.forEach(n => {
      if (n.fixed) { n.vx = 0; n.vy = 0; return; }
      n.vx = (n.vx + n.fx) * 0.78;
      n.vy = (n.vy + n.fy) * 0.78;
      n.x += n.vx;
      n.y += n.vy;
      // clamp
      n.x = Math.max(10, Math.min(VB_W - 10, n.x));
      n.y = Math.max(10, Math.min(VB_H - 10, n.y));
    });

    alpha *= 0.995;
    if (alpha < 0.02) alpha = 0.02;
  }

  function render() {
    nodes.forEach((n, i) => {
      const el = nodeEls[i];
      el.setAttribute('transform', `translate(${n.x},${n.y})`);
      el.style.display = state.hiddenComs.has(n.com) ? 'none' : '';
      el.querySelector('text').style.display = state.showLabels ? '' : 'none';
    });
    edges.forEach((e, i) => {
      const a = nodes[e.source], b = nodes[e.target];
      const el = edgeEls[i];
      const hidden = state.hiddenComs.has(a.com) || state.hiddenComs.has(b.com);
      el.style.display = hidden ? 'none' : '';
      el.setAttribute('x1', a.x); el.setAttribute('y1', a.y);
      el.setAttribute('x2', b.x); el.setAttribute('y2', b.y);
    });
  }

  function loop() {
    step(); render();
    requestAnimationFrame(loop);
  }
  loop();

  // ----- Selection / neighbor highlight -----
  function selectNode(id) {
    state.selected = id;
    const node = nodes.find(n => n.id === id);
    const neighbors = adj[id];
    nodeEls.forEach((el, i) => {
      const n = nodes[i];
      el.classList.toggle('selected', n.id === id);
      el.classList.toggle('neighbor', neighbors.has(n.id));
      el.classList.toggle('dim', n.id !== id && !neighbors.has(n.id));
    });
    edgeEls.forEach((el, i) => {
      const e = edges[i];
      const involves = (nodes[e.source].id === id || nodes[e.target].id === id);
      el.classList.toggle('highlight', involves);
      el.classList.toggle('dim', !involves);
    });
    renderSelectedPane(node);
  }

  function clearSelection() {
    state.selected = null;
    nodeEls.forEach(el => { el.classList.remove('selected','neighbor','dim'); });
    edgeEls.forEach(el => { el.classList.remove('highlight','dim'); });
    document.getElementById('selected-pane').innerHTML =
      '<span style="font-size:13px; color:var(--text3);">Klik salah satu node pada graf untuk melihat detail.</span>';
  }

  function renderSelectedPane(n) {
    const pr = SCORES.pagerank[n.id], dg = SCORES.degree[n.id], bw = SCORES.betweenness[n.id];
    const com = COMMUNITIES[n.com];
    const deg = adj[n.id].size;
    document.getElementById('selected-pane').innerHTML = `
      <div class="selected-node">
        <div style="font-family: 'Instrument Serif', serif; font-weight:400; font-size:22px; color:var(--text); margin-bottom:2px; letter-spacing: -0.01em;">${n.name}</div>
        <div style="font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--text3); margin-bottom:14px;">@${n.id}</div>
        <div class="row" style="gap:6px; margin-bottom:14px;">
          <span class="dot-square" style="background:${com.color};"></span>
          <span style="font-size: 12px; color: var(--text2);">${com.label}</span>
        </div>
        <div class="selected-row"><span class="l">Degree</span><span class="v">${deg}</span></div>
        <div class="selected-row"><span class="l">PageRank</span><span class="v">${(pr*100).toFixed(2)}%</span></div>
        <div class="selected-row"><span class="l">Betweenness</span><span class="v">${(bw*100).toFixed(2)}%</span></div>
        <div class="selected-row"><span class="l">Followers</span><span class="v">${n.followers >= 1e6 ? (n.followers/1e6).toFixed(1)+'M' : n.followers >= 1e3 ? (n.followers/1e3).toFixed(1)+'K' : n.followers}</span></div>
        <button class="btn-ghost" id="clear-sel" style="margin-top:14px; width:100%; border: 1px solid var(--border);">Batal pilih</button>
      </div>`;
    document.getElementById('clear-sel').addEventListener('click', clearSelection);
  }

  svg.addEventListener('click', clearSelection);

  // ----- Toolbar -----
  const sizeBtns = {
    pagerank: document.getElementById('size-pagerank'),
    degree: document.getElementById('size-degree'),
    betweenness: document.getElementById('size-betweenness'),
  };
  Object.entries(sizeBtns).forEach(([k, btn]) => {
    btn.addEventListener('click', () => {
      state.sizeMetric = k;
      Object.values(sizeBtns).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      paintNodeSizes();
      alpha = 0.6;  // re-energize
    });
  });
  const tLabels = document.getElementById('toggle-labels');
  tLabels.addEventListener('click', () => {
    state.showLabels = !state.showLabels;
    tLabels.classList.toggle('active', state.showLabels);
  });
  document.getElementById('reset-view').addEventListener('click', () => {
    nodes.forEach(n => {
      const a = comAngles[n.com] + (Math.random() - 0.5) * 0.6;
      const r = 180 + Math.random() * 80;
      n.x = VB_W/2 + Math.cos(a) * r;
      n.y = VB_H/2 + Math.sin(a) * r;
      n.vx = 0; n.vy = 0;
    });
    state.zoom = window.PAGE_SCALE || 1; state.pan = { x:0, y:0 }; applyTransform();
    alpha = 1.0;
    clearSelection();
  });

  // ----- Zoom / Pan -----
  function applyTransform() {
    gRoot.setAttribute('transform',
      `translate(${state.pan.x},${state.pan.y}) scale(${state.zoom})`);
  }
  svg.addEventListener('wheel', (ev) => {
    ev.preventDefault();
    const pt = svgPt(ev);
    const f = ev.deltaY < 0 ? 1.12 : 1/1.12;
    const newZoom = Math.max(0.4, Math.min(3.5, state.zoom * f));
    // zoom toward cursor
    state.pan.x = pt.x - (pt.x - state.pan.x) * (newZoom / state.zoom);
    state.pan.y = pt.y - (pt.y - state.pan.y) * (newZoom / state.zoom);
    state.zoom = newZoom;
    applyTransform();
  }, { passive: false });

  let panning = false, panStart;
  svg.addEventListener('mousedown', (ev) => {
    if (ev.target !== svg && ev.target.tagName !== 'g') return; // only bg
    panning = true;
    panStart = { x: ev.clientX - state.pan.x, y: ev.clientY - state.pan.y };
  });
  window.addEventListener('mousemove', (ev) => {
    if (!panning) return;
    state.pan.x = ev.clientX - panStart.x;
    state.pan.y = ev.clientY - panStart.y;
    applyTransform();
  });
  window.addEventListener('mouseup', () => panning = false);

  function svgPt(ev) {
    const r = svg.getBoundingClientRect();
    return {
      x: (ev.clientX - r.left) / r.width * VB_W,
      y: (ev.clientY - r.top) / r.height * VB_H,
    };
  }

  // ----- Legend -----
  const legendEl = document.getElementById('legend');
  Object.entries(COMMUNITIES).forEach(([key, com]) => {
    const count = nodes.filter(n => n.com === key).length;
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <span class="dot" style="background:${com.color}"></span>
      <span>${com.label}</span>
      <span class="legend-count">${count}</span>
    `;
    item.addEventListener('click', () => {
      if (state.hiddenComs.has(key)) state.hiddenComs.delete(key);
      else state.hiddenComs.add(key);
      item.classList.toggle('muted', state.hiddenComs.has(key));
      alpha = 0.4;
    });
    legendEl.appendChild(item);
  });

  // ----- Meta -----
  document.getElementById('m-nodes').textContent = nodes.length;
  document.getElementById('m-edges').textContent = edges.length;
  const mCom = document.getElementById('m-com');
  if (mCom) mCom.textContent = Object.keys(COMMUNITIES).length;

  // ----- Community recap section -----
  const recap = document.getElementById('community-recap');
  if (recap) {
    Object.entries(COMMUNITIES).forEach(([key, com]) => {
      const members = nodes.filter(n => n.com === key);
      const top = members.map(m => ({ ...m, pr: SCORES.pagerank[m.id] }))
        .sort((a,b) => b.pr - a.pr).slice(0, 3);
      const card = document.createElement('div');
      card.style.cssText = 'padding: 22px 24px; border-bottom: 1px solid var(--border); border-right: 1px solid var(--border);';
      card.innerHTML = `
        <div class="row" style="gap:8px; margin-bottom:10px;">
          <span class="dot-square" style="background:${com.color}; width: 8px; height: 8px;"></span>
          <h3 style="font-size:14px; font-weight: 600; margin: 0; color: var(--text);">${com.label}</h3>
          <span class="mono" style="margin-left:auto; font-size:11px; color:var(--text3);">${members.length} nodes</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:2px; margin-top: 14px;">
          ${top.map((t,i) => `
            <div style="display:flex; justify-content:space-between; font-size:13.5px; padding: 5px 0;">
              <span><span class="mono" style="color:var(--text3); font-weight:500; margin-right:10px; font-size: 11px;">${String(i+1).padStart(2,'0')}</span>${t.name}</span>
              <span class="mono" style="color:${com.color}; font-size:11.5px; font-weight: 500;">${(t.pr*100).toFixed(2)}%</span>
            </div>
          `).join('')}
        </div>
      `;
      recap.appendChild(card);
    });
  }

  // Initial click on top node for visual interest
  setTimeout(() => {
    selectNode('willie27_');
  }, 800);
})();
