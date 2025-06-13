/**
 * Don't execute this function
 * It's just statically analyzable so dynamic imports work on Deno Deploy
 * @see https://deno.com/deploy/changelog#statically-analyzable-dynamic-imports
 */
export function toStaticallyAnalyzableDynamicImports() {
  import('./content/pages.page.ts');
}
