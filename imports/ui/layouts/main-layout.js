import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './main-layout.html';
import '../components/user-rtfm-component';
import '../components/category-component';

Template.mainLayout.onCreated(() => {
	const categoriesSub = Meteor.subscribe('categories');
});

Template.mainLayout.helpers({
	categories() {
		return categoriesSub;
	}
});

