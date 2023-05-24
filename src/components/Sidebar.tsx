//TODO: need 2 states: 1) without any notes 2) with notes 3) need a button to create a new note

import { Form, NavLink } from "react-router-dom";
import { NoteType } from "../notes.ts";
import NotePreview from "./NotePreview.tsx";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/esm/Dropdown";
import sortBy from "sort-by";
import { matchSorter } from "match-sorter";

type SortingType = "updated" | "title" | "created";
type SortDescType = boolean;

export default function Sidebar({
  notes,
  editorLoading,
  toggleSidebar,
}: {
  notes: NoteType[];
  editorLoading: boolean;
  toggleSidebar: (val: boolean) => void;
}) {
  const [sorting, setSorting] = useState<SortingType>("updated");
  const [sortDesc, setSortDesc] = useState<SortDescType>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedNotes, setSortedNotes] = useState(notes);

  useEffect(() => {
    setSortedNotes(notes);
  }, [notes]);

  const handleSortNotes = (newSorting: SortingType) => {
    //Is the user toggling?
    if (sorting === newSorting) return setSortDesc(!sortDesc);

    //User is changing Sort by type
    setSorting(newSorting);
    if (newSorting == "title") setSortDesc(false);
    if (newSorting == "created") setSortDesc(true);
    if (newSorting == "updated") setSortDesc(true);
    // console.log(newSorting, "sortDesc:", sortDesc);
  };

  //TODO: in the future, we expect user to have lots of notes. So instead we should hit the DB on search and sort. Sidebar in this scenario
  // will load a set of notes and then load more when user scrolls down
  useEffect(() => {
    setSortedNotes(sortNotes(filterNotes(notes, searchQuery)));
  }, [sorting, sortDesc, searchQuery]);

  function sortNotes(notes: NoteType[]): NoteType[] {
    const newSortedNotes = [...notes];
    const sortQuery = sortDesc ? `-${sorting}` : sorting;
    return newSortedNotes.sort(sortBy(sortQuery));
  }

  function filterNotes(notes: NoteType[], query: string) {
    const filteredNotes = matchSorter(notes, query, {
      keys: ["title", "content.blocks.*.data.text"],
      threshold: matchSorter.rankings.CONTAINS,
    });
    return filteredNotes;
  }

  return (
    <>
      <div
        id="sidebar_header"
        className="d-flex justify-content-between border-bottom"
      >
        <NavLink
          to={""}
          className="d-flex align-items-center p-3 link-dark text-decoration-none"
        >
          <img
            src="/logo192.png"
            className="pe-none me-2"
            width="30"
            height="30"
          />
          <span className="fs-3 fw-semibold lh-1">Notes List</span>
        </NavLink>
        <div className="align-self-center me-3 d-lg-none">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => toggleSidebar(false)}
          >
            <i className="bi bi-caret-left-fill"></i> Hide Sidebar
          </button>
        </div>
      </div>
      <div id="sidebar_content">
        <div className="list-group list-group-flush border-bottom scrollarea">
          <li className="list-group-item py-3">
            <Form method="post">
              <button
                type="submit"
                className="btn btn-primary rounded-pill w-100 text-start mb-2 ps-4"
              >
                <i className="bi bi-journal-plus me-1"></i> New Note
              </button>
            </Form>
            <div className="d-flex">
              <div className="input-group flex-nowrap me-2">
                <span
                  className="input-group-text rounded-pill-start border-end-0 bg-transparent"
                  id="addon-search"
                >
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="search"
                  className="form-control rounded-pill-end border-start-0"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="addon-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dropdown className="d-inline-block">
                <Dropdown.Toggle variant="primary" id="dropdown-sort-notes">
                  <i className="bi bi-sort-down-alt"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>SORT BY</Dropdown.Header>
                  <Dropdown.Item onClick={() => handleSortNotes("title")}>
                    <span className={sorting !== "title" ? "invisible" : ""}>
                      <i
                        className={`bi bi-arrow-up ${
                          sortDesc ? "text-muted" : "text-primary"
                        }`}
                      ></i>
                      <i
                        className={`bi bi-arrow-down ${
                          sortDesc ? "text-primary" : "text-muted"
                        }`}
                      ></i>
                    </span>{" "}
                    Title
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortNotes("updated")}>
                    <span className={sorting !== "updated" ? "invisible" : ""}>
                      <i
                        className={`bi bi-arrow-up ${
                          sortDesc ? "text-muted" : "text-primary"
                        }`}
                      ></i>
                      <i
                        className={`bi bi-arrow-down ${
                          sortDesc ? "text-primary" : "text-muted"
                        }`}
                      ></i>
                    </span>{" "}
                    Date Updated
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortNotes("created")}>
                    <span className={sorting !== "created" ? "invisible" : ""}>
                      <i
                        className={`bi bi-arrow-up ${
                          sortDesc ? "text-muted" : "text-primary"
                        }`}
                      ></i>
                      <i
                        className={`bi bi-arrow-down ${
                          sortDesc ? "text-primary" : "text-muted"
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
            sortedNotes.map((note) => (
              <NotePreview note={note} key={note.id} disabled={editorLoading} />
            ))
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
