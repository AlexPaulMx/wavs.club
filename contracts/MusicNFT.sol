// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MusicNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Precio del NFT en USDC (1 USDC = 1e6)
    uint256 public constant PRICE = 1e6;
    
    // Dirección del contrato USDC (esto debe ser configurado según la red)
    address public usdcToken;

    // Estructura para almacenar los metadatos de la canción
    struct SongMetadata {
        string title;
        string artist;
        string ipfsHash;
        uint256 releaseDate;
    }

    // Mapeo de tokenId a metadatos
    mapping(uint256 => SongMetadata) public songMetadata;

    // Evento para cuando se crea un nuevo NFT
    event SongNFTMinted(uint256 indexed tokenId, string title, string artist);

    constructor(address _usdcToken) ERC721("MusicNFT", "MNFT") {
        usdcToken = _usdcToken;
    }

    // Función para crear un nuevo NFT musical
    function mintSongNFT(
        string memory title,
        string memory artist,
        string memory ipfsHash
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        
        songMetadata[newTokenId] = SongMetadata({
            title: title,
            artist: artist,
            ipfsHash: ipfsHash,
            releaseDate: block.timestamp
        });

        emit SongNFTMinted(newTokenId, title, artist);
        return newTokenId;
    }

    // Función para comprar el NFT
    function purchaseNFT(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == owner(), "NFT not available for purchase");

        // Transferir USDC del comprador al vendedor
        IERC20(usdcToken).transferFrom(msg.sender, owner(), PRICE);

        // Transferir el NFT al comprador
        _transfer(owner(), msg.sender, tokenId);
    }

    // Función para obtener los metadatos de una canción
    function getSongMetadata(uint256 tokenId) public view returns (
        string memory title,
        string memory artist,
        string memory ipfsHash,
        uint256 releaseDate
    ) {
        require(_exists(tokenId), "Token does not exist");
        SongMetadata memory metadata = songMetadata[tokenId];
        return (metadata.title, metadata.artist, metadata.ipfsHash, metadata.releaseDate);
    }
} 