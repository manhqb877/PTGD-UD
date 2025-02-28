import React from "react";

class AddComponent extends React.Component{
    state = {
        title : '',
        salary : '',
    }

    handleonchangeName= (envent) => {
        this.setState({
            title : event.target.value
        })
   }

   handleonchangeAge= (envent) => {
       this.setState({
        salary : event.target.value
       })
  }

  onClickButton = (envent)=>{
        event.preventDefault();

        if(!this.state.title || !this.state.salary ){
            alert("Check input miss")
            return
        }
        // console.log("Check data input : ", this.state);
        this.props.addNewJob({
            id : Math.floor(Math.random() * 101),
            title : this.state.title,
            salary: this.state.salary
        })

        this.setState({
            title :'',
            salary : ''
        })
  }

    render(){
        return(
            <>
                <label htmlFor="ten"> Title</label> <br />
                <input type="text" onChange= {(event) => this.handleonchangeName(event)}/> <br />
                <label htmlFor="tuoi"> salary</label> <br />
                <input type="text" onChange= {(event) => this.handleonchangeAge(event)}/> <br />
                <button onClick={(envent) => this.onClickButton(envent)}>Click on</button> <br />
            </>
        )
    }
}
export default AddComponent