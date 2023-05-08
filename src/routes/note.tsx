// type Props = {}
import { Form, Params, useLoaderData, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { FBNote } from "../notes.ts";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useAuth } from "../context/AuthContext.tsx";
import { getNote, updateNote } from "../firebase.ts";
import BlockEditor from "../components/BlockEditor";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { DEFAULT_EDITORJS_DATA } from "../components/BlockEditor/configuration.ts";

export async function loader({ params }: { params: Params }) {
  if (!params.noteId) return null;
  const docSnap = await getNote(params.noteId as string);

  let note: FBNote;

  if (docSnap.exists()) {
    note = { id: docSnap.id, ...docSnap.data() } as FBNote;
    return note;
  }

  return null;

  // const note = notes.find((note) => note.id == parseInt(params.noteId || ""));
  // if (!note) {
  //   throw new Response("", {
  //     status: 404,
  //     statusText: "Not Found",
  //   });
  // }
  // return note;
}

export default function Note() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const note = useLoaderData() as FBNote;
  const pageTitle = `${note.title} | Mammoth Notes`;
  // const [title, setTitle] = useState(note.title || "Untitled");
  const [content, setContent] = useState<OutputData>(
    note.content || DEFAULT_EDITORJS_DATA
  );
  // console.log(note);
  // console.log(content);
  

  // console.log(note);
  // console.log(note.title);

  useEffect(() => {
    document.title = pageTitle;

    setContent(note.content || DEFAULT_EDITORJS_DATA);
        
    text.current = note.title;
  }, [note]);

  //This is for the Title
  const text = useRef(note.title || "Untitled");
  const handleChange = (evt: ContentEditableEvent) =>
    (text.current = evt.target.value);
  // const handleBlur = () => console.log(text.current);

  //EditorJS Functionality
  const editorCore = useRef<EditorJS | null>(null);
  const handleInitialize = useCallback(
    (instance: EditorJS) => (editorCore.current = instance),
    []
  );

  const handleSave = async () => {
    if (!user) return navigate("/login");
    // if (!content) return console.log("Nothing new to save, Jinx!");
    
    try {
      await updateNote(note.id, text.current, content);
      console.log("Document updated!");
    } catch (error) {
      //TODO remove for production
      alert(
        "An Error occurred saving the document. Please check console for details."
      );
      console.log(error);
    }
  };

  return (
    <div id="note_wrapper">
      <div id="notes_header">
        <ContentEditable
          html={text.current}
          // onBlur={handleBlur}
          onChange={handleChange}
          className="h1 w-100 border-0 bg-transparent outline-focus-none p-0"
        />
        {/* <input
          type="text"
          value={title}
          className="h1 w-100 border-0 bg-transparent outline-focus-none p-0"
          onChange={(e) => setTitle(e.target.value)}
        /> */}
        <div id="buttons">
          <button
            className="btn btn-success me-2"
            type="button"
            onClick={handleSave}
          >
            <i className="bi bi-database"></i> Update
          </button>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this document."))
                event.preventDefault();
            }}
            className="d-inline"
          >
            <button type="submit" className="btn btn-danger">
              <i className="bi bi-trash"></i> Delete
            </button>
          </Form>
        </div>
      </div>
      <hr />
      <BlockEditor
        onInitialize={handleInitialize}
        note={note}
        onChanges={(outputData: OutputData) => setContent(outputData)}
        initialData={note.content}
      />
    </div>
  );
}
