import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from "./utils/contractABI";
import {NotaryAddress,NotaryABI} from "./utils/contractABI"
// import {web3} from 'web3.js'

const App = () => {
  const [agreementId, setAgreementId] = useState('');
  const [title, setTitle] = useState('');
  const [terms, setTerms] = useState('');
  const [party1, setParty1] = useState('');
  const [party2, setParty2] = useState('');
  const [signature, setSignature] = useState('');

  const createAgreement = async () => {
    try {
      // Check if the Ethereum provider is available
      if (!window.ethereum) {
        console.error('MetaMask is not installed or not enabled');
        return;
      }

      // Create a new BrowserProvider
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []); // Request account access
      const signer = await provider.getSigner(); // Get the signer

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Convert agreementId to bytes32 format
      const agreementIdBytes = ethers.encodeBytes32String(agreementId);
   
      const tx = await contract.createAgreement(
        agreementIdBytes,
        title,
        terms,
        party1,
        party2
      );
      await tx.wait(); // Wait for the transaction to be mined
      console.log('Agreement created:', tx.hash);
    } catch (error) {
      console.error('Error creating agreement:', error);
    }
  };

  const signAgreement = async () => {
    try {
      if (!window.ethereum) {
        console.error('MetaMask is not installed or not enabled');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const agreementIdBytes = ethers.encodeBytes32String(agreementId);

      const tx = await contract.signAgreement(agreementIdBytes, signature);
      await tx.wait();
      console.log('Agreement signed:', tx.hash);
    } catch (error) {
      console.error('Error signing agreement:', error);
    }
  };
  // const text = ethers.decodeBytes32String(0x2b5ca32c30bdaa102bcca52f5a37d1d1600d10c930ea33cbddd023ac2e3a262f)
  //console.log(text)

  

  const verifyTheSign = async () => {
    try {
      if (!window.ethereum) {
        console.error('MetaMask is not installed or not enabled');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const agreementIdBytes = ethers.encodeBytes32String(agreementId);

      const signed = await contract.verifySignatures(agreementIdBytes);
      console.log('Agreement signed:', signed);
    } catch (error) {
      console.error('Error verifying:', error);
    }
  };

  const getAgree = async () => {
    try {
      if (!window.ethereum) {
        console.error('MetaMask is not installed or not enabled');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const agreementIdBytes = ethers.encodeBytes32String(agreementId);

      const signed = await contract.getAgreement(agreementIdBytes);
      console.log('Agreement signed:', signed);
    } catch (error) {
      console.error('Error verifying:', error);
    }
  };


  return (
    <div>
      <h1>Notary</h1>
      <input
        type="text"
        placeholder="Agreement ID"
        value={agreementId}
        onChange={(e) => setAgreementId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Terms"
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
      />
      <input
        type="text"
        placeholder="Party 1 Address"
        value={party1}
        onChange={(e) => setParty1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Party 2 Address"
        value={party2}
        onChange={(e) => setParty2(e.target.value)}
      />
      <button onClick={createAgreement}>Create Agreement</button>
      <hr />
      <input
        type="text"
        placeholder="Signature"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
      />

      <button onClick={signAgreement}>Sign Agreement</button>
      <h1>Verify</h1>
      <input
        type="text"
        placeholder="Signature"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
      />
      <button onClick={verifyTheSign}>Verify Signatures</button>
      <input
        type="text"
        placeholder="Signature"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
      />
      <button onClick={getAgree}>get Details</button>
    </div>
  );
};

export default App;