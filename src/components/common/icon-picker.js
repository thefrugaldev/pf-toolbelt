import React, { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  //   faCar,
  //   faAmbulance,
  //   faArchive
  fas
} from "@fortawesome/free-solid-svg-icons";
// Components
import SelectInput from "../common/select-input";

const IconPicker = () => {
  const [iconNames, setIconNames] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState();

  useEffect(() => {
    library.add(fas);
    let icons = library.definitions.fas;
    for (const icon in icons) {
      setIconNames(prevNames => [...prevNames, icon]);
    }
  }, []);

  return (
    <>
      <SelectInput
        name="icons"
        label="Icons"
        defaultOption="Select Icon"
        options={iconNames.map(icon => ({
          value: icon,
          text: icon
        }))}
        iconClass={selectedIcon}
        onChange={e => setSelectedIcon(e.target.value)}
      />
    </>
  );
};

export default IconPicker;
