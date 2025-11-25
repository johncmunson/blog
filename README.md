- next-image / rehype-unwrap-images
- autolink headings
- syntax highlighting
- improve styling
- remark-directive

```css
.icon.icon-link {
  display: inline-block;
  width: 0.8em;
  height: 0.8em;
  background: url("/path/to/link-icon.svg") no-repeat center center;
  background-size: contain;
  opacity: 0.6;
}

h1:hover .icon-link,
h2:hover .icon-link,
h3:hover .icon-link,
h4:hover .icon-link,
h5:hover .icon-link,
h6:hover .icon-link {
  opacity: 1;
}
```
