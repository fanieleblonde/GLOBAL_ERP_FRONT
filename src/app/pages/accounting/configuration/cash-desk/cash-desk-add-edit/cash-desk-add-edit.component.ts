import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import { BankaccountService } from 'src/app/pages/school/services/bankaccount.service';
import { CoreService } from 'src/app/core/core.service';
import { CashdeskService } from 'src/app/pages/school/services/cashdesk.service';
import { UserService } from 'src/app/pages/school/services/user.service';

@Component({
  selector: 'app-cash-desk-add-edit',
  templateUrl: './cash-desk-add-edit.component.html',
  styleUrls: ['./cash-desk-add-edit.component.scss']
})
export class CashDeskAddEditComponent {
  cashdeskForm : FormGroup;
  agentList: any[] = [];
  agentListSelect:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _cashdeskService: CashdeskService,
              private _dialogRef: MdbModalRef<CashDeskAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private userService: UserService
  )
  {
    this.cashdeskForm = this._fb.group({
      code: '',
      name: '',
      agent: '',
      company: '',
    })

  }

  ngOnInit() : void{
    this.cashdeskForm.patchValue(this.data);
    this.getAgentList();

    if (!this.data){
      this.getAgentList();
    }
    else {
      this.agentListSelect = this.data.agent['@id'];
    }
  }

  get fc(){
    return this.cashdeskForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.cashdeskForm.valid){
      this.saving = true;
      if (this.data){
        this._cashdeskService.edit(this.data.id, this.cashdeskForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Cash Desk edit with success !', 'success')
            this._dialogRef.close(true);
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            let errors: any[] = err['error']['violations'];

            errors.forEach((v) =>
            {
              if (v.propertyPath === this.cashdeskForm.get('name')){
                this.cashdeskForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._cashdeskService.create(this.cashdeskForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Cash Desk  add with success !', 'success')
            this._dialogRef.close(true);
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            let errors: any[] = err['error']['violations'];

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'name'){
                this.cashdeskForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })
      }

    }
  }

  getAgentList(){
    this.userService.getUserList().subscribe((data:any)=> {
        this.agentList = data['hydra:member'];
        this.agentList = this.agentList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }



}
