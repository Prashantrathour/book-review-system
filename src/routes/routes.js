const {

  sitesSelects,
 
} = require("../controller/app");

const route = ({ router, makeExpressCallback, validateAuth }) => {
 
  router.get("/sites", validateAuth, makeExpressCallback(sitesSelects)); 
  return router;
};

module.exports = route;
