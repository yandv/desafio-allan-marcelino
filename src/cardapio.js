class Cardapio {
    constructor() {
        this.produtos = {};

        this.adicionarProduto('cafe', new Produto('Café', 3.00, []));
        this.adicionarProduto('chantily', new Produto('Chantily (extra do Café)', 1.5, ['cafe']));
        this.adicionarProduto('suco', new Produto('Suco Natural', 6.2, []));
        this.adicionarProduto('sanduiche', new Produto('Sanduíche', 6.5, []));
        this.adicionarProduto('queijo', new Produto('Queijo (extra do Sanduíche)', 2.0, ['sanduiche']));
        this.adicionarProduto('salgado', new Produto('Salgado', 7.25, []));
        
        this.adicionarProduto('combo1', new Combo('1 Suco e 1 Sanduíche', 9.5, ['suco', 'sanduiche']));
        this.adicionarProduto('combo2', new Combo('1 Café e 1 Sanduíche', 7.5, ['cafe', 'sanduiche']));
    }

    adicionarProduto(codigo, produto) {
        this.produtos[codigo] = produto;
    }

    getProduto(codigo) {
        return this.produtos[codigo];
    }
}

class Produto {
    constructor(descricao, preco, principais) {
        this.descricao = descricao;
        this.preco = preco;
        this.principais = principais;
    }

    getPreco() {
        return this.preco;
    }

    getPrincipais() {
        return this.principais;
    }
}

class Combo extends Produto {

    constructor(descricao, preco, produtos) {
        super(descricao, preco, []);
        this.produtos = produtos;
    }
}

export default Cardapio;

export { Combo, Produto };

