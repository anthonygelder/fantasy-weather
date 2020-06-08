import React, {Component} from 'react'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // zip: ''
        }
    }
    
    componentDidMount() {
        // this.setState({zip:this.props.park.addresses[0].postalCode})
        this.getWeather()
    }

    getWeather() {
        fetch(`http://api.weatherstack.com/current?access_key=11303f6cbfab1479a50aaffe71e8c663&query=${this.props.park.addresses[0].postalCode}`, {
            method: 'GET'                       
        })
        // .then(response => console.log(response))
        .then(response => response.json())
        .then(data => {
            console.log('data',data)
        })  
    }

    render() {
        // console.log(this.state.zip)

        return (
        <>
            <div className="park">
                game
            </div>
        </>
        );
    }
}

export default Game;