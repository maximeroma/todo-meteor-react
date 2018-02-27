import Tasks from '../db/tasks/collection';


export default class TasksService {
    static insertTask(text, userId) {
        return Tasks.insert({
            text,
            createdAt: new Date(),
            owner: userId,
            userName: Meteor.users.findOne(userId).emails[0].address
        });
    }

    static removeTask(taskId) {
        Tasks.remove(taskId);
    }

    static setCheckedTask(taskId, setChecked) {
        Tasks.update(taskId, { $set: { checked: setChecked } });
    }

    static setPrivateTask(taskId, setPrivate) {
        Tasks.update(taskId, { $set: { private: setPrivate } });
    }
}
