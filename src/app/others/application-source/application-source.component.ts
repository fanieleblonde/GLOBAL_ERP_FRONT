import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CoreService} from "../../core/core.service";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {ApplicationSource} from "../../interface/application-source";
import {ApplicationSourceAddEditComponent} from "./application-source-add-edit/application-source-add-edit.component";
import {ApplicationSourceService} from "../../services/application-source.service";

@Component({
  selector: 'app-application-source',
  templateUrl: './application-source.component.html',
  styleUrls: ['./application-source.component.scss']
})
export class ApplicationSourceComponent {
  displayedColumns: string[] = [
    'select',
    'name',
    'actions'
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public applicationSource!: ApplicationSource[];
  dataSource!: MatTableDataSource<ApplicationSource>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private _applicationsourceService: ApplicationSourceService,
    private _coreService: CoreService,
    private _modalService: MdbModalService,
  ) {}
  ngOnInit() {
    this.getApplicationSourceList();
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
  getApplicationSourceList(){
    this._applicationsourceService.getList().subscribe({
      next: (res: any) => {
        this.applicationSource = res['hydra:member'];
        console.log(this.applicationSource);

        this.dataSource = new MatTableDataSource(this.applicationSource)
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
  openAddForm() {
    const dialogRef = this._modalService.open(ApplicationSourceAddEditComponent, {
      data: { title: 'applicationSource Modal' },
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (val) => {
        if (val){
          this.getApplicationSourceList();
        }
      }
    })
  }

  openEditForm(data: any){
    const dialogRef = this._modalService.open(ApplicationSourceAddEditComponent, {
      data: {data: data},
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (value) => {
        if (value){
          this.getApplicationSourceList()
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

  /*deleteSelectedModuleRows(){
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
  }*/

  delete(id:number){
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
        this._applicationsourceService.delete(id).subscribe({
          next:(res) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.getApplicationSourceList();
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
