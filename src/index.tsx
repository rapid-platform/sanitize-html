import React from "react";
import sanitizeHtmlReal from "sanitize-html";

export const sanitizeRules = {
  allowedTags: sanitizeHtmlReal.defaults.allowedTags.concat([
    "h1",
    "h2",
    "span",
    "img",
    "table",
    "a",
  ]),
  allowedAttributes: {
    tr: ["class"],
    td: ["class", "colspan"],
    table: ["class"],
    a: ["class", "href", "target", "data-item-ref"],
    span: [
      "class",
      "data-index",
      "data-id",
      "data-value",
      "data-denotation-char",
    ],
    img: ["src", "width", "height"],
  },
  allowedSchemesByTag: {
    img: ["http", "https"],
    a: ["https", "mailto"],
  },
};

/**
 * Run sanitizeHtml on the provided input with the default sanitize rules
 *
 * @param {string} input - The HTML input to sanitize
 * @param {sanitizeHtml.IOptions} [overrideRules] - The rules to use to sanitize the HTML string, these will replace the defaults
 *
 * @returns {string} Sanitized HTML string
 */
export function sanitizeHtml(
  input: string,
  overrideRules?: Partial<sanitizeHtmlReal.IOptions>
): string {
  return sanitizeHtmlReal(input, {
    ...sanitizeRules,
    ...(overrideRules ?? {}),
  });
}

interface ISanitizedDivProps {
  html: string;
  className?: string;
  rules?: Partial<sanitizeHtmlReal.IOptions>;
}

/**
 * Takes a dirty HTML string, sanitizes it and dangerouslySetInnerHTML of a div
 */
export function SanitizedDiv({ html, className, rules }: ISanitizedDivProps) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html, rules) }}
    />
  );
}
