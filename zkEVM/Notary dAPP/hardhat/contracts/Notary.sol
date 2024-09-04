//SPDX-License-Identifier: MIT 
pragma solidity 0.8.19;

contract Notary{
    // letting users write conditions and sign the document
    struct Agreement{
    bytes32 id;
    string title;
    string terms;
    address party1;
    address party2;
    bool signed1;
    bool signed2;
    }
    mapping (bytes32 =>Agreement) private agreements;
    mapping (bytes32 =>mapping (address=>bytes)) private signatures;

    event AgreementCreated(bytes32 indexed id, string title, string terms, address party1, address party2);
    event AgreementSigned(bytes32 indexed id, address signer);

    function createAgreement(bytes32 _id, string memory _title, string memory _terms, address _party1, address _party2) public{
        require(_party1 != address(0) && _party2 != address(0),"Invalid party address");
        require(_party1 != _party2,"boht the address should be different");
        require(agreements[_id].party1 == address(0), "Agreement already exists");

        agreements[_id] = Agreement({
            id: _id,
            title: _title,
            terms: _terms,
            party1: _party1,
            party2: _party2,
            signed1: false,
            signed2: false
        });
        emit AgreementCreated(_id, _title, _terms, _party1, _party2);
    }

    function signAgreement(bytes32 _id, bytes memory _signature) public{
        Agreement storage agreement = agreements[_id];
        require(agreement.id !=0,"Agreement not found");
         if (msg.sender == agreement.party1) {
            require(!agreement.signed1, "Party 1 has already signed");
            agreement.signed1 = true;
        } else if (msg.sender == agreement.party2) {
            require(!agreement.signed2, "Party 2 has already signed");
            agreement.signed2 = true;
        } else {
            revert("You are not a party to this agreement");
        }

        signatures[_id][msg.sender] = _signature;
        emit AgreementSigned(_id, msg.sender);
    }

    function verifySignatures(bytes32 _id) public view returns (bool){
        Agreement storage agreement = agreements[_id];
        require(agreement.id !=0,"Agreement not found");
        return agreement.signed1 && agreement.signed2;
    }

    function getAgreement(bytes32 _id) public view returns (
        string memory title,
        string memory terms,
        address party1,
        address party2,
        bool signed1,
        bool signed2
    ) {
        Agreement storage agreement = agreements[_id];
        require(agreement.id != 0, "Agreement not found");

        return (
            agreement.title,
            agreement.terms,
            agreement.party1,
            agreement.party2,
            agreement.signed1,
            agreement.signed2
        );
    }
    function getSignature(bytes32 _id, address _signer) public view returns (bytes memory) {
        return signatures[_id][_signer];
    }


    
}