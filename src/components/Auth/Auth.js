import React, { useEffect, useState } from 'react'
import "./Auth.css";
import profile_ from "./../../assets/profile_.jpg"
import OtpInput from 'react-otp-input';
import axios from "axios"
import { IonSpinner } from '@ionic/react';
const Auth = () => {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')

    const loadAni_g = ({ loading, text }) => {
        const btn = document.querySelector('.a-submit-btn');
        const btnSpan = document.querySelector('.a-submit-btn span');
        const spinner = document.querySelector('.a-spinner');

        if (loading) {

            btn.disabled = true;
            btnSpan.textContent = text;

            spinner.style.display = "inline-flex";
        } else {
            btn.disabled = false;
            spinner.style.display = "none";
            btnSpan.textContent = text;

        }
    }


    const authOTP_g = async () => {
        loadAni_g({ loading: true, text: "Sending OTP" })

        await axios.post(process.env.REACT_APP_SERVER_URL + "/authorization-g", { email })
            .then((res) => {
                if(res.data.EmailSent){

                    loadAni_g({ loading: true, text: "OTP Sent Successfully" })
                    setTimeout(() => {
                        
                        changeHTML()
                    }, 1000);
                }
            }).catch((err) => {
                console.log(err.essage);
                loadAni_g({ loading: false, text: "Error: try again" })
                
            });


    }

    const changeHTML = () => {
        const inputGroup = document.querySelector('.a-input-group');
        const submitBtn = document.querySelector('.a-submit-btn');
        const otpDiv = document.querySelector('.a-otp-div')

        inputGroup.style.opacity = 0;
        submitBtn.style.opacity = 0;
        setTimeout(() => {
            inputGroup.style.display = "none";
            submitBtn.style.display = "none";
            otpDiv.style.display = 'flex'

        }, 1050);
    }

    const loadAni_v = () => {

    }


    const authOTP_v = async () => {

    }
    return (
        <div className='a-container'>
            <div className='a-c-div'>
                <div className='a-form-box'>
                    <form method='POST' className='a-form' onSubmit={(e) => {
                        authOTP_g();
                        e.preventDefault()
                    }}>

                        <div className='a-brand-name'>
                            <div>

                                <img src={profile_} alt='profile' className='a-logo' />

                                <span >Vedham</span>
                            </div>
                        </div>
                        <div className='a-input-group'>
                            <input type='email' className='a-input' placeholder='user@gmail.com' autocapitalize="off" required value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                        </div>
                        <button type='submit' className='a-submit-btn'>
                            <span>Send OTP</span>
                            <div className='a-spinner'>

                                <IonSpinner name="lines-sharp-small" />
                            </div>

                        </button>
                        <div className='a-otp-div'>

                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={4}
                                renderSeparator={<span></span>}
                                renderInput={(props) => <input type='number' autoFocus {...props} className='a-otp-input' />}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;
