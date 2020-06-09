import React, {Component} from 'react'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: {}
        }
    }
    
    componentDidMount() {
        this.getWeather()
    }

    getWeather() {
        fetch(`http://api.weatherstack.com/current?access_key=11303f6cbfab1479a50aaffe71e8c663&query=${this.props.park.addresses[0].postalCode}&units=f`, {
            method: 'GET'                       
        })
        .then(response => response.json())
        .then(data => {
            this.setState({weather:data.current})
        })  
    }

    render() {
        const { park } = this.props
        const temp = this.state.weather ? <p>Temp: {this.state.weather.temperature}</p> : ''
        return (
        <>
            <div className="park">
                <h2>{park.fullName}</h2>
                {temp}
            </div>
        </>
        );
    }
}

export default Game;