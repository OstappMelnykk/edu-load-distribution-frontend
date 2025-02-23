import { Component } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {IUser} from '../../../core/interfaces/user.interface';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {ITeacher} from '../../../core/interfaces/teacher.interface';
import {TeacherService} from '../../../core/services/teacher.service';
import {ITeacherWorkload} from '../../../core/interfaces/teacher-workload.interface';

@Component({
  selector: 'app-dashboard',
    imports: [
        NgIf,
        NgForOf,
        JsonPipe
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    public currentUser!: IUser;
    public currentTeacher: ITeacher | undefined;
    public currentTeacherWorklods: ITeacherWorkload[] | undefined;

    constructor(
        private authService: AuthService,
        private teacherService: TeacherService
    ) {}

    ngOnInit(): void {


        this.authService.currentUser$.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.fetchTeacherDetails(this.currentUser.teacherId);
                this.fetchCurrentUserWorkloads();
            }
        });
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
