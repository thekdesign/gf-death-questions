<template>
    <div class="px-4 py-20 text-center">
        <div class="mb-4 text-7xl animate-floaty">💔</div>
        <h1 class="m-0 mb-2 font-display text-3xl font-extrabold text-ink-800">
            404 · 這題你已經答錯了
        </h1>
        <p class="m-0 mb-6 text-ink-500">
            這頁不存在——就像「你知道我為什麼生氣嗎」一樣沒有答案。回圖鑑重新練習吧。
        </p>
        <RouterLink
            :to="{name: 'HOME_INDEX'}"
            class="inline-block rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-candy transition-transform hover:-translate-y-0.5"
            style="background-image: linear-gradient(135deg, #FF8FC8, #C9367C);"
        >
            ← 回到送命題總覽
        </RouterLink>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>
