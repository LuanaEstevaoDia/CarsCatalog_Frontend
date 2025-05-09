import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { Make } from '../../../models/make';
import { MakeService } from '../../../services/make.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-makelist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MdbFormsModule],
  templateUrl: './makelist.component.html',
  styleUrl: './makelist.component.scss'
})
export class MakelistComponent {
  list: Make[] = [];
    makeEdit : Make = new Make("", "");
    @Input("hideBottons") hideBottons : boolean = false;
    @Output() return = new EventEmitter<Make>();//evento para enviar a marca selecionada
    
    makeService = inject(MakeService); 
    router = inject(Router)
    makeForm: FormGroup;
    
    constructor(private fb: FormBuilder) {
  
  
      this.makeForm = this.fb.group({
        id: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        cnpj: new FormControl('',Validators.required)
       
        
    });
      this.getAllMakes();
      let makeNew = history.state.makeNew;
      let makeEdit = history.state.makeEdit;
      if (makeNew != null) {
        this.list.push(makeNew);
      }
      if (makeEdit!= null) {
        let indice = this.list.findIndex((x) => {
          return x.id == makeEdit.id;
        });
        this.list[indice] = makeEdit;
      }
    }
  
    getAllMakes() {
      this.makeService.getAllMakes().subscribe({
        next: list => { // quando o back retorna o que se espera, igual try
          this.list = list;
        },
        error: err => { // quando há uma exceção igual catch (badRequest, exception, etc)
          Swal.fire({
            title: 'Ocorreu um erro.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  
    deleteById(make: Make) {
      console.log("Chegou aqui");
      Swal.fire({
        title: 'Tem certeza que deseja deletar esse registro?',
        icon: 'warning',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
      }).then((result) => {
        if (result.isConfirmed) {
          this.makeService.deleteMake(make.id).subscribe({
            next:(response) => {//quando o back retornar o que espera
              const responseObject = JSON.parse(response);
              Swal.fire({
                title: responseObject.message,
                icon:  responseObject.deleted ? 'success' : 'error',
                confirmButtonText: 'Ok',
              });
              this.getAllMakes();
            },
             
            error: (err) => {//quando ocorrer qualquer erro
              Swal.fire({
                title: 'Erro ao deletar a marca.',
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            },
          });
        }
      });
    }
  
    new() {
      this.router.navigate(['admin/marcas/new'])
    }
  
    edit(make: Make, id: number) {
   
      this.router.navigate([`admin/marcas/edit/${id}`]);
    } 

    select(make:Make){
      this.return.emit(make);




















    }
    resetForm(){
      this.makeForm.reset();
    } 

}
