/* eslint-disable no-console */
import sanityClient from 'part:@sanity/base/client'
import fetch from 'node-fetch'

const client = sanityClient.withConfig({apiVersion: `2021-05-19`})
const {faker} = require('@faker-js/faker')

const count = 40
const schema = `product`

async function run() {
  const data = []

  // Create twice as many names to try and get uniques
  for (let index = 0; index < count; index++) {
    data[index] = {
      _type: schema,
      title: {
        _type: `localizedString`,
        en: faker.commerce.productName(),
      },
      image: `https://picsum.photos/seed/${faker.datatype.uuid()}-${index}/600/400`,
      market: 'CA',
    }
  }

  // Remove existing documents
  await client.delete({query: `*[_type == "${schema}"]`})

  // Remove existing assets
  await client.delete({
    query: `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && count(*[references(^._id)]) < 1]`,
  })

  // Upload images and insert into docs
  const docs = []
  for (const doc of data) {
    await fetch(doc.image).then(async (res) => {
      const assetData = await res.buffer()
      const assetDoc = await client.assets.upload('image', assetData)

      doc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetDoc._id,
        },
      }
    })

    docs.push(doc)
  }

  console.log(docs)

  // Create new
  const transaction = client.transaction()

  docs.forEach((doc) => transaction.create(doc))

  transaction
    .commit()
    .then((transactionRes) => console.log(transactionRes))
    .catch((transactionErr) => console.error(transactionErr))
}

run()
