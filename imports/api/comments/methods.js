import { Meteor } from 'meteor/meteor';
import { Comments } from './comments';
import { Article } from '../articles/articles';

Meteor.methods({
	'comments.insert'({ body, author, ofArticle, ofComment }) {
		// check author id
		if (!Meteor.users.findOne({ _id: author })) {
			throw new Meteor.Error('UndefinedUserError', 'Undefined author given for new comment');
		}

		// check article id
		if (!Articles.findOne({ _id: ofArticle })) {
			throw new Meteor.Error('UndefinedArticleError', 'Undefined article given for new comment');
		}

		// check comment id
		if (!!ofComment && !Comments.findOne({ _id: ofComment })) {
			throw new Meteor.Error('UndefinedCommentError', 'Undefined comment given for new comment');
		}

		const comment = {
			body,
			author,
			ofArticle,
			ofComment
		};

		Comments.insert(comment);
	},
	'comments.remove'({ commentId }) {
		Comments.remove(commentId);
	},
	'comments.setBody'({ commentId, newBody }) {
		Comments.update(commentId, {
			$set: {
				body: newBody
			}
		});
	},
	'comments.setAuthor'({ commentId, newAuthor }) {
		// check author id
		if (!Meteor.users.findOne({ _id: newAuthor })) {
			throw new Meteor.Error('UndefinedUserError', 'Undefined author given when editing comment');
		}

		Comments.update(commentId, {
			$set: {
				author: authorId
			}
		});
	}
});

