'use strict';
// ============================================================
// data-report.js — run with: node data-report.js
// ============================================================

// ── DATA ────────────────────────────────────────────────────

const COMMUNITIES = {
  nasional:   { label: 'Kreator Nasional'   },
  lokal:      { label: 'Lokal Bengkulu'     },
};

const NODES = [
  { id: 'willie27_',               name: 'Willie Salim',             com: 'nasional',   followers: 16600000 },
  { id: 'vilmei',                  name: 'Vilmei',                   com: 'nasional',   followers: 14200000 },
  { id: 'ibnuwardani',             name: 'Ibnu Wardani',             com: 'nasional',   followers: 6800000  },
  { id: 'jessnolimit',             name: 'Jess No Limit',            com: 'nasional',   followers: 9600000  },
  { id: 'baimwong',                name: 'Baim Wong',                com: 'nasional',   followers: 20100000 },
  { id: 'fadiljaidi',              name: 'Fadil Jaidi',              com: 'nasional',   followers: 14200000 },
  { id: 'attahalilintar',          name: 'Atta Halilintar',          com: 'nasional',   followers: 39900000 },
  { id: 'aurelie.hermansyah',      name: 'Aurelie Hermansyah',       com: 'nasional',   followers: 34900000 },
  { id: 'raffinagita1717',         name: 'Raffi Nagita',             com: 'nasional',   followers: 75200000 },
  { id: 'riaricis1795',            name: 'Ria Ricis',                com: 'nasional',   followers: 36700000 },
  { id: 'windahbasudara',          name: 'Windah Basudara',          com: 'nasional',   followers: 4100000  },
  { id: 'siscakohl',               name: 'Sisca Kohl',               com: 'nasional',   followers: 3000000  },
  { id: 'mastercorbuzier',         name: 'Deddy Corbuzier',          com: 'nasional',   followers: 12800000 },
  { id: 'fuji_an',                 name: 'Fuji An',                  com: 'nasional',   followers: 20500000 },
  { id: 'mariorioio__',            name: 'Mario',                    com: 'lokal',      followers: 1239     },
  { id: 'peuybatik',               name: 'Peuy Batik',               com: 'lokal',      followers: 1288     },
  { id: 'keylaphaulina',           name: 'Keyla Phaulina',           com: 'lokal',      followers: 2384     },
  { id: 'atalaptraa',              name: 'Atalap Traa',              com: 'lokal',      followers: 3444     },
  { id: 'alifahdzatilsalsabila',   name: 'Alifah Dzatil',            com: 'lokal',      followers: 3924     },
  { id: 'nandi_asqora',            name: 'Nandi Asqora',             com: 'lokal',      followers: 3422     },
  { id: 'aldomeidian',             name: 'Aldo Meidian',             com: 'lokal',      followers: 8775     },
  { id: 'oktmhrnii',               name: 'Oktmhrnii',                com: 'lokal',      followers: 3685     },
  { id: 'ezillamarchellah',        name: 'Ezilla Marchellah',        com: 'lokal',      followers: 3881     },
  { id: 'laylaarisyah',            name: 'Layla Arisyah',            com: 'lokal',      followers: 3788     },
  { id: 'slw.azky',                name: 'Slw Azky',                 com: 'lokal',      followers: 1866     },
  { id: 'akbarsumbar',             name: 'Akbar Sumbar',             com: 'lokal',      followers: 9926     },
  { id: 'galeh_004',               name: 'Galeh 004',                com: 'lokal',      followers: 1468     },
  { id: 'ikatandutahivaidsprovbengkulu', name: 'Ikatan Duta HIV AIDS BKL', com: 'lokal', followers: 11200 },
];

