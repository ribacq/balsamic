import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './user-page.html';

Template.userPage.helpers({
	userId() {
		return FlowRouter.getParam('userId');
	}
});

