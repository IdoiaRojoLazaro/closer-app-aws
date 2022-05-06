import { useTransition } from '@remix-run/react';
import { loadingSvg } from '../shared/LoadingSvg';

export const ButtonPrimary = ({ textDefault, textSubmitting, handleClick }: { textDefault: string, textSubmitting?: string, handleClick?: any }) => {
  const transition = useTransition();

  const textBtn =
    transition.state === "submitting"
      ? textSubmitting
      : transition.state === "loading"
        ? "Loading!"
        : textDefault;

  return (
    <button type="submit" className={`btn btn-primary ${transition.state}`} disabled={transition.state !== 'idle' ? true : false} onClick={handleClick}>
      {transition.state !== 'idle' && loadingSvg}
      {textBtn}
    </button>
  );
}

