import { Meteor } from 'meteor/meteor';
import { Tags } from '../tags';

Meteor.publish('tags', () => {
	return Tags.find({});
});

Meteor.publish('tags.subset', (tagIds) => {
	return Tags.find({ _id: { $in: tagIds }});
});

