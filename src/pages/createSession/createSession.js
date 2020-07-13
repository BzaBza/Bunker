import React from 'react';
import {db} from "../../firebase";

class CreateSession extends React.Component {

    componentDidMount() {
        this.getMarkers()
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedSession: '',
            activeSessionName: '',
            sessionList: [],
            dbActiveSession: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({selectedSession: event.target.value});
    }

    handleNameChange(event) {
        this.setState({selectedPlayer: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    createSession(data) {

        db.collection('sessions').doc(data).set({
            name: data,
            id: this.state.sessionList.length,
            state: "Waiting",
            players: []
        })
        console.log(this.state.sessionList.length);
        console.log("Started");
    }

    render() {
        return (
            <div>
                <h1>Create session</h1>
                <label>Session Name:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <div>
                    <button onClick={() => this.createSession(this.state.selectedSession)}>Create session</button>
                </div>
                <div>
                    <button onClick={() => this.connectToSession(this.state.selectedSession)}>Connect to session
                    </button>
                </div>
                <div>
                    <button onClick={() => this.leaveSession()}>Leave session</button>
                </div>
                <div>
                    <button onClick={() => this.deleteSession(this.state.selectedSession)}>Delete session</button>
                </div>
                <div>
                    <button onClick={() => this.deleteAllSessions()}>Clear Sessions</button>
                </div>
            </div>
        );
    }
}

export default CreateSession;
