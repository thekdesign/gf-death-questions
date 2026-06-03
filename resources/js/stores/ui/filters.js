import {defineStore} from 'pinia';

// 跨元件共用的搜尋／分類／危險等級篩選狀態
export const useFiltersStore = defineStore('filters', {
    state: () => ({
        searchQuery: '',
        activeCategoryKey: '',
        // 0 = 全部；1~5 = 只看該危險等級（含以上）
        minDanger: 0,
    }),
    actions: {
        clearSearch() {
            this.searchQuery = '';
        },
    },
});
