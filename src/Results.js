import React from 'react';
class Results extends React.Component {
    render = () => {

        const name = this.props.state.name;
        const temp = this.props.state.temp;
        const weather = this.props.state.weather;


        const resultItems = weather.map((item, index) => {
            const mainWeather = (item.description);
            return(
                <div key={index.toString()} className='item'>
                    <div className='weather-item'>
                        <p>Location: {name}</p>
                        <p>{temp}</p>
                        <p>{mainWeather}</p>
                    </div>
                </div>
            )
        });
        return <div>{resultItems}</div>;
    }
}
export default Results;

