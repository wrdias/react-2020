import React from 'react'
import Card from '../../components/card'
import ProdutoService from '../../app/produtoService'
import { withRouter } from 'react-router-dom'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando : false
}

class CadastroProduto extends React.Component {

    state = estadoInicial;

    constructor(){
        super();
        this.service = new ProdutoService();

    }

    onChange = (event) => {
        const valor = event.target.value;
        const nomeDoCampo = event.target.name;
        this.setState({ [nomeDoCampo]: valor });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }

        try{
            this.service.salvar(produto);
            this.limpaCampos();
            this.setState({ sucesso: true });
        } catch(erro) {
            const errors = erro.errors ;
            this.setState({errors : errors});
        }
    }

    limpaCampos = (event) => {
        this.setState(estadoInicial)
    }

    componentDidMount(){
        const sku = this.props.match.params.sku

        if(sku){
            const resultado = this.service.obterProdutos().filter( produto => produto.sku === sku );
            if (resultado.length === 1) {
                let produtoEncontrado = resultado[0] 
                this.setState({ ...produtoEncontrado, atualizando: true})
            }
        }
    }

    render(){
        return (
            <Card header={this.state.atualizando ? 'Atualização de Produto' : 'Cadastro de Produto'} >
                <form id="frmProduto" onSubmit={this.onSubmit}>
                    {
                        this.state.sucesso &&
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="close" data-dismiss="alert"></button>
                            <strong>Bem feito!</strong> 
                        </div>
                    }

                    {   
                        this.state.errors.length > 0 &&
                        
                        this.state.errors.map( msg => {
                            return (
                                <div class="alert alert-dismissible alert-danger">
                                    <button type="button" class="close" data-dismiss="alert"></button>
                                    <strong>Erro</strong> {msg}
                                </div>
                            )
                        })                       
                        
                    }  
                    

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text" className="form-control" value={this.state.nome} name="nome" onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text" className="form-control" value={this.state.sku} name="sku" disabled={this.state.atualizando} onChange={this.onChange} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição:</label>
                                <textarea className="form-control" value={this.state.descricao} name="descricao" onChange={this.onChange} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input type="text" className="form-control" value={this.state.preco} name="preco" onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input type="text" className="form-control" value={this.state.fornecedor} name="fornecedor" onChange={this.onChange} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1">
                            <button className="btn btn-success" type="submit" >{this.state.atualizando ? 'Atualizar' : 'Salvar'}</button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-primary" onClick = {this.limpaCampos} >Limpar</button>
                        </div>
                    </div>
                </form>
            </Card>
        )
    }
}


export default withRouter(CadastroProduto);