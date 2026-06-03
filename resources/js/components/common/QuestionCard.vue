<template>
    <div
        class="group flex flex-col overflow-hidden rounded-4xl border border-white/80 bg-white/80 shadow-puff backdrop-blur-md transition-shadow hover:shadow-[0_24px_60px_-18px_rgba(201,54,124,0.45)]"
        :style="{'--accent': category.accent, '--c1': category.gradient[0], '--c2': category.gradient[1]}"
    >
        <!-- 頂部：科別膠囊 + 危險度 -->
        <div class="flex items-center justify-between gap-2 px-4 pt-3.5">
            <span
                class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.66rem] font-bold text-white shadow-puff-sm"
                :style="{backgroundImage: `linear-gradient(135deg, ${category.gradient[0]}, ${category.gradient[1]})`}"
            >
                <span>{{ category.emoji }}</span>{{ category.shortLabel }}
            </span>
            <span class="inline-flex items-center gap-0.5" :title="`危險度 ${question.danger} / 5`">
                <span class="mr-1 font-mono text-[0.58rem] uppercase tracking-wider text-ink-400">危險度</span>
                <span
                    v-for="n in 5"
                    :key="n"
                    class="text-[0.78rem] leading-none transition-opacity"
                    :class="n <= question.danger ? 'opacity-100' : 'opacity-20 grayscale'"
                >☠️</span>
            </span>
        </div>

        <!-- 場景：頭像 + 對話框 -->
        <div class="flex items-end gap-2.5 px-4 pt-3">
            <div class="relative shrink-0">
                <Transition name="pop-heart">
                    <span v-if="result === 'correct'" class="pointer-events-none absolute -right-1 -top-1 z-10 text-base">💗</span>
                </Transition>
                <GirlfriendAvatar :danger="question.danger"
                                  :accent="category.accent"
                                  :force-mood="avatarMood"
                                  :size="64" />
            </div>

            <div class="relative min-w-0 flex-1">
                <!-- 名牌 -->
                <span
                    class="absolute -top-2.5 left-3 z-10 rounded-md px-2 py-0.5 text-[0.6rem] font-bold text-white shadow-puff-sm"
                    :style="{backgroundColor: category.accent}"
                >女友</span>
                <!-- 對話框（含指向頭像的小尾巴）-->
                <div class="dialogue relative rounded-2xl rounded-bl-sm border border-ink-100 bg-cream-100 px-3.5 pb-3 pt-3.5 shadow-inner-soft">
                    <p class="m-0 font-display text-[1.04rem] font-extrabold leading-snug text-ink-800">
                        「{{ question.question }}」
                    </p>
                </div>
            </div>
        </div>

        <!-- 旁白吐槽小字 -->
        <p class="mt-2.5 flex gap-1.5 px-4 text-xs italic leading-relaxed text-ink-500">
            <span class="not-italic opacity-60">💬</span>
            <span>{{ question.roast }}</span>
        </p>

        <!-- 作答區：選一句你會怎麼回 -->
        <div class="mt-3 px-4 pb-4">
            <p class="mb-2 text-[0.7rem] font-bold tracking-wide text-ink-400">這時候你會怎麼回？選一個 ↓</p>
            <QuizOptions :question="question" :accent="category.accent" @result="result = $event" />
            <RouterLink
                v-if="result"
                :to="{name: 'QUESTION_DETAIL', params: {questionId: question.id}}"
                class="mt-2 inline-flex items-center gap-1 text-[0.72rem] font-bold transition-opacity hover:opacity-70"
                :style="{color: category.accent}"
            >
                看完整詳解 →
            </RouterLink>
        </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue';
import {categoryMap} from 'maps/common/Category';
import GirlfriendAvatar from 'components/common/GirlfriendAvatar.vue';
import QuizOptions from 'components/common/QuizOptions.vue';

export default {
    name: 'QuestionCard',
    components: {GirlfriendAvatar, QuizOptions},
    props: {
        question: {type: Object, required: true},
    },
    setup(props) {
        const category = computed(() => categoryMap.get(props.question.categoryKey));
        // 作答結果：null（未答）/ 'correct'（存活）/ 'wrong'（BAD END）
        const result = ref(null);
        // 答對 → 女友轉甜笑；答錯 → 暴怒；未答 → 依危險度的預設表情
        const avatarMood = computed(() => {
            if (result.value === 'correct') return 'sweet';
            if (result.value === 'wrong') return 'furious';
            return '';
        });
        return {category, result, avatarMood};
    },
};
</script>

<style scoped>
/* 對話框指向頭像的小尾巴 */
.dialogue::before {
    content: '';
    position: absolute;
    left: -7px;
    bottom: 10px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 8px solid #FFF7F0; /* cream-100 */
}

.pop-heart-enter-active {
    transition: opacity 300ms ease, transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-heart-enter-from {
    opacity: 0;
    transform: scale(0.4) translateY(6px);
}
</style>
