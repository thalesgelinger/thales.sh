
type AppIcons = "file-text" | "user" | "home"

type PhoneStore = {
    hasBeenDragged: boolean,
    isUnlocked: boolean,
    apps: Array<{
        title: string,
        slug: string,
        icon: AppIcons,
        color: string
    }>
}

export const phoneStore = $state<PhoneStore>({
    hasBeenDragged: false,
    isUnlocked: false,
    apps: [
        {
            title: "Home",
            slug: "",
            icon: "home",
            color: "bg-primary"
        }
    ]
})

export const viewOrchestrator = $state({
    hideDevice: false
})
