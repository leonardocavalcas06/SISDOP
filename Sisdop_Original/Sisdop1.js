// Alternar telas
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// LOGIN COM GOOGLE
function handleCredentialResponse(response) {
  const data = JSON.parse(atob(response.credential.split('.')[1]));

  alert(`Bem-vindo, ${data.name}!`);

  // Redirecionamento interno
  showSection('menu');
}

// ANIMAÇÃO DE INTRODUÇÃO
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  const loginBox = document.getElementById('loginBox');

  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
      loginBox.classList.add('show');
    }, 1000);
  }, 3500);
});

