import { OutputData } from "@editorjs/editorjs";
import edjsHTML from "editorjs-html";

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
