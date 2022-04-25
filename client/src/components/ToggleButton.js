import React from "react";
import "../styles/ToggleButton.css";

const ToggleButton = ({setMode, isDark}) => {
    return ( 
        <div onClick={setMode} className="taggle-mode-container">
                {isDark ? <i id="dark-toggle" className="fa fa-sun-o"></i> : <i className="fa fa-moon-o"></i>}
        </div>
     );
}
 
export default ToggleButton;