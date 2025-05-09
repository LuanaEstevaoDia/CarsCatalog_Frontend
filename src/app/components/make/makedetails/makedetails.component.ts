import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MakeService } from '../../../services/make.service';
import { Make} from '../../../models/make';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-makedetails',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './makedetails.component.html',
  styleUrls: ['./makedetails.component.scss'],
})
export class MakedetailsComponent implements OnInit {
  make: Make = new Make('', ''); // Instancia inicial
  @Output() makeSaved = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private makeService: MakeService
  ) {}

  ngOnInit(): void {
    // Obtém o ID da marca na rota e busca os dados caso exista
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getMakeById(id);
    }
  }

  // Método para obter os detalhes da marca pelo ID
  getMakeById(id: number): void {
    console.log(`Chamando API para obter detalhes do carro com ID: ${id}`);
    this.makeService.getMakeById(id).subscribe({
      next: (makeData) => {
        this.make = makeData;
        console.log('Marca carregada:', this.make);
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

  // Método para salvar ou atualizar a marca
  save(): void {
    console.log('Método save chamado. Dados da marca:', this.make);

    if (this.make.id) {
      // Atualização da marca
      this.makeService.updateMake(this.make, this.make.id!).subscribe({
        next: (response: any) => {
          console.log('Veículo atualizado com sucesso!', response.message);
          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate([`admin/carros/edit/${this.make.id}`], {
            state: { makeEdit: this.make },
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
      // Criação de nova marca
      this.makeService.saveMake(this.make).subscribe({
        next: (response: any) => {
          console.log('Nova marca salva com sucesso:', response.make);
          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate([`admin/marcas/edit/${response.make.id}`], {
            state: { makeNew: response.make },
          });
          this.makeSaved.emit(); // Emite evento após salvar
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
    this.router.navigate(['/admin/marcas']);
  }
}