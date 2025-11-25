// Importa o cliente Supabase
import { supabase } from './supabaseteste.js';

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

  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
      loginBox.classList.add('show');
    }, 1000);
  }, 3500);
});

// --- AUTENTICAÇÃO COM SUPABASE ---

// Função para lidar com o cadastro de novos usuários
async function handleRegister(event) {
  event.preventDefault(); // Impede o recarregamento da página

  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert('Erro no cadastro: ' + error.message);
  } else {
    alert('Cadastro de usuário realizado com sucesso! Verifique seu e-mail para confirmar a conta.');
    // Opcional: redirecionar para a tela de login ou mostrar uma mensagem
    form.reset(); // Limpa o formulário
    showSection('login'); // Volta para a tela de login
  }
}

// Função para lidar com o cadastro de novas EMPRESAS
async function handleCompanyRegister(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;

  // 1. Cria o usuário de autenticação
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    alert('Erro no cadastro: ' + authError.message);
  } else {
    // Se o usuário foi criado, insere os dados na tabela 'empresas'
    alert('Cadastro de empresa realizado com sucesso! Verifique seu e-mail para confirmar a conta.');
    // Opcional: redirecionar para a tela de login ou mostrar uma mensagem
    form.reset(); // Limpa o formulário
  }
}

// Função para lidar com o login de usuários
async function handleLogin(event) {
  event.preventDefault(); // Impede o recarregamento da página

  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert('Erro no login: ' + error.message);
  } else {
    // Login bem-sucedido, redireciona para o menu principal
    showSection('menu');
  }
}

// Função para lidar com o logout
async function handleLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert('Erro ao sair: ' + error.message);
  } else {
    // Volta para a tela de login
    window.location.reload(); // Recarrega a página para limpar o estado
  }
}

// Adiciona os event listeners aos formulários quando o DOM estiver carregado
document.getElementById('register-form')?.addEventListener('submit', handleRegister);
document.getElementById('login-form')?.addEventListener('submit', handleLogin);
document.getElementById('logout-button')?.addEventListener('click', handleLogout);
document.getElementById('register-company-form')?.addEventListener('submit', handleCompanyRegister);