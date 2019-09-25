import React, { useState } from "react";

import { Button, Spinner } from "react-bootstrap";

import { DataConsumer } from "./DataProvider";

const SpinnerButton = ({ text, onClick, variant, disable }) => {
  const [disabled, setDisabled] = useState(false);

  const click = async (e, ctx) => {
    if (onClick) {
      e.preventDefault();
    }

    setDisabled(true);
    ctx.setDisabled(true);

    try {
      if (onClick) {
        await onClick();
      }
    } catch (err) {
      alert(err.message);
    }

    setDisabled(false);
    ctx.setDisabled(false);
  };

  return (
    <DataConsumer>
      {ctx => (
        <Button
          variant={variant ? variant : "outline-dark"}
          onClick={e => click(e, ctx)}
          disabled={disable || disabled || ctx.textDisabled}
        >
          <Spinner
            animation={`${disabled ? "border" : null}`}
            size="sm"
            role="status"
          />
          <span
            style={{
              display: `${disabled ? "none" : "inline"}`
            }}
          >
            {text}
          </span>
        </Button>
      )}
    </DataConsumer>
  );
};

export default SpinnerButton;
