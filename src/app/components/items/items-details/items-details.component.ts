import { Component } from '@angular/core';
import { Item } from '../../../models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-items-details',
  standalone: true,
  imports: [FormsModule, MdbFormsModule,CommonModule],
  templateUrl: './items-details.component.html',
  styleUrl: './items-details.component.scss'
})
export class ItemsDetailsComponent {
  item: Item = new Item('');
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService,
  ){}

  ngOnInit():void{
    
    const id = this.route.snapshot.params['id'];
    if(id){
      this.getItemById(id);
      
    }else{
      this.isEditing = false;

    }

  }

    getItemById(id: number): void {
      console.log(`Chamando API para obter detalhes do acessório com ID: ${id}`);
      this.itemsService.getItemById(id).subscribe({
        next: (itemData) => {
          this.item = itemData;
          this.isEditing = true;
          console.log('Item carregado:', this.item);
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
  
  
    save(): void {
      console.log('Método save chamado. Dados do acessório:', this.item);
      console.log('Id do acessório', this.item.id);
  
      if (this.item.id) {
        // Atualização do carro
        this.itemsService.updateItems(this.item, this.item.id!).subscribe({
          next: (response: any) => {
            console.log('Acessório atualizado com sucesso!', response.message);
            Swal.fire({
              title: response.message,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
  
            this.router.navigate([`admin/items/edit/${this.item.id}`], {
              state: { itemEdit: this.item},
            });
  
            this.close();
          },
          error: (err) => {
            console.error('Erro ao atualizar acessório:', err);
            Swal.fire({
              title: err.error.message,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        });
      } else {
        
        this.itemsService.saveItem(this.item).subscribe({
          next: (response: any) => {
            this.item.id = response.item;
  
            Swal.fire({
              title: response.message,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.router.navigate([`admin/items/edit/${this.item.id}`], {
              state: { itemNew: this.item },
            });
  
            this.close();
          },
          error: (err) => {
            console.error('Erro ao salvar acessório:', err);
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
      this.router.navigate(['/admin/items']);
    }
}
