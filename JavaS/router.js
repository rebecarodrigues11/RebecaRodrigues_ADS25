// Obtém o elemento principal da aplicação (onde as páginas serão carregadas dinamicamente)
const app = document.getElementById("app");

/**
 * Função principal responsável por carregar o conteúdo HTML de uma rota (página)
 * e rolar suavemente até uma âncora (se existir).
 * Exemplo de rota válida: "projetos" ou "projetos#movimente-se".
 */
async function loadPage(routeWithAnchor) {
  const container = app; // Define o contêiner onde o conteúdo será inserido

  // --- Separa o nome da rota e a âncora (se houver) ---
  let route = routeWithAnchor, anchor = null; // Valores padrão
  const hashIndex = routeWithAnchor.indexOf('#'); // Encontra o índice do primeiro "#"

  if (hashIndex !== -1) {
    // Se existir "#", divide a rota: antes e depois do símbolo
    route = routeWithAnchor.slice(0, hashIndex); // Exemplo: "projetos"
    anchor = routeWithAnchor.slice(hashIndex + 1); // Exemplo: "movimente-se"
  }

  // --- Inicia o efeito de transição (fade-out) ---
  container.classList.add("fade-out"); // Aplica classe CSS que escurece/oculta o conteúdo

  // Aguarda o término da animação (280 ms para combinar com o tempo no CSS)
  await new Promise(resolve => setTimeout(resolve, 280));

  try {
    // --- Busca o arquivo HTML correspondente à rota ---
    const response = await fetch(`templates/${route}.html`); // Exemplo: templates/projetos.html
    if (!response.ok) throw new Error("Not found"); // Caso o arquivo não exista

    // Lê o conteúdo HTML da resposta
    const html = await response.text();
    container.innerHTML = html; // Insere o novo conteúdo no contêiner

    // Pequeno atraso para garantir que o conteúdo foi renderizado antes de exibir novamente
    await new Promise(resolve => setTimeout(resolve, 20));
    container.classList.remove("fade-out"); // Remove a classe para aplicar o efeito de fade-in

    // --- Reexecuta scripts específicos da página (máscaras, eventos, etc.) ---
    if (window.initPage) window.initPage(); // Verifica se existe a função initPage e executa

    // --- Se foi especificada uma âncora (ex: #movimente-se), rola suavemente até ela ---
    if (anchor) {
      setTimeout(() => {
        const target = document.getElementById(anchor); // Busca o elemento correspondente
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" }); // Rolagem suave até o topo do elemento
          // Adiciona foco para acessibilidade (permite leitura por leitores de tela)
          try { 
            target.setAttribute('tabindex','-1'); 
            target.focus(); 
          } catch(e) {}
        }
      }, 200); // Espera um pouco para garantir que a página e imagens carregaram
    } else {
      // Caso não haja âncora, rola a página de volta ao topo
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

  } catch (error) {
    // --- Caso ocorra erro ao carregar a página (ex: arquivo não encontrado) ---
    container.innerHTML = "<section class='content'><h2>Página não encontrada 😕</h2></section>";
    container.classList.remove("fade-out"); // Remove o efeito de fade-out
  }
}

/**
 * Função que identifica qual página deve ser carregada
 * com base na hash atual da URL (parte depois do "#").
 */
function handleRouteChange() {
  // window.location.hash retorna algo como "#/projetos#movimente-se"
  let raw = window.location.hash || "#/home"; // Se não houver hash, carrega "home"

  // Remove o prefixo "#/" para obter apenas o nome da rota
  if (raw.startsWith("#/")) raw = raw.slice(2);

  // Corrige caso o usuário use apenas "#" ou "/" antes da rota
  if (raw.startsWith("/")) raw = raw.slice(1);

  // Agora a variável "raw" contém algo como "projetos" ou "projetos#movimente-se"
  const routeWithAnchor = raw || "home";

  // Chama a função que carrega o conteúdo correspondente
  loadPage(routeWithAnchor);
}

// --- Define os eventos que disparam a navegação entre páginas ---

// Quando o hash (parte da URL depois de "#") mudar, recarrega a página correspondente
window.addEventListener("hashchange", handleRouteChange);

// Quando o site terminar de carregar, executa a rota inicial (home por padrão)
window.addEventListener("load", handleRouteChange);
