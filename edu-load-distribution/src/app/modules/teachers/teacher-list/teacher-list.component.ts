import { Component } from '@angular/core';
import {TeacherService} from '../../../core/services/teacher.service';
import {ITeacher} from '../../../core/interfaces/teacher.interface';
import {NgForOf} from '@angular/common';
import {ITeacherWorkload} from '../../../core/interfaces/teacher-workload.interface';
import {WorkloadService} from '../../../core/services/workload.service';

@Component({
  selector: 'app-teacher-list',
    imports: [
        NgForOf
    ],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.scss'
})
export class TeacherListComponent {
    teachers: ITeacher[] = [];
    errorMessage: string = '';

    isViewDetaildClicked: boolean = false;
    TeacherIdToView: string = '';
    teacherWorkloads: ITeacherWorkload[] = []

    constructor(private teacherService: TeacherService, private workloadService: WorkloadService) {}

    ngOnInit(): void {
        this.loadTeachers();
    }



    deleteWorkload(workloadId: string, teacherId: string){
        if (confirm('Do you really want to delete this item?')) {
            this.workloadService.deleteWorkload(workloadId).subscribe({
                next: () => {
                    this.loadTeachers()
                    this.isViewDetaildClicked = !this.isViewDetaildClicked
                    this.viewDetails(teacherId)


                },
                error: () => {
                    this.errorMessage = 'Failed to delete the item';
                },
            });
        }
    }


    viewDetails(id: string): void {
        if (this.TeacherIdToView === id) {
            this.isViewDetaildClicked = !this.isViewDetaildClicked;
            if (!this.isViewDetaildClicked) return;
        }

        this.teacherService.getTeacherWorkloads(id).subscribe({
            next: (teacherWorkloads: ITeacherWorkload[]) => {
                this.teacherWorkloads = teacherWorkloads;
                this.isViewDetaildClicked = true;
                this.TeacherIdToView = id
            },
            error: () => {
                this.errorMessage = 'Failed to retrieve the item\n';
            },
        });
    }


    loadTeachers(): void {
        this.teacherService.getTeachers().subscribe({
            next: (data) => {
                this.teachers = data;
            },
            error: () => {
                this.errorMessage = 'Teacher not found';
            }
        });
    }
}
