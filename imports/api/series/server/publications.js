import { Meteor } from 'meteor/meteor';
import { Series } from '../series';

Meteor.publish('series', () => {
	return Series.find({});
});

