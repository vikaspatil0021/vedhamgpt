import React from 'react';

import "./Account.css"

const Account = () => {
    const fName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');


    // close the account wrapper
    const closeAccount = () => {
        const ac = document.querySelector('.ac-position');
        ac.style.display = "none"

    }

    // logout 
    const logoutTrigger = ()=>{
        localStorage.clear();
        setTimeout(() => {
            window.location.reload()
        }, 500);
    }

    return (
        <div className='ac-position'>
            <div className='ac-black-bg'></div>
            <div className='ac-container'>
                <div className='ac-head'>
                    <span>
                        Account
                    </span>
                    <span className='ac-xmark' onClick={closeAccount}>
                        <i className='fa-solid fa-xmark' />
                    </span>
                </div>
                <div className='ac-content'>
                    <div className='ac-content-div'>
                        <div className='ac-content-name'>
                            NAME
                        </div>
                        <div>
                            {fName}
                        </div>
                    </div>
                    <div className='ac-content-div'>
                        <div className='ac-content-name'>
                            EMAIL
                        </div>
                        <div>
                            {userEmail}
                        </div>
                    </div>
                    <div className='ac-content-logout'>
                        <div>
                        Time to bid adieu! Keep smiling and see you soon! 😊
                        </div>
                        <button onClick={logoutTrigger}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;