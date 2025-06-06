const {

  selectSites,
 
} = require("../use-cases/app");

// ######### Get Data

const sitesSelect = require("./getData/select-sites");

const sitesSelects = sitesSelect({ selectSites });

// #########
const services = Object.freeze({
 
  sitesSelects,
                                                                                        
});

module.exports = services;
