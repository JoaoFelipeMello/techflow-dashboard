// =============================================
// TechFlow Dashboard - JavaScript
// =============================================


// ---------- 1. TEMA (Light | Dark | System) ----------

const botoesTema = document.querySelectorAll('.btn-tema');
const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)');

function aplicarTema(tema) {
  let modoEscuro = false;

  if (tema === 'dark') {
    modoEscuro = true;
  } else if (tema === 'system') {
    // usa a preferência do sistema operacional
    modoEscuro = preferenciaSistema.matches;
  }

  if (modoEscuro) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // destaca o botão do tema escolhido
  botoesTema.forEach(function (botao) {
    if (botao.dataset.tema === tema) {
      botao.classList.add('bg-white', 'text-indigo-600', 'shadow-sm', 'dark:bg-slate-700', 'dark:text-indigo-300');
    } else {
      botao.classList.remove('bg-white', 'text-indigo-600', 'shadow-sm', 'dark:bg-slate-700', 'dark:text-indigo-300');
    }
  });
}

botoesTema.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const tema = botao.dataset.tema;
    localStorage.setItem('tema', tema); // salva a preferência
    aplicarTema(tema);
  });
});

// se o usuário mudar o tema do sistema e estiver no modo "system", atualiza
preferenciaSistema.addEventListener('change', function () {
  if (localStorage.getItem('tema') === 'system' || localStorage.getItem('tema') === null) {
    aplicarTema('system');
  }
});

// ao carregar a página, aplica o tema salvo (ou "system" se não tiver nenhum)
aplicarTema(localStorage.getItem('tema') || 'system');


// ---------- 2. SIDEBAR NO MOBILE ----------

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function abrirSidebar() {
  sidebar.classList.remove('-translate-x-full');
  overlay.classList.remove('hidden');
}

function fecharSidebar() {
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
}

document.getElementById('btnAbrirSidebar').addEventListener('click', abrirSidebar);
document.getElementById('btnFecharSidebar').addEventListener('click', fecharSidebar);
overlay.addEventListener('click', fecharSidebar);


// ---------- 3. DROPDOWN DO USUÁRIO ----------

const btnUsuario = document.getElementById('btnUsuario');
const menuUsuario = document.getElementById('menuUsuario');
const setaUsuario = document.getElementById('setaUsuario');

function abrirDropdown() {
  menuUsuario.classList.remove('invisible', 'opacity-0', 'scale-95');
  setaUsuario.classList.add('rotate-180');
}

function fecharDropdown() {
  menuUsuario.classList.add('invisible', 'opacity-0', 'scale-95');
  setaUsuario.classList.remove('rotate-180');
}

btnUsuario.addEventListener('click', function (evento) {
  evento.stopPropagation(); // evita que o clique chegue no document e feche na hora
  if (menuUsuario.classList.contains('invisible')) {
    abrirDropdown();
  } else {
    fecharDropdown();
  }
});

// clicar fora do menu fecha o dropdown
document.addEventListener('click', function (evento) {
  if (!menuUsuario.contains(evento.target)) {
    fecharDropdown();
  }
});


// ---------- 4. PESQUISA E FILTRO DE PROJETOS ----------

const campoPesquisa = document.getElementById('pesquisa');
const botoesFiltro = document.querySelectorAll('.btn-filtro');
let filtroAtual = 'todos';

function filtrarProjetos() {
  const textoPesquisa = campoPesquisa.value.toLowerCase();
  const projetos = document.querySelectorAll('.projeto');
  let quantidadeVisivel = 0;

  projetos.forEach(function (projeto) {
    const nome = projeto.dataset.nome.toLowerCase();
    const status = projeto.dataset.status;

    const passouNaPesquisa = nome.includes(textoPesquisa);
    const passouNoFiltro = filtroAtual === 'todos' || status === filtroAtual;

    if (passouNaPesquisa && passouNoFiltro) {
      projeto.classList.remove('hidden');
      quantidadeVisivel++;
    } else {
      projeto.classList.add('hidden');
    }
  });

  // mostra a mensagem "Nenhum projeto encontrado" se não sobrar nenhum
  if (quantidadeVisivel === 0) {
    document.getElementById('semResultados').classList.remove('hidden');
  } else {
    document.getElementById('semResultados').classList.add('hidden');
  }
}

