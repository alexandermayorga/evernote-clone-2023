import { useEffect, useRef } from "react";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import { FBNote } from "../../notes";
import configuration, { DEFAULT_EDITORJS_DATA } from "./configuration";

type PropTypes = {
  note: FBNote;
  onReady?: (instance: EditorJS) => void;
  onChanges: (content: OutputData) => void;
  data?: OutputData | null;
};

const BlockEditor = ({ note, onReady, onChanges, data }: PropTypes) => {
  const editorRef = useRef<EditorJS | null>();

  const initEditor = () => {
    const editor = new EditorJS({
      onReady: () => {
        editorRef.current = editor;
        if (onReady) onReady(editor);
      },
      onChange: async (api: API, event: CustomEvent) => {
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
