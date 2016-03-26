const debug = require("debug")("semirara:reducer");

import {diffpatch, clone} from "../../lib/diffpatch";

export default function user(state, action){
  debug(`action.type = ${action.type}`);
  delete state.page.diff;
  switch(action.type){
  case "page":
    state.page = action.value;
    break;
  case "page:lines":
    state.page.diff = diffpatch.diff(state.page.lines, action.value);
    state.page.lines = action.value;
    break;
  case "page:lines:patch":
    state.page.lines = diffpatch.patch(clone(state.page.lines), action.value);
    break;
  }
  debug(state);
  return state;
}
