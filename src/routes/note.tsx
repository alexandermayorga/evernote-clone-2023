// type Props = {}
import { Params, useLoaderData } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import notes, { Note as NoteType } from "../notes.ts";
import EditorJS from "@editorjs/editorjs";
import configuration from "../components/TextEditor/configuration";

export function loader({ params }: { params: Params }) {
  const note = notes.find((note) => note.id == parseInt(params.noteId || ""));
  if (!note) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return note;
}

export default function Note() {
  const noteFromLoader = useLoaderData() as NoteType;
  const pageTitle = `${noteFromLoader.title} | Mammoth Notes`;
  useEffect(() => {
    document.title = pageTitle;
  }, [noteFromLoader]);

  const [editorJS, setEditorJS] = useState<EditorJS | null>();

  // useEffect(()=>{
  //   if(!editorJS ) console.log('No Editor Found');
  //   editorJS && console.log(editorJS)

  //   if(editorJS) editorJS.destroy();
  // },[noteFromLoader])

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
                text: "Lets Go PikaNotes " + noteFromLoader.title,
                level: 2,
              },
            },
          ],
          version: "2.26.5",
        },
      };

      setEditorJS(new EditorJS(newConfig));
    },
    [noteFromLoader]
  );

  const handleOnSave = () => {
    editorJS &&
      editorJS
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
  };

  function handleReadOnlyMode() {
    editorJS && editorJS.readOnly.toggle();
  }

  return (
    <div>
      <h1>{noteFromLoader.title}</h1>
      <button
        className="btn btn-success me-3"
        type="button"
        onClick={handleOnSave}
      >
        Save
      </button>
      <button
        className="btn btn-primary"
        type="button"
        onClick={handleReadOnlyMode}
      >
        Read Only Mode
      </button>
      <hr />
      <div id="editorWrapper" ref={editorWrapperRef}></div>
    </div>
  );
}
