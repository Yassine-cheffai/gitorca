import { useState, useEffect } from "react";
import "../App.css";
import { User } from "../types";
import { UserDetails } from "../types";

type ProfileCardIProps = {
  result: User;
};

type IProfiles = {
  id: UserDetails;
};
const ProfileCard = ({ result }: ProfileCardIProps) => {
  const [showDetails, setShowDetails] = useState<Boolean>(false);
  const [profiles, setProfiles] = useState({ id: {} });

  const retreiveProfileData = (url: string, id: number) => {
    /// if the profile id don't already exist in the profiles, we call the url, get the data and
    /// add it to the profiles state
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        profiles.id = json;
        setProfiles(profiles);

        const loginDetailsElement = document.getElementById(
          `login_${id.toString()}`
        );
        if (loginDetailsElement) {
          loginDetailsElement.innerText = json.login;
        }

        const blogDetailsElement = document.getElementById(
          `blog_${id.toString()}`
        );
        if (blogDetailsElement) {
          blogDetailsElement.setAttribute("href", json.blog);
          blogDetailsElement.setAttribute("target", "_blank");
          blogDetailsElement.innerText = json.blog ? json.blog : "unknown";
        }

        const emailDetailsElement = document.getElementById(
          `email_${id.toString()}`
        );
        if (emailDetailsElement) {
          emailDetailsElement.innerText = json.email ? json.email : "unknown";
        }

        const companyDetailsElement = document.getElementById(
          `company_${id.toString()}`
        );
        if (companyDetailsElement) {
          companyDetailsElement.innerText = json.company
            ? json.company
            : "unknown";
        }

        const bioDetailsElement = document.getElementById(
          `bio_${id.toString()}`
        );
        if (bioDetailsElement) {
          bioDetailsElement.innerText = json.bio ? `"${json.bio}"` : "unknown";
        }

        const githubUrlDetailsElement = document.getElementById(
          `github_${id.toString()}`
        );
        if (githubUrlDetailsElement) {
          githubUrlDetailsElement.setAttribute("href", json.html_url);
          githubUrlDetailsElement.setAttribute("target", "_blank");
          githubUrlDetailsElement.innerText = json.html_url;
        }
      });
  };
  return (
    <div className="profile_card">
      <div className="profile_card_main">
        <div className="profile_card_header">
          <img
            alt="profile"
            className="profile_picture"
            src={result.avatar_url}
          ></img>

          <div className="profile_title">
            <a target="_black" href={result.html_url}>
              {result.login}
            </a>
          </div>
        </div>
        <div className="profile_card_buttons">
          <button
            className="more_hide_button"
            onClick={() => {
              setShowDetails(!showDetails);
              // console.log(
              //   "retreive profile data and save them in mapping dict where the id is the user id and the value are the user data"
              // );
              retreiveProfileData(result.url, result.id);
            }}
          >
            {showDetails ? "Hide" : "More"}
          </button>
        </div>
      </div>
      {showDetails && <CardDetails id={result.id.toString()} />}
    </div>
  );
};

type CardDetialsProps = {
  id: string;
};
const CardDetails = ({ id }: CardDetialsProps) => {
  return (
    <div id={id} className="profile_card_details">
      <ul style={{ textAlign: "left" }}>
        <li>
          <b>Bio: </b>
          <p id={`bio_${id}`}>loading...</p>
        </li>
        <li>
          <b>Login: </b>
          <p id={`login_${id}`}>loading...</p>
        </li>
        <li>
          <b>Blog: </b>
          <a id={`blog_${id}`}>loading...</a>
        </li>
        <li>
          <b>Github: </b>
          <a
            id={`github_${id}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            loading...
          </a>
        </li>
        <li>
          <b>Email: </b>
          <p id={`email_${id}`}>loading...</p>
        </li>
        <li>
          <b>Company: </b>
          <p id={`company_${id}`}>
            loading...
          </p>
        </li>
      </ul>
    </div>
  );
};

export default ProfileCard;