const EDGES_RAW = [
  { source: 'willie27_',    target: 'vilmei' },
  { source: 'willie27_',    target: 'ibnuwardani' },
  { source: 'willie27_',    target: 'jessnolimit' },
  { source: 'willie27_',    target: 'fadiljaidi' },
  { source: 'willie27_',    target: 'baimwong' },
  { source: 'vilmei',       target: 'fuji_an' },
  { source: 'vilmei',       target: 'windahbasudara' },
  { source: 'attahalilintar', target: 'vilmei' },
  { source: 'aurelie.hermansyah', target: 'vilmei' },
  { source: 'baimwong',     target: 'vilmei' },
  { source: 'vilmei',       target: 'willie27_' },
  { source: 'willie27_',    target: 'vilmei' },
  { source: 'vilmei',       target: 'riaricis1795' },
  { source: 'riaricis1795', target: 'vilmei' },
  { source: 'vilmei',       target: 'fadiljaidi' },
  { source: 'fadiljaidi',   target: 'vilmei' },
  { source: 'ibnuwardani',  target: 'willie27_' },
  { source: 'ibnuwardani',  target: 'vilmei' },
  { source: 'ibnuwardani',  target: 'fuji_an' },
  { source: 'ibnuwardani',  target: 'baimwong' },
  { source: 'ibnuwardani',  target: 'siscakohl' },
  { source: 'ibnuwardani',  target: 'fadiljaidi' },
  { source: 'riaricis1795', target: 'ibnuwardani' },
  { source: 'attahalilintar', target: 'ibnuwardani' },
  { source: 'jessnolimit',  target: 'ibnuwardani' },
  { source: 'jessnolimit',  target: 'windahbasudara' },
  { source: 'mastercorbuzier', target: 'jessnolimit' },
  { source: 'attahalilintar', target: 'jessnolimit' },
  { source: 'jessnolimit',  target: 'siscakohl' },
  { source: 'siscakohl',    target: 'jessnolimit' },
  { source: 'baimwong',     target: 'raffinagita1717' },
  { source: 'baimwong',     target: 'attahalilintar' },
  { source: 'baimwong',     target: 'aurelie.hermansyah' },
  { source: 'baimwong',     target: 'willie27_' },
  { source: 'mastercorbuzier', target: 'baimwong' },
  { source: 'fadiljaidi',   target: 'raffinagita1717' },
  { source: 'fadiljaidi',   target: 'mastercorbuzier' },
  { source: 'fadiljaidi',   target: 'attahalilintar' },
  { source: 'fadiljaidi',   target: 'aurelie.hermansyah' },
  { source: 'fadiljaidi',   target: 'baimwong' },
  { source: 'mariorioio__', target: 'keylaphaulina' },
  { source: 'mariorioio__', target: 'atalaptraa' },
  { source: 'mariorioio__', target: 'peuybatik' },
  { source: 'mariorioio__', target: 'willie27_' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'mariorioio__' },
  { source: 'keylaphaulina',        target: 'mariorioio__' },
  { source: 'atalaptraa',           target: 'mariorioio__' },
  { source: 'alifahdzatilsalsabila',target: 'mariorioio__' },
  { source: 'nandi_asqora',         target: 'mariorioio__' },
  { source: 'aldomeidian',          target: 'mariorioio__' },
  { source: 'oktmhrnii',            target: 'mariorioio__' },
  { source: 'ezillamarchellah',     target: 'mariorioio__' },
  { source: 'laylaarisyah',         target: 'mariorioio__' },
  { source: 'akbarsumbar',          target: 'mariorioio__' },
  { source: 'galeh_004',            target: 'mariorioio__' },
  { source: 'slw.azky',             target: 'mariorioio__' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'aldomeidian' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'akbarsumbar' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'oktmhrnii' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'ezillamarchellah' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'laylaarisyah' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'slw.azky' },
  { source: 'galeh_004',    target: 'ikatandutahivaidsprovbengkulu' },
  { source: 'alifahdzatilsalsabila', target: 'peuybatik' },
  { source: 'nandi_asqora', target: 'peuybatik' },
  { source: 'peuybatik',    target: 'mariorioio__' },
];

// ── Filter invalid edges ─────────────────────────────────────
const nodeSet = new Set(NODES.map(n => n.id));
const EDGES = EDGES_RAW.filter(e => nodeSet.has(e.source) && nodeSet.has(e.target));

// ── ALGORITHMS ──────────────────────────────────────────────

