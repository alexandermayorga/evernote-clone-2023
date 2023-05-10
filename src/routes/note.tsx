// type Props = {}
import {
  Form,
  Params,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FBNote } from "../notes.ts";
import { OutputData } from "@editorjs/editorjs";
import { useAuth } from "../context/AuthContext.tsx";
import { getNote, updateNote } from "../firebase.ts";
import BlockEditor from "../components/BlockEditor";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { DEFAULT_EDITORJS_DATA } from "../components/BlockEditor/configuration.ts";
import { Toast, ToastContainer } from "react-bootstrap";
import { stripHTMLFromString } from "../utils.ts";

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
  const [showToast, setShowToast] = useState(false);
  const updateFetcher = useFetcher();

  const note = useLoaderData() as FBNote;
  const [content, setContent] = useState<OutputData>(
    note.content || DEFAULT_EDITORJS_DATA
  );
  const [titleContainer, setTitleContainer] = useState<string>(note.title);
  // console.log(note);
  // console.log(content);
  // console.log(note.title);

  useEffect(() => {
    document.title = `${note.title} | Mammoth Notes`;

    setTitleContainer(note.title);
    title.current = note.title;
    setContent(note.content || DEFAULT_EDITORJS_DATA);
  }, [note]);

  //This is for the Title
  const title = useRef(note.title || "Untitled");
  const handleTitleChange = (evt: ContentEditableEvent) => {
    const cleanTitle = stripHTMLFromString(evt.target.value);
    // .keypress(function(e){ return e.which != 13; });
    title.current = cleanTitle;
    setTitleContainer(cleanTitle);
  };
  // const handleBlur = () => console.log(text.current);
  const handleTitleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === "Enter") evt.preventDefault();
  };

  const handleButtonSave = async () => {
    if (!user) return navigate("/login");
    setShowToast(true);

    try {
      await updateNote(note.id, title.current, content);
      console.log("Document updated!");
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } catch (error) {
      //TODO remove for production
      alert(
        "An Error occurred saving the document. Please check console for details."
      );
      console.log(error);
    }
  };

  // const delay = 4;
  // useEffect(() => {
  //   if (content == note.content && titleContainer == note.title) return;

  //   // console.log(note.id, titleContainer, content);
  //   const idToUpdate = note.id;
  //   const newTitle = titleContainer;
  //   const newContent = { ...content };

  //   updateFetcher.submit(
  //     {
  //       id: idToUpdate,
  //       title: newTitle,
  //       content: JSON.stringify(newContent),
  //     },
  //     { method: "post", action: `/dashboard/note/${idToUpdate}/update` }
  //   );

  //   const timer1 = setTimeout(() => {
  //     console.log("Hi from timer");
  //     setShowToast(true);
  //     updateNote(idToUpdate, newTitle, newContent)
  //       .then(() => {
  //         console.log("Document updated!");
  //         setTimeout(() => {
  //           setShowToast(false);
  //         }, 1000);
  //       })
  //       .catch((error) => {
  //         //TODO remove for production
  //         alert(
  //           "An Error occurred saving the document. Please check console for details."
  //         );
  //         console.log(error);
  //       });
  //   }, delay * 1000);

  //   return () => {
  //     clearTimeout(timer1);
  //   };
  // }, [content, titleContainer]);

  const handleEditorChanges = (outputData: OutputData) =>
    setContent(outputData);

  return (
    <div id="note_wrapper">
      <div id="notes_header">
        <div id="buttons" className="w-100 d-flex justify-content-end mb-2">
          <button
            className="btn btn-success btn-sm me-2"
            type="button"
            onClick={handleButtonSave}
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
            <button type="submit" className="btn btn-danger btn-sm">
              <i className="bi bi-trash"></i> Delete
            </button>
          </Form>
        </div>
        <ContentEditable
          html={title.current}
          // onBlur={handleBlur}
          onChange={handleTitleChange}
          className="h1 w-100 border-0 bg-transparent outline-focus-none p-0"
          onKeyDown={handleTitleKeyDown}
        />
      </div>
      <hr />
      <BlockEditor
        note={note}
        // onInitialize={handleInitialize}
        onChanges={handleEditorChanges}
        initialData={note.content}
      />
      <ToastContainer position={"bottom-end"} className="p-3">
        <Toast
          show={showToast}
          className="w-auto bg-transparent border-0 shadow-none"
        >
          <Toast.Body>
            <div className="spinner-border text-success " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
