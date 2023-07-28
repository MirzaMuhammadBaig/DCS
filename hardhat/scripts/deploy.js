const hre = require("hardhat");

async function main() {
  const certification_system = await hre.ethers.deployContract("certification_system");

  await certification_system.waitForDeployment("Udemy");

  console.log(
    `Contract deployed at: ${certification_system.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
