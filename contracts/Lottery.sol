//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./ILabCoin.sol";
contract Lottery {
    event NewPlayerAdd(address _player);
    event Winner(address _winner);
    address[] public players;
    address public owner;
    ILabCoin public labCoin;

    constructor(address _labCoin) {
        owner = msg.sender;
        labCoin = ILabCoin(_labCoin);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Nops, only the owner");
        _;
    }

    function getBalance() public view returns (uint256) {
        return labCoin.balanceOf(address(this));
    }

    function enter() external {
        labCoin.transfer(address(this), 200);
        players.push(msg.sender);
        emit NewPlayerAdd(msg.sender);
    }

    function pickWinner(string memory _secretWord) external onlyOwner {
        require (players.length >= 3);
        uint _balance = getBalance();
        
        uint number = pseudoRandomNumber(_secretWord);
        uint index = number % players.length;
        address winner = players[index];
        uint managerFee = (_balance * 10 ) / 100;
        uint winnerPrize = (_balance * 90 ) / 100;

        labCoin.transfer(winner, winnerPrize);
        labCoin.transfer(owner, managerFee);
        
        players = new address[](0);
        emit Winner(winner);
        
    }

    function pseudoRandomNumber(string memory _secretWord)
        internal
        view
        returns (uint256)
    {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        players.length,
                        _secretWord
                    )
                )
            );
    }
}
