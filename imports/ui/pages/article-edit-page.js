import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Articles } from '/imports/api/articles/articles';

import './article-edit-page.html';
import '../components/article-edit-component';

Template.articleEditPage.onCreated(function articleEditPageCreated() {
	this.getArticleId = () => FlowRouter.getParam('articleId');

	this.autorun(() => {
		document.title = 'balsamic — article-edit';

		this.subscribe('articles.one', this.getArticleId());
	});
});

Template.articleEditPage.helpers({
	article() {
		return Articles.findOne({ _id: FlowRouter.getParam('articleId') });
	},
});

