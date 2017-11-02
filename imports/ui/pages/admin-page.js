import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Categories } from '/imports/api/categories/categories';
import { Series } from '/imports/api/series/series';
import { Tags } from '/imports/api/tags/tags';

import './admin-page.html';
import '../components/category-edit-component';
import '../components/tag-component';

Template.adminPage.onCreated(function adminPageCreated() {
	this.autorun(() => {
		document.title = 'balsamic — admin';

		this.editedCategoryRV = new ReactiveVar({});

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
		return Template.instance().editedCategoryRV.get();
	},
	series() {
		return Series.find();
	},
	seriesCount() {
		return Series.find().count();
	},
	tags() {
		return Tags.find();
	},
	tagsCount() {
		return Tags.find().count();
	},
});

Template.adminPage.events({
	'click .category-table-edit'(event, instance) {
		instance.editedCategoryRV.set(Categories.findOne({ _id: event.target.getAttribute('category-id') }));
	},
	'click .category-table-delete'(event, instance) {
		Meteor.call('categories.remove', { categoryId: event.target.getAttribute('category-id') });
	},
});

