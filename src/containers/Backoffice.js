import { Redirect } from "react-router";

import Pictures from "../components/Pictures";
import Gigs from "../components/Gigs";
import Text from "../components/Text";
import Urls from "../components/Urls";

const Backoffice = ({ userToken, language }) => {
  return userToken ? (
    <div className="container">
      <h1>Welcome into your back office!</h1>
      <div className="line"></div>
      <h2>Pictures</h2>
      <Pictures userToken={userToken} />
      <div className="line"></div>
      <h2>Dates</h2>
      <Gigs userToken={userToken} />
      <div className="line"></div>
      <h2>Biography</h2>
      <Text language={language} userToken={userToken} />
      <div className="line"></div>
      <h2>Music</h2>
      <Urls userToken={userToken} />
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Backoffice;
