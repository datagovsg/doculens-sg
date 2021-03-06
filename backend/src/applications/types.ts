export enum ApplicationStatus {
  COMPLETED = 'Complete',
  INCOMPLETE = 'Incomplete',
  SUBMITTED = 'Submitted',
}

export type UpdatableStatus = Omit<ApplicationStatus, 'Submitted'>

export interface MarkSubmissionRequestDto {
  emailParams?: {
    subject: string
    content: string
  }
  status: UpdatableStatus
}

export interface MarkSubmissionResponse {
  status: 'success'
  email?: string
}
