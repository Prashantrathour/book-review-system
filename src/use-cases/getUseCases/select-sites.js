const selectSite = ({ cmsDao, decrypt }) => {
  return async function select(info) {
    let data = [];
  
    const {res} = await cmsDao.selectAllSites();
   
        if (res.length > 0) {
      // only when there is data returned
      for (let i = 0; i < res.length; i++) {
        const e = res[i];

        // push items to array
        data.push({
          id: e.id,
          site: e.site,
          is_active: e.is_active,
          created_at: e.createdAt,
          modified_at: e.updatedAt,
          modified_by: e.modified_by,
        });
      }
    }
    return data;
  };
};

module.exports = selectSite;
