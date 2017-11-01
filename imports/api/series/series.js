import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Series = new Mongo.Collection('series');

Series.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

Series.schema = new SimpleSchema({
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	name: {
		type: String,
		max: 64,
	},
	description: {
		type: String,
		max: 512,
	},
});

Series.attachSchema(Series.schema);

