import React, {useState} from 'react';
import './Home.css';
import Board from './Board/Board';
import CreatePoll from './CreatePoll/CreatePoll';

const Home = () => {

    const [page, setPage] = useState('');

    // Renders home page with selections to create a poll or retrieve a poll
    return (
        <div>
            <div className="home-container">
                <div className="title">
                    Billy's Cool Poll!
                </div>
                <div className="content">
                    { page == '' &&
                        <div>
                            <button className='home-select' onClick={() => setPage('createPoll')}> 
                                Create Poll
                            </button>
                            <button className='home-select' onClick={() => setPage('getPoll')}>
                                Connect to Poll
                            </button>
                        </div>
                    }

                    { page == 'createPoll' && <CreatePoll/> }
                    { page == 'getPoll' && <Board />}

                </div>
            </div>
        </div>  
    );
}

export default Home;