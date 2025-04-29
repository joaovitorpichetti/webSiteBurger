async function carregarHTML(url, elemento) {
    try {
        const resposta = await fetch(url);
        const html = await resposta.text();
        document.querySelector(elemento).innerHTML = html;

        // Mensagem chamar garçom
        document.getElementById("chamarGarcom").addEventListener("click", function(event) {
            event.preventDefault(); // Evita recarregar a página

            const mensagem = document.getElementById("mensagem");

            // Exibe a mensagem
            mensagem.style.display = "block";

            // Remove a mensagem após 3 segundos
            setTimeout(function() {
                mensagem.style.display = "none";
            }, 3000);
        });

        // Mensagem pedido enviado
        document.getElementById("btnFazerPedido").addEventListener("click", function(event) {
            event.preventDefault(); // Evita recarregar a página

            const mensagem = document.getElementById("fazerPedido");

            // Exibe a mensagem
            mensagem.style.display = "block";

            // Remove a mensagem após 5 segundos
            setTimeout(function() {
                mensagem.style.display = "none";
            }, 5000);
        });

        //Mensagem conta fechada
        document.getElementById("fecharConta").addEventListener("click", function(event) {
            event.preventDefault(); // Evita comportamento padrão, caso necessário.

            const mensagemFechamento = document.getElementById("mensagemFechamento");

            // Exibe a mensagem de fechamento de conta
            mensagemFechamento.style.display = "block";

            // Remove a mensagem após 3 segundos
            /*setTimeout(function() {
              mensagemFechamento.style.display = "none";
            }, 9000);*/
        });

    } catch (erro) {
        console.error('Erro ao carregar o HTML:', erro);
    }
}

// Chama a função para carregar o menu e rodape
carregarHTML('menu.html', '#menu');
carregarHTML('rodape.html', '#rodape');
