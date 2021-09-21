const _ = require("lodash");

module.exports = (...authorizedRoles) => {
        return (req, res, next) => {
            const currentUserRole = [req.user[0].dataValues.role];
            if(_.intersection(currentUserRole, authorizedRoles).length < 1){
                console.log(currentUserRole);
                console.log(authorizedRoles);
                console.log(_.intersection(currentUserRole, authorizedRoles));
                res.status(403).send("Not Permitted");
                return;
            }
            next();
        }
}
