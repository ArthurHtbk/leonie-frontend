import Pictures from "../components/Pictures";

const Gallery = ({ language, userToken }) => {
  return (
    <div className="container">
      <h1>
        {language === "english"
          ? "Gallery"
          : language === "français"
          ? "Gallerie"
          : "Fotos"}
      </h1>
      <Pictures userToken={userToken} />
    </div>
  );
};

export default Gallery;
