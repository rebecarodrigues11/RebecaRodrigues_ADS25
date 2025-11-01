// Aguarda o carregamento completo do conteúdo da página antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("volunteerForm"); // Captura o formulário pelo ID
  const resultado = document.getElementById("resultado"); // Captura a área para exibir mensagens

  // Função para remover tudo que não for número de uma string
  function onlyDigits(value) {
    return value.replace(/\D/g, ""); // \D corresponde a tudo que não é dígito
  }

  // Função que aplica a máscara de CPF no formato 000.000.000-00
  function maskCPF(value) {
    value = onlyDigits(value).slice(0, 11); // Limita a 11 dígitos
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca o traço antes dos dois últimos dígitos
    return value; // Retorna o CPF formatado
  }

  // Função que aplica a máscara de CEP no formato 00000-000
  function maskCEP(value) {
    value = onlyDigits(value).slice(0, 8); // Limita a 8 dígitos
    value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona o traço depois dos 5 primeiros dígitos
    return value; // Retorna o CEP formatado
  }

  // Função que aplica a máscara de telefone
  function maskPhone(value) {
    value = onlyDigits(value).slice(0, 11); // Limita a 11 dígitos
    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"); // Telefone com 9 dígitos
    } else if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3"); // Telefone com 8 dígitos
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d+)/, "($1) $2"); // DDD + início do telefone
    } else if (value.length > 0) {
      value = value.replace(/(\d+)/, "($1"); // Apenas DDD iniciado
    }
    return value; // Retorna telefone formatado
  }

  // Captura os campos do formulário para aplicar máscaras
  const cpfInput = document.getElementById("cpf"); // Campo CPF
  const cepInput = document.getElementById("cep"); // Campo CEP
  const telInput = document.getElementById("telefone"); // Campo telefone

  // Evento para aplicar máscara de CPF enquanto digita
  if (cpfInput) {
    cpfInput.addEventListener("input", function (e) {
      e.target.value = maskCPF(e.target.value); // Atualiza o valor com máscara
    });
  }

  // Evento para aplicar máscara de CEP enquanto digita
  if (cepInput) {
    cepInput.addEventListener("input", function (e) {
      e.target.value = maskCEP(e.target.value); // Atualiza o valor com máscara
    });
  }

  // Evento para aplicar máscara de telefone enquanto digita
  if (telInput) {
    telInput.addEventListener("input", function (e) {
      e.target.value = maskPhone(e.target.value); // Atualiza o valor com máscara
    });
  }

  // Evento de envio do formulário
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio padrão (recarregar página)
    resultado.textContent = "Cadastro enviado com sucesso!"; // Mostra mensagem de sucesso
    form.reset(); // Limpa os campos do formulário
    setTimeout(() => {
      resultado.textContent = ""; // Remove a mensagem após 5 segundos
    }, 5000);
  });
});

// Captura o botão do menu e a barra lateral
const menuToggle = document.getElementById('menu-toggle'); // Botão ☰
const sidebar = document.getElementById('sidebar'); // Barra lateral

// Evento de clique para abrir/fechar o menu lateral
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active'); // Alterna a classe "active" na sidebar
});

// Função que mostra ou esconde o botão do menu dependendo do tamanho da tela
function controlarMenuToggle() {
  const botao = document.getElementById("menu-toggle"); // Botão do menu

  if (window.innerWidth <= 768) {
    botao.style.display = "block"; // Mostra botão em telas pequenas
  } else {
    botao.style.display = "none"; // Esconde botão em telas grandes
  }
}

// Executa ao carregar a página
window.addEventListener("load", controlarMenuToggle);

// Executa ao redimensionar a janela
window.addEventListener("resize", controlarMenuToggle);



