import axios from "axios";
import { useState, useEffect } from "react";

import UpdateText from "../modals/UpdateText";

const Text = ({ language, userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdateText, setShowUpdateText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://leonie-backend.herokuapp.com/client/text"
        );
        setData(response.data);
        console.log(response.data);
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
          onClick={() => {
            setShowUpdateText(!showUpdateText);
          }}
          className="emphasized-button"
        >
          Update bio
        </button>
      )}
      <div className="bio-section">
        <img
          src={data[0].image.secure_url}
          alt="Leonie Hey"
          className="bio-pic"
        />
        <div className="bio-text">
          <strong>
            {language === "english"
              ? data[0].EN.strongEn
              : language === "français"
              ? data[0].FR.strongFr
              : data[0].DE.strongDe}
          </strong>
          <p style={{ whiteSpace: "pre-line", marginTop: "50px" }}>
            {language === "english"
              ? data[0].EN.plainEn
              : language === "français"
              ? data[0].FR.plainFr
              : data[0].DE.plainDe}
          </p>
        </div>
      </div>
      <UpdateText
        showUpdateText={showUpdateText}
        setShowUpdateText={setShowUpdateText}
        data={data[0]}
      />
    </div>
  );
};

export default Text;