function destacarFiltro() {
  botoesFiltro.forEach(function (botao) {
    if (botao.dataset.filtro === filtroAtual) {
      botao.classList.add('bg-indigo-600', 'text-white');
      botao.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-200', 'dark:bg-slate-800', 'dark:text-slate-300', 'dark:hover:bg-slate-700');
    } else {
      botao.classList.remove('bg-indigo-600', 'text-white');
      botao.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-200', 'dark:bg-slate-800', 'dark:text-slate-300', 'dark:hover:bg-slate-700');
    }
  });
}

botoesFiltro.forEach(function (botao) {
  botao.addEventListener('click', function () {
    filtroAtual = botao.dataset.filtro;
    destacarFiltro();
    filtrarProjetos();
  });
});

campoPesquisa.addEventListener('input', filtrarProjetos);
destacarFiltro();


// ---------- 5. MODAL DE NOVO PROJETO ----------

const modal = document.getElementById('modal');
const modalFundo = document.getElementById('modalFundo');
const modalCaixa = document.getElementById('modalCaixa');

function abrirModal() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  // espera um pouquinho para a transição (fade) funcionar
  setTimeout(function () {
    modalFundo.classList.remove('opacity-0');
    modalCaixa.classList.remove('opacity-0', 'translate-y-8');
  }, 10);
}

function fecharModal() {
  modalFundo.classList.add('opacity-0');
  modalCaixa.classList.add('opacity-0', 'translate-y-8');

  // espera a animação terminar (300ms) para esconder de vez
  setTimeout(function () {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    limparFormulario();
  }, 300);
}

document.getElementById('btnNovoProjeto').addEventListener('click', abrirModal);
document.getElementById('btnFecharModal').addEventListener('click', fecharModal);
document.getElementById('btnCancelar').addEventListener('click', fecharModal);
modalFundo.addEventListener('click', fecharModal);

// tecla ESC fecha modal, dropdown e sidebar
document.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape') {
    fecharModal();
    fecharDropdown();
    fecharSidebar();
  }
});


// ---------- 6. VALIDAÇÃO DO FORMULÁRIO ----------

const form = document.getElementById('formProjeto');
const campoNome = document.getElementById('nome');
const campoResponsavel = document.getElementById('responsavel');
const campoCategoria = document.getElementById('categoria');
const campoPrazo = document.getElementById('prazo');
const campoDescricao = document.getElementById('descricao');

// mostra o erro (vermelho) embaixo do campo
function mostrarErro(campo, mensagem) {
  const msg = campo.closest('.campo').querySelector('.msg');
  campo.classList.add('input-erro');
  campo.classList.remove('input-sucesso');
  msg.textContent = mensagem;
  msg.classList.remove('hidden', 'text-emerald-600');
  msg.classList.add('text-rose-600');
}

// mostra o sucesso (verde) embaixo do campo
function mostrarSucesso(campo) {
  const msg = campo.closest('.campo').querySelector('.msg');
  campo.classList.add('input-sucesso');
  campo.classList.remove('input-erro');
  msg.textContent = '✓ Tudo certo';
  msg.classList.remove('hidden', 'text-rose-600');
  msg.classList.add('text-emerald-600');
}

function validarNome() {
  if (campoNome.value.trim().length < 3) {
    mostrarErro(campoNome, 'O nome precisa ter pelo menos 3 caracteres.');
    return false;
  }
  mostrarSucesso(campoNome);
  return true;
}

function validarResponsavel() {
  if (campoResponsavel.value.trim() === '') {
    mostrarErro(campoResponsavel, 'Informe o responsável.');
    return false;
  }
  mostrarSucesso(campoResponsavel);
  return true;
}

function validarCategoria() {
  if (campoCategoria.value === '') {
    mostrarErro(campoCategoria, 'Selecione uma categoria.');
    return false;
  }
  mostrarSucesso(campoCategoria);
  return true;
}

function validarPrioridade() {
  const escolhida = document.querySelector('input[name="prioridade"]:checked');
  const msg = document.getElementById('msgPrioridade');

  if (escolhida === null) {
    msg.textContent = 'Escolha a prioridade.';
    msg.classList.remove('hidden', 'text-emerald-600');
    msg.classList.add('text-rose-600');
    return false;
  }
  msg.textContent = '✓ Tudo certo';
  msg.classList.remove('hidden', 'text-rose-600');
  msg.classList.add('text-emerald-600');
  return true;
}

function validarPrazo() {
  if (campoPrazo.value === '') {
    mostrarErro(campoPrazo, 'Informe o prazo.');
    return false;
  }

  const hoje = new Date().toISOString().split('T')[0]; // data de hoje no formato aaaa-mm-dd
  if (campoPrazo.value < hoje) {
    mostrarErro(campoPrazo, 'O prazo não pode ser uma data que já passou.');
    return false;
  }
  mostrarSucesso(campoPrazo);
  return true;
}

