import { useRef, useEffect, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const AddPic = ({ showAddPic, setShowAddPic }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [nameError, setNameError] = useState("");
  const [picError, setPicError] = useState("");

  const modalRef = useRef();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();

      if (name) {
        formData.append("name", name);
      } else {
        setNameError(
          "You must fill out the title field in order to upload a picture!"
        );
      }

      if (image) {
        formData.append("image", image);
      } else {
        setPicError("No picture uploaded!");
      }

      const response = await axios.post(
        "https://leonie-backend.herokuapp.com/backoffice/picture/create",
        formData
      );

      if (response.status === 200) {
        console.log(response.data);
        setShowAddPic(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      setShowAddPic(false);
      setNameError("");
      setPicError("");
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && showAddPic) {
        setShowAddPic(false);
        setNameError("");
        setPicError("");
      }
    },
    [showAddPic, setShowAddPic, setNameError, setPicError]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  });

  return (
    <>
      {showAddPic ? (
        <div className="modal-background" ref={modalRef} onClick={closeModal}>
          <FontAwesomeIcon
            icon="times"
            className="closeIcon"
            onClick={closeModal}
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
              {picError && (
                <p className="error-message" style={{ marginBottom: "50px" }}>
                  {picError}
                </p>
              )}
              <div className="conf-section">
                <button
                  type="button"
                  className="conf-button"
                  onClick={() => {
                    setShowAddPic(!showAddPic);
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

export default AddPic;
