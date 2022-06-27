import {FiFeather} from 'react-icons/fi'

export default {
  name: 'article',
  title: 'Article',
  icon: FiFeather,
  type: 'document',
  fields: [
    {
      name: 'count',
      type: 'number',
    },
    {
      name: 'market',
      type: 'string',
      readOnly: true,
      hidden: true,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      type: 'localizedString',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
    },
  },
}
