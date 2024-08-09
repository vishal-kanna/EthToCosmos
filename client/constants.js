const path = require("path");
const fs = require("fs");

require("dotenv").config();
const abiJson = process.env.ABIPATH;
let CONTRACTABI;
const contractPath = path.resolve(__dirname, abiJson);
try {
  CONTRACTABI = JSON.parse(fs.readFileSync(contractPath, "utf8")).abi;
} catch (error) {
  console.error("Error reading contract ABI:", error);
  process.exit(1);
}

module.exports = {
  CONTRACTABI,
};
