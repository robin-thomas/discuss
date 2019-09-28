import React from "react";

import { Spinner } from "react-bootstrap";

import { DataConsumer } from "../../utils/DataProvider";

import "./Loader.css";

const Loader = props => (
  <DataConsumer>
    {ctx =>
      ctx.loadingPosts ? (
        <div className="post-loader-container">
          <div>
            <Spinner
              animation="border"
              size="sm"
              role="status"
              className="post-loader"
            />
          </div>
        </div>
      ) : null
    }
  </DataConsumer>
);

export default Loader;
