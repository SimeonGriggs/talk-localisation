import {FiShoppingBag} from 'react-icons/fi'

export default {
  name: 'product',
  title: 'Product',
  icon: FiShoppingBag,
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'localizedString',
    },
    {
      name: 'image',
      type: 'image',
    },
    {
      name: 'market',
      type: 'string',
      readOnly: true,
      hidden: true,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'market',
      media: 'image',
    },
  },
}