function buildAdj() {
  const adj = {};
  NODES.forEach(n => adj[n.id] = []);
  EDGES.forEach(e => adj[e.source].push(e.target));
  return adj;
}

function degreeCentrality() {
  const inDeg = {};
  NODES.forEach(n => inDeg[n.id] = 0);
  EDGES.forEach(e => { inDeg[e.target]++; });
  const max = NODES.length - 1;
  const out = {};
  NODES.forEach(n => { out[n.id] = inDeg[n.id] / max; });
  return out;
}

function pageRank(d = 0.85, iters = 60) {
  const adj = buildAdj();
  const N = NODES.length;
  let pr = {};
  NODES.forEach(n => pr[n.id] = 1 / N);
  for (let k = 0; k < iters; k++) {
    const next = {};
    NODES.forEach(n => next[n.id] = (1 - d) / N);
    NODES.forEach(n => {
      const neighbors = adj[n.id];
      if (neighbors.length === 0) return;
      const share = (d * pr[n.id]) / neighbors.length;
      neighbors.forEach(nb => next[nb] += share);
    });
    pr = next;
  }
  return pr;
}

function weightedPageRank(d = 0.85, iters = 80) {
  const nodeById = {};
  NODES.forEach(n => nodeById[n.id] = n);

  function communityFactor(sc, tc) {
    if (sc === 'lokal' && tc === 'lokal') return 1.5;
    if (tc === 'lokal') return 1.3;
    if (sc === 'lokal' && tc === 'nasional') return 0.9;
    return 1.0;
  }

  const adj = {};
  NODES.forEach(n => adj[n.id] = []);
  EDGES.forEach(e => {
    const w = communityFactor(nodeById[e.source].com, nodeById[e.target].com);
    adj[e.source].push({ target: e.target, weight: w });
  });
  NODES.forEach(n => {
    const links = adj[n.id];
    const total = links.reduce((s, l) => s + l.weight, 0);
    if (total > 0) links.forEach(l => l.weight /= total);
  });

  const N = NODES.length;
  let pr = {};
  NODES.forEach(n => pr[n.id] = 1 / N);
  for (let k = 0; k < iters; k++) {
    const next = {};
    NODES.forEach(n => next[n.id] = (1 - d) / N);
    NODES.forEach(n => {
      adj[n.id].forEach(({ target, weight }) => {
        next[target] += d * pr[n.id] * weight;
      });
    });
    pr = next;
  }
  return pr;
}

function betweennessCentrality() {
  const adj = buildAdj();
  const bc = {};
  NODES.forEach(n => bc[n.id] = 0);
  NODES.forEach(s => {
    const S = [];
    const P = {}; NODES.forEach(n => P[n.id] = []);
    const sigma = {}; NODES.forEach(n => sigma[n.id] = 0); sigma[s.id] = 1;
    const dist = {}; NODES.forEach(n => dist[n.id] = -1); dist[s.id] = 0;
    const Q = [s.id];
    while (Q.length) {
      const v = Q.shift(); S.push(v);
      adj[v].forEach(w => {
        if (dist[w] < 0) { dist[w] = dist[v] + 1; Q.push(w); }
        if (dist[w] === dist[v] + 1) { sigma[w] += sigma[v]; P[w].push(v); }
      });
    }
    const delta = {}; NODES.forEach(n => delta[n.id] = 0);
    while (S.length) {
      const w = S.pop();
      P[w].forEach(v => { delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]); });
      if (w !== s.id) bc[w] += delta[w];
    }
  });
  const norm = (NODES.length - 1) * (NODES.length - 2);
  NODES.forEach(n => bc[n.id] /= norm);
  return bc;
}

// ── PRECOMPUTE METRICS ───────────────────────────────────────

const adj = buildAdj();
const inDegMap = {};
const outDegMap = {};
NODES.forEach(n => { inDegMap[n.id] = 0; outDegMap[n.id] = 0; });
EDGES.forEach(e => { inDegMap[e.target]++; outDegMap[e.source]++; });

