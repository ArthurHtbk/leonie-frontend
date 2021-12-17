import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import DeleteGig from "../modals/DeleteGig";
import UpdateGig from "../modals/UpdateGig";

const GigCard = ({ gig, userToken }) => {
  const [showDeleteGig, setShowDeleteGig] = useState(false);
  const [showUpdateGig, setShowUpdateGig] = useState(false);

  return (
    <div>
      <div className="gig">
        {userToken && (
          <FontAwesomeIcon
            icon="times"
            className="closeIcon"
            onClick={() => {
              setShowDeleteGig(!showDeleteGig);
            }}
          />
        )}
        <Link to={`/date/${gig.slug}`}>
          <FontAwesomeIcon icon="link" className="linkIcon" />
        </Link>
        {gig.image && (
          <img src={gig.image.secure_url} alt={gig.name} className="sticker" />
        )}
        <div className={userToken ? "info info-token" : "info"}>
          <strong>{gig.band}</strong>
          {userToken && (
            <FontAwesomeIcon
              icon="pencil-alt"
              className="pencilIcon"
              onClick={() => {
                setShowUpdateGig(!showUpdateGig);
              }}
            />
          )}
        </div>
        <div className="line"></div>
        <div className={userToken ? "info info-token" : "info"}>
          <span>{gig.date}</span>
          {userToken && (
            <FontAwesomeIcon
              icon="pencil-alt"
              className="pencilIcon"
              onClick={() => {
                setShowUpdateGig(!showUpdateGig);
              }}
            />
          )}
        </div>
        <div className="line"></div>
        <div className={userToken ? "info info-token" : "info"}>
          <span>{gig.place}</span>
          {userToken && (
            <FontAwesomeIcon
              icon="pencil-alt"
              className="pencilIcon"
              onClick={() => {
                setShowUpdateGig(!showUpdateGig);
              }}
            />
          )}
        </div>
        <div className="line"></div>
      </div>
      <DeleteGig
        showDeleteGig={showDeleteGig}
        setShowDeleteGig={setShowDeleteGig}
        id={gig._id}
      />
      <UpdateGig
        showUpdateGig={showUpdateGig}
        setShowUpdateGig={setShowUpdateGig}
        gig={gig}
      />
    </div>
  );
};

export default GigCard;
