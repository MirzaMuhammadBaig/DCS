import React from "react";
import SearchCert from "./SearchCert";
import SearchSkill from "./SearchSkill";
import search from "../../assets/Hero/2.png";
import "../../App.css";

function Search() {
  return (
    <>
      <div className="ps-1 pe-1 pt-5 pb-5 " id="search" style={{ background: "#6548bc" }}>
        <h2 class="pb-3 pt-3 fw-bold text-center">Search</h2>

        <div class="pb-5 rounded" style={{ background: "#ffffff" }}>
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