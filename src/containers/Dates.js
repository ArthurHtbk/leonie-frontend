import Gigs from "../components/Gigs";

const Dates = ({ language, userToken }) => {
  return (
    <div className="container">
      <h1>
        {language === "english"
          ? "Dates"
          : language === "français"
          ? "Dates"
          : "Termine"}
      </h1>
      <Gigs userToken={userToken} />
    </div>
  );
};

export default Dates;
