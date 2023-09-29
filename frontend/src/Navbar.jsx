import React from 'react'
import logo from "./images/logo.png"

{/* <link rel="stylesheet" href=".css" / */}
const Navbar = () => {
  return (
    <div id='nav'>
      <div ><img id='logo' src={logo} alt="" /></div>
      <div id="navMenu">
        <h2>About</h2>
        <h2>Contact</h2>
      </div>
    </div>
  )
}

export default Navbar