import { useState, useEffect } from "react";
import "../App.css";

const ProfileCard = () => {
  const [showDetails, setShowDetails] = useState<Boolean>(false);
  return (
    <div className="profile_card">
      <div className="profile_card_main">
        <div className="profile_card_header">
          <img
            alt="profile"
            className="profile_picture"
            src="https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0="
          ></img>

          <div className="profile_title">user name</div>
        </div>
        <div className="profile_card_buttons">
          <button className="more_hide_button" onClick={() => {setShowDetails(!showDetails)}}>{showDetails ? "Hide" : "More"}</button>
        </div>
      </div>
      {showDetails && <CardDetails profileUrl={"test.com"}/>}
    </div>
  );
};

type CardDetailsIProps = {
  profileUrl: string;
}
const CardDetails = ({profileUrl}: CardDetailsIProps) => {
  useEffect(() => {

    console.log(profileUrl);
  }, [])

  return (
    <div>
      details
    </div>
  )
}

export default ProfileCard;
