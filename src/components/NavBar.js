import React from "react"
import { NavLink } from "react-router-dom"

const bookheader ={
        display: "flex",
        background: "#166e38",
        opacity: ".8",
        height: "4rem",
        padding: "1rem",
        color: "white",
}

function NavBar() {
 
    return (
        <nav style={bookheader}>
            <NavLink  exact to="/">Home</NavLink>
            <NavLink  to="/Books">Books</NavLink>
            <NavLink  to="/NewBook">Add Book</NavLink>
        </nav>
    )
}

export default NavBar