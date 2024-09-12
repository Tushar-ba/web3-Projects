import { ethers } from 'ethers';
import React, { useState } from 'react';
import axios from 'axios'; // Make sure to import axios if you're using it
import { NotaryAddress, NotaryABI } from '../utils/contractABI';

const Notary = () => {
    
    const [signer, setSigner] = useState("");
    // const [address, setAddress] = useState("Connect to MetaMask"); // Declare the address state variable
    const [modAddress, setModAddress] = useState("");
    const [modList, setModList] = useState([]);
    const [form, setForm] = useState({
        ipfsHash: "",
        address: "",
        file: null // Add this if you are handling file input
    });
    const [ipfsString, setIpfsString] = useState('');
        const [signerAddress, setSignerAddress] = useState('');
        const [message, setMessage] = useState('');

    const handleUpload = async () => {
        if (form.file) {
            const formData = new FormData();
            formData.append("file", form.file);
            const metadata = JSON.stringify({
                keyvalues: {
                    address: form.address
                }
            });
            formData.append("pinataMetadata", metadata);
    
            try {
                const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                    maxBodyLength: "Infinity",
                    headers: {
                        pinata_api_key: "f14137b11e39ab599e37",
                        pinata_secret_api_key:"7fd81dfa0c6fa481a957d360e0565fd04ae1534122a7346288e040e2834fd1f3",
                    },
                });
                const ipfsHash = res.data.IpfsHash;
                console.log("IPFS Hash:", ipfsHash);
                setForm((prevForm) => ({ ...prevForm, ipfsHash: ipfsHash }));
                return ipfsHash;
            } catch (err) {
                console.error("Error uploading file to Pinata:", err);
            }
        }
    };

    // const connectToMetaMask = async () => {
    //     try {
    //         if (window.ethereum) {
    //             const provider = new ethers.BrowserProvider(window.ethereum);
    //             await provider.send('eth_requestAccounts', []);
    //             const signer = await provider.getSigner();
    //             const address = await signer.getAddress();
    //             setAddress(address); // Update the address state
    //             console.log(address);
    //         } else {
    //             console.log("Please install MetaMask");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const addMod = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(
                NotaryAddress,
                NotaryABI,
                signer
            );
            const add = await contract.addMods(modAddress);
            console.log("Mod added:", add);
        } catch (err) {
            console.log(`Error adding mod: ${err}`);
        }
    };

    const deleteMod = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(
                NotaryAddress,
                NotaryABI,
                signer
            );
            const del = await contract.deleteMod(modAddress);
            console.log("Mod deleted:", del);
        } catch (err) {
            console.log(`Error deleting mod: ${err}`);
        }
    };

    const retrievingMod = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(
                NotaryAddress,
                NotaryABI,
                signer
            );
            const ret = await contract.moddersList();
            setModList(ret);
        } catch (err) {
            console.log(`Error retrieving mod: ${err}`);
        }
    };

    const handleFileChange = (e) => {
        setForm({ ...form, file: e.target.files[0] });
    };

    const handleAddressChange = (e) => {
        setForm({ ...form, address: e.target.value });
    };

        const attestDoc = async () => {
            if (!ipfsString || !signerAddress) {
                setMessage('Please provide both IPFS string and signer address.');
                return;
            }
    
            try {
                // Connect to Ethereum provider
                if (window.ethereum) {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    await provider.send('eth_requestAccounts', []);
                    const signer = await provider.getSigner();
    
                    // Create contract instance
                    const contract = new ethers.Contract(NotaryAddress, NotaryABI, signer);
    
                    // Call the attestDoc function
                    const tx = await contract.attestDoc(ipfsString, signerAddress);
                    await tx.wait(); // Wait for the transaction to be mined
    
                    setMessage('Document attested successfully!');
                } else {
                    setMessage('Please install MetaMask!');
                }
            } catch (error) {
                console.error('Error attesting document:', error);
                setMessage(`Error: ${error.message}`);
            }
        };

    return (
        <div>
            {/* <button onClick={connectToMetaMask}>{address}</button> */}
            <input
                type="text"
                value={modAddress}
                onChange={(e) => setModAddress(e.target.value)}
                placeholder="Mod Address"
            />
            <button onClick={addMod}>Add Mod</button>

            <input
                type="text"
                value={modAddress}
                onChange={(e) => setModAddress(e.target.value)}
                placeholder="Mod Address"
            />
            <button onClick={deleteMod}>Delete Mod</button>

            <button onClick={retrievingMod}>Retrieve Mod</button>
            <h1>Mod List: {modList.join(", ")}</h1>

            <form>
                <div>
                    <label htmlFor="file">Choose file:</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleAddressChange}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleUpload}
                >
                    Upload
                </button>
            </form>
            {form.ipfsHash && (
                <div>
                    <p>IPFS Hash: {form.ipfsHash}</p>
                </div>
            )}


            <div>
            <h1>Attest Document</h1>
            <input
                type="text"
                placeholder="IPFS String"
                value={ipfsString}
                onChange={(e) => setIpfsString(e.target.value)}
            />
            <input
                type="text"
                placeholder="Signer Address"
                value={signerAddress}
                onChange={(e) => setSignerAddress(e.target.value)}
            />
            <button onClick={attestDoc}>Attest Document</button>
            {message && <p>{message}</p>}
        </div>
        </div>
    );
};


export default Notary;