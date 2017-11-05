import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Series } from '/imports/api/series/series';

import './series-edit-component.html';

Template.seriesEditComponent.helpers({
	name() {
		return Template.instance().data.get().name;
	},
	description() {
		return Template.instance().data.get().description;
	},
});

Template.seriesEditComponent.events({
	'submit .series-form'(event, instance) {
		event.preventDefault();
		let usedID = Template.instance().data.get()._id;
		let formName = event.target['series-form-name'].value;
		let formDescription = event.target['series-form-description'].value;

		Meteor.call('series.upsert', {
			_id: usedID,
			name: formName,
			description: formDescription,
		});

		event.target['series-form-name'].value = '';
		event.target['series-form-description'].value = '';
		Template.instance().data.set({});
	},
	'click .series-form-reset'(event, instance) {
		Template.instance().data.set({});
	},
});

