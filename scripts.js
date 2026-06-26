let allPublications = [];
let showingSelected = true;

document.addEventListener('DOMContentLoaded', function () {
  loadPublications();

  document.querySelectorAll('section').forEach((s, i) => {
    s.style.animationDelay = (i * 0.1) + 's';
  });

  const btn = document.getElementById('toggle-publications');
  if (btn) btn.addEventListener('click', togglePublications);

  // ── Hamburger toggle ──────────────────────────────
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        mobileNav.setAttribute('aria-hidden', true);
      });
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        mobileNav.setAttribute('aria-hidden', true);
      }
    });
  }

  // ── Active sidebar link on scroll ────────────────
  const sections = document.querySelectorAll('section[id]');
  const sidebarLinks = document.querySelectorAll('#sidebar nav a');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sidebarLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`#sidebar nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => scrollObserver.observe(s));
});

// ── Publications ───────────────────────────────────
function loadPublications() {
  fetch('publications.json')
    .then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(data => {
      allPublications = data.publications || [];
      renderPublications(true);
    })
    .catch(err => {
      console.error('Error loading publications:', err);
      document.getElementById('publications-container').innerHTML =
        '<p style="color:#888;font-size:0.9rem;padding:1rem 0;">Publications could not be loaded. Ensure <code>publications.json</code> is in the same folder.</p>';
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
  const thumbSrc = p.thumbnail || '';
  const thumb = thumbSrc
    ? `<img src="${thumbSrc}" alt="thumbnail" loading="lazy">`
    : `<span class="pub-thumbnail-placeholder">📄</span>`;
  const thumbClick = thumbSrc ? `onclick="openModal('${thumbSrc}')"` : '';
  const award = p.award ? `<span class="pub-award">🏆 ${p.award}</span>` : '';
  const links = (p.links || [])
    .map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`)
    .join('');
  const authors = (p.authors || '')
    .replace(/Kuldeep Singh Shivran/g,
      '<span class="highlight-name">Kuldeep Singh Shivran</span>');
  return `
    <div class="publication-item">
      <div class="pub-thumbnail" ${thumbClick}>${thumb}</div>
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
