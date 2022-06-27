import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import article from './documents/article'
import product from './documents/product'
import page from './documents/page'
import settings from './documents/settings'

import seo from './objects/seo'
import localizedString from './objects/localizedString'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([article, product, page, settings, localizedString, seo]),
})
