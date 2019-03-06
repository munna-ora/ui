import { Component, OnInit, Input, Output , EventEmitter  } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Output() oncloseModal = new EventEmitter<string>();
  constructor( private activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.title);
  }
  closeModalBox() {
    this.activeModal.close();
    console.log('hi');
    this.oncloseModal.emit('hi');
  }

}
