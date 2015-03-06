/**
 * Provides roles comparison methods
 */

var _ = require('underscore');

function roles() {
	var exports = {};

	exports.filterNavByRoles = function(user, nav) {
		var userRoles = this.get('user roles');
		var filteredNav = {};
		var currentUserRoles;

		if (user) {

			currentUserRoles = _.find(userRoles, function(role) {
				return role.level === user.roleLevel;
			});

			if (nav.sections) {
				filteredNav.sections = [];

				_.each(nav.sections, function(section) {

					var sectionRoles = currentUserRoles.sections && currentUserRoles.sections[section.key.toLowerCase()];
					if (sectionRoles && _.contains(sectionRoles, 'view')) {
						var filteredLists = [];

						_.each(section.lists, function(list) {
							var listRoles = currentUserRoles.lists && currentUserRoles.lists[list.key.toLowerCase()];

							if (listRoles && _.contains(listRoles, 'view')) {
								filteredLists.push(list);
							}
						});

						section.lists = filteredLists;
						filteredNav.sections.push(section);
					}
				});
			}
		} else {
			filteredNav = nav;
		}

		return filteredNav;
	};

	return exports;

}

module.exports = roles;