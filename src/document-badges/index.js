import React from 'react'
import defaultResolve from 'part:@sanity/base/document-badges'
import schema from 'part:@sanity/base/schema'
import {MARKETS} from '../constants'

function MarketBadge(props) {
  const {draft, published, type} = props
  const sanityDocument = draft || published

  if (!sanityDocument?.market) {
    return null
  }

  const marketTitle = MARKETS.find((market) => market.name === sanityDocument.market)?.title ?? sanityDocument.market
  const schemaTitle = schema.get(type).title

  return {
    label: sanityDocument.market,
    title: (
      <>
        <strong>{schemaTitle}</strong> Document for the <strong>{marketTitle}</strong> Market
      </>
    ),
    color: 'success',
  }
}

export default function resolveDocumentBadges(props) {
  return [...defaultResolve(props), MarketBadge]
}
