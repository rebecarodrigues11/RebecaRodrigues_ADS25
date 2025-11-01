// Encapsula todo o código específico de cada página dentro da função initPage()
// Essa função é chamada automaticamente pelo router.js sempre que uma nova página é carregada.
window.initPage = function() {

  // --- MENU LATERAL (TOGGLE) ---
  // Obtém referências para o botão do menu e para a barra lateral
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');

  // Se ambos existirem, adiciona o evento de clique para abrir/fechar o menu lateral
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active'); // Alterna a classe "active" (mostra/oculta o menu)
    });
  }

  // --- FUNÇÕES DE MÁSCARAS DE FORMULÁRIO ---

  // Remove todos os caracteres que não sejam dígitos (0-9)
  function onlyDigits(value) {
    return value.replace(/\D/g, "");
  }

  // Aplica máscara no CPF no formato: 000.000.000-00
  function maskCPF(value) {
    value = onlyDigits(value).slice(0, 11); // Mantém apenas 11 dígitos
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço antes dos dois últimos dígitos
    return value;
  }

  // Aplica máscara no CEP no formato: 00000-000
  function maskCEP(value) {
    value = onlyDigits(value).slice(0, 8); // Limita a 8 dígitos
    value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Insere o hífen após o quinto dígito
    return value;
  }

  // Aplica máscara no telefone no formato (00) 00000-0000 ou (00) 0000-0000
  function maskPhone(value) {
    value = onlyDigits(value).slice(0, 11); // Máximo de 11 dígitos (DDD + número)
    if (value.length > 10) {
      // Celular com 9 dígitos
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length > 6) {
      // Telefone fixo
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (value.length > 2) {
      // Apenas DDD e início do número
      value = value.replace(/(\d{2})(\d+)/, "($1) $2");
    } else if (value.length > 0) {
      // Apenas o DDD sendo digitado
      value = value.replace(/(\d+)/, "($1");
    }
    return value;
  }

  // --- APLICA AS MÁSCARAS AOS CAMPOS DE FORMULÁRIO ---

  // Obtém referências para os campos CPF, CEP e telefone (se existirem na página)
  const cpfInput = document.getElementById("cpf");
  const cepInput = document.getElementById("cep");
  const telInput = document.getElementById("telefone");

  // Se o campo de CPF existir, adiciona o evento "input" para aplicar a máscara em tempo real
  if (cpfInput) {
    cpfInput.addEventListener("input", function (e) {
      e.target.value = maskCPF(e.target.value);
    });
  }

  // Faz o mesmo para o CEP
  if (cepInput) {
    cepInput.addEventListener("input", function (e) {
      e.target.value = maskCEP(e.target.value);
    });
  }

  // E também para o telefone
  if (telInput) {
    telInput.addEventListener("input", function (e) {
      e.target.value = maskPhone(e.target.value);
    });
  }

  // --- ENVIO DO FORMULÁRIO DE VOLUNTÁRIOS ---

  // Obtém o formulário e o elemento onde será exibida a mensagem de sucesso
  const form = document.getElementById("volunteerForm");
  const resultado = document.getElementById("resultado");

  // Se o formulário existir na página, define o comportamento de envio
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio tradicional (recarregar a página)

      // Exibe uma mensagem de sucesso
      if (resultado) resultado.textContent = "Cadastro enviado com sucesso!";

      // Limpa todos os campos do formulário
      form.reset();

      // Remove a mensagem após 5 segundos
      setTimeout(() => {
        if (resultado) resultado.textContent = "";
      }, 5000);
    });
  }

  // --- CONTROLE DE VISIBILIDADE DO BOTÃO DE MENU (RESPONSIVO) ---

  // Função que exibe ou oculta o botão de menu com base na largura da tela
  function controlarMenuToggle() {
    const botao = document.getElementById("menu-toggle");
    if (!botao) return; // Se o botão não existir, sai da função

    if (window.innerWidth <= 768) {
      // Em telas pequenas (celulares e tablets), mostra o botão
      botao.style.display = "block";
    } else {
      // Em telas grandes, esconde o botão (menu já visível na lateral)
      botao.style.display = "none";
    }
  }

  // Executa o controle de visibilidade ao carregar a página e ao redimensionar a janela
  window.addEventListener("load", controlarMenuToggle);
  window.addEventListener("resize", controlarMenuToggle);

  // Chama a função imediatamente para definir o estado inicial
  controlarMenuToggle();

}; // --- FIM DA FUNÇÃO initPage ---

// --- CONFIGURAÇÃO INICIAL DE ROTA (CASO O USUÁRIO ACESSE DIRETAMENTE O SITE SEM HASH) ---
document.addEventListener("DOMContentLoaded", function() {
  // Se o endereço não tiver nenhuma hash (ex: está em "/index.html"), define a rota padrão como "#/home"
  if (!window.location.hash) {
    window.location.hash = "#/home";
  }
});
