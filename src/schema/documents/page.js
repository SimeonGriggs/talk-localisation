import {FiFile} from 'react-icons/fi'

export default {
  name: 'page',
  title: 'Page',
  icon: FiFile,
  type: 'document',
  fields: [
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
}