const pr   = pageRank();
const prw  = weightedPageRank();
const deg  = degreeCentrality();
const bc   = betweennessCentrality();

// Total degree (in + out, undirected view)
function totalDeg(id) { return inDegMap[id] + outDegMap[id]; }

// Clustering coefficient (directed: triangles / k*(k-1))
function clusteringCoeff(id) {
  const neighbors = new Set([...adj[id], ...EDGES.filter(e => e.target === id).map(e => e.source)]);
  const nb = [...neighbors];
  const k = nb.length;
  if (k < 2) return 0;
  let triangles = 0;
  for (let i = 0; i < nb.length; i++) {
    for (let j = 0; j < nb.length; j++) {
      if (i === j) continue;
      if (adj[nb[i]] && adj[nb[i]].includes(nb[j])) triangles++;
    }
  }
  return triangles / (k * (k - 1));
}

const cc = {};
NODES.forEach(n => cc[n.id] = clusteringCoeff(n.id));

// ── CONNECTIVITY (BFS undirected) ────────────────────────────

function connectedComponents() {
  const undirAdj = {};
  NODES.forEach(n => undirAdj[n.id] = new Set());
  EDGES.forEach(e => { undirAdj[e.source].add(e.target); undirAdj[e.target].add(e.source); });
  const visited = new Set();
  const components = [];
  NODES.forEach(n => {
    if (visited.has(n.id)) return;
    const comp = [];
    const queue = [n.id];
    visited.add(n.id);
    while (queue.length) {
      const v = queue.shift();
      comp.push(v);
      undirAdj[v].forEach(nb => {
        if (!visited.has(nb)) { visited.add(nb); queue.push(nb); }
      });
    }
    components.push(comp);
  });
  return components;
}

const components = connectedComponents();

// ── HELPERS ──────────────────────────────────────────────────

function fmtFollowers(f) {
  if (f >= 1e6) return (f / 1e6).toFixed(1) + 'M';
  if (f >= 1e3) return (f / 1e3).toFixed(1) + 'K';
  return String(f);
}

function pad(s, n, right = false) {
  s = String(s);
  if (right) return s.padStart(n);
  return s.padEnd(n);
}

function pct(v) { return (v * 100).toFixed(4) + '%'; }

function rankMap(scoreObj, desc = true) {
  return Object.entries(scoreObj)
    .sort((a, b) => desc ? b[1] - a[1] : a[1] - b[1])
    .reduce((m, [id], i) => { m[id] = i + 1; return m; }, {});
}

const prRank  = rankMap(pr);
const prwRank = rankMap(prw);
const degRank = rankMap(deg);
const bcRank  = rankMap(bc);

// ── PRINT HELPERS ────────────────────────────────────────────

const HR1 = '═'.repeat(110);
const HR2 = '─'.repeat(110);

function header(title) {
  console.log('\n' + HR1);
  console.log('  ' + title);
  console.log(HR1);
}

function subheader(title) {
  console.log('\n' + HR2);
  console.log('  ' + title);
  console.log(HR2);
}

// ── SECTION 1: GRAPH SUMMARY ─────────────────────────────────

header('1. GRAPH SUMMARY');

const N = NODES.length;
const E = EDGES.length;
const avgDeg = (2 * E) / N;
const maxDeg = Math.max(...NODES.map(n => totalDeg(n.id)));
const avgCC  = NODES.reduce((s, n) => s + cc[n.id], 0) / N;

console.log(`  Total nodes          : ${N}`);
console.log(`  Total edges (valid)  : ${E}`);
console.log(`  Communities          : ${Object.keys(COMMUNITIES).length}`);
console.log(`  Connected (undirected): ${components.length === 1 ? 'Yes' : 'No'}`);
console.log(`  Connected components : ${components.length}`);
if (components.length > 1) {
  components.forEach((c, i) => console.log(`    Component ${i + 1}: ${c.length} nodes — [${c.slice(0, 5).join(', ')}${c.length > 5 ? '...' : ''}]`));
}
console.log(`  Average degree       : ${avgDeg.toFixed(3)}`);
console.log(`  Max degree           : ${maxDeg}`);
console.log(`  Avg clustering coeff : ${avgCC.toFixed(4)}`);

