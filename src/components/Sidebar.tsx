//TODO: need 2 states: 1) without any notes 2) with notes 3) need a button to create a new note

import { Form, NavLink } from "react-router-dom";
import { FBNote } from "../notes.ts";
import NotePreview from "./NotePreview.tsx";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/esm/Dropdown";
import sortBy from "sort-by";
// const yourModuleName = require('module-name');

type SortingType = "updated" | "title" | "created";
type SortDescType = boolean;

export default function Sidebar({ notes }: { notes: FBNote[] }) {
  // console.log(notes);
  const [sorting, setSorting] = useState<SortingType>("updated");
  const [sortDesc, setSortDesc] = useState<SortDescType>(true);
  const [sortedNotes, setSortedNotes] = useState(notes);

  const sortNotes = (newSorting: SortingType) => {
    //Is the user toggling?
    if (sorting === newSorting) return setSortDesc(!sortDesc);

    //User is changing Sort by type
    setSorting(newSorting);
    if (newSorting == "title") setSortDesc(false);
    if (newSorting == "created") setSortDesc(true);
    if (newSorting == "updated") setSortDesc(true);
    console.log(newSorting, "sortDesc:", sortDesc);
  };

  useEffect(() => {
    const newSortedNotes = [...notes];

    if (!sortDesc) {
      console.log("Pit 1");
      setSortedNotes(newSortedNotes.sort(sortBy(sorting)));
    }

    if (sortDesc) {
      setSortedNotes(newSortedNotes.sort(sortBy(`-${sorting}`)));
    }
  }, [sorting, sortDesc]);

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
            <div className="d-flex">
              <div className="input-group flex-nowrap me-2">
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
              <Dropdown className="d-inline-block">
                <Dropdown.Toggle variant="primary" id="dropdown-sort-notes">
                  <i className="bi bi-sort-down-alt"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>SORT BY</Dropdown.Header>
                  <Dropdown.Item onClick={() => sortNotes("title")}>
                    <span className={sorting !== "title" ? "invisible" : ""}>
                      <i
                        className={`bi bi-arrow-down ${
                          sortDesc ? "text-primary" : "text-muted"
                        }`}
                      ></i>
                      <i
                        className={`bi bi-arrow-up ${
                          sortDesc ? "text-muted" : "text-primary"
                        }`}
                      ></i>
                    </span>{" "}
                    Title
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => sortNotes("updated")}>
                    <span className={sorting !== "updated" ? "invisible" : ""}>
                      <i
                        className={`bi bi-arrow-down ${
                          sortDesc ? "text-primary" : "text-muted"
                        }`}
                      ></i>
                      <i
                        className={`bi bi-arrow-up ${
                          sortDesc ? "text-muted" : "text-primary"
                        }`}
                      ></i>
                    </span>{" "}
                    Date Updated
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => sortNotes("created")}>
                    <span className={sorting !== "created" ? "invisible" : ""}>
                      <i
                        className={`bi bi-arrow-down ${
                          sortDesc ? "text-primary" : "text-muted"
                        }`}
                      ></i>
                      <i
                        className={`bi bi-arrow-up ${
                          sortDesc ? "text-muted" : "text-primary"
                        }`}
                      ></i>
                    </span>{" "}
                    Date Created
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          {sortedNotes.length ? (
            sortedNotes.map((note) => <NotePreview note={note} key={note.id} />)
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
