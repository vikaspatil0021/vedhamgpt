import React, { useEffect, useState } from 'react'
import "./PromptInput.css";

const PromptInput = () => {

    // controlling the rows of textarea by scrollheight
    
    const handleTextareaHeight = (e)=>{
        const piInput = document.querySelector('.pi-input');
        piInput.style.height = "auto";
        if(piInput.scrollHeight > 145){

            piInput.style.height = "110px";
        }else{
            piInput.style.height = (piInput.scrollHeight - 35) + "px";

        }

    }
    

    return (
        <div className='pi-position'>

            <div className='pi-container'>
                <form>
                    <div className='pi-input-width'>

                        <div className='pi-input-group'>
                            <div className='pi-camera-icon'>
                                <i class="fa-solid fa-camera"></i>
                            </div>
                            <textarea onChange={(e)=>handleTextareaHeight(e)} rows='1' type='text' className='pi-input' placeholder='Enter details here...' required />
                            <div className='pi-microphone-icon'>
                                <i class="fa-solid fa-microphone"></i>
                            </div>
                            <button className='pi-button' role='button' type='submit'>
                                <span class="material-symbols-outlined">
                                    send
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PromptInput;
