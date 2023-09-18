import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  title: string | null = null;
  form: any;
  constructor(public modalRef: MdbModalRef<ModalComponent>, private translate: TranslateService) {}

  ngOnInit(): void{
    this.title = this.translate.instant("Form");
  }

}
