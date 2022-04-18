import React, { Fragment, useState } from "react";

const EditTodo = ({todo, show, onClose}) => {
    if (!show) {
        return null;
    }
    const [description, setDescription] = useState(todo.description);

    const updateDescription = async e => {
        e.preventDefault();
        try {
          const body = { description };
          await fetch(
            `todos/${todo.todo_id}`,
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
       <Fragment>
           <div className="container-modal" onClick={onClose}>
               <div className="content-modal" onClick={e => e.stopPropagation()} >           
                    <div className="header-modal">
                        <p>Edit Tasks</p>
                    </div>
                    <div className="body-modal">
                        <input className="input-modal" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="footer-modal">
                        <button onClick={e => updateDescription(e)}>Save</button>    
                        <button onClick={onClose}>Close</button>    
                    </div>
                </div>
           </div>
           
       </Fragment>
     );
}
 
export default EditTodo;