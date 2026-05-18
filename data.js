/* ==========================================================
   Shared dataset: 74 nodes, 107 edges (1 di-skip karena source tak terdaftar)
   Real Indonesian creator collaboration graph + Bengkulu lokal.
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

const NODES = [
  // === KOMUNITAS: nasional ===
  { id: 'willie27_',               name: 'Willie Salim',             com: 'nasional',      followers: 16600000 },
  { id: 'vilmei',                  name: 'Vilmei',                   com: 'nasional',      followers: 14200000 },
  { id: 'ibnuwardani',             name: 'Ibnu Wardani',             com: 'nasional',      followers: 6800000  },
  { id: 'jessnolimit',             name: 'Jess No Limit',            com: 'nasional',      followers: 9600000  },
  { id: 'baimwong',                name: 'Baim Wong',                com: 'nasional',      followers: 20100000 },
  { id: 'fadiljaidi',              name: 'Fadil Jaidi',              com: 'nasional',      followers: 14200000 },
  { id: 'attahalilintar',          name: 'Atta Halilintar',          com: 'nasional',      followers: 39900000 },
  { id: 'aurelie.hermansyah',      name: 'Aurelie Hermansyah',       com: 'nasional',      followers: 34900000 },
  { id: 'raffinagita1717',         name: 'Raffi Nagita',             com: 'nasional',      followers: 75200000 },
  { id: 'riaricis1795',            name: 'Ria Ricis',                com: 'nasional',      followers: 36700000 },
  { id: 'windahbasudara',          name: 'Windah Basudara',          com: 'nasional',      followers: 4100000  },
  { id: 'raditya_dika',            name: 'Raditya Dika',             com: 'nasional',      followers: 21700000 },
  { id: 'fuji_an',                 name: 'Fuji An',                  com: 'nasional',      followers: 20500000 },
  { id: 'thariqhalilintar',        name: 'Thariq Halilintar',        com: 'nasional',      followers: 8000000  },
  { id: 'siscakohl',               name: 'Sisca Kohl',               com: 'nasional',      followers: 3000000  },
  { id: 'jessicajane99',           name: 'Jessica Jane',             com: 'nasional',      followers: 6000000  },
  { id: 'frostdiamondd',           name: 'Frost Diamond',            com: 'nasional',      followers: 2000000  },
  { id: 'mastercorbuzier',         name: 'Deddy Corbuzier',          com: 'nasional',      followers: 12800000 },
  { id: 'boywilliam17',            name: 'Boy William',              com: 'nasional',      followers: 5500000  },
  { id: 'jeromepolin',             name: 'Jerome Polin',             com: 'nasional',      followers: 9500000  },
  { id: 'ekooju',                  name: 'Oura (ekooju)',            com: 'nasional',      followers: 2500000  },
  { id: 'ariefmuhammad',           name: 'Arief Muhammad',           com: 'nasional',      followers: 5600000  },
  { id: 'alshadahmad',             name: 'Alshad Ahmad',             com: 'nasional',      followers: 3600000  },
  { id: 'celloszxz',               name: 'Cellosz',                  com: 'nasional',      followers: 1800000  },
  { id: 'teukuryantr',             name: 'Teuku Ryan',               com: 'nasional',      followers: 2900000  },
  { id: 'fadlyfsl_',               name: 'Fadly Faisal',             com: 'nasional',      followers: 6900000  },
  { id: 'lalitahutami',            name: 'Lalita Hutami',            com: 'nasional',      followers: 2000000  },
  { id: 'keanuagl',                name: 'Keanu AGL',                com: 'nasional',      followers: 5700000  },
  { id: 'clarissaputri',           name: 'Clarissa Putri',           com: 'nasional',      followers: 1300000  },
  { id: 'pakmuh',                  name: 'Pak Muh',                  com: 'nasional',      followers: 1000000  },
  { id: 'bonge_citayam',           name: 'Bonge Citayam',            com: 'nasional',      followers: 100000   },
  { id: 'rianfahardhi',            name: 'Rian Fahardhi',            com: 'nasional',      followers: 595000   },
  { id: 'drrichardlee',            name: 'dr. Richard Lee',          com: 'nasional',      followers: 2200000  },

  // === KOMUNITAS: internasional ===
  { id: 'ishowspeed',              name: 'IShowSpeed',               com: 'internasional', followers: 47900000 },
  { id: 'mrbeast',                 name: 'MrBeast',                  com: 'internasional', followers: 86600000 },
  { id: 'loganpaul',               name: 'Logan Paul',               com: 'internasional', followers: 26100000 },
  { id: 'kaicenat',                name: 'Kai Cenat',                com: 'internasional', followers: 16600000 },
  { id: 'ybrap',                   name: 'YBrap',                    com: 'internasional', followers: 7500000  },
  { id: 'luvadepedreiro',          name: 'Luva de Pedreiro',         com: 'internasional', followers: 20600000 },

  // === KOMUNITAS: lokal (Bengkulu) ===
  { id: 'mariorioio__',            name: 'Mario',                    com: 'lokal',         followers: 1239     },
  { id: 'peuybatik',               name: 'Peuy Batik',               com: 'lokal',         followers: 1288     },
  { id: 'keylaphaulina',           name: 'Keyla Phaulina',           com: 'lokal',         followers: 2384     },
  { id: 'dini_kyl',                name: 'Dini KYL',                 com: 'lokal',         followers: 172      },
  { id: 'atalaptraa',              name: 'Atalap Traa',              com: 'lokal',         followers: 3444     },
  { id: 'rackell_77',              name: 'Rackell 77',               com: 'lokal',         followers: 344      },
  { id: 'alifahdzatilsalsabila',   name: 'Alifah Dzatil',            com: 'lokal',         followers: 3924     },
  { id: 'lutfikurniadi_',          name: 'Lutfi Kurniadi',           com: 'lokal',         followers: 1894     },
  { id: 'nandi_asqora',            name: 'Nandi Asqora',             com: 'lokal',         followers: 3422     },
  { id: 'fakhrialwn',              name: 'Fakhri Alwn',              com: 'lokal',         followers: 300      },
  { id: 'ikesiregar_2',            name: 'Ike Siregar',              com: 'lokal',         followers: 787      },
  { id: 'riskadlf',                name: 'Riska DLF',                com: 'lokal',         followers: 1459     },
  { id: 'aldomeidian',             name: 'Aldo Meidian',             com: 'lokal',         followers: 8775     },
  { id: 'arelta_rski28',           name: 'Arelta Rski',              com: 'lokal',         followers: 860      },
  { id: 'oktmhrnii',               name: 'Oktmhrnii',                com: 'lokal',         followers: 3685     },
  { id: 'erza_efrilian',           name: 'Erza Efrilian',            com: 'lokal',         followers: 1350     },
  { id: 'viocahayadi_s',           name: 'Vio Cahayadi',             com: 'lokal',         followers: 1195     },
  { id: 'ezillamarchellah',        name: 'Ezilla Marchellah',        com: 'lokal',         followers: 3881     },
  { id: 'aldeesaputraa_',          name: 'Aldee Saputra',            com: 'lokal',         followers: 1013     },
  { id: 'laylaarisyah',            name: 'Layla Arisyah',            com: 'lokal',         followers: 3788     },
  { id: 'slw.azky',                name: 'Slw Azky',                 com: 'lokal',         followers: 1866     },
  { id: 'dionn_yonn20',            name: 'Dion Yonn',                com: 'lokal',         followers: 1393     },
  { id: 'galeh_004',               name: 'Galeh 004',                com: 'lokal',         followers: 1468     },
  { id: 'akbarsumbar',             name: 'Akbar Sumbar',             com: 'lokal',         followers: 9926     },

  // === KOMUNITAS: organisasi ===
  { id: 'ikatandutahivaidsprovbengkulu', name: 'Ikatan Duta HIV AIDS BKL', com: 'organisasi', followers: 11200 },

  // === KOMUNITAS: brand ===
  { id: 'erigostore',              name: 'Erigo Store',              com: 'brand',         followers: 2200000  },
  { id: 'msglownformen',           name: 'MS Glow for Men',          com: 'brand',         followers: 22100    },
  { id: 'grabid',                  name: 'Grab ID',                  com: 'brand',         followers: 1100000  },
  { id: 'shopee_id',               name: 'Shopee ID',                com: 'brand',         followers: 8800000  },
  { id: 'rans.entertainment',      name: 'Rans Entertainment',       com: 'brand',         followers: 4400000  },

  // === KOMUNITAS: politik ===
  { id: 'sandiuno',                name: 'Sandiaga Uno',             com: 'politik',       followers: 8800000  },
  { id: 'sbnajamudi',              name: 'SBN Ajamudi (Ketua DPD)',  com: 'politik',       followers: 1300000  },
  { id: 'danifazli',               name: 'Dani Fazli',               com: 'politik',       followers: 21300    },
  { id: 'arifhidayatid',           name: 'Arif Hidayat',             com: 'politik',       followers: 18200    },
  { id: 'drs.hsumardi.mm07',       name: 'H. Sumardi (Ketua DPRD)',  com: 'politik',       followers: 1013     },
];

const EDGES = [
  // Willie Salim
  { source: 'willie27_',    target: 'vilmei' },
  { source: 'willie27_',    target: 'ibnuwardani' },
  { source: 'willie27_',    target: 'jessnolimit' },
  { source: 'willie27_',    target: 'fadiljaidi' },
  { source: 'willie27_',    target: 'baimwong' },
  { source: 'ishowspeed',   target: 'willie27_' },
  { source: 'shopee_id',    target: 'willie27_' },
  // Vilmei
  { source: 'vilmei',       target: 'bonge_citayam' },
  { source: 'vilmei',       target: 'rianfahardhi' },
  { source: 'vilmei',       target: 'fuji_an' },
  { source: 'vilmei',       target: 'windahbasudara' },
  { source: 'drrichardlee', target: 'vilmei' },
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
  { source: 'ibnuwardani',  target: 'lalitahutami' },
  { source: 'lalitahutami', target: 'ibnuwardani' },
  { source: 'ibnuwardani',  target: 'willie27_' },
  { source: 'ibnuwardani',  target: 'vilmei' },
  { source: 'ibnuwardani',  target: 'teukuryantr' },
  { source: 'ibnuwardani',  target: 'fuji_an' },
  { source: 'ibnuwardani',  target: 'fadlyfsl_' },
  { source: 'ibnuwardani',  target: 'baimwong' },
  { source: 'ibnuwardani',  target: 'siscakohl' },
  { source: 'ibnuwardani',  target: 'ariefmuhammad' },
  { source: 'ibnuwardani',  target: 'fadiljaidi' },
  { source: 'ibnuwardani',  target: 'alshadahmad' },
  { source: 'ibnuwardani',  target: 'celloszxz' },
  { source: 'riaricis1795', target: 'ibnuwardani' },
  { source: 'attahalilintar', target: 'ibnuwardani' },
  { source: 'thariqhalilintar', target: 'ibnuwardani' },
  { source: 'jessnolimit',  target: 'ibnuwardani' },
  { source: 'rans.entertainment', target: 'ibnuwardani' },
  { source: 'erigostore',   target: 'ibnuwardani' },
  { source: 'shopee_id',    target: 'ibnuwardani' },
  { source: 'msglownformen', target: 'ibnuwardani' },
  { source: 'grabid',       target: 'ibnuwardani' },
  // Jess No Limit
  { source: 'jessnolimit',  target: 'raditya_dika' },
  { source: 'jessnolimit',  target: 'windahbasudara' },
  { source: 'jessnolimit',  target: 'frostdiamondd' },
  { source: 'mastercorbuzier', target: 'jessnolimit' },
  { source: 'attahalilintar', target: 'jessnolimit' },
  { source: 'boywilliam17', target: 'jessnolimit' },
  { source: 'jessnolimit',  target: 'siscakohl' },
  { source: 'siscakohl',    target: 'jessnolimit' },
  { source: 'jessnolimit',  target: 'jessicajane99' },
  { source: 'jessicajane99', target: 'jessnolimit' },
  { source: 'jessnolimit',  target: 'ekooju' },
  { source: 'ekooju',       target: 'jessnolimit' },
  // Baim Wong
  { source: 'baimwong',     target: 'raffinagita1717' },
  { source: 'baimwong',     target: 'attahalilintar' },
  { source: 'baimwong',     target: 'thariqhalilintar' },
  { source: 'baimwong',     target: 'aurelie.hermansyah' },
  { source: 'baimwong',     target: 'willie27_' },
  { source: 'mastercorbuzier', target: 'baimwong' },
  { source: 'rans.entertainment', target: 'baimwong' },
  // Fadil Jaidi
  { source: 'fadiljaidi',   target: 'pakmuh' },
  { source: 'fadiljaidi',   target: 'raffinagita1717' },
  { source: 'fadiljaidi',   target: 'mastercorbuzier' },
  { source: 'fadiljaidi',   target: 'attahalilintar' },
  { source: 'fadiljaidi',   target: 'aurelie.hermansyah' },
  { source: 'fadiljaidi',   target: 'baimwong' },
  { source: 'fadiljaidi',   target: 'keanuagl' },
  { source: 'fadiljaidi',   target: 'clarissaputri' },
  { source: 'jeromepolin',  target: 'fadiljaidi' },
  // IShowSpeed
  { source: 'ishowspeed',   target: 'kaicenat' },
  { source: 'ishowspeed',   target: 'ybrap' },
  { source: 'ishowspeed',   target: 'luvadepedreiro' },
  { source: 'mrbeast',      target: 'ishowspeed' },
  { source: 'loganpaul',    target: 'ishowspeed' },
  // Mario (Lokal Bengkulu)
  { source: 'mariorioio__', target: 'keylaphaulina' },
  { source: 'mariorioio__', target: 'dini_kyl' },
  { source: 'mariorioio__', target: 'atalaptraa' },
  { source: 'mariorioio__', target: 'rackell_77' },
  { source: 'mariorioio__', target: 'peuybatik' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'mariorioio__' },
  { source: 'dutakreator.id', target: 'mariorioio__' },  // source tidak terdaftar di NODES — di-skip oleh adjacency() & weightedPageRank()
  // Ikatan Duta HIV AIDS
  { source: 'ikatandutahivaidsprovbengkulu', target: 'fakhrialwn' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'ikesiregar_2' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'riskadlf' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'aldomeidian' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'arelta_rski28' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'akbarsumbar' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'oktmhrnii' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'erza_efrilian' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'viocahayadi_s' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'ezillamarchellah' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'aldeesaputraa_' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'laylaarisyah' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'slw.azky' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'dionn_yonn20' },
  { source: 'galeh_004',    target: 'ikatandutahivaidsprovbengkulu' },
  // Duta Kreator → Politik
  { source: 'ikatandutahivaidsprovbengkulu', target: 'sandiuno' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'sbnajamudi' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'danifazli' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'arifhidayatid' },
  { source: 'ikatandutahivaidsprovbengkulu', target: 'drs.hsumardi.mm07' },
  // Peuy Batik
  { source: 'alifahdzatilsalsabila', target: 'peuybatik' },
  { source: 'nandi_asqora', target: 'peuybatik' },
  { source: 'peuybatik',    target: 'lutfikurniadi_' },
  { source: 'lutfikurniadi_', target: 'peuybatik' },
];

// ---------- Algorithms ----------
function adjacency() {
  const adj = {};
  NODES.forEach(n => adj[n.id] = []);
  EDGES.forEach(e => {
    if (!adj[e.source] || !adj[e.target]) return;  // skip edge dgn node tak dikenal
    adj[e.source].push(e.target);
    adj[e.target].push(e.source);
  });
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

/**
 * Weighted PageRank dengan:
 * 1. Log-normalized followers sebagai bobot edge
 * 2. Community dampening untuk menjaga balance lokal vs internasional
 *
 * bobot_edge(A→B) = log(followers_B + 1) / log(maxFollowers + 1)
 *                  × communityFactor(A.com, B.com)
 *
 * Community factor:
 *   - Koneksi antar lokal Bengkulu      : ×1.5  (perkuat komunitas lokal)
 *   - Koneksi masuk ke lokal            : ×1.3
 *   - Koneksi sesama nasional           : ×1.0  (netral)
 *   - Koneksi dari/ke internasional     : ×0.6  (dampen agar tidak dominan)
 */
