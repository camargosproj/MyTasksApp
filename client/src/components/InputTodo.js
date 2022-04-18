import React, {useState} from "react";
import addIcon from "../add-icon.png";
import Loading from "./Loading";

const InputTodo = () => {
    const [description, setDescription] = useState("");
    const [isPending, setIsPending] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (description) {
                const body = {description};
                await fetch("todos",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                })
                window.location = "/";
            }
            else{
                alert("Please enter a description");
            }
        } catch (error) {
            console.log(error);
        }
    };  
    // get data from bored api
    const getData = async (e) => {
        try {
            setIsPending(true);
            e.preventDefault();
            e.target.value = "";
            const response = await fetch("try");
            const data = await response.json();
            setDescription(e.target.value = data.activity);
        
        } catch (error) {
            console.log(error);
        }
        setIsPending(false);
    } 
 
    return (        
        <div className="input-todo">
            <form onSubmit={onSubmit}>
                <input id="input-box" value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder="What do you need to do?" />
                <button id="add">Add<img id="addIcon" src={addIcon} alt="Add icon"/></button>
                <button id="rdm-task" onClick={(e) => getData(e)}>Random Task<img id="addIcon" src={addIcon} alt="Add icon"/></button>
                {isPending && <Loading/>}
               

            </form>
        </div>
    );
}
 
export default InputTodo;