import React from 'react';
import {db} from "../../firebase";

class Home extends React.Component {

    componentWillMount() {
    }

    createSession(data) {
        db.collection('sessions').add({id: data})
    }

    render() {
        return (
            <div>
                <h1>Hi, this is NOT bunker game ;)</h1>
                <div><button onClick={this.createSession('zal upa')}>Generate card</button></div>
            </div>
        );
    }
}

export default Home;
