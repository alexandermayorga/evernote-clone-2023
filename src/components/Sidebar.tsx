//TODO: need 2 states: 1) without any notes 2) with notes 3) need a button to create a new note

import { Form, Link, NavLink, useLoaderData } from "react-router-dom";
import { FBNote } from "../notes.ts";
import { getAllNotes } from "../firebase.ts";
import { useAuth } from "../context/AuthContext.tsx";

export async function loader() {
  const querySnapshot = await getAllNotes();
  const notes: FBNote[] = [];
  querySnapshot.forEach((doc) => {
    const note = { id: doc.id, ...doc.data() };
    notes.push(note as FBNote);
  });
  return notes;
}

function NotePreview({ note }: { note: FBNote }) {
  // const newContent =
  //   content.length > 85 ? `${content.substring(0, 85)}...` : content;
  const { id, title, content, updated } = note;
  // console.log(note.updated.toDate());

  const totimeString = new Date(note.updated.toDate());

  return (
    <NavLink
      to={`note/${id}`}
      className="list-group-item list-group-item-action py-3 lh-sm"
    >
      {({ isActive, isPending }) => (
        <span className={isActive ? "active" : ""}>
          <div className="d-flex w-100 align-items-center justify-content-between">
            <strong className="mb-1">{title}</strong>
            {/* <small>Wed</small> */}
          </div>
          <div className={`col-10 mb-1 small ${!isActive && "text-muted"}`}>
            {"Excerpt"}
          </div>
          <div className={`col-10 mb-1 small  ${!isActive && "text-muted"}`}>
            {totimeString.toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  const { user } = useAuth();
  const notes = useLoaderData() as FBNote[];
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
            {user && (
              <Form method="post">
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill w-100 text-start mb-2 ps-4"
                >
                  <i className="bi bi-file-earmark-plus"></i> New
                </button>
              </Form>
            )}
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
            <p>
              <i>No Notes</i>
            </p>
          )}
          {/* <a
            href="#"
            className="list-group-item list-group-item-action py-3 lh-sm"
          >
            <div className="d-flex w-100 align-items-center justify-content-between">
              <strong className="mb-1">List group item heading</strong>
              <small className="text-muted">Tues</small>
            </div>
            <div className="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a> */}
        </div>
      </div>
    </>
  );
}
