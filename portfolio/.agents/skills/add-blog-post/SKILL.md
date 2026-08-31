---
name: add-blog-post
description: Add an attached Markdown or HTML article to this portfolio blog without rewriting its content. Use when publishing a new post, translating supplied Markdown into the blog's HTML content format, and registering its metadata and assets.
---

# Add Blog Post

Publish the supplied article as a new entry in this repository's existing blog. Treat the article body as immutable source material: translate formatting, but never copyedit, shorten, expand, reorder, or otherwise rewrite it.

## Source and metadata

- Require one clearly identified attached article. If no attachment is available, or multiple files could be the article, ask the user which file to use.
- Read `variables/blog-posts.json` before editing so the new record follows the current schema and conventions.
- Determine metadata in this order: explicit user instructions, document frontmatter, then the defaults below.
  - `title`: use the first level-one heading verbatim.
  - `excerpt`: use the first level-two heading. If none is supplied before the first paragraph then use the first complete prose paragraph verbatim. Never summarize or truncate it.
  - `date`: use the current date in `YYYY-MM-DD` format.
  - `author`: default to `Trevor Gibby`.
  - `tags`: parse the content and apply relevant categories or keywords as an array of strings.
  - `published`: default to `true` when the user asks to add or publish the post.
- Derive a lowercase, hyphenated slug from the title unless the user supplies one. Never overwrite an existing post or asset without asking first.
- Frontmatter is metadata, not article body. Do not render a valid frontmatter block as article content.

## Translate the article

- Save the finished body as `variables/blog-posts/<slug>.html`; the slug must match its `blog-posts.json` record.
- For Markdown input, translate Markdown syntax into equivalent semantic HTML. Preserve every word and preserve the original order and hierarchy.
- Convert headings, paragraphs, emphasis, lists, blockquotes, links, images, horizontal rules, inline code, fenced code blocks, and tables when present. Preserve link destinations, image paths and alt text exactly.
- Keep raw HTML embedded in Markdown intact unless wrapping it is necessary for valid surrounding structure.
- Do not remove a heading merely because the page template also displays the post title. Existing posts intentionally preserve their supplied headings.
- For HTML input, use the supplied HTML body as-is.
- Do not add introductions, conclusions, captions, editorial notes, or typographic substitutions. Do not fix spelling, grammar, punctuation, capitalization, or code.

## Images and diagrams

- Reuse supplied article assets and place new post-specific files under `public/images/blog/<slug>/` when practical.
- A featured image may be created or selected without changing the article body; register it in the post's `image` field.
- Only insert a new image or diagram into the body when the user requests it or the source includes a clear placeholder for it. Otherwise, do not inject media into the article text.
- Keep meaningful alt text from the source unchanged. Write concise alt text only for a newly created asset.

## Register and verify

- Add one post object to `variables/blog-posts.json` without changing existing records or the schema reference except when a new field is genuinely required.
- Ensure the author name matches a record in `variables/authors.json`. If the user specifies a new author, request any missing bio/headshot details instead of inventing them.
- Verify the source-to-HTML translation section by section, checking that all prose, headings, list items, links, code, and media references remain present and unchanged.
- Run the repository's lint and production build checks. Preview the post at desktop and mobile widths when browser testing is available.
- Report the created post URL and changed files. Do not commit or push; ask the user for approval immediately before either action.
