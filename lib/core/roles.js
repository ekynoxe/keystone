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
			if (user.roleLevel == null) {
				user.roleLevel = 0;
			}

			currentUserRoles = _.find(userRoles, function(role) {
				return role.level === user.roleLevel;
			});

			if (nav.sections) {
				filteredNav.sections = [];

				_.each(nav.sections, function(section) {
					var sectionRoles = currentUserRoles.sections && currentUserRoles.sections[section.key.toLowerCase()];
					if (sectionRoles && _.contains(sectionRoles, 'view')) {
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