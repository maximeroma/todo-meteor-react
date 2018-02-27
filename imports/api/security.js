import { Meteor } from 'meteor/meteor';
import Tasks from '../db/tasks/collection';

export default class Security {
    static checkLoggedIn(userId) {
        if(!userId) {
            throw new Meteor.Error('not-authorized');
        }
    }
    static isAllowed(userId, taskId) {
        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== userId ) {
            throw new Meteor.Error('not-authorized');
        }
    }

    static isOwner(userId, taskId) {
        const task = Tasks.findOne(taskId);
        if(task.owner !== userId) {
            throw new Meteor.Error('not-authorized');
        }
    }
}