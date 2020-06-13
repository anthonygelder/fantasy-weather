import React, {Component} from 'react'
import Park from '../Park/Park.js'
import {Link} from 'react-router-dom'
const { API_ENDPOINT } = require('../config')

class ParkList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            laoding: false,
            stateCode: '',
            parks: '',
            park: {
                id: '',
                name: '',
                type: '',
                zip: '',
                lat: '',
                lng: '',
                description: '',
                img: ''
            }
        }
    }

    onStateChanged(state){
        this.setState({stateCode: state})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.searchParks()
    }


    searchParks() {
        this.setState({ loading: true })
        fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${this.state.stateCode}&api_key=${process.env.REACT_APP_PARKS_API_KEY}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            this.setState({parks:data.data,loading:false})
        })
    }

    addPark = (park) => {
        fetch(`${API_ENDPOINT}/addPark?name=${this.state.park.name}&type=${this.state.park.type}&id=${this.state.park.id}&zip=${this.state.park.zip}&lat=${this.state.park.lat}&lng=${this.state.park.lng}&description=${this.state.park.description}&img=${this.state.park.img}`)
        .then(response => response.json())
        .then(res => {
            this.props.routeProps.history.push('/parks')
        })  
    }

    renderParks() {
        const { parks } = this.state
        if (parks.length === 0) {
            return null
        } else {
            return (
                <>  
                    {parks.map((park) => <Park park={park} key={park.id} selectPark={this.selectPark}/>)}
                </>
            )
        }
    }


    selectPark = (park) => {
        this.setState({ 
            parks: '',
            park: {
                id: park.id,
                name: park.name,
                type: park.designation,
                zip: park.addresses[0].postalCode,
                lat: park.latitude,
                lng: park.longitude,
                description: park.description,
                img: park.images[0].url 
            }
        })
      }

    render() {
        return (
            <>  
                <Link to="/parks">
                    <button style={{margin: "20px"}}>Back</button>    
                </Link>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h2>Select State</h2>
                    <div>
                        <select required onChange={e => this.onStateChanged(e.target.value)}>
                            <option value="" disabled defaultValue>State</option>
                            <option value="AL">AL</option>
                            <option value="AK">AK</option>
                            <option value="AR">AR</option>	
                            <option value="AZ">AZ</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DC">DC</option>
                            <option value="DE">DE</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="IA">IA</option>	
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="MA">MA</option>
                            <option value="MD">MD</option>
                            <option value="ME">ME</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MO">MO</option>	
                            <option value="MS">MS</option>
                            <option value="MT">MT</option>
                            <option value="NC">NC</option>	
                            <option value="NE">NE</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>			
                            <option value="NV">NV</option>
                            <option value="NY">NY</option>
                            <option value="ND">ND</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VT">VT</option>
                            <option value="VA">VA</option>
                            <option value="WA">WA</option>
                            <option value="WI">WI</option>	
                            <option value="WV">WV</option>
                            <option value="WY">WY</option>
                        </select>	
                        <button type="submit">Search</button>
                    </div>
                    {this.state.loading ? <p>Getting parks...</p> : null}
                    {this.state.parks ? <p>Click park to select</p> : null}
                </form>
                <div className="parks">
                    {this.renderParks()}
                </div>
                {this.state.park.id ? 
                <>
                    <p><b>{this.state.park.name}</b></p>
                    <button onClick={this.addPark}>Add</button>
                </> : null}
            </>
        );
    }
}

export default ParkList;