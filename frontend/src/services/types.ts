// TODO: Swap types to non-primitive where necessary
// TODO: Setup a shared type library. Types are redundantly defined on BE as well

export enum ApplicationStatus {
  COMPLETED = 'Complete',
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

export interface Attachment {
  category: string
  files: string[]
}

export interface ApplicationMetadata {
  id: string
  status: ApplicationStatus
  name: string
  email: string
  // May want to consider using date-string for this once schema finalised
  createdAt: string
  attachments?: Attachment[]
}

export interface MarkSubmissionRequestDto {
  emailParams?: {
    subject: string
    content: string
  }
  status: ApplicationStatus
}

export interface MarkSubmissionResponse {
  status: 'success'
  email?: string
}
