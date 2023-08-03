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
                        <div>
                        {/*  welcome instructions */ }

                            <h2>Welcome <span>{fName}</span> ! 🎉</h2>
                            <div class="instructions">
                                <div class="step">
                                    1. Upload an image by clicking on the camera icon. 📸
                                </div>
                                <div class="step">
                                    2. Provide details related to the image, for example:
                                    <ul>
                                        <li>Attending a wedding 🏰</li>
                                        <li>Exploring a beautiful mountain 🏞️</li>
                                        <li>Celebrating at a party 🎊</li>
                                    </ul>
                                </div>
                                <div class="step">
                                    3. Send the prompt to start the magic! ✨
                                </div>
                            </div>
                            <div class="prompt">Happy generating! 😃</div>
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
