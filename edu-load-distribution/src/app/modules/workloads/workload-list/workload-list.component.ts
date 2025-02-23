import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ITeacher} from '../../../core/interfaces/teacher.interface';
import {ITeacherWorkload} from '../../../core/interfaces/teacher-workload.interface';
import {TeacherService} from '../../../core/services/teacher.service';
import {ISubject} from '../../../core/interfaces/subject.interface';
import {IWorkload} from '../../../core/interfaces/workload.interface';
import {FormsModule} from '@angular/forms';
import {IUser} from '../../../core/interfaces/user.interface';
import {AuthService} from '../../../core/services/auth.service';
import {SubjectService} from '../../../core/services/subject.service';
import {WorkloadService} from '../../../core/services/workload.service';
import {IWorkloadCreateDTO} from '../../../core/interfaces/DTOs/workload-create-DTO.interface';

@Component({
  selector: 'app-workload-list',
    imports: [
        NgForOf,
        FormsModule,
        NgIf
    ],
  templateUrl: './workload-list.component.html',
  styleUrl: './workload-list.component.scss'
})
export class WorkloadListComponent {
    teachers: ITeacher[] = [];
    errorMessage: string = '';
    teachersWorkloads: ITeacherWorkload[] = []
    iAsddWorkloadClicked = false;
    newWorkload: IWorkload = { id: '', teacherId: '', subjectId: '', groupNumber: '', year: new Date().getFullYear() };

    availableSubjects: string[] = [];
    unavailableSubjects: string[] = [];
    allSubjects: string[] = [];

    public currentUser: IUser = {
        id: " ",
        email: " ",
        password: " ",
        roles: [" "],
        teacherId: " ",
    };



    constructor(private teacherService: TeacherService,
                private authService: AuthService,
                private workloadService: WorkloadService,
                private subjectService: SubjectService,) {}

    ngOnInit(): void {
        this.loadCurrentUser()
        this.loaduUavailableSubjects()
        this.loadAllSubjects()
        this.loadAvaibleSubjects()
        this.loadTeachersWorkloads()
        console.log(this.currentUser)
        console.log(this.availableSubjects)
        console.log(this.unavailableSubjects)
        console.log(this.allSubjects)
    }




    loadCurrentUser(): void {
        this.authService.currentUser$.subscribe(user => {
            if (user) {
                console.log()
                this.currentUser = user;
            }
        });
    }
    loaduUavailableSubjects(): void {
        this.workloadService.getWorkloads().subscribe(
            {
                next: (workloads: IWorkload[]) => {
                    this.unavailableSubjects = workloads.map(workload => workload.subjectId);
                },
                error: () => {
                    this.errorMessage = '"Failed to retrieve the subjec';
                }
            }
        )
    }
    loadAllSubjects(): void {
        this.subjectService.getSubjects().subscribe(
            {
                next: (subjects: ISubject[]) => {
                    this.allSubjects = subjects.map(subject => subject.id);
                },
                error: () => {
                    this.errorMessage = 'Failed to get the subjec';
                }
            }
        )
    }
    loadAvaibleSubjects(): void {
        this.availableSubjects = this.allSubjects.filter(subject =>
            !this.unavailableSubjects.includes(subject)
        );
    }
    loadTeachersWorkloads(): void {
        this.teacherService.getTeachers().subscribe({
            next: (data) => {
                this.teachers = data;
                for (let teacher of this.teachers) {
                    this.teacherService.getTeacherWorkloads(teacher.id).subscribe({
                        next: (teacherWorkloads: ITeacherWorkload[]) => {
                            this.teachersWorkloads.push(...teacherWorkloads);
                        },
                        error: () => {
                            this.errorMessage = 'Failed to retrieve the subjec';
                        }
                    })
                }
            },
            error: () => {
                this.errorMessage = 'Failed to load subjects';
            },
        });
    }


    addWorkload(){
        this.iAsddWorkloadClicked = true
        this.loaduUavailableSubjects()
        this.loadAllSubjects()
        this.loadAvaibleSubjects()
    }

    saveWorkload(){
        if (this.newWorkload) {
            const workloadCreateDTO: IWorkloadCreateDTO = {
                teacherId: this.newWorkload.teacherId,
                subjectId: this.newWorkload.subjectId,
                groupNumber: this.newWorkload.groupNumber,
                year: this.newWorkload.year,
            }

            console.log(workloadCreateDTO)
            this.workloadService.createWorkload(workloadCreateDTO).subscribe({
                next: () => {
                    this.iAsddWorkloadClicked = false
                    this.teachersWorkloads = []
                    this.loadTeachersWorkloads()
                    this.loaduUavailableSubjects()
                    this.loadAllSubjects()
                    this.loadAvaibleSubjects()

                },
                error: () => {
                    this.errorMessage = 'Failed to save the subject';
                },
            });
        }
    }
}
