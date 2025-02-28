import React from "react";

class MyComponent extends React.Component {
  state = {
    invest: '',
    rate: '',
    goal: '',
    showTable: false, // Thêm trạng thái để điều khiển việc hiển thị bảng
  };

  handleonchangeInvest = (event) => {
    this.setState({
      invest: event.target.value,
    });
  };

  handleonchangeRate = (event) => {
    this.setState({
      rate: event.target.value,
    });
  };

  handleonchangeGoal = (event) => {
    this.setState({
      goal: event.target.value,
    });
  };

  handleonchangeClick = () => {
    // Chuyển đổi trạng thái showTable thành true khi nhấn nút
    this.setState({
      showTable: true,
    });
  };

  renderTable = () => {
    const tableRows = [];
    const { invest, rate, goal } = this.state;
    let years = new Date().getFullYear();
    let money = parseFloat(invest);
    let endMoney = money;
    
    // Tính toán số năm cần thiết để đạt được mục tiêu
    let i = 1;
    while (endMoney < goal) {
        
        tableRows.push(
            <tr key={i}>
              <td>{years}</td>
              <td>{endMoney}</td>
              <td>{rate}%</td>
              <td>{endMoney}</td>
            </tr>
          );
      i++;
      endMoney += endMoney * (parseFloat(rate) / 100);
      years++;
    }

    // Tạo dữ liệu cho bảng
    
    // for (let i = years; i <= years; i++) {
      
    // }

    return (
      <table border="1">
        <thead>
          <tr>
            <th>Year</th>
            <th>Money</th>
            <th>Rate</th>
            <th>End Year</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  };

  render() {
    return (
      <>
        <h1>
          <label htmlFor="">Input Your Invest Money</label>
          <input
            onChange={(event) => this.handleonchangeInvest(event)}
            type="text"
          />
        </h1>
        <br />
        <h2>
          <label htmlFor="">Input Rate</label>
          <input
            onChange={(event) => this.handleonchangeRate(event)}
            type="text"
          />
        </h2>
        <br />
        <h3>
          <label htmlFor="">Input Your Goal</label>
          <input
            onChange={(event) => this.handleonchangeGoal(event)}
            type="text"
          />
        </h3>
        <br />
        <h4>
          <button onClick={this.handleonchangeClick}>Click</button>
        </h4>
        {this.state.showTable && this.renderTable()} {/* Hiển thị bảng nếu showTable là true */}
      </>
    );
  }
}

export default MyComponent;
