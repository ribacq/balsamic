import { Meteor } from 'meteor/meteor';
import { Categories } from './categories';

Meteor.methods({
	'categories.insert'({ name, description }) {
		const category = {
			name,
			description
		};

		Categories.insert(category);
	},
	'categories.rename'({ categoryId, newName }) {
		Categories.update(categoryId, {
			$set: {
				name: newName
			}
		});
	},
	'categories.udpateDescription'({ categoryId, newDescription }) {
		Categories.update(categoryId, {
			$set: {
				description: newDescription
			}
		});
	},
	'categories.remove'({ categoryId }) {
		// remove all member articles
		/*Articles.find({
			category: categoryId
		}).foreach(article => {
			Articles.remove(article._id);
		});*/

		// remove category
		Categories.remove(categoryId);
	}
});

