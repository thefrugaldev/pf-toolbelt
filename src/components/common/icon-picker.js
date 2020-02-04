import React, { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  //   faCar,
  //   faAmbulance,
  //   faArchive
  fas
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconPicker = () => {
  const [iconNames, setIconNames] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState();
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
                  onClick={() => {
                    console.log(icon);
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
      {/* <SelectInput
        name="icons"
        label="Icons"
        defaultOption="Select Icon"
        options={iconNames.map(icon => ({
          value: icon,
          text: icon
        }))}
        iconClass={selectedIcon}
        onChange={e => setSelectedIcon(e.target.value)}
      /> */}
    </>
  );
};

export default IconPicker;