// ── SECTION 2: PAGERANK TOP 10 ───────────────────────────────

function printRankingTable(title, scoreObj, scoreLabel) {
  header(title);
  const sorted = Object.entries(scoreObj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id, score], i) => {
      const n = NODES.find(x => x.id === id);
      return { rank: i + 1, id, name: n.name, com: COMMUNITIES[n.com].label, score, deg: totalDeg(id), followers: n.followers };
    });

  const hdr = [
    pad('Rank', 5), pad('Username', 28), pad('Display Name', 22),
    pad('Community', 20), pad(scoreLabel, 12, true), pad('Degree', 8, true), pad('Followers', 12, true)
  ].join('  ');
  console.log(hdr);
  console.log(HR2);

  sorted.forEach(r => {
    console.log([
      pad(r.rank, 5),
      pad('@' + r.id, 28),
      pad(r.name, 22),
      pad(r.com, 20),
      pad(pct(r.score), 12, true),
      pad(r.deg, 8, true),
      pad(fmtFollowers(r.followers), 12, true),
    ].join('  '));
  });
}

printRankingTable('2. PAGERANK TOP 10', pr, 'PR %');
printRankingTable('3. WEIGHTED PAGERANK TOP 10', prw, 'WPR %');
printRankingTable('4. DEGREE CENTRALITY TOP 10', deg, 'Deg Score');
printRankingTable('5. BETWEENNESS CENTRALITY TOP 10', bc, 'BC %');

// ── SECTION 6: COMMUNITY STATISTICS ─────────────────────────

header('6. COMMUNITY STATISTICS');

Object.entries(COMMUNITIES).forEach(([comKey, comMeta]) => {
  const members = NODES.filter(n => n.com === comKey);
  const memberIds = new Set(members.map(n => n.id));

  const internalEdges = EDGES.filter(e => memberIds.has(e.source) && memberIds.has(e.target));
  const internalPct   = (internalEdges.length / E * 100).toFixed(1);
  const avgPR  = members.reduce((s, n) => s + pr[n.id], 0) / members.length;
  const avgDeg2 = members.reduce((s, n) => s + totalDeg(n.id), 0) / members.length;
  const avgCC2  = members.reduce((s, n) => s + cc[n.id], 0) / members.length;

  const hubNode = members.sort((a, b) => pr[b.id] - pr[a.id])[0];

  subheader(`${comMeta.label} (${comKey})`);
  console.log(`  Members              : ${members.length}`);
  console.log(`  Internal edges       : ${internalEdges.length} (${internalPct}% of all edges)`);
  console.log(`  Avg PageRank         : ${pct(avgPR)}`);
  console.log(`  Avg degree           : ${avgDeg2.toFixed(2)}`);
  console.log(`  Avg clustering coeff : ${avgCC2.toFixed(4)}`);
  console.log(`  Top hub (PR)         : @${hubNode.id} — ${pct(pr[hubNode.id])}`);
});

// ── SECTION 7: DEGREE vs PAGERANK DIVERGENCE ─────────────────

header('7. DEGREE RANK vs PAGERANK RANK — divergence > 3');

const divergent = NODES
  .map(n => ({ id: n.id, name: n.name, prR: prRank[n.id], degR: degRank[n.id], diff: Math.abs(prRank[n.id] - degRank[n.id]) }))
  .filter(r => r.diff > 3)
  .sort((a, b) => b.diff - a.diff);

const dHdr = [pad('Username', 28), pad('Display Name', 22), pad('PR Rank', 10, true), pad('Deg Rank', 10, true), pad('|Diff|', 8, true)].join('  ');
console.log(dHdr);
console.log(HR2);
divergent.forEach(r => {
  console.log([pad('@' + r.id, 28), pad(r.name, 22), pad(r.prR, 10, true), pad(r.degR, 10, true), pad(r.diff, 8, true)].join('  '));
});

// ── SECTION 8: TOP 10 IN ALL THREE ALGORITHMS ────────────────

