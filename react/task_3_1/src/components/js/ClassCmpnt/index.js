import React, { Component } from "react";
import "../../../assets/css/App.css";

class ClassCmpnt extends Component {
    state = {
        counter: 0,
    };

    plusBtn = () => {
        this.setState(prevState => {
            return {
                counter: prevState.counter + 1
            };
          });
    }

    minusBtn = () => {
        this.setState(prevState => {
            return {
                counter: prevState.counter - 1
            };
          });
    }

    render() {
        return (
            <div className="wrapper">
                <p>Class: </p>
                <button className="button pls"
                    onClick={this.plusBtn}>plus</button>
                <span className="counterOutput">
                    {this.state.counter}
                </span>
                <button className="button mns"
                    onClick={this.minusBtn}>minus</button>
            </div>
        )
    }
}

export default ClassCmpnt