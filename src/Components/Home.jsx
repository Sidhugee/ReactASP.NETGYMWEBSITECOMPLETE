import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Email from "./EmailForm";
import Trainer1 from "../Images/Trainer1.jpg";
import Trainer2 from "../Images/Trainer2.jpg";
import Trainer3 from "../Images/Trainer3.jpg";
import { link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [trainers, settrainers] = useState([]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(3);
  const header = new Headers({ "Access-Control-Allow-Origin": "*" });
  useEffect(() => {
    fetch("https://localhost:44368/api/trainer", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => settrainers(data))
      .catch((err) => console.log(err));
  }, []);
  function loadMore() {
    setVisible((load) => load + 3);
  }
  return (
    <div>
      <Navbar />
      <Header />
      <div className="container">
        <div className="About vh-100 text-center justify-content-center align-items-center d-flex ">
          <div className="row">
            <div className="col-3">
              {" "}
              <h4 className="w-100">
                <span className="AboutA fw-bold f-80 logo-col"> A </span>
                <span className="AboutB fw-bold nav-texts text-underline text-light">
                  bout Us
                </span>
              </h4>
            </div>
            <div className="col-9">
              {" "}
              <p className="container fw-bolder text-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                inventore debitis fugit hic quos quisquam, veritatis sapiente.
                Debitis quibusdam quia temporibus earum, incidunt nihil ipsam.
                Autem consectetur veniam esse ea.
              </p>
              <p className="container fw-bolder text-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                inventore mporibus earum, incidunt nihil ipsam. Autem
                consectetur veniam esse ea.
              </p>
              <p className="container fw-bolder text-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                inventoreus earum, incidunt nihil ipsam. Autem consectetur
                veniam esse ea.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Trainers Start */}

      <div className="Trainers">
        <h4 className="w-100 container-fluid text-center ">
          <span className="AboutA fw-bold f-80 logo-col"> T </span>
          <span className="AboutB fw-bold nav-texts text-light text-underline">
            rainers
          </span>
        </h4>
        <input
          id="search"
          type="text"
          class="input searchBar"
          placeholder="search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="row w-100">
          {trainers
            .filter((trainer) => {
              if (search == "") {
                return trainer;
              } else if (
                trainer.Name.toString()
                  .toLowerCase()
                  .indexOf(search.toString().toLowerCase()) > -1
              ) {
                return trainer;
              }
            })
            .slice(0, visible)
            .map((trainer) => (
              <div key={trainer.Id} className="col-4 text-center w-33 my-5">
                <div class="card w-80 bg-darkGrey mx-auto">
                  {/* <img src={Trainer1} class="card-img-top vh-37" alt="..." /> */}
                  <div class="card-body">
                    <h5 class="card-title logo-col fw-bold">{trainer.Name}</h5>

                    <p class="card-text text-light">
                      About :{trainer.Discription}
                    </p>
                    <p class="card-text text-light">
                      Experience: {trainer.Experience}
                    </p>

                    <Link
                      className="btn btn-black"
                      to={`/TrainersDetail/${trainer.Id}`}
                    >
                      Check Now!
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="mx-auto text-center">
          <button
            type="button"
            className="btn logo-col bg-light loadMore"
            style={{ fontWeight: 900 }}
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      </div>

      {/* Trainers End */}
      <Email />
      {/* <switch>
        <Route path="/trainerDetail/:Id" children={<TrainerDetail />}></Route>
      </switch> */}
    </div>
  );
}
