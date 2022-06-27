import {FiSettings} from 'react-icons/fi'

export default {
  name: 'settings',
  title: 'Settings',
  icon: FiSettings,
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
