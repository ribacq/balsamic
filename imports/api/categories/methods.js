import { Meteor } from 'meteor/meteor';
import { Categories } from './categories';
import { Articles } from '../articles/articles';

Meteor.methods({
	'categories.upsert'({ _id, name, description }) {
		if (!name || !description) {
			throw new Meteor.Error('NoNameOrDescriptionForCategoryError', 'No name or no description provided for category.');
		}

		if (!!_id) {
			Categories.update(_id, { $set: { name, description }});
		} else {
			if (!!Categories.findOne({ name })) {
				throw new Meteor.Error('CategoryAlreadyExistsError', 'New name for category is already taken.');
			}
			Categories.insert({ name, description });
		}
	},
	'categories.remove'({ categoryId }) {
		// remove all member articles
		Articles.find({
			category: categoryId
		}).forEach(article => {
			Articles.remove(article._id);
		});

		// remove category
		Categories.remove(categoryId);
	}
});

