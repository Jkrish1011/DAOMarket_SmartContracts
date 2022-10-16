import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { ethers } from "hardhat"

const deploycommodity: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying commodity and waiting for confirmations...")
  const registry = await get("Registry");
  console.log(`Registry Contract Address : [${registry.address}]`);
  const commodity = await deploy("Commodity", {
    from: deployer,
    args: [registry.address],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`commodity deployed at ${commodity.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(commodity.address, [])
  }
  const commodityContract = await ethers.getContractAt("Commodity", commodity.address)
  const timeLock = await ethers.getContract("TimeLock")
  const transferTx = await commodityContract.transferOwnership(timeLock.address)
  await transferTx.wait(1)
}

export default deploycommodity
deploycommodity.tags = ["all", "commodity"]
