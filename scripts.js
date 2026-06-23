// Global variables
let allPublications = [];
let showingSelected = true;

document.addEventListener('DOMContentLoaded', function () {
  loadPublications();
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });
  const toggleButton = document.getElementById('toggle-publications');
  if (toggleButton) toggleButton.addEventListener('click', togglePublications);
});

function loadPublications() {
  fetch('publications.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      allPublications = data.publications;
      renderPublications(true);
    })
    .catch(error => {
      console.error('Error loading publications:', error);
      displayFallbackPublications();
    });
}

function displayFallbackPublications() {
  const container = document.getElementById('publications-container');
  container.innerHTML = '<p style="color:#888;">Could not load publications. Serve via a local HTTP server (e.g. <code>python3 -m http.server</code>).</p>';
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

function createPublicationElement(publication) {
  const pubItem = document.createElement('div');
  pubItem.className = 'publication-item';

  // Thumbnail
  const thumbnail = document.createElement('div');
  thumbnail.className = 'pub-thumbnail';
  thumbnail.onclick = () => openModal(publication.thumbnail);

  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = publication.thumbnail;
  thumbnailImg.alt = publication.title + ' thumbnail';
  thumbnailImg.onerror = function () {
    this.style.display = 'none';
    const ph = document.createElement('div');
    ph.className = 'pub-thumbnail-placeholder';
    ph.innerHTML = '&#128196;';
    thumbnail.appendChild(ph);
  };
  thumbnail.appendChild(thumbnailImg);

  // Content
  const content = document.createElement('div');
  content.className = 'pub-content';

  const title = document.createElement('div');
  title.className = 'pub-title';
  title.textContent = publication.title;
  content.appendChild(title);

  const authors = document.createElement('div');
  authors.className = 'pub-authors';
  let authorsHTML = '';
  publication.authors.forEach((author, index) => {
    if (author.includes('Kuldeep Singh Shivran') || author.includes('Shivran, Kuldeep')) {
      authorsHTML += `<span class="highlight-name">${author}</span>`;
    } else {
      authorsHTML += author;
    }
    if (index < publication.authors.length - 1) authorsHTML += ', ';
  });
  authors.innerHTML = authorsHTML;
  content.appendChild(authors);

  const venueContainer = document.createElement('div');
  venueContainer.className = 'pub-venue-container';
  const venue = document.createElement('div');
  venue.className = 'pub-venue';
  venue.textContent = publication.venue;
  venueContainer.appendChild(venue);
  if (publication.award && publication.award.length > 0) {
    const award = document.createElement('div');
    award.className = 'pub-award';
    award.textContent = publication.award;
    venueContainer.appendChild(award);
  }
  content.appendChild(venueContainer);

  if (publication.links && Object.keys(publication.links).length > 0) {
    const links = document.createElement('div');
    links.className = 'pub-links';
    if (publication.links.pdf) {
      const a = document.createElement('a');
      a.href = publication.links.pdf;
      a.textContent = '[PDF / DOI]';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      links.appendChild(a);
    }
    if (publication.links.code) {
      const a = document.createElement('a');
      a.href = publication.links.code;
      a.textContent = '[Code]';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      links.appendChild(a);
    }
    if (publication.links.project) {
      const a = document.createElement('a');
      a.href = publication.links.project;
      a.textContent = '[Project Page]';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      links.appendChild(a);
    }
    content.appendChild(links);
  }

  pubItem.appendChild(thumbnail);
  pubItem.appendChild(content);
  return pubItem;
}

function openModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'block';
  setTimeout(() => modal.classList.add('show'), 10);
  document.getElementById('modalImage').src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  setTimeout(() => { modal.style.display = 'none'; }, 300);
}

window.onclick = function (event) {
  const modal = document.getElementById('imageModal');
  if (event.target === modal) closeModal();
};
