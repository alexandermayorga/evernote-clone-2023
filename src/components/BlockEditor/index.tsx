import EditorJS, { API } from "@editorjs/editorjs";
import configuration from "./configuration";
import { useCallback, useState } from "react";

type BlockEditorProps = {
  noteTitle: string;
  readOnly?:boolean;
  onChange?: (api: API, event: CustomEvent) => void;
};

export default function BlockEditor({
  noteTitle,
  readOnly,
  onChange: onChangeHandler,
}: BlockEditorProps) {
  
  const [editorJS, setEditorJS] = useState<EditorJS | null>();

  const editorWrapperRef = useCallback(
    (wrapper: HTMLDivElement) => {
      if (wrapper == null) return;

      if (editorJS) editorJS.destroy();
      wrapper.innerHTML = "";
      const editorDiv = document.createElement("div");
      editorDiv.setAttribute("id", "editorjs");
      wrapper.append(editorDiv);

      const newConfig = {
        ...configuration,
        data: {
          time: 1682921026531,
          blocks: [
            {
              id: "8apLrr1pFI",
              type: "header",
              data: {
                text: "Lets Go PikaNotes " + noteTitle,
                level: 2,
              },
            },
          ],
          version: "2.26.5",
        },
        onChange: (api: API, event: CustomEvent) => {
          onChangeHandler && onChangeHandler(api, event);
          // console.log("Now I know that Editor's content changed!", event);
          // api.saver.save().then((OutputData) => console.log(OutputData));
        },
        readOnly:readOnly
      };

      setEditorJS(new EditorJS(newConfig));
    },
    [noteTitle,readOnly]
  );

  console.log(editorWrapperRef)

  return <div id="editorWrapper" ref={editorWrapperRef}></div>;
}
