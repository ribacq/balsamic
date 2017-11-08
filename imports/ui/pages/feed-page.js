import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Articles } from '/imports/api/articles/articles';

import './feed-page.html';
import '../components/article-short-component';

Template.feedPage.onCreated(function feedPageCreated() {
	this.autorun(() => {
		document.title = 'balsamic — feed';

		this.subscribe('articles');
	});
});

Template.feedPage.helpers({
	error() {
		return FlowRouter.getRouteName() !== 'feedPage';
	},
	articles() {
		return Articles.find();
	},
});

