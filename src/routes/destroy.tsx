import { Params, redirect } from "react-router-dom";
import { deleteNote } from "../firebase.ts";

export async function action({ params }: {params:Params}) {  
  if (!params || !params.noteId) throw new Error("oh dang!");

  await deleteNote(params.noteId);
  return redirect(`/dashboard`);
}
