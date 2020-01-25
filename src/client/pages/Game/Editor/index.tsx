import React from "react";
import MonacoEditor from "react-monaco-editor";
import { useDispatch, useSelector } from "react-redux";
import * as gameActions from "../../../actions/game";
import { AppState } from "../../../reducers";

const Editor: React.FC = () => {
  const { code } = useSelector((state: AppState) => state.game);
  const dispatch = useDispatch();

  return (
    <MonacoEditor
      language="javascript"
      theme="vs-dark"
      value={code}
      options={{
        selectOnLineNumbers: true,
        roundedSelection: false,
        cursorStyle: "line",
        automaticLayout: false
      }}
      onChange={code => dispatch(gameActions.setCode({ code }))}
      editorDidMount={editor => editor.focus()}
    />
  );
};

export default Editor;
