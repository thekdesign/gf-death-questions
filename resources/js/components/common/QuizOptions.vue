<template>
    <div :style="{'--accent': accent}">
        <!-- 選項 -->
        <div class="space-y-2">
            <button
                v-for="opt in options"
                :key="opt.key"
                type="button"
                :disabled="answered"
                class="quiz-opt flex w-full items-start gap-2.5 rounded-2xl border-2 px-3.5 py-2.5 text-left text-[0.9rem] leading-relaxed transition-all"
                :class="optionClass(opt)"
                @click="choose(opt)"
            >
                <span class="mt-0.5 shrink-0 font-mono text-xs font-bold" :class="answered ? '' : 'text-ink-300'">{{ opt.label }}</span>
                <span class="min-w-0 flex-1 font-semibold text-ink-800">{{ opt.text }}</span>
                <span v-if="answered && opt.correct" class="shrink-0 text-sm">❤️</span>
                <span v-else-if="answered && opt.key === selectedKey" class="shrink-0 text-sm">💀</span>
            </button>
        </div>

        <!-- 判定結果 + 求生筆記 -->
        <Transition name="verdict">
            <div v-if="answered" class="mt-3">
                <div
                    class="rounded-2xl px-3.5 py-2.5 text-sm font-bold"
                    :class="isCorrect ? 'bg-mint-100 text-mint-700' : 'bg-heart-100 text-heart-700'"
                >
                    <template v-if="isCorrect">❤️ 存活！這題你全身而退。</template>
                    <template v-else>💀 BAD END —— 正解是上面標 ❤️ 的那句。</template>
                </div>
                <p class="mt-2 flex gap-1.5 px-0.5 text-[0.74rem] leading-relaxed text-ink-500">
                    <span class="opacity-70">💡</span><span>{{ question.note }}</span>
                </p>
                <button
                    type="button"
                    class="mt-1 inline-flex items-center gap-1 text-[0.72rem] font-bold text-ink-400 transition-colors hover:text-ink-700"
                    @click="reset"
                >
                    ↺ 重答
                </button>
            </div>
        </Transition>
    </div>
</template>

<script>
import {ref, computed} from 'vue';

const LABELS = ['A', 'B', 'C'];

export default {
    name: 'QuizOptions',
    props: {
        question: {type: Object, required: true},
        accent: {type: String, default: '#F0479B'},
    },
    emits: ['result'],
    setup(props, {emit}) {
        const selectedKey = ref('');

        // 三個選項：唯一正解 survival + 兩個死法 badEnd / decoy。
        // 用 id % 3 做穩定排序（SSR 與 client 一致，不用 Math.random），讓正解不會永遠在第一個。
        const options = computed(() => {
            const base = [
                {key: 'survival', text: props.question.survival, correct: true},
                {key: 'badEnd', text: props.question.badEnd, correct: false},
                {key: 'decoy', text: props.question.decoy, correct: false},
            ];
            const r = props.question.id % 3;
            const ordered = [...base.slice(r), ...base.slice(0, r)];
            return ordered.map((o, i) => ({...o, label: LABELS[i]}));
        });

        const answered = computed(() => selectedKey.value !== '');
        const isCorrect = computed(() => answered.value
            && options.value.find((o) => o.key === selectedKey.value)?.correct);

        const choose = (opt) => {
            if (answered.value) return;
            selectedKey.value = opt.key;
            emit('result', opt.correct ? 'correct' : 'wrong');
        };
        const reset = () => {
            selectedKey.value = '';
            emit('result', null);
        };

        const optionClass = (opt) => {
            if (!answered.value) {
                return 'border-ink-100 bg-white/70 hover:border-[var(--accent)] hover:bg-white';
            }
            if (opt.correct) return 'border-mint-300 bg-mint-50';
            if (opt.key === selectedKey.value) return 'border-heart-300 bg-heart-50 line-through decoration-heart-300';
            return 'border-ink-100 bg-white/40 opacity-50';
        };

        return {options, selectedKey, answered, isCorrect, choose, reset, optionClass};
    },
};
</script>

<style scoped>
.quiz-opt:disabled {
    cursor: default;
}
.verdict-enter-active {
    transition: opacity 240ms ease, transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.verdict-enter-from {
    opacity: 0;
    transform: translateY(-6px);
}
.line-through {
    text-decoration-line: line-through;
}
</style>
