import React from "react";
import { ethers } from "ethers";
import HeroImage from "../assets/Hero/HeroImage.jpeg";

function Hero() {
  const contractAddress = require("../contract/abi.json");
  const contractABI = require("../contract/abi.json");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress.address,
    contractABI.abi,
    provider
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");

    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          throw new Error("User denied account access.");
        }

        const signer = provider.getSigner();

        const tx = await contract.connect(signer).register_yourself(name);

        await tx.wait();

        alert("Successfully Registered");
      } else {
        alert("Please connect to a wallet.");
      }
    } catch (error) {
      try {
        if (
          error.message &&
          error.error.data.message.includes(
            "execution reverted: Owner can't do anything"
          )
        ) {
          alert("Owner can't do anything");
        } else if (
          error.message &&
          error.error.data.message.includes(
            "execution reverted: You have already registered"
          )
        ) {
          alert("You have already registered");
        } else {
          alert("'Something went wrong'");
        }
      } catch (error) {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <div class="overflow-hidden " id="#" style={{ background: "#ffffff" }}>
        <div class="container-fluid col-xxl-12">
          <div
            class="row flex-lg-nowrap align-items-center g-5"
            // style={{ height: "100vh" }}
          >
            <div class="order-lg-1 w-100">
              <img
                style={{
                  "clip-path": "polygon(25% 0%, 100% 0%, 100% 99%, 0% 100%)",
                }}
                src={HeroImage}
                class="d-none d-lg-block mx-lg-auto img-fluid"
                alt="hero_image"
                loading="lazy"
                sizes="(max-width: 1080px) 100vw, 1080px"
                width="2160"
                height="768"
              />
            </div>

            <div class="col-lg-6 col-xl-5 text-center text-lg-start mt-xl-4">
              <div class="lc-block mb-5">
                <div editable="rich">
                  <h1 class="fw-bold display-3">DIGITAL CERTIFICATE SYSTEM</h1>
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

              <div class="lc-block mb-6">
                <form class="row g-3" onSubmit={handleFormSubmit}>
                  <div className="col-11 ">
                    <label class="form-label">
                      Register yourself to get started
                    </label>
                    <div class="input-group mb-3">
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
      </div>
    </>
  );
}

export default Hero;

{
  /* <div class="overflow-hidden">
	<div class="container-fluid col-xxl-8">
		<div class="row flex-lg-nowrap align-items-center g-5">
			<div class="order-lg-1 w-100">
				<img style="clip-path: polygon(25% 0%, 100% 0%, 100% 99%, 0% 100%);" src="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" class="d-block mx-lg-auto img-fluid" alt="Photo by Milad Fakurian" loading="lazy" srcset="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1618004912476-29818d81ae2e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NzV8fHB1cnBsZXxlbnwwfDB8fHwxNjQ3NDcxNjY4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="2160" height="768">
			</div>
			<div class="col-lg-6 col-xl-5 text-center text-lg-start pt-lg-5 mt-xl-4">
				<div class="lc-block mb-4">
					<div editable="rich">
						<h1 class="fw-bold display-3">The quick brown fox jumps over the lazy dog</h1>
					</div>
				</div>

				<div class="lc-block mb-5">
					<div editable="rich">
						<p class="rfs-8"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim.</p>
					</div>
				</div>

				<div class="lc-block mb-6"><a class="btn btn-primary px-4 me-md-2 btn-lg" href="#" role="button">Get it now</a>
				</div>

				<div class="lc-block">
					<div editable="rich">
						<p class="fw-bold"> Business collaboration based on trust:</p>
					</div>
				</div>
				<div class="row">
					<div class="lc-block col-3"><img class="img-fluid wp-image-975" src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/motorola.svg" width="" height="300" srcset="" sizes="" alt=""></div>
					<div class="lc-block col-3"><img class="img-fluid wp-image-977" src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/asus.svg" width="" height="300" srcset="" sizes="" alt=""></div>
					<div class="lc-block col-3"><img class="img-fluid wp-image-974" src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/sony.svg" width="" height="300" srcset="" sizes="" alt=""></div>
					<div class="lc-block col-3"><img class="img-fluid wp-image-967" src="https://lclibrary.b-cdn.net/starters/wp-content/uploads/sites/15/2021/11/samsung-282297.svg" width="" height="300" srcset="" sizes="" alt=""></div>
				</div>
			</div>

		</div><!-- /lc-block -->
	</div>
</div> */
}
