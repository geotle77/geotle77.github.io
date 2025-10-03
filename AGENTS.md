# Repository Guidelines

## Project Structure & Module Organization
- `source/_posts/`: Published Markdown posts. Use kebab-case filenames (e.g., `distributed-training.md`).
- `source/_drafts/`: Work-in-progress posts; move to `_posts` when ready.
- `source/img/`: Images and diagrams. Reference as `/img/...` in posts.
- `scaffolds/`: Post/page templates used by Hexo generators.
- `_config.yml`: Site-wide config. Theme overrides in `_config.fluid.yml` and `_config.landscape.yml`.
- `public/`: Generated output from builds (should not be committed).

## Build, Test, and Development Commands
- `npm install`: Install dependencies for local development.
- `npm run server`: Start local dev server at http://localhost:4000 with live reload.
- `npm run build`: Generate static site into `public/` (`hexo generate`).
- `npm run clean`: Remove `public/` and cache (`hexo clean`). Use before a fresh build.
- `npm run deploy`: Deploy via `hexo-deployer-git` using repo settings in `_config.yml`.

## Coding Style & Naming Conventions
- Front-matter: include `title`, `date`, `tags`, `categories`, optional `description`.
- Headings: Title comes from front-matter; start content at `##`.
- Images: Place under `source/img/...`; use descriptive alt text. Example: `![All-reduce diagram](/img/distributed_training/all_reduce.png)`.
- Code/Math: Fenced code blocks with language hints; MathJax enabled (`$...$`, `$$...$$`).
- Indentation: 2 spaces for YAML/JSON. Keep lines readable (~100 chars max).

## Testing Guidelines
- Local preview: `npm run clean && npm run build && npm run server`. Verify links, images, math, and code highlighting.
- Draft workflow: author in `_drafts/`, preview locally, then move to `_posts/`.
- Coverage: Not applicable; ensure build completes without warnings/errors.

## Commit & Pull Request Guidelines
- Commits: Use concise, imperative messages. Conventional prefixes encouraged: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`. Scopes like `posts`, `config`, `theme` are helpful.
- PRs: Provide a summary, screenshots for visual changes, verification steps, and link related issues. Keep PRs focused and small.

## Security & Configuration Tips
- Do not commit secrets or deployment keys. `hexo-deployer-git` uses your local Git/SSH config.
- Prefer configuration in `_config*.yml` over editing theme source. Document any breaking config changes in the PR.
