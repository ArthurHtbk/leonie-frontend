import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useEffect } from "react";

import AddUrl from "../modals/AddUrl";
import DeleteUrl from "../modals/DeleteUrl";

const Urls = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showAddUrl, setShowAddUrl] = useState(false);
  const [showDeleteUrl, setShowDeleteUrl] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://leonie-backend.herokuapp.com/client/urls"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading content</p>
  ) : (
    <div className="container">
      {userToken && (
        <button
          type="button"
          className="emphasized-button"
          onClick={() => {
            setShowAddUrl(!showAddUrl);
          }}
        >
          New video
        </button>
      )}
      <div className="music">
        {data.map((url) => {
          return (
            <div className="video-section">
              {userToken && (
                <FontAwesomeIcon
                  icon="times"
                  className="closeIcon"
                  onClick={() => {
                    setShowDeleteUrl(!showDeleteUrl);
                  }}
                />
              )}
              <div className="line"></div>
              <h3>{url.name}</h3>
              <div className="video-wrapper" key={url._id}>
                <iframe
                  width="560"
                  height="315"
                  src={url.url.replace("watch?v=", "embed/")}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          );
        })}
      </div>
      <AddUrl showAddUrl={showAddUrl} setShowAddUrl={setShowAddUrl} />
      <DeleteUrl
        showDeleteUrl={showDeleteUrl}
        setShowDeleteUrl={setShowDeleteUrl}
      />
    </div>
  );
};

export default Urls;
