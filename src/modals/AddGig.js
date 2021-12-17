import { useRef, useEffect, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const AddGig = ({ showAddGig, setShowAddGig }) => {
  const [name, setName] = useState("");
  const [band, setBand] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [contact, setContact] = useState("");
  const [EN, setEN] = useState("");
  const [FR, setFR] = useState("");
  const [DE, setDE] = useState("");
  const [image, setImage] = useState();
  const [nameError, setNameError] = useState("");

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
      formData.append("band", band);
      formData.append("date", date);
      formData.append("place", place);
      formData.append("contact", contact);
      formData.append("EN", EN);
      formData.append("FR", FR);
      formData.append("DE", DE);
      formData.append("image", image);

      const response = await axios.post(
        "https://leonie-backend.herokuapp.com/backoffice/gig/create",
        formData
      );

      if (response.status === 200) {
        console.log(response.data);
        setShowAddGig(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      setShowAddGig(false);
      setNameError("");
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && showAddGig) {
        setShowAddGig(false);
        setNameError("");
      }
    },
    [showAddGig, setShowAddGig, setNameError]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  });

  return (
    <>
      {showAddGig ? (
        <div className="modal-background" ref={modalRef} onClick={closeModal}>
          <FontAwesomeIcon
            icon="times"
            className="closeIcon"
            onClick={() => {
              setShowAddGig(false);
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
                placeholder="Who's playing?"
                style={{ width: "auto" }}
                onChange={(event) => {
                  setBand(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="When?"
                style={{ width: "auto" }}
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Where?"
                style={{ width: "auto" }}
                onChange={(event) => {
                  setPlace(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Contact info"
                style={{ width: "auto" }}
                onChange={(event) => {
                  setContact(event.target.value);
                }}
              />
              <textarea
                placeholder="Description (English)"
                onChange={(event) => {
                  setEN(event.target.value);
                }}
              ></textarea>
              <textarea
                placeholder="Description (Français)"
                onChange={(event) => {
                  setFR(event.target.value);
                }}
              ></textarea>
              <textarea
                placeholder="Description (Deutsch)"
                onChange={(event) => {
                  setDE(event.target.value);
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
                    setShowAddGig(!showAddGig);
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

export default AddGig;
