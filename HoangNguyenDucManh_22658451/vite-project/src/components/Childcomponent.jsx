import React from "react";

class Childcomponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: "abc", //giá trị mặc định
    };
  }

  handleOnchangeInput = (event) => {
    this.setState({
      Name: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddnewUser({
      id: Math.floor(Math.random() * 100 + 1) + "user",
      Name: this.state.Name,
      Age: this.state.Age,
    });
  };
  render() {
    return (
      <form action="" onSubmit={(event) => this.handleOnSubmit(event)}>
        <input
          type="text"
          value={this.state.Name}
          onChange={(event) => this.handleOnchangeInput(event)}
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default Childcomponent;
