import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/car';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Make } from '../../../models/make';
import { MakelistComponent } from '../../make/makelist/makelist.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MakeModalComponent } from '../../../modals/make-modal/make-modal.component';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from '../../../modals/items/items.component';
import { Item } from '../../../models/item';

@Component({
  selector: 'app-carsdetails',
  standalone: true,
  imports: [FormsModule, MdbFormsModule,CommonModule],
  templateUrl: './carsdetails.component.html',
  styleUrls: ['./carsdetails.component.scss'],
})
export class CarsdetailsComponent implements OnInit {
  car: Car = new Car('', 0, '', 0, new Make('', '')); // Instancia inicial com o relacionamento com marca
  @Output() onUpdateListCars = new EventEmitter<void>();
  isEditing = false; //verifica e estamos criando ou editando um carro.

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>;

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
    } else {
      this.isEditing = false; //temos que criar um novo carro
    }
  }

  // Método para obter os detalhes do carro pelo ID
  getCarById(id: number): void {
    console.log(`Chamando API para obter detalhes do carro com ID: ${id}`);
    this.carService.getCarById(id).subscribe({
      next: (carData) => {
        this.car = carData;
        this.isEditing = true;
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
    console.log('Id do carro', this.car.id);

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

          this.close();
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
          console.log('Novo carro salvo com sucesso:', response.message);
          console.log('Objeto car dentro da resposta', response.car);
          console.log('Objeto ID', response.car.id);
          this.car.id = response.car.id;

          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate([`admin/carros/edit/${this.car.id}`], {
            state: { carNew: this.car },
          });

          this.close();
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
  }

  // Método para navegar e fechar o formulário
  close(): void {
    console.log('Fechando formulário e navegando.');
    this.router.navigate(['/admin/carros']);
  }
  searchBrand(): void {
    this.modalRef = this.modalService.open(MakeModalComponent, {
      modalClass: 'modal-lg modal-offset-top',
      backdrop: true,
      keyboard: false,
    });

    this.modalRef.onClose.subscribe((selectedMake: Make) => {
      if (selectedMake && selectedMake.id) {
        this.car.make = selectedMake;
      }
    });
  }

  changeBrand(): void {
    this.searchBrand();
  }

  returnMake(make: Make) {
    if (!make.id) {
      console.error('Erro: A marca não tem um ID válido!');
      return; // Interrompe a execução se o ID não estiver presente
    }

    this.car.make = make; // marca tem um ID válido
    this.modalRef.close(); // Fecha a modal
  }

  //método que deixa deletar ou corrigir uma marca caso não tenha vínculo com nenhum carro
  carLink() {
    if (this.car.model == null || !this.car.model) {
      console.log('A marca não está vínculada');
    }
  }
  returnItem(item: Item) {
    if (!item.id) {
      console.error('Erro: Item não tem um ID válido!');
      return; // Interrompe a execução se o ID não estiver presente
    }

    //this.car.make = make; // marca tem um ID válido
    this.modalRef.close(); // Fecha a modal
  }
  searchItem(): void {
    this.modalRef = this.modalService.open(ItemsComponent, {
      modalClass: 'modal-lg modal-offset-top',
      backdrop: true,
      keyboard: false,
    });

    this.modalRef.onClose.subscribe((selectedItem: Item) => {
      if (selectedItem && selectedItem.id) {
        // this.car.make = selectedMake; ver como vai receber
      }
    });
  }

  changeItem(): void {
    this.searchBrand();
  }
}
