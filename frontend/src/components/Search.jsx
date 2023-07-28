import React from "react";
import search from "../assets/Hero/2.png";
import "../App.css";

function Search() {
  return (
    <>
    <div className="p-5 pt-3" id="search" style={{background: "#6548bc"}}>
      <h2 class="pb-3 pt-3 fw-bold">Search</h2>

      <div class="card pb-5" style={{background: "#27bee3"}}>
        <div class="image-container pt-5">
          <img
            src={search}
            class="card-img"
            alt="..."
            style={{ height: "100%", width: "25%" }}
            />
        </div>

        <div class="card-img-overlay">
          <h3 class="card-title text-center pt-5">Certificates & Skills</h3>
          <div class="card-text pt-5">
            <div class="container text-center" style={{ marginTop: "23vh" }}>
              <div class="row">
                <form class="d-flex col " role="search">
                  <input
                    class="form-control me-2"
                    type="certificates"
                    placeholder="certificates"
                    aria-label="certificates"
                    />

                  <button class="btn btn-primary" type="submit">
                    Search
                  </button>
                </form>
                <form class="d-flex col" role="search">
                  <input
                    class="form-control me-2"
                    type="skills"
                    placeholder="skills"
                    aria-label="skills"
                  />

                  <button class="btn btn-primary" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
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
