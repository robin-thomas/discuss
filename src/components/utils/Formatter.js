import React from "react";

const Formatter = {
  formatText: data => {
    if (data === null || data === undefined) {
      return;
    }

    data = data.replace(/\r?\n/g, "<br />");
    data = data.split("<br />").filter(e => e.trim().length > 0);

    return data.map((line, index) => (
      <p key={index} className="App-post-description">
        {line}
        <br />
      </p>
    ));
  }
};

export default Formatter;
