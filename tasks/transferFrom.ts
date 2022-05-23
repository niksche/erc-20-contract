// import ERC20ABI from "../artifacts/contracts/ERC20.sol/ERC20.json";
// import { task } from "hardhat/config";
// import { ContractReceipt, ContractTransaction } from "ethers";

// task("transferFrom", "do transfer from address")
//   .addParam("tokenAddres", "address of contract")
//   .addParam("from", "address from which to transfer")
//   .addParam("to", "address to which do transfer")
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

//     const transferTx: ContractTransaction = await CryptonToken.transferFrom(
//       taskArgs.from,
//       taskArgs.to,
//       taskArgs.value
//     );

//     const receipt: ContractReceipt = await transferTx.wait();

//     const TransferEvent = receipt.events
//       ? receipt.events[0]
//       : { args: { _from: "", _to: "", _value: "" } };

//     console.log(
//       "successfully transfered from ",
//       TransferEvent.args?._from,
//       "to",
//       TransferEvent.args?._to,
//       TransferEvent.args?._value.toString(),
//       "of",
//       "CRT"
//     );
//   });
