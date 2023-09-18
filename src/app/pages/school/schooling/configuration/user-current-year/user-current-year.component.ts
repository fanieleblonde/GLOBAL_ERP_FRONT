import {Component, ViewChild} from '@angular/core';
import {SchoolYear} from "../../../interface/school-year";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SchoolYearService} from "../../../services/school-year.service";
import {UserService} from "../../../services/user.service";
import {CoreService} from "../../../../../core/core.service";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {UserCurrentAddEditComponent} from "./user-current-add-edit/user-current-add-edit.component";

@Component({
  selector: 'app-user-current-year',
  templateUrl: './user-current-year.component.html',
  styleUrls: ['./user-current-year.component.scss']
})
export class UserCurrentYearComponent {
  displayedColumns: string[] = [
    'year',
    'actions'
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public currentUserSchoolYearValue:any = null;
  public currentUserSchoolYear:any = null;

  public currentApplicationSchoolYearValue:any = null;
  public currentApplicationSchoolYear:any = null;

  public schoolYear!: SchoolYear[];

  yearUserListSelect:number | undefined;
  yearApplicationListSelect:number | undefined;

  public schoolYearList!: SchoolYear[];


  dataSource!: MatTableDataSource<SchoolYear>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private _schoolyearService: SchoolYearService,
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
    this._schoolyearService.getList().subscribe({
      next: (res: any) => {
        this.schoolYear = res['hydra:member'];
        this.schoolYearList=this.schoolYear;
        console.log(this.schoolYear);

        this.schoolYearList= this.schoolYearList.map((v:any) => {
          v.id = v['@id'];
          return v;
        })

        this.dataSource = new MatTableDataSource(this.schoolYear)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;



        this._userService.getUserItem(3).subscribe(
          {
            next: (res: any) => {
              console.log(res);
              this.isLoading = false;
              this.currentUserSchoolYear = res.currentSchoolYear;
              this.currentUserSchoolYearValue =this.currentUserSchoolYear.year

              this.currentApplicationSchoolYear = this.schoolYear.find( (schoolYear:SchoolYear) => schoolYear.isCurrent );
              this.currentApplicationSchoolYearValue =this.currentApplicationSchoolYear.year

              this.yearUserListSelect = this.currentUserSchoolYear['@id'];
              this.yearApplicationListSelect = this.currentApplicationSchoolYear['@id'];


            },
            error:(error : HttpErrorResponse) => {
              alert(error.message);
              console.log("Error while fetching the records")
              this.isLoading = false
            }
          }
        )},
      error:(error : HttpErrorResponse) => {
        alert(error.message);
        console.log("Error while fetching the records")
        this.isLoading = false
      }
    });
  }
  // openAddForm() {
  //   const dialogRef = this._modalService.open(UserCurrentAddEditComponent, {
  //     data: { title: 'user current Year Modal' },
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
    const dialogRef = this._modalService.open(UserCurrentAddEditComponent, {
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
  changeCurrentUserSchoolYear(yearApiId: any) {
    console.log(yearApiId);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change current year!'
    }).then((result) => {
      if (result.isConfirmed) {

        let string = yearApiId.toString();
        let lastIndexOf = string.lastIndexOf('/');
        let yearId = string.substring(lastIndexOf+1)
        console.log(yearId);

        let userId = 3
        this._userService.setCurrentYear(yearId,userId).subscribe(
          {
            next:(res) => {
              Swal.fire(
                'Updated!',
                'Your current year  has been updated.',
                'success'
              );
              console.log(res);
              this.currentUserSchoolYear = res
              this.currentUserSchoolYearValue = this.currentUserSchoolYear.year
              this.getList()
            },
            error: (res) => {
              Swal.fire(
                'Updated!',
                'Your current year has not been updated.',
                'error'
              );
            }
          }
        )

        // this._schoolyearService.delete(yearId).subscribe({
        //   next:(res) => {
        //     Swal.fire(
        //       'Deleted!',
        //       'Your file has been deleted.',
        //       'success'
        //     );
        //     this.getList();
        //   },
        //   error: (res) => {
        //     Swal.fire(
        //       'Deleted!',
        //       'Your Item has not been deleted.',
        //       'success'
        //     );
        //   }
        // });
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

  changeCurrentApplicationSchoolYear(yearApiId: any) {
    console.log(yearApiId);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change current year!'
    }).then((result) => {
      if (result.isConfirmed) {

        let string = yearApiId.toString();
        let lastIndexOf = string.lastIndexOf('/');
        let yearId = string.substring(lastIndexOf+1)
        console.log(yearId);

        let userId = 3
        this._schoolyearService.setCurrentYear(yearId).subscribe(
          {
            next:(res) => {
              Swal.fire(
                'Updated!',
                'Your current application year  has been updated.',
                'success'
              );
              this.getList()
            },
            error: (res) => {
              Swal.fire(
                'Updated!',
                'Your current application year has not been updated.',
                'error'
              );
            }
          }
        )

        // this._schoolyearService.delete(yearId).subscribe({
        //   next:(res) => {
        //     Swal.fire(
        //       'Deleted!',
        //       'Your file has been deleted.',
        //       'success'
        //     );
        //     this.getList();
        //   },
        //   error: (res) => {
        //     Swal.fire(
        //       'Deleted!',
        //       'Your Item has not been deleted.',
        //       'success'
        //     );
        //   }
        // });
      }
    })
  }

}
