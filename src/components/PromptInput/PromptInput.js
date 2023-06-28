import React, { useEffect, useState } from 'react'
import "./PromptInput.css";

import { IonSpinner } from '@ionic/react';

import axios from "axios";

import mp_loading from "./../../assets/loading1.gif"
import p from "./../../assets/profile_.jpg"


const PromptInput = (props) => {
    const [prompt, setPrompt] = useState('');
    const [fileSelected, setFileSelected] = useState('')

    // displaying the image container
    useEffect(() => {
        const imgContainer = document.querySelector('.pi-image-container');
        if (fileSelected === '' || fileSelected === undefined || fileSelected === null) {
            imgContainer.style.display = "none";

        } else {
            setTimeout(() => {
                imgContainer.style.display = "flex";
            }, 100)
        }
    }, [fileSelected])

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

        const input = document.querySelector('.pi-input');
        input.placeholder = "Listening ...";

        // microphone icon switch
        const mp_icon = document.querySelector('.pi-microphone-icon');
        const mp_ani_icon = document.querySelector('.pi-microphone-ani-icon');
        mp_icon.style.display = 'none';
        mp_ani_icon.style.display = 'block';
    }

    recognition.onresult = (event) => {
        var interim = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (!event.results[i].isFinal) {
                interim += event.results[i][0].transcript;
            }
        }

        if (interim !== '') {
            setPrompt(interim);
        }
        handleTextareaHeight();
    }

    recognition.onend = () => {

        const input = document.querySelector('.pi-input');
        input.placeholder = "Enter details here ...";

        // microphone icon switch
        const mp_icon = document.querySelector('.pi-microphone-icon');
        const mp_ani_icon = document.querySelector('.pi-microphone-ani-icon');
        mp_icon.style.display = 'block';
        mp_ani_icon.style.display = 'none';
    }

    // submit loading animation function
    const loadAni = ({ loading, text }) => {
        const inputGroup = document.querySelector('.pi-input-group-disabled');
        const inputBtn = document.querySelector('.pi-button-disabled');
        const loaderText = document.querySelector('.pi-loader-text span');
        const piInput = document.querySelector('.pi-input');
        const imgXMark = document.querySelector('.pi-img-xmark');

        if (loading) {
            inputGroup.style.display = 'flex';
            inputBtn.style.display = 'block';
            imgXMark.style.display='none';

            setTimeout(() => {
                inputGroup.style.opacity = 1;
                loaderText.innerHTML = text;
            }, 10);
        } else {

            inputGroup.style.opacity = 0;
            setTimeout(() => {
                inputGroup.style.display = 'none';
                inputBtn.style.display = 'none';
                imgXMark.style.display='inline';
            }, 400);
            piInput.style.height = "auto";
        }
    }

    // upload image to cloudinary
    const uploadImage = async () => {
        loadAni({ loading: true, text: "Uploading image" });

        const formData = new FormData();
        formData.append("file", fileSelected);
        formData.append("upload_preset", "kpuktd4f");
        return await axios.post("https://api.cloudinary.com/v1_1/dt55mivpf/image/upload", formData)
            .then((res) => {
                return res.data.url;
            }).catch((err) => {
                props.alertBoxTrigger(err.message);
                loadAni({ loading: false });
            })
    }

    // <-----------------onSumbit Prompt Trigger----->
    const onSubmitPrompt = async() => {
        if (fileSelected === '' || fileSelected === undefined || fileSelected === null) {
            props.alertBoxTrigger("No image file selected.")
        }else{
            // step 1 upload image to cloudinary
            const resultURL =  await uploadImage();
            
                setPrompt('');
                setFileSelected('')
                loadAni({ loading: false });

        }
    }

    return (
        <div className='pi-position'>
            <div className='pi-container'>
                <div className='pi-image-container'>
                    <div className='pi-selected-image'>
                        <img src={(!fileSelected) ? '' : URL.createObjectURL(fileSelected)} alt='select_image' />
                        <div className='pi-img-xmark' onClick={() => {
                            setFileSelected('')
                        }}>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
                <form method='POST' onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitPrompt()
                }}>
                    <div className='pi-input-width'>

                        <div className='pi-input-group'>
                            <div className='pi-camera-icon'>
                                <i class="fa-solid fa-camera"></i>
                                <input type='file' className='pi-file-input' accept="image/jpeg, image/png, image/jpg" onChange={(e) => {
                                    setFileSelected(e.target.files[0]);
                                }} />
                            </div>

                            <textarea rows='1' type='text' className='pi-input' placeholder='Enter details here ...' value={prompt} onChange={(e) => {
                                handleTextareaHeight();
                                setPrompt(e.target.value);
                            }} required />
                            <div className='pi-microphone-icon' onClick={(e) => startListening(e)}>
                                <i class="fa-solid fa-microphone"></i>
                            </div>
                            <div className='pi-microphone-ani-icon'>

                                <lord-icon
                                    src="https://cdn.lordicon.com/psseymno.json"
                                    trigger="loop"
                                    colors="primary:#4be1ec,secondary:#cb5eee"
                                    style={{ width: "28px", height: "28px" }}
                                />
                            </div>

                            <button className='pi-button' role='button' type='submit' readOnly>
                                <span class="material-symbols-outlined">send</span>
                            </button>

                            <div className='pi-button-disabled'></div>

                            <div className='pi-input-group-disabled'>
                                <div className='pi-loader'>
                                    <IonSpinner name="lines-sharp-small" />
                                </div>
                                <div className='pi-loader-text'>
                                    <span>
                                        Loading ...
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PromptInput;
