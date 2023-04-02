let dotenv = require('dotenv');
dotenv.config();
module.exports = {
    ENV: process.env.SDK_ENV || "dev",
    PORT: process.env.PORT || 8080,
    CONTRACT_ADDRESS: "0x8f71272b8EF5099628468FE4A9934845b54bb371",
    ACCOUNT_ADDRESS: "0xEfd97F13d7A4965ec3C57D4aB4030917cE0f8c75",
};