import React,{ Component } from 'react';
import Todos from './todos';
import Addtodo from './addTodo';
import axios from 'axios';

class App extends Component{
  state = {
    todos: [
    ]
  }

  componentDidMount = () =>{
    axios.get("/api/getList")
      .then(res => {
          if(res.status === 200){
              this.setState({'todos' : res.data.map((data) => {
                return {'content' : data[1], "id" : Math.random()};
            })});
          }
      })
  }

  deleteTodo = (id) => {
    const todo = this.state.todos.filter(
      todo => {
        return todo.id === id 
      }
    );

    const todos = this.state.todos.filter(
      todo => {
        return todo.id !== id 
      }
    );
    this.setState({
      todos
    })

    const todoData = { "work" : todo[0].content }
    
    axios.post("/api/removeList", todoData)
      .then(res => {
          if(res.status === 200){
            console.log("OK removed");
          }

      })

  }
  addTodo = (todo) => {
    
    todo.id = Math.random();
    let todos = [...this.state.todos, todo];
    this.setState({ todos });

    const todoData = { "work" : todo.content }
    axios.post("/api/addList", todoData)
      .then(res => {
          if(res.status === 200){
            console.log("OK added ");
          }
      })
  }

  render(){
    return(
      <div className="App container">
        <h1 className="center blue-text">Todos</h1>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
        <Addtodo addTodo={this.addTodo}/>
      </div>  
    )
  }
}

export default App;
