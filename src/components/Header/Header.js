import React from 'react';
import { Link } from "react-router-dom"
import './Header.css';
import profile_ from "./../../assets/profile_.jpg"
const Header = () => {
  return (
    <div className='h-position'>

      <div className='h-container'>
        <div>
          <div className='h-sidebar-icon'>
            <i class="fa-solid fa-bars"></i>
          </div>
            <div>
              <span className='h-brand'>Vedham GPT</span>
            </div>
        </div>

        <div className='h-profile'>
          <div className='h-profileName'>
            Vikas Patil
          </div>
          <div>
            <img src={profile_} alt='profile' className='h-profileImg' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Header;
