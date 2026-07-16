import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { test } from 'node:test'

const root = resolve(import.meta.dirname, '..')
const reportPath = '/reports/production-gap/report.html'
const reportDir = join(root, 'public/reports/production-gap')

test('wires Concepta Reports into the shared site shell', () => {
  const navbar = readFileSync(join(root, 'components/FloatingNavbar.tsx'), 'utf8')
  const layout = readFileSync(join(root, 'src/app/layout.jsx'), 'utf8')
  const footer = readFileSync(join(root, 'components/ProductFooter.tsx'), 'utf8')

  assert.ok(existsSync(join(root, 'src/app/reports/page.tsx')))
  assert.ok(existsSync(join(root, 'src/app/reports/production-gap/page.tsx')))
  assert.match(navbar, /href="\/reports"/)
  assert.match(navbar, /pathname\.startsWith\('\/reports\/'\)/)
  assert.match(layout, /p\.startsWith\('\/reports\/'\)/)
  assert.match(footer, /href="\/reports"/)
})

test('features The Production Gap from both the homepage and Reports page', () => {
  const homepage = readFileSync(join(root, 'components/ConceptaHome.tsx'), 'utf8')
  const reportsPage = readFileSync(join(root, 'components/reports/ReportsHome.tsx'), 'utf8')
  const reportCard = readFileSync(join(root, 'components/reports/ProductionGapCard.tsx'), 'utf8')
  const embeddedReport = readFileSync(join(root, 'src/app/reports/production-gap/page.tsx'), 'utf8')
  const reportHtml = readFileSync(join(reportDir, 'report.html'), 'utf8')

  assert.match(homepage, /ProductionGapCard href="\/reports"/)
  assert.match(reportsPage, /href="\/reports\/production-gap"/)
  assert.match(reportsPage, /external=\{false\}/)
  assert.match(reportCard, /href = "\/reports\/production-gap"/)
  assert.match(reportCard, /Read the report/)
  assert.match(embeddedReport, /<iframe/)
  assert.ok(embeddedReport.includes(`const REPORT_HTML_PATH = "${reportPath}"`))
  assert.match(embeddedReport, /src=\{REPORT_HTML_PATH\}/)
  assert.doesNotMatch(embeddedReport, /chatgpt\.site/)
  assert.match(reportHtml, /Five findings, one pattern/)
  assert.match(reportHtml, /data-screen-label="01 Adoption"/)
  assert.match(reportHtml, /data-screen-label="10 How Concepta helps"/)
})

test('stores every Production Gap runtime and illustration in the repository', () => {
  const requiredFiles = [
    'report.html',
    'support.js',
    'vendor/react.production.min.js',
    'vendor/react-dom.production.min.js',
    'assets/concepta-logo-color.svg',
    'assets/concepta-logo-white.svg',
    'assets/production-gap-editorial-hero-retina-v2.webp',
    'assets/speed-absorbed-light-panorama-retina-v4.webp',
    'assets/expectation-reality-cinematic-bg-retina-v2.webp',
    'assets/felt-vs-measured-light-bg-retina-v2.webp',
    '_ds/concepta-design-system-bdff11cd-f579-4d0b-bcf7-0ff8bb87ffb2/colors_and_type.css',
    '_ds/concepta-design-system-bdff11cd-f579-4d0b-bcf7-0ff8bb87ffb2/styles.css',
    '_ds/concepta-design-system-bdff11cd-f579-4d0b-bcf7-0ff8bb87ffb2/_ds_bundle.js',
  ]

  for (const file of requiredFiles) {
    assert.ok(existsSync(join(reportDir, file)), `missing vendored report file: ${file}`)
  }
})
