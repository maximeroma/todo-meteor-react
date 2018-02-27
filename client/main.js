import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';


import AppContainer from '../imports/ui/container/AppContainer';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

Meteor.startup(() => {
  render(<AppContainer />, document.getElementById('app'));
});
