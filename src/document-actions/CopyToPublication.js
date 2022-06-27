/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, {useState, useCallback, useMemo} from 'react'
import {SearchIcon, ArrowRightIcon} from '@sanity/icons'
import {useToast, Text, Flex, Box, Button, Autocomplete, Label, Stack} from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client'

export const MARKETS = [
  {
    name: `DE`,
    title: `Germany`,
    languages: [`de`, `en`],
  },
  {
    name: `US`,
    title: `USA`,
    languages: [`en`],
  },
  {
    name: `CA`,
    title: `Canada`,
    languages: [`en`, `fr-ca`],
  },
]

// import Flag from '../components/Flag'

const client = sanityClient.withConfig({apiVersion: `2021-05-19`})

function getMarketTitle(marketName) {
  return MARKETS.find((market) => market.name === marketName)?.title ?? marketName
}

function Item({value, payload, market}) {
  return (
    <Stack>
      <Button mode="bleed" padding={0}>
        <Flex align="center" gap={3} padding={3}>
          {/* <Box>
            <Flag market={payload.name} />
          </Box> */}
          <Box flex={1}>
            <Text muted={market === value}>{payload.title}</Text>
          </Box>
          <Box>
            <Label muted>{payload.languages.join(', ')}</Label>
          </Box>
        </Flex>
      </Button>
    </Stack>
  )
}

export default function CopyToPublication(props) {
  const toast = useToast()

  const {published, draft} = props
  const sanityDocument = useMemo(() => draft || published, [draft, published])

  const [dialogOpen, setDialogOpen] = useState(true)
  const [selectedMarket, setSelectedMarket] = useState(``)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleChange = useCallback((value) => {
    setSelectedMarket(value)
  }, [])

  // Create the cloned document with updated market field
  const handleCopy = useCallback(() => {
    setIsUpdating(true)
    const newDocument = {...sanityDocument, market: selectedMarket}
    delete newDocument._id

    client
      .create(newDocument)
      .then((res) => {
        toast.push({
          title: `Copied document to ${getMarketTitle(res.market)}`,
          status: `success`,
        })
        setIsUpdating(false)
        setDialogOpen(false)
      })
      .catch((err) => {
        toast.push({
          title: `Could not copy document, see console for details`,
          status: `error`,
        })
        console.error(err)
        setIsUpdating(false)
      })
  }, [sanityDocument, selectedMarket])

  const dialogHeader = [
    `Copy document from`,
    getMarketTitle(sanityDocument?.market),
    selectedMarket ? `to ${getMarketTitle(selectedMarket)}` : `Market`,
  ].join(` `)

  return {
    label: 'Copy to Market',
    onHandle: () => {
      setDialogOpen(true)
    },
    dialog: dialogOpen && {
      type: 'modal',
      onClose: () => {
        setDialogOpen(false)
      },
      header: dialogHeader,
      content: (
        <Stack>
          <Flex gap={3} padding={3}>
            <Box flex={1}>
              <Box>
                <Autocomplete
                  disabled={isUpdating}
                  icon={SearchIcon}
                  onChange={handleChange}
                  fontSize={[2, 2, 3]}
                  id="autocomplete-example"
                  placeholder="Search publications"
                  options={MARKETS.filter(
                    (item) => sanityDocument?.market && item.name !== sanityDocument.market
                  ).map((item) => ({
                    value: item.name,
                    payload: item,
                  }))}
                  openButton
                  value={selectedMarket}
                  renderOption={({value, payload}) => (
                    <Item value={value} payload={payload} market={sanityDocument?.market} />
                  )}
                  renderValue={(value, option) => getMarketTitle(option?.payload.name || value)}
                />
              </Box>
            </Box>
            <Button
              disabled={!selectedMarket || isUpdating}
              tone="positive"
              onClick={handleCopy}
              text="Copy"
            />
          </Flex>
        </Stack>
      ),
    },
    icon: ArrowRightIcon,
  }
}
