import T from '@sanity/base/initial-value-template-builder'

import {SCHEMAS} from '../constants'

const defaultTemplatesWithoutArticle = T.defaults().filter(
  (item) => !SCHEMAS.includes(item.spec.id)
)

export default [
  ...SCHEMAS.map((schemaType) =>
    T.template({
      id: schemaType,
      title: 'Article',
      schemaType,
      parameters: [{name: `market`, title: `Market`, type: `string`}],
      value: ({market}) => ({
        market,
      }),
    })
  ),
  ...defaultTemplatesWithoutArticle,
]
