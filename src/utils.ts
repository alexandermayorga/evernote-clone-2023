import { OutputBlockData, OutputData } from "@editorjs/editorjs";
import edjsHTML from "editorjs-html";
import { FBNote, NoteType } from "./notes";

export function stripHTMLFromString(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function convertOutputDataToText(content: OutputData) {
  const checklist = (block:OutputBlockData) => {
    // console.log(block);

    const itemsHTMLString = block.data.items.map((checklistItem: {text:string, checked:boolean}) => `<div>${checklistItem.text}</div>`);

    return itemsHTMLString.join(' ');
  };
  const edjsParser = edjsHTML({checklist});

  // console.log(content);
  // console.log(edjsParser.validate(content));
  // console.log(edjsParser.parse(content));
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
