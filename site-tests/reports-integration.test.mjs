import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { test } from 'node:test'

const root = resolve(import.meta.dirname, '..')
const reportUrl = 'https://concepta-production-gap.adored-pony-7715.chatgpt.site/feature'

test('wires Concepta Reports into the shared site shell', () => {
  const navbar = readFileSync(join(root, 'components/FloatingNavbar.tsx'), 'utf8')
  const layout = readFileSync(join(root, 'src/app/layout.jsx'), 'utf8')
  const footer = readFileSync(join(root, 'components/ProductFooter.tsx'), 'utf8')

  assert.ok(existsSync(join(root, 'src/app/reports/page.tsx')))
  assert.match(navbar, /href="\/reports"/)
  assert.match(navbar, /pathname\.startsWith\('\/reports\/'\)/)
  assert.match(layout, /p\.startsWith\('\/reports\/'\)/)
  assert.match(footer, /href="\/reports"/)
})

test('features The Production Gap from both the homepage and Reports page', () => {
  const homepage = readFileSync(join(root, 'components/ConceptaHome.tsx'), 'utf8')
  const reportsPage = readFileSync(join(root, 'components/reports/ReportsHome.tsx'), 'utf8')
  const reportCard = readFileSync(join(root, 'components/reports/ProductionGapCard.tsx'), 'utf8')

  assert.match(homepage, /ProductionGapCard href="\/reports"/)
  assert.match(reportsPage, /<ProductionGapCard \/>/)
  assert.ok(reportCard.includes(reportUrl))
  assert.match(reportCard, /Read the report/)
})
