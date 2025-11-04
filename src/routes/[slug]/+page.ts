import type { PageLoad } from "../[slug]/$typesd]/$types"

export const load: PageLoad = async ({ params }) => {

    const blog = await import(`$lib/posts/${params.slug}.md`)

    return {
        title: blog.metadata.title,
        content: blog.default,
        slug: params.slug
    }
}
