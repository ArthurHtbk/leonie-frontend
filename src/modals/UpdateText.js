import { useRef, useEffect, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const UpdateText = ({ showUpdateText, setShowUpdateText, data }) => {
  const [strongEn, setStrongEn] = useState("");
  const [plainEn, setPlainEn] = useState("");
  const [strongFr, setStrongFr] = useState("");
  const [plainFr, setPlainFr] = useState("");
  const [strongDe, setStrongDe] = useState("");
  const [plainDe, setPlainDe] = useState("");
  const [image, setImage] = useState();

  const modalRef = useRef();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();

      formData.append("strongEn", strongEn);
      formData.append("plainEn", plainEn);
      formData.append("strongFr", strongFr);
      formData.append("plainFr", plainFr);
      formData.append("strongDe", strongDe);
      formData.append("plainDe", plainDe);
      formData.append("image", image);
      formData.append("_id", data._id);

      const response = await axios.post(
        "https://leonie-backend.herokuapp.com/backoffice/text/update",
        formData
      );

      if (response.status === 200) {
        console.log(response.data);
        setShowUpdateText(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      setShowUpdateText(false);
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && showUpdateText) {
        setShowUpdateText(false);
      }
    },
    [showUpdateText, setShowUpdateText]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  });

  return (
    <>
      {showUpdateText ? (
        <div className="modal-background" ref={modalRef} onClick={closeModal}>
          <FontAwesomeIcon
            icon="times"
            className="closeIcon"
            onClick={() => {
              setShowUpdateText(false);
            }}
          />
          <div className="modal-wrapper">
            <form className="conf-form" onSubmit={handleSubmit}>
              <textarea
                placeholder={
                  data.EN.strongEn ? data.EN.strongEn : "Bio intro (English)"
                }
                onChange={(event) => {
                  setStrongEn(event.target.value);
                }}
              ></textarea>
              <textarea
                placeholder={
                  data.FR.strongFr ? data.FR.strongFr : "Bio intro (Français)"
                }
                onChange={(event) => {
                  setStrongFr(event.target.value);
                }}
              ></textarea>
              <textarea
                placeholder={
                  data.DE.strongDe ? data.DE.strongDe : "Bio intro (Deutsch)"
                }
                onChange={(event) => {
                  setStrongDe(event.target.value);
                }}
              ></textarea>
              <textarea
                placeholder={
                  data.EN.plainEn ? data.EN.plainEn : "Bio main text (English)"
                }
                onChange={(event) => {
                  setPlainEn(event.target.value);
                }}
              ></textarea>
              <textarea
                placeholder={
                  data.FR.plainFr ? data.FR.plainFr : "Bio main text (Français)"
                }
                onChange={(event) => {
                  setPlainFr(event.target.value);
                }}
              ></textarea>
              <textarea
                placeholder={
                  data.DE.plainDe ? data.DE.plainDe : "Bio main text (Deutsch)"
                }
                onChange={(event) => {
                  setPlainDe(event.target.value);
                }}
              ></textarea>
              <div className="file-area">
                <label htmlFor="input-file" className="label-file">
                  Upload a picture
                </label>
                <input
                  id="input-file"
                  type="file"
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                  }}
                />
              </div>
              <div className="conf-section">
                <button
                  type="button"
                  className="conf-button"
                  onClick={() => {
                    setShowUpdateText(!showUpdateText);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="emphasized-button conf-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UpdateText;
