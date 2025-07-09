import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usuario!: string;
  senha!: string;

  router = inject(Router);

  logar() {
  const usuarioValido = /^[a-zA-Z0-9_]{3,20}$/.test(this.usuario);
  const senhaValida = this.senha && this.senha.length >= 5;

  if (!usuarioValido) {
    alert('Usuário inválido: use de 3 a 20 letras, números ou "_"');
    return;
  }

  if (!senhaValida) {
    alert('Senha inválida: mínimo 5 caracteres.');
    return;
  }

  // Simulação de login
  if (this.usuario === 'admin' && this.senha === 'admin') {
    this.router.navigate(['admin/carros']);
  } else {
    alert('Usuário ou senha incorretos!');
  }

  }
}
