// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ILayerZeroEndpoint {
    struct LzMessageParams {
        uint16 dstChainId;
        bytes destination;
        bytes payload;
        address payable refundAddress;
        address zroPaymentAddress;
        bytes adapterParams;
    }

    function send(
        LzMessageParams calldata params
    ) external payable;

    function receivePayload(
        uint16 srcChainId,
        bytes calldata srcAddress,
        address dstAddress,
        uint64 nonce,
        uint gasLimit,
        bytes calldata payload
    ) external;
} 