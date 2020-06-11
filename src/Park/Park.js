import React, {Component} from 'react'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: {},
            park: this.props.park
        }
    }
    
    componentDidMount() {
        this.getWeather()
    }

    getWeather() {
        // console.log(this.park.props)
        fetch(`http://api.weatherstack.com/current?access_key=11303f6cbfab1479a50aaffe71e8c663&query=${this.props.park.addresses[0].postalCode}&units=f`, {
            method: 'GET'                       
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({weather:data.current})
        })  
    }

    addPark = () => {
        
        fetch(`https://us-central1-parks-d8e0a.cloudfunctions.net/addPark?name=${this.state.park.name}&type=${this.state.park.designation}`, {
            // method: 'GET',
            // headers: {
            //     'Access-Control-Allow-Origin': '*'
            // }                       
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            // this.setState({weather:data.current})
        })  
    }

    renderWeather() {
        const { weather } = this.state
        if(!weather) {
            return null
        } else  {
            return (
                <div className="weather">  
                    <img src={'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png'} alt="boohoo"/>
                    <ul>
                        <li>Temp: {weather.temperature}&#8457;</li>
                        <li>{weather.weather_descriptions}</li>
                        <li>Wind: {weather.wind_speed} mph</li>
                    </ul>
                </div>
            )
        }
    }

    render() {
        const { park } = this.props
        return (
        <>
            <div className="park">
                <h2>{park.name}</h2>
                <h2>{park.designation}</h2>
                {this.renderWeather()}
                <button onClick={this.addPark}></button>
            </div>
        </>
        );
    }
}

export default Game;