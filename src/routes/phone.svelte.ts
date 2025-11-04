
type AppIcons = "file-text"

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
    apps: []
})
