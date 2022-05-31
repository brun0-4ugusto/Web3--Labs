//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

interface ILabCoin{
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}