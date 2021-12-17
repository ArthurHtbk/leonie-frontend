import { useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const HeroPic = ({ showHeroPic, setShowHeroPic, id, hero }) => {
  const modalRef = useRef();

  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      setShowHeroPic(false);
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && showHeroPic) {
        setShowHeroPic(false);
      }
    },
    [showHeroPic, setShowHeroPic]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://leonie-backend.herokuapp.com/backoffice/picture/hero",
        { _id: id }
      );
      if (response.status === 200) {
        console.log(response.data);
        setShowHeroPic(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {showHeroPic ? (
        <div className="modal-background" ref={modalRef} onClick={closeModal}>
          <FontAwesomeIcon
            icon="times"
            className="closeIcon"
            onClick={() => {
              setShowHeroPic(!showHeroPic);
            }}
          />
          <div className="modal-wrapper">
            <form className="conf-form" onSubmit={handleSubmit}>
              <p className="conf-p">
                {hero
                  ? "Are you sure you want to remove this picture from your homepage's hero?"
                  : "Are you sure you want to set this picture as your homepage's hero?"}
              </p>
              <div className="conf-section">
                <button
                  type="button"
                  className="conf-button"
                  onClick={() => {
                    setShowHeroPic(!showHeroPic);
                  }}
                >
                  No, please go back
                </button>
                <button type="submit" className="emphasized-button conf-button">
                  Yes, I'm sure!
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HeroPic;
