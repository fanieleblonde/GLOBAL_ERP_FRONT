import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TranslateService} from "@ngx-translate/core";
import { CostAreaService } from 'src/app/pages/school/services/cost-area.service';
import { CoreService } from 'src/app/core/core.service';
import { ExpenseHeadingService } from 'src/app/pages/school/services/exspense-heading.service';

@Component({
  selector: 'app-cost-area-add-edit',
  templateUrl: './cost-area-add-edit.component.html',
  styleUrls: ['./cost-area-add-edit.component.scss']
})
export class CostAreaAddEditComponent {
  costAreaForm : FormGroup;
  expenseHeadingList: any[] = [];
  expenseHeadingSelected:number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  edit = this.translate.instant("Edit");
  create = this.translate.instant("Save");

  constructor(private _fb: FormBuilder,
              private _costAreaService: CostAreaService,
              private _dialogRef: MdbModalRef<CostAreaAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,
              private _expenseHeadingService: ExpenseHeadingService,
  )
  {
    this.costAreaForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      expenseHeading: '',
      isamountorquantity: 'false',
      isfornewstudent: '',
      isforoldstudent: '',
      isforrepeatingstudent: '',
      isfornonrepeatingstudent: '',
    })

  }

  ngOnInit() : void{
    this.costAreaForm.patchValue(this.data);
    if (this.data){
      this.expenseHeadingSelected = this.data.expenseHeading['@id'];
    }
    this.getExpenseHeadingList();
  }

  get fc(){
    return this.costAreaForm.controls;
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.costAreaForm.valid){
      this.saving = true;
      this.costAreaForm.value['isamountorquantity'] = this.costAreaForm.value['isamountorquantity'] == "true"
      this.costAreaForm.value['isfornewstudent'] = this.costAreaForm.value['isfornewstudent'] == "true"
      this.costAreaForm.value['isforoldstudent'] = this.costAreaForm.value['isforoldstudent'] == "true"
      this.costAreaForm.value['isforrepeatingstudent'] = this.costAreaForm.value['isforrepeatingstudent'] == "true"
      this.costAreaForm.value['isfornonrepeatingstudent'] = this.costAreaForm.value['isfornonrepeatingstudent'] == "true"
      if (this.data){
        this._costAreaService.edit(this.data.id, this.costAreaForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Cost Area edit with success !', 'success')
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
              if (v.propertyPath === this.costAreaForm.get('name')){
                this.costAreaForm.get('name')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        this._costAreaService.create(this.costAreaForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Cost Area add with success !', 'success')
            this._dialogRef.close(true);
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            this.saving = false;
            let errors: any[] = err['error']['violations'];

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'name'){
                this.costAreaForm.get('name')?.setErrors({serverError: v.message})
              }

            })
          }
        })
      }

    }
  }

  getExpenseHeadingList(){
    this._expenseHeadingService.getExpenseHeadingList().subscribe((data:any)=> {
        this.expenseHeadingList = data['hydra:member'];
        this.expenseHeadingList = this.expenseHeadingList.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
