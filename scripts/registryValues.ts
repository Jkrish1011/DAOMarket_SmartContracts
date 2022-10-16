import { ethers } from "hardhat"

export async function registryValues() {
  const registry = await ethers.getContract("Registry")
  const commodity = await ethers.getContract("Commodity")
  const [owner, addr1, addr2] = await ethers.getSigners();
  const attributeTx = await registry.getAttributeValue(commodity.address, 0)
  console.log(attributeTx);

}

registryValues()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
