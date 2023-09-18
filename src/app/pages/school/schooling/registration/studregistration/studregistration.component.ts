import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CoreService} from "../../../../../core/core.service";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import { Studregistration } from '../../../interface/studregistration';
import { StudregistrationAddEditComponent } from './studregistration-add-edit/studregistration-add-edit.component';
import { StudregistrationService } from '../../../services/studregistration.service';

@Component({
  selector: 'app-studregistration',
  templateUrl: './studregistration.component.html',
  styleUrls: ['./studregistration.component.scss']
})
export class StudregistrationComponent {
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
    'fathername',
    'fatherphone',
    'fatheremail',
    'fatherprofession',
    'mothername',
    'motherphone',
    'motheremail',
    'motherprofession',
    'guardianname',
    'guardianphone',
    'guardianemail',
    'guardianprofession',
    'diploma',
    'speciality',
    'center',
    'pvdiplome',
    'pvselection',
    'average',
    'ranks',
    'school',
    'classe',
    'regime',
    'options',
    'registrationdate',
    'repeating',
    'elementsprovided',
    'actions'
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public studregistrations!: Studregistration[];
  dataSource!: MatTableDataSource<Studregistration>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
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
        // console.log(this.studregistrations);

        this.studregistrations = res['hydra:member'][0]['studregistration'];
        this.dataSource = new MatTableDataSource(this.studregistrations)
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
    const dialogRef = this._modalService.open(StudregistrationAddEditComponent, {
      data: { title: 'Sturegistration Modal' },
      modalClass: 'modal-lg',
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
    const dialogRef = this._modalService.open(StudregistrationAddEditComponent, {
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
        this._studregistrationService.delete(id).subscribe({
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
