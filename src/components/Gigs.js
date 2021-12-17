import axios from "axios";
import { useState, useEffect } from "react";

import GigCard from "./GigCard";
import AddGig from "../modals/AddGig";

const Gigs = ({ userToken }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [showAddGig, setShowAddGig] = useState(false);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://leonie-backend.herokuapp.com/client/gigs",
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
          className="emphasized-button"
          onClick={() => {
            setShowAddGig(!showAddGig);
          }}
        >
          Add a date
        </button>
      )}
      <div className="gig-section">
        {data.map((gig) => {
          return <GigCard gig={gig} key={gig._id} userToken={userToken} />;
        })}
      </div>
      <AddGig showAddGig={showAddGig} setShowAddGig={setShowAddGig} />
    </div>
  );
};

export default Gigs;
