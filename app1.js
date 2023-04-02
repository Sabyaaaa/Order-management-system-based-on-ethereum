var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var OrderContractJson = require("./build/contracts/OrderContract.json");
let contractAddress = "0x8f71272b8EF5099628468FE4A9934845b54bb371";
let accountAddress = "0x26873A61724264b82406E764738211C575807e2a";

async function myApp() {

    let OrderContract = new web3.eth.Contract(OrderContractJson.abi, contractAddress);

    console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`)
    // console.log(`my Name : ${await SchoolContract.methods.myName().call()}`);    
    // await SchoolContract.methods.values().call();     
    await OrderContract.methods.createOrder(1, "Sabya", 300, 'Delhi').send({ from: accountAddress, gas: "1000000" });
    await OrderContract.methods.createOrder(2, "Mickey", 500, 'US').send({ from: accountAddress, gas: "1000000" });

    console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`);
    // console.info(result);    await SchoolContract.methods.addDetails('monu',10, 200, 'C').send({from: accountAddress,gas: "1000000"});    
    console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`);
    // console.info(res);    
    let getById = await OrderContract.methods.getOrderDetailsById(1).call();
    console.log(getById);
    // let getAll = await OrderContract.methods.getOrderDetails().call();
    // console.log(getAll);
    await OrderContract.methods.updateOrderDetails(1, "Ayushi", 'Mumbai').send({ from: accountAddress, gas: "1000000" });
    console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`);
    let getByI = await OrderContract.methods.getOrderDetailsById(1).call();
    console.log(getByI);
    await OrderContract.methods.deleteOrderDetails(2).send({ from: accountAddress, gas: "1000000" });
    console.log(`balance : ${await web3.eth.getBalance(accountAddress)}`);
    let deleted = await OrderContract.methods.getOrderDetailsById(2).call();
    console.log(deleted);
    // let prodCount = await SchoolContract.methods.getProductCounts().call();    
    // console.log(`product count : ${prodCount}`);}myApp();
}
myApp();