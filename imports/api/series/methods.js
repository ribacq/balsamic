import { Meteor } from 'meteor/meteor';
import { Series } from './series';

Meteor.methods({
	'series.insert'({ name, description }) {
		const theSeries = {
			name,
			description
		};

		Series.insert(theSeries);
	},
	'series.rename'({ theSeriesId, newName }) {
		Series.update(theSeriesId, {
			$set: {
				name: newName
			}
		});
	},
	'series.setDescription'({ theSeriesId, newDescription }) {
		Series.update(theSeriesId, {
			$set: {
				description: newDescription
			}
		});
	},
	'series.remove'({ theSeriesId }) {
		// remove all member articles
		Articles.find({
			theSeries: theSeriesId
		}).foreach(article => {
			Articles.update(article._id, {
				$unset: {
					series: ''
				}
			});
		});

		// remove theSeries
		Series.remove(theSeriesId);
	}
});

