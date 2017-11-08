import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Articles } from '/imports/api/articles/articles';
import { Categories } from '/imports/api/categories/categories';
import { Series } from '/imports/api/series/series';
import { Tags } from '/imports/api/tags/tags';

import './article-edit-component.html';

Template.articleEditComponent.onCreated(function articleEditComponentCreated() {
	this.getArticleId = () => Template.instance().data.articleId;

	this.autorun(() => {
		this.subscribe('articles.one', this.getArticleId());
		this.subscribe('categories');
		this.subscribe('series');
		this.subscribe('tags');
	});
});

Template.articleEditComponent.helpers({
	article() {
		return Articles.findOne({ _id: Template.instance().data.articleId });
	},
	categories() {
		return Categories.find();
	},
	series() {
		return Series.find();
	},
	tags() {
		return Tags.find();
	},
	selectedCategory(categoryId) {
		if ((Template.instance().data.articleId !== undefined) && (categoryId === Articles.findOne({ _id: Template.instance().data.articleId }).category)) {
			return 'selected';
		}
		return '';
	},
	selectedSeries(seriesId) {
		if ((Template.instance().data.articleId !== undefined) && (seriesId === Articles.findOne({ _id: Template.instance().data.articleId }).series)) {
			return 'selected';
		}
		return '';
	},
	checkedTag(tagId) {
		if ((Template.instance().data.articleId !== undefined) && (Articles.findOne({ _id: Template.instance().data.articleId }).tags.indexOf(tagId) !== -1)) {
			return 'checked';
		}
		return '';
	},
	isListedChecked() {
		if (Template.instance().data.articleId !== undefined) {
			return (Articles.findOne({ _id: Template.instance().data.articleId }).isListed) ? 'checked' : '';
		}
		return 'checked';
	},
	isDraftChecked() {
		if (Template.instance().data.articleId !== undefined) {
			return (Articles.findOne({ _id: Template.instance().data.articleId }).isDraft) ? 'checked' : '';
		}
		return '';
	},
	isEdition() {
		return Template.instance().data.articleId !== undefined;
	},
});

Template.articleEditComponent.events({
	'submit .article-form'(event, instance) {
		event.preventDefault();

		// get article data from form
		let formData = {
			title: event.target['article-form-title'].value,
			authors: [Meteor.userId()],
			body: event.target['article-form-body'].value,
			category: event.target['article-form-category'].value,
			series: event.target['article-form-series'].value,
			tags: (() => {
				let tags = [];
				for (let tagBox of event.target['article-form-tags']) {
					if (tagBox.checked) {
						tags.push(tagBox.value);
					}
				}
				return tags;
			})(),
			isListed: event.target['article-form-is-listed'].checked,
			isDraft: event.target['article-form-is-draft'].checked,
		};
		if (formData.series === '0') {
			delete formData.series;
		}

		if (instance.data.articleId !== undefined) {
			// article update
			let articleId = instance.data.articleId;
			Meteor.call('articles.setTitle', { articleId, newTitle: formData.title });
		} else {
			// new article
			Meteor.call('articles.insert', formData);
		}

		// clear form
		event.target.reset();
	},
	'click .article-form-remove'(event, instance) {
		if (instance.data.articleId !== undefined) {
			Meteor.call('articles.remove', { articleId: instance.data.articleId });
			FlowRouter.go('/feed');
		}
	},
});

