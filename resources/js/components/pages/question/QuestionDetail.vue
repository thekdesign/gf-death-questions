<template>
    <div v-if="question" class="mx-auto max-w-2xl">
        <!-- 返回 -->
        <RouterLink
            :to="{name: 'HOME_INDEX'}"
            class="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ink-500 shadow-puff-sm backdrop-blur transition-colors hover:text-ink-800"
        >
            ← 回圖鑑
        </RouterLink>

        <!-- 主視覺卡 -->
        <section
            class="relative overflow-hidden rounded-5xl border border-white/70 bg-white/80 px-5 py-7 shadow-puff backdrop-blur-md sm:px-8"
            :style="{'--accent': category.accent}"
        >
            <span
                class="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-50"
                :style="{backgroundImage: `linear-gradient(180deg, ${category.gradient[0]}66, transparent)`}"
            />

            <!-- 科別 + 危險度 -->
            <div class="relative z-10 flex items-center justify-between gap-2">
                <span
                    class="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold text-white shadow-puff-sm"
                    :style="{backgroundImage: `linear-gradient(135deg, ${category.gradient[0]}, ${category.gradient[1]})`}"
                >
                    <span>{{ category.emoji }}</span>{{ category.label }}<span class="opacity-70">· {{ category.subtitle }}</span>
                </span>
                <span class="inline-flex items-center gap-0.5" :title="`危險度 ${question.danger} / 5`">
                    <span
                        v-for="n in 5"
                        :key="n"
                        class="text-sm leading-none"
                        :class="n <= question.danger ? 'opacity-100' : 'opacity-20 grayscale'"
                    >☠️</span>
                </span>
            </div>

            <!-- 場景：頭像 + 對話框 -->
            <div class="relative z-10 mt-6 flex items-end gap-3">
                <div class="relative shrink-0">
                    <Transition name="pop-heart">
                        <span v-if="result === 'correct'" class="pointer-events-none absolute -right-1 -top-1 text-lg">💗</span>
                    </Transition>
                    <GirlfriendAvatar :danger="question.danger"
                                      :accent="category.accent"
                                      :force-mood="avatarMood"
                                      :size="92" />
                </div>
                <div class="relative min-w-0 flex-1">
                    <span class="absolute -top-2.5 left-3 z-10 rounded-md px-2 py-0.5 text-[0.62rem] font-bold text-white shadow-puff-sm" :style="{backgroundColor: category.accent}">女友</span>
                    <div class="dialogue relative rounded-2xl rounded-bl-sm border border-ink-100 bg-cream-100 px-4 pb-3.5 pt-4 shadow-inner-soft">
                        <p class="m-0 font-display text-xl font-extrabold leading-snug text-ink-800 sm:text-2xl">
                            「{{ question.question }}」
                        </p>
                    </div>
                </div>
            </div>

            <!-- 旁白吐槽 -->
            <p class="relative z-10 mt-4 flex gap-1.5 text-sm italic leading-relaxed text-ink-500">
                <span class="not-italic opacity-60">💬</span><span>{{ question.roast }}</span>
            </p>
        </section>

        <!-- 作答區：選一句你會怎麼回 -->
        <section class="mt-5">
            <p class="mb-2.5 font-display text-base font-extrabold text-ink-700">這時候你會怎麼回？選一個 ↓</p>
            <QuizOptions :key="question.id"
                         :question="question"
                         :accent="category.accent"
                         @result="result = $event" />
        </section>

        <!-- 上一題 / 下一題 -->
        <nav class="mt-8 flex items-stretch gap-3">
            <RouterLink
                v-if="prev"
                :to="{name: 'QUESTION_DETAIL', params: {questionId: prev.id}}"
                class="group flex min-w-0 flex-1 items-center gap-2.5 rounded-3xl border border-white/70 bg-white/65 px-4 py-3 text-left shadow-puff-sm backdrop-blur transition-shadow hover:shadow-puff"
            >
                <span class="shrink-0 text-xl leading-none">←</span>
                <span class="min-w-0">
                    <span class="block text-[0.62rem] uppercase tracking-wide text-ink-400">上一題</span>
                    <span class="block truncate font-display text-sm font-bold text-ink-700">{{ prev.question }}</span>
                </span>
            </RouterLink>
            <RouterLink
                v-if="next"
                :to="{name: 'QUESTION_DETAIL', params: {questionId: next.id}}"
                class="group flex min-w-0 flex-1 items-center justify-end gap-2.5 rounded-3xl border border-white/70 bg-white/65 px-4 py-3 text-right shadow-puff-sm backdrop-blur transition-shadow hover:shadow-puff"
            >
                <span class="min-w-0">
                    <span class="block text-[0.62rem] uppercase tracking-wide text-ink-400">下一題</span>
                    <span class="block truncate font-display text-sm font-bold text-ink-700">{{ next.question }}</span>
                </span>
                <span class="shrink-0 text-xl leading-none">→</span>
            </RouterLink>
        </nav>
    </div>

    <div v-else class="py-20 text-center">
        <div class="text-5xl">💔</div>
        <p class="mt-3 text-ink-500">找不到這道送命題…</p>
        <RouterLink :to="{name: 'HOME_INDEX'}" class="mt-4 inline-block text-sm font-bold text-candy-600">← 回圖鑑</RouterLink>
    </div>
</template>

<script>
import {computed, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {useHead} from '@unhead/vue';
import {useQuestionStore} from 'stores/question/question';
import {categoryMap} from 'maps/common/Category';
import GirlfriendAvatar from 'components/common/GirlfriendAvatar.vue';
import QuizOptions from 'components/common/QuizOptions.vue';

export default {
    name: 'QuestionDetail',
    components: {GirlfriendAvatar, QuizOptions},
    setup() {
        const route = useRoute();
        const questionStore = useQuestionStore();

        const question = computed(() => questionStore.getById(route.params.questionId));

        // 作答結果：null / 'correct' / 'wrong'。切換上下題或隨機抽時要歸零，女友表情才會重置
        const result = ref(null);
        watch(() => route.params.questionId, () => { result.value = null; });
        const avatarMood = computed(() => {
            if (result.value === 'correct') return 'sweet';
            if (result.value === 'wrong') return 'furious';
            return '';
        });
        const category = computed(() => (question.value ? categoryMap.get(question.value.categoryKey) : categoryMap.get('APPEARANCE')));

        const index = computed(() => questionStore.list.findIndex((q) => q.id === Number(route.params.questionId)));
        const prev = computed(() => (index.value > 0 ? questionStore.list[index.value - 1] : undefined));
        const next = computed(() => (index.value >= 0 && index.value < questionStore.list.length - 1
            ? questionStore.list[index.value + 1] : undefined));

        useHead(computed(() => {
            if (!question.value) return {title: '找不到送命題 · 女友送命題圖鑑'};
            return {
                title: `「${question.value.question}」怎麼回 · 女友送命題圖鑑`,
                meta: [{name: 'description', content: `送命題「${question.value.question}」的男友不死亡回答：${question.value.survival}`}],
            };
        }));

        return {question, category, prev, next, result, avatarMood};
    },
};
</script>

<style scoped>
.dialogue::before {
    content: '';
    position: absolute;
    left: -7px;
    bottom: 12px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 8px solid #FFF7F0;
}
.pop-heart-enter-active {
    transition: opacity 300ms ease, transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-heart-enter-from {
    opacity: 0;
    transform: scale(0.4) translateY(6px);
}
</style>
