import { Meteor } from 'meteor/meteor';
import { Series } from '../series';

Meteor.publish('series', () => {
	return Series.find({});
});

if (!Series.findOne({ name: 'oil' })) {
	Series.insert({ name: 'oil', description: 'olive is cool.' });
}

