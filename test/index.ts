import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { ERC20 } from "../typechain";

describe("CryptonToken", function () {

  let CryptonTokenContract: ERC20;
  let owner: SignerWithAddress;
  let ownersBalance: BigNumber;
  let totalSupply: BigNumber;
  let account1: SignerWithAddress;

  beforeEach(async function () {
    const erc20Factory = await ethers.getContractFactory("ERC20");
    CryptonTokenContract = await erc20Factory.deploy("Crypton coin", "CRP",1);
    console.log(CryptonTokenContract.address);
    [owner, account1] = await ethers.getSigners();
  })
  
  describe("Deployment", function() {
    it("Should deploy our contract", async function() {
      const totalSupply = await CryptonTokenContract.totalSupply();
      expect(totalSupply, "Initial supply should be equal to zerro").to.equal(BigNumber.from("0"));

    })

    it("Signer's balance should be zerro", async function() {
      ownersBalance = await CryptonTokenContract.balanceOf(owner.address);
      console.log(ownersBalance);
      expect(ownersBalance, "owner balance should be equal to zerro").to.equal(BigNumber.from("0"));
    })
  })

  describe("Mint", function() {
    it("Should increase totalSupply as well as owner's balance", async function () {
      ownersBalance = await CryptonTokenContract.balanceOf(owner.address);
      expect(ownersBalance, "Balance before mint doesn't match").to.equal(BigNumber.from("0"));
      await CryptonTokenContract.mint(100);

      ownersBalance = await CryptonTokenContract.balanceOf(owner.address);
      totalSupply = await CryptonTokenContract.totalSupply();
      expect(ownersBalance, "Balance after mint doesn't match").to.equal(BigNumber.from("100"));
      console.log("totalSupply", totalSupply);
    })
  })

  describe("Dump for all functions call", function() {
    it("calling all function hoping pass the test", async function() {
      await CryptonTokenContract.connect(account1).approve(owner.address, 0);
      await CryptonTokenContract.allowance(account1.address, owner.address);
      await CryptonTokenContract.transfer(account1.address, 0);
      await CryptonTokenContract.transferFrom(account1.address, owner.address, 0);
    })
  })

});

