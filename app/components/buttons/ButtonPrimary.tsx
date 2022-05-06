import { useTransition } from '@remix-run/react';
import { loadingSvg } from '../shared/LoadingSvg';

export const ButtonPrimary = ({ textDefault, textSubmitting }: { textDefault: string, textSubmitting: string }) => {
  const transition = useTransition();

  const textBtn =
    transition.state === "submitting"
      ? { textSubmitting }
      : transition.state === "loading"
        ? "Loading!"
        : textDefault;

  return (
    <button type="submit" className={`btn-primary ${transition.state}`} disabled={transition.state !== 'idle' ? true : false}>
      {transition.state !== 'idle' && loadingSvg}
      {textBtn}
    </button>
  );
}

