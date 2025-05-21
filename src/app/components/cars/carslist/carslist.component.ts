import { Component, inject } from '@angular/core';
import { Car } from '../../../models/car';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CarService } from '../../../services/car.service';
import { Make } from '../../../models/make';


@Component({
  selector: 'app-carslist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MdbFormsModule],
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.scss'],
  

})
export class CarslistComponent {
  list: Car[] = [];
  carEdit : Car = new Car("", 0, "", 0, new Make("", ""));
  carService = inject(CarService); 
  router = inject(Router)
  carForm: FormGroup;
  
  
  constructor(private fb: FormBuilder) {


    this.carForm = this.fb.group({
      id: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      years: new FormControl('',Validators.required),
      chassi: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required)
  });
    this.getAllCars();
    let carNew = history.state.carNew;
    let carEdit = history.state.carEdit;
    
    if (carNew != null) {
      this.list.push(carNew);
      
    }
    if (carEdit != null) {
      let indice = this.list.findIndex((x) => {
        return x.id == carEdit.id;
      });
      this.list[indice] = carEdit;
    }
  }

  getAllCars() {
    console.log("Listagem de carros!")
    this.carService.getAllCars().subscribe({
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

  deleteById(car: Car) {
    console.log("Acesso no método de deletar");
    Swal.fire({
      title: 'Tem certeza que deseja deletar esse registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carService.deleteCar(car.id).subscribe({
          next:(response) => {//quando o back retornar o que espera
            const responseObject = JSON.parse(response);
            Swal.fire({
              title: responseObject.message,
              icon:  responseObject.deleted ? 'success' : 'error',
              confirmButtonText: 'Ok',
            });
            this.getAllCars();
          },
           
          error: (err) => {//quando ocorrer qualquer erro
            Swal.fire({
              title: 'Erro ao deletar o carro.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
      }
    });
  }

  new() {
    console.log("Método para buscar a rota para salvar veículo!")
    this.router.navigate(['admin/carros/new'])

  


  
    
  }

 edit(car: Car, id: number) {
   
    this.router.navigate([`admin/carros/edit/${id}`]);
   
   
    
  } 
  resetForm(){
    this.carForm.reset();
  }
 
    



  }


    
     
  

 
  
 


  

  
  

