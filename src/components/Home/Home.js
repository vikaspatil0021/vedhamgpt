import React, { useState } from 'react'
import Header from '../Header/Header';
import PromptInput from '../PromptInput/PromptInput';
import AlertBox from '../AlertBox/AlertBox';
import Auth from '../Auth/Auth';

const Home = () => {
    const [alertMsg,setAlertMsg] = useState('This is a Alert message');


    // trigger alertbox for errors
    const alertBoxTrigger = (msg) =>{
        setAlertMsg(msg)
        const abContainer = document.querySelector('.ab-container');
        abContainer.style.display = "flex";
        abContainer.style.opacity = 1

        setTimeout(() => {
            abContainer.style.opacity = 0
        }, 4000);
        setTimeout(() => {
            abContainer.style.display = "none";
        }, 4330);
    }

    if(true){
        return <Auth />
    }
    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <div style={{ background: "#111",maxHeight:"100vh",overflow:"auto", height: "100vh", width: '100%', display: 'flex', justifyContent: 'center' }}>
                    {/* <div style={{ background: "#000", height: "1400px", width: '800px', margin: '0 50px', border: '1px solid #333', borderRadius: "8px" }}>
                        hi
                    </div> */}
                </div>
            </div>
            <div>
                <PromptInput alertBoxTrigger={alertBoxTrigger} />
            </div>
            <AlertBox alertMsg={alertMsg} />
        </div>
    )
}

export default Home;
