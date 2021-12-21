import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../images/leonie_logo_draft.png";

const Header = ({ userToken, setUser, language, setLanguage }) => {
  const [showLinks, setShowLinks] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const history = useHistory();

  return (
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
      <button
        className="navbar-burger"
        onClick={() => {
          setShowLinks(!showLinks);
        }}
      >
        <span className="burger-bar"></span>
      </button>
      <Link className="logo-link" to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-area">
        <li
          className="navbar-item"
          onClick={() => {
            setShowLinks(!showLinks);
          }}
        >
          <Link className="navbar-link" to="/">
            {language === "english"
              ? "Home"
              : language === "français"
              ? "Accueil"
              : "Startseite"}
          </Link>
        </li>
        <li
          className="navbar-item"
          onClick={() => {
            setShowLinks(!showLinks);
          }}
        >
          <Link className="navbar-link" to="/bio">
            {language === "english"
              ? "Biography"
              : language === "français"
              ? "Biographie"
              : "Biografie"}
          </Link>
        </li>
        <li
          className="navbar-item"
          onClick={() => {
            setShowLinks(!showLinks);
          }}
        >
          <Link className="navbar-link" to="/dates">
            {language === "english"
              ? "Dates"
              : language === "français"
              ? "Dates"
              : "Termine"}
          </Link>
        </li>
        <li
          className="navbar-item"
          onClick={() => {
            setShowLinks(!showLinks);
          }}
        >
          <Link className="navbar-link" to="/music">
            {language === "english"
              ? "Music"
              : language === "français"
              ? "Musique"
              : "Musik"}
          </Link>
        </li>
        <li
          className="navbar-item"
          onClick={() => {
            setShowLinks(!showLinks);
          }}
        >
          <Link className="navbar-link" to="/gallery">
            {language === "english"
              ? "Gallery"
              : language === "français"
              ? "Gallerie"
              : "Fotos"}
          </Link>
        </li>
        <li
          className="navbar-item"
          onClick={() => {
            setShowLinks(!showLinks);
          }}
        >
          <Link className="navbar-link" to="/contact">
            {language === "english"
              ? "Contact"
              : language === "français"
              ? "Contact"
              : "Kontakt"}
          </Link>
        </li>
        {userToken && (
          <button
            className="logout"
            onClick={() => {
              setUser(null);
              history.push("/");
              setShowLinks(!showLinks);
            }}
          >
            {language === "english"
              ? "Log out"
              : language === "français"
              ? "Se déconnecter"
              : "Abmelden"}
          </button>
        )}
      </ul>
      <div className="dropdown">
        <p
          className="languages"
          onClick={() => {
            setShowLang(!showLang);
          }}
        >
          {language.charAt(0).toUpperCase() + language.slice(1) + " "}
          {showLang ? (
            <FontAwesomeIcon icon="chevron-up" />
          ) : (
            <FontAwesomeIcon icon="chevron-down" />
          )}
        </p>
        <div className={showLang ? "show" : "hide"}>
          <button
            className="lang-button"
            onClick={() => {
              setLanguage("english");
              setShowLang(!showLang);
            }}
          >
            English
          </button>
          <button
            className="lang-button"
            onClick={() => {
              setLanguage("français");
              setShowLang(!showLang);
            }}
          >
            Français
          </button>
          <button
            className="lang-button"
            onClick={() => {
              setLanguage("deutsch");
              setShowLang(!showLang);
            }}
          >
            Deutsch
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
