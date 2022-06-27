import {MARKETS, UNIQUE_LANGUAGES} from '../../constants'

export default {
  title: 'Localized string',
  name: 'localizedString',
  type: 'object',
  // fieldsets: [
  //   {
  //     title: 'Translations',
  //     name: 'translations',
  //     options: {collapsible: true, collapsed: false},
  //   },
  // ],
  fields: UNIQUE_LANGUAGES.map((lang, index) => ({
    title: lang,
    name: lang.replaceAll(`-`, `_`),
    type: 'string',
    // fieldset: !index ? null : 'translations',
    hidden: ({document: sanityDocument}) => {
      if (!sanityDocument.market) {
        return false
      }

      const marketLanguages = MARKETS.find(
        (market) => market.name === sanityDocument.market
      ).languages
      return !marketLanguages.includes(lang)
    },
  })),
}
