import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deployGovernanceToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer, user1 } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying GovernanceToken and waiting for confirmations...");
  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  const [owner, addr1, addr2] = await ethers.getSigners();
  // const gToken = await ethers.getContractFactory("GovernanceToken");
  // const governanceToken = await gToken.deploy();

  // await governanceToken.deployed();

  log(`GovernanceToken at ${governanceToken.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(governanceToken.address, []);
  }
  const governanceTokenContract = await ethers.getContractAt(
    "GovernanceToken",
    governanceToken.address,
    owner
  );
  console.log("minting!");
  let mint1 = await governanceTokenContract.mint(deployer, 100000000000000);
  mint1.wait(1);
  console.log("Done minting!");
  // console.log('deployer');
  // console.log(deployer);
  // console.log(mint1);
  // console.log("minting!");
  // let mint2 = await governanceTokenContract
  //   .connect(addr1)
  //   .mint(user1, 100000000000000, ethers.provider);
  // mint2.wait(1);
  // console.log("minting!");
  // console.log('user1');
  // console.log(user1);
  // console.log(mint2);
  log(`Delegating to ${deployer}`);
  await delegate(governanceToken.address, deployer, owner);
  // await delegate(governanceToken.address, deployer, addr1);
  log("Delegated!");
};

const delegate = async (
  governanceTokenAddress: string,
  delegatedAccount: string,
  obj: any
) => {
  const governanceToken = await ethers.getContractAt(
    "GovernanceToken",
    governanceTokenAddress,
    obj
  );
  const transactionResponse = await governanceToken
    .connect(obj)
    .delegate(delegatedAccount);
  await transactionResponse.wait(1);
  console.log(
    `Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`
  );
};

export default deployGovernanceToken;
deployGovernanceToken.tags = ["all", "governor"];
