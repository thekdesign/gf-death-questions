/* eslint-disable max-len */
/**
 * 科一 · 外貌身材題（鏡子前的陷阱）
 * 她站在鏡子前、或剛換好衣服時最常發動。共通陷阱：你的眼睛飄到哪，哪裡就是戰場。
 */
export const appearance = [
    {
        id: 1,
        number: '01',
        categoryKey: 'APPEARANCE',
        question: '我是不是變胖了？',
        danger: 3,
        roast: '這題沒有「最佳解」，只有「活下來」跟「沒活下來」兩種結局。',
        badEnd: '還好吧？我覺得差不多啊。',
        survival: '妳哪有胖，是我最近運動太少，顯得妳更瘦。',
        note: '把矛頭引向自己，永遠安全。絕對不要分析她的體重。',
    },
    {
        id: 2,
        number: '02',
        categoryKey: 'APPEARANCE',
        question: '我哪裡胖？',
        danger: 4,
        roast: '注意——只要你的眼睛往任何一個部位飄，那個部位就是今晚的戰場。',
        badEnd: '就……手臂跟肚子那邊一點點？',
        survival: '妳沒有胖的地方，只有我捨不得放手的地方。',
        note: '肉麻但有效。切忌指出任何實際部位，那是踩雷的引信。',
    },
    {
        id: 3,
        number: '03',
        categoryKey: 'APPEARANCE',
        question: '我素顏跟化妝，你比較喜歡哪個？',
        danger: 3,
        roast: '答化妝＝嫌素顏醜；答素顏＝嫌她浪費時間化妝。經典雙殺結構。',
        badEnd: '當然是化妝啊，比較好看。',
        survival: '我喜歡的是妳，化不化妝都是同一個人，差別只在別人能不能多看一眼。',
        note: '把焦點從「臉」移到「人」，兩邊都不得罪。',
    },
    {
        id: 4,
        number: '04',
        categoryKey: 'APPEARANCE',
        question: '我這樣穿，會不會很顯胖？',
        danger: 2,
        roast: '她其實已經穿好要出門了，你的「正確答案」只有一個。',
        badEnd: '會欸，要不要換一件？',
        survival: '超好看，這件超適合妳，走啦來不及了。',
        note: '肯定＋催促，斷絕她回去換衣服、重新糾結的念頭。',
    },
    {
        id: 5,
        number: '05',
        categoryKey: 'APPEARANCE',
        question: '你看我今天有沒有不一樣？',
        danger: 4,
        roast: '剪了 3 公分的頭髮、換了眉型、新的指甲——你只有 3 秒可以猜，而且不能說「呃……」。',
        badEnd: '呃……（沉默 5 秒）……妳換手機殼了？',
        survival: '妳是不是修了頭髮？感覺整個人更精神。',
        note: '先賭「頭髮」，命中率最高。真的看不出來就稱讚「氣色」，永遠不會錯。',
    },
];
