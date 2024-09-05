export const contractAddress ="0x11afc305a8A2A20b00369842B8d3DF091b642696"
export const NotaryAddress ="0x4C033EB7Baf936cF2FFED08D1C948106641095cf";
export const NotaryABI=[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_mod",
        "type": "address"
      }
    ],
    "name": "addMods",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_ipfsString",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_signer",
        "type": "address"
      }
    ],
    "name": "attestDoc",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_mod",
        "type": "address"
      }
    ],
    "name": "deleteMod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "moddersList",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "_moddersList",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_signer",
        "type": "address"
      }
    ],
    "name": "retrieveDocs",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "ipfsString",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "signer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct NotaryUpgraded.DocDetails[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
export const contractABI =  [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "terms",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "party1",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "party2",
            "type": "address"
          }
        ],
        "name": "AgreementCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "signer",
            "type": "address"
          }
        ],
        "name": "AgreementSigned",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_id",
            "type": "bytes32"
          },
          {
            "internalType": "string",
            "name": "_title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_terms",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_party1",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_party2",
            "type": "address"
          }
        ],
        "name": "createAgreement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_id",
            "type": "bytes32"
          }
        ],
        "name": "getAgreement",
        "outputs": [
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "terms",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "party1",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "party2",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "signed1",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "signed2",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_id",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "_signer",
            "type": "address"
          }
        ],
        "name": "getSignature",
        "outputs": [
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_id",
            "type": "bytes32"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "signAgreement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_id",
            "type": "bytes32"
          }
        ],
        "name": "verifySignatures",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]