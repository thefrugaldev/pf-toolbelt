import * as React from "react";
import { FC } from "react";

const AboutPage: FC<{}> = () => (
  <div>
    <h2>About</h2>
    <p>
      This app is your one stop shop for all things personal finance. Feel free
      to check out any of our popular tools below.
      {
        //TODO: add links to tools like savings rate
      }
    </p>
  </div>
);

export default AboutPage;
