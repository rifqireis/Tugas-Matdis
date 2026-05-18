/* ==========================================================
   Custom force-directed graph for graf.html
   No external deps. Spring simulation with community zones.
   ========================================================== */

(function () {
  const { NODES, EDGES, COMMUNITIES, SCORES, topBy } = window.GRAPH;
  const svg = document.getElementById('graf-svg');
  const VB_W = 900, VB_H = 600;

  // ----- State -----
  const state = {
    sizeMetric: 'pagerank',
    showLabels: true,
    showZones: false,
    labelMode: 'name',  // 'name' | 'id'
    hiddenComs: new Set(),
    selected: null,
    zoom: window.PAGE_SCALE || 1,
    pan: { x: 0, y: 0 },
  };

  // Init positions: cluster by community
  const comAngles = {};
  const comKeys = Object.keys(COMMUNITIES);
  comKeys.forEach((k, i) => { comAngles[k] = (i / comKeys.length) * Math.PI * 2; });

  const nodes = NODES.map(n => {
    const a = comAngles[n.com] + (Math.random() - 0.5) * 0.8;
    const r = 220 + Math.random() * 100;
    return {
      ...n,
      x: VB_W/2 + Math.cos(a) * r,
      y: VB_H/2 + Math.sin(a) * r,
      vx: 0, vy: 0,
      fixed: false,
    };
  });

  const idx = {}; nodes.forEach((n, i) => idx[n.id] = i);
  const edges = EDGES
    .filter(e => idx[e.source] !== undefined && idx[e.target] !== undefined)
    .map(e => ({ source: idx[e.source], target: idx[e.target] }));

  // Directed adjacency (outgoing) for neighbor highlight
  const adj = {}; nodes.forEach(n => adj[n.id] = new Set());
  edges.forEach(e => { adj[nodes[e.source].id].add(nodes[e.target].id); });

  // Precompute in-degree
  const inDeg = {}; nodes.forEach(n => inDeg[n.id] = 0);
  edges.forEach(e => { inDeg[nodes[e.target].id]++; });

  // ----- Cached node radii -----
  const nodeRadii = {};
  function computeRadii() {
    const arr = Object.values(SCORES[state.sizeMetric]);
    const min = Math.min(...arr), max = Math.max(...arr);
    nodes.forEach(n => {
      const t = (SCORES[state.sizeMetric][n.id] - min) / Math.max(1e-9, max - min);
      nodeRadii[n.id] = 4 + t * 14;
    });
  }
  computeRadii();

  function paintNodeSizes() {
    computeRadii();
    nodes.forEach((n, i) => {
      const r = nodeRadii[n.id];
      nodeEls[i].querySelector('circle').setAttribute('r', r);
      nodeEls[i].querySelector('text').setAttribute('dy', -(r + 4));
    });
  }

  function updateLabelTexts() {
    nodes.forEach((n, i) => {
      nodeEls[i].querySelector('text').textContent =
        state.labelMode === 'id' ? '@' + n.id : n.name;
    });
  }

  // ----- Build SVG groups -----
  const ns = 'http://www.w3.org/2000/svg';

  // Arrowhead marker — userSpaceOnUse so size is independent of stroke-width
  const defsEl = document.createElementNS(ns, 'defs');
  const markerEl = document.createElementNS(ns, 'marker');
  markerEl.setAttribute('id', 'arrowhead');
  markerEl.setAttribute('markerWidth', '6');
  markerEl.setAttribute('markerHeight', '4');
  markerEl.setAttribute('refX', '6');
  markerEl.setAttribute('refY', '2');
  markerEl.setAttribute('orient', 'auto');
  markerEl.setAttribute('markerUnits', 'userSpaceOnUse');
  const arrowPoly = document.createElementNS(ns, 'polygon');
  arrowPoly.setAttribute('points', '0 0, 6 2, 0 4');
  arrowPoly.setAttribute('fill', '#777');
  markerEl.appendChild(arrowPoly);
  defsEl.appendChild(markerEl);
  svg.appendChild(defsEl);

  const gRoot = document.createElementNS(ns, 'g');
  gRoot.setAttribute('id', 'g-root');
  svg.appendChild(gRoot);

  // Community zone layer — behind everything
  const gZones = document.createElementNS(ns, 'g');
  gRoot.appendChild(gZones);
  const zoneEls = {};
  Object.entries(COMMUNITIES).forEach(([key, com]) => {
    const ellipse = document.createElementNS(ns, 'ellipse');
    ellipse.setAttribute('fill', com.color);
    ellipse.setAttribute('fill-opacity', '0.07');
    ellipse.setAttribute('stroke', com.color);
    ellipse.setAttribute('stroke-opacity', '0.30');
    ellipse.setAttribute('stroke-width', '1.5');
    ellipse.setAttribute('stroke-dasharray', '5 3');
    ellipse.style.display = 'none';
    gZones.appendChild(ellipse);

    const lbl = document.createElementNS(ns, 'text');
    lbl.setAttribute('text-anchor', 'middle');
    lbl.setAttribute('fill', com.color);
    lbl.setAttribute('fill-opacity', '0.6');
    lbl.setAttribute('font-size', '10');
    lbl.setAttribute('font-family', 'DM Sans, sans-serif');
    lbl.setAttribute('font-weight', '600');
    lbl.setAttribute('letter-spacing', '0.8');
    lbl.style.pointerEvents = 'none';
    lbl.style.display = 'none';
    lbl.textContent = com.label.toUpperCase();
    gZones.appendChild(lbl);

    zoneEls[key] = { ellipse, lbl };
  });

  const gEdges = document.createElementNS(ns, 'g'); gRoot.appendChild(gEdges);
  const gNodes = document.createElementNS(ns, 'g'); gRoot.appendChild(gNodes);

  // Edge lines
  const edgeEls = edges.map(() => {
    const l = document.createElementNS(ns, 'line');
    l.classList.add('edge');
    l.setAttribute('stroke-width', '1');
    l.setAttribute('marker-end', 'url(#arrowhead)');
    gEdges.appendChild(l);
    return l;
  });

  // Node groups
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

    let dragging = false, startX, startY, origX, origY;
    g.addEventListener('mousedown', ev => {
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
      heatUp(0.2);
    }
    function up() {
      dragging = false; n.fixed = false;
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    }
    g.addEventListener('click', ev => { ev.stopPropagation(); selectNode(n.id); });
    return g;
  });

  paintNodeSizes();

  // ----- Simulation (cooling) -----
  let alpha = 1.0;
  let rafId = null;

  function heatUp(a = 0.8) {
    alpha = Math.max(alpha, a);
    startSim();
  }

  function startSim() {
    if (rafId) return;
    (function tick() {
      step(); render();
      if (alpha > 0.003) {
        rafId = requestAnimationFrame(tick);
      } else {
        render();
        rafId = null;
      }
    })();
  }

  function step() {
    const k = 90;  // ideal edge length
    nodes.forEach(n => { n.fx = 0; n.fy = 0; });

    // Repulsion (all-pairs, stronger)
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (state.hiddenComs.has(a.com)) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        if (state.hiddenComs.has(b.com)) continue;
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx*dx + dy*dy + 0.01;
        const d = Math.sqrt(d2);
        const f = 2400 / d2;
        a.fx += (dx/d) * f * alpha;
        a.fy += (dy/d) * f * alpha;
        b.fx -= (dx/d) * f * alpha;
        b.fy -= (dy/d) * f * alpha;
      }
    }

    // Spring along edges
    edges.forEach(e => {
      const a = nodes[e.source], b = nodes[e.target];
      if (state.hiddenComs.has(a.com) || state.hiddenComs.has(b.com)) return;
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.sqrt(dx*dx + dy*dy) + 0.01;
      const f = (d - k) * 0.03;
      const ux = dx/d, uy = dy/d;
      a.fx += ux * f * alpha;
      a.fy += uy * f * alpha;
      b.fx -= ux * f * alpha;
      b.fy -= uy * f * alpha;
    });

    // Community cohesion — nodes pulled gently toward their cluster center
    const comC = {};
    Object.keys(COMMUNITIES).forEach(k => comC[k] = { x: 0, y: 0, n: 0 });
    nodes.forEach(n => {
      if (state.hiddenComs.has(n.com)) return;
      comC[n.com].x += n.x; comC[n.com].y += n.y; comC[n.com].n++;
    });
    Object.values(comC).forEach(c => { if (c.n > 0) { c.x /= c.n; c.y /= c.n; } });
    nodes.forEach(n => {
      if (state.hiddenComs.has(n.com)) return;
      n.fx += (comC[n.com].x - n.x) * 0.012 * alpha;
      n.fy += (comC[n.com].y - n.y) * 0.012 * alpha;
    });

    // Weak centering
    nodes.forEach(n => {
      n.fx += (VB_W/2 - n.x) * 0.003 * alpha;
      n.fy += (VB_H/2 - n.y) * 0.003 * alpha;
    });

    // Integrate
    nodes.forEach(n => {
      if (n.fixed) { n.vx = 0; n.vy = 0; return; }
      n.vx = (n.vx + n.fx) * 0.74;
      n.vy = (n.vy + n.fy) * 0.74;
      n.x += n.vx;
      n.y += n.vy;
      n.x = Math.max(20, Math.min(VB_W - 20, n.x));
      n.y = Math.max(20, Math.min(VB_H - 20, n.y));
    });

    alpha *= 0.983;
  }

  function render() {
    // Community zones
    if (state.showZones) {
      Object.entries(zoneEls).forEach(([key, { ellipse, lbl }]) => {
        const members = nodes.filter(n => n.com === key && !state.hiddenComs.has(key));
        if (members.length === 0) {
          ellipse.style.display = 'none'; lbl.style.display = 'none'; return;
        }
        const cx = members.reduce((s, n) => s + n.x, 0) / members.length;
        const cy = members.reduce((s, n) => s + n.y, 0) / members.length;
        const maxR = Math.max(...members.map(n => Math.hypot(n.x - cx, n.y - cy))) + 34;
        ellipse.setAttribute('cx', cx); ellipse.setAttribute('cy', cy);
        ellipse.setAttribute('rx', maxR); ellipse.setAttribute('ry', maxR * 0.76);
        ellipse.style.display = '';
        lbl.setAttribute('x', cx);
        lbl.setAttribute('y', cy - maxR * 0.76 + 13);
        lbl.style.display = '';
      });
    }

    nodes.forEach((n, i) => {
      const el = nodeEls[i];
      el.setAttribute('transform', `translate(${n.x},${n.y})`);
      el.style.display = state.hiddenComs.has(n.com) ? 'none' : '';
      el.querySelector('text').style.display = state.showLabels ? '' : 'none';
    });

    edges.forEach((e, i) => {
      const a = nodes[e.source], b = nodes[e.target];
      const el = edgeEls[i];
      if (state.hiddenComs.has(a.com) || state.hiddenComs.has(b.com)) {
        el.style.display = 'none'; return;
      }
      el.style.display = '';
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.sqrt(dx*dx + dy*dy) + 0.01;
      // Shorten endpoint to just outside target node so arrowhead is always visible
      const r = nodeRadii[b.id] || 6;
      el.setAttribute('x1', a.x); el.setAttribute('y1', a.y);
      el.setAttribute('x2', b.x - (dx/dist) * (r + 1.5));
      el.setAttribute('y2', b.y - (dy/dist) * (r + 1.5));
    });
  }

  startSim();

  // ----- Selection -----
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
      el.style.display = involves ? '' : 'none';
    });
    renderSelectedPane(node);
  }

  function clearSelection() {
    state.selected = null;
    nodeEls.forEach(el => el.classList.remove('selected', 'neighbor', 'dim'));
    edgeEls.forEach((el, i) => {
      el.classList.remove('highlight', 'dim');
      const e = edges[i];
      const a = nodes[e.source], b = nodes[e.target];
      el.style.display = (state.hiddenComs.has(a.com) || state.hiddenComs.has(b.com)) ? 'none' : '';
    });
    document.getElementById('selected-pane').innerHTML =
      '<span style="font-size:13px; color:var(--text3);">Klik salah satu node pada graf untuk melihat detail.</span>';
  }

  function renderSelectedPane(n) {
    const pr = SCORES.pagerank[n.id];
    const com = COMMUNITIES[n.com];
    const outDeg = adj[n.id].size;
    const inD = inDeg[n.id];
    document.getElementById('selected-pane').innerHTML = `
      <div class="selected-node">
        <div style="font-family:'Instrument Serif',serif;font-weight:400;font-size:22px;color:var(--text);margin-bottom:2px;letter-spacing:-0.01em;">${n.name}</div>
        <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text3);margin-bottom:14px;">@${n.id}</div>
        <div class="row" style="gap:6px;margin-bottom:14px;">
          <span class="dot-square" style="background:${com.color};"></span>
          <span style="font-size:12px;color:var(--text2);">${com.label}</span>
        </div>
        <div class="selected-row"><span class="l">In-degree</span><span class="v">${inD}</span></div>
        <div class="selected-row"><span class="l">Out-degree</span><span class="v">${outDeg}</span></div>
        <div class="selected-row"><span class="l">PageRank</span><span class="v">${(pr*100).toFixed(2)}%</span></div>
        <div class="selected-row"><span class="l">Followers</span><span class="v">${n.followers >= 1e6 ? (n.followers/1e6).toFixed(1)+'M' : n.followers >= 1e3 ? (n.followers/1e3).toFixed(1)+'K' : n.followers}</span></div>
        <button class="btn-ghost" id="clear-sel" style="margin-top:14px;width:100%;border:1px solid var(--border);">Batal pilih</button>
      </div>`;
    document.getElementById('clear-sel').addEventListener('click', clearSelection);
  }

  svg.addEventListener('click', clearSelection);

  // ----- Toolbar -----
  const sizeBtns = {
    pagerank: document.getElementById('size-pagerank'),
    degree: document.getElementById('size-degree'),
  };
  Object.entries(sizeBtns).forEach(([k, btn]) => {
    btn.addEventListener('click', () => {
      state.sizeMetric = k;
      Object.values(sizeBtns).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      paintNodeSizes();
      heatUp(0.5);
    });
  });

  document.getElementById('toggle-labels').addEventListener('click', function () {
    state.showLabels = !state.showLabels;
    this.classList.toggle('active', state.showLabels);
    heatUp(0.05);
  });

  const tZones = document.getElementById('toggle-zones');
  if (tZones) {
    tZones.addEventListener('click', function () {
      state.showZones = !state.showZones;
      this.classList.toggle('active', state.showZones);
      if (!state.showZones) {
        Object.values(zoneEls).forEach(({ ellipse, lbl }) => {
          ellipse.style.display = 'none';
          lbl.style.display = 'none';
        });
      }
      heatUp(0.1);
    });
  }

  const tLabelMode = document.getElementById('toggle-label-mode');
  if (tLabelMode) {
    tLabelMode.addEventListener('click', function () {
      state.labelMode = state.labelMode === 'name' ? 'id' : 'name';
      this.textContent = state.labelMode === 'id' ? 'Nama' : '@ID';
      updateLabelTexts();
    });
  }

  document.getElementById('reset-view').addEventListener('click', () => {
    nodes.forEach(n => {
      const a = comAngles[n.com] + (Math.random() - 0.5) * 0.8;
      const r = 220 + Math.random() * 100;
      n.x = VB_W/2 + Math.cos(a) * r;
      n.y = VB_H/2 + Math.sin(a) * r;
      n.vx = 0; n.vy = 0;
    });
    state.zoom = window.PAGE_SCALE || 1;
    state.pan = { x: 0, y: 0 };
    applyTransform();
    clearSelection();
    heatUp(1.0);
  });

  // ----- Zoom / Pan -----
  function applyTransform() {
    gRoot.setAttribute('transform',
      `translate(${state.pan.x},${state.pan.y}) scale(${state.zoom})`);
  }

  svg.addEventListener('wheel', ev => {
    if (document.fullscreenElement) {
      // Fullscreen mode: Ctrl+wheel / pinch passes through to browser zoom;
      // plain wheel (two-finger scroll) pans the graph.
      if (ev.ctrlKey) return;
      ev.preventDefault();
      state.pan.x -= ev.deltaX;
      state.pan.y -= ev.deltaY;
      applyTransform();
    } else {
      // Normal mode: wheel zooms the graph
      ev.preventDefault();
      const pt = svgPt(ev);
      const f = ev.deltaY < 0 ? 1.12 : 1/1.12;
      const newZoom = Math.max(0.4, Math.min(3.5, state.zoom * f));
      state.pan.x = pt.x - (pt.x - state.pan.x) * (newZoom / state.zoom);
      state.pan.y = pt.y - (pt.y - state.pan.y) * (newZoom / state.zoom);
      state.zoom = newZoom;
      applyTransform();
    }
  }, { passive: false });

  let panning = false, panStart;
  svg.addEventListener('mousedown', ev => {
    if (ev.target !== svg && ev.target.tagName !== 'g') return;
    panning = true;
    panStart = { x: ev.clientX - state.pan.x, y: ev.clientY - state.pan.y };
  });
  window.addEventListener('mousemove', ev => {
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

  // ----- Fullscreen -----
  const fsBtn = document.getElementById('fullscreen-btn');
  if (fsBtn) {
    const shell = document.querySelector('.graf-shell');
    fsBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        (shell.requestFullscreen || shell.webkitRequestFullscreen).call(shell);
      } else {
        (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      }
    });
    document.addEventListener('fullscreenchange', () => {
      const isFS = !!document.fullscreenElement;
      fsBtn.textContent = isFS ? '✕' : '⛶';
      fsBtn.title = isFS ? 'Keluar layar penuh' : 'Layar penuh';
      fsBtn.classList.toggle('active', isFS);
    });
    document.addEventListener('webkitfullscreenchange', () => {
      const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
      fsBtn.textContent = isFS ? '✕' : '⛶';
      fsBtn.title = isFS ? 'Keluar layar penuh' : 'Layar penuh';
      fsBtn.classList.toggle('active', isFS);
    });
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
      heatUp(0.4);
    });
    legendEl.appendChild(item);
  });

  // ----- Meta -----
  document.getElementById('m-nodes').textContent = nodes.length;
  document.getElementById('m-edges').textContent = edges.length;
  const mCom = document.getElementById('m-com');
  if (mCom) mCom.textContent = Object.keys(COMMUNITIES).length;

  // ----- Community recap -----
  const recap = document.getElementById('community-recap');
  if (recap) {
    Object.entries(COMMUNITIES).forEach(([key, com]) => {
      const members = nodes.filter(n => n.com === key);
      const top = members.map(m => ({ ...m, pr: SCORES.pagerank[m.id] }))
        .sort((a, b) => b.pr - a.pr).slice(0, 3);
      const card = document.createElement('div');
      card.style.cssText = 'padding: 22px 24px; border-bottom: 1px solid var(--border); border-right: 1px solid var(--border);';
      card.innerHTML = `
        <div class="row" style="gap:8px;margin-bottom:10px;">
          <span class="dot-square" style="background:${com.color};width:8px;height:8px;"></span>
          <h3 style="font-size:14px;font-weight:600;margin:0;color:var(--text);">${com.label}</h3>
          <span class="mono" style="margin-left:auto;font-size:11px;color:var(--text3);">${members.length} nodes</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:2px;margin-top:14px;">
          ${top.map((t, i) => `
            <div style="display:flex;justify-content:space-between;font-size:13.5px;padding:5px 0;">
              <span><span class="mono" style="color:var(--text3);font-weight:500;margin-right:10px;font-size:11px;">${String(i+1).padStart(2,'0')}</span>${t.name}</span>
              <span class="mono" style="color:${com.color};font-size:11.5px;font-weight:500;">${(t.pr*100).toFixed(2)}%</span>
            </div>
          `).join('')}
        </div>
      `;
      recap.appendChild(card);
    });
  }

  setTimeout(() => { selectNode('willie27_'); }, 600);
})();
