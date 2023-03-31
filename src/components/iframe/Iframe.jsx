import React from "react";
import { useSearchParams } from "react-router-dom";
import "./styles.scss";
const Iframe = ({ toggle }) => {
  const [searchparam] = useSearchParams();

  const id = searchparam.get("event-id");
  const sportId = searchparam.get("id");

  return (
    <div>
      <iframe
        className={toggle ? "iframe-box2" : "iframe-box"}
        src={`https://internal-consumer-apis.jmk888.com/go-score/template/${sportId}/${id}`}
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default Iframe;
