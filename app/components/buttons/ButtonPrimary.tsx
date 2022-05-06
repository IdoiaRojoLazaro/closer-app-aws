import { useTransition } from '@remix-run/react';
import { loadingSvg } from '../shared/LoadingSvg';

export const ButtonPrimary = ({ text, textSubmitting }: { text: string, textSubmitting: string }) => {
  const transition = useTransition();

  const textBtn =
    transition.state === "submitting"
      ? { textSubmitting }
      : transition.state === "loading"
        ? "Loading!"
        : { text };

  return (
    <button type="submit" className="btn-primary" disabled={transition.state !== 'idle' ? true : false}>
      {transition.state !== 'idle' && loadingSvg}
      {textBtn}
    </button>
  );
}

