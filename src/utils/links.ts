/** Returns target/rel props for external links, empty object otherwise. */
export function externalLinkProps(href: string) {
  return href.startsWith('http')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
}
