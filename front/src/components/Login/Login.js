import React, { useState } from 'react';

import { Button, TextField, makeStyles } from '@material-ui/core';

const Login = () => {

    const [username, setUsername] = useState('');

    const useStyles = makeStyles({
        titleStyle: {
            background: 'linear-gradient(70deg, #AA0000 30%, #DD0D0D 60%)',
            color: 'white',
            border: 'solid',
            padding: 40,
            fontSize: 30,
        },
        buttonStyle: {
          background: 'linear-gradient(60deg, #CC0000 10%, #0C0CCC 90%)',
          border: 0,
          boxShadow: '0 7px 10px 4px rgba(155, 105, 135, .6)',
          color: 'white',
          height: 48,
          margin: '0 20px',
          padding: '0 50px',
        },
        textStyle: {
            textAlign: 'center',
        },
        footerStyle: {
            border: 'solid',
            background: '#111111',
            color: 'white',
            position: 'fixed',
            width: '95%',
            bottom: '0',
            margin: 10
        },
      });

      const classes = useStyles();

    function checkCorrectness(){
        if(username !== ''){
            window.location = `converse?name=${username}`;
        }
    }

    return(
        <div className={classes.textStyle}>
            <div className={classes.titleStyle}>
                <h1>Please, login to our fine chat</h1>
            </div>

            <div>
                <TextField value={username} label="Login" helperText="type your username" 
                onChange={(e) => setUsername(e.target.value)} onKeyPress={(e) => (e.key === 'Enter') ? checkCorrectness():{}}/>
                <Button className={classes.buttonStyle} onClick={() => checkCorrectness()}>
                    Login
                </Button>
            </div>

            <div className={classes.footerStyle}>
                <p>
                    Remember to abide by any and ALL the rules that your lord and master,
                    the admin,
                    is going to make up in the near future.
                </p>
                <p>
                    Those who disagree with the opinions of the master, will be banned for life.
                </p>
            </div>
        </div>

    );
}

export default Login;