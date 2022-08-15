import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", function () {
    let simpleStorageFactory: SimpleStorage__factory;
    let simpleStorage: SimpleStorage;

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a favorite number of zero", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("Should update when we call store", async function () {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();
        assert(currentValue.toString(), expectedValue);
    });

    it("People array is empty", async function () {
        let isEmpty;
        try{
           await simpleStorage.people(0);
            isEmpty = false;
        } catch (e){
            isEmpty = true;
        }

        assert(isEmpty);
    });

    it("Person added to the array", async function () {
        const expectedName = "John";
        const expectedNumber = "35"
        const transactionResponse = await simpleStorage.addPerson(expectedName, expectedNumber);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.people(0);

        assert(expectedName, currentValue[1].toString());
        assert(expectedNumber, currentValue[0].toString());
    });

});
