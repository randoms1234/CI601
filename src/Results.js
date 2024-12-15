import React from 'react';
import CyrptoJS from "crypto-js";
const pin = localStorage.getItem("pin");
class Results extends React.Component {
    constructor(props){
        super(props);
        this.shareEntry = this.shareEntry.bind(this);
    }

    shareEntry = async (event) =>{
        const key = event.target.id;
        const value = [deCrypt(localStorage.getItem(key), 1)];
        const blob = new Blob(value, {type: 'application/json'});
        const file = new File([blob],  key+".json");
        if(!navigator.canShare){
            console.log("browser is not supported");
            return
        }
        else{
            await navigator.share({
                title:key,
                text:value
            })
        }
        if(navigator.canShare(file)){
            try{
                await navigator.share({
                    files:[file],
                    title:key,
                });

            }catch (error){
                console.log(error);
            }
        }


    }
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
            let cipherJson = CyrptoJS.AES.encrypt(JSON.stringify(formResponse), pin).toString()
            localStorage.setItem(formattedDate+' '+time, cipherJson);
            //localStorage.setItem(formattedDate+' '+time, JSON.stringify(formResponse));
            //localStorage.clear();
            return(
                <div key={index.toString()} className='item'>
                        <p>The current date and time is: {formattedDate}, {time}</p>
                        <p>Location: {name}</p>
                        <p>Temperature: {temp}C</p>
                        <p>{mainWeather}</p>
                    <div className='past-entries'>
                        <ul id='datalist'>{getData(this.shareEntry)}</ul>
                    </div>
                </div>


            )

        });
        return <div>{resultItems}</div>;
    }
}

function getData(callback){
    let results = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const encyptedvalue = localStorage.getItem(key);
        if (key === 'pin'){
            continue;
        }
        const value = deCrypt(encyptedvalue, 0)

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
                    <button onClick={callback} id={key} type='button'>Share</button>

                </ul>
            </li>
        );
    }
    return results;
}

function deCrypt(data,jsonify){

    const bytes = CyrptoJS.AES.decrypt(data, pin);
    const ogData = bytes.toString(CyrptoJS.enc.Utf8);
    if(jsonify){
        return ogData;
    }
    return JSON.parse(ogData);
}
export default Results;

