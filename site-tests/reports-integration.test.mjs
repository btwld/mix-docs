import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { test } from 'node:test'

const root = resolve(import.meta.dirname, '..')
const reportPath = '/reports/production-gap/report.html'
const reportDir = join(root, 'public/reports/production-gap')
const generativeUiReportPath = '/reports/generative-ui/report.html'
const generativeUiReportDir = join(root, 'public/reports/generative-ui')

test('wires Concepta Reports into the shared site shell', () => {
  const navbar = readFileSync(join(root, 'components/FloatingNavbar.tsx'), 'utf8')
  const layout = readFileSync(join(root, 'src/app/layout.jsx'), 'utf8')
  const footer = readFileSync(join(root, 'components/ProductFooter.tsx'), 'utf8')

  assert.ok(existsSync(join(root, 'src/app/reports/page.tsx')))
  assert.ok(existsSync(join(root, 'src/app/reports/production-gap/page.tsx')))
  assert.ok(existsSync(join(root, 'src/app/reports/generative-ui/page.tsx')))
  assert.match(navbar, /href="\/reports"/)
  assert.match(navbar, /pathname\.startsWith\('\/reports\/'\)/)
  assert.match(layout, /p\.startsWith\('\/reports\/'\)/)
  assert.match(footer, /href="\/reports"/)
})

test('features both editorial reports from the Reports page', () => {
  const homepage = readFileSync(join(root, 'components/ConceptaHome.tsx'), 'utf8')
  const reportsPage = readFileSync(join(root, 'components/reports/ReportsHome.tsx'), 'utf8')
  const reportCard = readFileSync(join(root, 'components/reports/ProductionGapCard.tsx'), 'utf8')
  const productionGapPage = readFileSync(join(root, 'src/app/reports/production-gap/page.tsx'), 'utf8')
  const generativeUiPage = readFileSync(join(root, 'src/app/reports/generative-ui/page.tsx'), 'utf8')
  const reportReader = readFileSync(join(root, 'components/reports/ReportReader.tsx'), 'utf8')
  const reportHtml = readFileSync(join(reportDir, 'report.html'), 'utf8')
  const generativeUiReportHtml = readFileSync(join(generativeUiReportDir, 'report.html'), 'utf8')

  assert.match(homepage, /ProductionGapCard href="\/reports"/)
  assert.match(reportsPage, /href="\/reports\/production-gap"/)
  assert.match(reportsPage, /href="\/reports\/generative-ui"/)
  assert.match(reportsPage, /Build speed is not release speed/)
  assert.match(reportsPage, /The interface can change\. Authority cannot\./)
  assert.match(reportCard, /href = "\/reports\/production-gap"/)
  assert.match(reportCard, /Read the report/)
  assert.match(reportReader, /<iframe/)
  assert.ok(productionGapPage.includes(`const REPORT_HTML_PATH = "${reportPath}"`))
  assert.ok(generativeUiPage.includes(`const REPORT_HTML_PATH = "${generativeUiReportPath}"`))
  assert.match(productionGapPage, /reportPath=\{REPORT_HTML_PATH\}/)
  assert.match(generativeUiPage, /reportPath=\{REPORT_HTML_PATH\}/)
  assert.doesNotMatch(productionGapPage, /chatgpt\.site/)
  assert.doesNotMatch(generativeUiPage, /chatgpt\.site/)
  assert.match(reportHtml, /Five findings, one pattern/)
  assert.match(reportHtml, /data-screen-label="01 Adoption"/)
  assert.match(reportHtml, /data-screen-label="10 How Concepta helps"/)
  assert.match(generativeUiReportHtml, /Software can adapt without giving up control\./)
  assert.match(generativeUiReportHtml, /class="fit-button"/)
  assert.match(generativeUiReportHtml, /The interface changes\. <em>Accountability stays\.<\/em>/)
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

test('stores every Generative UI runtime and illustration in the repository', () => {
  const requiredFiles = [
    'report.html',
    'assets/genui-enterprise/genui-contract-hero-teal.webp',
    'assets/genui-enterprise/governed-composition-panorama-teal.webp',
    '_ds/concepta-design-system-bdff11cd-f579-4d0b-bcf7-0ff8bb87ffb2/colors_and_type.css',
    '_ds/concepta-design-system-bdff11cd-f579-4d0b-bcf7-0ff8bb87ffb2/fonts/JetBrainsMono-Regular.woff2',
  ]

  for (const file of requiredFiles) {
    assert.ok(existsSync(join(generativeUiReportDir, file)), `missing vendored report file: ${file}`)
  }
})
