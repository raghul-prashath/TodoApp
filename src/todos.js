import React, {Component} from 'react';


class Todos extends Component {
    render(){
        const {todos,deleteTodo} = this.props;
        const todoList = todos.length ? (todos.map(
                todo => {
                    return (
                        <div className="center collection-item" id="todo.id">
                            <span onClick={() => {deleteTodo(todo.id)}}>{todo.content}</span>
                        </div>
                    )
                }
            )) : ( <div className="center collection-item">No todos Left!</div>);
        return(
            <div className="center collection">
                {todoList}
            </div>
        )
    }
}

export default Todos;
