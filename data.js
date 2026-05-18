/* ==========================================================
   Shared dataset: 65 nodes, ~218 edges
   Realistic Indonesian creator collaboration graph.
   Communities: nasional, lokal (Bengkulu), internasional,
                organisasi, brand, politik
   ========================================================== */

// Community keys must match CSS vars --com-*
const COMMUNITIES = {
  nasional:      { label: 'Kreator Nasional',     color: '#c15f3c' },  // terracotta
  lokal:         { label: 'Lokal Bengkulu',       color: '#6e8a4f' },  // sage
  internasional: { label: 'Internasional',        color: '#934133' },  // rust
  organisasi:    { label: 'Organisasi / Media',   color: '#b58940' },  // ochre
  brand:         { label: 'Brand Endorsement',    color: '#6e6094' },  // dusty violet
  politik:       { label: 'Politik / Tokoh',      color: '#4a6a7b' },  // steel blue
};

// --- Named "anchor" nodes (real-ish public Indonesian creators + brands) ---
const NAMED_NODES = [
  // Nasional - kreator besar
  { id: 'willie27_',     name: 'Willie Salim',     com: 'nasional', followers: 8.4 },
  { id: 'mariodandy',    name: 'Mario',            com: 'nasional', followers: 2.1 },
  { id: 'jessnolimit',   name: 'Jess No Limit',    com: 'nasional', followers: 12.3 },
  { id: 'baimwong',      name: 'Baim Wong',        com: 'nasional', followers: 21.5 },
  { id: 'vilmei.id',     name: 'Vilmei',           com: 'nasional', followers: 3.2 },
  { id: 'fadilj',        name: 'Fadil Jaidi',      com: 'nasional', followers: 9.7 },
  { id: 'rachelvennya',  name: 'Rachel Vennya',    com: 'nasional', followers: 6.8 },
  { id: 'gita.savitri',  name: 'Gita Savitri',     com: 'nasional', followers: 1.4 },
  { id: 'arieftvonly',   name: 'Arief TV',         com: 'nasional', followers: 4.6 },

  // Lokal Bengkulu
  { id: 'bkl_riska',     name: 'Riska Bengkulu',   com: 'lokal', followers: 0.18 },
  { id: 'bkl_dimas',     name: 'Dimas Curup',      com: 'lokal', followers: 0.42 },
  { id: 'bkl_food',      name: 'Bengkulu Foodies', com: 'lokal', followers: 0.27 },
  { id: 'kotabkl',       name: 'Info Kota Bkl',    com: 'lokal', followers: 0.31 },
  { id: 'bkl_explore',   name: 'Explore Bengkulu', com: 'lokal', followers: 0.22 },
  { id: 'unib_kampus',   name: 'UNIB Mahasiswa',   com: 'lokal', followers: 0.09 },

  // Internasional
  { id: 'mrbeast',       name: 'MrBeast',          com: 'internasional', followers: 88.0 },
  { id: 'kshmrmusic',    name: 'KSHMR',            com: 'internasional', followers: 5.3 },
  { id: 'speed',         name: 'IShowSpeed',       com: 'internasional', followers: 32.1 },

  // Organisasi / Media
  { id: 'cnnindonesia',  name: 'CNN Indonesia',    com: 'organisasi', followers: 6.4 },
  { id: 'detikcom',      name: 'detik.com',        com: 'organisasi', followers: 4.9 },
  { id: 'narasi.tv',     name: 'Narasi',           com: 'organisasi', followers: 2.8 },
  { id: 'rri.bkl',       name: 'RRI Bengkulu',     com: 'organisasi', followers: 0.06 },

  // Brand
  { id: 'tokopedia',     name: 'Tokopedia',        com: 'brand', followers: 8.2 },
  { id: 'mieaceh',       name: 'Mie Aceh Brand',   com: 'brand', followers: 0.8 },
  { id: 'kopikenangan',  name: 'Kopi Kenangan',    com: 'brand', followers: 1.7 },
  { id: 'shopee_id',     name: 'Shopee ID',        com: 'brand', followers: 9.1 },

  // Politik
  { id: 'ganjarp',       name: 'Tokoh Publik A',   com: 'politik', followers: 5.5 },
  { id: 'pemkot_bkl',    name: 'Pemkot Bengkulu',  com: 'politik', followers: 0.14 },
];

