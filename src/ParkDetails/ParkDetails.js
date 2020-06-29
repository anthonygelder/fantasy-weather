import React, {Component} from 'react'
import {Link} from 'react-router-dom'
const { API_ENDPOINT } = require('../config')

class ParkDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            park: ''
        }
    }

    componentDidMount() {
        fetch(`${API_ENDPOINT}/getParkById?id=${this.props.routeProps.match.params.park_id}`)
            .then(response => response.json())
            .then((data) => {
                this.setState({park:data})
            })
    }
    
    deletePark = () => {
        fetch(`${API_ENDPOINT}/deletePark?id=${this.props.routeProps.match.params.park_id}`)
            .then(response => response.json())
            .then(() => {
                this.props.routeProps.history.push('/parks')
            })
    }

    renderWeather() {
        console.log(this.state.park)

        const {weather} = this.props.routeProps.location.state
        if(weather) {
            return (
                <>
                    <h3>Current Weather</h3>
                    <div className="weather" style={{flexDirection: "row"}}>  
                        <ul>
                            <li>Temp: {Math.floor(weather.main.temp)}&#8457;</li>
                            <li>Feels Like: {Math.floor(weather.main.feels_like)}&#8457;</li>
                            <li>{weather.weather[0].description}</li>
                            <li>Humidity: {weather.main.humidity}%</li>
                            <li>Wind: {Math.floor(weather.wind.speed)} mph</li>
                        </ul>
                    </div>
                </>
            )
        }
    }

    render() {
        const { park } = this.state
        console.log(park)
        return (
            <div className="parkDetails">
                <div className="container">
                    <img className="parkImg" src={park.img} alt={park.name}/>
                </div>
                <h2>{park.name}</h2>
                <h2>{park.type}</h2>
                <a href={`https://www.google.com/maps/search/?api=1&query=${park.name}`} target="_blank" rel="noopener noreferrer">Map</a>
                <a href={`${park.url}`} target="_blank" rel="noopener noreferrer">NPS Website</a>
                <p>{park.description}</p>
                {this.renderWeather()}
                <div>
                    <Link to="/parks">
                        <button>Back</button>    
                    </Link>
                    <button onClick={this.deletePark}>Delete</button>
                </div>
            </div>
        );
    }
}

export default ParkDetails;