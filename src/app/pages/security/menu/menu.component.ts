import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CoreService} from "../../../core/core.service";
import {MenuAddEditComponent} from "./menu-add-edit/menu-add-edit.component";
import {HttpErrorResponse} from "@angular/common/http";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import Swal from "sweetalert2";
import {Menu} from "../interface/menu";
import {MenuService} from "../services/menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  displayedColumns: string[] = ['select', 'name', 'module', 'actions'];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public menus!: Menu[];
  dataSource!: MatTableDataSource<Menu>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
              private _menuService: MenuService,
              private _coreService: CoreService,
              private _modalService: MdbModalService,
  ) {}
  ngOnInit() {
    this.getMenuList();
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

  getMenuList(){
    this._menuService.getMenuList().subscribe({
      next: (res: any) => {
        this.menus = res['hydra:member'];
        console.log(this.menus);

        this.dataSource = new MatTableDataSource(this.menus)
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
  openAddMenuForm() {
    const dialogRef = this._modalService.open(MenuAddEditComponent, {
      data: { title: 'Menu Modal' },
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (val) => {
        if (val){
          this.getMenuList();
        }
      }
    })
  }

  openEditMenuForm(data: any){
    const dialogRef = this._modalService.open(MenuAddEditComponent, {
      data: {data: data},
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (value) => {
        if (value){
          this.getMenuList()
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

  deleteSelectedMenuRows(){
    this.selectedIds = this.selection.selected;
    const obj = this.selection.selected;
    const vals = Object.values(obj)
    //const ids = vals.map(a => ""+a.id+"");
    const ids = vals.map(a => (a.id));
    console.log(ids)
    this._menuService.deleteMultipleMenu(ids).subscribe({
      next:(res) => {
        console.log(res);
        this._coreService.showSuccess('Employees deleted !', 'Success')
        this.getMenuList();
        this.selection.clear();
      },
      error: console.log
    });
  }

  deleteMenu(id:number){
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
        this._menuService.deleteMenu(id).subscribe({
          next:(res) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.getMenuList();
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
