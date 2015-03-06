/**
 * Provides roles support for lists
 * Redirects the user to /keystone if they don't have
 *      access to the requested route.
 *
 * ####Example:
 *
 *     app.all('/your_routes*', keystone.middleware.roles);
 *
 * @param {app.request} req
 * @param {app.response} res
 * @param {function} next
 * @api public
 */

// The exported function returns a closure that retains
// a reference to the keystone instance, so it can be
// passed as middeware to the express app.
var _ = require('underscore');

exports = module.exports = function(keystone) {

    return function restrictAccess(req, res, next) {

        var userRoles = keystone.get('user roles');
        var currentUserRoles;
        var listsRoles;

        if (req.user) {
            if (req.user.roleLevel == null) {
                req.user.roleLevel = 0;
            }

            currentUserRoles = _.find(userRoles, function(role) {
                return role.level === req.user.roleLevel;
            });

            listsRoles = currentUserRoles.lists && currentUserRoles.lists[req.list.key.toLowerCase()];

            if (listsRoles && !_.contains(listsRoles, 'view')) {
                return res.redirect('/keystone/');
            }
        }

        next();
    };
};
