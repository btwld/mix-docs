import {
  CONCEPTA_GITHUB_URL,
  CONCEPTA_LEGAL_NAME,
  CONCEPTA_LINKEDIN_URL,
  CONCEPTA_PHONE_SCHEMA,
  CONCEPTA_SITE_URL,
  CONCEPTA_STRUCTURED_ADDRESS,
} from "./constants";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${CONCEPTA_SITE_URL}/#organization`,
  name: "Concepta",
  legalName: CONCEPTA_LEGAL_NAME,
  url: `${CONCEPTA_SITE_URL}/`,
  logo: `${CONCEPTA_SITE_URL}/apple-icon.png`,
  telephone: CONCEPTA_PHONE_SCHEMA,
  address: {
    "@type": "PostalAddress",
    ...CONCEPTA_STRUCTURED_ADDRESS,
  },
  sameAs: [CONCEPTA_GITHUB_URL, CONCEPTA_LINKEDIN_URL],
};

export function ConceptaStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
      }}
    />
  );
}
