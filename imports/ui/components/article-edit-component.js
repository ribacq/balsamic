import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Categories } from '/imports/api/categories/categories';
import { Series } from '/imports/api/series/series';
import { Tags } from '/imports/api/tags/tags';

import './article-edit-component.html';

Template.articleEditComponent.onCreated(function articleEditComponentCreated() {
	this.autorun(() => {
		this.subscribe('categories');
		this.subscribe('series');
		this.subscribe('tags');
	});
});

Template.articleEditComponent.helpers({
	categories() {
		return Categories.find();
	},
	series() {
		return Series.find();
	},
	tags() {
		return Tags.find();
	},
});

Template.articleEditComponent.events({
	'submit .article-form'(event, instance) {
		event.preventDefault();

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

		Meteor.call('articles.insert', formData);
		event.target.reset();
	}
});

