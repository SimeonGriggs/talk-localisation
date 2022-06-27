import React from 'react'
import {Flex, Label, Box, Text, Stack, Code, Card} from '@sanity/ui'
import {UserIcon, BookIcon} from '@sanity/icons'
import styled from 'styled-components'

import Flag from '../Flag'

const StyledCode = styled(Code)`
  --card-code-fg-color: var(--card-fg-color);
`

const schemas = [
  {
    key: 'presenterAfter',
    title: 'Presenter',
    icon: UserIcon,
    fields: [
      {name: 'name', type: 'string'},
      {name: 'title.en', type: 'string', market: 'en'},
      {name: 'title.nl', type: 'string', market: 'nl'},
      {name: 'title.no', type: 'string', market: 'no'},
      {name: 'photo', type: 'image'},
    ],
  },
  {
    key: 'presenterBefore',
    title: 'Presenter',
    icon: UserIcon,
    fields: [
      {name: 'name', type: 'string'},
      {name: 'title', type: 'string'},
      {name: 'photo', type: 'image'},
    ],
  },
  {
    key: 'lessonBefore',
    title: 'Lesson',
    icon: BookIcon,
    fields: [
      {name: 'title', type: 'string'},
      {name: 'summary', type: 'text'},
      {name: 'content', type: 'portableText'},
    ],
  },
  {
    key: 'lessonIntl',
    title: 'Lesson',
    icon: BookIcon,
    market: 'en',
    fields: [
      {name: 'title', type: 'string'},
      {name: 'summary', type: 'text'},
      {name: 'content', type: 'portableText'},
    ],
  },
  {
    key: 'lessonIntl',
    title: 'Lesson',
    icon: BookIcon,
    market: 'nl',
    fields: [
      {name: 'title', type: 'string'},
      {name: 'summary', type: 'text'},
      {name: 'content', type: 'portableText'},
    ],
  },
  {
    key: 'lessonIntl',
    title: 'Lesson',
    icon: BookIcon,
    market: 'no',
    fields: [
      {name: 'title', type: 'string'},
      {name: 'summary', type: 'text'},
      {name: 'content', type: 'portableText'},
    ],
  },
]

export default function SchemaDiagrams() {
  return (
    <Card
      style={{
        backgroundColor: `#121923`,
        position: `fixed`,
        width: `100vw`,
        height: `100vh`,
        zIndex: 100000,
        inset: 0,
      }}
    >
      <Flex gap={5} align="center" justify="center" style={{height: `100%`}}>
        {schemas
          .filter((schema) => schema.key.startsWith(`lessonIntl`))
          .map((schema) => (
            <Card
              key={schema.key}
              padding={3}
              paddingY={1}
              shadow={3}
              radius={4}
              style={{minWidth: 250}}
            >
              <Card padding={4} borderBottom>
                <Flex align="center" gap={3}>
                  <Text size={4}>
                    {React.createElement(schema.icon, {
                      style: {transform: `translateX(-6px)`},
                    })}
                  </Text>
                  <Box flex={1}>
                    <Text size={3} weight="semibold">
                      {schema.title}
                    </Text>
                  </Box>
                  {schema.market ? (
                    <Box>
                      <Flag market={schema.market} />
                    </Box>
                  ) : null}
                </Flex>
              </Card>
              {schema.fields.map((field, fieldIndex) => (
                <Card key={field.name} borderTop={fieldIndex > 0}>
                  <Flex align="center" gap={6} paddingX={3} paddingY={4} borderBottom={fieldIndex}>
                    <Box flex={1}>
                      <Flex align="center" gap={2}>
                        {field.market ? (
                          <Box>
                            <Flag market={field.market} />
                          </Box>
                        ) : null}
                        <Box flex={1}>
                          <StyledCode size={2}>{field.name}</StyledCode>
                        </Box>
                      </Flex>
                    </Box>
                    <Label muted>{field.type}</Label>
                  </Flex>
                </Card>
              ))}
            </Card>
          ))}
      </Flex>
    </Card>
  )
}
