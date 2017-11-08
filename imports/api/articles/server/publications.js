import { Meteor } from 'meteor/meteor';
import { Articles } from '../articles';

Meteor.publish('articles', (tags, category, series, n) => {
	let filters = {};
	if (!!tags) {
		filters.tags = { $in: tags };
	}

	if (!!series) {
		filters.series = series;
	} else if (!!category) {
		filters.category = category;
	}

	let conditions = {
		limit: n,
		sort: {
			createdAt: -1
		}
	};

	return Articles.find(filters, conditions);
});

Meteor.publish('articles.one', (articleId) => {
	return Articles.find({ _id: articleId });
});

