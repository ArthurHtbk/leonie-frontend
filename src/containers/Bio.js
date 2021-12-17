import Text from "../components/Text";

const Bio = ({ language, userToken }) => {
  return (
    <div className="container">
      <h1>
        {language === "english"
          ? "Biography"
          : language === "français"
          ? "Biographie"
          : "Biografie"}
      </h1>
      <Text language={language} userToken={userToken} />
    </div>
  );
};

export default Bio;
