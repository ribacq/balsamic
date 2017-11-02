import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './read-page.html';

Template.readPage.onCreated(function readPageCreated() {
	this.autorun(() => {
		document.title = 'balsamic — read';
	});
});

Template.readPage.helpers({
	articleId() {
		return FlowRouter.getParam('articleId');
	}
});

