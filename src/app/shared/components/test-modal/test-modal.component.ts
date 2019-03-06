import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent implements OnInit {
  title = 'Test modal title';
  constructor() { }

  ngOnInit() {
  }
  modalClose(event: string) {
    console.log('TestModalComponent', event);
  }

}
