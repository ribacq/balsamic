import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './feed-page.html';

Template.feedPage.onCreated(function feedPageCreated() {
	this.autorun(() => {
		document.title = 'balsamic — feed';
	});
});

Template.feedPage.helpers({
	error() {
		return FlowRouter.getRouteName() !== 'feedPage';
	}
});

