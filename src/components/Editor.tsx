import { useEffect, useRef } from "react";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import { Note } from "../notes";
import configuration from "./BlockEditor/configuration";

type PropTypes = {
  note: Note;
  onInitialize: (instance: EditorJS) => void;
  onChanges: (content: OutputData) => void;
  initialData?: OutputData
};

const BlockEditor = ({ note, onInitialize, onChanges, initialData }: PropTypes) => {
  const ejInstance = useRef<EditorJS | null>();

  const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "This is my awesome editor! " + note.title,
          level: 1,
        },
      },
    ],
  };

  const initEditor = () => {

    const editor = new EditorJS({
      onReady: () => {
        ejInstance.current = editor;
        onInitialize(editor);
      },
      data: DEFAULT_INITIAL_DATA,
      onChange: async (api: API, event: CustomEvent) => {
        if (!api.readOnly.isEnabled) {
          const content = await editor.saver.save();
          console.log(content);
          onChanges(content);
        }
      },
      ...configuration
    });
  };

  // This will run when we change to a different note
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, [note]);

  return (
    <>
      <div id="editorjs"></div>
    </>
  );
};

export default BlockEditor;
