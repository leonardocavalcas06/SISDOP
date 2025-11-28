// Alternar telas
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Função para mostrar conteúdo dentro do menu (Dashboard)
function showMenuContent(contentId) {
  // Esconde todos os conteúdos do menu
  document.querySelectorAll('.menu-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Se o ID não for 'menu-home', mostra o conteúdo clicado.
  // Se for 'menu-home', apenas esconde os outros, revelando o fundo com a logo.
  if (contentId !== 'menu-home') {
    const contentToShow = document.getElementById(contentId);
    if (contentToShow) {
      contentToShow.classList.add('active');
    }
  }
  // Atualiza o item ativo na sidebar
  document.querySelectorAll('#sidebar a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick').includes(contentId)) {
      link.classList.add('active');
    }
  });
}

// MOSTRAR/ESCONDER SENHA
function togglePasswordVisibility(icon) {
  const wrapper = icon.parentElement;
  const input = wrapper.querySelector('input');
  const eyeOpen = icon.querySelector('.eye-open');
  const eyeClosed = icon.querySelector('.eye-closed');

  if (input.type === 'password') {
    input.type = 'text';
    eyeOpen.style.display = 'none';
    eyeClosed.style.display = 'block';
  } else {
    input.type = 'password';
    eyeOpen.style.display = 'block';
    eyeClosed.style.display = 'none';
  }
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

  try {
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
        loginBox.classList.add('show');
      }, 1000);
    }, 3500);
  }
  catch {
    
  }
});