async function carregarHTML(url, seletorElemento, callbackDepoisDeCarregar = null) {
    try {
        const resposta = await fetch(url);
        const html = await resposta.text();
        document.querySelector(seletorElemento).innerHTML = html;

        // Se uma função de callback foi passada, executa após carregar o conteúdo
        if (typeof callbackDepoisDeCarregar === "function") {
            callbackDepoisDeCarregar();
        }

    } catch (erro) {
        console.error('Erro ao carregar o HTML:', erro);
    }
}

// Função para adicionar os eventos depois do HTML estar no DOM
function adicionarEventosGlobais() {
    // Botão chamar garçom
    const btnGarcom = document.getElementById("chamarGarcom");
    if (btnGarcom) {
        btnGarcom.addEventListener("click", function(event) {
            event.preventDefault();
            const mensagem = document.getElementById("mensagem");
            if (mensagem) {
                mensagem.style.display = "block";
                setTimeout(() => mensagem.style.display = "none", 3000);
            }
        });
    }

    // Botão fazer pedido
    const btnPedido = document.getElementById("btnFazerPedido");
    if (btnPedido) {
        btnPedido.addEventListener("click", function(event) {
            event.preventDefault();
            const mensagem = document.getElementById("fazerPedido");
            if (mensagem) {
                mensagem.style.display = "block";
                setTimeout(() => mensagem.style.display = "none", 5000);
            }
        });
    }

    // Botão fechar conta
    const btnFecharConta = document.getElementById("fecharConta");
    if (btnFecharConta) {
        btnFecharConta.addEventListener("click", function(event) {
            event.preventDefault();
            const mensagemFechamento = document.getElementById("mensagemFechamento");
            if (mensagemFechamento) {
                mensagemFechamento.style.display = "block";
            }
        });
    }
}

// Carrega os componentes HTML e adiciona eventos após o carregamento
carregarHTML('menu.html', '#menu', adicionarEventosGlobais);
carregarHTML('rodape.html', '#rodape');
