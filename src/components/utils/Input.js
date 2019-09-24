import React, { useState } from "react";

import { Form } from "react-bootstrap";

import { DataConsumer } from "./DataProvider";

const Input = props => {
  const [text, setText] = useState(props.value ? props.value : "");

  const onChange = (target, text) => {
    setText(text);

    if (props.validate) {
      const { validate } = props.validate(text);

      if (validate === undefined) {
        target.classList.remove("is-valid");
        target.classList.remove("is-invalid");
      } else if (validate === false) {
        target.classList.remove("is-valid");
        target.classList.add("is-invalid");
      } else {
        target.classList.remove("is-invalid");
        target.classList.add("is-valid");
      }
    }
  };

  return (
    <DataConsumer>
      {ctx => (
        <Form.Control
          type={props.type ? props.type : "text"}
          value={text}
          placeholder={props.placeholder}
          onChange={e => onChange(e.target, e.target.value)}
          disabled={ctx.disabled}
          size={props.size ? props.size : "sm"}
          className={props.cls}
          as={props.as}
          rows="3"
        />
      )}
    </DataConsumer>
  );
};

export default Input;
