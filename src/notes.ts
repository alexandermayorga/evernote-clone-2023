import { OutputData } from "@editorjs/editorjs";
import { Timestamp } from "firebase/firestore";

export type NoteType = {
  id: string;
  title: string;
  content: OutputData;
  author: string;
  created: Timestamp;
  updated: Timestamp;
};

export type FBNote = {
  id: string;
  title: string;
  content: string;
  author: string;
  created: Timestamp;
  updated: Timestamp;
};

export type Updated = {
  seconds: number;
  nanoseconds: number;
};

const notes: FBNote[] = [
  {
    id: 1,
    title: "note title 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a mauris eu nulla pellentesque fringilla. Phasellus aliquam felis est, non convallis urna auctor vel. Curabitur eget quam commodo, elementum odio eget, elementum dui. Fusce congue ante id dui vulputate, sed fringilla augue auctor. Vestibulum pulvinar, tortor sit amet fringilla fringilla, elit felis tristique nulla, et cursus diam felis eget tellus. Donec tincidunt arcu a purus sollicitudin, mattis tempor tellus ornare. Phasellus aliquet ex ut iaculis interdum.",
  },
  {
    id: 2,
    title: "note title 2",
    content:
      "Cras vel felis orci. Sed molestie mi ut rutrum pellentesque. Donec vel mattis nibh, eget maximus sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus nisi ante, venenatis ac gravida et, rhoncus malesuada tellus. Cras in ipsum semper, ullamcorper quam dignissim, vestibulum diam. Duis at leo orci. Curabitur dolor magna, iaculis non neque eu, facilisis dapibus elit. Nulla facilisi. Pellentesque vestibulum aliquam magna sit amet cursus. Fusce ut leo feugiat quam auctor hendrerit ut quis nisi. Duis vel dictum urna. Sed nibh justo, tristique non suscipit sed, condimentum ac felis.",
  },
  {
    id: 3,
    title: "note title 3",
    content:
      "Quisque eu erat varius, dapibus erat quis, fringilla libero. Morbi finibus hendrerit est, consectetur viverra nisi maximus a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque sollicitudin malesuada hendrerit. Maecenas imperdiet elementum porttitor. Cras a risus arcu. Sed quis faucibus ante. In ut orci turpis. Mauris aliquam, turpis sit amet aliquam vehicula, nunc metus finibus quam, sit amet tempus odio tellus et nisi. Morbi eu convallis leo. Nulla facilisi. Suspendisse nec mi non ligula lacinia mattis. Suspendisse ut maximus dui. Donec lorem orci, aliquet id placerat quis, mattis in augue. Curabitur non lacus egestas nisi lacinia posuere et nec sem. Vestibulum suscipit tempus eleifend.",
  },
  {
    id: 4,
    title: "note title 4",
    content:
      "Pellentesque at libero ac sem vulputate rhoncus. Aliquam a varius ligula. Mauris vitae ultrices nisl. Pellentesque purus neque, efficitur sit amet cursus quis, malesuada vel metus. Nam accumsan nunc ex, id convallis urna pulvinar in. Donec a mollis ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  {
    id: 5,
    title: "note title 5",
    content:
      "Donec imperdiet odio risus, eget bibendum turpis tristique non. Praesent gravida risus in massa faucibus, et feugiat tellus gravida. Nunc nisi erat, tempus non nulla eu, scelerisque bibendum nibh. In auctor felis at nisi pretium faucibus. Nulla lacinia elementum elit, et auctor nulla tristique quis. Nunc nec magna magna. Maecenas ornare mauris ut tincidunt pulvinar. Morbi convallis nibh ligula, eu molestie justo lacinia eget. Cras ac libero quis nulla rutrum sagittis. Duis tincidunt condimentum mollis. Fusce pretium commodo nunc, id pellentesque ante semper vitae.",
  },
  {
    id: 6,
    title: "note title 6",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a mauris eu nulla pellentesque fringilla. Phasellus aliquam felis est, non convallis urna auctor vel. Curabitur eget quam commodo, elementum odio eget, elementum dui. Fusce congue ante id dui vulputate, sed fringilla augue auctor. Vestibulum pulvinar, tortor sit amet fringilla fringilla, elit felis tristique nulla, et cursus diam felis eget tellus. Donec tincidunt arcu a purus sollicitudin, mattis tempor tellus ornare. Phasellus aliquet ex ut iaculis interdum.",
  },
];

export default notes;
