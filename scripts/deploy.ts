import { ethers, network } from "hardhat";

async function main() {
  // Dirección del contrato USDC en Base
  const usdcAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

  console.log("Desplegando MusicNFT...");
  const MusicNFT = await ethers.getContractFactory("MusicNFT");
  const musicNFT = await MusicNFT.deploy(usdcAddress);

  await musicNFT.deployed();

  console.log("MusicNFT desplegado en:", musicNFT.address);
  console.log("Red:", network.name);
  console.log("Dirección USDC:", usdcAddress);

  // Mintear el NFT con los metadatos de la canción
  console.log("Minteando el NFT...");
  const tx = await musicNFT.mintSongNFT(
    "Tu Canción", // Título de la canción
    "Tu Nombre", // Nombre del artista
    "bafybeicv2qmrx57gvdetijwrcjh3bqggs5cxe4ztokjbped2zdkkpb26zy" // CID de la canción
  );
  await tx.wait();
  console.log("NFT minteado exitosamente!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 