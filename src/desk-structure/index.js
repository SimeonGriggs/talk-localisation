import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import schema from 'part:@sanity/base/schema'
import pluralize from 'pluralize'
import userStore from 'part:@sanity/base/user'
import {map} from 'rxjs/operators'

import Flag from '../components/Flag/index'
import {
  MARKETS,
  SCHEMAS,
  PUBLICATIONS,
  UNIQUE_LANGUAGES,
  SHOW_GLOBAL,
  SHOW_PUBLICATIONS,
} from '../constants'

import '../styles/hacks.css?raw'

const schemaItem = (market, schemaType) =>
  S.listItem()
    .id(`${market.name}-${schemaType}`)
    .title(`${pluralize.plural(schema.get(schemaType).title)}`)
    .schemaType(schemaType)
    .child(
      S.documentTypeList(schemaType)
        .title(`${market.title} ${pluralize.plural(schema.get(schemaType).title)}`)
        .filter(`_type == $schemaType && market == $market`)
        .params({schemaType, market: market.name})
        .initialValueTemplates([
          S.initialValueTemplateItem(schemaType, {
            market: market.name,
          }),
        ])
    )

const allSchemaItems = (market) => SCHEMAS.map((schemaType) => schemaItem(market, schemaType))

const marketItem = (market) =>
  S.listItem(market.name)
    .id(`${market.name}-` + `market`)
    .title(market.title)
    .icon(() => <Flag market={market.name} />)
    .child(S.list().title(`${market.title} Market Content`).items(allSchemaItems(market)))

const displayedMarkets = SHOW_PUBLICATIONS ? PUBLICATIONS : MARKETS
const allMarketItems = displayedMarkets.map((market) => marketItem(market))

export default () =>
  userStore.me.pipe(
    map((user) => {
      // User may have Role name like `CA-Editor`
      const userMarketRole = user.roles
        .map((role) => role.name.split(`-`))
        .filter((name) => name.length > 1)
        .map((name) => name[0])

      const userMarket = userMarketRole.length
        ? MARKETS.find((market) => market.name === userMarketRole[0].toUpperCase())
        : {}

      const title = userMarket?.name ? `${user.name} (${userMarket.name}) Content` : `Admin Content`

      const items = userMarket?.name
        ? allSchemaItems(userMarket)
        : SHOW_GLOBAL
        ? [
            ...allMarketItems,
            S.divider(),
            S.listItem()
              .title('Global Content')
              .icon(() => <Flag market="global" />),
            ...allSchemaItems({
              name: 'global',
              title: 'Global',
              languages: UNIQUE_LANGUAGES,
            }),
          ]
        : allMarketItems

      return S.list().title(title).items(items)
    })
  )
