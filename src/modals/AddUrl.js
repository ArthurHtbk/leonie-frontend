import { useRef, useEffect, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const AddUrl = ({ showAddUrl, setShowAddUrl }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [url, setUrl] = useState("");

  const modalRef = useRef();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();

      if (name) {
        formData.append("name", name);
      } else {
        setNameError(
          "You must fill out the title field in order to upload a concert!"
        );
      }
      formData.append("url", url);

      const response = await axios.post(
        "https://leonie-backend.herokuapp.com/backoffice/url/create",
        formData
      );

      if (response.status === 200) {
        console.log(response.data);
        setShowAddUrl(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      setShowAddUrl(false);
      setNameError("");
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && showAddUrl) {
        setShowAddUrl(false);
        setNameError("");
      }
    },
    [showAddUrl, setShowAddUrl, setNameError]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  });

  return (
    <>
      {showAddUrl ? (
        <div className="modal-background" ref={modalRef} onClick={closeModal}>
          <FontAwesomeIcon
            icon="times"
            className="closeIcon"
            onClick={() => {
              setShowAddUrl(false);
            }}
          />
          <div className="modal-wrapper">
            <form className="conf-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                style={{ width: "auto" }}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              {nameError && <p className="error-message">{nameError}</p>}
              <input
                type="text"
                placeholder="Paste url here"
                style={{ width: "auto" }}
                onChange={(event) => {
                  setUrl(event.target.value);
                }}
              />
              <div className="conf-section">
                <button
                  type="button"
                  className="conf-button"
                  onClick={() => {
                    setShowAddUrl(!showAddUrl);
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

export default AddUrl;
