import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Categories } from '/imports/api/categories/categories';
import { Series } from '/imports/api/series/series';
import { Tags } from '/imports/api/tags/tags';

import './admin-page.html';
import '../components/category-edit-component';
import '../components/series-edit-component';
import '../components/tag-edit-component';

Template.adminPage.onCreated(function adminPageCreated() {
	this.autorun(() => {
		document.title = 'balsamic — admin';

		this.editedCategoryRV = new ReactiveVar({});
		this.editedSeriesRV = new ReactiveVar({});
		this.editedTagRV = new ReactiveVar({});

		this.subscribe('categories');
		this.subscribe('series');
		this.subscribe('tags');
	});
});

Template.adminPage.helpers({
	categories() {
		return Categories.find();
	},
	categoriesCount() {
		return Categories.find().count();
	},
	editedCategory() {
		return Template.instance().editedCategoryRV;
	},
	series() {
		return Series.find();
	},
	seriesCount() {
		return Series.find().count();
	},
	editedSeries() {
		return Template.instance().editedSeriesRV;
	},
	tags() {
		return Tags.find();
	},
	tagsCount() {
		return Tags.find().count();
	},
	editedTag() {
		return Template.instance().editedTagRV;
	},
});

Template.adminPage.events({
	'click .category-table-edit'(event, instance) {
		instance.editedCategoryRV.set(Categories.findOne({ _id: event.target.parentNode.parentNode.getAttribute('category-id') }));
	},
	'click .category-table-delete'(event, instance) {
		Meteor.call('categories.remove', { categoryId: event.target.parentNode.parentNode.getAttribute('category-id') });
	},
	'click .series-table-edit'(event, instance) {
		instance.editedSeriesRV.set(Series.findOne({ _id: event.target.parentNode.parentNode.getAttribute('series-id') }));
	},
	'click .series-table-delete'(event, instance) {
		Meteor.call('series.remove', { theSeriesId: event.target.parentNode.parentNode.getAttribute('series-id') });
	},
	'click .tag-table-edit'(event, instance) {
		instance.editedTagRV.set(Tags.findOne({ _id: event.target.parentNode.parentNode.getAttribute('tag-id') }));
	},
	'click .tag-table-delete'(event, instance) {
		Meteor.call('tags.remove', { tagId: event.target.parentNode.parentNode.getAttribute('tag-id') });
	},
});

