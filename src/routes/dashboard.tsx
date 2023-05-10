import { Outlet, redirect, useLoaderData } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { auth, createNote, getAllNotes } from "../firebase";
import { FBNote } from "../notes";

export async function action() {  
  //#TODO validate string instead of File
  const docRef = await createNote(auth.currentUser?.email as string)
  // await updateContact(params.contactId, updates);
  return redirect(`note/${docRef.id}`);
}

export async function loader() {
  const querySnapshot = await getAllNotes();
  const notes: FBNote[] = [];
  querySnapshot.forEach((doc) => {
    const note = { id: doc.id, ...doc.data() };
    notes.push(note as FBNote);
  });
  return notes;
}

export default function Dashboard() {
  const notes = useLoaderData() as FBNote[];

  return (
    <>
      <div className="main d-flex">
        <div
          id="sidebar"
          className="scrollarea border-end border-3 flex-shrink-0"
        >
          <Sidebar notes={notes}/>
        </div>
        <div id="page-content" className="flex-grow-1 p-4 scrollarea">
          <Outlet />
        </div>
      </div>
    </>
  );
}
