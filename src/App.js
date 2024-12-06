import React from "react";
import './App.css'
import Results from "./Results";

class App extends React.Component {
    render = () =>{
        return (
            <div>
                <header className="App-header">
                    <h1>Happy Thoughts</h1>

                <p>How are you Feeling today?</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="radio" value="Happy" id="Happy" name="mood"/>
                        Happy
                    </label>
                    <label>
                        <input type="radio" value="Ok" id="Ok" name="mood"/>
                        Ok
                    </label>
                    <label>
                        <input type="radio" value="Sad" id="Sad" name="mood"/>
                        Sad
                    </label>

                    <label>
                        Additional Info:
                        <input type="text" id="additionalInfo" name="additionalInfo"/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                </header>
                <Results state={this.state} />
            </div>
        );

    }

    constructor(props) {
        super(props);
        this.state ={
            query: '',
            loading: false,
            records: []

        };
    }
    handleSubmit = async (evt) => {
        evt.preventDefault();
        let mood = document.querySelector('input[name="mood"]:checked').value;
        let additionalInfo = document.querySelector('input[name="additionalInfo"]').value;

        if(mood.length > 0 && additionalInfo.length > 0) {
            this.setState({
                loading: true
            });
        }


        const url = 'https://api.openweathermap.org/data/3.0/onecall?lat=35&lon=145&appid=1988bc65fa708ceb2a9a23049f92ae92';
        try{
            const response = await fetch(url);
            const jsonData = await response.json();
            this.setState({
                loading: false,
                records: jsonData.records,
            });


            /*let formResponses = {
                mood: mood,
                additionalInfo: additionalInfo
            };

            //let json = JSON.stringify(formResponses);
            localStorage.setItem("formResponses", JSON.stringify(formResponses));
            //console.log(json);
            //console.log(jsonData);*/
        } catch(err){
            console.log(err);
            this.setState({
                loading: false,
                records: []
            });
        }
    }
}

export default App;
