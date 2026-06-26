let allPublications = [];
let showingSelected = true;

document.addEventListener('DOMContentLoaded', function () {
  loadPublications();

  document.querySelectorAll('section').forEach((s, i) => {
    s.style.animationDelay = (i * 0.1) + 's';
  });

  const btn = document.getElementById('toggle-publications');
  if (btn) btn.addEventListener('click', togglePublications);

  // ── Sticky nav logic ──────────────────────────────────
  const nav         = document.getElementById('main-nav');
  const sentinel    = document.getElementById('nav-sentinel');
  const placeholder = document.getElementById('nav-placeholder');

  function getNavHeight() {
    return nav.getBoundingClientRect().height;
  }

  function applyNavHeight(h) {
    // keep sections' scroll-margin-top in sync with actual nav height
    document.documentElement.style.setProperty('--nav-height', h + 'px');
  }

  // Use IntersectionObserver on the sentinel (sits just above nav).
  // When sentinel leaves the top of the viewport, nav should become fixed.
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        // Sentinel has scrolled above viewport — fix the nav
        const h = getNavHeight();
        placeholder.style.display = 'block';
        placeholder.style.height  = h + 'px';
        nav.classList.add('nav-fixed');
        applyNavHeight(h);
      } else {
        // Sentinel is visible again — release nav back to normal flow
        nav.classList.remove('nav-fixed');
        placeholder.style.display = 'none';
        placeholder.style.height  = '0';
        applyNavHeight(0);
      }
    },
    { threshold: 0, rootMargin: '0px' }
  );

  observer.observe(sentinel);

  // Update nav height on resize (e.g. nav wraps to two lines on narrow screens)
  window.addEventListener('resize', () => {
    if (nav.classList.contains('nav-fixed')) {
      const h = getNavHeight();
      placeholder.style.height = h + 'px';
      applyNavHeight(h);
    }
  });
});

// ── Publications ──────────────────────────────────────
function loadPublications() {
  fetch('publications.json')
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(data => {
      allPublications = data.publications;
      renderPublications(true);
    })
    .catch(err => {
      console.error('Error loading publications:', err);
      document.getElementById('publications-container').innerHTML =
        '<p style="color:#888;font-size:0.9rem;">Could not load publications. ' +
        'Serve via a local HTTP server: <code>python3 -m http.server</code></p>';
    });
}

function renderPublications(selectedOnly) {
  const container = document.getElementById('publications-container');
  if (!container) return;

  const pubs = selectedOnly
    ? allPublications.filter(p => p.selected)
    : allPublications;

  if (!pubs.length) {
    container.innerHTML = '<p style="color:#888;font-size:0.9rem;">No publications found.</p>';
    return;
  }

  container.innerHTML = pubs.map(p => buildPubHTML(p)).join('');
}

function buildPubHTML(p) {
  const thumb = p.thumbnail
    ? `<img src="${p.thumbnail}" alt="thumbnail" onclick="openModal('${p.thumbnail}')" loading="lazy">`
    : `<span class="pub-thumbnail-placeholder">📄</span>`;

  const award = p.award
    ? `<span class="pub-award">🏆 ${p.award}</span>`
    : '';

  const links = (p.links || [])
    .map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`)
    .join('');

  // Bold the author name
  const authors = (p.authors || '')
    .replace(/Kuldeep Singh Shivran/g,
      '<span class="highlight-name">Kuldeep Singh Shivran</span>');

  return `
    <div class="publication-item">
      <div class="pub-thumbnail" onclick="${p.thumbnail ? `openModal('${p.thumbnail}')` : ''}">${thumb}</div>
      <div class="pub-content">
        <div class="pub-title">${p.title || ''}</div>
        <div class="pub-authors">${authors}</div>
        <div class="pub-venue-container">
          <span class="pub-venue">${p.venue || ''}</span>
          ${award}
        </div>
        <div class="pub-links">${links}</div>
      </div>
    </div>`;
}

function togglePublications() {
  showingSelected = !showingSelected;
  renderPublications(showingSelected);
  const btn = document.getElementById('toggle-publications');
  const hdr = document.getElementById('toggle-header');
  if (btn) btn.textContent = showingSelected ? 'Show All' : 'Show Selected';
  if (hdr) hdr.textContent = showingSelected ? 'Selected Publications' : 'All Publications';
}

function openModal(src) {
  const modal = document.getElementById('imageModal');
  const img   = document.getElementById('modalImage');
  if (!modal || !img) return;
  img.src = src;
  modal.style.display = 'block';
  setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => { modal.style.display = 'none'; }, 300);
}

window.addEventListener('click', e => {
  const modal = document.getElementById('imageModal');
  if (e.target === modal) closeModal();
});
