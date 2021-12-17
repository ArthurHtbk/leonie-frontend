import axios from "axios";
import { useState, useEffect } from "react";

import PicCard from "./PicCard";
import AddPic from "../modals/AddPic";

const Pictures = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showAddPic, setShowAddPic] = useState(false);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://leonie-backend.herokuapp.com/client/pictures",
          { cancelToken: source.token }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled");
        } else {
          throw error;
        }
      }
    };
    fetchData();

    return () => {
      console.log("Unmounting");
      source.cancel();
    };
  }, []);

  return isLoading ? (
    <p>Loading content</p>
  ) : (
    <div className="container">
      {userToken && (
        <button
          type="button"
          onClick={() => {
            setShowAddPic(!showAddPic);
          }}
          className="emphasized-button"
        >
          Add a picture
        </button>
      )}
      <div className="pictures-section">
        {data.map((picture) => {
          return (
            <PicCard
              picture={picture}
              key={picture._id}
              userToken={userToken}
            />
          );
        })}
      </div>
      <AddPic showAddPic={showAddPic} setShowAddPic={setShowAddPic} />
    </div>
  );
};

export default Pictures;
