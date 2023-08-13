
/**
 * Como a gente precisa usar Javascript e não podemos alterar a estrutura básica do código,
 * vamos usar um objeto para representar o cardápio.
 * 
 * Esse objeto irá conter dois atributos: produtos e combos.
 * 
 * O atributo produtos irá conter um objeto da classe Produto com todos os produtos disponíveis na lanchonete.
 * Cada produto será representado por um objeto com os atributos descricao, preco e principais.
 * O principais será um array com o código dos produtos que são dependências (extra) do produto.
 * 
 * O atributo combos irá conter um objeto da classe Combo com todos os combos disponíveis na lanchonete.
 * Um combo também é um produto, então ele também terá os atributos descricao e preco.
 * 
 * Para os pagamentos, eu criei um objeto com os métodos de pagamento.
 * Eu usei um objeto para representar os métodos de pagamento, assim posso validar se o método
 * de pagamento existe usando metodoPagamento[metodoDePagamento] e também posso usar o método
 * de pagamento usando metodoPagamento[metodoDePagamento](valorTotal).
 */

import Cardapio from "./cardapio.js";

const metodoPagamento = {
    "dinheiro": (valorTotal) => {
        return valorTotal - valorTotal * 0.05; // Pagamento em dinheiro tem 5% de desconto
    },
    "debito": (valorTotal) => {
        return valorTotal;
    },
    "credito": (valorTotal) => {
        return valorTotal + valorTotal * 0.03; // Pagamento a crédito tem acréscimo de 3% no valor total
    },
}

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        // verifica existencia do metodo de pagamento

        if (!metodoPagamento[metodoDePagamento]) {
            return "Forma de pagamento inválida!";
        }

        let cardapio = new Cardapio();

        const carrinho = [];

        // adicionar itens no carrinho

        for (let item of itens) {
            let produto = item.split(",")[0];
            let quantidade = parseInt(item.split(",")[1]);

            if (quantidade <= 0) { // enunciado falou se for zero, mas também não faz sentido se for menor que zero
                return "Quantidade inválida!";
            }

            let produtoDoCardapio = cardapio.getProduto(produto) ?? cardapio.getCombo(produto);

            // verifica existencia do produto no cardapio

            if (!produtoDoCardapio) {
                return "Item inválido!";
            }

            // adiciona o produto no carrinho
            carrinho.push({ produto: produto, preco: produtoDoCardapio.getPreco(), quantidade: quantidade });
        }

        // validar dependências (itens extras)

        for (let item of carrinho) {
            let produto = item.produto;
            
            if (!cardapio.hasProduto(produto)) continue; // somente produtos tem dependeciências, combos não

            for (let principal of cardapio.getProduto(produto).getPrincipais()) {
                if (!carrinho.find(item => item.produto == principal)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }

        if (carrinho.length == 0) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);

        return "R$ " + metodoPagamento[metodoDePagamento](valorTotal).toFixed(2).replace(".", ",");
    }

}

console.log(new CaixaDaLanchonete().calcularValorDaCompra('dinheiro', ['combo1,1'])); // R$ 9,03

export { CaixaDaLanchonete };
