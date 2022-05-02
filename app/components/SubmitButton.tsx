import { useTransition } from '@remix-run/react';
import { loadingSvg } from './LoadingSvg';

export const SubmitButton = () => {
    const transition = useTransition();

    const text =
        transition.state === "submitting"
            ? "Finding..."
            : transition.state === "loading"
                ? "Loading!"
                : "Find it";

    return (
        <>
            <button type="submit" className="btn" disabled={transition.state !== 'idle' ? true : false}>
                {transition.state !== 'idle' && loadingSvg}
                {text}
            </button>
        </>
    );
}

