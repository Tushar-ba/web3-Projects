//SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

contract Counter{
     uint256 currentCount = 0;
     
     function increment () public{
        currentCount += 1;
     }

     function retrive( ) public view returns(uint256){
        return currentCount;
     }
       

}