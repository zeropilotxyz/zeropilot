// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/OmniExecutor.sol";
import "../src/interfaces/ILayerZeroEndpoint.sol";

contract MockLzEndpoint is ILayerZeroEndpoint {
    function send(LzMessageParams calldata) external payable {}

    function receivePayload(
        uint16,
        bytes calldata,
        address,
        uint64,
        uint,
        bytes calldata
    ) external {}
}

contract OmniExecutorTest is Test {
    OmniExecutor public executor;
    MockLzEndpoint public mockEndpoint;
    address public solanaProgram;

    function setUp() public {
        mockEndpoint = new MockLzEndpoint();
        solanaProgram = address(0x1234);
        executor = new OmniExecutor(address(mockEndpoint), solanaProgram);
    }

    function testSetSupportedChain() public {
        executor.setSupportedChain(1, true);
        assertTrue(executor.supportedChains(1));
        
        executor.setSupportedChain(1, false);
        assertFalse(executor.supportedChains(1));
    }

    function testLzReceive() public {
        executor.setSupportedChain(1, true);
        
        bytes memory srcAddress = abi.encodePacked(solanaProgram);
        bytes memory payload = "test payload";
        
        vm.prank(address(mockEndpoint));
        executor.lzReceive(1, srcAddress, 1, payload);
        
        assertTrue(executor.processedNonces(1));
    }

    function testLzReceiveInvalidEndpoint() public {
        executor.setSupportedChain(1, true);
        
        bytes memory srcAddress = abi.encodePacked(solanaProgram);
        bytes memory payload = "test payload";
        
        vm.prank(address(0x123));
        vm.expectRevert("OmniExecutor: invalid endpoint");
        executor.lzReceive(1, srcAddress, 1, payload);
    }

    function testLzReceiveUnsupportedChain() public {
        bytes memory srcAddress = abi.encodePacked(solanaProgram);
        bytes memory payload = "test payload";
        
        vm.prank(address(mockEndpoint));
        vm.expectRevert("OmniExecutor: unsupported chain");
        executor.lzReceive(1, srcAddress, 1, payload);
    }
} 