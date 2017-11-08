import { Meteor } from 'meteor/meteor';
import { Series } from '../series';

Meteor.publish('series', () => {
	return Series.find({});
});

Meteor.publish('series.one', (seriesId) => {
	return Series.find({ _id: seriesId });
});

