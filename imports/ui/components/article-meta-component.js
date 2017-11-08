import { Template } from 'meteor/templating';
import { Categories } from '/imports/api/categories/categories';
import { Series } from '/imports/api/series/series';
import { Tags } from '/imports/api/tags/tags';

import './article-meta-component.html';

Template.articleMetaComponent.onCreated(function articleMetaComponentCreated() {
	this.getCategoryId = () => Template.instance().data.category;
	this.getSeriesId = () => Template.instance().data.series;
	this.getTagIds = () => Template.instance().data.tags;

	this.autorun(() => {
		this.subscribe('categories.one', this.getCategoryId());
		this.subscribe('series.one', this.getSeriesId());
		this.subscribe('tags.subset', this.getTagIds());
	});
});

Template.articleMetaComponent.helpers({
	category() {
		return Categories.findOne({ _id: Template.instance().data.category });
	},
	hasSeries() {
		return !!Template.instance().data.series;
	},
	series() {
		return Series.findOne({ _id: Template.instance().data.series });
	},
	tags() {
		return Tags.find({ _id: { $in: Template.instance().data.tags }});
	},
	authors() {
		return Meteor.users.find({ _id: { $in: Template.instance().data.authors }});
	},
	isListed() {
		return !!Template.instance().data.isListed ? 'yes' : 'no';
	},
	isDraft() {
		return !!Template.instance().data.isDraft ? 'yes' : 'no';
	},
});

