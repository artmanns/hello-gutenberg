import React from "react";
import { useBlockProps } from "@wordpress/block-editor";

function save({ attributes }) {
  const { simpleText } = attributes;
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <h1>{simpleText}</h1>
    </div>
  );
}

export default save;
