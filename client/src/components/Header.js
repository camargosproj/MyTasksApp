import React from "react";
import "../styles/Header.css";


const Header = ({setMode}) => {
    // const [mode, setMode] = useState("fa fa-moon-o");
    if(setMode){
        return (
            <header id="header-bg" className="header-container">
                <div className="logo">
                    <h1>MyTasks APP</h1>
                    <img src="./favicon.png" alt="Logo" />
                </div>
                 <p>Easily manage your tasks!</p>
        </header>
        );
    }
    return (
        <header className="header-container">
            <div className="logo">
                <h1>MyTasks APP</h1>
                <img src="./favicon.png" alt="Logo" />
            </div>
            <p>Easily manage your tasks!</p>
        </header>
     );
}
 
export default Header;