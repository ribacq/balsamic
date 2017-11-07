import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './article-edit-page.html';
import '../components/article-edit-component';

Template.articleEditPage.onCreated(function articleEditPageCreated() {
	this.autorun(() => {
		document.title = 'balsamic — article-edit';
	});
});

Template.articleEditPage.helpers({
	isNewArticle() {
		return FlowRouter.getParam('articleId') == 0;
	},
	_id() {
		return FlowRouter.getParam('articleId');
	},
});

