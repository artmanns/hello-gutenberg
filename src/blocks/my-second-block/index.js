import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import "./styles.editor.scss";
import edit from "./edit";
import save from "./save";

registerBlockType(metadata, {
  edit,
  save,
});
