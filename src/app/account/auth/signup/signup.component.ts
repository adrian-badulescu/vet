import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../../core/services/auth.service";
import {first} from "rxjs/operators";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

    signupForm: FormGroup;
    submitted = false;
    error = '';
    loading = false;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) {
    }

    ngOnInit() {

        this.signupForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    ngAfterViewInit() {
        document.body.classList.add('authentication-bg');
        document.body.classList.add('authentication-bg-pattern');
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.signupForm.controls;
    }

    /**
     * On submit form
     */
    onSubmit(values: object) {
        this.submitted = true;

        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;

        this.authService.signUp(values)
            .subscribe(
                data => {
                    this.router.navigate(['/account/confirm']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
        // setTimeout(() => {
        //   this.loading = false;
        //   this.router.navigate(['/account/confirm']);
        // }, 1000);
    }
}
