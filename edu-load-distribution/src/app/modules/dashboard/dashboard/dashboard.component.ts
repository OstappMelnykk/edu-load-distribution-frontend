import { Component } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {IUser} from '../../../core/interfaces/user.interface';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {ITeacher} from '../../../core/interfaces/teacher.interface';
import {TeacherService} from '../../../core/services/teacher.service';
import {ITeacherWorkload} from '../../../core/interfaces/teacher-workload.interface';
import {WorkloadService} from '../../../core/services/workload.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
    imports: [
        CommonModule,
        FormsModule

    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    public currentUser: IUser = {
        id: " ",
        email: " ",
        password: " ",
        roles: [" "],
        teacherId: " ",
    };


    public currentTeacher: ITeacher = {
        id: " ",
        firstName: " ",
        lastName: " ",
        middleName: " ",
        degree: " ",
        position: " ",
        experience: 1,
    };


    public currentTeacherWorklods: ITeacherWorkload[] | undefined;

    constructor(
        private authService: AuthService,
        private teacherService: TeacherService,
        private workloadService: WorkloadService,
    ) {
    }

    ngOnInit(): void {


        this.authService.currentUser$.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.fetchTeacherDetails(this.currentUser.teacherId);
                this.fetchCurrentUserWorkloads();
            }
        });
    }

    deleteWorkload(workloadId: string) {
        if (confirm('Do you really want to delete this item?')) {
            this.workloadService.deleteWorkload(workloadId).subscribe({
                next: () => {
                    this.fetchCurrentUserWorkloads()
                },
                error: () => {
                    console.error('Error');
                },
            });
        }
    }



    private fetchTeacherDetails(userId: string): void {
        this.teacherService.getTeacher(userId).subscribe(
            teacher => {
                this.currentTeacher = teacher;
            },
            error => {
                console.error('Error fetching teacher details:', error);
            }
        );
    }

     private fetchCurrentUserWorkloads(): void {
         this.authService.getCurrentUserWorkloads().subscribe(
             userWorkload => {
                 this.currentTeacherWorklods = userWorkload;
             },
             error => {
                 console.error('Error fetching teacher details:', error);
             }

         )
     }
}
