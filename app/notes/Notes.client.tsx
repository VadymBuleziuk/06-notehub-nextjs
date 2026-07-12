"use client";

import { useState } from "react";
import css from "./Notes.client.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes, type NoteResponse } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesProps {
  initialQuery: string;
  initialPage: number;
}

function Notes({ initialPage, initialQuery }: NotesProps) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [modal, setModal] = useState(false);
  const perPage = 12;
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const { data, isSuccess } = useQuery<NoteResponse>({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page, perPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={query} onChange={debouncedSearch} />

          {isSuccess && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              forcePage={page}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        {isSuccess && <NoteList notes={data.notes} />}
        {modal && (
          <Modal onClose={closeModal}>
            <NoteForm closeForm={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default Notes;
