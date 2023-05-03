// type Props = {}
import { Params, useLoaderData } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import notes, { Note as NoteType } from "../notes.ts";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import { useAuth } from "../context/AuthContext.tsx";
import { firestore } from "../firebase.ts";
import { collection, addDoc, Timestamp } from "firebase/firestore";
// import BlockEditor from "../components/BlockEditor/index.tsx";
import BlockEditor from "../components/Editor.tsx";

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

  const note = useLoaderData() as NoteType;
  const pageTitle = `${note.title} | Mammoth Notes`;
  const [content, setContent] = useState<OutputData | null>();

  useEffect(() => {
    document.title = pageTitle;
    setContent(null);
  }, [note]);

  async function saveToDB() {
    console.log(content);
    return;

    try {
      const docRef = await addDoc(collection(firestore, "notes"), {
        author: user?.email || "nouser@test.com",
        title: "The title of the note",
        content: content,
        created: new Date().getTime(),
        updated: Timestamp.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const editorCore = useRef<EditorJS | null>(null);

  const handleInitialize = useCallback((instance: EditorJS) => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    if (editorCore.current) {
      const savedData = await editorCore.current.save();
    }
  }, []);

  function handleReadOnlyMode() {
    editorCore.current?.isReady
      .then(() => editorCore.current?.readOnly.toggle())
      .catch((e) => console.log(e));
  }

  return (
    <div>
      <h1>{note.title}</h1>
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
          onClick={handleReadOnlyMode}
        >
          Read Only Mode
        </button>
      </div>
      <hr />
      <BlockEditor
        onInitialize={handleInitialize}
        note={note}
        onChanges={(outputData:OutputData) => setContent(outputData)}
      />
    </div>
  );
}
