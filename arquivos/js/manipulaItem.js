document.querySelectorAll('.card').forEach((card) => {
    const btnMais = card.querySelector('.btn-outline-secondary.ms-2');
    const btnMenos = card.querySelector('.btn-outline-secondary.me-2');
    const inputQuantidade = card.querySelector('input');

    // Aumenta a quantidade
    btnMais.addEventListener('click', () => {
        let quantidade = parseInt(inputQuantidade.value, 10);
        inputQuantidade.value = quantidade + 1;
    });

    // Diminui a quantidade, mas não deixa ser menor que 0
    btnMenos.addEventListener('click', () => {
        let quantidade = parseInt(inputQuantidade.value, 10);
        if (quantidade > 0) {
            inputQuantidade.value = quantidade - 1;
        }
    });
});
