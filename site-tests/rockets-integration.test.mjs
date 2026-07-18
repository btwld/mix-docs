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
  assert.match(navbar, /id: 'rockets'/)
  assert.match(navbar, /ROCKETS_GITHUB_URL/)
  assert.match(constants, /ROCKETS_GITHUB_URL = 'https:\/\/github\.com\/btwld\/rockets'/)
  assert.match(footer, /isRocketsPath/)
  assert.match(pageMap, /rockets:/)
  assert.match(conceptaHome, /name: "Rockets"/)
  assert.match(conceptaHome, /href: "\/rockets"/)
  assert.match(conceptaHome, /createServer/)
  assert.doesNotMatch(conceptaHome, /NestJS|Nest API/)
  assert.match(globals, /data-product="rockets"/)
  assert.match(landingStyles, /data-product='rockets'/)
  assert.match(landingStyles, /\.lp-rockets-root \.lp-seg/)
  assert.match(landingStyles, /min-height: 44px/)
  assert.equal(
    fs.existsSync(path.join(root, 'public/assets/logo_rockets_mark.svg')),
    true,
  )
})

test('presents Rockets as a standalone createServer product', () => {
  const route = read('src/app/rockets/page.tsx')
  const landing = read('components/landing/rockets/RocketsLanding.tsx')
  const content = read('components/landing/rockets/content.tsx')
  const hero = read('components/landing/rockets/HeroWindow.tsx')
  const providers = read('components/landing/rockets/ProviderSpotlights.tsx')
  const snippets = read('components/landing/rockets/snippets.ts')

  assert.match(content, /Your backend should be a spec/)
  assert.match(content, /wordmarkShowByline: false/)
  assert.match(content, /Describe your domain/)
  assert.match(content, /What does createServer\(\) create\?/)
  assert.match(content, /pre-1\.0/)
  assert.match(landing, /<ServerSurface\s*\/>/)
  assert.match(landing, /<ProviderSpotlights\s*\/>/)
  assert.match(landing, /<OwnershipBoundary\s*\/>/)
  assert.doesNotMatch(landing, /LandingRoot/)
  assert.match(hero, /role="tablist"/)
  assert.match(hero, /role="tab"/)
  assert.match(hero, /aria-selected=/)
  assert.match(hero, /name: "Server"/)
  assert.match(hero, /name: "Auth"/)
  assert.match(hero, /name: "Storage"/)
  assert.match(hero, /onKeyDown=/)
  assert.match(hero, /ArrowRight/)
  assert.match(hero, /ArrowLeft/)
  assert.equal(
    fs.existsSync(path.join(root, 'components/landing/rockets/ServerSurface.tsx')),
    true,
  )
  assert.equal(
    fs.existsSync(path.join(root, 'components/landing/rockets/OwnershipBoundary.tsx')),
    true,
  )
  const surface = read('components/landing/rockets/ServerSurface.tsx')
  const boundary = read('components/landing/rockets/OwnershipBoundary.tsx')
  const rocketsPageSource = [
    route,
    landing,
    content,
    hero,
    providers,
    snippets,
    surface,
    boundary,
  ].join('\n')
  assert.match(surface, /One call\. A complete server\./)
  assert.match(surface, /resources/)
  assert.match(surface, /accessControl/)
  assert.match(providers, /Identity and storage/)
  assert.match(providers, /unmatched → try next · invalid match → stop/)
  assert.match(providers, /one RepositoryInterface<T>/)
  assert.match(boundary, /Rockets builds the foundation/)
  assert.match(boundary, /Your team builds the product/)
  assert.match(snippets, /createServer/)
  assert.match(snippets, /defineFirebaseAuth/)
  assert.match(snippets, /defineFirestoreRepository/)
  assert.doesNotMatch(rocketsPageSource, /\bdefineRockets\s*\(/)
  assert.doesNotMatch(rocketsPageSource, /NestJS/)
  assert.doesNotMatch(rocketsPageSource, /Stargate/)
})

test('keeps the open-source calls to action out of the waitlist flow', () => {
  const content = read('components/landing/rockets/content.tsx')

  assert.match(content, /kind: "links"/)
  assert.match(content, /https:\/\/github\.com\/btwld\/rockets/)
  assert.doesNotMatch(content, /kind: "waitlist"/)
})
