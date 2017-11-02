import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './user-edit-page.html';

Template.userEditPage.onCreated(function userEditCreated() {
	this.autorun(() => {
		document.title = 'balsamic — user-edit';
	});
});

Template.userEditPage.helpers({
	userId() {
		return FlowRouter.getParam('userId');
	}
});

