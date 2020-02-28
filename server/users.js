let users = [];


const addUser = ({ id, name }) => {

    //Let's make sure user tries to login with at least something

    if((id == undefined) || (name == undefined)){
        return { error: 'You have to have a username' }

    }

    name = name.trim().toLowerCase();

    //Let's make sure he didn't add any weird characters

    const wrongCharacters = ['/', '\\', '\'', '!', '.', '?', ':', '&', ',', '"', ';', '[', ']', '{', '}', '*'];

    let hasWrongCharacters = false;

    for(let n=0; n<wrongCharacters.length; n++){
        if(name.indexOf(wrongCharacters[n]) > -1){
            hasWrongCharacters = true;
            break;
        }
    }

    if(hasWrongCharacters){
        return { error: 'Special characters: ' + wrongCharacters + ' are not allowed' }
    }

    //Let's make sure user doesn't give us an empty username

    if(name == ''){
        return { error: 'Add some letters to your username, maybe?' }
    }

    //Let's make sure the username has not already been taken

    const existingUser = users.find(user => name === user.name);

    if(existingUser){
        return { error: 'Username is taken' }
    }


    //If everything seems to be in order, let's give our new interlocutor a pass

    const user = { id, name };

    users.push(user);

    return { user };

}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        let user = users.splice(index, 1)[0];
        return { user };
    }
    else {
        return { error: 'There is no such person to remove' }

    }

}

const getUser = (name, id) => {

    if((id == undefined) || (name == undefined)){
        return { error: 'You have to pass both name and id' }
    }

    name = name.trim().toLowerCase();
    const user = users.find((user) => user.name === name);
    if(user === undefined || user.id !== id){
        return { error: 'You are not logged in!' }
    }
    else {
        return { user };
    }
}

const getUsers = () => {
    return users;
}

const removeAllUsers = () => {
    users = [];
}

module.exports = { addUser, removeUser, getUsers, getUser, removeAllUsers };