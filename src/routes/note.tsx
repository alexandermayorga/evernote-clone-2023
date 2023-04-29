// type Props = {}
import { Params, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import notes, { Note as NoteType } from "../notes.ts";


export function loader({ params } : {params: Params}) {
  const note = notes.find(note => note.id == parseInt(params.noteId || ""))
  if (!note) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return note;
}

export default function Note() {
  const noteFromLoader = useLoaderData() as NoteType;

  const pageTitle = `${noteFromLoader.title} | Mammoth Notes`;
  useEffect(() => {
    document.title = pageTitle
  }, [noteFromLoader])

  return (
    <div>
      <h1>{noteFromLoader.title}</h1>
      <div>{noteFromLoader.content}</div>
    </div>
  );
}
