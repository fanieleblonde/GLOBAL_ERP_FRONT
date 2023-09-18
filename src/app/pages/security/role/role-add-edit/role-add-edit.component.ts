import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CoreService} from "../../../../core/core.service";
import {TranslateService} from "@ngx-translate/core";
import {MenuService} from "../../services/menu.service";
import {ModuleService} from "../../services/module.service";
import {TreeviewConfig, TreeviewItem} from "@charmedme/ngx-treeview";
import {RoleService} from "../../services/role.service";

@Component({
  selector: 'app-menu-add-edit',
  templateUrl: './role-add-edit.component.html',
  styleUrls: ['./role-add-edit.component.scss']
})
export class RoleAddEditComponent {

  menuForm : FormGroup;
  roles : any[] = [];

  mymenu: any;
  moduleSelected : number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  val: any | null;

  update = this.translate.instant("Update");
  create = this.translate.instant("Save");


  createAndNew = this.translate.instant("Save and new");
  updateAndNew = this.translate.instant("Update and new");


  // items: TreeviewItem[] = [];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });
  items: TreeviewItem[] = [];

  test: TreeviewItem[] = [];

  value: number | undefined;

  constructor(private _fb: FormBuilder,
              private _menuService: MenuService,
              private _moduleService: ModuleService,
              private _roleService: RoleService,
              private _dialogRef: MdbModalRef<RoleAddEditComponent>,
              private _coreService: CoreService,
              private translate: TranslateService,



  )
  {
    this.menuForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('') ]],
      permission: ['', [Validators.required]],
    });

  }

  ngOnInit() : void{
    this.menuForm.patchValue(this.data);
    if (this.data){
      this.moduleSelected = this.data.module['@id'];
    }

    this.findModuleMenuPermissions();

  }


  select(item: TreeviewItem):void{
    console.log(item);
    this.value = item.value;
  }

  onSelectedChange(event: number[]):void{
    console.log(event);
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

  findModuleMenuPermissions(){
    this._roleService.getCustomRoleList().subscribe((data:any)=> {
        this.roles = data['hydra:member'][0]['module'];
        console.log(this.roles);
        let objt: any = {}

        this.items = this.roles.map((v) => {
          objt.text = v.name;
          objt.value = v.id;
          objt.children = v.menus.map((m:any) => {

            return {
              text : m.name,
              value : m.id,
              children : m.permissions.map((p:any) => {
                return {
                  text: p.name,
                  value: p.id
                }
              })
            }

          })
          return new TreeviewItem(objt)
        })

      },
      error => console.log(error)
    )
  }

}
