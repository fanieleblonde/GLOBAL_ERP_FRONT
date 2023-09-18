import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CoreService} from "../../../../../core/core.service";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import { Student } from '../../../interface/student';
import { StudentService } from '../../../services/student.service';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';
import { StudregistrationService } from '../../../services/studregistration.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  displayedColumns: string[] = [
    'select',
    'year',
    'matricule',
    'othermatricule',
    'name',
    'dob',
    'pob',
    'sex',
    'country',
    'region',
    'religion',
    'studentphone',
    'studentemail',
    'actions'
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public students!: Student[];
  dataSource!: MatTableDataSource<Student>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private _studentService: StudentService,
    private _studregistrationService: StudregistrationService,
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
    this._studregistrationService.getStudentList().subscribe({
      next: (res: any) => {
        console.log(res['hydra:member']);
        console.log(this.students);

        this.students = res['hydra:member'][0]['studregistration'];
        this.dataSource = new MatTableDataSource(this.students)
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
  //   const dialogRef = this._modalService.open(StudentAddEditComponent, {
  //     data: { title: 'Student Modal' },
  //     modalClass: 'modal-lg',
  //     'ignoreBackdropClick': true,
  //   });

  //   dialogRef.onClose.subscribe({
  //     next: (val) => {
  //       if (val){
  //         this.getList();
  //       }
  //     }
  //   })
  // }

  openEditForm(data: any){
    const dialogRef = this._modalService.open(StudentAddEditComponent, {
      data: {data: data},
      modalClass: 'modal-lg',
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
        this._studentService.delete(id).subscribe({
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
              'success'
            );
          }
        });
      }
    })

  }

}
