import React, { Component } from 'react';


export default class LogIn extends Component {
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
            emailValue: email,
            passwordValue: password
        } = this.state;
        Meteor.loginWithPassword({
            email
        },
            password
        , (error) => {
            if (error) console.log(error.reason);
        });
    }

    logout = () => {
        Meteor.logout();
    }

    render() {
        const { 
            emailValue,
            passwordValue 
        } = this.state;
        const { user } = this.props;
        console.log(user);
        return !(!!user) ?  (
                <div className="row">
                    <h1> LogIn </h1>
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
                                onChange={this.changeValue}
                                className="form-control"
                            />
                        </div>
                        <button 
                            type="submit"
                            className="btn btn-primary btn-lg btn-block"
                        > 
                            Login 
                        </button>
                    </form>
                </div>
                )
            :
            (
            <button 
                onClick={this.logout}
            > 
                logout
            </button>
        )
    }
}