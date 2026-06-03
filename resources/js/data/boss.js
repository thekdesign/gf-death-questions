/* eslint-disable max-len */
/**
 * 隱藏魔王題 · FINAL BOSS（彩蛋）
 * 不收進 data/questions.js，因此不佔 6 科 × 5 = 30 的對稱，也不進 sitemap。
 * 從 AppContainer footer 的 💣 進入 /boss。
 *
 * 這題格式被刻意反轉：女友連續丟出最致命的送命題 combo，逼出男友的內心 OS
 * 「我今天必須得死嗎？」——而本題沒有「存活回答」，因為答案是肯定的。
 */
export const boss = {
    id: 'boss',
    danger: 6,
    // 女友的連續技（依序冒出）
    combo: [
        '我跟你媽掉水裡，你先救誰？',
        '你知道我為什麼生氣嗎？',
        '我是不是變胖了？',
        '……沒事。',
    ],
    // 男友的內心 OS
    innerVoice: '所以……我今天必須得死嗎？',
    // 反轉的「存活回答」——其實無解
    verdict: '本題無解。是的，你今天必須得死。',
    // 黑色幽默的唯一出路（仍給一線生機，維持溫度）
    onlyWayOut: '唯一解：別答任何一題。閉嘴、抱緊、說對不起，然後問她想吃什麼宵夜。',
};
