import { useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const DeleteGig = ({ showDeleteGig, setShowDeleteGig, id }) => {
  const modalRef = useRef();

  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      setShowDeleteGig(false);
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && showDeleteGig) {
        setShowDeleteGig(false);
      }
    },
    [showDeleteGig, setShowDeleteGig]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://leonie-backend.herokuapp.com/backoffice/gig/delete",
        { _id: id }
      );
      if (response.status === 200) {
        console.log(response.data);
        setShowDeleteGig(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {showDeleteGig ? (
        <div className="modal-background" ref={modalRef} onClick={closeModal}>
          <FontAwesomeIcon
            icon="times"
            className="closeIcon"
            onClick={() => {
              setShowDeleteGig(!showDeleteGig);
            }}
          />
          <div className="modal-wrapper">
            <form className="conf-form" onSubmit={handleSubmit}>
              <p className="conf-p">
                Are you sure you want to delete this date? There's no going
                back...
              </p>
              <div className="conf-section">
                <button
                  type="button"
                  className="conf-button"
                  onClick={() => {
                    setShowDeleteGig(!showDeleteGig);
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

export default DeleteGig;
