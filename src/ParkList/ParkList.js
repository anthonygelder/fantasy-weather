import React, {Component} from 'react'
import Park from '../Park/Park.js'
import {Link} from 'react-router-dom'
const { API_ENDPOINT } = require('../config')

class ParkList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            stateCode: '',
            parks: []
        }
    }

    renderParks() {
        const { parks } = this.state
        if (parks.length === 0) {
            return null
        } else {
            return (
                <>
                    {parks.map((park) => <Park park={park} key={park.id} saved={"saved"} />)}
                </>
            )
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        fetch(`${API_ENDPOINT}/getParks`, {
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({parks:data,loading:false})
        })
    }

    render() {
        return (
            <>
                <Link to='/addPark'>
                    <button style={{margin: "20px"}}>Add Park</button>    
                </Link>
                {this.state.loading ? <p>Getting saved parks...</p> : null}
                <div className="parks">
                    {this.renderParks()}
                </div>
            </>
        );
    }
}

export default ParkList;