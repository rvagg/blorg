import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import nunjucks from 'nunjucks'

/** @type {nunjucks.Environment | null} */
let env = null

const MONTHS_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const DAYS_FULL = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * PHP-style date formatting (subset used by swig)
 * @param {Date} date
 * @param {string} format
 * @returns {string}
 */
function formatDate (date, format) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  /** @param {number} n */
  const pad = (n) => n < 10 ? '0' + n : String(n)

  /** @type {Record<string, () => string | number>} */
  const replacements = {
    // Day
    d: () => pad(date.getDate()),
    D: () => DAYS_SHORT[date.getDay()],
    j: () => date.getDate(),
    l: () => DAYS_FULL[date.getDay()],
    N: () => date.getDay() || 7,
    w: () => date.getDay(),
    // Month
    F: () => MONTHS_FULL[date.getMonth()],
    m: () => pad(date.getMonth() + 1),
    M: () => MONTHS_SHORT[date.getMonth()],
    n: () => date.getMonth() + 1,
    // Year
    Y: () => date.getFullYear(),
    y: () => String(date.getFullYear()).slice(-2),
    // Time
    H: () => pad(date.getHours()),
    i: () => pad(date.getMinutes()),
    s: () => pad(date.getSeconds()),
    G: () => date.getHours(),
    g: () => date.getHours() % 12 || 12,
    A: () => date.getHours() < 12 ? 'AM' : 'PM',
    a: () => date.getHours() < 12 ? 'am' : 'pm',
    // Timezone
    O: () => {
      const offset = -date.getTimezoneOffset()
      const sign = offset >= 0 ? '+' : '-'
      const hours = pad(Math.floor(Math.abs(offset) / 60))
      const mins = pad(Math.abs(offset) % 60)
      return sign + hours + mins
    },
    P: () => {
      const offset = -date.getTimezoneOffset()
      const sign = offset >= 0 ? '+' : '-'
      const hours = pad(Math.floor(Math.abs(offset) / 60))
      const mins = pad(Math.abs(offset) % 60)
      return sign + hours + ':' + mins
    },
    // ISO 8601
    c: () => date.toISOString()
  }

  let result = ''
  for (let i = 0; i < format.length; i++) {
    const char = format[i]
    if (replacements[char]) {
      result += replacements[char]()
    } else {
      result += char
    }
  }
  return result
}

/**
 * Load and compile a Nunjucks template
 * @param {import('../blorg.js').default} blorg
 * @param {Object} config
 * @param {string} config.templateRoot
 * @param {string} config.file
 * @returns {Promise<Function>}
 */
export default async function nunjucksTemplate (blorg, config) {
  if (typeof config.templateRoot !== 'string') {
    throw new Error('Must supply a "templateRoot" value for nunjucks-template')
  }
  if (typeof config.file !== 'string') {
    throw new Error('Must supply a "file" value for nunjucks-template')
  }

  const uri = await blorg.toDirectory(config.templateRoot)

  if (!env) {
    env = new nunjucks.Environment(new nunjucks.FileSystemLoader(uri), {
      autoescape: false
    })

    // Add swig-compatible filters
    env.addFilter('date', (date, format) => formatDate(date, format))
    env.addFilter('raw', (str) => new nunjucks.runtime.SafeString(str))

    // Add spaceless tag (swig compatibility)
    const spacelessExt = {
      tags: /** @type {string[]} */ (['spaceless']),
      /** @param {any} parser @param {any} nodes */
      parse (parser, nodes) {
        const tok = parser.nextToken()
        parser.advanceAfterBlockEnd(tok.value)
        const body = parser.parseUntilBlocks('endspaceless')
        parser.advanceAfterBlockEnd()
        return new nodes.CallExtension(this, 'run', null, [body])
      },
      /** @param {any} _context @param {() => string} body */
      run (_context, body) {
        const content = body()
        // Remove whitespace between HTML tags
        return new nunjucks.runtime.SafeString(
          content.replace(/>\s+</g, '><').trim()
        )
      }
    }
    env.addExtension('SpacelessExtension', spacelessExt)
  }

  const content = await readFile(join(uri, config.file), 'utf8')
  // @ts-ignore - nunjucks type defs are wrong, third param is template name
  const template = nunjucks.compile(content, /** @type {nunjucks.Environment} */ (env), config.file)

  return (/** @type {Object} */ data) => template.render(data)
}
