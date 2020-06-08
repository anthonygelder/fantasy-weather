import React, {Component} from 'react'
import Park from '../Park/Park.js'

class ParkList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parks: []
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('https://developer.nps.gov/api/v1/parks?stateCode=WA&limit=10&api_key=KOz6osfxerUU9Zy8fre56gMy4fFVTcnQbkRcaIhm', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({parks:data.data})
            })
    }

    renderParks() {
        const { parks } = this.state
        if (parks.length === 0) {
            return null
        } else {
            return (
                <>
                    {parks.map((park) => <Park park={park} key={park.id} />)}
                </>
            )
        }
    }

    render() {
        return (
        <>
        <form onSubmit={e => this.handleSubmit(e)}>
            <button type="submit">Click</button>
        </form>
        {this.renderParks()}
        </>
        );
    }
}

export default ParkList;