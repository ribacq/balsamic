import { Meteor } from 'meteor/meteor';
import { Series } from './series';
import { Articles } from '../articles/articles';

Meteor.methods({
	'series.upsert'({ _id, name, description }) {
		if (!name || !description) {
			throw new Meteor.Error('NoNameOrDescriptionForSeriesError', 'No name or no description provided for series.');
		}

		if (!!_id) {
			Series.update(_id, { $set: { name, description }});
		} else {
			if (!!Series.findOne({ name })) {
				throw new Meteor.Error('SeriesAlreadyExistsError', 'New name for series is already taken.');
			}
			Series.insert({ name, description });
		}
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

