<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep recipe and market source photo metadata in the browser-safe image catalog, and serve downloaded photos through asset pointers; this prevents duplicate IDs and external hotlink dependencies.
- Use the shared accent-insensitive recipe filter for all ingredient searches; this keeps list results consistent.
- Keep clipboard actions client-side and WhatsApp sharing in ordinary outbound links; neither requires server credentials.
