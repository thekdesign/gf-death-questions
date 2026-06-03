<template>
    <div>
        <!-- 刊頭 Hero -->
        <header class="mb-9 text-center">
            <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-[0.7rem] font-semibold tracking-wide text-ink-500 shadow-puff-sm backdrop-blur">
                <span class="animate-wobble">💣</span> 每一題都是地雷，點開才知道怎麼活下來
            </div>
            <h1 class="m-0 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-ink-800 sm:text-[3.3rem]">
                <span class="bg-clip-text text-transparent" style="background-image: linear-gradient(120deg, #F0479B, #C9367C 55%, #9C2A60);">
                    女友送命題圖鑑
                </span>
            </h1>
            <p class="mx-auto mt-3 max-w-xl text-sm leading-loose text-ink-500 sm:text-base">
                「我跟你媽掉水裡你先救誰？」「你知道我為什麼生氣嗎？」
                收錄各大論壇的女友送命題，附上吐槽與「男友不死亡回答」——點開選項，看怎麼全身而退。
            </p>

            <!-- 統計膠囊 -->
            <div class="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                <div
                    v-for="stat in stats"
                    :key="stat.label"
                    class="flex items-baseline gap-1.5 rounded-full border border-white/70 bg-white/70 px-4 py-2 shadow-puff-sm backdrop-blur"
                >
                    <span class="font-display text-xl font-extrabold" :style="{color: stat.color}">{{ stat.value }}</span>
                    <span class="text-xs text-ink-500">{{ stat.label }}</span>
                </div>
            </div>
        </header>

        <!-- 分類膠囊 -->
        <section class="mb-4 flex flex-wrap items-center justify-center gap-2">
            <button
                type="button"
                class="rounded-full border px-4 py-2 text-sm font-bold transition-all"
                :class="filtersStore.activeCategoryKey === ''
                    ? 'border-transparent text-white shadow-candy'
                    : 'border-white/70 bg-white/60 text-ink-500 hover:bg-white'"
                :style="filtersStore.activeCategoryKey === '' ? {backgroundImage: 'linear-gradient(135deg, #FF8FC8, #C9367C)'} : {}"
                @click="filtersStore.activeCategoryKey = ''"
            >
                💢 全部
            </button>
            <button
                v-for="cat in categoryList"
                :key="cat.key"
                type="button"
                class="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition-all"
                :class="filtersStore.activeCategoryKey === cat.key
                    ? 'border-transparent text-white shadow-candy'
                    : 'border-white/70 bg-white/60 text-ink-500 hover:bg-white'"
                :style="filtersStore.activeCategoryKey === cat.key
                    ? {backgroundImage: `linear-gradient(135deg, ${cat.gradient[0]}, ${cat.gradient[1]})`} : {}"
                @click="filtersStore.activeCategoryKey = cat.key"
            >
                <span>{{ cat.emoji }}</span>{{ cat.shortLabel }}
            </button>
        </section>

        <!-- 危險度篩選 -->
        <section class="mb-8 flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span class="mr-1 font-mono uppercase tracking-wider text-ink-400">危險度</span>
            <button
                v-for="lv in dangerLevels"
                :key="lv.value"
                type="button"
                class="rounded-full border px-3 py-1 font-bold transition-all"
                :class="filtersStore.minDanger === lv.value
                    ? 'border-heart-400 bg-heart-100 text-heart-700'
                    : 'border-white/70 bg-white/60 text-ink-400 hover:bg-white'"
                @click="filtersStore.minDanger = lv.value"
            >
                {{ lv.label }}
            </button>
        </section>

        <!-- 搜尋結果提示 -->
        <Transition name="fade">
            <p v-if="filtersStore.searchQuery" class="mb-6 text-center text-sm text-ink-500">
                搜尋「<strong class="text-candy-600">{{ filtersStore.searchQuery }}</strong>」：找到
                <strong class="text-candy-600">{{ matchCount }}</strong> 題
                <button type="button" class="ml-2 rounded-full bg-white/70 px-2.5 py-0.5 text-xs text-ink-500 hover:text-ink-800" @click="filtersStore.clearSearch()">
                    清除 ✕
                </button>
            </p>
        </Transition>

        <p v-if="!displayCategories.length" class="my-16 text-center text-sm text-ink-400">
            這個條件下沒有題目 💢 放寬危險度或換個關鍵字試試。
        </p>

        <!-- 各科卡片區 -->
        <section
            v-for="cat in displayCategories"
            :id="`category-${cat.key.toLowerCase()}`"
            :key="cat.key"
            class="mb-12 scroll-mt-24"
        >
            <header class="mb-4 flex items-center gap-3">
                <span class="grid h-11 w-11 place-items-center rounded-2xl text-xl shadow-puff-sm"
                      :style="{backgroundImage: `linear-gradient(135deg, ${cat.gradient[0]}, ${cat.gradient[1]})`}">
                    {{ cat.emoji }}
                </span>
                <div class="min-w-0">
                    <h2 class="m-0 font-display text-xl font-extrabold leading-tight text-ink-800 sm:text-2xl">
                        {{ cat.label }}<span class="ml-2 text-xs font-semibold text-ink-400">{{ cat.subtitle }}</span>
                    </h2>
                    <span class="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-400">{{ String(cat.questions.length).padStart(2, '0') }} 題</span>
                </div>
                <span class="ml-2 hidden h-px flex-1 sm:block" :style="{background: `linear-gradient(90deg, ${cat.accent}55, transparent)`}" />
            </header>
            <p class="-mt-1 mb-5 max-w-2xl text-sm leading-relaxed text-ink-500">{{ cat.blurb }}</p>

            <div class="grid items-start gap-5 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
                <QuestionCard v-for="q in cat.questions" :key="q.id" :question="q" />
            </div>
        </section>
    </div>
