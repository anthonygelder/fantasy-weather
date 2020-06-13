import React, {Component} from 'react'
import Park from '../Park/Park.js'
import {Link} from 'react-router-dom'

class ParkList extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        fetch(`http://localhost:5001/parks-d8e0a/us-central1/getParks`, {
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({parks:data})
        })
    }

    render() {
        return (
            <>
                <Link to='/addPark'>
                    <button style={{margin: "10px"}}>
                        Add Park
                    </button>    
                </Link>
                <div className="parks">
                    {this.renderParks()}
                </div>
            </>
        );
    }
}

export default ParkList;