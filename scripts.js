let allPublications = [];
let showingSelected = true;

document.addEventListener('DOMContentLoaded', function () {
  loadPublications();
  document.querySelectorAll('section').forEach((s, i) => {
    s.style.animationDelay = (i * 0.1) + 's';
  });
  const btn = document.getElementById('toggle-publications');
  if (btn) btn.addEventListener('click', togglePublications);
});

// ── Photo upload ──────────────────────────────────────────────────────────────
function loadPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.getElementById('profilePhoto');
    img.src = e.target.result;
    img.classList.add('loaded');
  };
  reader.readAsDataURL(file);
}

// ── Publications ──────────────────────────────────────────────────────────────
function loadPublications() {
  fetch('publications.json')
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(data => { allPublications = data.publications; renderPublications(true); })
    .catch(err => {
      console.error('Error loading publications:', err);
      document.getElementById('publications-container').innerHTML =
        '<p style="color:#888;">Could not load publications. Serve via a local HTTP server: <code>python3 -m http.server</code></p>';
    });
}

function togglePublications() {
  showingSelected = !showingSelected;
  renderPublications(showingSelected);
  document.getElementById('toggle-publications').textContent = showingSelected ? 'Show All' : 'Show Selected';
  document.getElementById('toggle-header').textContent = showingSelected ? 'Selected Publications' : 'All Publications';
}

function renderPublications(selectedOnly) {
  const container = document.getElementById('publications-container');
  container.innerHTML = '';
  const list = selectedOnly ? allPublications.filter(p => p.selected === 1) : allPublications;
  list.forEach(pub => container.appendChild(createPublicationElement(pub)));
}

function createPublicationElement(pub) {
  const item = document.createElement('div');
  item.className = 'publication-item';

  // Thumbnail
  const thumb = document.createElement('div');
  thumb.className = 'pub-thumbnail';
  thumb.onclick = () => openModal(pub.thumbnail);
  const tImg = document.createElement('img');
  tImg.src = pub.thumbnail;
  tImg.alt = pub.title + ' thumbnail';
  tImg.onerror = function () {
    this.style.display = 'none';
    const ph = document.createElement('div');
    ph.className = 'pub-thumbnail-placeholder';
    ph.innerHTML = '&#128196;';
    thumb.appendChild(ph);
  };
  thumb.appendChild(tImg);

  // Content
  const content = document.createElement('div');
  content.className = 'pub-content';

  const title = document.createElement('div');
  title.className = 'pub-title';
  title.textContent = pub.title;
  content.appendChild(title);

  const authors = document.createElement('div');
  authors.className = 'pub-authors';
  authors.innerHTML = pub.authors.map((a, i) => {
    const sep = i < pub.authors.length - 1 ? ', ' : '';
    if (a.includes('Kuldeep Singh Shivran') || a.includes('Shivran, Kuldeep')) {
      return '<span class="highlight-name">' + a + '</span>' + sep;
    }
    return a + sep;
  }).join('');
  content.appendChild(authors);

  const venueRow = document.createElement('div');
  venueRow.className = 'pub-venue-container';
  const venue = document.createElement('div');
  venue.className = 'pub-venue';
  venue.textContent = pub.venue;
  venueRow.appendChild(venue);
  if (pub.award && pub.award.length > 0) {
    const aw = document.createElement('div');
    aw.className = 'pub-award';
    aw.textContent = pub.award;
    venueRow.appendChild(aw);
  }
  content.appendChild(venueRow);

  if (pub.links && Object.keys(pub.links).length > 0) {
    const links = document.createElement('div');
    links.className = 'pub-links';
    [['pdf','[PDF / DOI]'], ['code','[Code]'], ['project','[Project Page]']].forEach(([key, label]) => {
      if (pub.links[key]) {
        const a = document.createElement('a');
        a.href = pub.links[key];
        a.textContent = label;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        links.appendChild(a);
      }
    });
    content.appendChild(links);
  }

  item.appendChild(thumb);
  item.appendChild(content);
  return item;
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function openModal(src) {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'block';
  setTimeout(() => modal.classList.add('show'), 10);
  document.getElementById('modalImage').src = src;
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  setTimeout(() => { modal.style.display = 'none'; }, 300);
}

window.onclick = function (e) {
  const modal = document.getElementById('imageModal');
  if (e.target === modal) closeModal();
};
