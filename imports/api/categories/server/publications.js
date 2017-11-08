import { Meteor } from 'meteor/meteor';
import { Categories } from '../categories';

Meteor.publish('categories', () => {
	return Categories.find({});
});

Meteor.publish('categories.one', (categoryId) => {
	return Categories.find({ _id: categoryId });
});

