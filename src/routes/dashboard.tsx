import { Outlet, redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { auth, createNote } from "../firebase";

export async function action() {  
  //#TODO validate string instead of File
  const docRef = await createNote(auth.currentUser?.email as string)
  // await updateContact(params.contactId, updates);
  return redirect(`note/${docRef.id}`);
}

export default function Dashboard() {
  return (
    <>
      <div className="main d-flex">
        <div
          id="sidebar"
          className="scrollarea border-end border-3 flex-shrink-0"
        >
          <Sidebar />
        </div>
        <div id="page-content" className="flex-grow-1 p-4 scrollarea">
          <Outlet />
        </div>
      </div>
    </>
  );
}
