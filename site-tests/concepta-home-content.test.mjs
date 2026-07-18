import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { test } from 'node:test'

const root = resolve(import.meta.dirname, '..')

function read(path) {
  return readFileSync(join(root, path), 'utf8')
}

const home = read('components/ConceptaHome.tsx')
const constants = read('components/constants.ts')
const layout = read('src/app/layout.jsx')
const catchAllPage = read('src/app/[[...mdxPath]]/page.jsx')
const rootMdx = read('src/content/index.mdx')

function trustedClientNames(source) {
  const block = source.match(/const TRUSTED_BY = \[([\s\S]*?)\] as const;/)
  assert.ok(block, 'TRUSTED_BY must remain a literal audited client list')
  return [...block[1].matchAll(/name: "([^"]+)"/g)].map((match) => match[1])
}

function channel(value) {
  const normalized = value / 255
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4
}

function luminance(hex) {
  const value = Number.parseInt(hex.slice(1), 16)
  const red = channel((value >> 16) & 255)
  const green = channel((value >> 8) & 255)
  const blue = channel(value & 255)
  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue)
}

function contrast(first, second) {
  const light = Math.max(luminance(first), luminance(second))
  const dark = Math.min(luminance(first), luminance(second))
  return (light + 0.05) / (dark + 0.05)
}

test('uses concise, supported Concepta proof and copy', () => {
  assert.match(home, /"Since 2006"/)
  assert.match(home, /"600\+ projects"/)
  assert.match(home, /"98% happy clients"/)
  assert.deepEqual(trustedClientNames(home), [
    'AdventHealth',
    'FEMA',
    'Red Lobster',
    'Warner Music Group',
  ])

  for (const unsupported of [
    /27% more loan applications/,
    /\+27%/,
    /4\.7(?:★| stars)/,
    /16(?:k|,000) reviews/,
    /35(?:\+|-person)/,
    /\$3M\+ saved/,
    /runs inside products at Google/,
    /98% delivery satisfaction/,
    /600\+ projects shipped/,
    /Trusted with critical systems at/,
  ]) {
    assert.doesNotMatch(home, unsupported)
  }

  assert.match(home, /Code is only the start\./)
  assert.match(home, /We own the path to production\./)
  assert.match(home, /These tools began in real delivery work\./)
  assert.match(home, /Assess delivery readiness/)
  assert.doesNotMatch(home, /TRUST_OUTCOMES|trust-outcomes/)

  const conciseDescription =
    'Concepta takes software from working code through production and builds open-source tools for reliable delivery.'
  assert.ok(rootMdx.includes(`description: "${conciseDescription}"`))
  assert.ok(layout.includes(`'${conciseDescription}'`))
})

test('publishes verified contact through shared constants and semantic links', () => {
  assert.match(constants, /CONCEPTA_SITE_URL = 'https:\/\/concepta\.dev'/)
  assert.match(constants, /CONCEPTA_LEGAL_NAME = 'Concepta Technologies, LLC'/)
  assert.match(constants, /CONCEPTA_PHONE_DISPLAY = '\+1 \(407\) 720-4711'/)
  assert.match(constants, /CONCEPTA_PHONE_HREF = 'tel:\+14077204711'/)
  assert.match(constants, /111 N Orange Ave, Suite 800, Orlando, FL 32801/)
  assert.doesNotMatch(constants, /201 S Orange Ave/)
  assert.match(constants, /google\.com\/maps\/search\/\?api=1&query=/)

  assert.match(home, /<address className="contact-card"/)
  assert.match(home, /\{CONCEPTA_LEGAL_NAME\}/)
  assert.match(home, /href=\{CONCEPTA_PHONE_HREF\}/)
  assert.match(home, /\{CONCEPTA_PHONE_DISPLAY\}/)
  assert.match(home, /href=\{CONCEPTA_MAP_URL\}/)
  assert.match(home, /\{CONCEPTA_ADDRESS_DISPLAY\}/)
})

test('uses concepta.dev metadata and a root-only canonical', () => {
  assert.match(layout, /metadataBase: new URL\('https:\/\/concepta\.dev'\)/)
  assert.doesNotMatch(layout, /fluttermix\.com/)
  assert.match(rootMdx, /^alternates:\n\s+canonical: \/$/m)
  assert.doesNotMatch(layout, /canonical/)
  assert.doesNotMatch(catchAllPage, /canonical/)
})

test('renders safe Organization structured data on the root page only', () => {
  const structuredDataPath = join(root, 'components/ConceptaStructuredData.tsx')
  assert.ok(existsSync(structuredDataPath), 'missing ConceptaStructuredData.tsx')

  const structuredData = read('components/ConceptaStructuredData.tsx')
  assert.match(structuredData, /"@context": "https:\/\/schema\.org"/)
  assert.match(structuredData, /"@type": "Organization"/)
  assert.match(structuredData, /"@type": "PostalAddress"/)
  assert.match(structuredData, /legalName: CONCEPTA_LEGAL_NAME/)
  assert.ok(structuredData.includes('logo: `${CONCEPTA_SITE_URL}/apple-icon.png`'))
  assert.doesNotMatch(structuredData, /logo_concepta\.svg/)
  assert.match(structuredData, /CONCEPTA_STRUCTURED_ADDRESS/)
  assert.match(structuredData, /CONCEPTA_PHONE_SCHEMA/)
  assert.match(structuredData, /CONCEPTA_GITHUB_URL/)
  assert.match(structuredData, /CONCEPTA_LINKEDIN_URL/)
  assert.match(structuredData, /replace\(\/<\/g, "\\\\u003c"\)/)
  assert.doesNotMatch(structuredData, /ProfessionalService/)

  assert.match(rootMdx, /import \{ ConceptaStructuredData \}/)
  assert.match(rootMdx, /<ConceptaStructuredData \/>/)
  assert.doesNotMatch(layout, /ConceptaStructuredData/)
  assert.doesNotMatch(catchAllPage, /ConceptaStructuredData/)
})

test('honors reduced motion and repairs page semantics and contrast', () => {
  assert.match(home, /MotionConfig/)
  assert.match(home, /useReducedMotion/)
  assert.match(home, /const shouldReduceMotion = useReducedMotion\(\)/)
  assert.match(home, /<MotionConfig[\s\S]*?reducedMotion="user"[\s\S]*?skipAnimations=\{shouldReduceMotion === true\}/)
  assert.match(home, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(home, /className="motion-reveal"/)
  assert.match(home, /\.motion-reveal\s*\{[\s\S]*?opacity: 1 !important;[\s\S]*?transform: none !important;/)
  assert.match(home, /\.project-card:hover\s*\{\s*transform: none;/)
  assert.match(home, /<h3 className="project-name">\{project\.name\}<\/h3>/)

  const ackAccent = home.match(/name: "Ack"[\s\S]*?accent: "(#[0-9A-Fa-f]{6})"/)
  assert.ok(ackAccent, 'missing Ack accent')
  assert.ok(
    contrast(ackAccent[1], '#0D0B14') >= 4.5,
    `Ack accent contrast is ${contrast(ackAccent[1], '#0D0B14').toFixed(2)}:1`,
  )

  const buttonHover = home.match(/\.concepta-btn:hover\s*\{[\s\S]*?background: (#[0-9A-Fa-f]{6})/)
  assert.ok(buttonHover, 'missing Concepta button hover color')
  assert.ok(
    contrast(buttonHover[1], '#FFFFFF') >= 4.5,
    `button hover contrast is ${contrast(buttonHover[1], '#FFFFFF').toFixed(2)}:1`,
  )
})
