import React, { useEffect, useState } from 'react'
import "./Auth.css";
import profile_ from "./../../assets/profile_.jpg"
import OtpInput from 'react-otp-input';
import axios from "axios"
import { IonSpinner } from '@ionic/react';
const Auth = (props) => {
    const [info, setInfo] = useState({
        email: '',
        fName: ''
    })
    const [otp, setOtp] = useState('')

    const loadAni_g = ({ OTPtype, loading, text, border }) => {
        const btn = document.querySelector((OTPtype==='send')?'.a-submit-btn':".a-resendOtp-btn");
        const btnSpan = document.querySelector((OTPtype==='send')?'.a-submit-btn span':".a-resendOtp-btn span");
        const spinner = document.querySelector((OTPtype==='send')?'.a-submit-btn .a-spinner':".a-resendOtp-btn .a-spinner");

        if (loading) {

            btn.disabled = true;
            if (border) btn.style.border = border
            btnSpan.textContent = text;

            spinner.style.display = "inline-flex";
        } else {
            btn.disabled = false;
            spinner.style.display = "none";
            btnSpan.textContent = text;

        }
        if(OTPtype==="resend" && text==='OTP Sent Successfully'){
            setTimeout(() => {
                btn.style.border = "1px solid #333"

                loadAni_g({OTPtype,  loading: false, text: "resend OTP" })
            }, 500);
        }
    }


    const authOTP_g = async (OTPtype) => {
        loadAni_g({OTPtype, loading: true, text: "Sending OTP", border: "1px solid #333" })

        await axios.post(process.env.REACT_APP_SERVER_URL + "/authorization-g", { email: info.email })
            .then((res) => {
                if (res.data.EmailSent) {

                    loadAni_g({OTPtype,  loading: true, text: "OTP Sent Successfully", border: "2px solid green" })
                    setTimeout(() => {

                        changeHTML()
                    }, 1000);
                }
            }).catch((err) => {
                console.log(err.message);
                props.alertBoxTrigger(err.message)
                loadAni_g({OTPtype,  loading: false, text: "Get OTP" })

            });


    }

    const changeHTML = () => {
        const inputGroup = document.querySelector('#a-input-fName');
        const inputEmail = document.querySelector('#a-input-email');

        const submitBtn = document.querySelector('.a-submit-btn');
        const otpDiv = document.querySelector('.a-otp-div');
        const otpSpinner = document.querySelector('.a-otp-spinner');
        const resendOtpBtn = document.querySelector('.a-resendOtp-btn');

        inputGroup.style.opacity = 0;
        submitBtn.style.opacity = 0;
        setTimeout(() => {
            inputGroup.style.display = "none";
            submitBtn.style.display = "none";
            otpDiv.style.display = 'flex';
            inputEmail.disabled = true;
            otpSpinner.style.display = 'flex'
            resendOtpBtn.style.display = "inline-flex"
        }, 600);
    }

    const loadAni_v = ({ loading,text }) => {
        const otpSpinnerSpan = document.querySelector('.a-otp-spinner span');
        if(loading){
            otpSpinnerSpan.innerHTML = text
        }else{
            otpSpinnerSpan.innerHTML = "Enter OTP"
        }

    }

    useEffect(() => {
        if (otp.length === 4) {
            authOTP_v()
        }
    }, [otp])

    const authOTP_v = async () => {
        const otpInputArr = document.querySelectorAll('.a-otp-input');

        loadAni_v({ loading: true, text:"Verifying OTP" })
        await axios.post(process.env.REACT_APP_SERVER_URL + "/authorization-v", { email: info.email, otp, fName: info.fName })
            .then((res) => {
                if(res.data.status){
                    loadAni_v({ loading: true, text:"👍 OTP Verified  >  Redirecting..." });
                    localStorage.setItem("token01",res.data.token);
                    localStorage.setItem("userEmail",res.data.user.email);
                    localStorage.setItem("userName",res.data.user.fName);

                    otpInputArr.forEach((each)=>{
                        each.style.border = "1px solid #05ff11";
                    })
                        

                    setTimeout(() => {
                            window.location.reload()
                    }, 1000);
                }

            }).catch((err) => {
                console.log(err)
                const error = err.response?.data.Error;
                if (error) {
                    setOtp('')
                    props.alertBoxTrigger(error);
                    loadAni_v({ loading: true, text:"Enter OTP" });
                    otpInputArr.forEach((each)=>{

                    each.style.border = "1px solid #ee3737";
                    })
                }

            });
    }
    return (
        <div className='a-container'>
            <div className='a-c-div'>
                <div className='a-form-box'>
                    <form method='POST' className='a-form' onSubmit={(e) => {
                        authOTP_g("send");
                        e.preventDefault()
                    }}>

                        <div className='a-brand-name'>
                            <div>

                                <img src={profile_} alt='profile' className='a-logo' />

                                <span >Vedham</span>
                            </div>
                        </div>
                        <div id='a-input-fName' className='a-input-group'>
                            <input type='text' className='a-input' placeholder='Ex: Vikas Patil' autocapitalize="off" required value={info.fName} onChange={(e) => {
                                setInfo({
                                    fName: e.target.value,
                                    email: info.email
                                })
                            }} />
                        </div>
                        <div className='a-input-group' >
                            <input id='a-input-email' type='email' className='a-input' placeholder='user@gmail.com' autoComplete='off' autocapitalize="off" required value={info.email} onChange={(e) => {
                                setInfo({
                                    email: e.target.value,
                                    fName: info.fName
                                })
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
                                inputType={'number'}
                                renderSeparator={<span></span>}
                                renderInput={(props) => <input type='number'  {...props} className='a-otp-input' />}
                            />
                        </div>
                        <div class="a-otp-spinner">
                            <IonSpinner name="lines-sharp-small" />
                            <span>Enter OTP</span>
                        </div>
                        <button className='a-resendOtp-btn' onClick={(e) => {
                        authOTP_g("resend");
                        e.preventDefault()
                    }}>
                            <span>Resend OTP</span>
                            <div className='a-spinner'>

                                <IonSpinner name="lines-sharp-small" />
                            </div>

                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;
