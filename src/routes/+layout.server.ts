
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {

    const postModules = import.meta.glob("$lib/posts/*.md", { eager: true });

    const posts = Object.entries(postModules).map(([s, p]) => ({
        color: "bg-chart-4",
        icon: "file-text",
        ...(p as any).metadata,
        slug: s.split("/").at(-1)!.replace(".md", ""),
    }))


    return { posts }
}
