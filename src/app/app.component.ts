import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColGroupDef, ColumnApi, GridReadyEvent } from 'ag-grid-community';

export interface Employee{
  "id": number;
  "employee_name": string;
  "employee_salary": number;
  "employee_age": number;
  "profile_image": string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'columnStateAgGrid';
  rowData!: Employee[];
  url: string = '/assets/tableData.json';
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridApi!: ColumnApi;
  columnState: any;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'id', headerName: 'Id', filter: 'agNumberColumnFilter', floatingFilter: true,suppressMenu: true,unSortIcon: true,},
    { field: 'employee_name', headerName: 'Name', filter: 'agTextColumnFilter', floatingFilter: true,suppressMenu: true,unSortIcon: true,},
    { field: 'employee_salary', headerName: 'Salary', filter: 'agNumberColumnFilter', floatingFilter: true,suppressMenu: true,unSortIcon: true, },
    { field: 'employee_age', headerName: 'Age', filter: 'agNumberColumnFilter', floatingFilter: true,suppressMenu: true,unSortIcon: true, },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
    suppressMenu: true,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.url).subscribe((res: any) => {
      this.rowData = res;
    });
  }

  onGridReady(params: GridReadyEvent<any>){
    this.gridApi = params.columnApi;
  }

  saveGridState() {
    //Get the exact state of grid using the below func
    this.columnState = this.gridApi.getColumnState();
    console.log(this.columnState)
  }

  resetGridState() {
    //resets all the changes done by user
    this.gridApi.resetColumnState();
  }
}
