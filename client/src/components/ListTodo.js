import React, {useEffect, useState} from "react";
import EditTodo from "./EditTodo";

let URL = "todos/";
let doneUrl = "donetodos/";
const ListTodo = () => {

    // Hooks
    const [todos, setTodos] = useState([]);
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState(false);
    const [editTodo, setEditTodo] = useState({});

    // Delete function
    const deleteTodo = async (id) => {
        try {
            if (!disable){
                await fetch(URL+`${id}`, {
                    method: "DELETE"
                });
                setTodos(todos.filter(todo => todo.id !== id));
                window.location = "/";
            }else{
                await fetch(doneUrl+`${id}`, {
                    method: "DELETE"
                });
                setTodos(todos.filter(todo => todo.id !== id));
                window.location = "/";
            }
        } catch (error) {
            console.log(error);
        }

    }

    // Fetch all the data from the backend
    const fetchTodos = async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            setTodos(data);
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchTodos(URL);
    },[])
  
    // Handle modal and get the id of the todo to edit
    const handleModal = (id) => {
        setEditTodo(todos.find(todo => todo.todo_id === id));
        console.log(editTodo);
        setShow(true)
    }
    // Post done tasks to the backend
    const postDone = async (description) => {
        try {
            if (description) {
                const body = {description};
                await fetch("donetodos",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                })
                window.location = "/";
            }
        } catch (error) {
            console.log(error);
        }
    }; 
    const handleStatus = (id) => {
        const {description} = todos.find(todo => todo.todo_id === id);
        console.log(description);
        postDone(description);
        deleteTodo(id)
    }

    const handleSelect = (selected) => {
        if (selected === "Done"){
            fetchTodos(doneUrl);
            setDisable(true);

        }
        else{
            setDisable(false);

            fetchTodos(URL);
        }

    }

    return (
    <table className="todo-table styled-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>
                <select className="custom-select" onChange={(e) => handleSelect(e.target.value)}>
                    <option value="Pedding">Pedding</option>
                    <option value="Done" >Done</option>
                </select>
                </th>
            </tr>
        </thead>
        <tbody>
               {todos.map(todo => (
                   <tr key={todo.todo_id}>
                        <td>{todo.description}                        
                        </td>
                        <td>
                            <button className="btn-hover" disabled={disable} onClick={() => handleModal(todo.todo_id)}>Edit</button> 
                            <EditTodo onClose={() => setShow(false)} show={show} todo={editTodo}/>
                        </td>
                        <td><button className="delete-btn btn-hover" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        <td><button disabled={disable} onClick={() => handleStatus(todo.todo_id)}>Done</button></td>
                   </tr>
               ))}        
        </tbody>
    </table>
    );
}
 
export default ListTodo;