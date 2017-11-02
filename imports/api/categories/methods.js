import { Meteor } from 'meteor/meteor';
import { Categories } from './categories';
import { Articles } from '../articles/articles';

Meteor.methods({
	'categories.insert'({ name, description }) {
		if (!!Categories.findOne({ name })) {
			throw new Meteor.Error('AlreadyExistingCategoryError', 'Category already exists.');
		}

		Categories.insert({ name, description });
	},
	'categories.rename'({ categoryId, newName }) {
		Categories.update(categoryId, {
			$set: {
				name: newName
			}
		});
	},
	'categories.setDescription'({ categoryId, newDescription }) {
		Categories.update(categoryId, {
			$set: {
				description: newDescription
			}
		});
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

