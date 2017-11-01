import { Meteor } from 'meteor/meteor';
import { Comments } from '../comments';

Meteor.publish('comments', (articleId) => {
	return Comments.find({ ofArticle: articleId });
});

