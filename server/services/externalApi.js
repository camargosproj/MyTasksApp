const axios = require('axios');


const getDataFromApi = async (url) => {
    return await axios.get(url)
}

module.exports = {
    getDataFromApi
}