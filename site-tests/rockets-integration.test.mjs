import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

test('wires Rockets into the shared product shell', () => {
  const route = read('src/app/rockets/page.tsx')
  const layout = read('src/app/layout.jsx')
  const navbar = read('components/FloatingNavbar.tsx')
  const constants = read('components/constants.ts')
  const footer = read('components/ProductFooter.tsx')
  const pageMap = read('src/content/_meta.js')
  const conceptaHome = read('components/ConceptaHome.tsx')
  const globals = read('globals.css')
  const landingStyles = read('components/landing/landing.css')

  assert.match(route, /<RocketsLanding\s*\/>/)
  assert.match(route, /Rockets — Your backend should be a spec\./)
  assert.match(layout, /p==='\/rockets'/)
  assert.match(layout, /FVM, Rockets, Stargate/)
  assert.match(navbar, /id: 'rockets'/)
  assert.match(navbar, /ROCKETS_GITHUB_URL/)
  assert.match(constants, /ROCKETS_GITHUB_URL = 'https:\/\/github\.com\/btwld\/rockets'/)
  assert.match(footer, /isRocketsPath/)
  assert.match(pageMap, /rockets:/)
  assert.match(conceptaHome, /name: "Rockets"/)
  assert.match(conceptaHome, /href: "\/rockets"/)
  assert.match(globals, /data-product="rockets"/)
  assert.match(landingStyles, /data-product='rockets'/)
  assert.equal(
    fs.existsSync(path.join(root, 'public/assets/logo_rockets_mark.svg')),
    true,
  )
})

test('presents the repository-backed Rockets vision', () => {
  const content = read('components/landing/rockets/content.tsx')
  const hero = read('components/landing/rockets/HeroWindow.tsx')
  const providers = read('components/landing/rockets/ProviderSpotlights.tsx')
  const outputs = read('components/landing/rockets/OutputsBento.tsx')
  const snippets = read('components/landing/rockets/snippets.ts')

  assert.match(content, /Your backend should be a spec/)
  assert.match(content, /showWordmarkByline: false/)
  assert.match(content, /The definition is the product/)
  assert.match(content, /One bounded domain, one micro app/)
  assert.match(content, /One identity across the product/)
  assert.match(content, /Infrastructure stays at the edge/)
  assert.match(content, /The framework stops at the boundary/)
  assert.match(content, /AuthAdapterInterface/)
  assert.match(content, /RepositoryInterface/)
  assert.match(content, /first-class backend artifact is the direction/)
  assert.match(content, /not a language-neutral serialized artifact/)
  assert.match(content, /How does Rockets relate to Stargate\?/)
  assert.match(content, /Do I need Stargate to use Rockets\?/)
  assert.match(content, /pre-1\.0/)
  assert.match(hero, /role="tablist"/)
  assert.match(hero, /role="tab"/)
  assert.match(hero, /aria-selected=/)
  assert.match(hero, /name: "Spec"/)
  assert.match(hero, /name: "Auth"/)
  assert.match(hero, /name: "Storage"/)
  assert.match(hero, /one backend definition → one domain micro app/)
  assert.match(providers, /Vision · The definition is the product/)
  assert.match(providers, /open-source product model/)
  assert.match(providers, /DIRECTION/)
  assert.match(providers, /unmatched → try next · invalid match → stop/)
  assert.match(providers, /one RepositoryInterface<T>/)
  assert.match(outputs, /One spec\. A complete domain surface\./)
  assert.match(outputs, /Stargate orchestrates · micro apps execute/)
  assert.match(snippets, /defineRockets/)
  assert.match(snippets, /defineFirebaseAuth/)
  assert.match(snippets, /defineFirestoreRepository/)
  assert.doesNotMatch(snippets, /RocketsModule\.forRoot/)
})

test('keeps the open-source calls to action out of the waitlist flow', () => {
  const content = read('components/landing/rockets/content.tsx')

  assert.match(content, /kind: "links"/)
  assert.match(content, /https:\/\/github\.com\/btwld\/rockets/)
  assert.doesNotMatch(content, /kind: "waitlist"/)
})
