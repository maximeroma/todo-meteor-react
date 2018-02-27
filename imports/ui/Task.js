import React, { Component } from 'react';

import classnames from 'classnames';

export default class Task extends Component {

    toggleChecked = () => {
        const { task } = this.props;
        // Tasks.update(task._id, {
        //     $set: { checked: !task.checked },
        // });
        Meteor.call('tasks.setChecked', task._id, !task.checked);
    }

    togglePrivate = () => {
        const { task } = this.props;
        Meteor.call('tasks.setPrivate', task._id, !task.private);
    }

    deleteTask = () => {
        const { task } = this.props;
        // Tasks.remove(task._id);
        Meteor.call('tasks.remove', task._id);
    }

    render() {
        const { 
            task,
            showPrivateButton 
        } = this.props;
        const taskClassName = classnames({
            checked: task.checked,
            private: !task.private
        });
        return (
            <li
                className={`list-group-item ${taskClassName}`}
            > 
            <div className="row">
                <div
                    className="col-sm"
                >
                    <strong>
                        {task.userName}
                    </strong>
                    <input
                        type="checkbox"
                        defaultChecked={!!task.checked}
                        // className="form-control"
                        onClick={this.toggleChecked}
                    />
                </div>
                <div
                    className="col-sm"
                >
                    { showPrivateButton ? (
                        <button 
                            className='toggle-private btn btn-secondary'
                            onClick={this.togglePrivate}
                        >
                            {!task.private ? 'Public' : 'Private'}
                        </button>
                    ) : '' }
                    <span
                        className='text'
                    >
                        {task.text}
                    </span> 
                </div>
                <div
                    className="col-sm"
                >
                    <button 
                        className="btn btn-danger"
                        onClick={this.deleteTask}
                    >
                        Supprimer
                    </button>
                    </div>
                </div>
            </li>
        )
    }
}