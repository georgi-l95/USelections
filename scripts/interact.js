const hre = require("hardhat");
const USElection = require("../artifacts/contracts/USElection.sol/USElection.json");

const run = async function () {
  const provider = new hre.ethers.providers.InfuraProvider(
    "ropsten",
    "40c2813049e44ec79cb4d7e0d18de173"
  );

  const wallet = new hre.ethers.Wallet(
    "796e2930429e8606d9b4e3a635b649e31909413245097056d87bab9ae3bf098c",
    provider
  );
  const electionContract = new hre.ethers.Contract(
    "0x3795176A3F6AC5452320d15C1412e4e041dB3722",
    USElection.abi,
    wallet
  );

  const transactionSofia = await electionContract.submitStateResult([
    "Sofia",
    250,
    150,
    24,
  ]);
  const transactionReciept = await transactionSofia.wait();
  if (transactionReciept.status != 1) {
    console.log("Transaction was not successfull");
    return;
  }
  const resultSubmittedSofia = await electionContract.resultsSubmitted("Sofia");
  console.log(`Result submitted for Sofia: ${resultSubmittedSofia}`);

  const currentLeader = await electionContract.currentLeader();
  console.log(`Current Leader is ${currentLeader}`);
};

run();
//npx hardhat run --network localhost scripts/interact.js
