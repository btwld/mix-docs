import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'
import { test } from 'node:test'

const root = resolve(import.meta.dirname, '..')
const contentRoot = join(root, 'src/content')

function walk(directory) {
  return readdirSync(directory)
    .flatMap((entry) => {
      const path = join(directory, entry)
      return statSync(path).isDirectory() ? walk(path) : [path]
    })
    .filter((path) => ['.md', '.mdx'].includes(extname(path)))
}

test('provides title and description metadata for every content page', () => {
  const failures = []

  for (const path of walk(contentRoot)) {
    const source = readFileSync(path, 'utf8')
    const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)
    const file = relative(root, path)

    if (!frontmatter) {
      failures.push(`${file}: missing frontmatter`)
      continue
    }

    if (!/^title: [^\n]+$/m.test(frontmatter[1])) {
      failures.push(`${file}: missing title`)
    }
    if (!/^description: [^\n]+$/m.test(frontmatter[1])) {
      failures.push(`${file}: missing description`)
    }
  }

  assert.deepEqual(failures, [])
})
