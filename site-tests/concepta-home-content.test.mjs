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

test('shows the approved Concepta client proof in a responsive logo grid', () => {
  assert.match(home, /"Since 2006"/)
  assert.match(home, /"600\+ projects delivered"/)
  assert.match(home, /"98% delivery satisfaction"/)
  assert.deepEqual(trustedClientNames(home), [
    'Truist',
    'AdventHealth',
    'FEMA',
    'Red Lobster',
    'Warner Music Group',
    'Google',
  ])
  assert.match(home, />Selected Concepta clients</)
  assert.match(home, /grid-template-columns: repeat\(6, minmax\(0, 1fr\)\)/)
  assert.match(home, /grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/)
  assert.match(home, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/)

  assert.match(home, /const TRUST_OUTCOMES = \[/)
  for (const proof of [
    '27% more loan applications at Truist',
    'Up to $3M saved in a two-day FEMA activation',
    '4.7★ across 16k reviews at AdventHealth',
  ]) {
    assert.ok(home.includes(proof), `missing approved proof: ${proof}`)
  }
})

test('separates open-source adoption from Concepta client proof', () => {
  assert.ok(home.includes(
    'Our open-source work is used by teams at Universal, Disney, BMW, Toyota, LG, Nubank, and others.',
  ))
  assert.doesNotMatch(home, /runs inside products at/)
  assert.doesNotMatch(home, /(?:clients|partners) at Universal/)
})

test('preserves the approved positioning, offer, and project detail', () => {
  for (const copy of [
    'Between code that&apos;s written and a system that&apos;s safely',
    'And we build our own tools to do it.',
    'Get a Delivery Readiness Assessment',
    'Small by design.',
    'We ship what a business depends on.',
    'We don\'t start from scratch.',
    'The evidence behind governed delivery.',
    'switch versions without reinstalling',
    'Agents act through approved capabilities, not broad system access.',
    'over any repo',
    'Know whether it&apos;s safe to ship.',
  ]) {
    assert.ok(home.includes(copy), `missing preserved copy: ${copy}`)
  }

  const projectsIntroduction =
    'Every project here started inside real delivery work — then got extracted, hardened, and shipped. Our open-source work is used by teams at Universal, Disney, BMW, Toyota, LG, Nubank, and others. Open source where the community builds with us, product where the problem demands more.'
  assert.ok(home.includes(projectsIntroduction))

  for (const description of [
    'Fluent, chainable styles, reactive variants, and design tokens. Build design systems in Flutter without the boilerplate.',
    '20+ accessible components built on Mix — completely styleable, from primitives to a full theme, with complete visual control.',
    'Fourteen headless controls with semantics, keyboard and focus behavior, overlays, and observable state — without imposed styling.',
    'Dart schemas for apps and structured AI — define the shape once, validate every response at runtime, and keep your types.',
    'Pin Flutter SDKs per project, switch versions without reinstalling, and keep local development and CI on the same toolchain.',
    'One typed backend definition wires identity, storage, resources, access, hooks, and OpenAPI at runtime.',
    'Turns APIs, workflows, and business rules into reusable capabilities with controls built in — permissions, approvals, human review, and audit. Agents act through approved capabilities, not broad system access.',
    'Ten static analyzers and a 7-phase AI pipeline over any repo — a four-dimension scorecard and a report you can put in front of a client.',
  ]) {
    assert.ok(home.includes(description), `missing project description: ${description}`)
  }

  const description =
    'Concepta ships the systems your business runs on — and builds the open-source delivery foundation behind them: Mix, Remix, Naked UI, Ack, FVM, Rockets, Stargate, and Code Analysis.'
  assert.ok(rootMdx.includes(`description: "${description}"`))
  assert.ok(layout.includes(`'${description}'`))
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
