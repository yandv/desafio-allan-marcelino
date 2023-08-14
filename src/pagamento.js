const METODOS_DE_PAGAMENTO = {
    DINHEIRO: (valorTotal) => {
        return valorTotal - valorTotal * 0.05; // Pagamento em dinheiro tem 5% de desconto
    },
    DEBITO: (valorTotal) => {
        return valorTotal;
    },
    CREDITO: (valorTotal) => {
        return valorTotal + valorTotal * 0.03; // Pagamento a crédito tem acréscimo de 3% no valor total
    },
}

export { METODOS_DE_PAGAMENTO };

