const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, getUsers, removeUser, getUser } = require('./users'); 

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

let messages = [];
let logins = [];

io.on('connection', (socket) => {

    socket.on('join', ({ username }, callback) => {
        const { error, user } = addUser({ id: socket.id, name: username.name });
        if(error) return callback (error);
        else {
            io.sockets.emit('chat', messages);
            logins.push(`${user.name} has just logged in`);
            io.sockets.emit('newlog', logins);
        }
    })

    socket.on('disconnect', (id) => {
        console.log('User has left');
        let { error, user } = removeUser(socket.id);

        let kayttajat = getUsers();
        if(kayttajat.length === 0){
            messages = [];
            logins = [];
        } 
        else {
            if(user !== undefined){
                logins.push(`${user.name} has just left`);
                io.sockets.emit('newlog', logins);
            }
            else{
                console.log(error)
            }
        }

    });
    socket.on('chat', ({message, username}, callback) => {
        if(username === undefined){
            const error = 'You are not logged in!';
            return callback (error);
        }
        else {
            const { error, user } = getUser(username, socket.id);
            if(error) return callback (error);
            else {
                let newmessage = {user: username, content: message };
                if(message.trim() !== ''){
                    messages.push(newmessage);
                    io.sockets.emit('chat', messages);
                }
            }
        }
    });
    socket.on('destroyUsersMessages', (username) => {
        let newmessages = [];
        let n = 0;
        while(n < messages.length){
            if(messages[n].user != username){
                newmessages.push(messages[n]);
            }
            n++;
        }
        messages = newmessages;
        io.sockets.emit('chat', messages);
    });

})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));