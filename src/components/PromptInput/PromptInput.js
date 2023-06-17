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

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PromptInput;
