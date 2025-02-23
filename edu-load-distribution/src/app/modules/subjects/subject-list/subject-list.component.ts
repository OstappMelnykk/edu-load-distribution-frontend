import {Component} from '@angular/core';
import {ISubject} from '../../../core/interfaces/subject.interface';
import {SubjectService} from '../../../core/services/subject.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ISubjectUpdateDTO} from '../../../core/interfaces/DTOs/subject-update-DTO.interface';
import {ISubjectCreateDTO} from '../../../core/interfaces/DTOs/subject-create-DTO.interface';

@Component({
    selector: 'app-subject-list',
    imports: [
        NgForOf,
        ReactiveFormsModule,
        FormsModule,
    ],
    templateUrl: './subject-list.component.html',
    styleUrl: './subject-list.component.scss'
})
export class SubjectListComponent {
    subjects: ISubject[] = [];
    errorMessage: string = '';

    isAddSubjectClicked = false
    isEditSubjectClicked = false
    SubjectIdToEdit: string = '';

    subject: ISubject = { id: '', name: '', lectureHours: 0, practiceHours: 0, totalHours: 0 };
    newSubject: ISubject = { id: '', name: '', lectureHours: 0, practiceHours: 0, totalHours: 0 };

    constructor(
        private subjectService: SubjectService,
    ) {}

    ngOnInit(): void {
        this.loadSubjects();
    }


    editSubject(id: string): void {


        if (this.SubjectIdToEdit === id) {
            this.isEditSubjectClicked = !this.isEditSubjectClicked;
            if (!this.isEditSubjectClicked) return;
        }

        this.subjectService.getSubject(id).subscribe({
            next: (subject) => {
                this.subject = subject;
                this.isEditSubjectClicked = true;
                this.SubjectIdToEdit = id
            },
            error: () => {
                this.errorMessage = 'Failed to retrieve the item\n';
            },
        });


    }

    addSubject(){
        this.isAddSubjectClicked = true
    }

    saveNewSubject(){
        if (this.subject) {
            const subjectCreateDTO: ISubjectCreateDTO = {
                name: this.newSubject.name,
                lectureHours: this.newSubject.lectureHours,
                practiceHours: this.newSubject.practiceHours,
            }
            this.subjectService.createSubject(subjectCreateDTO).subscribe({
                next: () => {
                    this.loadSubjects()
                    this.isAddSubjectClicked = false
                },
                error: () => {
                    this.errorMessage = 'Failed to save the item';
                },
            });
        }
    }

    toggleAdding(){
        this.isAddSubjectClicked = false;
    }



    saveSubject(){
        if (this.subject) {
            const subjectUpdateDTO: ISubjectUpdateDTO = {
                name: this.subject.name,
                lectureHours: this.subject.lectureHours,
                practiceHours: this.subject.practiceHours,
            }
            this.subjectService.updateSubject(this.subject.id, subjectUpdateDTO).subscribe({
                next: () => {
                    this.loadSubjects()
                },
                error: () => {
                    this.errorMessage = 'Failed to save the item';
                },
            });
        }
    }

    toggleEdit(){
        this.isEditSubjectClicked = false;
    }


    deleteSubject(id: string): void {
        if (confirm('Do you really want to delete this item?')) {
            this.subjectService.deleteSubject(id).subscribe({
                next: () => this.loadSubjects(),
                error: () => {
                    this.errorMessage = 'Failed to delete the item';
                },
            });
        }
    }

    loadSubjects(): void {
        this.subjectService.getSubjects().subscribe({
            next: (data) => {
                this.subjects = data;
            },
            error: () => {
                this.errorMessage = 'Failed to load the items';
            },
        });
    }

}
