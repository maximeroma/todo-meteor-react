import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Tasks from './collection';



if(Meteor.isServer) {
    Meteor.publish('tasks', function taskPublication() {
        return Tasks.find({
            $or: [
                { private: { $ne : false } },
                { owner: this.userId },
            ]
        });
    });
}