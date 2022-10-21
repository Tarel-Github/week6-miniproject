const fs = require('fs');
const env = require('../config.env');

function setConnection() {
    const config = {
        "development": {
            "username": env.DB_USER,
            "password": env.DB_PASSWORD,
            "database": env.DB_NAME,
            "host": env.DB_HOST,
            "dialect": "mysql"
        },
        "test": {
          "username": "root",
          "password": null,
          "database": "database_test",
          "host": "127.0.0.1",
          "dialect": "mysql"
        },
        "production": {
          "username": "root",
          "password": null,
          "database": "database_production",
          "host": "127.0.0.1",
          "dialect": "mysql"
        }
    }
    const path = `${env.ROOT}\\config\\`
    
    const data = JSON.stringify(config);
    fs.writeFileSync(`${path}config.json`, data);
}

(()=>{
    setConnection();
})();

// module.exports = setConnection;