import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-modal-without-footer',
  templateUrl: './modal-without-footer.component.html',
  styleUrls: ['./modal-without-footer.component.scss']
})
export class ModalWithoutFooterComponent {
  title: string | null = null;
  form: any;
  constructor(public modalRef: MdbModalRef<ModalWithoutFooterComponent>, private translate: TranslateService) {}

  ngOnInit(): void{
    this.title = this.translate.instant("Form");
  }

}
