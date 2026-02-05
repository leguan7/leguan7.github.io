import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import fm from 'front-matter'

// 配置 markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang}">${
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        }</code></pre>`
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

// 解析 Markdown 文件（包含 front-matter）
export function parseMarkdown(rawContent: string): { 
  attributes: Record<string, any>
  content: string
  html: string 
} {
  const { attributes, body } = fm(rawContent)
  const html = md.render(body)
  
  return {
    attributes: attributes as Record<string, any>,
    content: body,
    html
  }
}

// 渲染 Markdown 为 HTML
export function renderMarkdown(content: string): string {
  return md.render(content)
}

// 提取摘要（取 <!-- more --> 之前的内容，或前 200 字符）
export function extractExcerpt(content: string, maxLength: number = 200): string {
  // 检查是否有 <!-- more --> 标记
  const moreIndex = content.indexOf('<!-- more -->')
  if (moreIndex !== -1) {
    const excerpt = content.substring(0, moreIndex)
    // 移除 Markdown 格式
    return stripMarkdown(excerpt).trim()
  }

  // 否则取前 maxLength 个字符
  const stripped = stripMarkdown(content)
  if (stripped.length <= maxLength) {
    return stripped
  }
  return stripped.substring(0, maxLength) + '...'
}

// 移除 Markdown 格式
function stripMarkdown(content: string): string {
  return content
    // 移除标题
    .replace(/^#+\s+/gm, '')
    // 移除粗体/斜体
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // 移除链接
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // 移除图片
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // 移除代码块
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // 移除引用
    .replace(/^>\s+/gm, '')
    // 移除列表标记
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    // 移除水平线
    .replace(/^---+$/gm, '')
    // 移除多余空行
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// 格式化日期
export function formatDate(dateStr: string, format: 'full' | 'short' | 'relative' = 'full'): string {
  const date = new Date(dateStr)
  
  if (format === 'relative') {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return '今天'
    if (diffDays === 1) return '昨天'
    if (diffDays < 7) return `${diffDays} 天前`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} 周前`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} 个月前`
    return `${Math.floor(diffDays / 365)} 年前`
  }
  
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  if (format === 'short') {
    return `${month}-${day}`
  }
  
  return `${year}-${month}-${day}`
}

// 估算阅读时间
export function estimateReadingTime(content: string): number {
  const words = content.length
  const wordsPerMinute = 300 // 中文阅读速度约 300 字/分钟
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}
