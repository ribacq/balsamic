// external dependencies
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// local ui imports
import '/imports/ui/layouts/main-layout';
import '/imports/ui/pages/feed-page';

// routes
FlowRouter.route('/', {
	name: 'feedPage',
	action() {
		BlazeLayout.render('mainLayout', {
			content: 'feedPage'
		});
	}
});

FlowRouter.route('/read/:articleId', {
	name: 'readPage',
	action() {
		BlazeLayout.render('mainLayout', {
			content: 'readPage'
		});
	}
});

