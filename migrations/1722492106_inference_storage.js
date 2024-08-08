const InferenceStorage = artifacts.require("InferenceStorage");

module.exports = function (deployer) {
  deployer.deploy(InferenceStorage);
};