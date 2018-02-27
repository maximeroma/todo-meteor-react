import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';


export default class SignIn extends Component {
    constructor(props) {
        super();
        this.state = {
            emailValue: '',
            passwordValue: '',
        }
    }

    changeValue = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {
            emailValue,
            passwordValue
        } = this.state;
        const success = Accounts.createUser({
            email: emailValue,
            password: passwordValue
        }, (error) => {
            if (error) return error.reason;
        });
        console.log(success);
    }

    render() {
        const { 
            emailValue,
            passwordValue 
        } = this.state;
        return (
            <div className="row">
                <h1> SignIn </h1>
                <form 
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
                        <input 
                            type="email"
                            name="emailValue"
                            value={emailValue}
                            className="form-control"
                            onChange={this.changeValue}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password"
                            value={passwordValue}
                            name="passwordValue"
                            className="form-control"
                            onChange={this.changeValue}
                        />
                    </div>
                    <button 
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                    > 
                        SignIn 
                    </button>
                </form>
            </div>
        )
    }
}