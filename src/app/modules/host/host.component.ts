import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Meta, Title  } from '@angular/platform-browser';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  
  constructor(
    private modalService: NgbModal,
    private meta: Meta,
    private title: Title
    ) {
    
      // ADD PAGE TITLE & METATAGS START
      this.meta.addTags([
        {name: 'description', content: 'Do you have a property? It’s time to get listed on Orastays today and lst India experience it. '},
        {name: 'author', content: ''},
        {name: 'keywords', content: ''}
      ]);
      this.title.setTitle('List your property with Orastays in India');
      // END
   }

  ngOnInit() {

  }
  scroll(el) {
    el.scrollIntoView({behavior: 'smooth'});
  }
  openModal(content) {
    // , size: 'md'
      this.modalService.open(content, { windowClass: 'modal-popup', centered: true });
  }
}
