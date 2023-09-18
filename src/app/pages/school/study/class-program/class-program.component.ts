import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CoreService} from "../../../../core/core.service";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {ClassProgram} from "../../interface/class-program";
import {ClassProgramAddEditComponent} from "./class-program-add-edit/class-program-add-edit.component";
import {ClassProgramService} from "../../services/class-program.service";

@Component({
  selector: 'app-class-program',
  templateUrl: './class-program.component.html',
  styleUrls: ['./class-program.component.scss']
})
export class ClassProgramComponent {
  displayedColumns: string[] = [
    'select',

    'year',
    'school',
    'institution',
    'class',
    'subject',
    'module',
    'teacher',
    'teacher2',
    'teacher3',
    'teacherCm',
    'teacherTd',
    'teacherTp',
    'teacherMark',
    'isActif',
    'codeUVC',
    'nameUVC',
    'periodType',
    'position',
    'coeff',
    'principalRoom',
    'room2',
    'room3',
    'Room4',
    'room5',
    'room6',
    'room7',
    'room8',
    'room9',
    'nature',

    'actions'
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;
  public classProgram!: ClassProgram[];
  dataSource!: MatTableDataSource<ClassProgram>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private _classprogramservice: ClassProgramService,
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
    this._classprogramservice.getList().subscribe({
      next: (res: any) => {
        this.classProgram = res['hydra:member'];
        console.log(this.classProgram);

        this.dataSource = new MatTableDataSource(this.classProgram)
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
    const dialogRef = this._modalService.open(ClassProgramAddEditComponent, {
      data: { title: 'classProgram Modal' },
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
    const dialogRef = this._modalService.open(ClassProgramAddEditComponent, {
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
        this._classprogramservice.delete(id).subscribe({
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
