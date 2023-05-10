//TODO: need 2 states: 1) without any notes 2) with notes 3) need a button to create a new note

import { Form, NavLink } from "react-router-dom";
import { FBNote } from "../notes.ts";
import NotePreview from "./NotePreview.tsx";

export default function Sidebar({ notes }: { notes: FBNote[] }) {
  // console.log(notes);

  return (
    <>
      <div id="sidebar_header">
        <NavLink
          to={""}
          className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
        >
          <img
            src="/logo192.png"
            className="pe-none me-2"
            width="30"
            height="30"
          />
          <span className="fs-3 fw-semibold lh-1">Notes List</span>
        </NavLink>
      </div>
      <div id="sidebar_content">
        <div className="list-group list-group-flush border-bottom scrollarea">
          <li className="list-group-item py-3">
            <Form method="post">
              <button
                type="submit"
                className="btn btn-primary rounded-pill w-100 text-start mb-2 ps-4"
              >
                <i className="bi bi-file-earmark-plus"></i> New
              </button>
            </Form>
            <div className="input-group flex-nowrap ">
              <span
                className="input-group-text rounded-pill-start border-end-0 bg-transparent"
                id="addon-wrapping"
              >
                <i className="bi bi-search"></i>
              </span>
              <input
                type="search"
                className="form-control rounded-pill-end border-start-0"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="addon-wrapping"
              />
            </div>
          </li>
          {notes.length ? (
            notes.map((note) => <NotePreview note={note} key={note.id} />)
          ) : (
            <p className="text-muted">
              <i>No Notes</i>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
