import { Meteor } from 'meteor/meteor';
import { Tags } from './tags';

Meteor.methods({
	'tags.insert'({ name }) {
		Tags.insert({ name });
	},
	'tags.remove'({ tagId }) {
		Tags.remove(tagId);
	}
});

