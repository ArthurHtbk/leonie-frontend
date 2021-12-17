import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const DateSlug = ({ language }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://leonie-backend.herokuapp.com/client/gigs/${slug}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [slug]);

  return isLoading ? (
    <p>Loading content</p>
  ) : (
    <div className="container">
      <h1>{data.band}</h1>
      <div className="details-section">
        <div className="details">
          <p>
            {language === "english"
              ? "Location:"
              : language === "français"
              ? "Lieu :"
              : "Ort:"}{" "}
          </p>
          <strong>{data.place}</strong>
        </div>
        <div className="details">
          <p>
            {language === "english"
              ? "Date:"
              : language === "français"
              ? "Date :"
              : "Datum:"}{" "}
          </p>
          <strong>{data.date}</strong>
        </div>
        <div className="details">
          <p>
            {language === "english"
              ? "Contact information:"
              : language === "français"
              ? "Contact des organisateurs :"
              : "Kontaktinformation:"}{" "}
          </p>
          <strong>{data.contact}</strong>
        </div>
      </div>
      <div className="bio-section">
        <img src={data.image.secure_url} alt={data.name} className="bio-pic" />
        <div className="bio-text">
          <p style={{ whiteSpace: "pre-line" }}>
            {language === "english"
              ? data.description.EN
              : language === "français"
              ? data.description.FR
              : data.description.DE}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DateSlug;
