export interface ITeacherWorkload {
  id: string,
  teacherId: {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,
    degree: string,
    position: string,
    experience: 0
  },
  subjectId: {
    id: string,
    name: string,
    hours: 0
  },
  groupNumber: string
}
