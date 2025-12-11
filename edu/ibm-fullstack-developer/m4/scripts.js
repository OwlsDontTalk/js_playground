const form = document.getElementById('recommendation-form');
const recommendations = document.getElementById('recommendation-list');
const popup = document.getElementById('confirmation-popup');
const popupClose = document.getElementById('popupClose');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

function showPopup() {
  popup.classList.add('visible');
  popup.setAttribute('aria-hidden', 'false');
  popupClose.focus();
}

function hidePopup() {
  popup.classList.remove('visible');
  popup.setAttribute('aria-hidden', 'true');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = (formData.get('fullName') || 'Anonymous').trim() || 'Anonymous';
  const message = (formData.get('message') || '').trim();

  if (!message) {
    form.querySelector('textarea').focus();
    return;
  }

  const article = document.createElement('article');
  article.className = 'recommendation-card';
  article.innerHTML = `
    <p>“${message.replace(/"/g, '&quot;')}”</p>
    <h4>${name}</h4>
  `;

  recommendations.prepend(article);
  form.reset();
  showPopup();
});

popupClose.addEventListener('click', hidePopup);

popup.addEventListener('click', (event) => {
  if (event.target === popup) {
    hidePopup();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && popup.classList.contains('visible')) {
    hidePopup();
  }
});
