import { useState } from "react";
import "../App.css";
import { User } from "../types";
import { UserDetails } from "../types";

type ProfileCardIProps = {
  result: User;
};

const ProfileCard = ({ result }: ProfileCardIProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [fetchedProfilesIDs, setFetchedProfilesIDs] = useState<number[]>([]);
  const [fetchedProfiles, setFetchedProfiles] = useState<UserDetails[]>([]);

  const toggleVisibility = (id: number) => {
    console.log("toggeling visibility for id", id);
    const detailsMainElements = document.getElementById(id.toString());
    if (detailsMainElements) {
      let state = detailsMainElements.style.display;
      detailsMainElements.style.display = state === "block" ? "none" : "block";
    }
  };


  const updateDetailsElements = (data: any, id: number) => {
    console.log("updating details elements for id: ", id, data);
    const loginDetailsElement = document.getElementById(
      `login_${id.toString()}`
    );
    if (loginDetailsElement) {
      loginDetailsElement.innerText = data.login;
    }

    const blogDetailsElement = document.getElementById(`blog_${id.toString()}`);
    if (blogDetailsElement) {
      blogDetailsElement.setAttribute("href", data.blog);
      blogDetailsElement.setAttribute("target", "_blank");
      blogDetailsElement.innerText = data.blog ? data.blog : "unknown";
    }

    const emailDetailsElement = document.getElementById(
      `email_${id.toString()}`
    );
    if (emailDetailsElement) {
      emailDetailsElement.innerText = data.email ? data.email : "unknown";
    }

    const companyDetailsElement = document.getElementById(
      `company_${id.toString()}`
    );
    if (companyDetailsElement) {
      companyDetailsElement.innerText = data.company ? data.company : "unknown";
    }

    const bioDetailsElement = document.getElementById(`bio_${id.toString()}`);
    if (bioDetailsElement) {
      bioDetailsElement.innerText = data.bio ? `"${data.bio}"` : "unknown";
    }

    const githubUrlDetailsElement = document.getElementById(
      `github_${id.toString()}`
    );
    if (githubUrlDetailsElement) {
      githubUrlDetailsElement.setAttribute("href", data.html_url);
      githubUrlDetailsElement.setAttribute("target", "_blank");
      githubUrlDetailsElement.innerText = data.html_url;
    }
  };
  const retreiveProfileData = (url: string, id: number) => {
    if (!fetchedProfilesIDs.includes(id)) {
      toggleVisibility(id);
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          const data = {
            id: json.id,
            blog: json.blog,
            bio: json.bio,
            company: json.company,
            email: json.email,
            login: json.login,
            html_url: json.html_url,
          };

          fetchedProfiles.push(data);
          setFetchedProfiles(fetchedProfiles);

          fetchedProfilesIDs.push(id);
          setFetchedProfilesIDs(fetchedProfilesIDs);

          updateDetailsElements(data, id);
        });
    } else {
      toggleVisibility(id);
    }
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
              retreiveProfileData(result.url, result.id);
            }}
          >
            {showDetails ? "Hide" : "More"}
          </button>
        </div>
      </div>
      <CardDetails
        id={result.id.toString()}
      />
    </div>
  );
};

type CardDetialsProps = {
  id: string;
};
const CardDetails = ({ id }: CardDetialsProps) => {
  return (
    <div id={id} className="profile_card_details">
      <ul>
        <li>
          <b>Bio: </b>
          <span id={`bio_${id}`}>loading...</span>
        </li>
        <li>
          <b>Login: </b>
          <span id={`login_${id}`}>loading...</span>
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
          <span id={`email_${id}`}>loading...</span>
        </li>
        <li>
          <b>Company: </b>
          <span id={`company_${id}`}>loading...</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileCard;
