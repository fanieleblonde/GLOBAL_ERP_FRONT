import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CoreService} from "../../../../../core/core.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import Swal from "sweetalert2";
import { TestMaterial } from '../../../interface/testmaterial';
import { TestMaterialService } from '../../../services/test-material.service';
import { TestMaterialAddEditComponent } from './test-material-add-edit/test-material-add-edit.component';

@Component({
  selector: 'app-test-material',
  templateUrl: './test-material.component.html',
  styleUrls: ['./test-material.component.scss']
})
export class TestMaterialComponent {
  displayedColumns: string[] = [
    'select',
    'code',
    'name',
    'actions'
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public testmaterial!: TestMaterial[];
  dataSource!: MatTableDataSource<TestMaterial>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private _testmaterialService: TestMaterialService,
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
    this._testmaterialService.getTestMaterialList().subscribe({
      next: (res: any) => {
        this.testmaterial = res['hydra:member'];
        // console.log(this.testmaterial);

        this.dataSource = new MatTableDataSource(this.testmaterial)
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
    const dialogRef = this._modalService.open(TestMaterialAddEditComponent, {
      data: { title: 'Test Material Modal' },
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (val) => {
        if (val){
          this.getList();
        }
      }
    })
  }

  openEditForm(data: any){
    const dialogRef = this._modalService.open(TestMaterialAddEditComponent, {
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
        this._testmaterialService.delete(id).subscribe({
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
