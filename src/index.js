import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ListaContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      tarefas: [],
      inputTarefa: ""
    };

    // Adicionando tarefa
    this.addTarefa = (ev) => {
        ev.preventDefault();
        const tarefas = this.state.tarefas.slice();      
        
        if (this.state.inputTarefa !== "") {
            tarefas.push(this.state.inputTarefa);    
            this.setState({
                tarefas: tarefas,
                inputTarefa: ""
            });
        }
    };

    // Excluindo tarefas
    this.removeTarefa = (index) => {
      const tarefas = this.state.tarefas.slice();
      tarefas.splice(index, 1);
      this.setState({tarefas});
    };

    this.onChange = (ev) => {
      ev.preventDefault();
      const state = Object.assign({},this.state);
      state[ev.target.name] = ev.target.value;
      this.setState(state);
    };
  }

  render(){
    return (
      <ListaView
      tarefas={this.state.tarefas}
      inputTarefa={this.state.inputTarefa}
      onChange={this.onChange}
      addTarefa={this.addTarefa}
      removeTarefa={this.removeTarefa} />
    );
  }
}

const ListaView = (props) => (
    <div>
        <div className="tarefaAdd">
            <form>
                <div>
                    <img src="images/check.png"/>
                    <input className="inputAdd" id="inputTarefa" name="inputTarefa" autocomplete="off" value={props.inputTarefa} onChange={props.onChange} placeholder="Escreva uma tarefa" />
                    <button className="btnAdd" onClick={props.addTarefa}>Adicionar</button>
                </div>
            </form>
        </div>

        <div className="tarefaList">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Lista de Tarefas</th>
                    </tr>
                </thead>    
                <tbody>
                    {
                    props.tarefas.map((tarefa, index) => (                
                        <tr>
                            <td>
                                <input type="checkbox" id={index} />
                                <label for={index}>{tarefa}</label>
                            </td>

                            <td><button className="btnDel" onClick={() => props.removeTarefa(index)}>Excluir</button></td>
                        </tr>
                        ))
                    }                        
                </tbody>
            </table>
            <p>Clique sobre a tarefa para marcá-la com concluída!</p>
        </div>
  </div>
);

ReactDOM.render(
  <ListaContainer />,
  document.getElementById('root')
);
