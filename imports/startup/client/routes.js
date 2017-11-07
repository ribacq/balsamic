// external dependencies
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// local ui imports
import '/imports/ui/layouts/main-layout';
import '/imports/ui/pages/feed-page';
import '/imports/ui/pages/read-page';
import '/imports/ui/pages/user-page';
import '/imports/ui/pages/user-edit-page';
import '/imports/ui/pages/admin-page';
import '/imports/ui/pages/article-edit-page';

// routes
FlowRouter.route('/', {
	name: 'feedPage',
	action() {
		BlazeLayout.render('mainLayout', { content: 'feedPage' });
	}
});

FlowRouter.route('/read/:articleId', {
	name: 'readPage',
	action() {
		BlazeLayout.render('mainLayout', { content: 'readPage' });
	}
});

FlowRouter.route('/user/:userId', {
	name: 'userPage',
	action() {
		BlazeLayout.render('mainLayout', { content: 'userPage' });
	}
});

FlowRouter.route('/user/:userId/edit', {
	name: 'userEditPage',
	action() {
		BlazeLayout.render('mainLayout', { content: 'userEditPage' });
	}
});

FlowRouter.route('/admin', {
	name: 'adminPage',
	action() {
		BlazeLayout.render('mainLayout', { content: 'adminPage' });
	}
});

FlowRouter.route('/admin/edit/:articleId', {
	name: 'articleEditPage',
	action() {
		BlazeLayout.render('mainLayout', { content: 'articleEditPage' });
	}
});

FlowRouter.notFound = {
	action() {
		FlowRouter.go('/');
	}
};

