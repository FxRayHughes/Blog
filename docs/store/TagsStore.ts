import {defineStore} from 'pinia'

export const tagsStore = defineStore('tags', {
    state: () => {
        return {
            values: [
                {index: 1, key: "#ee7959", value: "插件"},
                {index: 10, key: "#ecd452", value: "付费"},
                {index: 10, key: "#a9be7b", value: "免费"},
                {index: 20, key: "#5aa4ae", value: "杂谈"},
                {index: 20, key: "#32788a", value: "教程"},
                {index: 30, key: "#b1d5c8", value: "前端"},
                {index: 30, key: "#615ea8", value: "后端"},
                {index: 1, key: "#da9233", value: "Bukkit"},
                {index: 20, key: "#4f794a", value: "生活"}
            ]
        }
    },
    actions: {},
    getters: {
        getTagsArray() {
            return this.values.sort((a: { index: number }, b: { index: number }) => a.index - b.index)
        },
        hasTag(tag: string): boolean {
            return this.values.find(value => value.value == tag) != undefined
        },
        getColor(tag: string): string {
            const value = this.values.find((value: { value: string }) => value.value == tag)
            if (value) {
                return value.key
            }
            return "#000000"
        }
    }
})
