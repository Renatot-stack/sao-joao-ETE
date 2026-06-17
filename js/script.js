let pedidos = {};
let total = 0;
let quantidadeTotal = 0;


// Abrir carrinho

document.querySelector(".botao-carrinho")
.addEventListener("click", function(){
    document
    .getElementById("carrinho")
    .classList.add("abrir");
});

function fecharCarrinho(){
    document
    .getElementById("carrinho")
    .classList.remove("abrir");
}


// Adicionar item

function adicionar(nome, preco){

    if(!pedidos[nome]){
        pedidos[nome] = {
            quantidade:0,
            preco:preco
        };
    }

    pedidos[nome].quantidade++;

    quantidadeTotal++;
    total += preco;

    atualizarTudo();
}


// Remover item

function remover(nome, preco){

    if(pedidos[nome] && pedidos[nome].quantidade > 0){

        pedidos[nome].quantidade--;

        quantidadeTotal--;
        total -= preco;

        if(pedidos[nome].quantidade === 0){
            delete pedidos[nome];
        }

        atualizarTudo();
    }
}
