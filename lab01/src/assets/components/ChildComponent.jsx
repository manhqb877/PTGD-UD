import React from "react";

class ChildComponent extends React.Component {
    state = {
        showJobs: false
    }

    handleonClickStatus = () => {
        this.setState({
            showJobs: !this.state.showJobs
        })
    }

    render() {
        let {arrJobs } = this.props;
        let { showJobs } = this.state;
        return (
            <>
                {showJobs === false ?
                    <div>
                        <button onClick={() => this.handleonClickStatus()}> Show</button>
                    </div>
                    :
                    <>

                        <div className="job-lists">
                            {
                                arrJobs.map((item, index) => {
                                    return (
                                        <div key={item.id}>
                                            {item.title} - {item.salary} $
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <button onClick={() => this.handleonClickStatus()}>Hide</button>
                        </div>
                    </>
                }
            </>
        )

    }
}
export default ChildComponent