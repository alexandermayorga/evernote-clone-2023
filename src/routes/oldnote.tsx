// type Props = {}
import { Params, useLoaderData } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import notes, { Note as NoteType } from "../notes.ts";
import EditorJS, { API } from "@editorjs/editorjs";
import configuration from "../components/BlockEditor/configuration.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { firestore } from "../firebase.ts";
import { collection, addDoc } from "firebase/firestore";
import BlockEditor from "../components/BlockEditor/index.tsx";

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
  const { user } = useAuth();
  // console.log(user.email);

  const noteFromLoader = useLoaderData() as NoteType;
  const pageTitle = `${noteFromLoader.title} | Mammoth Notes`;
  useEffect(() => {
    document.title = pageTitle;
  }, [noteFromLoader]);

  // const [editorJS, setEditorJS] = useState<EditorJS | null>();

  // const editorWrapperRef = useCallback(
  //   (wrapper: HTMLDivElement) => {
  //     if (wrapper == null) return;

  //     if (editorJS) editorJS.destroy();
  //     wrapper.innerHTML = "";
  //     const editorDiv = document.createElement("div");
  //     editorDiv.setAttribute("id", "editorjs");
  //     wrapper.append(editorDiv);

  //     const newConfig = {
  //       ...configuration,
  //       data: {
  //         time: 1682921026531,
  //         blocks: [
  //           {
  //             id: "8apLrr1pFI",
  //             type: "header",
  //             data: {
  //               text: "Lets Go PikaNotes " + noteFromLoader.title,
  //               level: 2,
  //             },
  //           },
  //         ],
  //         version: "2.26.5",
  //       },
  //     };

  //     setEditorJS(new EditorJS(newConfig));
  //   },
  //   [noteFromLoader]
  // );

  // const handleOnSave = () => {
  //   editorJS &&
  //     editorJS
  //       .save()
  //       .then((outputData) => {
  //         console.log("Article data: ", outputData);
  //       })
  //       .catch((error) => {
  //         console.log("Saving failed: ", error);
  //       });
  // };

  // function handleReadOnlyMode() {
  //   editorJS && editorJS.readOnly.toggle();
  // }

  async function saveToDB() {
    try {
      const docRef = await addDoc(collection(firestore, "notes"), {
        author: user ? user.email : "nouser@test.com",
        title: "The title of the note",
        content: "The contents of the document",
        created: new Date(),
        updated: new Date("05/02/2023"),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function onSave(editorjs: EditorJS) {
    if (!editorjs) return console.log("Error: no EditorJS instance was passed");

    editorjs
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  }

  function onChange(api: API, event: CustomEvent) {
    console.log("Editor JS changed!");
  }

  return (
    <div>
      <h1>{noteFromLoader.title}</h1>
      <div>
        <button
          className="btn btn-success me-3"
          type="button"
          // onClick={handleOnSave}
        >
          Save
        </button>
        <button
          className="btn btn-warning me-3"
          type="button"
          onClick={saveToDB}
        >
          Save to DB
        </button>
        <button
          className="btn btn-primary"
          type="button"
          // onClick={handleReadOnlyMode}
        >
          Read Only Mode
        </button>
      </div>
      <hr />
      <BlockEditor
        noteTitle={noteFromLoader.title}
        onChange={onChange}
        onSave={}
      ></BlockEditor>
      {/* <div id="editorWrapper" ref={editorWrapperRef}></div> */}
    </div>
  );
}
