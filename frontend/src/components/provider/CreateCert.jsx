// import React from "react";
// import { ethers } from "ethers";

// function CreateCert() {
//   const contractAddress = "0xac427e8155a8c24112f62b9e69d7a21efa734af9";
//   const contractABI = require("../../contract/abi.json");
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const contract = new ethers.Contract(
//     contractAddress,
//     contractABI.abi,
//     provider
//   );

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const courseName = formData.get("courseName");
//     const skills = formData.get("skills").split(",");

//     try {
//       if (window.ethereum) {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         if (accounts.length === 0) {
//           throw new Error("User denied account access.");
//         }

//         const signer = provider.getSigner();

//         const tx = await contract
//           .connect(signer)
//           .create_certificate(courseName, skills);

//         await tx.wait();

//         alert("Certificate Successfully Created");
//       } else {
//         alert("Please connect to a wallet.");
//       }
//     } catch (error) {
//       try {
//         if (
//           error.message &&
//           error.error.data.message.includes(
//             "execution reverted: You are not provider"
//           )
//         ) {
//           alert("You are not provider");
//         } else {
//           alert("'Something went wrong'");
//         }
//       } catch (error) {
//         alert("Something went wrong");
//       }
//     }
//   };

//   return (
//     <>
//       <div className="pt-5 pb-5 ps-1 pe-1" style={{ background: "#6548bc" }}>
//         <div class="card text-center" style={{ background: "#27bee3" }}>
//           <div class="card-body">
//             <h3 class="card-title">Create Certificate</h3>
//             <p class="card-text mt-4">
//               After become the provider you can create certificate.
//             </p>
//             <form class="" onSubmit={handleFormSubmit}>
//               <div className="row g-3">
//                 <div className="col-2"></div>
//                 <div className="col-8">
//                   <div class="input-group">
//                     <input
//                       type="text"
//                       name="courseName"
//                       class="form-control"
//                       placeholder="Enter name of certificate/course"
//                       id="validationDefaultUsername"
//                       aria-describedby="inputGroupPrepend2"
//                       required
//                     />
//                   </div>
//                   <div class="input-group mt-3">
//                     <input
//                       type="text"
//                       name="skills"
//                       class="form-control"
//                       placeholder="Enter skills of certificate/course"
//                       id="validationDefaultUsername"
//                       aria-describedby="inputGroupPrepend2"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-2"></div>
//               </div>

//               <button type="submit" class="btn btn-primary mt-3">
//                 Create Certificate
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CreateCert;
