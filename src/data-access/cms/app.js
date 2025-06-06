const models = require("../sequelize/models");
// ######
const query = require("./query");

// ######
const cmsDao = query({models});

// ######

module.exports = cmsDao;
