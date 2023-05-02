import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import { EditorConfig } from "@editorjs/editorjs";

const sampleData = {
    "time": 1682921026531,
    "blocks": [
        {
            "id": "8apLrr1pFI",
            "type": "header",
            "data": {
                "text": "Lets Go PikaNotes",
                "level": 2
            }
        },
        {
            "id": "WdclkiUeVp",
            "type": "paragraph",
            "data": {
                "text": "How 'bout we add a line of text here&nbsp;"
            }
        },
        {
            "id": "4TxEmwNGWd",
            "type": "list",
            "data": {
                "style": "unordered",
                "items": [
                    "And then",
                    "we add an awesome list",
                    "with 3 items"
                ]
            }
        },
        {
            "id": "I7IXsLw418",
            "type": "paragraph",
            "data": {
                "text": "and then..."
            }
        },
        {
            "id": "JWCVFo2WjZ",
            "type": "checklist",
            "data": {
                "items": [
                    {
                        "text": "Lets add a checklist",
                        "checked": false
                    },
                    {
                        "text": "with one item checked",
                        "checked": true
                    }
                ]
            }
        }
    ],
    "version": "2.26.5"
}

const configuration: EditorConfig = {
  /**
   * Id of Element that should contain the Editor
   */
  holder: "editorjs",
  /**
   * Available Tools list.
   * Pass Tool's class or Settings object for each Tool you want to use
   */
  tools: {
    header: {
      class: Header,
      inlineToolbar: ["link"],
      //   inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
      config: {
        defaultStyle: "unordered",
      },
    },
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: "Enter a quote",
        captionPlaceholder: "Quote's author",
      },
    },
    Marker: Marker,
  },
  /**
   * Previously saved data that should be rendered
   */
    // data: sampleData,
  /**
   * onReady callback
   */
  //   onReady: () => {
  //     console.log("Editor.js is ready to work!");
  //   },
  /**
   * onChange callback
   */
    // onChange: (api, event) => {
    //   console.log("Now I know that Editor's content changed!", event);
    //   api.saver.save().then(OutputData => console.log(OutputData)
    //   )
    // },
  /**
   * Enable autofocus
   */
  autofocus: true,
};



export default configuration;
