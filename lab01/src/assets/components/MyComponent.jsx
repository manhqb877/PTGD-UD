import React from "react";
import ChildComponent from "./ChildComponent";
import AddComponent from "./AddComponent";

class MyComponent extends React.Component{
    state = {
        arrJobs : [
            {'id' : '1', 'title' : 'Developers', 'salary' : '500' },
            {'id' : '2', 'title' : 'Testers', 'salary' : '400' }, 
            {'id' : '3', 'title' : 'Project managers', 'salary' : '1000' }
        ]
    }
    
    addNewJob = (job) =>{
        console.log(this.state)
        this.setState({
            arrJobs : [...this.state.arrJobs, job]
        })
    }

    render(){
        return(
            <div>
                <p>Hoang Nguyen Duc Manh</p>
                <AddComponent addNewJob = {this.addNewJob}/>
                <ChildComponent  arrJobs = {this.state.arrJobs}/>
            </div>
        )
    }
}
export default MyComponent