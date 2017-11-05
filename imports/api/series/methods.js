import { Meteor } from 'meteor/meteor';
import { Series } from './series';
import { Articles } from '../articles/articles';

Meteor.methods({
	'series.upsert'({ _id, name, description }) {
		if (!!_id) {
			Series.update(_id, { $set: { name, description }});
		} else {
			if (!!Series.findOne({ name })) {
				throw new Meteor.Error('SeriesAlreadyExistsError', 'New name for series is already taken.');
			}
			Series.insert({ name, description });
		}
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
		}).forEach(article => {
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

