'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { MusicNFT__factory } from '../contracts/typechain-types';

interface SongMetadata {
  title: string;
  artist: string;
  ipfsHash: string;
  releaseDate: number;
}

export default function MusicNFTComponent() {
  const [account, setAccount] = useState<string>('');
  const [metadata, setMetadata] = useState<SongMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isMinted, setIsMinted] = useState(false);

  // Dirección del contrato NFT desplegado en Base
  const contractAddress = "0xFbae28C67F155a38f75fce5C247AbA69065a69BF";

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        console.log("Asegúrate de tener MetaMask instalado!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        setAccount(accounts[0]);
        await fetchMetadata();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        alert("¡Necesitas MetaMask para usar esta aplicación!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      await fetchMetadata();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMetadata = async () => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(contractAddress, MusicNFT.abi, provider);
        
        const metadata = await contract.getSongMetadata(1); // Asumiendo que el tokenId es 1
        setMetadata({
          title: metadata[0],
          artist: metadata[1],
          ipfsHash: metadata[2],
          releaseDate: metadata[3].toNumber()
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const purchaseNFT = async () => {
    try {
      setLoading(true);
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, MusicNFT.abi, signer);

        const tx = await contract.purchaseNFT(1); // Asumiendo que el tokenId es 1
        await tx.wait();
        
        alert("¡Felicidades! Has comprado el NFT exitosamente.");
        await fetchMetadata();
      }
    } catch (error) {
      console.log(error);
      alert("Error al comprar el NFT. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            {!account ? (
              <button
                onClick={connectWallet}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Conectar Wallet
              </button>
            ) : (
              <div className="space-y-6">
                {metadata ? (
                  <>
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900">{metadata.title}</h2>
                      <p className="mt-2 text-xl text-gray-600">{metadata.artist}</p>
                    </div>
                    
                    <div className="mt-8">
                      <audio controls className="w-full">
                        <source src={`https://ipfs.io/ipfs/${metadata.ipfsHash}`} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                      </audio>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={purchaseNFT}
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
                      >
                        {loading ? "Procesando..." : "Comprar NFT por 1 USDC"}
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-600">Cargando metadatos...</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 