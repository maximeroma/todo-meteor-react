import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import TasksService from './service';
import Security from './security';
import Tasks from '../db/tasks/collection';


Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);
        Security.checkLoggedIn(this.userId);
        TasksService.insertTask(text, this.userId);
    },
    'tasks.remove'(taskId) {
        check(taskId, String);
        Security.isAllowed(this.userId, taskId);
        TasksService.removeTask(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        Security.isAllowed(this.userId, taskId);
        TasksService.setCheckedTask(taskId, setChecked);
    },
    'tasks.setPrivate'(taskId, setToPrivate){
        check(taskId, String);
        check(setToPrivate, Boolean);
        Security.isOwner(this.userId, taskId);
        TasksService.setPrivateTask(taskId, setToPrivate);
    }
});

