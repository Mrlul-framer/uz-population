# Oʻzbekiston Aholi Dinamikasi

Oʻzbekistonning 1991–2026 yillar oralig'idagi aholi oʻsishini vizual koʻrsatadigan analitika dashboard qilindi. Ilova statistika koʻrinishini, responsive line chart'ni, filtrlash mumkin boʻlgan jadvalni chizadi va dashboard'ni A4 PDF sifatida yoki asosiy ma'lumotlarni CSV qilib yuklab olish imkonyatini beradi.

## Texnologiyalar ishlatild

- **React 19 + TypeScript** — komponentlar arxitekturasi va type safety uchun
- **Vite** — build va dev server uchun
- **Tailwind CSS v4** — stillar, design token'lar `src/index.css` da yozilgan
- **Apache ECharts** (`echarts-for-react`) — aholi oʻsishi line chart'i uchun
- **Axios** — HTTP client, o'zimizning mock adapter bilan sozlangan (pastda tushuntirilgan)
- **jsPDF + html2canvas** — client tomonda PDF yaratish uchun
- **PapaParse** — CSV yaratish uchun

## Ishga tushirish

```bash
npm install
npm run dev
```


Boshqa scriptlar:

```bash
npm run build    
npm run preview  
npm run lint     
```

## Loyiha strukturasi

```
src/
  api/            axios instance + mock adapter, population API service
  components/     UI qismlari (chart, filterlar, cardlar, holatlar, jadval)
  context/        theme (dark/light) context
  data/           mock API uchun statik aholi dataseti
  hooks/          usePopulationData, useUrlFilterState
  types/          umumiy TypeScript type'lar
  utils/          PDF export, CSV export
```

## Mock API

Bu yerda real backend yoʻq. `src/api/client.ts` fayli Axios instance yaratadi, unda **maxsus adapter** bor — u so'rovlarni xuddi real HTTP call kabi ushlaydi, ~650ms tarmoq kechikishini simulyatsiya qiladi va `src/data/population.json` dagi lokal datasetni qaytaradi. `src/api/populationApi.ts` esa `fetchPopulation()` funksiyasini beradi, qolgan qismlar uni xuddi real `GET /api/population` endpoint'ni chaqirgandek chaqiradi — shu sababli kelajakda real backend ulash uchun faqat adapterni almashtirish kifoya, ilovaning boshqa kodiga tegish shart emas.

UI holatlarini test qilish uchun ikkita query param bor:

- `?simulateError=1` — so'rovni majburan reject qildiradi (error state'ni koʻrish uchun)
- `?simulateEmpty=1` — so'rovni bo'sh dataset bilan resolve qildiradi (empty state'ni koʻrish uchun)

### Ma'lumotlar manbasi

Aholi soni bo'yicha ma'lumotlar ochiq manbalardan — World Bank (`SP.POP.TOTL`), UN World Population Prospects (2024 Revision) va Macrotrends tarixiy seriyalaridan — yig'ilgan, ma'lum yillik nuqtalar orasida silliq va realistik egri chiziq hosil qilish uchun interpolatsiya qilingan. 2026-yil qiymati — bashorat. Malumotlar Demo sifatida yaradim — `source` maydonini `src/data/population.json` da joylashgan.

## PDF export, yukalab olihs

1. `html2canvas` yordamida statistika + chart qismi rasmga olinadi.
2. `jsPDF` bilan A4 hujjat quriladi: sarlavha ("Uzbekistan Population Dynamics"), tanlangan yillar oralig'i, rasmga olingan chart, asosiy ko'rsatkichlar jadvali (aholi soni, boshlang'ich aholi soni, umumiy o'sish, o'sish %) va yaratilgan vaqt.
3. Fayl `uzbekistan-population-1991-2026.pdf` nomi bilan saqlanadi.

Export har doim shu nom bilan saqlanadi, hozirgi tanlangan filtr oralig'idan qat'i nazar — bu topshiriq talabiga ko'ra shunday.

## Xususiyatlar

- Yillar bo'yicha aholi soni line chart'i (ECharts) — hover tooltip'lar, silliq egri chiziq va area fill bilan
- Stat card'lar: hozirgi aholi soni, boshlang'ich aholi soni, umumiy o'sish, o'sish %
- Oraliq filtrlash: uchta tayyor variant (1991-2026, 2000-2026, 2010-2026) + tekshiriladigan custom oraliq
- Loading (skeleton'lar), error (retry bilan) va empty holatlar
- Responsive dizayn — desktop va mobil uchun
- Dark / light rejim almashtirish (`localStorage`da saqlanadi)
- Qidiriladigan, yig'iladigan (collapsible) yil-boyicha jadval
- Filtrlangan oraliq uchun CSV export
- Filtr holati URL query string'da saqlanadi — shu sababli filtrlangan ko'rinishni ulashish/bookmark qilish mumkin

Tili ingliz tilda qilindi, code da kop joyiga English + Uzb so'zlar yozsam bir oz chalkashib ketaman, ammo bu faqat mening qulayligim uchun,Lekin Uzbek tilini (code syntaxistlaridan tashqari)  hamma yerga ishlata olaman) Muammo emas,

Md file dagi Imloviy Hatolarni inobatga olmimiz) SHoshilinchda Sayqallatirishga majbur bo'ldim,
Designi Yoqmili bo'lgan Web Page Tayyor
