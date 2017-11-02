import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Categories = new Mongo.Collection('categories');

Categories.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

Categories.schema = new SimpleSchema({
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	name: {
		type: String,
		max: 140,
		optional: false
	},
	description: {
		type: String,
		max: 420,
		optional: false
	},
});

Categories.attachSchema(Categories.schema);

if (!Categories.findOne({ name: 'vinegar' })) {
	Categories.insert({ name: 'vinegar', description: 'balsamic is cool.' });
}

