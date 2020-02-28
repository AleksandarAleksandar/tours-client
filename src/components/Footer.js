import React from 'react'
import { Link } from 'react-router-dom'


function Footer(props) {

  return (
    <div className="footer">
      <div className="footer-line">
        <div className="inner">

          <div className="footer-nav">
              <Link to="/"  className="option hvr-underline-from-center">Home</Link>
              <Link to='/shop' className='option hvr-underline-from-center'>Shop</Link>
              <Link to='/contact' className='option hvr-underline-from-center'>Contact</Link>
              <Link to='/cart' className='option hvr-underline-from-center'>Cart</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Footer
