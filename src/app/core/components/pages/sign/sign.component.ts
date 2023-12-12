import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Servico
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss',
})
export class SignComponent {
  // Variaveis do componente
  protected formLogin!: FormGroup;
  protected msgError!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.formLogin = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
    this.msgError = '';
  }

  protected submitLogin() {
    if (this.formLogin.valid) {
      this.authService
        .sign({
          email: this.formLogin.value['email'],
          password: this.formLogin.value['password'],
        })
        .subscribe({
          next: (res) => res,
          error: (err) => ((this.msgError = err)),
        });
      this.formLogin.reset();
    }
  }
}
