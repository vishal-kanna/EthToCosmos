const SimpleStorage = artifacts.require("InferenceStorage");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};