header('8. NODES IN TOP 8 OF ALL THREE ALGORITHMS (PR + Degree + Betweenness)');

const top8PR  = new Set(Object.entries(pr).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([id])=>id));
const top8Deg = new Set(Object.entries(deg).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([id])=>id));
const top8BC  = new Set(Object.entries(bc).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([id])=>id));

const allThree = NODES.filter(n => top8PR.has(n.id) && top8Deg.has(n.id) && top8BC.has(n.id));

if (allThree.length === 0) {
  console.log('  (no node appears in top 8 of all three simultaneously)');
} else {
  const hdr3 = [pad('Username', 28), pad('Name', 22), pad('PR %', 12, true), pad('Deg Score', 12, true), pad('BC %', 12, true)].join('  ');
  console.log(hdr3);
  console.log(HR2);
  allThree.forEach(n => {
    console.log([pad('@' + n.id, 28), pad(n.name, 22), pad(pct(pr[n.id]), 12, true), pad(pct(deg[n.id]), 12, true), pad(pct(bc[n.id]), 12, true)].join('  '));
  });
}

// ── SECTION 9: COMPLETE NODE TABLE ───────────────────────────

header('9. COMPLETE NODE TABLE — sorted by PageRank');

const fullHdr = [
  pad('#', 3),
  pad('Username', 26),
  pad('Name', 20),
  pad('Com', 11),
  pad('Followers', 10, true),
  pad('Deg', 4, true),
  pad('In', 4, true),
  pad('Out', 4, true),
  pad('CC', 6, true),
  pad('PR %', 9, true),
  pad('Deg%', 9, true),
  pad('BC %', 9, true),
  pad('WPR %', 9, true),
].join(' ');

console.log(fullHdr);
console.log(HR2);

const sorted = [...NODES].sort((a, b) => pr[b.id] - pr[a.id]);
sorted.forEach((n, i) => {
  console.log([
    pad(i + 1, 3),
    pad('@' + n.id, 26),
    pad(n.name, 20),
    pad(n.com, 11),
    pad(fmtFollowers(n.followers), 10, true),
    pad(totalDeg(n.id), 4, true),
    pad(inDegMap[n.id], 4, true),
    pad(outDegMap[n.id], 4, true),
    pad(cc[n.id].toFixed(2), 6, true),
    pad(pct(pr[n.id]), 9, true),
    pad(pct(deg[n.id]), 9, true),
    pad(pct(bc[n.id]), 9, true),
    pad(pct(prw[n.id]), 9, true),
  ].join(' '));
});

// ── SECTION 10: CROSS-COMMUNITY EDGES ───────────────────────

header('10. CROSS-COMMUNITY EDGES (bridge links)');

const nodeById2 = {};
NODES.forEach(n => nodeById2[n.id] = n);

const crossEdges = EDGES.filter(e => nodeById2[e.source].com !== nodeById2[e.target].com);

console.log(`  Total cross-community edges: ${crossEdges.length} / ${EDGES.length} (${(crossEdges.length/EDGES.length*100).toFixed(1)}%)`);
console.log('');

const ceHdr = [pad('Source', 28), pad('Src Com', 18), pad('Target', 28), pad('Tgt Com', 18)].join('  ');
console.log(ceHdr);
console.log(HR2);
crossEdges.forEach(e => {
  const s = nodeById2[e.source], t = nodeById2[e.target];
  console.log([
    pad('@' + s.id, 28),
    pad(COMMUNITIES[s.com].label, 18),
    pad('@' + t.id, 28),
    pad(COMMUNITIES[t.com].label, 18),
  ].join('  '));
});

// identify bridge nodes (appear in cross edges)
const bridgeIds = new Set([...crossEdges.map(e => e.source), ...crossEdges.map(e => e.target)]);
console.log('');
console.log(`  Bridge nodes (${bridgeIds.size}): ${[...bridgeIds].map(id => '@' + id).join(', ')}`);

console.log('\n' + HR1);
console.log('  END OF REPORT');
console.log(HR1 + '\n');
