import * as fs from "fs"
import { network, ethers } from "hardhat"
import { proposalsFile, developmentChains, VOTING_PERIOD } from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-blocks"

var proposalId: string = "";
async function main() {
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
  // Get the last proposal for the network. You could also change it for your index
  proposalId = proposals[network.config.chainId!].at(-1);
  // 0 = Against, 1 = For, 2 = Abstain for this example
  const voteWay = 1
  const reason = "I like this idea!"
  const reasonNotLike = "I Don't like this idea!"
  const [owner, addr1, addr2] = await ethers.getSigners();
  const governor = await ethers.getContract("GovernorContract")
  const proposalState = await governor.state(proposalId)
  console.log(`State of the Proposal is ${proposalState}`)
}

main()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error(error)
    const governor = await ethers.getContract("GovernorContract")
    const proposalState = await governor.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)
    process.exit(1)
  })
