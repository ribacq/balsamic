import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Articles = new Mongo.Collection('articles');

Articles.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

Articles.schema = new SimpleSchema({
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	title: {
		type: String,
		max: 140,
		optional: false
	},
	body: {
		type: String,
		optional: false
	},
	authors: {
		type: Array,
		optional: false
	},
	'authors.$': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	tags: {
		type: Array,
		optional: false
	},
	'tags.$': {
		type: String,
		max: 32
	},
	category: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: false
	},
	series: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	},
	upvotes: {
		type: Array,
		optional: true
	},
	'upvotes.$': {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	createdAt: {
		type: Date,
		autoValue() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return { $setOnInsert: { createdAt: new Date() } };
			} else {
				this.unset();
			}
		},
		optional: true
	},
	editedAt: {
		type: Date,
		autoValue() {
			if (this.isUpdate) {
				return new Date();
			} else {
				this.unset();
			}
		},
		optional: true
	},
	isListed: {
		type: Boolean,
		defaultValue() {
			return true;
		},
		optional: false
	},
	isDraft: {
		type: Boolean,
		defaultValue() {
			return false;
		},
		optional: false
	},
});

Articles.attachSchema(Articles.schema);

