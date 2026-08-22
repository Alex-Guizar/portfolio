/** True if this href points off-site (used to open links in a new tab). */
export function isExternal(href: string) {
  return href.startsWith('http');
}

/** Returns target/rel props for external links, empty object otherwise. */
export function externalLinkProps(href: string) {
  return isExternal(href)
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
}
