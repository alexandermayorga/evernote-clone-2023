import { NavLink } from "react-router-dom";
import { NoteType } from "../notes";
import { convertOutputDataToText } from "../utils";
import differenceInDays from "date-fns/differenceInDays";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import format from "date-fns/format";

export default function NotePreview({
  note,
  disabled,
}: {
  note: NoteType;
  disabled: boolean;
}) {
  // const newContent =
  //   content.length > 85 ? `${content.substring(0, 85)}...` : content;
  const { id, title, content, updated } = note;
  // console.log(note.updated.toDate());
  // console.log(note);

  const days = differenceInDays(updated.toDate(), Date.now());
  const result = formatDistanceToNowStrict(updated.toDate(), {
    addSuffix: true,
  });
  const result2 = format(updated.toDate(), "MMM dd, yyyy");

  return (
    <NavLink
      to={`note/${id}`}
      className={`list-group-item list-group-item-action py-3 lh-sm ${
        disabled && "disabled"
      }`}
    >
      {({ isActive }) => (
        <span className={isActive ? "active" : ""}>
          <div className="d-flex w-100">
            <strong className="mb-1 line-clamp-2">{title}</strong>
          </div>
          <div
            className={`col-10 mb-2 small line-clamp-2 ${
              !isActive ? "text-muted" : ""
            }`}
          >
            {/* //TODO remove this after fix - nested objects */}
            {content && convertOutputDataToText(content)}
          </div>
          <div className={`col-10 small ${!isActive ? "text-muted" : ""}`}>
            {days >= 0 ? result : result2}
          </div>
        </span>
      )}
    </NavLink>
  );
}
