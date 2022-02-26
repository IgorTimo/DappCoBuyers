//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SHA256{
    bytes32 public hash;


    function setHash(bytes32 _hash) public {
        console.log(">>>>>>>>>>>>>>>>>>>");
        console.logBytes32(hash);
        hash = _hash;
        console.log(">>>>>>>>>>>>>>>>>>>");
        console.logBytes32(hash);
        
    }

}