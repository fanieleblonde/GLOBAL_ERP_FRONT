import {Component, ViewChild} from '@angular/core';
import {Module} from "../interface/module";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CoreService} from "../../../core/core.service";
import {ModuleAddEditComponent} from "./module-add-edit/module-add-edit.component";
import {HttpErrorResponse} from "@angular/common/http";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import Swal from "sweetalert2";
import {ModuleService} from "../services/module.service";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent {

  displayedColumns: string[] = ['select', 'name', 'actions'];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public modules!: Module[];
  dataSource!: MatTableDataSource<Module>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
              private _modService: ModuleService,
              private _coreService: CoreService,
              private _modalService: MdbModalService,
  ) {}
  ngOnInit() {
    this.getModuleList();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row =>
        this.selection.select(row));
  }
  getModuleList(){
    this._modService.getModuleList().subscribe({
      next: (res: any) => {
        this.modules = res['hydra:member'];
        console.log(this.modules);

        this.dataSource = new MatTableDataSource(this.modules)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error:(error : HttpErrorResponse) => {
        alert(error.message);
        console.log("Error while fetching the records")
        this.isLoading = false
      }
    });
  }
  openAddModuleForm() {
    const dialogRef = this._modalService.open(ModuleAddEditComponent, {
      data: { title: 'Module Modal' },
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (val) => {
        if (val){
          this.getModuleList();
        }
      }
    })
  }

  openEditModuleForm(data: any){
    const dialogRef = this._modalService.open(ModuleAddEditComponent, {
      data: {data: data},
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (value) => {
        if (value){
          this.getModuleList()
        }
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSelectedModuleRows(){
    this.selectedIds = this.selection.selected;
    const obj = this.selection.selected;
    const vals = Object.values(obj)
    //const ids = vals.map(a => ""+a.id+"");
    const ids = vals.map(a => (a.id));
    console.log(ids)
    this._modService.deleteMultipleModule(ids).subscribe({
      next:(res) => {
        console.log(res);
        this._coreService.showSuccess('Modules deleted !', 'Success')
        this.getModuleList();
        this.selection.clear();
      },
      error: console.log
    });
  }

  deleteModule(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._modService.deleteModule(id).subscribe({
          next:(res) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.getModuleList();
          },
          error: (res) => {
            Swal.fire(
              'Deleted!',
              'Your Item has not been deleted.',
              'error'
            );
          }
        });
      }
    })

  }

}
