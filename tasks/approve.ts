// import ERC20ABI from "../artifacts/contracts/ERC20.sol/ERC20.json";
// import { task } from "hardhat/config";
// import { ContractReceipt, ContractTransaction } from "ethers";

// task("approve", "do transfer from address")
//   .addParam("tokenAddres", "address of contract")
//   .addParam("spender", "address which is alowed to spend owner's tokens")
//   .addParam("value", "token amount to be transfered")
//   .setAction(async (taskArgs, hre) => {
//     const erc20abi = ERC20ABI.abi;

//     const provider = new hre.ethers.providers.JsonRpcProvider();

//     const iface = new hre.ethers.utils.Interface(erc20abi);

//     const providerCode = await provider.getCode(taskArgs.tokenAddres);

//     if (providerCode) {
//       if (providerCode === "0x") {
//         console.log("Contract with such an address does not exist");
//         return;
//       }
//     }

//     const [owner] = await hre.ethers.getSigners();

//     const CryptonToken = new hre.ethers.Contract(
//       "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//       erc20abi,
//       owner
//     );

//     const transferTx: ContractTransaction = await CryptonToken.connect(
//       owner
//     ).approve(taskArgs.spender, taskArgs.value);

//     const receipt: ContractReceipt = await transferTx.wait();

//     const TransferEvent = receipt.events
//       ? receipt.events[0]
//       : { args: { _owner: "", _spender: "", _value: "" } };

//     console.log(
//       "successfully approved to spend",
//       TransferEvent.args?._value.toString(),
//       "of",
//       "CRT from ",
//       TransferEvent.args?._owner,
//       "by",
//       TransferEvent.args?._spender
//     );
//   });
