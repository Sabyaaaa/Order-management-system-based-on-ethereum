const OrderContract = artifacts.require("OrderContract");

module.exports = async function (deployer) {
  await deployer.deploy(OrderContract);
  const orderContract = await OrderContract.deployed();
};
