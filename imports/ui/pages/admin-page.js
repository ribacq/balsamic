import { Template } from 'meteor/templating';
import { Categories } from '/imports/api/categories/categories';
import { Series } from '/imports/api/series/series';
import { Tags } from '/imports/api/tags/tags';

import './admin-page.html';
import '../components/tag-component';

Template.adminPage.onCreated(function adminPageCreated() {
	this.autorun(() => {
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

