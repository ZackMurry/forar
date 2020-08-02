import React from 'react'
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <div>
          <Link to="/">Home </Link>
          <Link to="/about">About Us </Link>
        </div>
    )
}

export default NavigationBar;