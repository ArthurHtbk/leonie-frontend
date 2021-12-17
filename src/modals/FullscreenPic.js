import { useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FullscreenPic = ({
  showFullscreenPic,
  setShowFullscreenPic,
  picture,
}) => {
  const modalRef = useRef();

  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      setShowFullscreenPic(false);
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && showFullscreenPic) {
        setShowFullscreenPic(false);
      }
    },
    [showFullscreenPic, setShowFullscreenPic]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  });

  return (
    <>
      {showFullscreenPic ? (
        <div className="modal-background" ref={modalRef} onClick={closeModal}>
          <FontAwesomeIcon
            icon="times"
            className="closeIcon"
            onClick={() => {
              setShowFullscreenPic(!showFullscreenPic);
            }}
          />
          <img
            src={picture.image.secure_url}
            alt={picture.name}
            className="modal-picture"
          />
        </div>
      ) : null}
    </>
  );
};

export default FullscreenPic;
