import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import './Home.css';
import Board from './Board/Board';
import CreatePoll from './CreatePoll/CreatePoll';

const HomeButtons = () => {
    // Renders two buttons to select option from home page
    return (
        <div>
            <button className='home-select'> 
                <Link className='router-link' to="/create">Create Poll</Link>
            </button>
            <button className='home-select'>
                <Link className='router-link' to="/poll">Connect to Poll</Link>
            </button>
        </div>
    )
}

const Home = () => {

    // Renders home page with selections to create a poll or retrieve a poll
    return (
        <Router>
            <div className="home-container">
                <div className="title">
                    Billy's Cool Poll!
                </div>

                <div className="content">
                    <Switch>
                        <Route path="/create">
                            <CreatePoll />
                        </Route>
                        <Route path="/poll">
                            <Board />
                        </Route>
                        <Route path='/'>
                            <HomeButtons />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>  
    );
}

export default Home;