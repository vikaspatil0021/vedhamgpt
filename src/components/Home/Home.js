import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import PromptInput from '../PromptInput/PromptInput';
import AlertBox from '../AlertBox/AlertBox';
import Auth from '../Auth/Auth';
import axios from 'axios';

const Home = () => {
    const [alertMsg, setAlertMsg] = useState('This is a Alert message');
    const token01 = localStorage.getItem("token01")

    // trigger alertbox for errors
    const alertBoxTrigger = (msg) => {
        setAlertMsg(msg)
        const abContainer = document.querySelector('.ab-container');
        abContainer.style.display = "flex";
        abContainer.style.opacity = 1

        setTimeout(() => {
            abContainer.style.opacity = 0
        }, 6500);
        setTimeout(() => {
            abContainer.style.display = "none";
        }, 6830);
    }

    // check if the token is expired or invalid 
    useEffect(() => {
        if (token01) {

            axios.get(process.env.REACT_APP_SERVER_URL + '/check_token', {
                headers: {
                    "Authorization": "Bearer " + token01
                }
            }).then(res => {
                console.log(res.data)
            }).catch(err => {
                const error = err.response.data.Error;
                if (error) {

                    console.log(error);
                    alertBoxTrigger(error.message);
                    localStorage.removeItem('token01');
                }

            })
        }
    }, [])

    if (!token01) {
        return (
            <div>
                <Auth alertBoxTrigger={alertBoxTrigger} />
                <AlertBox alertMsg={alertMsg} />
            </div>
        )
    }
    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <div style={{ background: "#111", maxHeight: "100vh", overflow: "auto", height: "100vh", width: '100%', display: 'flex', justifyContent: 'center' }}>
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
