let produtoSelecionado = "";
let precoSelecionado = 0;

function abrirPopupRecheio(nome, preco){

    produtoSelecionado = nome;
    precoSelecionado = preco;

    document
    .getElementById("popupRecheio")
    .classList.add("abrir");
}

function fecharPopupRecheio(){

    document
    .getElementById("popupRecheio")
    .classList.remove("abrir");
}

function confirmarRecheio(tipo){

    let nome = produtoSelecionado;

    if(tipo !== "normal"){
        nome += " com " + tipo;
    }

    adicionar(nome, precoSelecionado);

    fecharPopupRecheio();
}



function finalizarPedido(){

    if(quantidadeTotal === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem =
    "Pedido - Tapioca Sem Vergonha\n\n";

    for(let item in pedidos){
        mensagem +=
        `${item} x${pedidos[item].quantidade}\n`;
    }

    mensagem +=
    `\nTotal: R$ ${total.toFixed(2)}`;

    const numero = "5581995606870";

    const url =
    `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}


function atualizarTudo(){

    let lista =
    document.getElementById("listaCarrinho");

    lista.innerHTML = "";


    for(let item in pedidos){

        lista.innerHTML += `
            <div class="item-carrinho">

                <h4>${item}</h4>

                <div class="controle-carrinho">

                    <button
                    onclick="remover('${item}', ${pedidos[item].preco})">
                        −
                    </button>

                    <span>
                        ${pedidos[item].quantidade}
                    </span>

                    <button
                    onclick="adicionar('${item}', ${pedidos[item].preco})">
                        +
                    </button>

                </div>

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

    const mapaIds = {
        "Charque": "qtd-Charque",
        "Frango": "qtd-Frango",
        "Tradicional": "qtd-Tradicional",
        "Mista": "qtd-Mista",
        "Mussarela": "qtd-Mussarela",
        "Calabresa": "qtd-Calabresa",
        "Queijo": "qtd-Queijo",
        "Creme de Avelã com Morango": "qtd-CremeAvelaMorango",
        "Creme de Avelã": "qtd-CremeAvela",
        "Leite Condensado": "qtd-LeiteCondensado",
        "Brigadeiro": "qtd-Brigadeiro",
        "Beijinho": "qtd-Beijinho",
        "Dois Amores": "qtd-DoisAmores",
        "Romeu e Julieta": "qtd-RomeuJulieta"
    };

    for(let nome in mapaIds){
        let elemento =
        document.getElementById(mapaIds[nome]);

        if(elemento){

            let quantidade = 0;

            for(let item in pedidos){

                if(item.startsWith(nome)){
                    quantidade += pedidos[item].quantidade;
                }

            }

            elemento.innerHTML = quantidade;
        }
    }

}
