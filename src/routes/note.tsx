// type Props = {}
import {
  Form,
  Params,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FBNote, NoteType } from "../notes.ts";
import { OutputData } from "@editorjs/editorjs";
import { useAuth } from "../context/AuthContext.tsx";
import { getNote, updateNote } from "../firebase.ts";
import BlockEditor from "../components/BlockEditor";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { DEFAULT_EDITORJS_DATA } from "../components/BlockEditor/configuration.ts";
import { Toast, ToastContainer } from "react-bootstrap";
import { convertToNoteType, stripHTMLFromString } from "../utils.ts";
import { useDashboard } from "./dashboard.tsx";
import format from "date-fns/format";

export async function loader({ params }: { params: Params }) {
  if (!params.noteId) return null;
  const docSnap = await getNote(params.noteId as string);

  if (!docSnap.exists()) {
    throw new Response("", {
      status: 404,
      statusText: "No Note found with that ID",
    });
  }
  const note: FBNote = { id: docSnap.id, ...docSnap.data() } as FBNote;
  //TODO: update after fix for nested objects issue
  const parsedNote: NoteType = convertToNoteType(note);

  return parsedNote;
}

export default function NoteEditor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const { setEditorLoading, sidebarNotes, setSidebarNotes, setIsSidebarOpen } = useDashboard();

  const note = useLoaderData() as NoteType;

  const [content, setContent] = useState<OutputData>(
    note.content || DEFAULT_EDITORJS_DATA
  );
  const [title, setTitle] = useState<string>(note.title);

  useEffect(() => {
    setEditorLoading(true);
    document.title = `${note.title} | Mammoth Notes`;

    setTitle(note.title);
    titleRef.current = note.title;
    setContent(note.content || DEFAULT_EDITORJS_DATA);
    setIsSidebarOpen(false)
  }, [note]);

  //This is for the Title
  const titleRef = useRef(note.title || "Untitled");
  const handleTitleChange = (evt: ContentEditableEvent) => {
    const cleanTitle = stripHTMLFromString(evt.target.value);
    titleRef.current = cleanTitle;
    setTitle(cleanTitle);
  };
  // const handleBlur = () => console.log(text.current);
  // const handleTitleKeyDown = (evt: KeyboardEvent) => {
  //   if (evt.key === "Enter") evt.preventDefault();
  // };

  const handleButtonSave = async () => {
    if (!user) return navigate("/login");
    if (note.content && content.blocks == note.content.blocks && title == note.title) {
      console.log("Either the content or the title are the same");
      return;
    }

    setShowToast(true);

    const contentJSON = JSON.stringify(content);

    try {
      await updateNote(note.id, titleRef.current, contentJSON);
      // console.log("Document updated!");
      //Update the Sidebar with new content

      const notesForSideBar = [...sidebarNotes];

      const foundIndex = notesForSideBar.findIndex(
        (prevNote) => prevNote.id == note.id
      );
      notesForSideBar[foundIndex].title = titleRef.current;
      notesForSideBar[foundIndex].content = content;
      setSidebarNotes(notesForSideBar);

      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } catch (error) {
      //TODO remove for production
      alert(
        "An Error occurred saving the document. Please check console for details."
      );
      setShowToast(false);
      console.log(error);
    }
  };

  /*
  const delay = 4;
  useEffect(() => {
    if (content == note.content && title == note.title) return;

    // console.log(note.id, title, content);
    const idToUpdate = note.id;
    const newTitle = title;
    const newContent = { ...content };

    updateFetcher.submit(
      {
        id: idToUpdate,
        title: newTitle,
        content: JSON.stringify(newContent),
      },
      { method: "post", action: `/dashboard/note/${idToUpdate}/update` }
    );

    const timer1 = setTimeout(() => {
      console.log("Hi from timer");
      setShowToast(true);
      updateNote(idToUpdate, newTitle, newContent)
        .then(() => {
          console.log("Document updated!");
          setTimeout(() => {
            setShowToast(false);
          }, 1000);
        })
        .catch((error) => {
          //TODO remove for production
          alert(
            "An Error occurred saving the document. Please check console for details."
          );
          console.log(error);
        });
    }, delay * 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [content, title]);
  */

  const handleEditorChanges = (outputData: OutputData) =>
    setContent(outputData);

  return (
    <div id="note_wrapper" className="p-4">
      <div id="notes_header">
        <div className="mb-3 d-lg-none text-end">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            aria-label="Close Sidebar"
            onClick={()=> setIsSidebarOpen(true)}
          >
            <i className="bi bi-caret-right-fill"></i> View All Notes
          </button>
        </div>
        <div id="buttons" className="w-100 d-flex justify-content-between mb-2">
          <div className="text-muted">
            created on:{" "}
            {format(note.created.toDate(), "MMM dd, yyyy")}
          </div>
          <div>
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
                if (
                  !confirm("Please confirm you want to delete this document.")
                )
                  event.preventDefault();
              }}
              className="d-inline"
            >
              <button type="submit" className="btn btn-danger btn-sm">
                <i className="bi bi-trash"></i> Delete
              </button>
            </Form>
          </div>
        </div>
        <ContentEditable
          html={titleRef.current}
          // onBlur={handleBlur}
          onChange={handleTitleChange}
          className="h1 w-100 border-0 bg-transparent outline-focus-none p-0"
          // onKeyDown={handleTitleKeyDown}
          tagName="h1"
        />
      </div>
      <hr />
      <BlockEditor
        note={note}
        onReady={() => setEditorLoading(false)}
        onChanges={handleEditorChanges}
        data={note.content}
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
