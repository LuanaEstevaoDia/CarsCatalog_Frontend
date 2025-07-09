import { Component, ViewEncapsulation } from '@angular/core';
import { Item } from '../../models/item';
import { ItemsListComponent } from '../../components/items/items-list/items-list.component';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ItemsListComponent,MdbModalModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ItemsComponent {
  constructor(public modalRef: MdbModalRef<ItemsComponent>) {}
  
    selectItem(item: any): void {
      this.modalRef.close(Item); // Retorna a marca selecionada
    }
  
  

}
