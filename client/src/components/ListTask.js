import React, {useEffect, useState, Fragment} from "react";
import EditTask from "./EditTask";
import "../styles/ListTask.css";

let URL = "api/tasks/";
let doneUrl = "api/donetasks/";
const ListTask = () => {

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
  
    
    // Handle modal and get the id of the todo to edit
    const handleModal = (id) => {
        setEditTodo(todos.find(todo => todo.todo_id === id));
        setShow(true)
    }
    // Post done tasks to the backend
    const updateDone = async (id, description) => {
        try {
            if (description) {
                const body = {id, description};
                await fetch("api/donetasks",
                {
                    method: "PUT",
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
        updateDone(id,description);
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
    useEffect(() => {
        fetchTodos(URL);
    },[])

    return (
        <Fragment>
        <EditTask onClose={() => setShow(false)} show={show} todo={editTodo}/>
        <table  className="table">
            <thead>
                <tr className="head-row">
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>
                    <select className="select" onChange={(e) => handleSelect(e.target.value)}>
                        <option value="Pedding">Pedding</option>
                        <option value="Done" >Done</option>
                    </select>
                    </th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <tr className="table-row" key={todo.todo_id}>
                            <td>{todo.description}                        
                            </td>
                            <td className="table-icons">
                                <button className="edit-btn" disabled={disable} onClick={() => handleModal(todo.todo_id)}><i className="fa fa-edit"></i></button> 
                            </td>
                            <td className="table-icons">
                                <button className="delete-btn" onClick={() => deleteTodo(todo.todo_id)}><i className="fa fa-trash"></i></button>
                            </td>
                            <td className="table-icons">
                                <button className="done-btn" disabled={disable} onClick={() => handleStatus(todo.todo_id)}><i className="fa fa-check-square-o"></i></button>
                            </td>
                    </tr>
                ))}        
            </tbody>
        </table>
        </Fragment>
    );
}
 
export default ListTask;