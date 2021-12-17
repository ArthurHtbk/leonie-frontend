import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";

import HeroPic from "../modals/HeroPic";
import DeletePic from "../modals/DeletePic";
import FullscreenPic from "../modals/FullscreenPic";

const PicCard = ({ picture, userToken }) => {
  const [showHeroPic, setShowHeroPic] = useState(false);
  const [showDeletePic, setShowDeletePic] = useState(false);
  const [showFullscreenPic, setShowFullscreenPic] = useState(false);
  const [hero, setHero] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isHero = async () => {
      try {
        const response = await axios.post(
          "https://leonie-backend.herokuapp.com/backoffice/picture/isHero",
          { _id: picture._id }
        );
        if (response.data === true) {
          setHero(true);
        } else {
          setHero(false);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    isHero();
  }, [picture._id, picture.hero]);

  return (
    <div>
      <div className="image">
        {userToken && (
          <FontAwesomeIcon
            icon="heart"
            className="heartIcon"
            onClick={() => {
              setShowHeroPic(!showHeroPic);
            }}
            style={{
              color: isLoading ? "white" : hero ? "#d81b45" : "white",
            }}
          />
        )}
        {userToken && (
          <FontAwesomeIcon
            icon="times"
            className="closeIcon"
            onClick={() => {
              setShowDeletePic(!showDeletePic);
            }}
          />
        )}
        <img
          src={picture.image.secure_url}
          alt={picture.name}
          className="picture"
          onClick={() => {
            setShowFullscreenPic(!showFullscreenPic);
          }}
        />
      </div>
      <HeroPic
        showHeroPic={showHeroPic}
        setShowHeroPic={setShowHeroPic}
        id={picture._id}
        hero={hero}
      />
      <DeletePic
        showDeletePic={showDeletePic}
        setShowDeletePic={setShowDeletePic}
        id={picture._id}
      />
      <FullscreenPic
        showFullscreenPic={showFullscreenPic}
        setShowFullscreenPic={setShowFullscreenPic}
        picture={picture}
      />
    </div>
  );
};

export default PicCard;
