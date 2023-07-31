// import { MobileLegendsAddress, OwnerAddress, ranks } from "@/lib/constants";
// import { useContract, useContractWrite } from "@thirdweb-dev/react";
// import axios from "axios";
// import FormData from "form-data";
// import React, { useState } from "react";
// import { Fragment } from "react";
// import { Listbox, Transition } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function UploadPinata({ selectedFile }) {
//   const [error, setError] = useState("");
  
//   const [selected, setSelected] = useState(ranks[1]);

//   const { contract } = useContract(MobileLegendsAddress);
//   const { mutateAsync: safeMint, isLoading: safeMintLoading } =
//     useContractWrite(contract, "safeMint");

//   const PinImageToIpfs = async (file) => {
//     const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";

//     const form_data = new FormData();
//     form_data.append("file", file);

//     if (
//       metadataNFT.legendName === "" ||
//       metadataNFT.description === "" ||
//       selected.name === ""
//     ) {
//       setError("Fill all Fields");
//     } else {
//       try {
//         const headers = {
//           pinata_api_key: "c3137cb993709c8b676b",
//           pinata_secret_api_key:
//             "04fa8f75276ea59b39c5eb16ec2b5f9fb3b122d1568f94f6530e47adc686ca50",
//         };

//         const axiosInstance = axios.create({
//           baseURL: pinataEndpoint,
//           maxContentLength: Infinity,
//           headers: headers,
//         });

//         const response = await axiosInstance.post("", form_data);
//         const imageHash = response.data.IpfsHash;
//         return imageHash;
//       } catch (err) {
//         setError(err.message);
//         throw err;
//       }
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       if (selectedFile) {
//         setError("");
//         const imageHash = await PinImageToIpfs(selectedFile);

//           await PinMetadataToIpfs(metadata);
        
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setMetaDataNFT((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <button
//         onClick={() => setShowModal(true)}
//         className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
//       >
//         <p className="text-sm font-medium leading-none text-white">Upload</p>
//       </button>
//       {showModal ? (
//         <>
//           <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//             <div className="relative mx-auto my-6 w-96">
//               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 <div className="relative p-6 flex-auto">
//                   <div>
//                     <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-3">
//                       Upload Data
//                     </h1>
//                     <label
//                       htmlFor="legendName"
//                       className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
//                     >
//                       Mobile Legend Name
//                     </label>
//                     <div className="relative mb-5 mt-2">
//                       <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.5}
//                           stroke="currentColor"
//                           className="w-6 h-6"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                         </svg>
//                       </div>
//                       <input
//                         id="legendName"
//                         name="legendName"
//                         onChange={handleInputChange}
//                         className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 pr-10 text-sm border-gray-300 rounded border"
//                         placeholder="Legend Name"
//                       />
//                     </div>
//                     <label
//                       htmlFor="rank"
//                       className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
//                     >
//                       Select Rank
//                     </label>
//                     <div className="relative mb-5 mt-2">
//                       <Listbox value={selected} onChange={setSelected}>
//                         {({ open }) => (
//                           <>
//                             <div className="relative mt-2">
//                               <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
//                                 <span className="flex items-center">
//                                   <span className="ml-1 block truncate">
//                                     {selected.name}
//                                   </span>
//                                 </span>
//                                 <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
//                                   <ChevronUpDownIcon
//                                     className="h-5 w-5 text-gray-400"
//                                     aria-hidden="true"
//                                   />
//                                 </span>
//                               </Listbox.Button>

//                               <Transition
//                                 show={open}
//                                 as={Fragment}
//                                 leave="transition ease-in duration-100"
//                                 leaveFrom="opacity-100"
//                                 leaveTo="opacity-0"
//                               >
//                                 <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                                   {ranks.map((rank) => (
//                                     <Listbox.Option
//                                       key={rank.id}
//                                       className={({ active }) =>
//                                         classNames(
//                                           active
//                                             ? "bg-indigo-500 text-white"
//                                             : "text-gray-800",
//                                           "relative cursor-default select-none py-2 pl-2 pr-9"
//                                         )
//                                       }
//                                       value={rank}
//                                     >
//                                       {({ selected, active }) => (
//                                         <>
//                                           <div className="flex items-center">
//                                             <span
//                                               className={classNames(
//                                                 selected
//                                                   ? "font-semibold"
//                                                   : "font-normal",
//                                                 "ml-3 block truncate"
//                                               )}
//                                             >
//                                               {rank.name}
//                                             </span>
//                                           </div>

//                                           {selected ? (
//                                             <span
//                                               className={classNames(
//                                                 active
//                                                   ? "text-white"
//                                                   : "text-indigo-600",
//                                                 "absolute inset-y-0 right-0 flex items-center pr-4"
//                                               )}
//                                             >
//                                               <CheckIcon
//                                                 className="h-5 w-5"
//                                                 aria-hidden="true"
//                                               />
//                                             </span>
//                                           ) : null}
//                                         </>
//                                       )}
//                                     </Listbox.Option>
//                                   ))}
//                                 </Listbox.Options>
//                               </Transition>
//                             </div>
//                           </>
//                         )}
//                       </Listbox>
//                     </div>
//                     <label
//                       htmlFor="description"
//                       className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
//                     >
//                       Description
//                     </label>
//                     <div className="relative mb-5 mt-2">
//                       <input
//                         id="description"
//                         name="description"
//                         onChange={handleInputChange}
//                         type="test"
//                         className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 pl-3 pr-3 text-sm border-gray-300 rounded border"
//                         placeholder="description"
//                       />
//                     </div>
//                     <label
//                       htmlFor="price"
//                       className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
//                     >
//                       Price
//                     </label>
//                     <div className="relative mb-5 mt-2">
//                       <input
//                         id="price"
//                         name="price"
//                         onChange={handleInputChange}
//                         type="test"
//                         className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 pl-3 pr-3 text-sm border-gray-300 rounded border"
//                         placeholder="price"
//                       />
//                     </div>

//                     {safeMintLoading ? (
//                       <>
//                         <button
//                           type="button"
//                           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
//                         >
//                           <svg
//                             aria-hidden="true"
//                             role="status"
//                             className="inline mr-3 w-4 h-4 text-white animate-spin"
//                             viewBox="0 0 100 101"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                               fill="#E5E7EB"
//                             ></path>
//                             <path
//                               d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                               fill="currentColor"
//                             ></path>
//                           </svg>
//                           Loading...
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <div className="flex justify-between items-center gap-4">
//                           <button
//                             onClick={handleUpload}
//                             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
//                           >
//                             Submit
//                           </button>
//                           <h1 className="text-red-800">{error}</h1>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                   <div
//                     onClick={() => setShowModal(false)}
//                     className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-label="Close"
//                       className="icon icon-tabler icon-tabler-x"
//                       width={20}
//                       height={20}
//                       viewBox="0 0 24 24"
//                       strokeWidth="2.5"
//                       stroke="currentColor"
//                       fill="none"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path stroke="none" d="M0 0h24v24H0z" />
//                       <line x1={18} y1={6} x2={6} y2={18} />
//                       <line x1={6} y1={6} x2={18} y2={18} />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : null}
//     </>
//   );
// }