function validarDescricao() {
  if (campoDescricao.value.trim().length < 20) {
    mostrarErro(campoDescricao, 'A descrição precisa ter pelo menos 20 caracteres.');
    return false;
  }
  mostrarSucesso(campoDescricao);
  return true;
}

// valida cada campo quando o usuário sai dele
campoNome.addEventListener('blur', validarNome);
campoResponsavel.addEventListener('blur', validarResponsavel);
campoCategoria.addEventListener('change', validarCategoria);
campoPrazo.addEventListener('change', validarPrazo);
campoDescricao.addEventListener('blur', validarDescricao);
document.querySelectorAll('input[name="prioridade"]').forEach(function (radio) {
  radio.addEventListener('change', validarPrioridade);
});

// contador de caracteres da descrição
campoDescricao.addEventListener('input', function () {
  document.getElementById('contador').textContent = campoDescricao.value.length + '/300';
});

function limparFormulario() {
  form.reset();
  document.querySelectorAll('.input').forEach(function (campo) {
    campo.classList.remove('input-erro', 'input-sucesso');
  });
  document.querySelectorAll('.msg').forEach(function (msg) {
    msg.classList.add('hidden');
  });
  document.getElementById('alertaSucesso').classList.add('hidden');
  document.getElementById('contador').textContent = '0/300';
}

form.addEventListener('submit', function (evento) {
  evento.preventDefault(); // não recarrega a página

  // chama todas as validações (assim todos os erros aparecem de uma vez)
  const nomeOk = validarNome();
  const responsavelOk = validarResponsavel();
  const categoriaOk = validarCategoria();
  const prioridadeOk = validarPrioridade();
  const prazoOk = validarPrazo();
  const descricaoOk = validarDescricao();

  if (!nomeOk || !responsavelOk || !categoriaOk || !prioridadeOk || !prazoOk || !descricaoOk) {
    return; // tem erro, para aqui
  }

  // simula o salvamento: desabilita o botão por 1 segundo (estado disabled)
  const btnSalvar = document.getElementById('btnSalvar');
  btnSalvar.disabled = true;
  btnSalvar.textContent = 'Salvando...';

  setTimeout(function () {
    adicionarProjeto();

    document.getElementById('alertaSucesso').classList.remove('hidden');
    btnSalvar.disabled = false;
    btnSalvar.textContent = 'Salvar projeto';

    // fecha o modal depois de mostrar a mensagem de sucesso
    setTimeout(fecharModal, 1200);
  }, 1000);
});


// ---------- 7. ADICIONA O NOVO PROJETO NA TELA ----------
// (não salva em banco de dados, só mostra na página)

function adicionarProjeto() {
  const nome = campoNome.value.trim();
  const responsavel = campoResponsavel.value.trim();
  const categoria = campoCategoria.value;
  const prioridade = document.querySelector('input[name="prioridade"]:checked').value;
  const descricao = campoDescricao.value.trim();
  const prazo = campoPrazo.value.split('-').reverse().join('/'); // aaaa-mm-dd -> dd/mm/aaaa

  const card = document.createElement('article');
  card.className = 'projeto group flex flex-col justify-between rounded-2xl border-2 border-dashed border-indigo-300 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-indigo-500/40 dark:bg-slate-900';
  card.dataset.nome = nome;
  card.dataset.status = 'andamento';

  // usamos textContent para colocar o texto digitado com segurança
  const etiqueta = document.createElement('span');
  etiqueta.className = 'self-start rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300';
  etiqueta.textContent = categoria + ' · ' + prioridade;

  const titulo = document.createElement('h3');
  titulo.className = 'mt-3 font-semibold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400';
  titulo.textContent = nome;

  const texto = document.createElement('p');
  texto.className = 'mt-1 text-sm text-slate-500 dark:text-slate-400';
  texto.textContent = descricao;

  const rodape = document.createElement('p');
  rodape.className = 'mt-4 text-xs text-slate-500 dark:text-slate-400';
  rodape.textContent = responsavel + ' · Prazo: ' + prazo;

  card.append(etiqueta, titulo, texto, rodape);
  document.getElementById('gridProjetos').prepend(card);

  // soma +1 no card de "Projetos ativos"
  const indicador = document.getElementById('indAtivos');
  indicador.textContent = Number(indicador.textContent) + 1;

  filtrarProjetos();
}
