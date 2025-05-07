// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/ILayerZeroEndpoint.sol";

contract OmniExecutor {
    ILayerZeroEndpoint public immutable lzEndpoint;
    address public immutable solanaProgram;
    mapping(uint16 => bool) public supportedChains;
    mapping(uint64 => bool) public processedNonces;

    event ActionExecuted(
        uint16 srcChainId,
        bytes srcAddress,
        uint64 nonce,
        bytes payload
    );

    constructor(
        address _lzEndpoint,
        address _solanaProgram
    ) {
        lzEndpoint = ILayerZeroEndpoint(_lzEndpoint);
        solanaProgram = _solanaProgram;
    }

    function setSupportedChain(uint16 chainId, bool supported) external {
        supportedChains[chainId] = supported;
    }

    function lzReceive(
        uint16 srcChainId,
        bytes calldata srcAddress,
        uint64 nonce,
        bytes calldata payload
    ) external {
        require(msg.sender == address(lzEndpoint), "OmniExecutor: invalid endpoint");
        require(supportedChains[srcChainId], "OmniExecutor: unsupported chain");
        require(!processedNonces[nonce], "OmniExecutor: duplicate nonce");

        // Verify the message came from our Solana program
        // In a real implementation, we would verify the srcAddress matches our Solana program
        // For now, we'll just check if it's not empty
        require(srcAddress.length > 0, "OmniExecutor: invalid source");

        processedNonces[nonce] = true;

        // Execute the action (mock implementation)
        // In a real implementation, this would decode and execute the actual action
        emit ActionExecuted(srcChainId, srcAddress, nonce, payload);
    }

    function sendCrossChainMessage(
        uint16 dstChainId,
        bytes calldata destination,
        bytes calldata payload
    ) external payable {
        require(supportedChains[dstChainId], "OmniExecutor: unsupported chain");

        ILayerZeroEndpoint.LzMessageParams memory params = ILayerZeroEndpoint.LzMessageParams({
            dstChainId: dstChainId,
            destination: destination,
            payload: payload,
            refundAddress: payable(msg.sender),
            zroPaymentAddress: address(0),
            adapterParams: ""
        });

        lzEndpoint.send{value: msg.value}(params);
    }
} 