import { getSingleNote } from "@/src/lib/api";
import { QueryClient } from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const note = await getSingleNote(id);
  console.log(note);

  return <div>NoteDetails</div>;
};

export default NoteDetails;
