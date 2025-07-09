import { Component, ViewEncapsulation} from '@angular/core';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MakelistComponent } from '../../components/make/makelist/makelist.component';


@Component({
  selector: 'app-make-modal',
  standalone: true,
  imports: [MakelistComponent, MdbModalModule],
  templateUrl: './make-modal.component.html',
  styleUrl: './make-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MakeModalComponent {
   constructor(public modalRef: MdbModalRef<MakeModalComponent>) {}

  selectMake(make: any): void {
    this.modalRef.close(make); // Retorna a marca selecionada
  }


}
