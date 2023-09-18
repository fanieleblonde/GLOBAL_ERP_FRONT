import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CoreService} from "../../../../core/core.service";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {Institution} from "../../../school/interface/institution";
import {InstitutionAddEditComponent} from "./institution-add-edit/institution-add-edit.component";
import {InstitutionService} from "../../../school/services/institution.service";

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent {
  displayedColumns: string[] = [
    'select',
    'code',
    'name',
    'phone',
    'city',
    // 'managerType',
    // 'manager',
    // 'periodType',
    // 'cycle',
    // 'classCategory',
    // 'divisionNumber',
    // 'autorisationDate',
    // 'openDate',
    // 'autorisationRef',
    // 'openningRef',
    'actions'
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public institution!: Institution[];
  dataSource!: MatTableDataSource<Institution>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private _institutionService: InstitutionService,
    private _coreService: CoreService,
    private _modalService: MdbModalService,
  ) {}
  ngOnInit() {
    this.getList();
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
  getList(){
    this._institutionService.getList().subscribe({
      next: (res: any) => {
        this.institution = res['hydra:member'];
        console.log(this.institution);

        this.dataSource = new MatTableDataSource(this.institution)
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
  // openAddForm() {
  //   const dialogRef = this._modalService.open(InstitutionAddEditComponent, {
  //     data: { title: 'institution Modal' },
  //     'ignoreBackdropClick': true,
  //   });
  //
  //   dialogRef.onClose.subscribe({
  //     next: (val) => {
  //       if (val){
  //         this.getList();
  //       }
  //     }
  //   })
  // }

  openEditForm(data: any){
    const dialogRef = this._modalService.open(InstitutionAddEditComponent, {
      data: {data: data},
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (value) => {
        if (value){
          this.getList()
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
        this._institutionService.delete(id).subscribe({
          next:(res) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.getList();
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