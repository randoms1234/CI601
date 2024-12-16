import React from 'react';
import App from './App';
import './App.css';

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
                <header className="App-header" id='pin'>
                    <h1>Hello!</h1>
                    <h2>Please enter a pin to get started</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Enter/create your Pin:
                        </label>
                        <br></br>
                        <input type='password' name='pin' id='pin' required/>
                        <input className='btn' type="submit" value="Submit"/>
                    </form>
                </header>
            </div>
        );
    }
    handleSubmit =(event)=> {
        event.preventDefault();
        let pin = document.querySelector('input[name="pin"]').value;
        const setPin = localStorage.getItem('pin')
        if (pin.length !== 4) {
            alert('Pin must be 4 digits long');
            return
        }
        if (!setPin){
            localStorage.setItem('pin', pin);
            this.setState({
                pinSet: true,
                pinTrue: true,
                pin: pin,
            });
        }
        else if(setPin === pin){
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