// --- Generate filler nodes to reach 65 ---
function buildAllNodes() {
  const nodes = [...NAMED_NODES];
  const fillerPlan = [
    { com: 'nasional', count: 13, prefix: 'creator' },
    { com: 'lokal',    count: 8,  prefix: 'bkl' },
    { com: 'internasional', count: 5, prefix: 'intl' },
    { com: 'organisasi',   count: 5, prefix: 'org' },
    { com: 'brand',        count: 3, prefix: 'brand' },
    { com: 'politik',      count: 3, prefix: 'tokoh' },
  ];
  fillerPlan.forEach(({ com, count, prefix }) => {
    for (let i = 0; i < count; i++) {
      const id = `${prefix}_${String(i+1).padStart(2,'0')}`;
      nodes.push({
        id,
        name: id,
        com,
        followers: Math.round((Math.random() * 1.5 + 0.05) * 100) / 100,
        synthetic: true,
      });
    }
  });
  return nodes;
}

const NODES = buildAllNodes();

// --- Edges: hand-curated for named, randomized within community for filler ---
function buildAllEdges() {
  const edges = [];
  const add = (s, t) => {
    if (s === t) return;
    const key = [s,t].sort().join('|');
    if (edges.some(e => [e.source,e.target].sort().join('|') === key)) return;
    edges.push({ source: s, target: t });
  };

  // Named-to-named curated collaborations
  const curated = [
    // Willie as central bridge
    ['willie27_','mariodandy'], ['willie27_','jessnolimit'], ['willie27_','baimwong'],
    ['willie27_','vilmei.id'], ['willie27_','fadilj'], ['willie27_','rachelvennya'],
    ['willie27_','bkl_riska'], ['willie27_','bkl_dimas'], ['willie27_','bkl_food'],
    ['willie27_','kotabkl'], ['willie27_','arieftvonly'], ['willie27_','tokopedia'],
    ['willie27_','mrbeast'],
    // Other nasional cluster
    ['baimwong','rachelvennya'], ['baimwong','fadilj'], ['baimwong','tokopedia'],
    ['baimwong','shopee_id'], ['baimwong','cnnindonesia'], ['baimwong','ganjarp'],
    ['jessnolimit','speed'], ['jessnolimit','mariodandy'], ['jessnolimit','vilmei.id'],
    ['jessnolimit','kshmrmusic'], ['jessnolimit','tokopedia'],
    ['fadilj','rachelvennya'], ['fadilj','gita.savitri'], ['fadilj','narasi.tv'],
    ['fadilj','arieftvonly'], ['fadilj','kopikenangan'],
    ['mariodandy','vilmei.id'], ['mariodandy','arieftvonly'],
    ['rachelvennya','gita.savitri'], ['rachelvennya','narasi.tv'], ['rachelvennya','kopikenangan'],
    ['gita.savitri','narasi.tv'], ['gita.savitri','cnnindonesia'],
    ['arieftvonly','detikcom'], ['arieftvonly','narasi.tv'],

    // Bengkulu cluster (dense internal)
    ['bkl_riska','bkl_dimas'], ['bkl_riska','bkl_food'], ['bkl_riska','kotabkl'],
    ['bkl_riska','bkl_explore'], ['bkl_dimas','bkl_food'], ['bkl_dimas','kotabkl'],
    ['bkl_food','bkl_explore'], ['bkl_food','kotabkl'], ['bkl_food','mieaceh'],
    ['kotabkl','bkl_explore'], ['kotabkl','rri.bkl'], ['kotabkl','pemkot_bkl'],
    ['bkl_explore','unib_kampus'], ['unib_kampus','rri.bkl'], ['unib_kampus','pemkot_bkl'],
    ['pemkot_bkl','rri.bkl'], ['pemkot_bkl','ganjarp'],

    // Internasional
    ['mrbeast','speed'], ['mrbeast','jessnolimit'], ['speed','kshmrmusic'],

    // Organisasi
    ['cnnindonesia','detikcom'], ['cnnindonesia','narasi.tv'], ['detikcom','narasi.tv'],
    ['cnnindonesia','ganjarp'], ['detikcom','ganjarp'], ['rri.bkl','pemkot_bkl'],

    // Brand
    ['tokopedia','shopee_id'], ['tokopedia','kopikenangan'], ['shopee_id','kopikenangan'],
    ['kopikenangan','fadilj'], ['mieaceh','tokopedia'],
  ];
  curated.forEach(([a,b]) => add(a,b));

  // Connect filler nodes within their own community + occasional bridge
  const byCom = {};
  NODES.forEach(n => { (byCom[n.com] = byCom[n.com] || []).push(n.id); });

  // Each filler gets 2-5 internal edges
  NODES.filter(n => n.synthetic).forEach(n => {
    const pool = byCom[n.com].filter(id => id !== n.id);
    const degree = 2 + Math.floor(Math.random() * 4);
    for (let i = 0; i < degree; i++) {
      const target = pool[Math.floor(Math.random() * pool.length)];
      add(n.id, target);
    }
    // 30% chance of a bridge edge to another community via a named hub
    if (Math.random() < 0.30) {
      const hubs = ['willie27_','baimwong','fadilj','cnnindonesia','tokopedia','jessnolimit'];
      add(n.id, hubs[Math.floor(Math.random() * hubs.length)]);
    }
  });

  return edges;
}

