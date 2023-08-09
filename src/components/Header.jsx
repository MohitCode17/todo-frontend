import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <img src="./logo.svg" alt="todos-logo" width={100} />
      <nav>
        <Link to={"/"} >Home</Link>
        <Link to={"/login"} >Sign In</Link>
      </nav>
    </header>
  )
}

export default Header