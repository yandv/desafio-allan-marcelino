
/**
 * Teremos uma classe CaixaDaLanchonete que irá calcular o valor da compra.
 * Na classe, o método calcularValorDaCompra irá receber método de pagamento e os itens da compra.
 * 
 * O método de pagamento pode ser dinheiro, crédito ou débito.
 * Os itens irão ser representados por um array de strings, onde cada string será um item (produto,quantidade)
 * 
 * Cada item pode ser um produto ou um combo.
 * Um combo também é um produto mas ele não pode ser pedido com itens extras.
 * Um produto pode ser um item extra que só pode ser pedido junto com um produto principal (independente da ordem).
 * 
 * A estrutura é a seguinte: temos uma classe Comanda que representará o carrinho, e uma classe Cardapio que
 * representará o cardápio da lanchonete.
 * 
 * A classe Comanda irá receber um objeto da classe Cardapio no construtor e será ela a responsável por
 * adicionar os itens no carrinho e calcular o valor total da compra.
 * 
 * A classe Cardapio irá conter os produtos e combos disponíveis na lanchonete.
 * 
 * A classe Produto irá conter os atributos descricao, preco e principais.
 * O atributo principais será um array com o código dos produtos que são dependências (extra) do produto.
 * 
 * A classe Combo irá conter os atributos descricao, preco e itens.
 * O atributo itens será um array com o código dos produtos que fazem parte do combo.
 * Um combo também é um produto, então ele também terá os atributos descricao e preco herdados da classe Produto.
 * Mas um combo não pode ser pedido com itens extras, então ele terá o atributo principais sempre vazio.
 * 
 * Os métodos de pagamento serão representados por um objeto com os métodos de pagamento.
 * 
 * Para os pagamentos, eu criei um objeto com os métodos de pagamento.
 * Eu usei um objeto para representar os métodos de pagamento, assim posso validar se o método
 * de pagamento existe usando METODOS_DE_PAGAMENTO[metodoDePagamento] e também posso usar o método
 * de pagamento usando METODOS_DE_PAGAMENTO[metodoDePagamento](valorTotal).
 */

import Cardapio from "./cardapio.js";
import Comanda from "./comanda.js";
import { METODOS_DE_PAGAMENTO } from "./pagamento.js";

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        // verifica existencia do metodo de pagamento

        if (!METODOS_DE_PAGAMENTO[metodoDePagamento.toUpperCase()]) {
            return "Forma de pagamento inválida!";
        }

        let comanda = new Comanda(new Cardapio());

        // adicionar itens no carrinho (no caso de uma lanconete, o carrinho é uma comanda)

        try {
            comanda.adicionarItens(itens);
            comanda.validarDependencias();
        } catch (ex) {
            return ex.message;
        }

        if (comanda.getItens().length == 0) {
            return "Não há itens no carrinho de compra!";
        }

        return "R$ " + METODOS_DE_PAGAMENTO[metodoDePagamento.toUpperCase()](comanda.getValorTotal()).toFixed(2).replace(".", ",");
    }

}

console.log(new CaixaDaLanchonete().calcularValorDaCompra('dinheiro', ['combo1,1'])); // R$ 9,03

export { CaixaDaLanchonete };
