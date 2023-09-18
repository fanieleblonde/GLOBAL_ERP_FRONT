import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CoreService} from "../../../../../core/core.service";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {Graduation} from "../../../interface/graguation";
import {GraguationAddEditComponent} from "./graguation-add-edit/graguation-add-edit.component";
import {GraduationService} from "../../../services/graduation.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-graduation',
  templateUrl: './graduation.component.html',
  styleUrls: ['./graduation.component.scss']
})
export class GraduationComponent {
  displayedColumns: string[] = [
    'select',
    'year',
    'diploma',
    'code',
    'status',
    'startAt',
    'beginTime',
    'endTime',
    'theme',
    'remark',
    'classe',
    'studregistration',
    'sequence',
    'mention',
    'actions',
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;
  public currentUserSchoolYearValue:any = null;
  public currentUserSchoolYear:any = null;

  public graduation!: Graduation[];
  dataSource!: MatTableDataSource<Graduation>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private _graduationService: GraduationService,
    private _userService: UserService,
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
    this._graduationService.getList().subscribe({
      next: (res: any) => {
        this.graduation = res['hydra:member'];
        console.log(this.graduation);

        this.dataSource = new MatTableDataSource(this.graduation)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this._userService.getUserItem(3).subscribe(
          {
            next: (res: any) => {
              console.log(res);
              this.isLoading = false;
              this.currentUserSchoolYear = res.currentSchoolYear;
              this.currentUserSchoolYearValue=this.currentUserSchoolYear.year
            },
            error:(error : HttpErrorResponse) => {
              alert(error.message);
              console.log("Error while fetching the records")
              this.isLoading = false
            }
          }
        )
      },
      error:(error : HttpErrorResponse) => {
        alert(error.message);
        console.log("Error while fetching the records")
        this.isLoading = false
      }
    });
  }
  openAddForm() {
    const dialogRef = this._modalService.open(GraguationAddEditComponent, {
      data: { title: 'graduation Modal' },
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
    const dialogRef = this._modalService.open(GraguationAddEditComponent, {
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
        this._graduationService.delete(id).subscribe({
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
