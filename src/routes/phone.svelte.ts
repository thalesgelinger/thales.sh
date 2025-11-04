
type AppIcons = "file-text" | "user" | "home"

type PhoneStore = {
    hasBeenDragged: boolean,
    apps: Array<{
        title: string,
        slug: string,
        icon: AppIcons,
        color: string
    }>
}

export const phoneStore = $state<PhoneStore>({
    hasBeenDragged: false,
    apps: [
        {
            title: "Home",
            slug: "",
            icon: "home",
            color: "bg-primary"
        }
    ]
})
