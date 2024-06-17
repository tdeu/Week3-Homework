import { viem } from "hardhat";

function stringToBytes32(str: string): string {
  const bytes = Buffer.from(str, 'utf8');
  if (bytes.length > 32) {
    throw new Error('String is too long to convert to bytes32');
  }
  const byteArray = Array.from(bytes);
  while (byteArray.length < 32) {
    byteArray.push(0);
  }
  return '0x' + byteArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

async function main() {
  const publicClient = await viem.getPublicClient();
  const [deployer] = await viem.getWalletClients();

  // Define proposal names and target block number
  const proposalNames = ["Proposal 1", "Proposal 2", "Proposal 3"].map(name => stringToBytes32(name));
  const targetBlockNumber = 1000; // Set your target block number here
  const tokenContractAddress = '0x647EeA6fEB854E4CD7453D45F63E105ae211E2aD'; // Your token contract address

  // Deploy TokenizedBallot contract
  const tokenizedBallot = await viem.deployContract("TokenizedBallot", [proposalNames, tokenContractAddress, targetBlockNumber]);
  console.log(`TokenizedBallot contract deployed at ${tokenizedBallot.address} at block ${targetBlockNumber}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
