
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {

    const postModules = import.meta.glob("$lib/posts/*.md", { eager: true });

    const posts = Object.entries(postModules).map(([s, p]) => ({
        ...(p as any).metadata,
        slug: s.split("/").at(-1)!.replace(".md", ""),
        color: "#90AA86",
        icon: "📃"
    }))


    return { posts }
}
