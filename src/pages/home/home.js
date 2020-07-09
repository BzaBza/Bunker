import React from 'react';
import {db} from "../../firebase";

class Home extends React.Component {

    componentWillMount() {
    }

    constructor(props) {
        super(props);
        this.state = {sName: '',sessionList: ["List Item 1", "List Item 2", "List Item 3"]};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({sName: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    createSession(data) {

        db.collection('sessions').doc(data).set({
            name:data,
            id: this.state.sessionList.length,
            state: "Waiting",
            players: 0
        })
        console.log(this.state.sessionList.length)
        console.log("Started");
    }

    deleteSession(data){
        db.collection('sessions').doc(data).delete();
        console.log("Deleted");
    }

    async deleteAllSessions(){
        //this.getMarkers() ;
        for(const item of this.state.sessionList){
            console.log("Deleted",item)
            this.deleteSession(item);
        }

    }


    async getMarkers() {
        this.state.sessionList=[];
        let listItems=[]
        const events = await db.collection('sessions')
        events.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {

                return { id: doc.id, ...doc.data() }
            })
            for(const temp of tempDoc){
                this.state.sessionList.push(temp.name)
                console.log(temp.name)}
            console.log("this.state.sessionList ",this.state.sessionList)


        })
        return listItems;
    };




    render() {
        //console.log("this.state.sessionList ",this.state.sessionList)

        //this.getMarkers();

        return (
            <div>
                <h1>Hi, this is NOT bunker game ;)</h1>
                <label>Session Name:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <div><button onClick={()=>this.createSession(this.state.sName)}>Create session</button></div>
                <div><button onClick={()=>this.deleteSession(this.state.sName)}>End session</button></div>
                <div><button onClick={()=>this.getMarkers()}>List</button></div>
                <div><button onClick={()=>this.deleteAllSessions()}>Clear</button></div>

                <React.Fragment>
                    <ul className="list-group">
                        {this.state.sessionList.map(listitem => (
                            <li className="list-group-item list-group-item-primary">
                                {listitem}
                            </li>
                        ))}
                    </ul>
                </React.Fragment>

            </div>
        );
    }
}

export default Home;