// Stable seed for reproducibility
(function seedRandom(){
  let s = 42;
  Math.random = function() { s = (s * 9301 + 49297) % 233280; return s / 233280; };
})();
const EDGES = buildAllEdges();

// ---------- Algorithms ----------
function adjacency() {
  const adj = {};
  NODES.forEach(n => adj[n.id] = []);
  EDGES.forEach(e => { adj[e.source].push(e.target); adj[e.target].push(e.source); });
  return adj;
}

function degreeCentrality() {
  const adj = adjacency();
  const max = NODES.length - 1;
  const out = {};
  NODES.forEach(n => { out[n.id] = adj[n.id].length / max; });
  return out;
}

function pageRank(d = 0.85, iters = 60) {
  const adj = adjacency();
  const N = NODES.length;
  let pr = {}; NODES.forEach(n => pr[n.id] = 1/N);
  for (let k = 0; k < iters; k++) {
    const next = {};
    NODES.forEach(n => next[n.id] = (1-d)/N);
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

function betweennessCentrality() {
  // Brandes' algorithm, unweighted
  const adj = adjacency();
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
      P[w].forEach(v => { delta[v] += (sigma[v]/sigma[w]) * (1 + delta[w]); });
      if (w !== s.id) bc[w] += delta[w];
    }
  });
  // Normalize (undirected: divide by 2)
  const norm = ((NODES.length-1) * (NODES.length-2));
  NODES.forEach(n => bc[n.id] = bc[n.id] / norm);
  return bc;
}

// Cache results
const SCORES = {
  degree: degreeCentrality(),
  pagerank: pageRank(),
  betweenness: betweennessCentrality(),
};

// Helper: top N by score
function topBy(scoreMap, n = 10) {
  return Object.entries(scoreMap)
    .map(([id, s]) => ({ ...NODES.find(x => x.id === id), score: s }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

// Expose
window.GRAPH = { NODES, EDGES, COMMUNITIES, SCORES, topBy, adjacency };
