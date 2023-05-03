const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const{verify}= require("../utils/verify.js")


module.exports=async({deployments,getNamedAccounts})=>{
    const{deploy,log}= deployments
    const {deployer}=await getNamedAccounts()
    const chainId=network.config.chainId
    console.log(deployer)
    const BuyMeCoffee= await deploy("BuyMeCoffee",{
    from:deployer,
    args:[],
    log:true,
    waitConfirmations:network.config.blockCofirmations||1
    })

console.log("BuyMeCoffee deployed..............")
console.log("------------------------------------------")
if(process.env.ETHERSCAN_KEY){
    log("Verifying.......................")
    await verify(BuyMeCoffee.address,[])
}
log("-----------------------------------------------------")
}

module.exports.tags=["all","BuyMeCoffee"]


    