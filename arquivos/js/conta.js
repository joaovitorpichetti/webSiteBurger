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

    lista.innerHTML = "";

    let total = 0;
    /*
    Percorre o array carrinho, item por item.
    Cada item é um objeto com as propriedades: nome, preco, quantidade.
    const li = document.createElement("li");
    Cria dinamicamente um novo elemento <li> para representar o item do carrinho.

    Nome do produto (ex: "Camisa") - Preço unitário com duas casas decimais (ex: "R$ 50.00")
    Quantidade do item no carrinho (ex: "x 2")

    Um botão que, ao ser clicado, chama a função removerItem() passando o nome do item.
    */
    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
      ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade} = 
<strong>R$ ${(item.preco * item.quantidade).toFixed(2)}</strong>
<button onclick="removerItem('${item.nome}')">Remover</button>
    `;
        /*
        Adiciona o elemento <li> recém-criado à <ul> do carrinho (referenciada pela variável lista).
        Isso faz o item aparecer visualmente na página.
        */
        lista.appendChild(li);
        total += item.preco * item.quantidade;
    });

    totalDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Inicializa carrinho ao carregar página
atualizarCarrinho();
