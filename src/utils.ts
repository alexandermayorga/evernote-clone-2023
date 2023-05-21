import { OutputData } from "@editorjs/editorjs";
import edjsHTML from "editorjs-html";
import { FBNote, NoteType } from "./notes";

export function stripHTMLFromString(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function convertOutputDataToText(content: OutputData) {
  const edjsParser = edjsHTML();
  const html: string[] = edjsParser.parse(content);
  const excerpt = stripHTMLFromString(html.join(" "));
  return excerpt;
}

export function convertToNoteType(note: FBNote): NoteType {
  const parsedNote: NoteType = {
    ...note,
    content: JSON.parse(note.content),
  };
  return parsedNote;
}
