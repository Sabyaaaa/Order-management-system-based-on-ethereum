let config = require('../config/config');
let constants = require('../constants/constants');
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var OrderContractJson = require("../../build/contracts/OrderContract.json");
let contractAddress = config.CONTRACT_ADDRESS;
let accountAddress = config.ACCOUNT_ADDRESS;
//=================================// add Details//=======================================================================================================
module.exports.createOrder = async function (req, res) {
    console.info(`================== addDetails() START ==================`);

    try {
        console.info(JSON.stringify(OrderContractJson));
        let OrderContract = new web3.eth.Contract(OrderContractJson.abi, contractAddress);

        let Id = req.body.order_id;
        let name = req.body.name;
        let cost = req.body.cost;
        let add = req.body.home_address;
        console.info(`accountAddress:${accountAddress}`);
        console.info(`contractAddress:${contractAddress}`)
        let result = await OrderContract.methods.createOrder(Id, name, cost, add).send({ from: accountAddress, gas: "1000000" });
        // console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`);
        console.info(result);
        return res.status(constants.RES_CODE_CREATED).json({ code: constants.RES_CODE_CREATED, success: true, message: constants.DETAILS_ADDED_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
};



//===============================================// get product by id//=======================================================================================================
module.exports.getOrderDetailsById = async function (req, res) {
    console.info(`================== getDetailsById() START ==================`);
    try {
        let orderContract = new web3.eth.Contract(OrderContractJson.abi, contractAddress);
        let id = req.body.order_id;
        let order = await orderContract.methods.getOrderDetailsById(id).call();
        console.info(`Order Details: ${JSON.stringify(order)}`);

        let orderDetails = {
            order_id: order.order_id,
            name: order.name,
            cost: order.cost,
            home_address: order.home_address,

        }
        return res.status(constants.RES_CODE_OK).json({ code: constants.RES_CODE_OK, success: true, message: constants.DETAILS_FETCHED_SUCCESSFULLY_MESSAGE, data: orderDetails });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
};

//===================================================// update product by id//=======================================================================================================
module.exports.updateOrderDetails = async function (req, res) {
    console.info(`================== updateOrderDetailsById()  ==================`);
    try {
        let orderContract = new web3.eth.Contract(OrderContractJson.abi, contractAddress);
        let id = req.body.order_id;
        let name = req.body.name;
        let add = req.body.home_address;


        let result = await orderContract.methods.updateOrderDetails(id, name, add).send({ from: accountAddress, gas: "1000000" });
        console.info(result);



        return res.status(constants.RES_CODE_OK).json({ code: constants.RES_CODE_OK, success: true, message: constants.DETAILS_UPDATED_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
};

//====================================================// get all Details//=======================================================================================================
module.exports.getOrderDetails = async function (req, res) {
    console.info(`================== getOrderDetails()  ==================`);
    try {
        let orderContract = new web3.eth.Contract(OrderContractJson.abi, contractAddress);
        let orderDetails = await orderContract.methods.getOrderDetails().call();
        console.info(`Order Details: ${JSON.stringify(orderDetails)}`);
        console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`);
        return res.status(constants.RES_CODE_OK).json({ code: constants.RES_CODE_OK, success: true, message: constants.DETAILS_FETCHED_SUCCESSFULLY_MESSAGE, data: orderDetails });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
};

//===================================================// delete details by id//=======================================================================================================
module.exports.deleteOrderDetails = async function (req, res) {
    console.info(`================== updateDetailsById() ==================`);
    try {
        let orderContract = new web3.eth.Contract(OrderContractJson.abi, contractAddress);
        let id = req.body.order_id;
        let result = await orderContract.methods.deleteOrderDetails(id).send({ from: accountAddress, gas: "1000000" });
        console.info(result);
        return res.status(constants.RES_CODE_OK).json({ code: constants.RES_CODE_OK, success: true, message: constants.DETAILS_DELETED_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
};






