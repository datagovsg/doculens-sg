// TODO: Swap types to non-primitive where necessary

interface Form {
  id: string
  isActive: boolean
  description: string
  title: string
  // May want to consider using date-string for this once schema finalised
  createdAt: string
  updatedAt: string
}
