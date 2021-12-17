import axios from "axios";
import { useState, useEffect } from "react";

import illustration from "../images/Leonie_illustration.jpg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://leonie-backend.herokuapp.com/client/hero"
        );
        setData(response.data);
        setIsloading(false);
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
      <img
        src={data ? data.image.secure_url : illustration}
        alt="Hero"
        className="hero"
      />
      <div className="hero-text">Double Bass & Bass</div>
    </div>
  );
};

export default Home;
