import { NavLink } from "react-router-dom";
import { FBNote } from "../notes";

export default function NotePreview({ note, disabled }: { note: FBNote, disabled:boolean }) {
    // const newContent =
    //   content.length > 85 ? `${content.substring(0, 85)}...` : content;
    const { id, title, content, updated } = note;
    // console.log(note.updated.toDate());
  
    const totimeString = new Date(note.updated.toDate());
  
    return (
      <NavLink
        to={`note/${id}`}
        className={`list-group-item list-group-item-action py-3 lh-sm ${disabled && 'disabled'}`}
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