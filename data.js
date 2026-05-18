/* ==========================================================
   Shared dataset: 28 nodes, 66 edges (directed)
   Indonesian creator collaboration graph — Bengkulu local + national.
   Communities: nasional, lokal (Bengkulu)
   ========================================================== */

// Community keys must match CSS vars --com-*
const COMMUNITIES = {
  nasional:      { label: 'Kreator Nasional',     color: '#c15f3c' },  // terracotta
  lokal:         { label: 'Lokal Bengkulu',       color: '#6e8a4f' },  // sage
};

const NODES = [
  // === KOMUNITAS: nasional (14 nodes) ===
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

  // === KOMUNITAS: lokal (Bengkulu, 14 nodes) ===
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

const EDGES = [
  // Willie Salim
  { source: 'willie27_',    target: 'vilmei' },
  { source: 'willie27_',    target: 'ibnuwardani' },
  { source: 'willie27_',    target: 'jessnolimit' },
  { source: 'willie27_',    target: 'fadiljaidi' },
  { source: 'willie27_',    target: 'baimwong' },
  // Vilmei
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
  // Ibnu Wardani
  { source: 'ibnuwardani',  target: 'willie27_' },
  { source: 'ibnuwardani',  target: 'vilmei' },
  { source: 'ibnuwardani',  target: 'fuji_an' },
  { source: 'ibnuwardani',  target: 'baimwong' },
  { source: 'ibnuwardani',  target: 'siscakohl' },
  { source: 'ibnuwardani',  target: 'fadiljaidi' },
  { source: 'riaricis1795', target: 'ibnuwardani' },
  { source: 'attahalilintar', target: 'ibnuwardani' },
  { source: 'jessnolimit',  target: 'ibnuwardani' },
  // Jess No Limit
  { source: 'jessnolimit',  target: 'windahbasudara' },
  { source: 'mastercorbuzier', target: 'jessnolimit' },
  { source: 'attahalilintar', target: 'jessnolimit' },
  { source: 'jessnolimit',  target: 'siscakohl' },
  { source: 'siscakohl',    target: 'jessnolimit' },
  // Baim Wong
  { source: 'baimwong',     target: 'raffinagita1717' },
  { source: 'baimwong',     target: 'attahalilintar' },
  { source: 'baimwong',     target: 'aurelie.hermansyah' },
  { source: 'baimwong',     target: 'willie27_' },
  { source: 'mastercorbuzier', target: 'baimwong' },
  // Fadil Jaidi
  { source: 'fadiljaidi',   target: 'raffinagita1717' },
  { source: 'fadiljaidi',   target: 'mastercorbuzier' },
  { source: 'fadiljaidi',   target: 'attahalilintar' },
  { source: 'fadiljaidi',   target: 'aurelie.hermansyah' },
  { source: 'fadiljaidi',   target: 'baimwong' },
  // Mario (Lokal Bengkulu hub)
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
  // Ikatan Duta HIV AIDS (lokal community)
  { source: 'ikatandutahivaidsprovbengkulu', target: 'aldomeidian' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'akbarsumbar' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'oktmhrnii' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'ezillamarchellah' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'laylaarisyah' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'slw.azky' },
  { source: 'galeh_004',    target: 'ikatandutahivaidsprovbengkulu' },
  // Peuy Batik
  { source: 'alifahdzatilsalsabila', target: 'peuybatik' },
  { source: 'nandi_asqora', target: 'peuybatik' },
  { source: 'peuybatik',    target: 'mariorioio__' },
];

// ---------- Algorithms ----------
function adjacency() {
  const adj = {};
  NODES.forEach(n => adj[n.id] = []);
  EDGES.forEach(e => {
    if (!adj[e.source] || !adj[e.target]) return;  // skip edge dgn node tak dikenal
    adj[e.source].push(e.target);  // directed: hanya arah keluar
  });
  return adj;
}

function degreeCentrality() {
  // In-degree: jumlah edge masuk ke node — mengukur seberapa banyak yang menunjuk ke node ini
  const inDeg = {};
  NODES.forEach(n => inDeg[n.id] = 0);
  EDGES.forEach(e => {
    if (!inDeg.hasOwnProperty(e.source) || !inDeg.hasOwnProperty(e.target)) return;
    inDeg[e.target]++;
  });
  const max = NODES.length - 1;
  const out = {};
  NODES.forEach(n => { out[n.id] = inDeg[n.id] / max; });
  return out;
}

function pageRank(d = 0.85, iters = 60) {
  const adj = adjacency();  // directed outgoing
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

// Cache results
const SCORES = {
  degree:   degreeCentrality(),
  pagerank: pageRank(),
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
