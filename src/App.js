import React from "react";
import './App.css'
import Results from "./Results.js";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            name: '',
            weather: [],
            temp: '',
            mood: this.mood,
            additionalInfo: this.additionalInfo

        };
    }
    render = () =>{
        return (
            <div>
                <header className="App-header">

                    <h1>Happy Thoughts</h1>

                <p>How are you Feeling today?</p>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input type="radio" value="Happy" id="Happy" name="mood" required/>
                            Happy
                        </label>
                        <label>
                            <input type="radio" value="Ok" id="Ok" name="mood" required/>
                            Ok
                        </label>
                        <label>
                            <input type="radio" value="Sad" id="Sad" name="mood" required/>
                            Sad
                        </label>
                        <label>  Additional Info:
                            <input type="text" id="additionalInfo" name="additionalInfo" required/>

                        </label>
                        <input className='btn' type="submit" value="Submit"/>
                    </form>

                </header>
                <Results state={this.state} />

            </div>
        );

    }


    handleSubmit = async (evt) => {

        evt.preventDefault();
        let mood = document.querySelector('input[name="mood"]:checked').value;
        let additionalInfo = document.querySelector('input[name="additionalInfo"]').value;
        this.setState({
            mood: mood,
            additionalInfo: additionalInfo
        });
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=40305c228a4b170bbb1f1c17d8dd3cf3';
        try{
            const response = await fetch(url);
            const jsonData = await response.json();
            this.setState({
                name: jsonData.name,
                weather: jsonData.weather,
                temp: jsonData.main.temp,
            });
        } catch(err){
            console.log(err);
            this.setState({
                name:'',
                weather: [],
                temp: ''
            });
        }
    }
}

export default App;


