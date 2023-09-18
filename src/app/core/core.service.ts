import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar, private toastr: ToastrService) { }

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action,{
      duration: 1800,
      verticalPosition: 'top'
    });
  }

  showSuccess(message: any, title: any){
    this.toastr.success(message, title)
  }

  showError(message: any, title: any){
    this.toastr.error(message, title)
  }

  showInfo(message: any, title: any){
    this.toastr.info(message, title)
  }

  showWarning(message: any, title: any){
    this.toastr.warning(message, title)
  }

}
