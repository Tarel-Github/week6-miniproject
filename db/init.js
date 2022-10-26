const sequelize = require('../db/config/connection')
const cache = require('./cache')

async function initialize() {
    const query = `
    INSERT INTO Categories (name)
    values ('자기관리'),('식습관'),('마음챙김'),('취미'),('기타');
    `

    await cache.dropMemory();
    await cache.createMemory();
    await sequelize.query(query);
    console.log("REFRESH & CATEGORY INITIALIZED");
}

(async()=>{
    await initialize();
})();