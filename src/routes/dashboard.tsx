import {
  Outlet,
  redirect,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { auth, createNote, getAllNotes } from "../firebase";
import { FBNote, NoteType } from "../notes";
import { useState } from "react";
import { convertToNoteType } from "../utils";

export async function loader() {
  const querySnapshot = await getAllNotes();
  const notes: FBNote[] = [];
  querySnapshot.forEach((doc) => {
    const note = { id: doc.id, ...doc.data() };
    notes.push(note as FBNote);
  });
  const parsedNotes: NoteType[] = notes.map((note) => {
    //TODO remove this after fixing issue with FB not saving nested objects
    return convertToNoteType(note);
  });
  return parsedNotes;
}

export async function action() {
  //#TODO validate string instead of File
  const docRef = await createNote(auth.currentUser?.email as string);
  return redirect(`note/${docRef.id}`);
}

type DashboardContextType = {
  editorLoading: boolean;
  setEditorLoading: (val: boolean) => void;
  updatedNotes: NoteType[];
  setUpdatedNotes: (notes: NoteType[]) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
};

export default function Dashboard() {
  const notes = useLoaderData() as FBNote[];
  const [editorLoading, setEditorLoading] = useState<boolean>(false);
  const [updatedNotes, setUpdatedNotes] = useState<FBNote[]>(notes);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const contextValue = {
    editorLoading,
    setEditorLoading,
    updatedNotes,
    setUpdatedNotes,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return (
    <>
      <div className="main d-flex">
        <div
          id="sidebar"
          className={`overflow-x-hidden scrollarea border-end border-3 ${isSidebarOpen ? "open":""}`}
        >
          <div id="sidebar_wrapper">
            <Sidebar notes={updatedNotes} editorLoading={editorLoading} toggleSidebar={setIsSidebarOpen}/>
          </div>
        </div>
        <div id="page-content" className="overflow-x-hidden scrollarea flex-grow-1">
          <Outlet context={contextValue} />
        </div>
      </div>
    </>
  );
}

export function useDashboard() {
  return useOutletContext<DashboardContextType>();
}
