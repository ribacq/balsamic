import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Articles } from '/imports/api/articles/articles';

import './read-page.html';
import '../components/article-meta-component';
import '../components/article-body-component';

Template.readPage.onCreated(function readPageCreated() {
	this.getArticleId = () => FlowRouter.getParam('articleId');

	this.autorun(() => {
		document.title = 'balsamic — read';

		this.subscribe('articles.one', this.getArticleId());
	});
});

Template.readPage.helpers({
	article() {
		return  Articles.findOne({ _id: FlowRouter.getParam('articleId') });
	},
});

