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

  //   // /////////////////////////////////////////////////////////////// create_certificate() function tests

  it("should allow a registered and become a provider user to create a certificate", async function () {
    const courseName = "Blockchain Basics";
    const skills = ["Solidity", "Web3.js", "Ethereum"];

    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");
    await certificationSystem
      .connect(provider)
      .create_certificate(courseName, skills);
  });

  it("should not allow a non-provider user to create a certificate", async function () {
    const courseName = "Blockchain Basics";
    const skills = ["Solidity", "Web3.js", "Ethereum"];

    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await expect(
      certificationSystem
        .connect(provider)
        .create_certificate(courseName, skills)
    ).to.be.revertedWith("You are not provider");
  });

  it("should not allow creating a certificate with an already existing course name", async function () {
    const courseName = "Blockchain Basics";
    const skills1 = ["Solidity", "Web3.js", "Ethereum"];
    const skills2 = ["Smart Contracts", "Decentralized Applications"];

    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");
    await certificationSystem
      .connect(provider)
      .create_certificate(courseName, skills1);

    await expect(
      certificationSystem
        .connect(provider)
        .create_certificate(courseName, skills2)
    ).to.be.revertedWith("This certificate is already created");
  });

  //   // /////////////////////////////////////////////////////////////// give_certificate_to_user() function tests

  it("should give a certificate to a user", async function () {
    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    await certificationSystem
      .connect(provider)
      .create_certificate("Blockchain Developer", ["Solidity", "Ethereum"]);

    const courseName = "Blockchain Developer";
    const courseLength = "3 months";
    const certificateUrl = "https://example.com/certificate";
    const instructorsNames = ["Instructor 1", "Instructor 2"];

    await certificationSystem.connect(user1).register_yourself("Mirza");

    await expect(
      certificationSystem
        .connect(provider)
        .give_certificate_to_user(
          courseName,
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
    expect(_skills[0]).to.deep.equal(["Solidity", "Ethereum"]);
    expect(certificateUrls).to.have.lengthOf(1);
    expect(certificateUrls[0]).to.equal("https://example.com/certificate");
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

    await certificationSystem
      .connect(provider)
      .create_certificate("Blockchain Developer", ["Solidity", "Ethereum"]);

    const courseName = "Blockchain Developer";
    const courseLength = "3 months";
    const certificateUrl = "https://example.com/certificate";
    const instructorsNames = ["Instructor 1", "Instructor 2"];

    await expect(
      certificationSystem
        .connect(provider)
        .give_certificate_to_user(
          courseName,
          courseLength,
          certificateUrl,
          instructorsNames,
          owner.address
        )
    ).to.be.revertedWith("owner can't give certificate.");
  });

  it("should not give a certificate to a user for a non-existing course", async function () {
    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    const courseName = "Non-Existing Course";
    const courseLength = "3 months";
    const certificateUrl = "https://example.com/certificate";
    const instructorsNames = ["Instructor 1", "Instructor 2"];

    await certificationSystem.connect(user1).register_yourself("User 1");

    await expect(
      certificationSystem
        .connect(provider)
        .give_certificate_to_user(
          courseName,
          courseLength,
          certificateUrl,
          instructorsNames,
          user1.address
        )
    ).to.be.revertedWith("Course not found");
  });

  it("should not give a certificate to a user who is already certified in the course", async function () {
    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    await certificationSystem
      .connect(provider)
      .create_certificate("Blockchain Developer", ["Solidity", "Ethereum"]);

    const courseName = "Blockchain Developer";
    const courseLength = "3 months";
    const certificateUrl = "https://example.com/certificate";
    const instructorsNames = ["Instructor 1", "Instructor 2"];

    await certificationSystem.connect(user1).register_yourself("User 1");

    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        courseName,
        courseLength,
        certificateUrl,
        instructorsNames,
        user1.address
      );

    await expect(
      certificationSystem
        .connect(provider)
        .give_certificate_to_user(
          courseName,
          courseLength,
          certificateUrl,
          instructorsNames,
          user1.address
        )
    ).to.be.revertedWith("This user is already certified in this course.");
  });

  //   // /////////////////////////////////////////////////////////////// send_certificate() function tests

  it("should allow sending a certificate to a registered user", async function () {
    const courseName = "Blockchain Basics";
    const skills = ["Solidity", "Web3.js", "Ethereum"];
    const certificateUrl = "https://example.com/certificates/123";

    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");
    await certificationSystem
      .connect(provider)
      .create_certificate(courseName, skills);

    await certificationSystem.connect(user1).register_yourself("Marian");
    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        courseName,
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
    const certificateUrl = "https://example.com/certificates/123";

    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");
    await certificationSystem
      .connect(provider)
      .create_certificate(courseName, skills);

    await certificationSystem.connect(user1).register_yourself("Marian");
    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        courseName,
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
    const skills2 = ["Smart Contracts", "Decentralized Applications"];
    const certificateUrl1 = "https://example.com/certificates/123";
    const certificateUrl2 = "https://example.com/certificates/456";

    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");
    await certificationSystem
      .connect(provider)
      .create_certificate(courseName1, skills1);
    await certificationSystem
      .connect(provider)
      .create_certificate(courseName2, skills2);

    await certificationSystem.connect(user1).register_yourself("Marian");
    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        courseName1,
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

  it("should not allow inviting a provider to register", async function () {
    await certificationSystem.connect(user1).register_yourself("Muhammad");

    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("ABC Institute");

    await expect(
      certificationSystem
        .connect(user1)
        .invite_others(provider.address, "Join our certification system!")
    ).to.be.revertedWith("You can't invite provider.");
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

    await certificationSystem
      .connect(provider)
      .create_certificate(courseName, skills);

    const userName2 = "Muhammad";
    await certificationSystem.connect(user2).register_yourself(userName2);

    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        "Blockchain Fundamentals",
        "4 weeks",
        "https://example.com/certificate",
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
    expect(certificateUrls[0]).to.equal("https://example.com/certificate");
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
      .create_certificate(courseName, skills);

    await certificationSystem
      .connect(provider)
      .create_certificate(courseName2, skills2);

    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        "Blockchain Fundamentals",
        "3 weeks",
        "https://example.com/certificate",
        ["Mirza", "Baig"],
        user2.address
      );
    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        "JavaScript Basics",
        "4 weeks",
        "https://example.com/certificate2",
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
    expect(certificateUrls[0]).to.equal("https://example.com/certificate");
    expect(senders[1]).to.equal(user2.address);
    expect(courseNames[1]).to.equal("JavaScript Basics");
    expect(certificateUrls[1]).to.equal("https://example.com/certificate2");
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
    await certificationSystem
      .connect(provider)
      .create_certificate(courseName, skills);

    const courseLength = "4 weeks";
    const certificateUrl = "https://example.com/certificate";
    const instructorsNames = ["Mirza", "Baig"];
    await certificationSystem
      .connect(provider)
      .give_certificate_to_user(
        courseName,
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
    const skills = ["Smart Contracts", "Solidity", "Web3.js"];
    await certificationSystem
      .connect(provider)
      .create_certificate(courseName, skills);

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

    await certificationSystem
      .connect(provider)
      .create_certificate("Blockchain Developer", courseSkills);

    const foundSkills = await certificationSystem.find_skills("ethereum");
    expect(foundSkills).to.have.lengthOf(3);
    expect(foundSkills).to.include.members([
      "Ethereum with polygon",
      "ethereum blockchain",
      "ETHEREUM VM",
    ]);
  });

  it("Should find skills ignoring case sensitivity", async () => {
    const courseSkills = ["solidity", "ethereum", "Blockchain"];

    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await certificationSystem
      .connect(provider)
      .become_provider("Provider Institute");

    await certificationSystem
      .connect(provider)
      .create_certificate("Blockchain Developer", courseSkills);

    const foundSkills = await certificationSystem.find_skills("ETHEREUM");
    expect(foundSkills).to.have.lengthOf(1);
    expect(foundSkills).to.include.members(["ethereum"]);
  });

  it("Should find no skills if an empty keyword is given", async () => {
    const courseSkills = ["Solidity", "Ethereum", "Blockchain"];

    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await certificationSystem
      .connect(provider)
      .become_provider("Provider Institute");

    await certificationSystem
      .connect(provider)
      .create_certificate("Blockchain Developer", courseSkills);

    const foundSkills = await certificationSystem.find_skills(" ");
    expect(foundSkills).to.have.lengthOf(0);
  });

  it("Should find no skills if the keyword does not match any part of a skill", async () => {
    const courseSkills = ["Solidity", "Ethereum", "Blockchain"];

    await certificationSystem.connect(provider).register_yourself("Muhammad");

    await certificationSystem
      .connect(provider)
      .become_provider("Provider Institute");

    await certificationSystem
      .connect(provider)
      .create_certificate("Blockchain Developer", courseSkills);

    const foundSkills = await certificationSystem.find_skills("XRP");
    expect(foundSkills).to.have.lengthOf(0);
  });

  it("Should find no skills if no skills have been created", async () => {
    const foundSkills = await certificationSystem.find_skills("Ethereum");
    expect(foundSkills).to.have.lengthOf(0);
  });

  //   // /////////////////////////////////////////////////////////////// find_certificates() function tests

  it("should find certificates for existing keywords", async function () {
    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("Provider Institute");

    await certificationSystem
      .connect(provider)
      .create_certificate("Blockchain Developer", ["Solidity", "Ethereum"]);
    await certificationSystem
      .connect(provider)
      .create_certificate("Web Development", ["HTML", "CSS", "JavaScript"]);

    const [certificates, providers, institutes, skills] =
      await certificationSystem.find_certificates("Blockchain");

    expect(certificates).to.have.lengthOf(1);
    expect(certificates[0]).to.equal("Blockchain Developer");

    expect(providers).to.have.lengthOf(1);

    expect(institutes).to.have.lengthOf(1);

    expect(skills).to.have.lengthOf(1);
  });

  it("should find multiple certificates for the same keyword", async function () {
    await certificationSystem.connect(provider).register_yourself("Muhammad");
    await certificationSystem
      .connect(provider)
      .become_provider("Provider Institute");

    await certificationSystem
      .connect(provider)
      .create_certificate("Data Science", ["Python", "Machine Learning"]);
    await certificationSystem
      .connect(provider)
      .create_certificate("Data Analyst", ["Python", "Data Analysis"]);

    const [certificates, providers, institutes, skills] =
      await certificationSystem.find_certificates("Data");

    expect(certificates).to.have.lengthOf(2);
    expect(certificates).to.deep.equal(["Data Science", "Data Analyst"]);

    expect(providers).to.have.lengthOf(2);

    expect(institutes).to.have.lengthOf(2);

    expect(skills).to.have.lengthOf(2);
  });

  it("should return empty arrays for non-existing keywords", async function () {
    const [certificates, providers, institutes, skills] =
      await certificationSystem.find_certificates("Blockchain");

    expect(certificates).to.have.lengthOf(0);
    expect(providers).to.have.lengthOf(0);
    expect(institutes).to.have.lengthOf(0);
    expect(skills).to.have.lengthOf(0);
  });
});
