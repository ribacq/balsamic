import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './feed-page.html';

Template.feedPage.helpers({
	error() {
		return FlowRouter.getRouteName() !== 'feedPage';
	}
});

