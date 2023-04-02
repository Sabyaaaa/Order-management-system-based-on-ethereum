// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract OrderContract {

  struct Order {
    uint order_id;
    string name;
    uint cost;
    string home_address;
  }

  Order[] public ord;

  mapping(uint => Order) orders;

  function createOrder(uint _id, string memory _name, uint _cost, string memory _address) public {
    Order memory o;
    o.order_id = _id;
    o.name = _name;
    o.cost = _cost;
    o.home_address = _address;
    ord.push(o);
    orders[_id] = o;
  }

  function getOrderDetails() external view returns(Order[] memory) {
    return ord;
  }

  function updateOrderDetails(uint _id, string memory _name, string memory _homeAdd) public {
    for (uint i = 0; i < ord.length; i++) {
      if(ord[i].order_id == _id){
        ord[i].name = _name;
        ord[i].home_address = _homeAdd;
      }
    }
    orders[_id].name = _name;
    orders[_id].home_address = _homeAdd;
  }

  function getOrderDetailsById(uint _id) public view returns(Order memory){
    return orders[_id];
  }

  function deleteOrderDetails(uint _id) public {
    delete orders[_id];
    for(uint i=0;i<ord.length;i++){
      if(ord[i].order_id==_id){
        delete ord[i];
      }
  }

}
}
