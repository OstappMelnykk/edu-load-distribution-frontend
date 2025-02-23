export interface ITeacherWorkload {
  id: string,
  teacherId: {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,
    degree: string,
    position: string,
    experience: number
  },
  subjectId: {
    id: string,
    name: string,
    lectureHours: number
    practiceHours: number
    totalHours: number
  },
  groupNumber: string,
  year: number,
}
