"use client";
import css from "./error.module.css";

type ErrorMessageProps = {
  error: Error;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <p className={css.text}>
      Could not fetch the list of notes. {error.message}
    </p>
  );
};

export default ErrorMessage;
