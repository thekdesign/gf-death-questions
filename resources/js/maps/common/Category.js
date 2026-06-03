import {Category} from 'enums/common/Category';
import {EnumMap} from 'libs/EnumMap';

// 各「科」的顯示資訊：標題 + 副標（戲謔註解）+ emoji + 主題色 + 漸層 + 一句導語
// 配色走 Galgame／乙女戀愛調：每科一個漸層，從粉到酒紅一路加重危險感
export const categoryMap = new EnumMap(Category, {
    APPEARANCE: {
        label: '外貌身材題',
        subtitle: '鏡子前的陷阱',
        shortLabel: '外貌身材',
        emoji: '🪞',
        accent: '#F0479B',
        gradient: ['#FFC1DE', '#FF8FC8'],
        blurb: '她站在鏡子前、或剛換好衣服時最常發動。記住：你的眼睛飄到哪，哪裡就是今晚的戰場。',
    },
    COMPARISON: {
        label: '比較排序題',
        subtitle: '送命題之王',
        shortLabel: '比較排序',
        emoji: '⚖️',
        accent: '#6B45CC',
        gradient: ['#CDBCFF', '#B49AFF'],
        blurb: '凡是要你在她和別人之間排名的題目都在這。最高原則：永遠不要真的排序。',
    },
    MEMORY: {
        label: '記憶測驗題',
        subtitle: '你給我想清楚',
        shortLabel: '記憶測驗',
        emoji: '🧠',
        accent: '#2576C2',
        gradient: ['#A6DBFF', '#76C6FF'],
        blurb: '考你記不記得日子、地點、她說過的話。答對情感，比答對細節更重要。',
    },
    HYPOTHETICAL: {
        label: '假設情境題',
        subtitle: '時空背景全是她設定的',
        shortLabel: '假設情境',
        emoji: '🔮',
        accent: '#208054',
        gradient: ['#A3E9C8', '#6FD9A8'],
        blurb: '「如果……你會不會……」開頭的都在這。題目本身就是陷阱，認真分析就中計。',
    },
    EMOTION: {
        label: '情緒陷阱題',
        subtitle: '你最好給我察覺',
        shortLabel: '情緒陷阱',
        emoji: '💢',
        accent: '#F2683E',
        gradient: ['#FFB570', '#FF8A6B'],
        blurb: '通常在你最放鬆的時候發動。動作比台詞重要——先放下手機，先承接情緒。',
    },
    ULTIMATE: {
        label: '終極無解題',
        subtitle: '哲學系都答不出來',
        shortLabel: '終極無解',
        emoji: '♾️',
        accent: '#9C2A60',
        gradient: ['#E89BB5', '#C9367C'],
        blurb: '「你愛我什麼」這類沒有標準答案的題。用一件具體的小事，取代空泛的形容詞。',
    },
});

// categoryList：給 filter chips / section headers 用
export const categoryList = categoryMap.entries()
    .map(([enumValue, value]) => ({
        key: enumValue.key,
        ...value,
    }));
