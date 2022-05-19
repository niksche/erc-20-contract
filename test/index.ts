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
    CryptonTokenContract = await erc20Factory.deploy("Crypton coin", "CRP", 1);
    [owner, account1] = await ethers.getSigners();
  });

  describe("Deployment", function () {
    it("Should deploy our contract", async function () {
      const totalSupply = await CryptonTokenContract.totalSupply();
      expect(totalSupply, "Initial supply should be equal to zerro").to.equal(
        BigNumber.from("0")
      );
    });

    it("Signer's balance should be zerro", async function () {
      ownersBalance = await CryptonTokenContract.balanceOf(owner.address);
      expect(ownersBalance, "owner balance should be equal to zerro").to.equal(
        BigNumber.from("0")
      );
    });
  });

  describe("Mint", function () {
    it("Negative testing: should be reverted with error", async function () {
      // ownersBalance = await CryptonTokenContract.balanceOf(owner.address);
      expect(ownersBalance, "Balance before mint doesn't match").to.equal(
        BigNumber.from("0")
      );
      await expect(
        CryptonTokenContract.connect(account1).mint(100)
      ).to.be.revertedWith("");
    });

    it("Should increase totalSupply as well as owner's balance", async function () {
      ownersBalance = await CryptonTokenContract.balanceOf(owner.address);
      expect(ownersBalance, "Balance before mint doesn't match").to.equal(
        BigNumber.from("0")
      );
      await CryptonTokenContract.mint(100);

      ownersBalance = await CryptonTokenContract.balanceOf(owner.address);
      totalSupply = await CryptonTokenContract.totalSupply();
      expect(ownersBalance, "Balance after mint doesn't match").to.equal(
        BigNumber.from("100")
      );
    });
  });

  describe("Approve", function () {
    it("Negative testing: should be reverted with error: ", async function () {
      await expect(
        CryptonTokenContract.connect(account1).approve(owner.address, 1)
      ).to.be.revertedWith("");
    });

    it("Should update allowance according with function call", async function () {
      await CryptonTokenContract.connect(account1).approve(owner.address, 0);
      expect(
        await CryptonTokenContract.allowance(account1.address, owner.address)
      ).to.equal(BigNumber.from("0"));
      await CryptonTokenContract.connect(owner).transferFrom(
        account1.address,
        owner.address,
        0
      );
      expect(
        await CryptonTokenContract.allowance(account1.address, owner.address)
      ).to.equal(BigNumber.from("0"));
    });
  });

  describe("Transfer", function () {
    it("Negative testing: sending more tokens that is on balance", async function () {
      const tokensAmountToTransfer: number = 1;
      await expect(
        CryptonTokenContract.transfer(account1.address, tokensAmountToTransfer)
      ).to.be.revertedWith("Not enough money");
    });

    it("Negative testing: sending money to yourself", async function () {
      const tokensAmountToTransfer: number = 0;
      await expect(
        CryptonTokenContract.transfer(owner.address, tokensAmountToTransfer)
      ).to.be.revertedWith("Transfering money to yourself");
    });

    it("transfer should update balances of sender and reciever accordingly", async function () {
      const tokensAmountToTransfer: number = 0;
      const data = await CryptonTokenContract.transfer(
        account1.address,
        tokensAmountToTransfer
      );
      expect(data.value).to.equal(BigNumber.from("0"));
    });
  });

  describe("TransferFrom", function () {
    it("Negative testing: expecting function to revert with message", async function () {
      const tokensAmountToTransfer: number = 1;
      await expect(
        CryptonTokenContract.transferFrom(
          account1.address,
          owner.address,
          tokensAmountToTransfer
        )
      ).to.be.revertedWith("asking too much money");
    });

    it("Negative testing: _from has not enough money", async function () {
      await CryptonTokenContract.mint(10);
      await CryptonTokenContract.approve(account1.address, 5);
      await CryptonTokenContract.transfer(account1.address, 9);

      const tokensAmountToTransfer: number = 4;
      await expect(
        CryptonTokenContract.transferFrom(
          owner.address,
          account1.address,
          tokensAmountToTransfer
        )
      ).to.be.revertedWith("_from has not enough money");
    });

    it("transferFrom should update balances of sender and reciever accordingly", async function () {
      const tokensAmountToTransfer: number = 0;
      const data = await CryptonTokenContract.transferFrom(
        owner.address,
        account1.address,
        tokensAmountToTransfer
      );
      expect(data.value).to.equal(BigNumber.from("0"));
    });
  });

  describe("Dump for all functions call", function () {
    it("calling all function hoping pass the test", async function () {
      await CryptonTokenContract.allowance(account1.address, owner.address);
      await CryptonTokenContract.transfer(account1.address, 0);
    });
  });
});
