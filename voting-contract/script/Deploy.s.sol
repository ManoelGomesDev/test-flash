// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {VotingContract} from "../src/VotingContract.sol";

contract DeployScript is Script {
    function run() external returns (VotingContract) {

    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    vm.startBroadcast(deployerPrivateKey);
    VotingContract votingContract = new VotingContract();
    vm.stopBroadcast();
    return votingContract;
    }
}
