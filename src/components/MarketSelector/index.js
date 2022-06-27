import React from 'react'
import {Stack, Label, Checkbox, Flex, Text, Box} from '@sanity/ui'
import {ChevronRightIcon, ChevronDownIcon} from '@sanity/icons'

import Flag from '../Flag'

const EXAMPLE_COUNTRIES = [
  {name: `Albania`, code: `al`},
  {name: `Algeria`, code: `dz-ar`},
  {name: `Algeria`, code: `dz-fr`},
  {name: `Andorra`, code: `ad`},
  {name: `Angola`, code: `ao-en`},
  {name: `Angola`, code: `ao-pt`},
  {name: `Antigua and Barbuda`, code: `ag`},
  {name: `Argentina`, code: `ar`},
  {name: `Australia`, code: `au`},
  {name: `Austria`, code: `at`},
  {name: `Azerbaijan`, code: `az-az`},
  {name: `Azerbaijan`, code: `az-en`},
]

export default function MarketSelector() {
  return (
    <Stack space={4}>
      <Label>Display in Markets</Label>
      <Flex align="center" gap={2}>
        <Text size={5}>
          <ChevronRightIcon />
        </Text>
        <Checkbox />
        <Text>All Markets</Text>
      </Flex>
      <Flex align="center" gap={2}>
        <Text size={5}>
          <ChevronRightIcon />
        </Text>
        <Checkbox />
        <Text>By Language</Text>
      </Flex>
      <Flex align="center" gap={2}>
        <Text size={5}>
          <ChevronDownIcon />
        </Text>
        <Checkbox />
        <Text>By Plan</Text>
      </Flex>
      <Flex align="center" gap={2} paddingLeft={4}>
        <Text size={5}>
          <ChevronRightIcon />
        </Text>
        <Checkbox />
        <Text>Family Plan Markets</Text>
      </Flex>
      <Flex align="center" gap={2} paddingLeft={4}>
        <Text size={5}>
          <ChevronDownIcon />
        </Text>
        <Checkbox />
        <Text>Premium Plan Markets</Text>
      </Flex>
      {EXAMPLE_COUNTRIES.map((country) => (
        <Flex key={`${country.name}-${country.code}`} align="center" gap={3} paddingLeft={6}>
          <Checkbox />
          <Box>
            <Flag market={country.code} />
          </Box>
          <Box flex={1}>
            <Text>
              {country.name} ({country.code})
            </Text>
          </Box>
        </Flex>
      ))}
    </Stack>
  )
}
