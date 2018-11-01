function renderAttr(attr) {
  return `${attr[0]}="${attr[1]}"`
}

function renderAttrs(attrs) {
  return attrs.map(renderAttr).join(' ')
}

function renderMeta(meta = {}) {
  return `<meta ${renderAttrs(Object.entries(meta))}>`
}

function renderMetas(metas = []) {
  return metas.map(renderMeta).join('')
}

function renderFullPage(html, head) {
  return `
  <!doctype html>
  <html>
    <head>
      <title>${head.title}</title>
      <meta charset="utf-8">
      ${renderMetas(head.metas)}
    </head>
    <body>
      <div id="root">${html}</div>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
  `
}

export default renderFullPage
