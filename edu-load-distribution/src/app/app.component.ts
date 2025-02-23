import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {AuthService} from './core/services/auth.service';
import {Observable, Subscription} from 'rxjs';
import {CommonModule, NgIf} from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent, CommonModule],
    templateUrl: 'app.component.html',
    styleUrl: 'app.component.scss'
})
export class AppComponent {
    title = 'edu-load-distribution';
    isAuthenticated: boolean = false;
    private authStatusSub!: Subscription;

    constructor(private authService: AuthService,) {
        this.isAuthenticated = authService.isAuthenticated()
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.isAuthenticated = isAuthenticated;
        });
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}
