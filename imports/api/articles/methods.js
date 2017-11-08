import { Meteor } from 'meteor/meteor';
import { Articles } from './articles';
import { Comments } from '../comments/comments';
import { Categories } from '../categories/categories';
import { Series } from '../series/series';

Meteor.methods({
	'articles.insert'({ title, body, authors, tags, category, series, isListed, isDraft }) {
		// check authors id
		if ((!authors) || (authors.length < 1) || (Meteor.users.find({ _id: { $in: authors }}).count() !== authors.length)) {
			throw new Meteor.Error('UndefinedUserError', 'Undefined or no authors given for new article');
		}

		// check category id
		if (!Categories.findOne({ _id: category })) {
			throw new Meteor.Error('UndefinedCategoryError', 'Undefined category given for new article');
		}

		// check series id
		if (series && !Series.findOne({ _id: series })) {
			throw new Meteor.Error('UndefinedSeriesError', 'Undefined series given for new article');
		}

		// check empty or repeated title
		if (!title || !!Articles.findOne({ title })) {
			throw new Meteor.Error('BadTitleError', 'Empty or already existing title for new article');
		}

		const article = {
			title,
			body,
			authors,
			tags,
			category,
			series,
			isListed,
			isDraft
		};

		return Articles.insert(article);
	},
	'articles.setTitle'({ articleId, newTitle }) {
		Articles.update(articleId, {
			$set: {
				title: newTitle
			},
			$setOnInsert: {
				title: newTitle
			},
		});
	},
	'articles.setBody'({ articleId, newBody }) {
		Articles.update(articleId, {
			$set: {
				body: newBody
			},
			$setOnInsert: {
				body: newBody
			},
		});
	},
	'articles.addAuthor'({ articleId, userId }) {
		if (!Meteor.users.findOne({ _id: userId})) {
			throw new Meteor.Error('UndefinedUserError', 'Undefined author given when editing article');
		}

		Articles.update(articleId, {
			$addToSet: {
				authors: userId
			}
		});
	},
	'articles.delAuthor'({ articleId, userId }) {
		Articles.update(articleId, {
			$pull: {
				authors: userId
			}
		});
	},
	'articles.addTag'({ articleId, newTag }) {
		Articles.update(articleId, {
			$addToSet: {
				tags: newTag
			}
		});
	},
	'articles.delTag'({ articleId, oldTag }) {
		Articles.update(articleId, {
			$pull: {
				tags: oldTag
			}
		});
	},
	'articles.setCategory'({ articleId, category }) {
		if (!Categories.findOne({ _id: category })) {
			throw new Meteor.Error('UndefinedCategoryError', 'Undefined category given when editing article');
		}

		Articles.update(articleId, {
			$set: {
				category
			},
			$setOnInsert: {
				category
			},
		});
	},
	'articles.setSeries'({ articleId, series }) {
		if (!Series.findOne({ _id: series })) {
			throw new Meteor.Error('UndefinedSeriesError', 'Undefined series given when editing article');
		}

		Articles.update(articleId, {
			$set: {
				series
			},
			$setOnInsert: {
				series
			},
		});
	},
	'articles.unsetSeries'({ articleId }) {
		Article.update(articleId, {
			$unset: {
				series: ''
			}
		});
	},
	'articles.addVote'({ articleId, userId }) {
		Articles.update(articleId, {
			$addToSet: {
				upvotes: userId
			}
		});
	},
	'articles.delVote'({ articleId, userId }) {
		Articles.update(articleId, {
			$pull: {
				upvotes: userId
			}
		});
	},
	'articles.setListed'({ articleId }) {
		Articles.update(articleId, {
			$set: {
				isListed: true
			},
			$setOnInsert: {
				isListed: true
			},
		});
	},
	'articles.setUnlisted'({ articleId }) {
		Articles.update(articleId, {
			$set: {
				isListed: false
			},
			$setOnInsert: {
				isListed: false
			},
		});
	},
	'articles.setDraft'({ articleId }) {
		Articles.update(articleId, {
			$set: {
				isDraft: true
			},
			$setOnInsert: {
				isDraft: true
			},
		});
	},
	'articles.setPublished'({ articleId }) {
		Articles.update(articleId, {
			$set: {
				isDraft: false
			},
			$setOnInsert: {
				isDraft: false
			},
		});
	},
	'articles.remove'({ articleId }) {
		Articles.remove(articleId);
	},
});

