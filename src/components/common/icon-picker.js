import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconPicker = ({ onChange }) => {
  const [iconNames, setIconNames] = useState([]);
  const [activeModal, setActiveModal] = useState(false);

  useEffect(() => {
    library.add(fas);
    let icons = library.definitions.fas;
    for (const icon in icons) {
      setIconNames(prevNames => [...prevNames, icon]);
    }
  }, []);

  return (
    <>
      <button
        className="button is-primary"
        data-target="icon-modal"
        aria-haspopup="true"
        onClick={() => setActiveModal(true)}
      >
        Select an Icon
      </button>
      <div
        className={`modal ${activeModal ? "is-active" : ""}`}
        id="icon-modal"
      >
        <div className="modal-background"></div>
        <div className="modal-card">
          <div className="modal-card-head">
            <p className="modal-card-title">Select an Icon</p>
            <button
              className="delete"
              onClick={() => setActiveModal(false)}
              aria-label="close"
            ></button>
          </div>
          <div className="modal-card-body">
            {iconNames.map(icon => {
              return (
                <span
                  className="icon has-text-info is-large"
                  key={icon}
                  onClick={e => {
                    onChange(e, icon);
                    setActiveModal(false);
                  }}
                >
                  <FontAwesomeIcon icon={icon} size="2x" />
                </span>
              );
            })}
          </div>
        </div>
        <button
          className="modal-close is-large"
          onClick={() => setActiveModal(false)}
          aria-label="close"
        ></button>
      </div>
    </>
  );
};

IconPicker.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default IconPicker;
