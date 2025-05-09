import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/car';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Make } from '../../../models/make';
import { MakelistComponent } from "../../make/makelist/makelist.component";
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TemplateRef } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-carsdetails',
  standalone: true,
  imports: [FormsModule, MdbFormsModule, MakelistComponent],
  templateUrl: './carsdetails.component.html',
  styleUrls: ['./carsdetails.component.scss'],
})
export class CarsdetailsComponent implements OnInit {
  car: Car = new Car('', 0, '', 0, new Make('', '')); // Instancia inicial com o relacionamento com marca
  @Output() carSaved = new EventEmitter<void>();
  isEditing = false; //verifica e estamos criando ou editando um carro.

   //ELEMENTOS DA MODAL
   modalService = inject(MdbModalService); //para abrir a modal
   @ViewChild('modalMake') modalMake!: TemplateRef<any>;
   modalRef!:MdbModalRef<any>;
   

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    // Obtém o ID do carro na rota e busca os dados caso exista
    
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getCarById(id);
      this.isEditing = true; //existe um carro(vamos editar)
    }else{
      this.isEditing = false;//temos que criar um novo carro
    }
  }

  // Método para obter os detalhes do carro pelo ID
  getCarById(id: number): void {
    console.log(`Chamando API para obter detalhes do carro com ID: ${id}`);
    this.carService.getCarById(id).subscribe({
      next: (carData) => {
        this.car = carData;
        console.log('Carro carregado:', this.car);
      },
      error: (err) => {
        console.error('Erro ao buscar dados:', err);
        Swal.fire({
          title: 'Ocorreu um erro.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  // Método para salvar ou atualizar o carro
  save(): void {
    console.log('Método save chamado. Dados do carro:', this.car);

    if (this.car.id) {
      // Atualização do carro
      this.carService.updateCars(this.car, this.car.id!).subscribe({
        next: (response: any) => {
          console.log('Veículo atualizado com sucesso!', response.message);
          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate([`admin/carros/edit/${this.car.id}`], {
            state: { carEdit: this.car },
          });
        },
        error: (err) => {
          console.error('Erro ao atualizar veículo:', err);
          Swal.fire({
            title: err.error.message,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      // Criação de novo carro
      this.carService.saveCar(this.car).subscribe({
        next: (response: any) => {
          console.log('Novo carro salvo com sucesso:', response);
          if(!response || !response.id){
            console.error("Erro: O id do carro não está sendo retornado corretamente");
            return;
          }
          this.car.id = response.id;

          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate([`admin/carros/edit/${this.car.id}`], {
            state: { carNew: this.car },
          });
          this.carSaved.emit(); // Emite evento após salvar
        },
        error: (err) => {
          console.error('Erro ao salvar veículo:', err);
          Swal.fire({
            title: err.error.message,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }

  // Método chamado ao submeter formulário
  onSubmit(): void {
    console.log('Submissão iniciada.');
    this.save();
    this.close();
    
  } 

  // Método para navegar e fechar o formulário
  close(): void {
    console.log('Fechando formulário e navegando.');
    this.router.navigate(['/admin/carros']);
  }
  searchBrand(): void{
    //buscar marca
    console.log("Buscando marca");
    this.modalRef = this.modalService.open(this.modalMake,{modalClass: "modal-lg"});
    

  }
  changeBrand(): void{
     this.modalRef = this.modalService.open(this.modalMake,{modalClass: "modal-lg"});
  }
  returnMake(make: Make) {
    if (!make.id) {
      console.error("Erro: A marca não tem um ID válido!");
      return; // Interrompe a execução se o ID não estiver presente
    }
  
    this.car.make = make; // Agora a marca tem um ID válido
    this.modalRef.close(); // Fecha a modal
  }
}