import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './user-edit-page.html';

Template.userEditPage.helpers({
	userId() {
		return FlowRouter.getParam('userId');
	}
});

