<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 100 100"
        role="img"
        :aria-label="`女友表情：${moodLabel}`"
        class="select-none"
    >
        <!-- 後方光暈 -->
        <circle cx="50"
                cy="50"
                r="48"
                :fill="accent"
                opacity="0.12" />

        <!-- 頭髮（後）-->
        <path d="M16 52 C16 26 32 14 50 14 C68 14 84 26 84 52 C84 64 80 74 80 74 L20 74 C20 74 16 64 16 52 Z" :fill="hair" />

        <!-- 臉 -->
        <circle cx="50"
                cy="52"
                r="30"
                fill="#FFE6D2" />

        <!-- 瀏海 -->
        <path d="M22 44 C24 28 38 20 50 20 C62 20 76 28 78 44 C70 38 60 36 50 40 C40 36 30 38 22 44 Z" :fill="hair" />

        <!-- 腮紅 -->
        <ellipse cx="34"
                 cy="58"
                 rx="5.5"
                 ry="3.4"
                 :fill="blush"
                 :opacity="blushOpacity" />
        <ellipse cx="66"
                 cy="58"
                 rx="5.5"
                 ry="3.4"
                 :fill="blush"
                 :opacity="blushOpacity" />

        <!-- 眉毛 -->
        <path :d="browLeft"
              fill="none"
              :stroke="ink"
              stroke-width="2.4"
              stroke-linecap="round" />
        <path :d="browRight"
              fill="none"
              :stroke="ink"
              stroke-width="2.4"
              stroke-linecap="round" />

        <!-- 眼睛 -->
        <template v-if="mood === 'suspicious'">
            <!-- 半瞇眼（瞇成一條 + 上眼皮）-->
            <path d="M36 52 q4 2.4 8 0"
                  fill="none"
                  :stroke="ink"
                  stroke-width="3"
                  stroke-linecap="round" />
            <path d="M56 52 q4 2.4 8 0"
                  fill="none"
                  :stroke="ink"
                  stroke-width="3"
                  stroke-linecap="round" />
        </template>
        <template v-else-if="mood === 'furious'">
            <!-- 怒視：上挑的尖眼 -->
            <path d="M36 53 q4 -3 8 -0.5"
                  fill="none"
                  :stroke="ink"
                  stroke-width="3.2"
                  stroke-linecap="round" />
            <path d="M56 52.5 q4 -2.5 8 0.5"
                  fill="none"
                  :stroke="ink"
                  stroke-width="3.2"
                  stroke-linecap="round" />
        </template>
        <template v-else>
            <!-- 圓眼 + 高光 -->
            <circle cx="40"
                    cy="52"
                    :r="eyeR"
                    :fill="ink" />
            <circle cx="60"
                    cy="52"
                    :r="eyeR"
                    :fill="ink" />
            <circle cx="38.4"
                    cy="50.4"
                    r="1.4"
                    fill="#fff" />
            <circle cx="58.4"
                    cy="50.4"
                    r="1.4"
                    fill="#fff" />
        </template>

        <!-- 嘴巴 -->
        <path :d="mouth"
              :fill="mouthFill"
              :stroke="ink"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round" />

        <!-- 怒氣符號 💢 / 汗滴 -->
        <g v-if="mood === 'furious'"
           :stroke="accent"
           stroke-width="2"
           fill="none"
           stroke-linecap="round">
            <path d="M74 26 l6 0 M77 23 l0 6 M72 30 l4 4 M80 30 l-4 4" />
        </g>
        <text v-else-if="mood === 'suspicious'"
              x="74"
              y="34"
              font-size="11">💧</text>
    </svg>
</template>

<script>
import {computed} from 'vue';

// 依危險等級（或外部 forceMood）決定表情：
// 1-2 甜笑 / 3 嘟嘴 / 4 瞇眼起疑 / 5 暴怒。expanded（已查看求生解答）→ 一律回到甜笑。
const MOOD_BY_DANGER = {1: 'sweet', 2: 'sweet', 3: 'pouty', 4: 'suspicious', 5: 'furious'};
const MOOD_LABEL = {sweet: '甜笑', pouty: '嘟嘴', suspicious: '起疑', furious: '暴怒'};

export default {
    name: 'GirlfriendAvatar',
    props: {
        danger: {type: Number, default: 3},
        size: {type: [Number, String], default: 72},
        accent: {type: String, default: '#F0479B'},
        // 傳入 'sweet' 可強制甜笑（求生成功時用）
        forceMood: {type: String, default: ''},
    },
    setup(props) {
        const hair = '#5B4636';
        const ink = '#3E3559';
        const blush = '#FF8FB0';

        const mood = computed(() => props.forceMood || MOOD_BY_DANGER[props.danger] || 'pouty');
        const moodLabel = computed(() => MOOD_LABEL[mood.value]);

        const eyeR = computed(() => (mood.value === 'sweet' ? 4 : 3.6));
        const blushOpacity = computed(() => (mood.value === 'furious' ? 0.85 : 0.55));

        const browLeft = computed(() => ({
            sweet: 'M35 44 q5 -2 9 0',
            pouty: 'M35 44 q5 -1 9 0.5',
            suspicious: 'M35 43 q5 0 9 1.5',
            furious: 'M35 41 q5 2 9 4.5',
        }[mood.value]));
        const browRight = computed(() => ({
            sweet: 'M56 44 q4 -2 9 0',
            pouty: 'M56 44.5 q4 -1 9 0',
            suspicious: 'M56 44.5 q4 0 9 -1.5',
            furious: 'M56 45.5 q4 -2 9 -4.5',
        }[mood.value]));

        const mouth = computed(() => ({
            sweet: 'M42 65 q8 7 16 0',
            pouty: 'M44 67 q6 -3 12 0',
            suspicious: 'M43 67 l14 0',
            furious: 'M43 70 q7 -6 14 0',
        }[mood.value]));
        const mouthFill = computed(() => (mood.value === 'furious' ? '#C9367C' : 'none'));

        return {hair, ink, blush, mood, moodLabel, eyeR, blushOpacity, browLeft, browRight, mouth, mouthFill};
    },
};
</script>
