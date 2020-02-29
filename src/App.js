import React from 'react';
import './App.css';
import { Poll, CreatePoll } from './components/index';

export default class App extends React.Component {
    render() {
        return (
            <CreatePoll />
        );
    }
}