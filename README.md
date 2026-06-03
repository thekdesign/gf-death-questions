# 女友送命題圖鑑 · Girlfriend Death Questions

收錄 PTT / Dcard / Threads / FB 兩性社團流傳的「女友送命題」，用 **Galgame 對話框**呈現：
女友丟出送命題、附上吐槽小字，點開「求生選項」才看得到 BAD END 範例與**男友不死亡回答**。

> 純屬娛樂與二創。每個人的女友不一樣，求生回答斟酌服用，誠意才是唯一正解。

## 內容

- **6 科 · 共 40 道送命題**（外貌/情緒/終極等科各 7 題，記憶/假設各 6 題）+ 1 道隱藏魔王題彩蛋
  - 🪞 外貌身材題（鏡子前的陷阱）
  - ⚖️ 比較排序題（送命題之王）
  - 🧠 記憶測驗題（你給我想清楚）
  - 🔮 假設情境題（時空背景全是她設定的）
  - 💢 情緒陷阱題（你最好給我察覺）
  - ♾️ 終極無解題（哲學系都答不出來）
- 每題：女友原句 + **危險等級 ☠️1–5** + 吐槽小字 + 折疊的「BAD END／存活回答／求生筆記」
- 女友頭像為參數化 SVG，會隨危險等級變臉（甜笑→嘟嘴→起疑→暴怒），點開求生選項後回甜笑

## 技術棧

Vue 3 + Vue Router 4 + Pinia 3 + Vite 7 + vite-ssg + Tailwind 3。架構同
[`../ARCHITECTURE.md`](../ARCHITECTURE.md)（純前端 SSG 個人站模板，複製自 onoma-atlas）。

## 開發

```bash
nvm use          # .nvmrc 寫死 Node 22
npm install
npm run serve    # 開發 server，port 8086
npm run production   # vite-ssg 輸出到 public/
npm run images   # 改了 favicon.svg / og-image.svg 才需要重產 PNG
npm run lint
```

## 內容資料

題目放在 [`resources/js/data/questions/`](resources/js/data/questions/)，一科一檔，
彙整於 `data/questions.js`。語錄初稿與規劃見 [`docs/content-questions.md`](docs/content-questions.md)。
