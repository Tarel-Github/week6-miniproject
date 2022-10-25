const sequelize = require('../db/config/connection')
const cache = require('./cache')

async function initialize() {
    const query = `
    INSERT INTO Categories (name)
    values ('category1'),('category2'),('category3'),('category4'),('category5');
    `

    await cache.dropMemory();
    await cache.createMemory();
    await sequelize.query(query);
    console.log("REFRESH & CATEGORY INITIALIZED");
}

(async()=>{
    await initialize();
})();