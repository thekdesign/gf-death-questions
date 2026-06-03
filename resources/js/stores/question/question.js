import {defineStore} from 'pinia';
import * as questionApi from 'apis/question/question';

export const useQuestionStore = defineStore('question', {
    state: () => ({
        list: [],
    }),
    getters: {
        getById: (state) => (id) => state.list.find((q) => q.id === Number(id)),
        listByCategory: (state) => state.list.reduce((acc, q) => {
            (acc[q.categoryKey] = acc[q.categoryKey] || []).push(q);
            return acc;
        }, {}),
        // 平均危險等級（首頁統計用）
        maxDangerCount: (state) => state.list.filter((q) => q.danger >= 5).length,
    },
    actions: {
        async requestGetQuestionList() {
            this.list = await questionApi.getQuestionList();
        },
    },
});
