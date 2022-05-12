//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Lottery {
    event NewPlayerAdd(address _player);
    event Winner(address _winner);
    address payable[] public players;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Nops, only the owner");
        _;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function enter() external payable {
        require(msg.value == 0.025 ether, "Fail. Send the right amount");
        players.push(payable(msg.sender));
        emit NewPlayerAdd(msg.sender);
    }

    function pickWinner(string memory _secretWord) external onlyOwner {
        require (players.length >= 3);
        address payable winner;
        uint number = pseudoRandomNumber(_secretWord);
        uint index = number % players.length;
        winner = players[index];
        uint managerFee = (getBalance() * 10 ) / 100;
        uint winnerPrize = (getBalance() * 90 ) / 100;

        (bool success,) = winner.call{value:winnerPrize}("");
        require(success, "Failed");
        (bool sent,) = payable(owner).call{value:managerFee}("");
        require(sent, "Failed");
        players = new address payable[](0);
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
