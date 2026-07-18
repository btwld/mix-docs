import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ReportCardProps = {
  href: string;
  title: string;
  titleAccent: string;
  topic: string;
  description: string;
  thesis: string;
  readingTime: string;
  references: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  reverse?: boolean;
  variant: "production" | "genui";
};

export function ReportCard({
  href,
  title,
  titleAccent,
  topic,
  description,
  thesis,
  readingTime,
  references,
  image,
  imageAlt,
  imagePosition = "center",
  reverse = false,
  variant,
}: ReportCardProps) {
  return (
    <article
      className={`report-entry report-entry--${variant}${reverse ? " report-entry--reverse" : ""}`}
    >
      <Link href={href} className="report-entry__link">
        <div className="report-entry__copy">
          <span className="report-entry__topic">{topic}</span>
          <h2>
            {title} <em>{titleAccent}</em>
          </h2>
          <p className="report-entry__description">{description}</p>
          <p className="report-entry__thesis">{thesis}</p>
          <div className="report-entry__footer">
            <span>
              {readingTime} <i>·</i> {references}
            </span>
            <strong>
              Read the report
              <ArrowUpRight aria-hidden="true" size={16} />
            </strong>
          </div>
        </div>

        <div className="report-entry__visual">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 760px) 100vw, 52vw"
            style={{ objectPosition: imagePosition }}
          />
          <div className="report-entry__boundary" aria-hidden="true">
            <span />
          </div>
        </div>
      </Link>
    </article>
  );
}
