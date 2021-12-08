import React, { Component } from "react";
import { Link } from "react-router-dom";

export class About extends Component {
  render() {
    return (
      <>
        <Link to="/menu">
          <button>Back</button>
        </Link>

        <div>
          {" "}
          About Job Search System in Catarman Northern Samar
          <p>Piolo's Commit</p>
        </div>
      </>
    );
  }
}

export default About;
