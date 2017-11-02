import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Categories } from '/imports/api/categories/categories';

import './category-edit-component.html';

Template.categoryEditComponent.events({
	'submit .category-form'(event, instance) {
		event.preventDefault();
		let formName = event.target['category-form-name'].value;
		let formDescription = event.target['category-form-description'].value;

		if (!Categories.findOne({ _id: Template.instance().data._id })) {
			Meteor.call('categories.insert', {
				name: formName,
				description: formDescription,
			});
		} else {
			Meteor.call('categories.rename', {
				categoryId: Template.instance().data._id,
				newName: formName,
			});
			Meteor.call('categories.setDescription', {
				categoryId: Template.instance().data._id,
				newDescription: formDescription,
			});
		}

		event.target['category-form-name'].value = '';
		event.target['category-form-description'].value = '';
	}
});

