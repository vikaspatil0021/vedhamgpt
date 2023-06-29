import React, { useState } from 'react'
import "./Auth.css";
import profile_ from "./../../assets/profile_.jpg"
import OtpInput from 'react-otp-input';

const Auth = () => {
    const [otp, setOtp] = useState('')

    return (
        <div className='a-container'>
            <div className='a-c-div'>
                <div className='a-form-box'>
                    <form className='a-form'>

                        <div className='a-brand-name'>
                        <div>

                            <img src={profile_} alt='profile' className='a-logo' />

                            <span >Vedham</span>
                        </div>
                        </div>
                        <div className='a-input-group'>
                            <input type='text' className='a-input' placeholder='user@gmail.com' required />
                        </div>
                        <div className='a-otp-div'>

                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span></span>}
                            renderInput={(props) => <input {...props} className='a-otp-input' />}
                        />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;
