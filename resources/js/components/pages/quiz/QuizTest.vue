<template>
    <div class="mx-auto max-w-2xl">
        <RouterLink
            :to="{name: 'HOME_INDEX'}"
            class="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ink-500 shadow-puff-sm backdrop-blur transition-colors hover:text-ink-800"
        >
            ← 回圖鑑
        </RouterLink>

        <!-- ── 開始畫面 ───────────────────────────── -->
        <section
            v-if="phase === 'intro'"
            class="rounded-5xl border border-white/70 bg-white/80 px-6 py-10 text-center shadow-puff backdrop-blur-md"
        >
            <div class="flex justify-center">
                <GirlfriendAvatar :danger="4"
                                  accent="#C9367C"
                                  force-mood="suspicious"
                                  :size="96" />
            </div>
            <h1 class="m-0 mt-4 font-display text-3xl font-extrabold text-ink-800">10 題生存測驗</h1>
            <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
                隨機抽 <strong class="text-candy-600">10 道</strong>送命題，每題三選一。
                選到「男友不死亡回答」才算存活——答完看看你今天能不能活著走出家門。
            </p>
            <button
                type="button"
                class="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 font-display text-base font-extrabold text-white shadow-candy transition-transform hover:-translate-y-0.5"
                style="background-image: linear-gradient(135deg, #FF8FC8, #C9367C);"
                @click="start"
            >
                <span class="text-lg">📝</span>開始測驗
            </button>
        </section>

        <!-- ── 作答中 ─────────────────────────────── -->
        <section v-else-if="phase === 'playing' && current">
            <!-- 進度列 -->
            <div class="mb-4">
                <div class="mb-1.5 flex items-center justify-between text-xs font-bold text-ink-500">
                    <span>第 {{ idx + 1 }} / {{ quizList.length }} 題</span>
                    <span>存活 <span class="text-mint-600">{{ score }}</span> ／ 陣亡 <span class="text-heart-500">{{ idx + (answered ? 1 : 0) - score }}</span></span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-ink-100">
                    <div
                        class="h-full rounded-full transition-all duration-300"
                        :style="{width: `${((idx + (answered ? 1 : 0)) / quizList.length) * 100}%`, backgroundImage: 'linear-gradient(90deg, #FF8FC8, #C9367C)'}"
                    />
                </div>
            </div>

            <!-- 題目卡 -->
            <div
                class="rounded-4xl border border-white/80 bg-white/85 px-5 py-5 shadow-puff backdrop-blur-md"
                :style="{'--accent': category.accent}"
            >
                <div class="flex items-center justify-between gap-2">
                    <span
                        class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.66rem] font-bold text-white shadow-puff-sm"
                        :style="{backgroundImage: `linear-gradient(135deg, ${category.gradient[0]}, ${category.gradient[1]})`}"
                    >
                        <span>{{ category.emoji }}</span>{{ category.shortLabel }}
                    </span>
                    <span class="inline-flex items-center gap-0.5">
                        <span
                            v-for="n in 5"
                            :key="n"
                            class="text-[0.78rem] leading-none"
                            :class="n <= current.danger ? 'opacity-100' : 'opacity-20 grayscale'"
                        >☠️</span>
                    </span>
                </div>

                <div class="mt-4 flex items-end gap-2.5">
                    <div class="relative shrink-0">
                        <Transition name="pop-heart">
                            <span v-if="answeredResult === 'correct'" class="pointer-events-none absolute -right-1 -top-1 z-10 text-base">💗</span>
                        </Transition>
                        <GirlfriendAvatar :danger="current.danger"
                                          :accent="category.accent"
                                          :force-mood="avatarMood"
                                          :size="64" />
                    </div>
                    <div class="relative min-w-0 flex-1">
                        <span class="absolute -top-2.5 left-3 z-10 rounded-md px-2 py-0.5 text-[0.6rem] font-bold text-white shadow-puff-sm" :style="{backgroundColor: category.accent}">女友</span>
                        <div class="dialogue relative rounded-2xl rounded-bl-sm border border-ink-100 bg-cream-100 px-3.5 pb-3 pt-3.5 shadow-inner-soft">
                            <p class="m-0 font-display text-[1.05rem] font-extrabold leading-snug text-ink-800">「{{ current.question }}」</p>
                        </div>
                    </div>
                </div>

                <p class="mt-2.5 flex gap-1.5 text-xs italic leading-relaxed text-ink-500">
                    <span class="not-italic opacity-60">💬</span><span>{{ current.roast }}</span>
                </p>

                <div class="mt-3">
                    <QuizOptions :key="current.id"
                                 :question="current"
                                 :accent="category.accent"
                                 :allow-reset="false"
                                 @result="onAnswer" />
                </div>
            </div>

            <!-- 下一題 / 看結果 -->
            <Transition name="pop-heart">
                <button
                    v-if="answered"
                    type="button"
                    class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-base font-extrabold text-white shadow-candy transition-transform hover:-translate-y-0.5"
                    style="background-image: linear-gradient(135deg, #FF8FC8, #C9367C);"
                    @click="next"
                >
                    {{ idx + 1 < quizList.length ? '下一題 →' : '看結果 →' }}
                </button>
            </Transition>
        </section>

        <!-- ── 結果 ───────────────────────────────── -->
        <section
            v-else-if="phase === 'result'"
            class="rounded-5xl border border-white/70 bg-white/85 px-6 py-9 text-center shadow-puff backdrop-blur-md"
        >
            <div class="flex justify-center">
                <GirlfriendAvatar :danger="5"
                                  accent="#C9367C"
                                  :force-mood="resultMood"
                                  :size="104" />
            </div>
            <div class="mt-4 text-5xl">{{ rank.emoji }}</div>
            <h1 class="m-0 mt-2 font-display text-3xl font-extrabold text-ink-800">{{ rank.title }}</h1>
            <p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">{{ rank.desc }}</p>

            <div class="mx-auto mt-6 flex max-w-xs items-stretch gap-3">
                <div class="flex-1 rounded-3xl bg-mint-50 px-4 py-4">
                    <div class="font-display text-3xl font-extrabold text-mint-600">{{ score }}<span class="text-base text-ink-400">/{{ quizList.length }}</span></div>
                    <div class="mt-0.5 text-xs text-ink-500">題存活</div>
                </div>
                <div class="flex-1 rounded-3xl bg-candy-100 px-4 py-4">
                    <div class="font-display text-3xl font-extrabold text-candy-600">{{ survivalRate }}%</div>
                    <div class="mt-0.5 text-xs text-ink-500">存活率</div>
                </div>
            </div>

            <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-extrabold text-white shadow-candy transition-transform hover:-translate-y-0.5"
                    style="background-image: linear-gradient(135deg, #FF8FC8, #C9367C);"
                    @click="start"
                >
                    🔄 再來一次（換 10 題）
                </button>
                <RouterLink
                    :to="{name: 'HOME_INDEX'}"
                    class="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-5 py-2.5 text-sm font-bold text-ink-500 shadow-puff-sm transition-colors hover:text-ink-800"
                >
                    回圖鑑複習
                </RouterLink>
            </div>
        </section>
    </div>
