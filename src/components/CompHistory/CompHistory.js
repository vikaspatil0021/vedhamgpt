import React, { useEffect, useRef, useState } from 'react';

import './CompHistory.css'
import axios from 'axios';
import { IonSpinner } from '@ionic/react';

const CompHistory = ({ comHistory, alertBoxTrigger }) => {
    const token01 = localStorage.getItem("token01");

    const [dates, setDates] = useState([]);
    const [comData, setComData] = useState([])

    const [activeDate, setActiveDate] = useState('');



    const eachDate = (each) => {
        const month = ["Jan", "Feb", "Mar", "April", "may", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return each.substring(0, 4) + " " + month[each.substring(6, 7) - 1] + " " + each.substring(8);
    }

    useEffect(() => {
        showHistory();

        // getting all dates
        if (dates !== '') {
            axios.get(process.env.REACT_APP_SERVER_URL + '/allDates', {
                headers: {
                    "Authorization": "Bearer " + token01
                }
            }).then(res => {
                const d = new Date()
                const date = d.toISOString().split('T')[0];
                const dateArr = res.data.filter((each) => {
                    return each != date;
                })
                setDates(dateArr);
            }).catch(err => {
                const error = err.response?.data.Error;
                if (error) {
                    alertBoxTrigger(error.message);
                }
            })
        }
    }, [comHistory]);


    // // getting data based on dates
    useEffect(() => {
        chLoader("show")

        axios.get(process.env.REACT_APP_SERVER_URL + '/completions/' + activeDate, {
            headers: {
                "Authorization": "Bearer " + token01
            }
        }).then(res => {
            const com = [...res.data[0].data].reverse();
            setComData(com)
            chLoader("hide")


        }).catch(err => {
            const error = err.response?.data.Error;
            if (error) {
                alertBoxTrigger(error.message);
            }
            chLoader("hide")

        })
    }, [activeDate])

    // trigger coh-position to show or hide
    const showHistory = () => {
        const div = document.querySelector('.ch-position');
        const btnI = document.querySelector('.h-sidebar-icon i'); //in header

        if (btnI.classList.contains('fa-xmark')) {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    }

    // change the active selected date btn
    const selectActiveDate = (id) => {
        const activeDate = document.querySelector('.ch-p1-dc-active');
        if (activeDate) {
            activeDate.classList.remove('ch-p1-dc-active')
        }

        const clickedDate = document.querySelector("#" + id);
        clickedDate.classList.add('ch-p1-dc-active');

        setActiveDate(id.replace("ch-", ''))
    }

    // loading animation
    const chLoader = (action) => {
        const loader = document.querySelector('.ch-loader');
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
        <div className='ch-position'>
            <div className='ch-container'>
                <div className='ch-part1'>
                    <div className='ch-p1-title'>
                        History
                    </div>
                    <div className='ch-p1-dates'>

                        {dates.map((each) => {
                            return (
                                <div id={"ch-" + each} className='ch-p1-date-card' onClick={() => {
                                    selectActiveDate("ch-" + each)
                                }}>
                                    <i class="fa-regular fa-clock"></i>
                                    <span>{eachDate(each)}</span>
                                </div>
                            )
                        })}
                    </div>

                </div>
                <div className='ch-part2'>
                    <div className='ch-p2-title'>
                        {eachDate(activeDate)}
                    </div>
                    <div className='ch-p2-com'>
                        {[...comData].map((each, index) => {
                            return (
                                <div id={'ch-p2-' + (comData.length - index)} className='com-each-completion'>
                                    <img src={each.imageURL} loading="lazy" alt='completion' className='desktop' />
                                    <div className='com-text'>
                                        {/* image for mobile  */}
                                        <img src={each.imageURL} alt='completion' className='mobile' />

                                        <div className='com-i-text'>
                                            {(comData.length - index) + ' - ' + each.inputText}
                                        </div>
                                        <div className='com-o-text desktop'>
                                            <p>{each?.outputText?.replaceAll("\"", '')}</p>
                                            <button  title='copy' className='com-o-btn' onClick={() => {
                                        copyThat('#ch-p2-' + (comData.length - index) + ' .com-o-text.desktop')
                                    }}>
                                        <i class="fa-regular fa-clipboard"></i>
                                    </button>
                                        </div>
                                    </div>
                                    <div className='com-o-text mobile'>
                                        <p>{each?.outputText?.replaceAll("\"", '')}</p>
                                        <button title='copy' className='com-o-btn' onClick={() => {
                                            copyThat('#ch-p2-' + (comData.length - index) + ' .com-o-text.mobile')
                                        }}>
                                            <i class="fa-regular fa-clipboard"></i>
                                        </button>
                                    </div>

                                </div>
                            )
                        })}

                        <div className='ch-loader'>
                            <IonSpinner name="lines-sharp-small" />
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default CompHistory;