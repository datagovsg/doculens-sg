import { IconType } from 'react-icons'
import { Tile } from '@opengovsg/design-system-react'

interface TileProps {
  title: string
  description: string
  icon: IconType
}

const ClickableTile = ({
  title,
  description,
  icon,
}: TileProps): JSX.Element => {
  return (
    <div>
      <Tile icon={icon} variant="simple">
        <Tile.Title>{title}</Tile.Title>
        <Tile.Subtitle>{description}</Tile.Subtitle>
      </Tile>
    </div>
  )
}

export default ClickableTile
