// test/Notary.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Notary Contract", function () {
    let Notary;
    let notary;
    let owner;
    let party1;
    let party2;
    let agreementId;

    beforeEach(async function () {
        // Deploy the Notary contract before each test
        [owner, party1, party2] = await ethers.getSigners();
        Notary = await ethers.getContractFactory("Notary");
        notary = await Notary.deploy();
        await notary.deployed();

        // Create a unique agreement ID
        agreementId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Agreement1"));
    });

    describe("Creating Agreements", function () {
        it("should create an agreement successfully", async function () {
            await expect(
                notary.createAgreement(agreementId, "Sample Agreement", "These are the terms.", party1.address, party2.address)
            ).to.emit(notary, "AgreementCreated").withArgs(agreementId, "Sample Agreement", "These are the terms.", party1.address, party2.address);
        });

        it("should not allow creating an agreement with the same ID", async function () {
            await notary.createAgreement(agreementId, "Sample Agreement", "These are the terms.", party1.address, party2.address);
            await expect(
                notary.createAgreement(agreementId, "Another Agreement", "Different terms.", party1.address, party2.address)
            ).to.be.revertedWith("Agreement already exists");
        });

        it("should not allow creating an agreement with invalid addresses", async function () {
            await expect(
                notary.createAgreement(agreementId, "Sample Agreement", "These are the terms.", ethers.constants.AddressZero, party2.address)
            ).to.be.revertedWith("Invalid party address");
        });

        it("should not allow creating an agreement with the same party addresses", async function () {
            await expect(
                notary.createAgreement(agreementId, "Sample Agreement", "These are the terms.", party1.address, party1.address)
            ).to.be.revertedWith("boht the address should be different");
        });
    });

    describe("Signing Agreements", function () {
        beforeEach(async function () {
            await notary.createAgreement(agreementId, "Sample Agreement", "These are the terms.", party1.address, party2.address);
        });

        it("should allow party1 to sign the agreement", async function () {
            const signature = await party1.signMessage(agreementId);
            await expect(
                notary.connect(party1).signAgreement(agreementId, signature)
            ).to.emit(notary, "AgreementSigned").withArgs(agreementId, party1.address);

            const agreement = await notary.getAgreement(agreementId);
            expect(agreement.signed1).to.be.true;
        });

        it("should allow party2 to sign the agreement", async function () {
            const signature = await party2.signMessage(agreementId);
            await expect(
                notary.connect(party2).signAgreement(agreementId, signature)
            ).to.emit(notary, "AgreementSigned").withArgs(agreementId, party2.address);

            const agreement = await notary.getAgreement(agreementId);
            expect(agreement.signed2).to.be.true;
        });

        it("should not allow the same party to sign twice", async function () {
            const signature = await party1.signMessage(agreementId);
            await notary.connect(party1).signAgreement(agreementId, signature);
            await expect(
                notary.connect(party1).signAgreement(agreementId, signature)
            ).to.be.revertedWith("Party 1 has already signed");
        });

        it("should not allow a non-party to sign the agreement", async function () {
            const signature = await party2.signMessage(agreementId);
            await expect(
                notary.connect(owner).signAgreement(agreementId, signature)
            ).to.be.revertedWith("You are not a party to this agreement");
        });
    });

    describe("Verifying Signatures", function () {
        beforeEach(async function () {
            await notary.createAgreement(agreementId, "Sample Agreement", "These are the terms.", party1.address, party2.address);
        });

        it("should return false if not both parties have signed", async function () {
            const result = await notary.verifySignatures(agreementId);
            expect(result).to.be.false;
        });

        it("should return true if both parties have signed", async function () {
            const signature1 = await party1.signMessage(agreementId);
            await notary.connect(party1).signAgreement(agreementId, signature1);

            const signature2 = await party2.signMessage(agreementId);
            await notary.connect(party2).signAgreement(agreementId, signature2);

            const result = await notary.verifySignatures(agreementId);
            expect(result).to.be.true;
        });
    });

    describe("Getting Agreement Details", function () {
        beforeEach(async function () {
            await notary.createAgreement(agreementId, "Sample Agreement", "These are the terms.", party1.address, party2.address);
        });

        it("should return the correct agreement details", async function () {
            const agreement = await notary.getAgreement(agreementId);
            expect(agreement.title).to.equal("Sample Agreement");
            expect(agreement.terms).to.equal("These are the terms.");
            expect(agreement.party1).to.equal(party1.address);
            expect(agreement.party2).to.equal(party2.address);
            expect(agreement.signed1).to.be.false;
            expect(agreement.signed2).to.be.false;
        });
    });

    describe("Getting Signatures", function () {
        beforeEach(async function () {
            await notary.createAgreement(agreementId, "Sample Agreement", "These are the terms.", party1.address, party2.address);
        });

        it("should return the signature for a signer", async function () {
            const signature = await party1.signMessage(agreementId);
            await notary.connect(party1).signAgreement(agreementId, signature);

            const retrievedSignature = await notary.getSignature(agreementId, party1.address);
            expect(retrievedSignature).to.equal(signature);
        });
    });
});