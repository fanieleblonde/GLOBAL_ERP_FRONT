import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CoreService} from "../../../../../core/core.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import Swal from "sweetalert2";
import {Campus} from "../../../interface/campus";
import {CampusService} from "../../../services/campus.service";
import {CampusAddEditComponent} from "./campus-add-edit/campus-add-edit.component";

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss']
})
export class CampusComponent {
  displayedColumns: string[] = [
    'select',
    'code',
    'name',
    'actions'
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public campus!: Campus[];
  dataSource!: MatTableDataSource<Campus>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private _campusService: CampusService,
    private _coreService: CoreService,
    private _modalService: MdbModalService,
  ) {}
  ngOnInit() {
    this.getCampusList();
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
  getCampusList(){
    this._campusService.getCampusList().subscribe({
      next: (res: any) => {
        this.campus = res['hydra:member'];
        console.log(this.campus);

        this.dataSource = new MatTableDataSource(this.campus)
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
  openAddCampusForm() {
    const dialogRef = this._modalService.open(CampusAddEditComponent, {
      data: { title: 'Campus Modal' },
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (val) => {
        if (val){
          this.getCampusList();
        }
      }
    })
  }

  openEditCampusForm(data: any){
    const dialogRef = this._modalService.open(CampusAddEditComponent, {
      data: {data: data},
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (value) => {
        if (value){
          this.getCampusList()
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
        this._campusService.delete(id).subscribe({
          next:(res) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.getCampusList();
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