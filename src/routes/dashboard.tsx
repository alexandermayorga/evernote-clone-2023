import {
  Outlet,
  redirect,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { auth, createNote, getAllNotes } from "../firebase";
import { FBNote, NoteType } from "../notes";
import { useEffect, useState } from "react";
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
  const docRef = await createNote(auth.currentUser?.uid as string);
  return redirect(`note/${docRef.id}`);
}

type DashboardContextType = {
  editorLoading: boolean;
  setEditorLoading: (val: boolean) => void;
  sidebarNotes: NoteType[];
  setSidebarNotes: (notes: NoteType[]) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
};

export default function Dashboard() {
  const notes = useLoaderData() as NoteType[];
  const [editorLoading, setEditorLoading] = useState<boolean>(false);
  const [sidebarNotes, setSidebarNotes] = useState<NoteType[]>(notes);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const contextValue = {
    editorLoading,
    setEditorLoading,
    sidebarNotes,
    setSidebarNotes,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  useEffect(() => {
    setSidebarNotes(notes);
  }, [notes]);

  return (
    <>
      <div className="main d-flex">
        <div
          id="sidebar"
          className={`overflow-x-hidden scrollarea flex-grow-1 border-end-lg ${
            isSidebarOpen ? "open" : ""
          }`}
        >
          <div id="sidebar_wrapper" className="">
            <Sidebar
              notes={sidebarNotes}
              editorLoading={editorLoading}
              toggleSidebar={setIsSidebarOpen}
            />
          </div>
        </div>
        <div
          id="page-content"
          className="overflow-x-hidden scrollarea flex-grow-1"
        >
          <Outlet context={contextValue} />
        </div>
      </div>
    </>
  );
}

export function useDashboard() {
  return useOutletContext<DashboardContextType>();
}
