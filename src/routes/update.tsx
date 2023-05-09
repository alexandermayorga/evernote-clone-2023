import { Params } from "react-router-dom";
import { updateNote } from "../firebase.ts";

export async function action({ params, request }: {params:Params, request:Request}) {  
  if (!params || !params.noteId) throw new Error("oh dang!");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  console.log(params.noteId)
  console.log(updates);
  
  // await updateNote(params.noteId);
  return null;
}
