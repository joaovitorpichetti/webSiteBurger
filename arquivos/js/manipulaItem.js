document.querySelectorAll('.card').forEach((card) => {
    const btnMais = card.querySelector('.btn-outline-secondary.ms-2');
    const btnMenos = card.querySelector('.btn-outline-secondary.me-2');
    const inputQuantidade = card.querySelector('input');
    const btnPedir = card.querySelector('.btn-success');

    // Aumenta a quantidade
    btnMais.addEventListener('click', () => {
        let quantidade = parseInt(inputQuantidade.value, 10);
        inputQuantidade.value = quantidade + 1;
    });

    // Diminui a quantidade, mas não deixa ficar menor que 0
    btnMenos.addEventListener('click', () => {
        let quantidade = parseInt(inputQuantidade.value, 10);
        if (quantidade > 0) {
            inputQuantidade.value = quantidade - 1;
        }
    });

    // Função para resetar o input para zero
    function resetInput(inputElement) {
        inputElement.value = "0";
    }

    // Ao clicar no botão "Pedir", adiciona o item, reseta o input e mostra o alerta
    btnPedir.addEventListener('click', () => {
        // Aqui você pode chamar a sua função para adicionar ao carrinho, por exemplo:
        // adicionarAoCarrinho(btnPedir, "Refrigerante Sprit", 8);

        // Após adicionar ao carrinho, reseta a quantidade
        resetInput(inputQuantidade);

        // Exibe um alerta informando que o pedido foi enviado com sucesso
        alert("Pedido enviado com sucesso!");
    });
});
