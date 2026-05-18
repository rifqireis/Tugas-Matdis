/* Skala global halaman & graf. Ubah PAGE_SCALE untuk mengatur ulang. */
const PAGE_SCALE = 1.25;

function applyScale() {
  const m = document.querySelector('meta[name="viewport"]');
  if (m) m.setAttribute('content', `width=device-width,initial-scale=${PAGE_SCALE}`);
  document.documentElement.style.zoom = PAGE_SCALE;
  window.PAGE_SCALE = PAGE_SCALE;
}

applyScale();