function weightedPageRank(d = 0.85, iters = 80) {
  const nodeById = {};
  NODES.forEach(n => nodeById[n.id] = n);

  const maxFollowers = Math.max(...NODES.map(n => n.followers));

  function logNorm(followers) {
    return Math.log(followers + 1) / Math.log(maxFollowers + 1);
  }

  function communityFactor(sourceCom, targetCom) {
    const isIntl = (c) => c === 'internasional';
    const isLokal = (c) => c === 'lokal';
    if (isLokal(sourceCom) && isLokal(targetCom)) return 1.5;
    if (isLokal(targetCom)) return 1.3;
    if (isIntl(sourceCom) || isIntl(targetCom)) return 0.6;
    return 1.0;
  }

  // Build weighted directed adjacency: adj[source] = [{ target, weight }]
  const adj = {};
  NODES.forEach(n => adj[n.id] = []);

  EDGES.forEach(e => {
    const src = e.source, tgt = e.target;
    if (!nodeById[src] || !nodeById[tgt]) return;
    const w = logNorm(nodeById[tgt].followers)
            * communityFactor(nodeById[src].com, nodeById[tgt].com);
    adj[src].push({ target: tgt, weight: w });
  });

  // Normalize outgoing weights per node (sum to 1)
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
  degree:      degreeCentrality(),
  pagerank:    pageRank(),
  pagerank_w:  weightedPageRank(),
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
