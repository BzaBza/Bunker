import React from 'react';
import {db} from "../../firebase";

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            selectedSession: '',
            activeSessionName: '',
            sessionList: [],
            dbActiveSession: null,

            thisPlayerName: '',
            selectedPlayer: '',
            playersList: [],
            dbPlayer: null

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

    setActivePlayer(name) {
        let tempRef = this.state;
        this.state.dbPlayer = db.collection('players').doc(name);
        this.state.dbPlayer.get().then(function (doc) {
            //console.log('then')
            tempRef.dbActiveSession = doc.data().inSession;
           // console.log(doc.data.inSession)
           // console.log("Name" ,doc.data().name)
        });

        if (this.state.dbActiveSession != null) {
           // console.log("not null", this.state.dbActiveSession)
            tempRef.dbActiveSession.get().then(function (doc) {
                tempRef.activeSessionName = doc.data().name;
            })
        }
        this.state.thisPlayerName = name;

    }

    createPlayer(name) {
        db.collection('players').doc(name).set({
            name: name,
            id: this.state.playersList.length,
            inSession: null,
            state: "Active",
        })
        //this.setActivePlayer(name);
        console.log(this.state.dbPlayer);
        console.log(this.state.playersList.length);
        console.log("New player ", name);
    }




    render() {
        return (
            <div>
                <h1>Settings</h1>

                <label>Player Name:</label>
                <input type="text" value={this.state.value} onChange={this.handleNameChange}/>
                <div>
                    <button onClick={() => this.createPlayer(this.state.selectedPlayer)}>Create player</button>
                </div>
                <div>
                    <button onClick={() => this.setActivePlayer(this.state.selectedPlayer)}>Set active player</button>
                </div>

            </div>
        );
    }
}

export default Settings;
