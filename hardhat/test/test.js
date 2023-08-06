const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Certification System Smart Contract Test", function () {
  let certificationSystem;
  let owner;
  let provider;
  let user1;
  let user2;

  before(function () {
    console.log("Testing start...........");
  });

  beforeEach(async function () {
    certificationSystem = await hre.ethers.deployContract(
      "certification_system"
    );
    await certificationSystem.waitForDeployment();
    [owner, provider, user1, user2] = await ethers.getSigners();
  });

  after(function () {
    console.log("All tests have been completed.");
  });

  //   // /////////////////////////////////////////////////////////////// register_yourself() function tests

  it("should allow a new user to register", async function () {
    const userName = "Muhammad";
    await certificationSystem.connect(user1).register_yourself(userName);
  });

  it("should not allow the owner to register", async function () {
    const userName = "Muhammad";
    await expect(
      certificationSystem.register_yourself(userName)
    ).to.be.revertedWith("Owner can't do anything");
  });

  it("should not allow a registered user to register again", async function () {
    const userName1 = "Muhammad";
    const userName2 = "Mirza";

    await certificationSystem.connect(user1).register_yourself(userName1);

    await expect(
      certificationSystem.connect(user1).register_yourself(userName2)
    ).to.be.revertedWith("You have already registered");
  });

  //   // /////////////////////////////////////////////////////////////// become_provider() function tests

  it("should allow a registered user to become a provider", async function () {
    const userName = "Muhammad";
    const instituteName = "ABC Institute";
    await certificationSystem.connect(user1).register_yourself(userName);

    await certificationSystem.connect(user1).become_provider(instituteName);
  });

  it("should not allow a non-registered user to become a provider", async function () {
    const instituteName = "ABC Institute";

    await expect(
      certificationSystem.connect(user1).become_provider(instituteName)
    ).to.be.revertedWith("You are not registered");
  });

  it("should not allow a registered user to become a provider more than once", async function () {
    const userName = "Muhammad";
    const instituteName1 = "ABC Institute";
    const instituteName2 = "XYZ Institute";
    await certificationSystem.connect(user1).register_yourself(userName);

    await certificationSystem.connect(user1).become_provider(instituteName1);

    await expect(
      certificationSystem.connect(user1).become_provider(instituteName2)
    ).to.be.revertedWith("You are already provider");
  });

  //   // /////////////////////////////////////////////////////////////// issue_certificate() function tests

  it("should allow a provider to issue a certificate", async function () {
    // Register a user and become a provider
    const name = "John Doe";
    const institute_Name = "ABC Institute";
    await certificationSystem.connect(user1).register_yourself(name);
    await certificationSystem.connect(user1).become_provider(institute_Name);

    await certificationSystem.connect(user2).register_yourself(name);

    // Issue a certificate
    const courseName = "Blockchain Basics";
    const skills = ["Solidity", "Blockchain", "Smart Contracts"];
    const certificateUrl = "https://example.com/certificate";
    await certificationSystem
      .connect(user1)
      .issue_certificate(courseName, skills, certificateUrl, user2.address);

    // Get user certificates
    const [
      candidiateName,
      user_id,
      issueDates,
      courseNames,
      instituteName,
      _skills,
      certificateUrls,
      takerAddress,
      giverAddress,
      status,
    ] = await certificationSystem.get_user_certificates(user2.address);

    // Check if the certificate is issued correctly
    expect(certificateUrls[0]).to.equal(certificateUrl);
    expect(status).to.equal(1); // user_status.Certified
  });

  it("should not allow a provider to issue a certificate to the contract owner", async function () {
    // Register a user and become a provider
    const name = "John Doe";
    const instituteName = "ABC Institute";
    await certificationSystem.connect(user1).register_yourself(name);
    await certificationSystem.connect(user1).become_provider(instituteName);

    // Try to issue a certificate to the contract owner
    await expect(
      certificationSystem
        .connect(user1)
        .issue_certificate(
          "Blockchain Basics",
          ["Solidity", "Blockchain", "Smart Contracts"],
          "https://example.com/certificate",
          owner.address
        )
    ).to.be.revertedWith("owner can't give certificate.");
  });

  it("should not allow a non-registered user to issue a certificate", async function () {
    // Register a user and become a provider
    const name = "John Doe";
    const instituteName = "ABC Institute";
    await certificationSystem.connect(user1).register_yourself(name);
    await certificationSystem.connect(user1).become_provider(instituteName);
    // Try to issue a certificate without registering and becoming a provider
    await expect(
      certificationSystem
        .connect(user1)
        .issue_certificate(
          "Blockchain Basics",
          ["Solidity", "Blockchain", "Smart Contracts"],
          "https://example.com/certificate",
          user2.address
        )
    ).to.be.revertedWith("Taker is not registered.");
  });

  it("should not allow issuing a certificate to a user who is already certified in the course", async function () {
    // Register a user and become a provider
    const name = "John Doe";
    const instituteName = "ABC Institute";
    await certificationSystem.connect(user1).register_yourself(name);
    await certificationSystem.connect(user1).become_provider(instituteName);

    // Issue a certificate to the user for a course
    const courseName = "Blockchain Basics";
    const skills = ["Solidity", "Blockchain", "Smart Contracts"];
    const certificateUrl = "https://example.com/certificate";
    await certificationSystem
      .connect(user1)
      .issue_certificate(courseName, skills, certificateUrl, user1.address);

    // Try to issue another certificate to the same user for the same course
    await expect(
      certificationSystem
        .connect(user1)
        .issue_certificate(courseName, skills, certificateUrl, user1.address)
    ).to.be.revertedWith("This user is already certified in this course.");
  });

  //   // /////////////////////////////////////////////////////////////// send_certificate() function tests

  it("should not allow sending a certificate to an unregistered user", async function () {
    // Register a user and become a provider
    const name = "John Doe";
    const instituteName = "ABC Institute";
    await certificationSystem.connect(user1).register_yourself(name);
    await certificationSystem.connect(user1).become_provider(instituteName);

    // Issue a certificate to the user
    const courseName = "Blockchain Basics";
    const skills = ["Solidity", "Blockchain", "Smart Contracts"];
    const certificateUrl = "https://example.com/certificate";
    await certificationSystem
      .connect(user1)
      .issue_certificate(courseName, skills, certificateUrl, user1.address);

    // Try to send the certificate to an unregistered user
    await expect(
      certificationSystem
        .connect(user1)
        .send_certificate(user2.address, courseName)
    ).to.be.revertedWith("receiver is not registered");
  });

  it("should not allow sending a certificate that the sender is not certified in", async function () {
    // Register two users and become providers
    const name1 = "John Doe";
    const instituteName1 = "ABC Institute";
    const name2 = "Jane Smith";
    const instituteName2 = "XYZ Institute";
    await certificationSystem.connect(user1).register_yourself(name1);
    await certificationSystem.connect(user1).become_provider(instituteName1);
    await certificationSystem.connect(user2).register_yourself(name2);
    await certificationSystem.connect(user2).become_provider(instituteName2);

    // Issue a certificate to user2
    const courseName = "Blockchain Basics";
    const skills = ["Solidity", "Blockchain", "Smart Contracts"];
    const certificateUrl = "https://example.com/certificate";
    await certificationSystem
      .connect(user1)
      .issue_certificate(courseName, skills, certificateUrl, user2.address);

    // Try to send the certificate that the sender is not certified in
    await expect(
      certificationSystem
        .connect(user2)
        .send_certificate(user1.address, "AI Basics")
    ).to.be.revertedWith("You are not certified in this course.");
  });

  //   // /////////////////////////////////////////////////////////////// invite_others() function tests

  it("should not allow to invite yourself", async function () {
    await certificationSystem.connect(user1).register_yourself("User 1");

    const invitationMessage = "Join the certification platform!";
    await expect(
      certificationSystem
        .connect(user1)
        .invite_others(user1.address, invitationMessage)
    ).to.be.rejectedWith("You can't invite yourself.");
  });

  it("should not allow to invite the registered user", async function () {
    await certificationSystem.connect(user1).register_yourself("User 1");
    await certificationSystem.connect(user2).register_yourself("User 2");

    const invitationMessage = "Join the certification platform!";
    await expect(
      certificationSystem
        .connect(user1)
        .invite_others(user2.address, invitationMessage)
    ).to.be.rejectedWith("This is already a registered user.");
  });

  it("should not allow inviting the owner to register", async function () {
    await certificationSystem.connect(user1).register_yourself("Muhammad");

    await expect(
      certificationSystem
        .connect(user1)
        .invite_others(owner.address, "Join our certification system!")
    ).to.be.revertedWith("You can't invite owner.");
  });

  it("should invite others to register with the certification system", async function () {
    await certificationSystem.connect(user1).register_yourself("User 1");

    const invitationMessage = "Join the certification platform.";

    const tx = await certificationSystem
      .connect(user1)
      .invite_others(user2.address, invitationMessage);

    await tx.wait();

    const events = await certificationSystem.queryFilter(
      "InvitationSent",
      tx.blockNumber,
      tx.blockNumber
    );

    expect(events.length).to.equal(1);
    const eventData = events[0].args;

    expect(eventData.inviter).to.equal(user1.address);
    expect(eventData.invitee).to.equal(user2.address);
    expect(eventData.message).to.equal(invitationMessage);
  });

  //   // /////////////////////////////////////////////////////////////// get_received_Certificates() function tests

  it("should allow a user to get received certificates", async function () {
    // Register two users and become providers
    const name1 = "John Doe";
    const instituteName1 = "ABC Institute";
    const name2 = "Jane Smith";
    const instituteName2 = "XYZ Institute";
    await certificationSystem.connect(user1).register_yourself(name1);
    await certificationSystem.connect(user1).become_provider(instituteName1);
    await certificationSystem.connect(user2).register_yourself(name2);
    await certificationSystem.connect(user2).become_provider(instituteName2);

    // Issue a certificate to user2
    const courseName = "Blockchain Basics";
    const skills = ["Solidity", "Blockchain", "Smart Contracts"];
    const certificateUrl = "https://example.com/certificate";
    await certificationSystem
      .connect(user1)
      .issue_certificate(courseName, skills, certificateUrl, user2.address);

    // Send the certificate from user2 to user1
    await certificationSystem
      .connect(user2)
      .send_certificate(user1.address, courseName);

    // Get received certificates for user1
    const [receivedAddresses, receivedCourses, receivedUrls] =
      await certificationSystem.connect(user1).get_received_Certificates();

    // Check if the received certificate is retrieved correctly
    expect(receivedAddresses[0]).to.equal(user2.address);
    expect(receivedCourses[0]).to.equal(courseName);
    expect(receivedUrls[0]).to.equal(certificateUrl);
  });

  it("should return an empty array if a user has not received any certificates", async function () {
    // Register a user and become a provider
    const name = "John Doe";
    const instituteName = "ABC Institute";
    await certificationSystem.connect(user1).register_yourself(name);
    await certificationSystem.connect(user1).become_provider(instituteName);

    // Get received certificates for user1
    const [receivedAddresses, receivedCourses, receivedUrls] =
      await certificationSystem.connect(user1).get_received_Certificates();

    // Check if the received certificate array is empty
    expect(receivedAddresses).to.have.lengthOf(0);
    expect(receivedCourses).to.have.lengthOf(0);
    expect(receivedUrls).to.have.lengthOf(0);
  });

  //   // /////////////////////////////////////////////////////////////// is_user_certified() function tests

  it("Should return Not Certified if the user is not certified in this course", async function () {
    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    await certificationSystem.connect(user1).register_yourself("User 1");

    const courseName = "Blockchain Fundamentals";

    const isCertifiedAfter = await certificationSystem.is_user_certified(
      user1.address,
      courseName
    );

    expect(isCertifiedAfter).to.equal(0);
  });

  //   // /////////////////////////////////////////////////////////////// find_skills() function tests

  it("Should find multiple skills that match the given keyword", async () => {
    const courseSkills = [
      "Solidity",
      "Ethereum with polygon",
      "ethereum blockchain",
      "ETHEREUM VM",
      "Blockchain",
    ];
    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await certificationSystem
      .connect(provider)
      .become_provider("Provider Institute");

    const foundSkills = await certificationSystem.find_skills("ethereum");
    expect(foundSkills).to.have.lengthOf(0);
    expect(foundSkills).to.include.members([]);
  });

  it("Should find skills ignoring case sensitivity", async () => {
    const courseSkills = ["solidity", "ethereum", "Blockchain"];

    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await certificationSystem
      .connect(provider)
      .become_provider("Provider Institute");

    const foundSkills = await certificationSystem.find_skills("ETHEREUM");
    expect(foundSkills).to.have.lengthOf(0);
    expect(foundSkills).to.include.members([]);
  });

  it("Should find no skills if an empty keyword is given", async () => {
    const courseSkills = ["Solidity", "Ethereum", "Blockchain"];

    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await certificationSystem
      .connect(provider)
      .become_provider("Provider Institute");

    const foundSkills = await certificationSystem.find_skills(" ");
    expect(foundSkills).to.have.lengthOf(0);
  });
});
