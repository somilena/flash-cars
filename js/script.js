document.addEventListener("DOMContentLoaded", function () {
  // ===================================================================
  // EFEITO DA BARRA DE NAVEGAÇÃO AO ROLAR A PÁGINA
  // ===================================================================
  const header = document.getElementById("main-header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // ===================================================================
  // LÓGICA DO MODAL "SOBRE NÓS" (FOCADO APENAS NO RODAPÉ)
  // ===================================================================
  const openModalFooterBtn = document.getElementById("open-sobre-footer-btn");
  const modalOverlay = document.getElementById("sobre-modal-overlay");

  // Só executa se o modal E o botão do footer existirem na página
  if (modalOverlay && openModalFooterBtn) {
    const closeModalBtn = modalOverlay.querySelector(".close-btn");

    // Função para abrir o modal
    const openModal = (event) => {
      if (event) {
        // Previne a ação padrão do link
        event.preventDefault();
      }
      modalOverlay.classList.add("active");
    };

    // Função para fechar o modal
    const closeModal = () => {
      modalOverlay.classList.remove("active");
    };

    // Adiciona o evento de clique ao link do rodapé
    openModalFooterBtn.addEventListener("click", openModal);

    // Adiciona o evento de clique ao botão de fechar (o "X")
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", closeModal);
    }

    // Adiciona o evento para fechar o modal ao clicar fora da caixa
    modalOverlay.addEventListener("click", function (event) {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });

    // VERIFICA A URL AO CARREGAR A PÁGINA
    if (window.location.hash === "#sobre") {
      openModal(); // Abre o modal automaticamente se a URL tiver #sobre
    }
  }
});

// ===================================================================
// LÓGICA PARA O FORMULÁRIO DE VENDA (SÓ VAI RODAR NA PÁGINA DO FORMULÁRIO)
// ===================================================================
const vendaForm = document.getElementById("venda-form");
if (vendaForm) {
  const fileInput = document.getElementById("fotos");
  const fileNameDisplay = document.getElementById("file-name-display");

  // Lógica para mostrar o nome dos arquivos selecionados no input de fotos
  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener("change", function () {
      if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = `${fileInput.files.length} arquivo(s) selecionado(s)`;
      } else {
        fileNameDisplay.textContent = "Nenhum arquivo selecionado";
      }
    });
  }

  // Lógica para simular o envio do formulário
  vendaForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o envio real

    const formMessage = document.getElementById("form-message");
    const submitButton = vendaForm.querySelector('button[type="submit"]');

    // Feedback visual de "enviando"
    formMessage.textContent = "Enviando sua proposta...";
    formMessage.style.color = "#FFFFFF";
    submitButton.disabled = true;
    submitButton.textContent = "AGUARDE...";

    // Simula um tempo de espera (2 segundos)
    setTimeout(() => {
      // Mensagem de sucesso
      formMessage.textContent =
        "Proposta enviada com sucesso! Entraremos em contato em breve.";
      formMessage.style.color = "#4CAF50"; // Verde
      vendaForm.reset();
      if (fileNameDisplay) {
        fileNameDisplay.textContent = "Nenhum arquivo selecionado";
      }

      // Reativa o botão e reseta a mensagem após 5 segundos
      setTimeout(() => {
        formMessage.textContent =
          "Seus dados estão seguros. Responderemos em breve.";
        formMessage.style.color = "var(--label-color)";
        submitButton.disabled = false;
        submitButton.textContent = "ENVIAR PROPOSTA";
      }, 5000);
    }, 2000);
  });
}
// Adicione este código ao seu arquivo js/script.js

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os formulários que devem abrir o modal
  const forms = [
    document.getElementById("venda-form"),
    document.getElementById("lavagem-form"),
    document.getElementById("test-drive-form"),
  ];

  // Seleciona os elementos do novo modal de confirmação
  const confirmModal = document.getElementById("confirm-modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");
  const closeModalBtn = document.getElementById("modal-close-btn");

  // Função para fechar o modal
  const closeModal = () => {
    if (confirmModal) {
      confirmModal.classList.remove("active");
    }
  };

  // Garante que o botão e o overlay fechem o modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }
  if (confirmModal) {
    confirmModal.addEventListener("click", (event) => {
      // Fecha somente se clicar no fundo (overlay), não no conteúdo
      if (event.target === confirmModal) {
        closeModal();
      }
    });
  }

  // Adiciona o evento de 'submit' para cada formulário
  forms.forEach((form) => {
    // Verifica se o formulário existe na página atual antes de adicionar o listener
    if (form) {
      form.addEventListener("submit", function (event) {
        // PASSO MAIS IMPORTANTE: Impede o envio padrão e o recarregamento da página
        event.preventDefault();

        let title = "";
        let message = "";

        // Define o título e a mensagem com base no ID do formulário
        switch (form.id) {
          case "venda-form":
            title = "Proposta Enviada com Sucesso!";
            message =
              "Analisaremos os dados do seu veículo e entraremos em contato em breve com uma proposta.";
            break;
          case "lavagem-form":
            title = "Agendamento Recebido!";
            message =
              "Sua solicitação de lavagem foi registrada. Entraremos em contato para confirmar o horário.";
            break;
          case "test-drive-form":
            title = "Test-Drive Solicitado!";
            message =
              "Recebemos seu pedido. Nossa equipe entrará em contato para agendar o melhor dia e horário para você.";
            break;
        }

        // Atualiza o conteúdo do modal
        modalTitle.textContent = title;
        modalMessage.textContent = message;

        // Mostra o modal
        confirmModal.classList.add("active");

        // Limpa os campos do formulário após o envio
        form.reset();
      });
    }
  });
}); // Fim do 'DOMContentLoaded'
