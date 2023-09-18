import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {MenuService} from "../../services/menu.service";
import {ModuleService} from "../../services/module.service";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-menu-add-edit',
  templateUrl: './menu-add-edit.component.html',
  styleUrls: ['./menu-add-edit.component.scss']
})
export class MenuAddEditComponent {

  menuForm : FormGroup;
  modules : any[] = [];
  moduleSelected : number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  val: any | null;

  update = this.translate.instant("Update");
  create = this.translate.instant("Save");

  createAndNew = this.translate.instant("Save and new");
  updateAndNew = this.translate.instant("Update and new");

  constructor(private _fb: FormBuilder,
              private _menuService: MenuService,
              private _moduleService: ModuleService,
              private _dialogRef: MdbModalRef<MenuAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService
  )
  {
    this.menuForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      module: ['', [Validators.required]],
    })

  }

  ngOnInit() : void{
    this.menuForm.patchValue(this.data);
    if (this.data){
      this.moduleSelected = this.data.module['@id'];
    }
    this.findAllModule();
  }

  get fc(){
    return this.menuForm.controls;
  }

  changeVal(value : any){
    this.val = value;
    console.log(this.val)
  }

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.menuForm.valid){
      this.saving = true;
      if (this.data){
        this._menuService.updateMenu(this.data.id, this.menuForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Menu edit with success !', 'success')
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
              if (v.propertyPath === 'module'){
                this.menuForm.get('module')?.setErrors({serverError: v.message})
              }
              this.saving = false;

            })
          }
        })
      }
      else {
        console.log(this.val)
        if (this.val == 1){

          this._menuService.addMenu(this.menuForm.value).subscribe({
            next: (val: any) => {
              this._coreService.showSuccess('Menu add with success !', 'success')
              //this._dialogRef.close(true);
              this.menuForm.reset();
            },
            complete: () => {
              this.saving = false
            },
            error: (err: any) =>
            {
              let errors: any[] = err['error']['violations'];
              console.log(errors)

              errors.forEach((v) =>
              {
                if (v.propertyPath === 'module'){
                  this.menuForm.get('module')?.setErrors({serverError: v.message})
                }
                this.saving = false;
              })
            }
          })
        }

        this._menuService.addMenu(this.menuForm.value).subscribe({
          next: (val: any) => {
            this._coreService.showSuccess('Menu add with success !', 'success')
            this._dialogRef.close(true);
            //this.menuForm.reset();
          },
          complete: () => {
            this.saving = false
          },
          error: (err: any) =>
          {
            let errors: any[] = err['error']['violations'];
            console.log(errors)

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'module'){
                this.menuForm.get('module')?.setErrors({serverError: v.message})
              }
              this.saving = false;
            })
          }
        })


      }

    }
  }


  findAllModule(){
    this._moduleService.getModuleList().subscribe((data:any)=> {
        console.log(data['hydra:member'])
        this.modules = data['hydra:member'];
        this.modules = this.modules.map((v) => {
          v.id = v['@id'];
          return v;
        })
      },
      error => console.log(error)
    )
  }

}
