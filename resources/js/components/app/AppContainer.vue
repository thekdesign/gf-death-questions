<template>
    <div class="relative flex min-h-screen flex-col">
        <!-- 戀愛背景裝飾：漂浮愛心 / 泡泡（fixed、不擋點擊）-->
        <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <span class="absolute -left-16 top-24 h-56 w-56 rounded-full bg-candy-200/40 blur-3xl animate-floaty-slow" />
            <span class="absolute right-[-3rem] top-10 h-64 w-64 rounded-full bg-lilac-200/35 blur-3xl animate-floaty" />
            <span class="absolute bottom-10 left-1/3 h-52 w-52 rounded-full bg-candy-300/30 blur-3xl animate-floaty-slow" />
            <span class="absolute left-[8%] top-[42%] text-2xl text-candy-300 animate-twinkle">💕</span>
            <span class="absolute right-[12%] top-[28%] text-lg text-lilac-300 animate-twinkle" style="animation-delay: .6s">💢</span>
            <span class="absolute left-[22%] top-[68%] text-xl text-candy-300 animate-twinkle" style="animation-delay: 1.1s">💗</span>
            <span class="absolute right-[26%] bottom-[22%] text-base text-heart-300 animate-twinkle" style="animation-delay: 1.6s">💣</span>
        </div>

        <!-- Header -->
        <header class="sticky top-0 z-50 border-b border-white/50 bg-white/55 px-4 py-2.5 backdrop-blur-xl sm:px-6">
            <div class="mx-auto flex w-full max-w-[1120px] items-center gap-3">
                <RouterLink :to="{name: 'HOME_INDEX'}" class="flex min-w-0 items-center gap-2.5">
                    <span class="grid h-9 w-9 shrink-0 place-items-center rounded-2xl text-lg shadow-candy"
                          style="background-image: linear-gradient(135deg, #FF8FC8, #C9367C);">💣</span>
                    <span class="flex min-w-0 flex-col leading-none">
                        <span class="font-display text-base font-extrabold tracking-wide text-ink-800">女友送命題圖鑑</span>
                        <span class="hidden truncate text-[0.62rem] tracking-wide text-ink-400 sm:block">Girlfriend Death Questions</span>
                    </span>
                </RouterLink>

                <!-- 搜尋框 -->
                <div class="relative ml-auto w-full max-w-[15rem]">
                    <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-ink-300">⌕</span>
                    <input
                        v-model="filtersStore.searchQuery"
                        type="search"
                        inputmode="search"
                        placeholder="找送命題、找關鍵字…"
                        class="h-9 w-full rounded-full border border-white/70 bg-white/80 pl-8 pr-3 text-sm leading-none text-ink-700 shadow-puff-sm outline-none transition-all placeholder:text-ink-300 focus:border-candy-300 focus:bg-white"
                        aria-label="搜尋送命題"
                    >
                </div>
            </div>
        </header>

        <!-- Main -->
        <div class="mx-auto w-full max-w-[1120px] flex-1 px-4 sm:px-6">
            <main class="min-w-0 pb-20 pt-8">
                <RouterView v-slot="{Component}">
                    <Transition name="route-fade" mode="out-in">
                        <component :is="Component" />
                    </Transition>
                </RouterView>
            </main>
        </div>

        <!-- Footer -->
        <footer class="px-4 py-8 text-center">
            <div class="mx-auto max-w-xl space-y-2.5">
                <div class="text-xl">
                    <RouterLink :to="{name: 'BOSS_QUESTION'}"
                                class="no-underline"
                                title="？"
                                aria-label="隱藏魔王題">💣</RouterLink>
                    💗 🛟
                </div>
                <p class="mx-auto max-w-md text-xs leading-relaxed text-ink-500">
                    本站語錄整理自 PTT、Dcard、Threads、FB 兩性社團的「送命題」迷因，<strong class="text-ink-700">純屬娛樂與二創</strong>。
                    每個人的女友不一樣，求生回答請斟酌服用、誠意才是唯一正解。
                </p>
                <p class="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-300">
                    Girlfriend Death Questions · Survive at your own risk · est. 2026
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
import {useFiltersStore} from 'stores/ui/filters';

export default {
    name: 'AppContainer',
    setup() {
        const filtersStore = useFiltersStore();
        return {filtersStore};
    },
};
</script>

<style>
.route-fade-enter-active,
.route-fade-leave-active {
    transition: opacity 240ms ease, transform 240ms ease;
}
.route-fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
}
.route-fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
