import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CoreService} from "../../../../core/core.service";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {PeriodType} from "../../../school/interface/period-type";
import {PeriodTypeService} from "../../../school/services/period-type.service";
import {PeriodTypeAddEditComponent} from "./period-type-add-edit/period-type-add-edit.component";

@Component({
  selector: 'app-period-type',
  templateUrl: './period-type.component.html',
  styleUrls: ['./period-type.component.scss']
})
export class PeriodTypeComponent {
  displayedColumns: string[] = [
    'select',
    'code',
    'name',
    'actions'
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public periodtype!: PeriodType[];
  dataSource!: MatTableDataSource<PeriodType>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private _periodtypeService: PeriodTypeService,
    private _coreService: CoreService,
    private _modalService: MdbModalService,
  ) {}
  ngOnInit() {
    this.getPeriodTypeList();
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
  getPeriodTypeList(){
    this._periodtypeService.getList().subscribe({
      next: (res: any) => {
        this.periodtype = res['hydra:member'];
        console.log(this.periodtype);

        this.dataSource = new MatTableDataSource(this.periodtype)
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
    const dialogRef = this._modalService.open(PeriodTypeAddEditComponent, {
      data: { title: 'period_type Modal' },
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (val) => {
        if (val){
          this.getPeriodTypeList();
        }
      }
    })
  }

  openEditForm(data: any){
    const dialogRef = this._modalService.open(PeriodTypeAddEditComponent, {
      data: {data: data},
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (value) => {
        if (value){
          this.getPeriodTypeList()
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
        this._periodtypeService.delete(id).subscribe({
          next:(res) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.getPeriodTypeList();
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
