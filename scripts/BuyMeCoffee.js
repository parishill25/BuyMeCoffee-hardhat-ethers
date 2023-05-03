
const {hre,ethers}=require("hardhat")


// 
async function getBalance(address){
    const BuyMeCoffeeBalance= await ethers.provider.getBalance(address)
    return ethers.utils.formatEther(BuyMeCoffeeBalance)
}

async function logBalances(addresses){
    let idx=0
    for(const address of addresses){
        console.log(`Address of ${idx}`,await getBalance(address))
        idx++
    }

}

async function printMemos(memos){
    for(const memo of memos){
        const timestamp= memo.timestamp
        const tipper=memo.name
        const tipperAddress= memo.from
        const message=memo.message
        console.log(`At${timestamp},${tipper} the owner of the address ${tipperAddress} said ${message})`)
    }

  


}


async function main(){
    const [owner,tipper1,tipper2,tipper3,tipper4]= await ethers.getSigners()
    // Getting the BuyMeCoffee contract
    const buyMeCoffee=await ethers.getContractFactory("BuyMeCoffee")
    // Deploy the BuyMeCoffee contract
    const BuyMeCoffee= await buyMeCoffee.deploy()
    // Wait for the contract to be deployed
    await BuyMeCoffee.deployed()
    console.log("BuyMeCoffee deployed",BuyMeCoffee.address)
    // Get the tippers addressses
const addresses=[owner.address,tipper1.address,tipper2.address,tipper3.address,BuyMeCoffee.address]

    // Print Balances
    console.log(" starting balances are ")
    await logBalances(addresses)

    // Buy the owner Coffee
    const tip={value:ethers.utils.parseEther("1")}
    await BuyMeCoffee.connect(tipper1).buyCoffee("Kepler","You're the best",tip)
    await BuyMeCoffee.connect(tipper2).buyCoffee("DaVinci","Amazing Job",tip)
    await BuyMeCoffee.connect(tipper3).buyCoffee("Newton","Nice Work",tip)

    // Print Balances after buying a coffee
    console.log(" balances are buying a coffee ")
    await logBalances(addresses)
    
    // withdraw funds
    await BuyMeCoffee.connect(owner).withDrawTips()
    // Print Balances after Withdraw
    console.log(" balances are withDraw ")
    await logBalances(addresses)

    console.log("The memos are")
   const memos= await BuyMeCoffee.getMemos()
   await printMemos(memos)
    



}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
})

