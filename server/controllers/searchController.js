const db = require("./db");

const search = async keyword => {
    return {
        keyword,
        code:"bochen"
    }
};

module.exports = {
    search
};
