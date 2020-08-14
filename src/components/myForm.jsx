import React, { Component } from 'react'

class MyForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            pass: ""
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }


    changeState = data => {
        this.setState({ email: data.target.value });
        this.setState({ pass: data.target.value });
    }

    printlog = () => {
        console.log(this.state.email);
        console.log(this.state.pass);
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <label htmlFor="email">Enter your email</label>
                <input id="email" name="email" type="email" value={this.state.email} onChange={this.changeState} />

                <label htmlFor="password">Enter password</label>
                <input id="password" name="password" value={this.state.pass} type="text" onChange={this.changeState} />

                <button onClick={this.printlog}>Send data!</button>
            </form>
        );
    }
}
export default MyForm;





