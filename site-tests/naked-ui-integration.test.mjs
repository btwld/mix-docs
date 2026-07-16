import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

test('wires Naked UI into the shared product shell', () => {
  const route = read('src/app/naked-ui/page.tsx')
  const layout = read('src/app/layout.jsx')
  const navbar = read('components/FloatingNavbar.tsx')
  const constants = read('components/constants.ts')
  const footer = read('components/ProductFooter.tsx')
  const pageMap = read('src/content/_meta.js')
  const conceptaHome = read('components/ConceptaHome.tsx')
  const nextConfig = read('next.config.mjs')

  assert.match(route, /<NakedUiHome\s*\/>/)
  assert.match(route, /Naked UI — Headless Flutter components/)
  assert.match(layout, /p==='\/naked-ui'/)
  assert.match(layout, /Mix, Remix, Naked UI, Ack, FVM, Stargate, and Code Analysis/)
  assert.match(navbar, /id: 'naked-ui'/)
  assert.match(navbar, /https:\/\/docs\.page\/btwld\/naked_ui/)
  assert.match(navbar, /NAKED_UI_GITHUB_URL/)
  assert.match(constants, /NAKED_UI_GITHUB_URL = 'https:\/\/github\.com\/btwld\/naked_ui'/)
  assert.match(footer, /isNakedUiPath/)
  assert.match(pageMap, /'naked-ui':/)
  assert.match(conceptaHome, /name: "Naked UI"/)
  assert.match(conceptaHome, /href: "\/naked-ui"/)
  assert.match(nextConfig, /source: '\/naked_ui', destination: '\/naked-ui'/)
})

test('features FVM alongside Naked UI on the Concepta homepage', () => {
  const homepage = read('components/ConceptaHome.tsx')
  const homepageContent = read('src/content/index.mdx')

  assert.match(homepage, /name: "Naked UI"/)
  assert.match(homepage, /name: "FVM"/)
  assert.match(homepage, /href: "https:\/\/fvm\.app"/)
  assert.match(homepage, /external: true/)
  assert.match(homepage, /target=\{project\.external \? "_blank" : undefined\}/)
  assert.match(homepage, /rel=\{project\.external \? "noopener noreferrer" : undefined\}/)
  assert.match(homepage, /fvm use stable --pin/)
  assert.match(homepageContent, /Naked UI, Ack, FVM/)
})

test('presents the complete documented Naked UI component set', () => {
  const page = read('components/landing/naked-ui/NakedUiHome.tsx')
  const expectedSlugs = [
    'accordion',
    'button',
    'checkbox',
    'dialog',
    'menu',
    'popover',
    'radio',
    'select',
    'slider',
    'switch',
    'tabs',
    'textfield',
    'toggle',
    'tooltip',
  ]

  for (const slug of expectedSlugs) {
    assert.match(page, new RegExp(`\\["[A-Za-z]+", "${slug}"\\]`))
  }

  assert.match(page, /14 primitives/)
  assert.match(page, /flutter pub add naked_ui/)
  assert.match(page, /BSD 3-Clause/)
})

test('keeps the interactive showcase keyboard and motion aware', () => {
  const page = read('components/landing/naked-ui/NakedUiHome.tsx')
  const styles = read('components/landing/naked-ui/naked-ui.css')

  assert.match(page, /role="tablist"/)
  assert.match(page, /role="tab"/)
  assert.match(page, /role="tabpanel"/)
  assert.match(page, /<Wordmark name="naked_ui" showByline=\{false\} \/>/)
  assert.match(page, /tabIndex=\{activeDemo === index \? 0 : -1\}/)
  assert.match(page, /event\.key === "ArrowRight"/)
  assert.match(page, /aria-checked=\{checked\}/)
  assert.match(page, /aria-label="Volume"/)
  assert.match(page, /onKeyDown=/)
  assert.match(styles, /:focus-visible/)
  assert.match(styles, /prefers-reduced-motion: reduce/)
})
