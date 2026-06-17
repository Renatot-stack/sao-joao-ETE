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


// Atualizar tela

function atualizarTudo(){

    let lista =
    document.getElementById("listaCarrinho");

    lista.innerHTML = "";


    for(let item in pedidos){

        lista.innerHTML += `
        <div class="item-carrinho">
            <h4>${item}</h4>
            <p>
            Quantidade: ${pedidos[item].quantidade}
            </p>
            <p>
            R$ ${(pedidos[item].preco * pedidos[item].quantidade).toFixed(2)}
            </p>
        </div>
        `;
    }


    if(lista.innerHTML === ""){
        lista.innerHTML =
        "<p>Seu carrinho está vazio.</p>";
    }


    document
    .getElementById("valorTotal")
    .innerHTML = total.toFixed(2);


    document
    .querySelector(".contador")
    .innerHTML = quantidadeTotal;


    // Atualiza os números dos cards

    let nomes = ["Carne","Frango","Linguiça","Queijo"];

    nomes.forEach(nome => {

        let elemento =
        document.getElementById("qtd-"+nome);

        if(elemento){
            elemento.innerHTML =
            pedidos[nome] ?
            pedidos[nome].quantidade :
            0;
        }

    });

}


// Finalizar pedido

function finalizarPedido(){

    if(quantidadeTotal === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem =
    "Pedido - Churrasco 100 Parea\n\n";

    for(let item in pedidos){
        mensagem +=
        `${item} x${pedidos[item].quantidade}\n`;
    }

    mensagem +=
    `\nTotal: R$ ${total.toFixed(2)}`;

    const numero = "5581991272066";

    const url =
    `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}