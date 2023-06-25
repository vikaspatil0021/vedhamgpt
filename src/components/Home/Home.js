import React, { useState } from 'react'
import Header from '../Header/Header';
import PromptInput from '../PromptInput/PromptInput';
import AlertBox from '../AlertBox/AlertBox';

const Home = () => {
    const [alertMsg,setAlertMsg] = useState('This is a Alert message');

    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <div style={{ background: "#111", height: "100vh", width: '100%', display: 'flex', justifyContent: 'center' }}>
                    {/* <div style={{ background: "#000", height: "400px", width: '800px', margin: '0 50px', border: '1px solid #333', borderRadius: "8px" }}>
                        hi
                    </div> */}
                </div>
            </div>
            <div>
                <PromptInput setAlertMsg={setAlertMsg} />
            </div>
            <AlertBox alertMsg={alertMsg} />
        </div>
    )
}

export default Home;
