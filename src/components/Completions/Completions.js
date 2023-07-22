import React, { useEffect, useRef, useState } from 'react';


import './Completions.css';
import axios from 'axios';
import { IonSpinner } from '@ionic/react';

const Completions = ({ alertBoxTrigger, updatedComplations }) => {
    const token01 = localStorage.getItem("token01");

    const [comData, setComData] = useState([])

    // get the completions data
    useEffect(() => {
        comLoader("show")
        axios.get(process.env.REACT_APP_SERVER_URL + '/completions', {
            headers: {
                "Authorization": "Bearer " + token01
            }
        }).then(res => {
            const com = [...res.data[0].data].reverse();
            setComData(com)
            comLoader("hide")

        }).catch(err => {
            const error = err.response?.data.Error;
            console.log(error);
            if (error) {
                alertBoxTrigger(error.message);
            }
            comLoader("hide")
        })
    }, [updatedComplations]);


    const comLoader = (action) =>{
        const loader = document.querySelector('.com-loader');
        if(action==="show"){
            loader.style.opacity = 1;
        }else{
            loader.style.opacity = 0;
        }
    }

    return (
        <div className='com-container'>
            <div className='com-box'>
                {[...comData].map((each, index) => {
                    return (
                        <div key={index} className='com-each-completion'>
                            <img src={each.imageURL} alt='completion' className='desktop' />
                            <div className='com-text'>
                                {/* image for mobile  */}
                                <img src={each.imageURL} alt='completion' className='mobile' />

                                <div className='com-i-text'>
                                    {(comData.length - index) + ' - ' + each.inputText}
                                </div>
                                <div className='com-o-text desktop'>
                                    {each.outputText.replaceAll("\"", '')}
                                </div>
                            </div>
                            <div className='com-o-text mobile'>
                                {each.outputText.replaceAll("\"", '')}
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
