const { ethers } = require("hardhat")

async function main() {
  const [owner] = await ethers.getSigners()

  // WCCN
  const WCCN = await ethers.getContractFactory("WCCN")
  const wccn = await WCCN.deploy()
  await wccn.deployed()
  console.log("wccn : ", wccn.address)

  //Factory
  const Factory = await ethers.getContractFactory("CCNSwapFactory")
  const factory = await Factory.deploy(owner.address)
  await factory.deployed()
  console.log("factory : ", factory.address)
  console.log("codeHash : ", await factory.initCodeHash())

  //Route
  const Route = await ethers.getContractFactory("CCNSwapRouter")
  const route = await Route.deploy(factory.address,wccn.address,3000)
  await route.deployed()
  console.log("route : ", route.address)

  //CSS
  const Token = await ethers.getContractFactory("CCNSwapToken")
  const tokena = await Token.deploy()
  await tokena.deployed()
  console.log("CCS : ", tokena.address)

}

main().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1); })