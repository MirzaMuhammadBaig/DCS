const ethers = require('ethers');
require("dotenv").config();

async function main() {
    const infuraUrl = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
    const provider = new ethers.JsonRpcProvider(infuraUrl);

    const contractABI = require("../artifacts/contracts/certification_system.sol/certification_system.json"); // Your contract ABI
    const contractAddress = "0x9e301cF765f25F1A7baC924e2BE07a564e7ADB76";

    const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

    async function executeFunctionWithGasEstimation(fn, params) {
        const gasEstimate = await contract.estimateGas[fn](...params);

        console.log('Gas Estimate:', gasEstimate.toString());

        const gasPrice = await provider.getGasPrice();
        console.log('Gas Price:', gasPrice.toString());

        const gasFee = gasEstimate.mul(gasPrice);
        console.log('Gas Fee:', ethers.utils.formatEther(gasFee), 'ETH');

        const tx = await contract[fn](...params);
        await tx.wait();

        console.log('Transaction Hash:', tx.hash);
    }

    // Example: Calling register_yourself function
    await executeFunctionWithGasEstimation('register_yourself', ['Muhammad']);

    // Example: Calling become_provider function
    await executeFunctionWithGasEstimation('become_provider', ['Udemy']);

    // Example: Calling invite_others function
    await executeFunctionWithGasEstimation('invite_others', ['0x107F6A9104de8d364449aeb3598fE61Af0E1F4F5', 'Join this platform']);

    // Example: Calling send_certificate function
    await executeFunctionWithGasEstimation('send_certificate', ['0x1ce800B897113927cC9F15845902e457cAEf0F26', 'Udemy']);

    // Example: Calling issue_certificate function
    await executeFunctionWithGasEstimation('issue_certificate', [
        'Udemy',
        ['Skill 1', 'Skill 2'],
        'https://example.com',
        '0x81ED8CDfd839eF98911A58161c4aa045CdEe672b' // Address of the recipient
    ]);
}

main();
