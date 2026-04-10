// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenFaucet {
    uint256 public amountAllowed = 100 ether;
    IERC20 public immutable token;
    mapping(address => bool) public requestedAddress;

    event SendToken(address indexed receiver, uint256 amount);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    function requestTokens() external {
        require(!requestedAddress[msg.sender], "Can't request multiple times");
        require(
            token.balanceOf(address(this)) >= amountAllowed,
            "Faucet empty"
        );

        requestedAddress[msg.sender] = true;

        bool success = token.transfer(msg.sender, amountAllowed);
        require(success, "Transfer failed");

        emit SendToken(msg.sender, amountAllowed);
    }
}
