export const SHOW_GLOBAL = true
export const SHOW_PUBLICATIONS = false

export const MARKETS = [
  {
    name: `DE`,
    title: `Germany`,
    languages: [`de`, `en`],
  },
  {
    name: `US`,
    title: `USA`,
    languages: [`en`],
  },
  {
    name: `CA`,
    title: `Canada`,
    languages: [`en`, `fr-ca`],
  },
]

export const PUBLICATIONS = [
  {
    name: `IN`,
    title: `India`,
    languages: [`en-IN`],
  },
  {
    name: `BE`,
    title: `Belgium`,
    // title: `Belgium - Dutch (Belgium)`,
    languages: [`nl-BE`],
  },
  // {
  //   name: `BE`,
  //   title: `Belgium`,
  // title: `Belgium - French (Belgium)`,
  //   languages: [`fr-BE`]
  // },
  {
    name: `CA`,
    title: `Canada`,
    // title: `Canada - English (Candada)`,
    languages: [`en-CA`],
  },
  // {
  //   name: `canadaFrench`,
  //   title: `Canada`,
  // title: `Canada - French (Candada)`,
  //   languages: [`fr-CA`]
  // },
  {
    name: `ID`,
    title: `Indonesia`,
    // title: `Indonesia - Indionesian`,
    languages: [`id-ID`],
  },
  {
    name: `IL`,
    title: `Israel`,
    // title: `Israel - Hebrew`,
    languages: [`he-IL`],
  },
  {
    name: `JP`,
    title: `Japan`,
    // title: `Japan - Japanese`,
    languages: [`ja-JP`],
  },
  {
    name: `KR`,
    title: `South Korea`,
    // title: `Korea - Korean (South Korea)`,
    languages: [`ko-KR`],
  },
  // {
  //   name: `globalEnglish`,
  //   title: `Global`,
  // title: `Global - English`,
  //   languages: [`en-GB`]
  // },
  {
    name: `AU`,
    title: `Australia`,
    // title: `Australia - English (Australia)`,
    languages: [`en-AU`],
  },
  {
    name: `BR`,
    title: `Brazil`,
    // title: `Brazil - Portugese`,
    languages: [`pt-BR`],
  },
  {
    name: `CN`,
    title: `China`,
    // title: `China - Chinese`,
    languages: [`zh-CN`],
  },
  {
    name: `HK`,
    title: `Hong Kong`,
    // title: `Hong Kong - Chinese (Hong Kong)`,
    languages: [`zh-HK`],
  },
  {
    name: `LK`,
    title: `Sri Lanka`,
    // title: `Sri Lanka - English`,
    languages: [`zh-LK`],
  },
  {
    name: `MY`,
    title: `Malaysia`,
    // title: `Malaysia - English`,
    languages: [`en-GB`],
  },
  {
    name: `NP`,
    title: `Nepal`,
    // title: `Nepal - English`,
    languages: [`en-GB`],
  },
  {
    name: `PH`,
    title: `Philippines`,
    // title: `Philippines - English`,
    languages: [`en-PH`],
  },
  {
    name: `SG`,
    title: `Singapore`,
    // title: `Singapore - English`,
    languages: [`en-GB`],
  },
]

export const UNIQUE_LANGUAGES = Array.from(
  new Set(
    [...(SHOW_PUBLICATIONS ? PUBLICATIONS : MARKETS)].map((market) => market.languages).flat()
  )
)

export const SCHEMAS = [`article`, `product`, `page`, `settings`]
