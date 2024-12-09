import React from 'react';
class Results extends React.Component {
    render = () => {

        const name = this.props.state.name;
        const temp = this.props.state.temp;
        const weather = this.props.state.weather;
        const mood = this.props.state.mood;
        const additionalInfo = this.props.state.additionalInfo;
        const date = new Date();
        const time = date.toLocaleTimeString();
        const formattedDate = new Intl.DateTimeFormat('en-GB',{
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);
        const resultItems = weather.map((item, index) => {
            const mainWeather = (item.description);
            const formResponse = {
                location: name,
                weather: weather.description,
                temp: temp,
                mood: mood,
                additionalInfo: additionalInfo,
                date: formattedDate
            }
            localStorage.setItem(formattedDate+' '+time, JSON.stringify(formResponse));
            //localStorage.clear();
            return(
                <div key={index.toString()} className='item'>
                        <p>The current date and time is: {formattedDate}, {time}</p>
                        <p>Location: {name}</p>
                        <p>Temperature: {temp}C</p>
                        <p>{mainWeather}</p>
                    <div className='past-entries'>
                        <ul id='datalist'>{getData()}</ul>
                    </div>
                </div>


            )

        });
        return <div>{resultItems}</div>;
    }
}

function getData(){
    let results = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));

        const location = value.location;
        const temp = value.temp;
        const mood = value.mood;
        const additionalInfo = value.additionalInfo;
        const date = value.date;

        results.push(
            <li>
                <ul id='list-entry'>
                    <li>Location: {location}</li>
                    <li>Temp: {temp}</li>
                    <li>Mood: {mood}</li>
                    <li>Additional Info: {additionalInfo}</li>
                    <li>Date: {date} Time:{key}</li>

                </ul>
            </li>
        );
    }
    return results;
}
export default Results;

