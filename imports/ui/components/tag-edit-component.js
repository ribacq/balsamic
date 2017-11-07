import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Tags } from '/imports/api/tags/tags';

import './tag-edit-component.html';

Template.tagEditComponent.helpers({
	name() {
		return Template.instance().data.get().name;
	},
});

Template.tagEditComponent.events({
	'submit .tag-form'(event, instance) {
		event.preventDefault();
		let usedID = Template.instance().data.get()._id;
		let formName = event.target['tag-form-name'].value;

		Meteor.call('tags.upsert', {
			_id: usedID,
			name: formName,
		});

		event.target['tag-form-name'].value = '';
		Template.instance().data.set({});
	},
	'reset .tag-form'(event, instance) {
		Template.instance().data.set({});
	},
});

