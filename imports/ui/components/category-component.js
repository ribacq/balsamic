import { Template } from 'meteor/templating';

import './category-component.html';

Template.categoryComponent.helpers({
	name() {
		return category.name;
	},
	description() {
		return category.description;
	}
});

