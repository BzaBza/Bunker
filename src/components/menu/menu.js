import React from 'react';
import {db} from "../../firebase";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Menu extends React.Component {

    componentDidMount() {
        this.getMarkers()
    }

    constructor(props) {
        super(props);
        this.state = {

            selectedSession: '',
            activeSessionName: '',

            thisPlayerName: '',
            selectedPlayer: '',
        };
    }


    async getMarkers() {
        db.collection("sessions")
            .onSnapshot((snapshot) => {
                //console.log(snapshot.docs.map(doc => doc.data()))

                this.setState(() => this.state.sessionList = snapshot.docs.map(doc => doc.data()))
            });

        db.collection("players")
            .onSnapshot((snapshot) => {
                //console.log(snapshot.docs.map(doc => doc.data()))

                this.setState(() => this.state.playersList = snapshot.docs.map(doc => doc.data()))
            });
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">BunkER</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="sessions">Sessions</Nav.Link>
                        <Nav.Link href="users">Users</Nav.Link>
                        <Nav.Link href="settings">Settings</Nav.Link>
                    </Nav>
                    <ul>
                        <li>Current session: <span>Session name</span></li>
                        <li>User name: <span>User name</span></li>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Menu;
