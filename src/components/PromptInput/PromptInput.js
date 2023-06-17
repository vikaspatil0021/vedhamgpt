import React from 'react'
import "./PromptInput.css";

const PromptInput = () => {
    return (
        <div className='pi-position'>

            <div className='pi-container'>
                <form>
                    <div className='pi-input-width'>

                        <div className='pi-input-group'>
                            <div className='pi-camera-icon'>
                                <i class="fa-solid fa-camera"></i>
                            </div>
                            <input type='text' className='pi-input' />
                            <div className='pi-microphone-icon'>
                                <i class="fa-solid fa-microphone"></i>
                            </div>
                            <div className='pi-button'>
                                <span class="material-symbols-outlined">
                                    send
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PromptInput;
