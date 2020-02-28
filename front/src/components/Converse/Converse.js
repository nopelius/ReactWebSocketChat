import React, { useState, useEffect } from 'react';

import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import queryString from 'query-string';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Converse.css';

let socket;

const Converse = ({ location }) => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    const [dialogState, setDialog] = useState(false); 

    const [logininfo, setLogininfo] = useState([]);

    const ENDPOINT = 'localhost:5000'

    function addMessage(m){
        socket.emit('chat', { message: m, username: username }, (error) => {
            if(error){
                window.location = '/';
                alert(error);
            }
        });
        setMessage('');
    }

    function destroyAllYourMessages(){
        socket.emit('destroyUsersMessages', username);
        setDialog(false);
    }

    useEffect(() => {
        const uname = queryString.parse(location.search);
        console.log(uname);
        console.log('Huomenta!!');
        setUsername(uname.name);

        socket = io(ENDPOINT);

        socket.emit('join', { username: uname }, (error) => {
            if(error){
                window.location = `/`;
                alert(error);
            }
        });

        socket.on('beginnings', function(data){
            setMessages(data);
        });

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('chat', (messages) => {
            setMessages(messages);
        });
    }, [messages]);

    useEffect(() => {
        socket.on('newlog', (logins) => {
            setLogininfo(logins);
        });
    }, [logininfo]);

    return (
        <div className="converse-container">
            <div className="item1">
                <div className='titleStyle'>
                    <h1>Conversing pleasently</h1>
                </div>
                <div className="inputFields">
                    <p>{username}</p>
                    <TextField helperText='your new message' fullWidth={true} value={message} onChange={(e) => setMessage(e.target.value)} 
                    onKeyPress={(e) => (e.key === 'Enter') ? addMessage(message) : {}}/>
                    <Button onClick={() => addMessage(message)}>Send</Button>
                    <Button onClick={() => setDialog(true)}>Destroy all your messages</Button>
                </div>

            </div>
            <ScrollToBottom className="item3">
                {logininfo.map((l, i) => <p key={i}>{l}</p>)}
            </ScrollToBottom>
            <ScrollToBottom className="item2">
                {messages.map((m, i) => <p key={i}> {m.user}: {m.content} </p>)}    
            </ScrollToBottom>

            <Dialog open={dialogState}>
                <DialogTitle className="titleStyle">
                    {username}, are you certain you want to destroy all your messages?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You cannot revert this action, so... 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => destroyAllYourMessages()}>
                        Yes!!! Do it!!!
                    </Button>
                    <Button onClick={() => setDialog(false)}>
                        No! Never!!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Converse;