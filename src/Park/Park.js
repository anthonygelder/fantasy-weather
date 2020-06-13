import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: '',
            park: this.props.park
        }
    }
    
    componentDidMount() {
        this.getWeather()
    }

    getWeather() {
        fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.props.park.zip}&units=imperial&appid=2d0ab90589e7e09272277f79be9bfa53`, {
            method: 'GET'                       
        })
        .then(response => response.json())
        .then(data => {
            this.setState({weather:data})
        })  
    }

    renderWeather() {
        const { weather } = this.state
        if(weather) {
            return (
                <div className="weather">  
                    <h4>Current weather</h4>
                    <ul>
                        <li>Temp: {Math.floor(weather.main.temp)}&#8457;</li>
                        <li>{weather.weather[0].description}</li>
                        <li>Wind: {Math.floor(weather.wind.speed)} mph</li>
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
                        <div className="container">
                            <img className="parkImg" src={park.img} alt={park.name}/>
                        </div>
                        <h3>{park.name}</h3>
                        <h3>{park.type}</h3>
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
                    <div className="park parkHov" onClick={() => {this.props.selectPark(park)}}>
                        <div className="container">
                            <img className="parkImg" src={park.images[0].url} alt={park.name}/>
                        </div>
                        <h3>{park.name}</h3>
                        <h3>{park.designation}</h3>
                    </div>
                </>
            )
        }
    }
}

export default Game;