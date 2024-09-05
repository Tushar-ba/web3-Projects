//SPDX-License-Identifier: MIT 
pragma solidity 0.8.19;

contract NotaryUpgraded {
    struct DocDetails{
        string ipfsString;
        address signer;
        uint256 timestamp;
    }
    address private admin;
    address[] private modders; 

    constructor (){
        admin = msg.sender;
    } 
    
    mapping (address=>DocDetails[]) private owner;
    mapping (address => bool) private Modders;

    modifier onlyOwner(){
        require(admin == msg.sender,"Only admin can perform this action");
        _;
    }
    modifier onlyModder(){
        require(isModder(msg.sender),"only modders can sign");
        _;
    }

    function addMods(address _mod)public onlyOwner{
        Modders[_mod] = true;
        modders.push(_mod);
    }
    
    function deleteMod(address _mod) public onlyOwner{
        require(Modders[_mod],"ownership does not exist");
        delete Modders[_mod];
        for(uint i=0;i<modders.length;i++){
            if(modders[i]==_mod){
                modders[i]=modders[modders.length-1];
                modders.pop();
                break;
            }
        }
    }

    function moddersList() public view returns(address[] memory _moddersList){
        return  modders;
    }

    function isModder(address _mod) internal view returns (bool) {
    for (uint i = 0; i < modders.length; i++) {
        if (modders[i] == _mod) {
            return true;
        }
    }
    return false;
}

function attestDoc(string memory _ipfsString, address _signer) public onlyModder {
    DocDetails memory newDoc = DocDetails({
        ipfsString: _ipfsString,
        signer: _signer,
        timestamp: block.timestamp
    });
    owner[_signer].push(newDoc);
}


    function retrieveDocs(address _signer) public view returns (DocDetails[] memory) {
        return owner[_signer];
    }
}