import React, {Component} from 'react'

class ParkDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            park: '',
            weather: this.props.routeProps.location.state
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5001/parks-d8e0a/us-central1/getParkById?id=${this.props.routeProps.match.params.park_id}`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                this.setState({park:data})
            })
    }
    
    deletePark = () => {
        fetch(`http://localhost:5001/parks-d8e0a/us-central1/deletePark?id=${this.props.routeProps.match.params.park_id}`)
        .then(response => response.json())
        .then((data) => {
            this.props.routeProps.history.push('/')

        })
    }

    render() {
        const { park } = this.state
        const { weather } = this.state
        
        return (
            <>
                <h2>{park.name}</h2>
                <h2>{park.type}</h2>
                <img src={park.img} alt={park.name}/>
                <p>{park.description}</p>
                {this.state.weather ? <ul>
                    <li>Current Weather:</li>
                    <li>Temp: {weather.temperature}&#8457;</li>
                    <li>{weather.weather_descriptions}</li>
                    <li>Wind: {weather.wind_speed} mph</li>
                </ul> : ''}
                <button onClick={this.deletePark}>delete</button>
            </>
        );
    }
}

export default ParkDetails;