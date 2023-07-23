import React from 'react';
import './Header.css';
import profile_ from "./../../assets/profile_.jpg"



const Header = ({setHistory}) => {


  // change icons and trigger display property of the history container
  const togglebarsBtn = () =>{
    const btn = document.querySelector('.h-sidebar-icon');
    const btnI = document.querySelector('.h-sidebar-icon i');

    if(btnI.classList.contains('fa-bars')){
      btnI.classList.replace('fa-bars',"fa-xmark");
      btn.classList.add('h-sidebar-icon-active');

      setHistory(Math.random())
    }else{
      btnI.classList.replace('fa-xmark',"fa-bars");
      btn.classList.remove('h-sidebar-icon-active');

      setHistory(Math.random())

    }
  }

  return (
    <div className='h-position'>

      <div className='h-container'>
        <div>
          <button className='h-sidebar-icon' onClick={()=>{
            togglebarsBtn()
          }}>
            <i class="fa-solid fa-bars"></i>
          </button>
            <div>
              <span className='h-brand'>Vedham</span>
            </div>
        </div>

        <div className='h-profile'>
            <img src={profile_} alt='profile' className='h-profileImg' />
          <div className='h-profileName'>
            Vikas Patil
          </div>
        </div>

      </div>
     
    </div>
  )
}

export default Header;
