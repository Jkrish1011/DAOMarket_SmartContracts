import { ethers, network } from "hardhat"
import {
  FUNC,
  NEW_STORE_VALUE,
  PROPOSAL_DESCRIPTION,
  MIN_DELAY,
  developmentChains,
  proposalsFile
} from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-blocks"
import { moveTime } from "../utils/move-time"
import * as fs from "fs"

var proposalId: string = "";
export async function queueAndExecute() {
  const args = [NEW_STORE_VALUE]
  const functionToCall = FUNC
  const commodity = await ethers.getContract("Commodity")
  const encodedFunctionCall = commodity.interface.encodeFunctionData(functionToCall, args)
  const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION))
  // could also use ethers.utils.id(PROPOSAL_DESCRIPTION)

  const governor = await ethers.getContract("GovernorContract")
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
  // Get the last proposal for the network. You could also change it for your index
  proposalId = proposals[network.config.chainId!].at(-1);
  console.log("Queueing...")
  const proposalState = await governor.state(proposalId)
  console.log(`Current Proposal State: ${proposalState}`)
  const queueTx = await governor.queue([commodity.address], [0], [encodedFunctionCall], descriptionHash)
  await queueTx.wait(1)

  if (developmentChains.includes(network.name)) {
    await moveTime(MIN_DELAY + 1)
    await moveBlocks(1)
  }

  console.log("Executing...")
  // this will fail on a testnet because you need to wait for the MIN_DELAY!
  const executeTx = await governor.execute(
    [commodity.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  )
  let receipt = await executeTx.wait(1)
  console.log('executeTx receipt');
  console.log(receipt.events[0].args);
  receipt.events.forEach((eventArgs: any) => {
    if(eventArgs.args)
      console.log(eventArgs.args);
  })
  console.log(`commodity value: ${await commodity.retrieve()}`)
}

queueAndExecute()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error(error)
    const governor = await ethers.getContract("GovernorContract");
    const proposalState = await governor.state(proposalId);
  console.log(`Current Proposal State: ${proposalState}`)
    process.exit(1)
  })
