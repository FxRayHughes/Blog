import {createContentLoader} from 'vitepress'

export interface Post {
    title: string
    url: string
    date: {
        time: number
        string: string
    }
    excerpt: string | undefined
    categories: string[]
}

declare const data: Post[]
export {data}

export default createContentLoader('posts/public/**/*.md', {
    excerpt: ".",
    transform(raw): Post[] {
        console.log(raw)
        return raw
            .map(({url, frontmatter, excerpt}) => ({
                title: frontmatter.title,
                url,
                excerpt,
                date: formatDate(frontmatter.date),
                categories: frontmatter.categories
            }))
            .sort((a, b) => b.date.time - a.date.time)
    }
})

export function formatDate(raw: string): Post['date'] {
    const date = new Date(raw)
    date.setUTCHours(12)
    return {
        time: +date,
        string: date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
}
