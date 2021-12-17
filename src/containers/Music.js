import Urls from "../components/Urls";

const Music = ({ language, userToken }) => {
  return (
    <div className="container">
      <h1>
        {language === "english"
          ? "Music"
          : language === "français"
          ? "Musique"
          : "Musik"}
      </h1>
      <Urls userToken={userToken} />
    </div>
  );
};

export default Music;
