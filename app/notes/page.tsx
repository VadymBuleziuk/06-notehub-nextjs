import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface NoteDetailsProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
    perPage?: number;
  }>;
}

const NotesDetails = async ({ searchParams }: NoteDetailsProps) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const query = params.query ?? "";
  const perPage = 12;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page, perPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes initialPage={page} initialQuery={query} />
    </HydrationBoundary>
  );
};

export default NotesDetails;
