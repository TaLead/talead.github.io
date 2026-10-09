import { Fragment } from 'react';

function withBreaks(text: string) {
  return text.split('\n').map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/** Renders `**bold**` segments and `\n` line breaks from dictionary strings. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 ? <strong key={i}>{withBreaks(part)}</strong> : <Fragment key={i}>{withBreaks(part)}</Fragment>,
      )}
    </>
  );
}
