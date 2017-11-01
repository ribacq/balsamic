import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Comments = new Mongo.Collection('comments');

Comments.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

Comments.schema = new SimpleSchema({
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	body: {
		type: String,
		optional: false
	},
	author: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: false
	},
	ofArticle: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: false
	},
	ofComment: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	},
	createdAt: {
		type: Date,
		autoValue() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return { $setonInsert: new Date() };
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
	inTrash: {
		type: Boolean,
		autoValue() {
			return true;
		},
		optional: false
	}
});

Comments.attachSchema(Comments.schema);

