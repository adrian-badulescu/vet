import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-send-new-password',
  templateUrl: './send-new-password.component.html',
  styleUrls: ['./send-new-password.component.scss']
})
export class SendNewPasswordComponent implements OnInit, AfterViewInit {


  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;
  token = 0;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });

    this.token = (this.route.snapshot.paramMap.get('token') as unknown) as number;
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit(values: object) {
    this.success = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.resetForm.value);
    this.authService.createNewPass(this.token, values).subscribe((data)=>{
      this.success = 'Parola a fost resetata cu succes.';
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
