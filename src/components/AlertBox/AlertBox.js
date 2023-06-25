import React from 'react'
import "./AlertBox.css"

const AlertBox = (props) => {
  return (
    <div className='ab-container'>
      <div className='ab-alertBox'>
      <i class="fa-solid fa-circle-exclamation" style={{color: "#ffffff",padding:"0 5px 0 0 "}}></i>
        {props.alertMsg}
      </div>
    </div>
  )
}

export default AlertBox;
