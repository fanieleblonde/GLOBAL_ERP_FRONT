import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CoreService} from "../../../../core/core.service";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {Country} from "../../../school/interface/country";
import {CountryAddEditComponent} from "./country-add-edit/country-add-edit.component";
import {CountryService} from "../../../school/services/country.service";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {
  displayedColumns: string[] = [
    'select',
    'alpha2',
    'alpha3',
    'numericCode',
    'name',
    'officialName',
    'actions'
  ];

  selectedIds: number[] = [];

  public isButtonVisible = false;

  public country!: Country[];
  dataSource!: MatTableDataSource<Country>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private _countryService: CountryService,
    private _coreService: CoreService,
    private _modalService: MdbModalService,
  ) {}
  ngOnInit() {
    this.getStatusList();
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
  getStatusList(){
    this._countryService.getList().subscribe({
      next: (res: any) => {
        this.country = res['hydra:member'];
        console.log(this.country);

        this.dataSource = new MatTableDataSource(this.country)
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
    const dialogRef = this._modalService.open(CountryAddEditComponent, {
      data: { title: 'country Modal' },
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (val) => {
        if (val){
          this.getStatusList();
        }
      }
    })
  }

  openEditForm(data: any){
    const dialogRef = this._modalService.open(CountryAddEditComponent, {
      data: {data: data},
      'ignoreBackdropClick': true,
    });

    dialogRef.onClose.subscribe({
      next: (value) => {
        if (value){
          this.getStatusList()
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
        this._countryService.delete(id).subscribe({
          next:(res) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.getStatusList();
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
