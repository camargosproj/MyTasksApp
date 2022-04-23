const {getDataFromApi} = require("../services/externalApi");



const getBordedTask = async (req, res) => {
    try {
      const response = await getDataFromApi('https://www.boredapi.com/api/activity/');
      res.json(response.data);
    } catch (error) {
      console.error(err.message);  
    }
  }

module.exports = {
    getBordedTask
}