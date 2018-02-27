import React, { Component } from 'react';


// import { Tasks } from '../api/tasks';

import Task from './Task';
import SignIn from './SignIn';
import LogIn from './Login'; 

export default class App extends Component {
    constructor(props) {
        super();
        this.state = {
            inputValue : "",
            hideCompleted: false,
        };
    }

    handleSubmit = ( event ) => {
        event.preventDefault();
        const {inputValue: text} = this.state;
        // Tasks.insert({
        //     inputValue,
        //     createdAt: new Date(),
        //     owner: Meteor.userId(),
        //     userName: Meteor.user().emails[0].address
        // });
        Meteor.call('tasks.insert', text);
        this.setState({inputValue: ''});
    }

    getTasks = () => {
        return this.props.tasks;
    }

    renderTasks = () => {
        let { tasks: filteredTasks } = this.props;
        const { currentUser } = this.props;
        const { hideCompleted } = this.state;
        if (hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map(task => {
            const currentUserId = currentUser && currentUser._id;
            const showPrivateButton = task.owner === currentUserId;
            console.log(task);
            return (
            <Task 
                key={task._id} 
                task={task}
                showPrivateButton={showPrivateButton} 
            />
        )});
    }

    handleInputChange = ({ currentTarget }) => {
        this.setState({ inputValue: currentTarget.value });
    };

    toggleHideCompleted = () => {
        this.setState({hideCompleted: !this.state.hideCompleted});
    }

    render() {
        const { 
            inputValue,
            hideCompleted 
        } = this.state;
        const { 
            incompleteCount, 
            currentUser
        } = this.props;
        return (
            <div className="container">
                <header>
                    <h1>ToDoList {incompleteCount}</h1>
                </header>
                <SignIn />
                <LogIn user={currentUser} />
                <label 
                    className="hide-completed"
                >
                    <input
                        type="checkbox"
                        defaultChecked={hideCompleted}
                        onClick={this.toggleHideCompleted}
                    />
                        Hide completed tasks
                </label>

                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        name="input"
                        className="form-group"
                        onChange={this.handleInputChange}
                    />
                    <button 
                        type="submit"
                        className="btn btn-secondary"
                    >
                        Envoyer
                    </button>
                </form>

                <ul
                    className="list-group list-group-flush"
                >
                    {this.renderTasks()}
                </ul>   
            </div>
        )
    }
}
