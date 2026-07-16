export function Wordmark({
  name,
  showByline = true,
}: {
  name: string;
  showByline?: boolean;
}) {
  return (
    <div className="lp-wordmark">
      <span className="lp-wordmark-text">
        {name}
        <span className="lp-wordmark-cursor" aria-hidden="true">
          ▊
        </span>
      </span>
      {showByline && (
        <a
          className="lp-byline"
          href="https://conceptatech.com"
          target="_blank"
          rel="noreferrer"
        >
          by
          <img
            src="/assets/logo_concepta.svg"
            alt="Concepta"
            className="lp-byline-logo"
          />
        </a>
      )}
    </div>
  );
}
