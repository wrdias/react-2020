const PRODUTOS = '_PRODUTOS';

export function ErroValidacao(errors) {
    this.errors = errors;
}

export default class ProdutoService {
    
    obterProdutos = () => {
        const produtos = localStorage.getItem(PRODUTOS);
        if(!produtos){
            return [];
        }
        return JSON.parse(produtos)
    }

    validar = (produto) => {
        const errors = []

        if (!produto.nome) {
            errors.push('O campo Nome é obrigatório.')
        }

        if (!produto.sku) {
            errors.push('O campo SKU é obrigatório.')
        }

        if (!produto.preco || produto.preco <= 0) {
            errors.push('O campo Preço deve ter uma valor maior que 0.')
        }

        if (!produto.fornecedor) {
            errors.push('O campo Fornecedor é obrigatório.')
        }

        if (errors.length > 0) {
            throw new ErroValidacao(errors)
        }
    }

    obterIndex = (sku) => {
        let index = null;
        if (sku!==null)
        {
            let produtospesq = this.obterProdutos();
            produtospesq.forEach( (produto, i) => {
                if(produto.sku === sku) {
                    index = i;
                }
            })
        }
        return index;
    }

    deletar = (sku) => {
        const index = this.obterIndex(sku)
        if(index !== null)
        {
            const produtos = this.obterProdutos()
            produtos.splice(index, 1)
            localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
            return produtos
        }
    }
     
    salvar = (produto) => {
        this.validar(produto)

        let produtos = localStorage.getItem(PRODUTOS);

        if(!produtos){
            produtos = []
        } else {
            produtos = JSON.parse(produtos)
        }

        //produtos.push(produto);
        //final

        let index = this.obterIndex(produto.sku)
        //alert(index !== null ? "Com valor "+String.parse(index) : "Sem valor")

        if (index === null){
            produtos.push(produto);
        } else {
            produtos[index] = produto;    
        }

        localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
    }
}