import { useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const DeletePic = ({ showDeletePic, setShowDeletePic, id }) => {
  const modalRef = useRef();

  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      setShowDeletePic(false);
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && showDeletePic) {
        setShowDeletePic(false);
      }
    },
    [showDeletePic, setShowDeletePic]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://leonie-backend.herokuapp.com/backoffice/picture/delete",
        { _id: id }
      );
      if (response.status === 200) {
        console.log(response.data);
        setShowDeletePic(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {showDeletePic ? (
        <div className="modal-background" ref={modalRef} onClick={closeModal}>
          <FontAwesomeIcon
            icon="times"
            className="closeIcon"
            onClick={() => {
              setShowDeletePic(!showDeletePic);
            }}
          />
          <div className="modal-wrapper">
            <form className="conf-form" onSubmit={handleSubmit}>
              <p className="conf-p">
                Are you sure you want to delete this picture? There's no going
                back...
              </p>
              <div className="conf-section">
                <button
                  type="button"
                  className="conf-button"
                  onClick={() => {
                    setShowDeletePic(!showDeletePic);
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

export default DeletePic;
