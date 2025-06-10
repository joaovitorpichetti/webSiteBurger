let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []; //Tenta recuperar o carrinho salvo no localStorage


/*
Verifica se o produto já está no carrinho (find);
Se sim, aumenta a quantidade;
Se não, adiciona o item ao array com quantidade: 1;
Chama salvarCarrinho() para salvar no localStorage;
Chama atualizarCarrinho() para atualizar a tela.
*/

/*function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    salvarCarrinho();
    atualizarCarrinho();
}*/

function adicionarAoCarrinho(btn, nome, preco) {
    // Encontra o elemento pai que contém o input
    const cardBody = btn.parentElement;
    // Seleciona o input que contém a quantidade
    const inputQuantidade = cardBody.querySelector("input");

    // Converte o valor do input para número
    let quantidade = parseInt(inputQuantidade.value);

    // Verifica se o valor não é um número válido ou é menor que 1
    if (isNaN(quantidade) || quantidade < 1) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    // Verifica se o produto já está no carrinho para somar a quantidade atual com a nova
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({ nome, preco, quantidade });
    }

    // Exibe um alerta informando que o pedido foi enviado com sucesso
    alert("Pedido enviado com sucesso!");

    salvarCarrinho();
    atualizarCarrinho();

    // Zera o valor do input após adicionar ao carrinho
    inputQuantidade.value = "0";
}


/*
Filtra o carrinho, removendo o item com o nome especificado;
Atualiza o localStorage e a interface com as funções já conhecidas.
*/
function removerItem(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    salvarCarrinho();
    atualizarCarrinho();
}
/*
Zera o array carrinho;
Salva e atualiza.
*/
function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
}

/*
Converte o array carrinho para texto JSON;
Armazena no navegador com a chave "carrinho"
*/
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

/*
Limpa a lista atual (lista.innerHTML = "");
Cria novos <li> para cada item do carrinho com:
nome
preço unitário
quantidade
total por item
botão de "Remover"
Soma os totais e atualiza o <p id="total">.
*/
function atualizarCarrinho() {
    const lista = document.getElementById("carrinho");
    const totalDisplay = document.getElementById("total");
    const totalFinalDisplay = document.querySelector(".total-final");
    const selectPessoas = document.querySelector(".form-select");

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach(item => {
        const divItem = document.createElement("div");
        divItem.classList.add("mb-3");

        divItem.innerHTML = `
        <h5 class="fw-bold">${item.nome}</h5>
        <p class="item-descricao">Valor Unitário: R$ ${item.preco.toFixed(2)}</p>
        <div class="d-flex justify-content-between">
            <span class="text-muted">${item.quantidade} unidade(s)</span>
            <span class="valor-detalhes">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
        </div>
        <!--<button class="btn btn-outline-secondary mt-2" onclick="removerItem('$ {item.nome}')">Remover</button> -->
        <hr>
    `;

        lista.appendChild(divItem);
        total += item.preco * item.quantidade;
    });

    totalDisplay.textContent = `R$ ${total.toFixed(2)}`;

    // Atualiza o total por pessoa automaticamente
    updateTotalFinal(total, selectPessoas.value);

    // Atualiza sempre que o número de pessoas mudar
    selectPessoas.addEventListener("change", function () {
        updateTotalFinal(total, this.value);
    });
}

function updateTotalFinal(total, pessoas) {
    pessoas = parseInt(pessoas) || 1;
    document.querySelector(".total-final").textContent = `R$ ${(total / pessoas).toFixed(2).replace(".", ",")}`;
}


// Inicializa carrinho ao carregar página
atualizarCarrinho();


