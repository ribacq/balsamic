import { Meteor } from 'meteor/meteor';
import { Tags } from './tags';
import { Articles } from '../articles/articles';

Meteor.methods({
	'tags.upsert'({ _id, name }) {
		if (!name) {
			throw new Meteor.Error('NoNameForTagError', 'No name was provided for tag.');
		}

		if (!!_id) {
			Tags.update(_id, { $set: { name }});
		} else {
			if (!!Tags.findOne({ name })) {
				throw new Meteor.Error('TagAlreadyExistsError', 'New name for tag is already taken.');
			}
			Tags.insert({ name });
		}
	},
	'tags.remove'({ tagId }) {
		// remove tag from all using articles
		Articles.update({ tags: tagId }, { $pull: { tags: tagId }});
		
		// remove tag
		Tags.remove(tagId);
	},
});

