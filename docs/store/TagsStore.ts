import {defineStore} from 'pinia'

export const tagsStore = defineStore('tags', {
    state: () => {
        return {
            values: [
                {key: "#ee7959", value: "插件"},
                {key: "#ecd452", value: "付费"},
                {key: "#a9be7b", value: "免费"},
                {key: "#5aa4ae", value: "杂谈"},
                {key: "#32788a", value: "教程"},
                {key: "#b1d5c8", value: "前端"},
                {key: "#615ea8", value: "后端"},
                {key: "#da9233", value: "Bukkit"},
                {key: "#4f794a", value: "生活"}
            ]
        }
    },
    actions: {},
    getters: {
        getTagsArray() {
            return this.values
        },
        hasTag(tag: string): boolean {
            return this.values.find(value => value.value == tag) != undefined
        }
    }
})
