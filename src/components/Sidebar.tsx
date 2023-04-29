//TODO: need 2 states: 1) without any notes 2) with notes 3) need a button to create a new note

import { Link, NavLink, useLoaderData } from "react-router-dom";
import notes, { Note } from "../notes.ts";

export function loader(){
  return notes;
}

function NotePreview({ id, title, content }: Note) {
  const newContent =
    content.length > 85 ? `${content.substring(0, 85)}...` : content;

  return (
    <NavLink
      to={`note/${id}`}
      className="list-group-item list-group-item-action py-3 lh-sm"
    >
      <div className="d-flex w-100 align-items-center justify-content-between">
        <strong className="mb-1">{title}</strong>
        <small>Wed</small>
      </div>
      <div className="col-10 mb-1 small">{newContent}</div>
    </NavLink>
    // <a
    //   href="#"
    //   className="list-group-item list-group-item-action py-3 lh-sm"
    //   aria-current="true"
    // >
    //   <div className="d-flex w-100 align-items-center justify-content-between">
    //     <strong className="mb-1">{title}</strong>
    //     <small>Wed</small>
    //   </div>
    //   <div className="col-10 mb-1 small">{newContent}</div>
    // </a>
  );
}

export default function Sidebar() {
  const notesFromLoader = useLoaderData() as Note[];

  return (
    <>
      <div id="sidebar_header">
        <Link to='/' className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        <img
            src="/logo192.png"
            className="pe-none me-2"
            width="30"
            height="30"
          />
          <span className="fs-3 fw-semibold lh-1">Notes List</span>
        </Link>
      </div>
      <div id="sidebar_content">
        <div className="list-group list-group-flush border-bottom scrollarea">
          {notesFromLoader.length ? (
            notesFromLoader.map((note) => (
              <NotePreview
                title={note.title}
                content={note.content}
                id={note.id}
                key={note.id}
              />
            ))
          ) : (
            <p>
              <i>No Notes</i>
            </p>
          )}
          <a
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
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action py-3 lh-sm"
          >
            <div className="d-flex w-100 align-items-center justify-content-between">
              <strong className="mb-1">List group item heading</strong>
              <small className="text-muted">Mon</small>
            </div>
            <div className="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action py-3 lh-sm"
            aria-current="true"
          >
            <div className="d-flex w-100 align-items-center justify-content-between">
              <strong className="mb-1">List group item heading</strong>
              <small className="text-muted">Wed</small>
            </div>
            <div className="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>
          <a
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
          </a>
        </div>
      </div>
    </>
  );
}
