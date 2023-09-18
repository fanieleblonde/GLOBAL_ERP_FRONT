import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CoreService} from "../../../core/core.service";
import {RoleAddEditComponent} from "./role-add-edit/role-add-edit.component";
import {HttpErrorResponse} from "@angular/common/http";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import Swal from "sweetalert2";
import {Role} from "../interface/role";
import {RoleService} from "../services/role.service";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  displayedColumns: string[] = ['select', 'name', 'module', 'menu', 'permission', 'actions'];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public roles!: Role[];

  dataSource!: MatTableDataSource<Role>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;
  constructor(
              private _roleService: RoleService,
              private _coreService: CoreService,
              private _modalService: MdbModalService,
  ) {}
  ngOnInit() {
    this.getRoleList();
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

  getRoleList(){
    this._roleService.getRoleList().subscribe({
      next: (res: any) => {
        this.roles = res['hydra:member'];
        console.log(this.roles);

        this.dataSource = new MatTableDataSource(this.roles)
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
  openAddRoleForm() {
    const dialogRef = this._modalService.open(RoleAddEditComponent, {
      data: { title: 'Role Modal' },
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (val) => {
        if (val){
          this.getRoleList();
        }
      }
    })
  }

  openEditRoleForm(data: any){
    const dialogRef = this._modalService.open(RoleAddEditComponent, {
      data: {data: data},
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (value) => {
        if (value){
          this.getRoleList()
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

  deleteSelectedRoleRows(){
    this.selectedIds = this.selection.selected;
    const obj = this.selection.selected;
    const vals = Object.values(obj)
    //const ids = vals.map(a => ""+a.id+"");
    const ids = vals.map(a => (a.id));
    console.log(ids)
    this._roleService.deleteMultipleRole(ids).subscribe({
      next:(res) => {
        console.log(res);
        this._coreService.showSuccess('Employees deleted !', 'Success')
        this.getRoleList();
        this.selection.clear();
      },
      error: console.log
    });
  }

  deleteRole(id:number){
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
        this._roleService.deleteRole(id).subscribe({
          next:(res) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.getRoleList();
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
