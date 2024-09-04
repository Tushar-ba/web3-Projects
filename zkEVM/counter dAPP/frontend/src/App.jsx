import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Address, counterABI } from './ABI/CounterABI'; // Ensure correct import
import './App.css';

const Counter = () => {
  const [currentCount, setCurrentCount] = useState(0);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connect,setConnect]= useState("Connect")

  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create a provider and signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        console.log(address);
        setIsConnected(true);
        setConnect("Connected");
        setProvider(provider);
        setSigner(signer);
        
        // Optionally, set up your contract instance here
        const contract = new ethers.Contract(Address, counterABI, signer);
        setContract(contract);
        
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };
  
  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const _provider = new ethers.BrowserProvider(window.ethereum);
          
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const _signer = await _provider.getSigner();
          const _contract = new ethers.Contract(Address, counterABI, _signer);

          setProvider(_provider);
          setSigner(_signer);
          setContract(_contract);
          setIsConnected(true);

          // Check if we're on the correct network
          const network = await _provider.getNetwork();
          console.log("Connected to network:", network);
          if (network.chainId !== 1) { // Assuming you want to be on Ethereum mainnet
            alert('Please switch to Ethereum mainnet');
          }

          // Listen for account changes
          window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
              setIsConnected(false);
            } else {
              setIsConnected(true);
              getCurrentCount(); // Fetch count when account changes
            }
          });

        } catch (error) {
          console.error("Failed to connect to MetaMask", error);
          alert('Failed to connect to MetaMask. Please check your wallet and try again.');
        }
      } else {
        alert('Please install MetaMask!');
      }
    };

    init();

    // Cleanup function
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  const incrementCounter = async () => {
    if (!contract) return;

    setLoading(true);
    try {
      const tx = await contract.increment();
      await tx.wait();
      alert('Counter incremented!');
      getCurrentCount(); // Fetch the updated count
    } catch (error) {
      console.error("Failed to increment counter", error);
      alert('Failed to increment counter. Please check your wallet and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentCount = async () => {
    if (!contract) return;

    try {
      const count = await contract.retrive(); // Fixed typo here
      setCurrentCount(count.toString());
    } catch (error) {
      console.error("Failed to retrieve current count", error);
      alert('Failed to retrieve current count. Please check your connection and try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>

      <button onClick={connectToMetamask}>{connect}</button>
      <h1>Counter DApp</h1>
      {isConnected ? (
        <>
          <p>Current Count: {currentCount}</p>
          <button onClick={incrementCounter} disabled={loading}>
            {loading ? "Loading..." : "Increment Counter"}
          </button>
          <button onClick={getCurrentCount}>Get Current Count</button>
        </>
      ) : (
        <p>Please connect your MetaMask wallet to use this DApp.</p>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Counter />
    </div>
  );
};

export default App;