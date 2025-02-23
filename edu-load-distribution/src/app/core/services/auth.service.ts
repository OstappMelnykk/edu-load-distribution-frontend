import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {IUser} from '../interfaces/user.interface';
import {ITeacherWorkload} from '../interfaces/teacher-workload.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiBaseUrl}/auth`;
    private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
    private currentUserSubject = new BehaviorSubject<IUser | null>(null);


    constructor(private http: HttpClient, private router: Router) {
    }

    login(credentials: { email: string, password: string }) {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials)
            .pipe(
                catchError(error => {
                    if (error.status === 400) {
                        console.error('Invalid email or password');
                        this.authStatus.next(false);
                        return of(null);
                    }
                    if (error.status === 500) {
                        console.error('Internal server error');
                        this.authStatus.next(false);
                        return of(null);
                    }
                    console.error('Login failed:', error);
                    this.authStatus.next(false);
                    return of(null);
                })
            )
            .subscribe(response => {
                if (response && response.token) {
                    localStorage.setItem('token', response.token);
                    this.authStatus.next(true);
                    console.log("logged succesfully")
                    this.getCurrentUser()
                    this.router.navigate(['/dashboard']);
                } else {
                    this.authStatus.next(false);
                    console.error('Authorization failed');
                }
            });
    }

    logout() {
        localStorage.removeItem('token');
        this.authStatus.next(false);
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }


    register(userData: {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        middleName: string,
        degree: string,
        position: string,
        experience: number
    }) {
        return this.http.post<{ message: string }>(`${this.apiUrl}/registration`, userData)
            .pipe(
                catchError(error => {
                    if (error.status === 400) {
                        console.error('Invalid input or user already exists');
                        return of(null);
                    }
                    if (error.status === 500) {
                        console.error('Internal server error');
                        return of(null);
                    }
                    console.error('Registration failed:', error);
                    return of(null);
                })
            )
            .subscribe(response => {
                if (response) {
                    console.log('Registration successful');
                    this.login({email: userData.email, password: userData.password});
                } else {
                    console.error('Registration failed');
                }
            });
    }


    getCurrentUser(): void {
        const token = this.getToken();
        if (!token) {
            console.error('No token found');
            this.currentUserSubject.next(null);
            return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http.get<{ user: IUser }>(`${this.apiUrl}/me`, {headers})
            .pipe(
                map(response => response.user),
                catchError(error => {
                    console.error('Failed to fetch user:', error);
                    this.currentUserSubject.next(null);
                    return of(null);
                })
            )
            .subscribe(user => {
                this.currentUserSubject.next(user);
            });
    }


    getCurrentUserWorkloads(): Observable<ITeacherWorkload[]> {
        return this.http.get<ITeacherWorkload[]>(`${this.apiUrl}/me/workloads`);
    }

    get currentUser$(): Observable<IUser | null> {
        return this.currentUserSubject.asObservable();
    }

    getAuthStatusListener() {
        return this.authStatus.asObservable();
    }

}
