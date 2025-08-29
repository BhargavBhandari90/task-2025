# Task 2025 Theme

Custom WordPress theme based on Twenty Twenty-Five with an advanced slider block and a modern build pipeline (Webpack, Babel, Sass, PostCSS).

## Installation

1. Copy or clone the theme into `wp-content/themes/task-2025`.
2. In WordPress Admin → Appearance → Themes, activate "task-2025".

## Demo
[Demo](https://playground.wordpress.net/#ewogICAgIiRzY2hlbWEiOiAiaHR0cHM6Ly9wbGF5Z3JvdW5kLndvcmRwcmVzcy5uZXQvYmx1ZXByaW50LXNjaGVtYS5qc29uIiwKICAgICJsYW5kaW5nUGFnZSI6ICIvc2xpZGVyLWRlbW8vIiwKICAgICJwcmVmZXJyZWRWZXJzaW9ucyI6IHsKICAgICAgICAicGhwIjogIjguMyIsCiAgICAgICAgIndwIjogImxhdGVzdCIKICAgIH0sCiAgICAic3RlcHMiOiBbCiAgICAgICAgewogICAgICAgICAgICAic3RlcCI6ICJzZXRTaXRlT3B0aW9ucyIsCiAgICAgICAgICAgICJvcHRpb25zIjogewogICAgICAgICAgICAgICAgImJsb2duYW1lIjogIlNsaWRlciBEZW1vIiwKICAgICAgICAgICAgICAgICJibG9nZGVzY3JpcHRpb24iOiAiVGVzdCBmb3IgU2xpZGVyIERlbW8uIgogICAgICAgICAgICB9CiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAgICJzdGVwIjogImxvZ2luIiwKICAgICAgICAgICAgInVzZXJuYW1lIjogImFkbWluIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgICAic3RlcCI6ICJpbnN0YWxsVGhlbWUiLAogICAgICAgICAgICAidGhlbWVEYXRhIjogewogICAgICAgICAgICAgICAgInJlc291cmNlIjogInVybCIsCiAgICAgICAgICAgICAgICAidXJsIjogImh0dHBzOi8vZ2l0aHViLXByb3h5LmNvbS9wcm94eS8/cmVwbz1CaGFyZ2F2QmhhbmRhcmk5MC90YXNrLTIwMjUiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJvcHRpb25zIjogewogICAgICAgICAgICAgICAgImFjdGl2YXRlIjogdHJ1ZQogICAgICAgICAgICB9CiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAgICJzdGVwIjogImltcG9ydFd4ciIsCiAgICAgICAgICAgICJmaWxlIjogewogICAgICAgICAgICAgICAgInJlc291cmNlIjogInVybCIsCiAgICAgICAgICAgICAgICAidXJsIjogImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9CaGFyZ2F2QmhhbmRhcmk5MC90YXNrLTIwMjUvcmVmcy9oZWFkcy9tYWluL19wbGF5Z3JvdW5kL2RhdGEueG1sIgogICAgICAgICAgICB9CiAgICAgICAgfQogICAgXQp9)

## Development Setup

This theme ships with a small build system to compile SCSS and bundle block scripts.

Prerequisites:
- Node.js 18+

Install dependencies:
```
cd wp-content/themes/task-2025
npm install
```

Build commands:
```
# Production build
npm run build

# Development watch
npm run dev
```

Build outputs are written to `dist/`:
- `dist/style.css`
- `dist/block.js`
- `dist/block.css`

The theme enqueues `dist/style.css` on the frontend (with fallback to `style.css`) and enqueues `dist/block.js` in the block editor.

## Advanced Slider Block

- Block name: `task-2025/advanced-slider`
- Category: `widgets`
- Icon: `grid-view`
- Purpose: Two-row CSS grid layout to display multiple `slide-item` blocks.

Editor behavior:
- Uses `InnerBlocks` to add `task-2025/slide-item` blocks.
- Shows simple nav arrows in the editor when more than 5 slides are present (visual hint only).

Save (frontend) markup:
```
<div class="slider-wrapper">
  <div class="slider-grid">
    <!-- slide items here -->
  </div>
  <!-- Optional arrows if more than 5 slides -->
  <div class="slider-nav" aria-hidden="true">
    <span class="prev">‹</span>
    <span class="next">›</span>
  </div>
</div>
```

Arrows are conditionally rendered only if there are more than 5 slides.

## Slide Item Block

- Block name: `task-2025/slide-item`
- Fields:
  - Media (icon, top-left) via `MediaUpload`
  - Title via `RichText`
  - Description via `RichText` supporting paragraphs (and lists via the editor toolbar)

Rendered markup:
```
<div class="slide-item">
  <img class="slide-icon" src="..." alt="" />
  <h3>Title</h3>
  <div class="slide-desc">Description content…</div>
  <!-- Optional lists supported by editor formatting -->
</div>
```

## Styling

SCSS structure under `src/scss/`:
- `_variables.scss`
- `_mixins.scss`
- `_slider.scss`
- `style.scss` (imports the above)

The grid is defined with CSS Grid as a two-row layout when more than five items are present. Edit `_slider.scss` for layout adjustments.

## Notes

- If you adjust block code, run `npm run build` to update `dist/` assets.
- The theme conditionally falls back to `style.css` if `dist/style.css` is not present.
- SCSS `@import` is currently used; consider migrating to `@use`/`@forward` to silence Sass deprecation warnings in future updates.

# task-2025 Theme

## Installation

1. Copy (or activate) the `task-2025` theme under `wp-content/themes`.
2. Activate in WordPress Admin > Appearance > Themes.

## Build

```bash
cd wp-content/themes/task-2025
npm install
npm run build   # production
npm run dev     # watch mode
```

Outputs are written to `dist/style.css` and `dist/block.js`.

## Advanced Slider Block

- Block name: `task-2025/advanced-slider`
- Slide block: `task-2025/slide-item`

### Usage

1. Add the Advanced Slider block.
2. Add multiple Slide Item blocks using the appender.
3. Reorder slides via drag & drop in the editor.
4. Navigation shows in the editor/preview if more than 5 slides exist (visual only).

### Slide Item Fields

- Icon (image upload)
- Title (RichText)
- Description (RichText supports paragraphs and lists)

### Markup

Save output:

```html
<div class="slider-wrapper">
	<div class="slider-grid">
		<!-- slide-item blocks -->
	</div>
</div>
```

### Styles

- CSS Grid with 5 columns on the first row; remaining wrap to the next row.
- See `src/scss/_slider.scss`.
