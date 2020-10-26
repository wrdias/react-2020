import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Home from './views/home'
import CadastroProduto from './views/produtos/cadastro'
import CadastroProduto2 from './views/produtos/cadastro2'
import ConsultaProdutos from './views/produtos/consulta'

export default () => {
    return (
        <Switch>
            <Route exact={true} path="/cadastro-produtos/:sku?" component={CadastroProduto} />
            <Route exact={true} path="/consulta-produtos" component={ConsultaProdutos} />
            <Route exect={true} path="/" component={Home} />
        </Switch>
    )
}