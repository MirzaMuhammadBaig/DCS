import React, { useState } from "react";
import { ethers } from "ethers";

function SearchCert() {
  const [certificateDetails, setCertificateDetails] = useState(null);

  const contractAddress = "0xac427e8155a8c24112f62b9e69d7a21efa734af9";
  const contractABI = require("../../contract/abi.json");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress,
    contractABI.abi,
    provider
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const certificate = formData.get("certificate");

    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          throw new Error("User denied account access.");
        }

        const signer = provider.getSigner();

        const certificateData = await contract
          .connect(signer)
          .find_certificates(certificate);

        setCertificateDetails(certificateData);
        console.log(certificateDetails);
      } else {
        alert("Please connect to a wallet.");
      }
    } catch (error) {
      alert(`Something went wrong.\n${error}`);
    }
  };

  return (
    <>
      <div id="search">
        <div className="ps-5 pe-5 pb-5">
          <div class="card text-center" style={{ background: "#27bee3" }}>
            {/* <div class="card-header">Become Provider</div> */}
            <div class="card-body" >
              <h3 class="card-title">Certificates</h3>
              <p class="card-text mt-4">
                You can find certificates.
              </p>
              <form class="row g-3" onSubmit={handleFormSubmit}>
                <div className="col-2"></div>
                <div className="col-8">
                  <div class="input-group mt-3">
                    <input
                      type="text"
                      name="certificate"
                      class="form-control"
                      placeholder="certificate name"
                      id="validationDefaultUsername"
                      aria-describedby="inputGroupPrepend2"
                      required
                    />
                  </div>
                </div>
                <div className="col-2"></div>
                <div className="col-5"></div>
                <button type="submit" class="btn btn-primary mt-3 col-2">
                  Search
                </button>
                <div className="col-5"></div>
              </form>
            </div>
            {certificateDetails ? (
              <div class="card-footer pt-4">
                <p>
                  <span className="fw-bold">Certificate Names: </span>
                  {certificateDetails.Certificates.map((course) => course).join(
                    ", "
                  )}
                </p>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchCert;

// import React, { useState } from "react";
// import { ethers } from "ethers";
// import search from "../assets/Hero/2.png";
// import "../App.css";

// function Search() {
//   const [skills, setSkills] = useState(null);
//   const [certificates, setCertificates] = useState(null);

//   const contractAddress = "0xac427e8155a8c24112f62b9e69d7a21efa734af9";
//   const contractABI = require("../contract/abi.json");
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const contract = new ethers.Contract(
//     contractAddress,
//     contractABI.abi,
//     provider
//   );

//   const handleSkills = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const skill = formData.get("skill");

//     try {
//       if (window.ethereum) {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         if (accounts.length === 0) {
//           throw new Error("User denied account access.");
//         }

//         const signer = provider.getSigner();

//         const skillsData = await contract
//           .connect(signer)
//           .find_skills(skill);

//           setSkills(skillsData);
//           console.log(skills);
//       } else {
//         alert("Please connect to a wallet.");
//       }
//     } catch (error) {
//       alert(`Something went wrong.\n${error}`);
//     }
//   };

//   const handleCertificates = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const certificate = formData.get("certificate");

//     try {
//       if (window.ethereum) {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         if (accounts.length === 0) {
//           throw new Error("User denied account access.");
//         }

//         const signer = provider.getSigner();

//         const certificateData = await contract
//           .connect(signer)
//           .find_certificates(certificate);

//           setCertificates(certificateData);
//           console.log(certificates);
//       } else {
//         alert("Please connect to a wallet.");
//       }
//     } catch (error) {
//       alert(`Something went wrong.\n${error}`);
//     }
//   };

//   return (
//     <>
//       <div className="p-5 pt-3" id="search" style={{ background: "#6548bc" }}>
//         <h2 class="pb-3 pt-3 fw-bold">Search</h2>

//         <div class="card pb-5" style={{ background: "#27bee3" }}>
//           <div class="image-container pt-5">
//             <img
//               src={search}
//               class="card-img"
//               alt="..."
//               style={{ height: "100%", width: "25%" }}
//             />
//           </div>

//           <div class="card-img-overlay">
//             <h3 class="card-title text-center pt-5">Certificates & Skills</h3>
//             <div class="card-text pt-5">
//               <div class="container text-center" style={{ marginTop: "23vh" }}>
//                 <div class="row">
//                   <form class="d-flex col" onSubmit={handleSkills}>
//                     <input
//                       class="form-control me-2"
//                       type="certificates"
//                       name="skill"
//                       placeholder="certificates"
//                       aria-label="certificates"
//                     />

//                     <button class="btn btn-primary" type="submit">
//                       Search
//                     </button>
//                   </form>
//                   <form class="d-flex col" onSubmit={handleCertificates}>
//                     <input
//                       class="form-control me-2"
//                       type="skills"
//                       name="certificate"
//                       placeholder="skills"
//                       aria-label="skills"
//                     />

//                     <button class="btn btn-primary" type="submit">
//                       Search
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Search;

// {
//   /* <p class="card-text">
//   <small>Last updated 3 mins ago</small>
// </p> */
// }
