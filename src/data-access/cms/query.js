const { Sequelize } = require("sequelize");

const query = ({ connects, models }) => {
  return Object.freeze({
    selectAllSites,
    
  });



  async function selectAllSites() {
    try {
      const res = await models.site_master.findAll({
        attributes: ["id", "site"],
        where: {
          is_active: true,
        },
      });
      return { success: true, res };
    } catch (error) {
      throw error;
    }
  }

 
};

module.exports = query;
