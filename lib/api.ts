import axios from "axios";
import type { Note, NewNote } from "@/types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";

export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number,
): Promise<NoteResponse> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response = await axios.get<NoteResponse>(BASE_URL, {
    params: {
      search,
      page,
      perPage,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("NOTES RESPONSE", response.data);

  return response.data;
};

export const fetchNoteById = async (idNote: string): Promise<Note> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  const response = await axios.get<Note>(`${BASE_URL}/${idNote}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  console.log("TOKEN:", token);
  const response = await axios.post<Note>(BASE_URL, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteNote = async (idNote: string): Promise<Note> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  const response = await axios.delete<Note>(`${BASE_URL}/${idNote}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
