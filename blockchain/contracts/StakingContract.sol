// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";

contract StakingContract is ERC20, Ownable {
    using SafeMath for uint256;

    constructor(address owner) ERC20("TEST", "TST") {
        _mint(owner, 1000000000000);
    }

    address[] internal stakeholders;

    mapping(address => uint256) internal stakes;

    mapping(address => uint256) internal rewards;

    uint256 deadline;

    function isStakeHolder(address add) public view returns (bool, uint256) {
        for (uint256 i = 0; i < stakeholders.length; i++) {
            if (stakeholders[i] == add) return (true, i);
        }
        return (false, 0);
    }

    function addStakeHolder(address stakeholder) public {
        (bool isHolder, ) = isStakeHolder(stakeholder);
        if (!isHolder) stakeholders.push(stakeholder);
    }

    function removeStakeHolder(address stakeholder) public {
        (bool isHolder, uint256 pos) = isStakeHolder(stakeholder);
        if (isHolder) {
            stakeholders[pos] = stakeholders[stakeholders.length - 1];
            stakeholders.pop();
        }
    }

    function getStakeOfHolder(address stakeholder)
        public
        view
        returns (uint256)
    {
        return stakes[stakeholder];
    }

    function totalStakes() public view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < stakeholders.length; i++) {
            total += stakes[stakeholders[i]];
        }
        return total;
    }

    function createStake(uint256 stake) public {
        // create stake
        _burn(msg.sender, stake);
        if (stakes[msg.sender] == 0) addStakeHolder(msg.sender);
        stakes[msg.sender] += stake * 2;
    }

    function removeStake(uint256 stake) public {
        stakes[msg.sender] -= stake * 2;
        if (stakes[msg.sender] == 0) removeStakeHolder(msg.sender);
        _burn(msg.sender, stake);
    }

    function getRewardOf(address holder) public view returns (uint256) {
        return rewards[holder];
    }

    function totalRewards() public view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < stakeholders.length; i++) {
            total += rewards[stakeholders[i]];
        }
        return total;
    }

    function calculateReward(address stakeholder)
        public
        view
        returns (uint256)
    {
        return rewards[stakeholder];
    }

    function distributeRewards() public onlyOwner {
        for (uint256 i = 0; i < stakeholders.length; i++) {
            address stakeholder = stakeholders[i];
            uint256 reward = calculateReward(stakeholder);
            rewards[stakeholder] = rewards[stakeholder].add(reward);
        }
    }

    function getReward() public {
        //require(block.timestamp >= now + (7 * 1 days));
        uint256 reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        _mint(msg.sender, reward);
    }

    function withdrawRewards() public {
        uint256 reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        _mint(msg.sender, reward);
    }
}
