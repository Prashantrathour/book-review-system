const cmsDao = require("../data-access/cms/app"); // database queries
// const { encrypt, decrypt } = require("../../../functions/app");

const selectSite = require("./getUseCases/select-sites");

const selectSites = selectSite({ cmsDao });

// #########
const services = Object.freeze({
  selectSites,
  
});

module.exports = services;
