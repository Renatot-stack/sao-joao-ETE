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