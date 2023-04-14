// SPDX-License-Identifier: GPL-3.0
//0xAF6DbFc760FA9dEf4A08bFcA71B43Df3EBE5edAB
//ganache -0x39Cad512A953209A52E7E98A062EB7D66AAC5eb3

pragma solidity >=0.7.0 <0.9.0;

contract Insurance {

    address manager; // The address of the manager
    address payable[] public employers; 
    mapping(address => bool) public registered;
    
    // Constructor function
    constructor() {
        manager = msg.sender;
    }

    function getBalance() public view returns(uint)  {
        require(msg.sender == manager, "Only the manager can call this function");
        return address(this).balance;
    }

    function getAllEmployees() public view returns (address payable[]  memory) {
        return employers;
    }
    
    
    // Fallback function to receive funds
    receive() external payable {
        require(msg.value == 1 ether, "Pay 1 ether only");
        require(!registered[msg.sender], "You are already registered");
        registered[msg.sender] = true;
        
        employers.push(payable (msg.sender));

    }
    
}


// Ganache - 0xbb48075CF1DcB1386Fc881777C3138B1fD886D9e
// contract Insurance {

//     address payable public manager; // The address of the manager
//     mapping(address => bool) public employees; // The list of employees
//     address[] public employeeList;
    
//     // Constructor function
//     constructor() {
//         manager = payable(msg.sender);
//     }
    
//     // Modifier to ensure that only the manager can call certain functions
//     modifier onlyManager() {
//         require(msg.sender == manager, "Only the manager can call this function");
//         _;
//     }
    
//     // Modifier to ensure that only registered employees can call certain functions
//     modifier onlyEmployee() {
//         require(employees[msg.sender], "Only registered employees can call this function");
//         _;
//     }
    
//     // Function for the manager to add new employees
//     function addEmployee(address employeeAddress) public onlyManager {
//         employees[employeeAddress] = true;
//     }
    
//     // Function for the manager to remove employees
//     function removeEmployee(address employeeAddress) public onlyManager {
//         employees[employeeAddress] = false;
//     }

//     function getBalance() public view returns(uint)  {
//         return address(this).balance;
//     }

//     function getAllEmployees() public view returns (address[] memory) {
//         return employeeList;
//     }
    
//     // Function for an employee to check their health and temperature values
//     function checkValues(uint256 health, uint256 temperature) public onlyEmployee {
//         if (health == 0 && temperature == 0) {
//             payable(msg.sender).transfer(address(this).balance); // Send the funds to the employee
//         }
//     }
    
//     // Fallback function to receive funds
//     receive() external payable {}
    
//     // Function for the manager to withdraw funds from the contract
//     function withdrawFunds() public onlyManager {
//         manager.transfer(address(this).balance);
//     }
// }
