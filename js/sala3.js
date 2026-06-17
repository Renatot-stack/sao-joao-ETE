let produtoSelecionado = "";
let precoSelecionado = 0;

function abrirPopup(nome, preco){

    produtoSelecionado = nome;
    precoSelecionado = preco;

    document
    .getElementById("popupAcompanhamento")
    .classList.add("abrir");
}

function fecharPopup(){

    document
    .getElementById("popupAcompanhamento")
    .classList.remove("abrir");
}

function confirmarPedido(tipo){

    let nome = produtoSelecionado;
    let preco = precoSelecionado;

    if(tipo === "farofa"){
        nome += " + Farofa";
        preco += 2;
    }

    if(tipo === "vinagrete"){
        nome += " + Vinagrete";
        preco += 2;
    }

    adicionar(nome, preco);

    fecharPopup();
}

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

    const numero = "558796323079";

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
        "Boi": "qtd-Boi",
        "Frango": "qtd-Frango",
        "Frango com Bacon": "qtd-FrangoBacon",
        "Misto": "qtd-Misto",
        "Pão de Alho": "qtd-PaoAlho",
        "Macaxeira": "qtd-Macaxeira",
        "Queijo": "qtd-Queijo"
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
