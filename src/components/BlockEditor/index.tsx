import { useEffect, useRef } from "react";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import { NoteType } from "../../notes";
import configuration, { DEFAULT_EDITORJS_DATA } from "./configuration";

type PropTypes = {
  note: NoteType;
  onReady?: (instance: EditorJS) => void;
  onChanges: (content: OutputData) => void;
  data?: OutputData | null;
};

const BlockEditor = ({ note, onReady, onChanges, data }: PropTypes) => {
  const editorRef = useRef<EditorJS | null>(null);

  const initEditor = () => {
    const editor = new EditorJS({
      onReady: () => {
        editorRef.current = editor;
        if (onReady) onReady(editor);
      },
      onChange: async (api: API) => {
        let content;
        if (!api.readOnly.isEnabled) {
          try {
            content = await editor.saver.save();
            onChanges(content);
          } catch (error) {
            //TODO remove this for prod
            alert(
              "There was an error with the editor. Please check console for details"
            );
            console.log(error);
          }
        }
      },
      data: data || DEFAULT_EDITORJS_DATA,
      autofocus: data ? false : true,
      ...configuration,
    });
  };

  useEffect(() => {
    if (editorRef.current === null) {
      initEditor();
    }

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [note]);

  return (
    <>
      <div id="editorjs"></div>
    </>
  );
};

export default BlockEditor;
