import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Categories } from '/imports/api/categories/categories';

import './category-edit-component.html';

Template.categoryEditComponent.helpers({
	name() {
		return Template.instance().data.get().name;
	},
	description() {
		return Template.instance().data.get().description;
	},
});

Template.categoryEditComponent.events({
	'submit .category-form'(event, instance) {
		event.preventDefault();
		let usedID = Template.instance().data.get()._id;
		let formName = event.target['category-form-name'].value;
		let formDescription = event.target['category-form-description'].value;

		Meteor.call('categories.upsert', {
			_id: usedID,
			name: formName,
			description: formDescription,
		});

		event.target.reset();
		Template.instance().data.set({});
	},
	'reset .category-form'(event, instance) {
		Template.instance().data.set({});
	},
});

