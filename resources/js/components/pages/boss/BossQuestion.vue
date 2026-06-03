<template>
    <div class="mx-auto max-w-2xl">
        <RouterLink
            :to="{name: 'HOME_INDEX'}"
            class="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ink-500 shadow-puff-sm backdrop-blur transition-colors hover:text-ink-800"
        >
            ← 逃回圖鑑
        </RouterLink>

        <!-- 魔王卡（黑底，跟全站粉色刻意反差）-->
        <section class="boss-card relative overflow-hidden rounded-5xl px-5 py-8 text-center shadow-puff sm:px-8">
            <!-- 骷髏雨背景 -->
            <div class="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]" aria-hidden="true">
                <span v-for="n in 12"
                      :key="n"
                      class="skull-drop absolute text-2xl"
                      :style="skullStyle(n)">☠️</span>
            </div>

            <div class="relative z-10">
                <span class="inline-flex items-center gap-2 rounded-full border border-heart-500/40 bg-heart-500/10 px-4 py-1 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-heart-300">
                    Final Boss · 隱藏魔王題
                </span>

                <!-- 暴怒女友 -->
                <div class="mt-6 flex justify-center">
                    <div class="relative animate-boss-shake">
                        <GirlfriendAvatar :danger="5"
                                          accent="#ED4253"
                                          force-mood="furious"
                                          :size="120" />
                    </div>
                </div>

                <!-- 連續技：依序冒出的送命題 -->
                <div class="mt-6 space-y-2.5">
                    <p
                        v-for="(line, i) in boss.combo"
                        :key="i"
                        class="combo-line mx-auto max-w-md rounded-2xl border border-heart-500/30 bg-white/[0.06] px-4 py-2.5 font-display text-base font-bold text-heart-100 sm:text-lg"
                        :style="{animationDelay: `${i * 0.5 + 0.3}s`}"
                    >
                        「{{ line }}」
                    </p>
                </div>

                <!-- 男友內心 OS -->
                <p
                    class="inner-voice mx-auto mt-6 max-w-md font-display text-xl font-extrabold text-white sm:text-2xl"
                    :style="{animationDelay: `${boss.combo.length * 0.5 + 0.6}s`}"
                >
                    {{ boss.innerVoice }}
                </p>
            </div>
        </section>

        <!-- 反轉的「存活回答」：無解 -->
        <section
            class="verdict-block mt-5 rounded-3xl bg-ink-900 px-6 py-7 text-center"
            :style="{animationDelay: `${boss.combo.length * 0.5 + 1.2}s`}"
        >
            <div class="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-heart-400">No Survival Answer</div>
            <p class="m-0 font-display text-2xl font-extrabold leading-snug text-heart-300 sm:text-3xl">
                💀 {{ boss.verdict }}
            </p>
        </section>

        <!-- 唯一出路（求生筆記，保留一點溫度）-->
        <section class="mt-4 rounded-3xl border border-mint-300 bg-mint-50 px-5 py-4">
            <div class="mb-1 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mint-700">
                <span>🛟</span>唯一的一線生機
            </div>
            <p class="m-0 text-center text-sm leading-relaxed text-ink-700">{{ boss.onlyWayOut }}</p>
        </section>

        <RouterLink
            :to="{name: 'HOME_INDEX'}"
            class="mx-auto mt-7 block w-fit rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-candy transition-transform hover:-translate-y-0.5"
            style="background-image: linear-gradient(135deg, #FF8FC8, #C9367C);"
        >
            回去乖乖練習 40 道送命題 →
        </RouterLink>
    </div>
</template>

<script>
import {useHead} from '@unhead/vue';
import {boss} from 'data/boss';
import GirlfriendAvatar from 'components/common/GirlfriendAvatar.vue';

export default {
    name: 'BossQuestion',
    components: {GirlfriendAvatar},
    setup() {
        useHead({title: '隱藏魔王題 · 我今天必須得死嗎？ — 女友送命題圖鑑'});

        // 骷髏雨：用 index 推導位置/延遲，避開 Math.random（SSR 不穩、prerender 會炸）
        const skullStyle = (n) => ({
            left: `${(n * 37) % 100}%`,
            animationDelay: `${(n % 6) * 0.7}s`,
            animationDuration: `${4 + (n % 4)}s`,
        });

        return {boss, skullStyle};
    },
};
</script>

<style scoped>
.boss-card {
    background-image: radial-gradient(circle at 50% 0%, #3E1A2E 0%, #1C1829 70%);
    border: 1px solid rgba(237, 66, 83, 0.25);
}

.combo-line,
.inner-voice,
.verdict-block {
    opacity: 0;
    animation: rise-in 0.5s ease forwards;
}
@keyframes rise-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-boss-shake {
    animation: boss-shake 2.4s ease-in-out infinite;
}
@keyframes boss-shake {
    0%, 100% { transform: rotate(-2deg) scale(1); }
    50% { transform: rotate(2deg) scale(1.04); }
}

.skull-drop {
    top: -10%;
    animation: skull-fall linear infinite;
}
@keyframes skull-fall {
    from { transform: translateY(-20px); }
    to { transform: translateY(120vh); }
}

@media (prefers-reduced-motion: reduce) {
    .combo-line, .inner-voice, .verdict-block { animation: none; opacity: 1; }
    .animate-boss-shake, .skull-drop { animation: none; }
}
</style>
