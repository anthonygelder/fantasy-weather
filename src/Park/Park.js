import React, {Component} from 'react'
import { Link } from 'react-router-dom'

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
        fetch(`http://api.weatherstack.com/current?access_key=11303f6cbfab1479a50aaffe71e8c663&query=${this.props.park.zip}&units=f`, {
            method: 'GET'                       
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({weather:data.current})
        })  
    }



    renderWeather() {
        const { weather } = this.state
        if(!weather) {
            return null
        } else  {
            return (
                <div className="weather">  
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
        if(this.props.saved) {
            return (
                <>
                    <div className="park">
                        <h2>{park.name}</h2>
                        <h2>{park.type}</h2>
                        {this.renderWeather()}
                        <Link to={{
                            pathname: `/park/${park.uid}`,
                            state: {
                                weather: this.state.weather
                            }
                        }}>
                            <button>
                                Details
                            </button>    
                        </Link>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="park" onClick={() => {this.props.selectPark(park)}}>
                        <h2>{park.name}</h2>
                        <h2>{park.designation}</h2>
                    </div>
                </>
            )
        }
    }
}

export default Game;