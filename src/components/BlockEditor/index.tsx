import { useEffect, useRef } from "react";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import { FBNote } from "../../notes";
import configuration, { DEFAULT_EDITORJS_DATA } from "./configuration";

type PropTypes = {
  note: FBNote;
  onInitialize?: (instance: EditorJS) => void;
  onChanges: (content: OutputData) => void;
  initialData?: OutputData | null;
};

const BlockEditor = ({
  note,
  onInitialize,
  onChanges,
  initialData,
}: PropTypes) => {
  const ejInstance = useRef<EditorJS | null>();

  const initEditor = () => {
    const editor = new EditorJS({
      onReady: () => {
        ejInstance.current = editor;
        if(onInitialize) onInitialize(editor);
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
      data: initialData || DEFAULT_EDITORJS_DATA,
      autofocus: initialData ? false : true,
      ...configuration,
    });
  };

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
