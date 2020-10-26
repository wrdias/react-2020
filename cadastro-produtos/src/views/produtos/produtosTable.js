import React from 'react'

export default (props) => (
    <table className="table table-hover">
        <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">SKU</th>
                <th scope="col">Preço</th>
                <th scope="col">Fornecedor</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {
                props.produtos.map( (produto,index) => {
                    return (
                        <tr key={index}>
                            <th>{produto.nome}</th>
                            <th>{produto.sku}</th>
                            <th>{produto.preco}</th>
                            <th>{produto.fornecedor}</th>
                            <th>
                                <button className="btn btn-primary" 
                                        onClick = { () => props.editarAction(produto.sku) }>Editar</button>
                                <button className="btn btn-danger" 
                                        onClick = { () => props.deletarAction(produto.sku) }>Remover</button>
                            </th>
                        </tr>
                    ) 
                })
            }
        </tbody>
    </table>
)