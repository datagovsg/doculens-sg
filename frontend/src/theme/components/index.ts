import { components as OGPComponents } from '@opengovsg/design-system-react/build/theme/components'

import { Card } from './Card'
import { navbar } from './navbar'
import { Table } from './Table'
import { Tile } from './Tile'

// Extend OGP Design System Component here

export const components = {
  ...OGPComponents,
  ...navbar,
  Card,
  Tile,
  Table,
}
