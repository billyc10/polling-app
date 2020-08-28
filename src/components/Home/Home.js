import React, {useState} from 'react';
import './Home.css';
import Board from './Board/Board';
import CreatePoll from '../CreatePoll/CreatePoll';

const Home = () => {

    return (
        <div>
            
            <div className="home-container">
                <div className="title">
                    Billy's Cool Poll!
                </div>
                <div className="content">
                    {/* Should conditionally render <Board /> or <CreatePoll />*/}
                    <CreatePoll />
                    <Board />
                </div>
            </div>
        </div>  
    );
}

export default Home;