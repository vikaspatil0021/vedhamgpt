import React, { useEffect, useRef, useState } from 'react';


import './Completions.css';
import axios from 'axios';
import { IonSpinner } from '@ionic/react';

const Completions = ({ alertBoxTrigger, updatedComplations }) => {
    const token01 = localStorage.getItem("token01");
    const fName = localStorage.getItem('userName');

    const [comData, setComData] = useState([])

    // get the completions data
    useEffect(() => {
        comLoader("show");

        const d = new Date()
        const date = d.toISOString().split('T')[0];

        axios.get(process.env.REACT_APP_SERVER_URL + '/completions/' + date, {
            headers: {
                "Authorization": "Bearer " + token01
            }
        }).then(res => {
            const com = [...res.data[0].data].reverse();
            setComData(com)
            comLoader("hide")

        }).catch(err => {
            const error = err.response?.data.Error;
            if (error) {
                alertBoxTrigger(error.message);
            }
            comLoader("hide")
        })
    }, [updatedComplations]);


    const comLoader = (action) => {
        const loader = document.querySelector('.com-loader');
        if (action === "show") {
            loader.style.opacity = 1;
        } else {
            loader.style.opacity = 0;
        }
    }


    // copy text handler
    const copyThat = (id) => {
        const copyText = document.querySelector(id + " p").innerHTML;
        const copyBtn = document.querySelector(id + " button");
        const copyBtnI = document.querySelector(id + " button i");

        navigator.clipboard.writeText(copyText.trim());
        copyBtnI.classList.replace('fa-regular', "fa-solid");
        copyBtnI.classList.replace('fa-clipboard', "fa-check");

        setTimeout(() => {
            copyBtnI.classList.replace("fa-solid", "fa-regular");
            copyBtnI.classList.replace("fa-check", 'fa-clipboard');
            copyBtn.blur();
        }, 2000);
    }

    return (
        <div className='com-container'>
            <div className='com-box'>
                {comData.length === 0 ? <>
                    <div className='com-box-instruction'>
                        <div class="welcome-container">
                            <h1>Welcome, <span>{fName}</span>! 🎉</h1>
                            <div class="steps">
                                <div class="step-item">
                                    <span class="step-icon">📸</span> Upload an image by clicking on the camera icon.
                                </div>
                                <div class="step-item">
                                    <span class="step-icon">🏞️</span> Provide details related to the image:
                                    <ul>
                                        <li><span class="emoji">📝</span> Describe the location, e.g., "On a beautiful mountain."</li>
                                        <li><span class="emoji">👥</span> Mention who is in the picture, e.g., "With friends at a party."</li>
                                        <li><span class="emoji">🎉</span> Add any exciting event, e.g., "Celebrating a wedding."</li>
                                    </ul>
                                </div>
                                <div class="step-item">
                                    <span class="step-icon">✨</span> Send the prompt to start the magic and generate your story!
                                </div>
                            </div>
                            <p class="highlight">Happy generating! 😃</p>
                        </div>

                    </div>
                </> : null}
                {[...comData].map((each, index) => {
                    return (
                        <div id={'com-today-' + (comData.length - index)} className='com-each-completion'>
                            <img src={each.imageURL} loading="lazy" alt='completion' className='desktop' />
                            <div className='com-text'>
                                {/* image for mobile  */}
                                <img src={each.imageURL} alt='completion' className='mobile' />

                                <div className='com-i-text'>
                                    {(comData.length - index) + ' - ' + each.inputText}
                                </div>
                                <div className='com-o-text desktop'>
                                    <p>{each.outputText.replaceAll("\"", '')}</p>
                                    <button title='copy' className='com-o-btn' onClick={() => {
                                        copyThat('#com-today-' + (comData.length - index) + ' .com-o-text.desktop')
                                    }}>
                                        <i class="fa-regular fa-clipboard"></i>
                                    </button>
                                </div>
                            </div>
                            <div className='com-o-text mobile'>
                                <p>{each.outputText.replaceAll("\"", '')}</p>
                                <button title='copy' className='com-o-btn' onClick={() => {
                                    copyThat('#com-today-' + (comData.length - index) + ' .com-o-text.mobile')
                                }}>
                                    <i class="fa-regular fa-clipboard"></i>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='com-loader'>
                <IonSpinner name="lines-sharp-small" />
            </div>
        </div>
    )
}

export default Completions;
