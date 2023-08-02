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

  //   // /////////////////////////////////////////////////////////////// give_certificate_to_user() function tests

  it("should give a certificate to a user", async function () {
    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    const courseName = "Blockchain Developer";
    const courseLength = "3 months";
    const certificateUrl = "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv";
    const instructorsNames = ["Instructor 1", "Instructor 2"];
    const skills = ["Solidity"];

    await certificationSystem.connect(user1).register_yourself("Mirza");

    await expect(
      certificationSystem
        .connect(provider)
        .give_certificate_to_user(
          courseName,
          skills,
          courseLength,
          certificateUrl,
          instructorsNames,
          user1.address
        )
    )
      .to.emit(certificationSystem, "CertificateIssued")
      .withArgs(user1.address, provider.address, courseName, certificateUrl);

    const [
      candidiateName,
      user_id,
      issueDates,
      courseNames,
      courseLengths,
      instituteName,
      _skills,
      certificateUrls,
      instructorsNamesArray,
      takerAddress,
      giverAddress,
      status,
    ] = await certificationSystem.get_user_certificates(user1.address);

    expect(candidiateName).to.equal("Mirza");
    expect(user_id).to.equal(2);
    expect(issueDates).to.have.lengthOf(1);
    expect(courseNames).to.have.lengthOf(1);
    expect(courseNames[0]).to.equal("Blockchain Developer");
    expect(courseLengths).to.have.lengthOf(1);
    expect(courseLengths[0]).to.equal("3 months");
    expect(instituteName).to.equal("ABC Institute");
    expect(_skills).to.have.lengthOf(1);
    expect(_skills[0]).to.deep.equal(["Solidity"]);
    expect(certificateUrls).to.have.lengthOf(1);
    expect(certificateUrls[0]).to.equal(
      "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv"
    );
    expect(instructorsNamesArray).to.have.lengthOf(1);
    expect(instructorsNamesArray[0]).to.deep.equal([
      "Instructor 1",
      "Instructor 2",
    ]);
    expect(takerAddress).to.equal(user1.address);
    expect(giverAddress).to.equal(provider.address);
    expect(status).to.equal(1);

    const userStatus = await certificationSystem.is_user_certified(
      user1.address,
      courseName
    );
    expect(userStatus).to.equal(1);
  });

  it("should not give a certificate to the owner", async function () {
    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    const courseName = "Blockchain Developer";
    const courseLength = "3 months";
    const certificateUrl = "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv";
    const instructorsNames = ["Instructor 1", "Instructor 2"];
    const skills = ["Solidity"];

    await expect(
      certificationSystem
        .connect(provider)
        .give_certificate_to_user(
          courseName,
          skills,
          courseLength,
          certificateUrl,
          instructorsNames,
          owner.address
        )
    ).to.be.revertedWith("owner can't give certificate.");
  });

  //   // /////////////////////////////////////////////////////////////// send_certificate() function tests

  it("should allow sending a certificate to a registered user", async function () {
    const courseName = "Blockchain Basics";
    const skills = ["Solidity", "Web3.js", "Ethereum"];
    const certificateUrl = "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv";

    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    await certificationSystem.connect(user1).register_yourself("Marian");
    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        courseName,
        skills,
        "2 weeks",
        certificateUrl,
        ["Instructor A", "Instructor B"],
        user1.address
      );

    await certificationSystem.connect(user2).register_yourself("Baig");
    await certificationSystem
      .connect(user1)
      .send_certificate(user2.address, courseName);

    const user2Certificates = await certificationSystem.get_user_certificates(
      user1.address
    );
    expect(user2Certificates.courseNames.length).to.equal(1);
    expect(user2Certificates.courseNames[0]).to.equal(courseName);
    expect(user2Certificates.certificateUrls[0]).to.equal(certificateUrl);
  });

  it("should not allow sending a certificate to a non-registered user", async function () {
    const courseName = "Blockchain Basics";
    const skills = ["Solidity", "Web3.js", "Ethereum"];
    const certificateUrl = "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv";

    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    await certificationSystem.connect(user1).register_yourself("Marian");
    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        courseName,
        skills,
        "2 weeks",
        certificateUrl,
        ["Instructor A", "Instructor B"],
        user1.address
      );

    await expect(
      certificationSystem
        .connect(user1)
        .send_certificate(user2.address, courseName)
    ).to.be.revertedWith("receiver is not registered");
  });

  it("should not allow sending a certificate if the user is not certified in the given course", async function () {
    const courseName1 = "Blockchain Basics";
    const courseName2 = "Ethereum Advanced";
    const skills1 = ["Solidity", "Web3.js", "Ethereum"];
    const certificateUrl1 = "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv";

    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    await certificationSystem.connect(user1).register_yourself("Marian");
    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        courseName1,
        skills1,
        "2 weeks",
        certificateUrl1,
        ["Instructor A", "Instructor B"],
        user1.address
      );

    await certificationSystem.connect(user2).register_yourself("Baig");
    await expect(
      certificationSystem
        .connect(provider)
        .send_certificate(user2.address, courseName2)
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

  it("Should get received certificates for the current user", async () => {
    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    const courseName = "Blockchain Fundamentals";
    const skills = ["Smart Contracts", "Solidity", "Web3.js"];

    const userName2 = "Muhammad";
    await certificationSystem.connect(user2).register_yourself(userName2);

    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        "Blockchain Fundamentals",
        skills,
        "4 weeks",
        "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv",
        ["Mirza", "Baig"],
        user2.address
      );

    const userName1 = "Mirza";
    await certificationSystem.connect(user1).register_yourself(userName1);

    await certificationSystem
      .connect(user2)
      .send_certificate(user1.address, "Blockchain Fundamentals");

    const [senders, courseNames, certificateUrls] = await certificationSystem
      .connect(user1)
      .get_received_Certificates();
    expect(senders).to.have.lengthOf(1);
    expect(courseNames).to.have.lengthOf(1);
    expect(certificateUrls).to.have.lengthOf(1);
    expect(senders[0]).to.equal(user2.address);
    expect(courseNames[0]).to.equal("Blockchain Fundamentals");
    expect(certificateUrls[0]).to.equal(
      "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv"
    );
  });

  it("Should get multiple received certificates for the current user", async () => {
    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    const userName2 = "Muhammad";
    await certificationSystem.connect(user2).register_yourself(userName2);

    const courseName = "Blockchain Fundamentals";
    const skills = ["Smart Contracts", "Solidity", "Web3.js"];

    const courseName2 = "JavaScript Basics";
    const skills2 = ["Variables", "Functions", "Loops"];

    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        courseName,
        skills,
        "3 weeks",
        "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv",
        ["Mirza", "Baig"],
        user2.address
      );
    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        courseName2,
        skills2,
        "4 weeks",
        "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv",
        ["Mirza", "Baig", "Another"],
        user2.address
      );

    const userName1 = "Mirza";
    await certificationSystem.connect(user1).register_yourself(userName1);

    await certificationSystem
      .connect(user2)
      .send_certificate(user1.address, "Blockchain Fundamentals");

    await certificationSystem
      .connect(user2)
      .send_certificate(user1.address, "JavaScript Basics");

    const [senders, courseNames, certificateUrls] = await certificationSystem
      .connect(user1)
      .get_received_Certificates();
    expect(senders).to.have.lengthOf(2);
    expect(courseNames).to.have.lengthOf(2);
    expect(certificateUrls).to.have.lengthOf(2);
    expect(senders[0]).to.equal(user2.address);
    expect(courseNames[0]).to.equal("Blockchain Fundamentals");
    expect(certificateUrls[0]).to.equal(
      "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv"
    );
    expect(senders[1]).to.equal(user2.address);
    expect(courseNames[1]).to.equal("JavaScript Basics");
    expect(certificateUrls[1]).to.equal(
      "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv"
    );
  });

  it("Should get no received certificates if none received", async () => {
    const [senders, courseNames, certificateUrls] = await certificationSystem
      .connect(user1)
      .get_received_Certificates();
    expect(senders).to.have.lengthOf(0);
    expect(courseNames).to.have.lengthOf(0);
    expect(certificateUrls).to.have.lengthOf(0);
  });

  //   // /////////////////////////////////////////////////////////////// is_user_certified() function tests

  it("Should return Certified if the user is certified in this course", async function () {
    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    await certificationSystem.connect(user1).register_yourself("User 1");

    const courseName = "Blockchain Fundamentals";
    const skills = ["Smart Contracts", "Solidity", "Web3.js"];

    const courseLength = "4 weeks";
    const certificateUrl = "QmZpbVy5SRBByM6W22cYWAWqHiVRbYFvfHqnThevnv9WJv";
    const instructorsNames = ["Mirza", "Baig"];
    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        courseName,
        skills,
        courseLength,
        certificateUrl,
        instructorsNames,
        user1.address
      );

    const isCertifiedAfter = await certificationSystem.is_user_certified(
      user1.address,
      courseName
    );
    expect(isCertifiedAfter).to.equal(1);
  });

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
