import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '..')

function read(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8')
}

test('keeps Voyager isolated while giving the direct route its own identity', () => {
  const navbar = read('components/FloatingNavbar.tsx')
  const voyagerLogo = read('public/assets/logo_voyager_mark.svg')
  const products = navbar.slice(
    navbar.indexOf('const PRODUCTS:'),
    navbar.indexOf('// Voyager is intentionally'),
  )

  assert.ok(existsSync(join(root, 'src/app/voyager/page.tsx')))
  assert.ok(existsSync(join(root, 'src/app/voyager/readiness/page.tsx')))
  assert.ok(existsSync(join(root, 'public/assets/logo_voyager_mark.svg')))
  assert.match(voyagerLogo, /<path\b/)
  assert.doesNotMatch(voyagerLogo, /<(circle|ellipse)\b/)
  assert.doesNotMatch(products, /voyager/i)
  assert.match(navbar, /const VOYAGER_PRODUCT/)
  assert.match(navbar, /pathname === '\/voyager'/)
  assert.match(navbar, /isVoyagerReadiness \? '#request' : '#waitlist'/)
  assert.match(read('src/app/layout.jsx'), /d='voyager'/)
  assert.match(read('components/ProductFooter.tsx'), /function isVoyagerPath/)
  assert.match(read('components/ProductFooter.tsx'), /isVoyager \? 'Voyager\.'/)
  assert.match(read('globals.css'), /data-product="voyager"/)
  assert.match(read('components/landing/landing.css'), /data-product='voyager'/)
})

test('presents Voyager as developer equipment with a visual path forward', () => {
  const content = read('components/landing/voyager/content.tsx')
  const hero = read('components/landing/voyager/HeroWindow.tsx')
  const outputs = read('components/landing/voyager/OutputsBento.tsx')
  const readiness = read(
    'components/landing/voyager/readiness/ReadinessLanding.tsx',
  )
  const snippets = read('components/landing/voyager/snippets.ts')
  const readinessSnippets = read(
    'components/landing/voyager/readiness/snippets.ts',
  )
  const routeMetadata = read('src/app/voyager/page.tsx')
  const readinessMetadata = read('src/app/voyager/readiness/page.tsx')
  const closingCta = read('components/landing/sections/ClosingCta.tsx')
  const publicCopy = [content, readiness, snippets, readinessSnippets].join('\n')

  assert.match(content, /See any codebase whole/)
  assert.match(content, /wordmarkShowByline: false/)
  assert.match(content, /Built to help you move, not judge/)
  assert.match(content, /The current state of the codebase—not developer performance/)
  assert.doesNotMatch(content, /Audit it\. Grade it\. Prove it\./)
  assert.match(hero, /name: "Map"/)
  assert.match(hero, /name: "Priorities"/)
  assert.match(hero, /name: "Progress"/)
  assert.match(outputs, /Not more findings\. A way forward\./)
  assert.match(outputs, /Understand/)
  assert.match(outputs, /Prioritize/)
  assert.match(outputs, /Improve/)
  assert.doesNotMatch(
    [content, readiness, routeMetadata, readinessMetadata].join('\n'),
    /\bConcepta\b/,
  )
  assert.match(closingCta, /product !== "voyager"/)
  assert.doesNotMatch(
    publicCopy,
    /\b(scc|gitleaks|trivy|opengrep|eslint|knip|jscpd|lizard|pipeline|analyzer|agent|sast|owasp|cwe)\b/i,
  )
})

test('keeps Code Analysis intact and makes readiness plan-oriented', () => {
  const codeAnalysis = read('components/landing/code-analysis/content.tsx')
  const readiness = read(
    'components/landing/voyager/readiness/ReadinessLanding.tsx',
  )

  assert.match(codeAnalysis, /See your code's health clearly/)
  assert.match(codeAnalysis, /Audit it\. Grade it\. Prove it\./)
  assert.doesNotMatch(codeAnalysis, /\bVoyager\b/)
  assert.match(readiness, /Know what&apos;s ready/)
  assert.match(readiness, /Know what comes next/)
  assert.match(readiness, /a grounded baseline and a working plan/)
  assert.doesNotMatch(readiness, /\b(audit|verdict|graded)\b/i)
})