</template>

<script>
import {ref, computed} from 'vue';
import {useHead} from '@unhead/vue';
import {useQuestionStore} from 'stores/question/question';
import {categoryMap} from 'maps/common/Category';
import GirlfriendAvatar from 'components/common/GirlfriendAvatar.vue';
import QuizOptions from 'components/common/QuizOptions.vue';

const QUIZ_LENGTH = 10;

const RANKS = [
    {min: 10, emoji: '👑', title: '戀愛大師', desc: '教科書級男友，這位女友這輩子是別想跑了。'},
    {min: 8, emoji: '🛡️', title: '資深倖存者', desc: '偶爾擦傷，但總能在最後一秒全身而退。'},
    {min: 6, emoji: '😮‍💨', title: '驚險過關', desc: '活著，只是身上多了幾道看不見的傷。'},
    {min: 4, emoji: '🚑', title: '命懸一線', desc: '再不讀書，下一個紀念日可能就是你的忌日。'},
    {min: 1, emoji: '💀', title: '連環陣亡', desc: '建議從第一題開始，重修《男友求生學》。'},
    {min: 0, emoji: '⚰️', title: '當場原地去世', desc: '……你還是先別急著交女友了，先保命要緊。'},
];

export default {
    name: 'QuizTest',
    components: {GirlfriendAvatar, QuizOptions},
    setup() {
        useHead({title: '10 題生存測驗 · 女友送命題圖鑑'});

        const questionStore = useQuestionStore();

        const phase = ref('intro'); // intro / playing / result
        const quizList = ref([]);
        const idx = ref(0);
        const score = ref(0);
        const answeredResult = ref(null); // 當前題的作答：null / 'correct' / 'wrong'

        const answered = computed(() => answeredResult.value !== null);
        const current = computed(() => quizList.value[idx.value]);
        const category = computed(() => (current.value ? categoryMap.get(current.value.categoryKey) : categoryMap.get('APPEARANCE')));

        const avatarMood = computed(() => {
            if (answeredResult.value === 'correct') return 'sweet';
            if (answeredResult.value === 'wrong') return 'furious';
            return '';
        });

        // Fisher–Yates 洗牌；只在點「開始」時跑（client-side），不影響 SSG prerender
        const start = () => {
            const pool = [...questionStore.list];
            for (let i = pool.length - 1; i > 0; i -= 1) {
                const j = Math.floor(Math.random() * (i + 1));
                [pool[i], pool[j]] = [pool[j], pool[i]];
            }
            quizList.value = pool.slice(0, QUIZ_LENGTH);
            idx.value = 0;
            score.value = 0;
            answeredResult.value = null;
            phase.value = 'playing';
        };

        const onAnswer = (r) => {
            if (answeredResult.value !== null) return; // 鎖定，一題只記一次
            answeredResult.value = r;
            if (r === 'correct') score.value += 1;
        };

        const next = () => {
            if (idx.value + 1 < quizList.value.length) {
                idx.value += 1;
                answeredResult.value = null;
            } else {
                phase.value = 'result';
            }
        };

        const survivalRate = computed(() => (quizList.value.length
            ? Math.round((score.value / quizList.value.length) * 100) : 0));
        const rank = computed(() => RANKS.find((r) => score.value >= r.min));
        const resultMood = computed(() => {
            if (score.value >= 8) return 'sweet';
            if (score.value <= 3) return 'furious';
            return 'pouty';
        });

        return {
            phase, quizList, idx, score, answeredResult, answered,
            current, category, avatarMood, survivalRate, rank, resultMood,
            start, onAnswer, next,
        };
    },
};
</script>

<style scoped>
.dialogue::before {
    content: '';
    position: absolute;
    left: -7px;
    bottom: 10px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 8px solid #FFF7F0;
}
.pop-heart-enter-active {
    transition: opacity 280ms ease, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-heart-enter-from {
    opacity: 0;
    transform: scale(0.6) translateY(6px);
}
</style>
