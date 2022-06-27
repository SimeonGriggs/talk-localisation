import defaultResolve from 'part:@sanity/base/document-actions'
import CopyToPublication from './CopyToPublication'

export default function resolveDocumentActions(props) {
  const defaultActions = defaultResolve(props)

  return [...defaultActions, CopyToPublication]
}
