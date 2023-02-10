import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
        <div className="navbar__background" >
            <picture className="navbar__img" >
            <img className="nav__logo" src={'/SnapSpot.png'} alt="SnapSpot Logo" /> 
            </picture> 
        </div>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/photos"> For Photos</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/roads"> For Roads</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/events">Events</Link>
            </li>

            <li className="navbar__item">
            {
                (localStorage.getItem("lu_token") !== null) ?

                <div className="navbar__logout">
                        <div className="nav-item">
                          <span className="navbar-link nav-item navbar__span" onClick={() => {
                                localStorage.removeItem("lu_token")
                                props.history.push({ pathname: "/" })
                            }}>Logout </span> 
                        </div>
                      </div>

                        :
                     <>
                     <li className="nav-item">
                         <Link className="nav-link" to="/login">Login</Link>
                     </li>
                     <li className="nav-item">
                         <Link className="nav-link" to="/register">Register</Link>
                     </li>
                 </>
         } 
                         </li>       
        </ul>
    )
}