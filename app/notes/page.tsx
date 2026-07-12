// app/notes/page.tsx

import NoteList from "@/components/NoteList/NoteList";
import { getNotes } from "@/src/lib/api";

const Notes = async () => {
  const response = await getNotes();

  return (
    <section>
      <h1>Notes List</h1>
      {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
    </section>
  );
};

export default Notes;
