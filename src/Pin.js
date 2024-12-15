import React from 'react';
import App from './App';

const PIN_LENGTH = 4;

class Pin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pinSet: false,
            pinTrue: false,
            pin: ''
        };
    }


    render() {
        if (this.state.pinTrue) {
            return <App/>
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter your Pin:
                        <input type='password' name='pin' id='pin' required />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
    handleSubmit =(event)=> {
        event.preventDefault();
        let pin = document.querySelector('input[name="pin"]').value;
        const setPin = localStorage.getItem('pin')
        if (pin.length !== PIN_LENGTH) {
            alert('Pin must be 4 digits long');
            return
        }
        if (!setPin){
            localStorage.setItem('pin', pin);
            console.log(pin);
            this.setState({
                pinSet: true,
                pinTrue: true,
                pin: pin,
            });
        }
        else if(setPin === pin){
            console.log("thisone");
            this.setState({
                pinTrue: true
            });
        }
        else {
            alert("pin Incorrect");
        }






    }
}

export default Pin;