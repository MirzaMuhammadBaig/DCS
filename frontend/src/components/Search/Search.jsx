import React from "react";
import SearchCert from "./SearchCert";
import SearchSkill from "./SearchSkill";
import search from "../../assets/Hero/2.png";
import "../../App.css";

function Search() {
  return (
    <>
      <div className="p-5 pt-3 " id="search" style={{ background: "#6548bc" }}>
        <h2 class="pb-3 pt-3 fw-bold text-center">Search</h2>

        <div class="pb-5 rounded" style={{ background: "#27bee3" }}>
          <div class="image-container">
            <img
              src={search}
              class="card-img"
              alt="searchImage"
              style={{ height: "50%", width: "12%" }}
            />
          </div>
          <SearchCert />
          <SearchSkill />
        </div>
      </div>
    </>
  );
}

export default Search;

{
  /* <p class="card-text">
  <small>Last updated 3 mins ago</small>
</p> */
}