</template>

<script>
import {computed} from 'vue';
import {useHead} from '@unhead/vue';
import {useQuestionStore} from 'stores/question/question';
import {useFiltersStore} from 'stores/ui/filters';
import {categoryList} from 'maps/common/Category';
import QuestionCard from 'components/common/QuestionCard.vue';

export default {
    name: 'HomeIndex',
    components: {QuestionCard},
    setup() {
        const questionStore = useQuestionStore();
        const filtersStore = useFiltersStore();

        useHead({
            title: '女友送命題圖鑑 — 40 道地雷題與男友不死亡回答',
        });

        const dangerLevels = [
            {value: 0, label: '全部'},
            {value: 3, label: '☠️3+'},
            {value: 4, label: '☠️4+'},
            {value: 5, label: '☠️5 地獄'},
        ];

        const stats = computed(() => [
            {value: questionStore.list.length, label: '道送命題', color: '#F0479B'},
            {value: categoryList.length, label: '個分科', color: '#9B78FF'},
            {value: questionStore.maxDangerCount, label: '題滿級地雷', color: '#C9367C'},
        ]);

        const matchesSearch = (q) => {
            const query = filtersStore.searchQuery.trim().toLowerCase();
            if (!query) return true;
            const haystack = [q.question, q.roast, q.survival, q.note, q.badEnd]
                .filter(Boolean).join(' ').toLowerCase();
            return haystack.includes(query);
        };
        const matchesDanger = (q) => filtersStore.minDanger === 0 || q.danger >= filtersStore.minDanger;

        const matchCount = computed(() => questionStore.list.filter((q) => matchesSearch(q) && matchesDanger(q)).length);

        const displayCategories = computed(() => {
            const filtered = questionStore.list.filter((q) => matchesSearch(q) && matchesDanger(q));
            const grouped = filtered.reduce((acc, q) => {
                (acc[q.categoryKey] = acc[q.categoryKey] || []).push(q);
                return acc;
            }, {});
            return categoryList
                .filter((c) => filtersStore.activeCategoryKey === '' || filtersStore.activeCategoryKey === c.key)
                .map((c) => ({...c, questions: grouped[c.key] || []}))
                .filter((c) => c.questions.length > 0);
        });

        return {filtersStore, categoryList, dangerLevels, stats, matchCount, displayCategories};
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
