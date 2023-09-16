import { Combo } from "./cardapio.js";

class Comanda {

    constructor(cardapio) {
        this.cardapio = cardapio;
        this.itens = [];
    }

    adicionarItens(itens) {
        for (const item of itens) {
            const [produto, quantidade] = item.split(",");

            if (quantidade <= 0) { // enunciado falou se for zero, mas também não faz sentido se for menor que zero
                throw new Error("Quantidade inválida!");
            }

            let produtoDoCardapio = this.cardapio.getProduto(produto);

            // verifica existencia do produto no cardapio

            if (!produtoDoCardapio) {
                throw new Error("Item inválido!");
            }

            // adiciona o produto no carrinho
            this.itens.push({ produto: produto, preco: produtoDoCardapio.getPreco(), quantidade: quantidade });
        }
    }

    validarDependencias() {
        for (let item of this.itens) {
            let produto = item.produto;

            if (this.cardapio.getProduto(produto) instanceof Combo) continue; // somente produtos tem dependeciências, combos não

            for (let principal of this.cardapio.getProduto(produto).getPrincipais()) {
                if (!this.itens.find(item => item.produto == principal)) {
                    throw Error("Item extra não pode ser pedido sem o principal");
                }
            }
        }
    }

    getItens() {
        return this.itens;
    }

    getValorTotal() {
        return this.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
    }

}

export default Comanda;