import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params }) => {

    const blog = await import(`../../../posts/${params.slug}.md`)

    return {
        title: blog.metadata.title,
        content: blog.default,
        slug: params.slug
    }
}
