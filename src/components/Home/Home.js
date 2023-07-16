import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import PromptInput from '../PromptInput/PromptInput';
import AlertBox from '../AlertBox/AlertBox';
import Auth from '../Auth/Auth';
import axios from 'axios';
import Completions from '../Completions/Completions';

const Home = () => {

    const [updatedComplations,setUpdatedCompletions] = useState(0)
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
                <Completions alertBoxTrigger={alertBoxTrigger} updatedComplations={updatedComplations} />
            </div>
            <div>
                <PromptInput alertBoxTrigger={alertBoxTrigger} setUpdatedCompletions={setUpdatedCompletions} />
            </div>
            <AlertBox alertMsg={alertMsg} />
        </div>
    )
}

export default Home;
