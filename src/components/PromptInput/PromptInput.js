import React, { useState } from 'react'
import "./PromptInput.css";

const PromptInput = () => {
    const [prompt, setPrompt] = useState('');

    // controlling the rows of textarea by scrollheight
    const handleTextareaHeight = () => {
        const piInput = document.querySelector('.pi-input');
        piInput.style.height = "auto";
        if (piInput.scrollHeight > 145) {

            piInput.style.height = "110px";
        } else {
            piInput.style.height = (piInput.scrollHeight - 35) + "px";

        }

    }

    // live speech to text prompt code 
    const speechRecognition = window.webkitSpeechRecognition;
    const recognition = new speechRecognition();

    const startListening = () => {
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.start();
    }

    recognition.onresult = (event) => {
        var interim = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (!event.results[i].isFinal) {
                interim += event.results[i][0].transcript;
            }
        }

        if(interim !== ''){
            setPrompt(interim);
        }
        handleTextareaHeight();
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
                            <textarea rows='1' type='text' className='pi-input' placeholder='Enter details here...' value={prompt} onChange={(e) => {
                                handleTextareaHeight();
                                setPrompt(e.target.value);
                            }} required />
                            <div className='pi-microphone-icon' onClick={(e) => startListening(e)}>
                                <i class="fa-solid fa-microphone"></i>
                            </div>
                            <button className='pi-button' role='button' type='submit'>
                                <span class="material-symbols-outlined">send</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PromptInput;
