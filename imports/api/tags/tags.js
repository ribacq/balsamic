import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Tags = new Mongo.Collection('tags');

Tags.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

Tags.schema = new SimpleSchema({
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	name: {
		type: String,
		max: 42,
		optional: false
	}
});

Tags.attachSchema(Tags.schema);

