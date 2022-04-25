import React, { useState } from "react";
import "../styles/EditTask.css";

const EditTask = ({todo, show, onClose}) => {
    if (!show) {
        return null;
    }
    const [description, setDescription] = useState(todo.description);

    const updateDescription = async e => {
        e.preventDefault();
        try {
          const body = { description };
          if (body.description === undefined || body.description === "") {
            return alert("Por favor adicione uma descrição");
          }
          await fetch(
            `tasks/${todo.todo_id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            }
          );   
          window.location.reload();
        } catch (err) {
          console.error(err.message);
        }
      };
    return (      
           <div className="container-modal" onClick={onClose}>
               <div className="content-modal" onClick={e => e.stopPropagation()} >           
                    <div className="header-modal">
                        <h1>Edit Task</h1>
                    </div>
                    <div className="body-modal">
                        <input className="input-box input-modal" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="footer-modal">
                        <button onClick={e => updateDescription(e)}>Save</button>    
                        <button onClick={onClose}>Close</button>    
                    </div>
                </div>
           </div>
     );
}
 
export default EditTask;