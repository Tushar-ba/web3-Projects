// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20{
constructor(string memory name, string memory symbol)ERC20(name,symbol){
    _mint(msg.sender,10000*10**18);
}
}

contract Uniswap{

    string [] public token = ['CoinA','CoinB', 'CoinC'];
    mapping(string => ERC20) public tokenInstanceMap;
    uint ethValue = 100000000000000;
    constructor(){
        for(uint i=0; i<token.length;i++){
            CustomToken tokens = new CustomToken(token[i],token[i]);
            tokenInstanceMap[token[i]] = tokens;
        }
    }
    function getBalance(string memory tokenName, address _address) public view returns(uint balance){
        return tokenInstanceMap[tokenName].balanceOf(_address);
    }
    function getName(string memory tokenName) public view returns(string memory){
        return tokenInstanceMap[tokenName].name();
    }
    function getTokenAddress(string memory tokenName) public view returns(address){
        return address(tokenInstanceMap[tokenName]);
    }
    function swapEthToToken(string memory tokenName) public payable returns(uint) {
        uint inputValue = msg.value;
        uint outputValue = (inputValue/ethValue) * 10 ** 18;
        require(tokenInstanceMap[tokenName].transfer(msg.sender,outputValue));
        return outputValue;
    }

    function swapTokenToEth(string memory tokenName, uint _amount) public returns(uint){
        uint exactAmount = _amount / 10 ** 18;
        uint ethToBeTransferred = exactAmount *ethValue;
        require(address(this).balance>=ethToBeTransferred,"Dex is running low on balance");
        payable(msg.sender).transfer(ethToBeTransferred);
        require(tokenInstanceMap[tokenName].transferFrom(msg.sender,address(this),_amount));
        return ethToBeTransferred;
    }
    function swapTokenToToken(string memory srcTokenName, string memory destTokenName, uint amount) public {
        require(tokenInstanceMap[srcTokenName].transferFrom(msg.sender,address(this),_amount));
        require(tokenInstanceMap[destTokenName].transfer(msg.sender,_amount));
    }
}

