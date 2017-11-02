import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './user-page.html';

Template.userPage.onCreated(function userCreated() {
	this.autorun(() => {
		document.title = 'balsamic — user';
	});
});

Template.userPage.helpers({
	userId() {
		return FlowRouter.getParam('userId');
	}
});

