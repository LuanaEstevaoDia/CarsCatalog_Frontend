import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Item } from '../../../models/item';
import { ItemsService } from '../../../services/items.service';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MdbFormsModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
})
export class ItemsListComponent {
  list: Item[] = [];
  itemEdit = new Item("", "");
  router = inject(Router);
  itemsService = inject(ItemsService);


  ngOnInit() {
  this.getAllItems();
}

  getAllItems() {
    console.log('Listagem de items!');
    this.itemsService.getAllItems().subscribe({
      next: (list) => {
        // quando o back retorna o que se espera, igual try
        this.list = list;
      },
      error: (err) => {
        // quando há uma exceção igual catch (badRequest, exception, etc)
        Swal.fire({
          title: 'Ocorreu um erro.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  deleteById(item: Item) {
    console.log('Acesso no método de deletar');
    Swal.fire({
      title: 'Tem certeza que deseja deletar esse registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemsService.deleteItem(item.id).subscribe({
          next: (response) => {
            //quando o back retornar o que espera
            const responseObject = JSON.parse(response);
            Swal.fire({
              title: responseObject.message,
              icon: responseObject.deleted ? 'success' : 'error',
              confirmButtonText: 'Ok',
            });
            this.getAllItems();
          },

          error: (err) => {
            //quando ocorrer qualquer erro
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
    console.log('Método para buscar a rota para salvar acessório!');
    this.router.navigate(['admin/items/new']);
  }
}
