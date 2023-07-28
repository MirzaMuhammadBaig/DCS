import React from "react";
import { ethers } from "ethers";

function Hero() {
  const contractAddress = "0x8ed5e5A03c2d6c1304688f3881e99B42C8ec10B4";
  const contractABI = require("../contract/abi.json");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");

    try {
      if (window.ethereum) {
        // Prompt user for account access
        await window.ethereum.enable();
        const signer = provider.getSigner();

        const tx = await contract.connect(signer).register_yourself(name);

        await tx.wait();

        alert("Registration successful!");
      } else {
        alert("Please connect to an Ethereum wallet like MetaMask.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert(`${error}`)
    }
  };

  return (
    <>
       <div class="overflow-hidden " id="#" style={{ background: "#27bee3" }}>
         <div class="container-fluid col-xxl-8 ps-4">
           <div
            class="row flex-lg-nowrap align-items-center "
            style={{ height: "100vh" }}
          >
            <div class="order-lg-1 w-100">
              <img
                style={{
                  "clip-path": "polygon(25% 0%, 100% 0%, 100% 99%, 0% 100%)",
                }}
                src="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768"
                class="d-block mx-lg-auto img-fluid"
                alt="hero_image"
                loading="lazy"
                srcset="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w"
                sizes="(max-width: 1080px) 100vw, 1080px"
                width="2160"
                height="768"
              />
            </div>
            <div class="col-lg-6 col-xl-8 text-center text-lg-start mt-xl-3 pb-3">
              <div class="lc-block mb-5">
                <div editable="rich">
                  <h1 class="fw-bold display-4">DIGITAL CERTIFICATE SYSTEM</h1>
                </div>
              </div>

              <div class="lc-block mb-5">
                <div editable="rich">
                  <p class="rfs-8" style={{ fontSize: "20px" }}>
                    A decentralized certification system empowering educational
                    providers to issue tamper-proof certificates for courses,
                    ensuring transparency and authenticity for learners
                    worldwide.
                  </p>
                </div>
              </div>

              <form class="row g-3" onSubmit={handleFormSubmit}>
                <div className="col-8">
                  <label class="form-label">
                    Register yourself to get started
                  </label>
                  <div class="input-group ">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter your name"
                      id="validationDefaultUsername"
                      aria-describedby="inputGroupPrepend2"
                      required
                      name="name"
                    />
                    <span class="input-group-text">
                      <button type="submit" class="btn btn-primary">
                        Register
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;

// import React from "react";
// import { ethers } from "ethers";
// const contract_abi = require("../contract/abi.json");

// function Hero() {
//   const contractAddress = "0x8ed5e5A03c2d6c1304688f3881e99B42C8ec10B4";
//   // const infuraId = "dd3c1a2fbb314c1490f10d0a2e3c32bd";
//   const private_key = "f31f61e5e3420118d62be9db5c5d8198cfe655793d2bc327ba9df4309ea5a163";

//   // const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const wallet = new ethers.Wallet(private_key,)

//   const contract = new ethers.Contract(
//     contractAddress,
//     contract_abi.abi,
//     provider
//   );

//   async function registerUser(name) {
//     try {
//       await contract.register_yourself(name);
//       console.log(`Registered user with name: ${name}`);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   async function handleFormSubmit(event) {
//     event.preventDefault();
//     const name = event.target.elements.name.value;
//     await registerUser(name);
//   }

//   return (
//     <>
//       <div class="overflow-hidden " id="#" style={{ background: "#27bee3" }}>
//         <div class="container-fluid col-xxl-8 ps-4">
//           <div
//             class="row flex-lg-nowrap align-items-center "
//             style={{ height: "100vh" }}
//           >
//             <div class="order-lg-1 w-100">
//               <img
//                 style={{
//                   "clip-path": "polygon(25% 0%, 100% 0%, 100% 99%, 0% 100%)",
//                 }}
//                 src="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768"
//                 class="d-block mx-lg-auto img-fluid"
//                 alt="hero_image"
//                 loading="lazy"
//                 srcset="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w"
//                 sizes="(max-width: 1080px) 100vw, 1080px"
//                 width="2160"
//                 height="768"
//               />
//             </div>
//             <div class="col-lg-6 col-xl-8 text-center text-lg-start mt-xl-3 pb-3">
//               <div class="lc-block mb-5">
//                 <div editable="rich">
//                   <h1 class="fw-bold display-4">DIGITAL CERTIFICATE SYSTEM</h1>
//                 </div>
//               </div>

//               <div class="lc-block mb-5">
//                 <div editable="rich">
//                   <p class="rfs-8" style={{ fontSize: "20px" }}>
//                     A decentralized certification system empowering educational
//                     providers to issue tamper-proof certificates for courses,
//                     ensuring transparency and authenticity for learners
//                     worldwide.
//                   </p>
//                 </div>
//               </div>

//               <form class="row g-3" onSubmit={handleFormSubmit}>
//                 <div className="col-8">
//                   <label class="form-label">
//                     Register yourself to get started
//                   </label>
//                   <div class="input-group ">
//                     <input
//                       type="text"
//                       class="form-control"
//                       placeholder="Enter your name"
//                       id="validationDefaultUsername"
//                       aria-describedby="inputGroupPrepend2"
//                       required
//                       name="name"
//                     />
//                     <span class="input-group-text">
//                       <button type="submit" class="btn btn-primary">
//                         Register
//                       </button>
//                     </span>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Hero;
