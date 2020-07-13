import React from 'react';
import {db} from "../../firebase";
import * as firebase from "firebase";

class Sessions extends React.Component {

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


    async getMarkers() {
        db.collection("sessions")
            .onSnapshot((snapshot) => {
                //console.log(snapshot.docs.map(doc => doc.data()))

                this.setState(() => this.state.sessionList = snapshot.docs.map(doc => doc.data()))
            });
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


    deleteSession(name) {
        db.collection('sessions').doc(name).delete();
        console.log("Deleted");
    }

    deleteAllSessions() {
        for (const item of this.state.sessionList) {
            this.deleteSession(item.name);
            console.log("All sessions deleted", item)
        }

    }

    connectToSession(sessionName) {
        this.leaveSession();
        this.state.dbActiveSession = db.collection('sessions').doc(sessionName);
        db.collection('sessions').doc(sessionName).update({
            players: firebase.firestore.FieldValue.arrayUnion(this.state.dbPlayer)
        })
        this.state.activeSessionName = sessionName;
        this.state.dbPlayer.update({inSession: this.state.dbActiveSession});
        console.log("Player ", this.state.selectedPlayer, " connected to ", sessionName, " session")
        console.log(this.state.dbActiveSession)
    };

    leaveSession() {
        if (this.state.dbActiveSession != null) {
            this.state.dbActiveSession.update({
                players: firebase.firestore.FieldValue.arrayRemove(this.state.dbPlayer),
            })

            this.state.dbPlayer.update({
                inSession: null
            })

            this.state.dbActiveSession = null;
        }
    }

    render() {
        return (
            <div>
                <h1>Sessions</h1>

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
                <label>Sessions:</label>
                <ul className="list-group">
                    {this.state.sessionList.map(listitem => (
                        <li className="list-group-item list-group-item-primary">
                            {listitem['name']}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Sessions;
