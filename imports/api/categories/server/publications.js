import { Meteor } from 'meteor/meteor';
import { Categories } from '../categories';

Meteor.publish('categories', () => {
	return Categories.find({});
});

if (!Categories.findOne({ name: 'vinegar' })) {
	Categories.insert({ name: 'vinegar', description: 'balsamic is cool.' });
}

