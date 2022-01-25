// TODO: Swap types to non-primitive where necessary

enum ApplicationStatus {
  COMPLETED = 'Completed',
  INCOMPLETE = 'Incomplete',
  SUBMITTED = 'Submitted',
}

export interface Form {
  id: string
  isActive: boolean
  description: string
  title: string
  // May want to consider using date-string for this once schema finalised
  createdAt: string
  updatedAt: string
}

export interface ApplicationMetadata {
  id: string
  status: ApplicationStatus
  name: string
  // May want to consider using date-string for this once schema finalised
  createdAt: string
}
