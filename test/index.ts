import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { ERC20 } from "../typechain";

describe("CryptonToken", function () {

  let CryptonTokenContract: ERC20;
  let owner: SignerWithAddress;

  beforeEach(async function () {
    const erc20Factory = await ethers.getContractFactory("ERC20");
    CryptonTokenContract = await erc20Factory.deploy("Crypton coin", "CRP",1);
    console.log(CryptonTokenContract.address);
    [owner] = await ethers.getSigners();
  })
  
  describe("Deployment", function() {
    it("Should deploy our contract", async function() {
      const totalSupply = await CryptonTokenContract.totalSupply();
      expect(totalSupply ===  BigNumber.from("0"), "Initial supply should be equal to zerro");
    })

    it("Signer's balance should be zerro", async function() {
      const ownersBalance = await CryptonTokenContract.balanceOf(owner.address);
      console.log(ownersBalance);
      expect(ownersBalance === BigNumber.from("0"), "owner balance should be equal to zerro");
    })
  })

  



});

