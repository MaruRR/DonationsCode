var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var ContractDonaciones= artifacts.require("./ContractDonaciones.sol")

module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  //deployer.link(ConvertLib, ContractDonaciones);
  deployer.deploy(ContractDonaciones);
};
