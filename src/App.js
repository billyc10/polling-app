import React from 'react';
import './App.css';
import Poll from './components/Poll/Poll';
import CreatePoll from './components/CreatePoll/CreatePoll';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <CreatePoll />
                </div>
            <div>
                    <Poll />
            </div>
           </div>
        );
    }
}