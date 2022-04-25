import React, {useState} from "react";
import "../styles/InputTask.css";
import Loading from "./Loading";

const InputTask = () => {
    const [description, setDescription] = useState("");
    const [isPending, setIsPending] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (description) {
                const body = {description};
                await fetch("tasks",
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
            const response = await fetch("surpriseme");
            const data = await response.json();
            setDescription(e.target.value = data.activity);
        
        } catch (error) {
            console.log(error);
        }
        setIsPending(false);
    } 
 
    return (        
        <div className="input-container">
            <form className="form" onSubmit={onSubmit}>
                <input className="input-box" value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder="What do you need to do?" ></input>
                <button onClick={(e) => getData(e)}><i className="fa fa-random"></i></button>
                <button><i className="fa fa-arrow-right"></i></button>
                {isPending && <Loading/>}             
            </form>
        </div>
    );
}
 
export default InputTask;