import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import { CoreService } from 'src/app/core/core.service';

import {HttpErrorResponse} from "@angular/common/http";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import Swal from "sweetalert2";

import { Ministry } from 'src/app/pages/school/interface/ministry';
import { MinistryService } from 'src/app/pages/school/services/ministry.service';
import { MinistryAddEditComponent } from './ministry-add-edit/ministry-add-edit.component';

@Component({
  selector: 'app-ministry',
  templateUrl: './ministry.component.html',
  styleUrls: ['./ministry.component.scss']
})
export class MinistryComponent {
  displayedColumns: string[] = [
    'select',
    'code',
    'name',
    'actions'
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public campus!: Ministry[];
  dataSource!: MatTableDataSource<Ministry>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private _ministryService: MinistryService,
    private _coreService: CoreService,
    private _modalService: MdbModalService,
  ) {}


  ngOnInit() {
    this.getMinistryList();
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


  getMinistryList(){
    this._ministryService.getMinistryList().subscribe({
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

  openAddForm() {
    const dialogRef = this._modalService.open(MinistryAddEditComponent, {
      data: { title: 'Campus Modal' },
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (val) => {
        if (val){
          this.getMinistryList();
        }
      }
    })
  }

  openEditForm(data: any){
    const dialogRef = this._modalService.open(MinistryAddEditComponent, {
      data: {data: data},
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (value) => {
        if (value){
          this.getMinistryList()
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
        this._ministryService.delete(id).subscribe({
          next:(res) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.getMinistryList();
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
