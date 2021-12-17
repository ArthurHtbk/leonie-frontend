const Contact = ({ language }) => {
  return (
    <div className="container">
      <h1>
        {language === "english"
          ? "Contact"
          : language === "français"
          ? "Contact"
          : "Kontakt"}
      </h1>
    </div>
  );
};

export default Contact;
