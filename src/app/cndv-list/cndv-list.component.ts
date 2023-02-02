import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Cndv } from '../cndv';
import { CndvService } from '../cndv.service';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-cndv-list',
  templateUrl: './cndv-list.component.html',
  styleUrls: ['./cndv-list.component.css']
})
export class CndvListComponent implements OnInit {


  cities = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys', disabled: true }
  ];


  term : String;
  cndvs: Cndv[];
  pageSizes = [5, 10, 50, 100];
  pageSize: number = 5;
  pageNumber: number = 0;
  dCDSDrequest: object;
  dCDSDPageRequest: object;
  dCDSDDateRequest: object;
  request: object;
  totalPagination: number;
  form: Object;

  constructor(private cndvService: CndvService,
    private httpClient: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.dCDSDDateRequest = {};
    this.dCDSDrequest = {};
    this.getCndvs();
  }

  private getCndvs() {
    if (this.pageNumber >= this.totalPagination && this.pageNumber > 0) {
      this.pageNumber = this.totalPagination - 1;
    }
    else if (this.pageNumber < 0) {
      this.pageNumber = 0;
    }
    this.dCDSDPageRequest = { pageNumber: this.pageNumber, pageSize: this.pageSize };
    this.request = { 'dCDSD': this.dCDSDrequest, 'dcdsdPageRequest': this.dCDSDPageRequest, 'dateDto': this.dCDSDDateRequest };
    console.log(this.request);
    this.cndvService.getCndvsList(this.request).pipe(map(result => result['data'])).subscribe(data => {
      this.cndvs = data.content;
      this.totalPagination = data.totalPages;
      if (this.totalPagination == 0) {
        alert("No Data Exist !!! ");
        this.dCDSDDateRequest = {};
        this.dCDSDrequest = {};
        console.log(this.request);
        this.getCndvs();
      }
    });
  }

  searchCndvs(ma: any, tenNgan: any, diaChiCn: any, tenDayDu: any, lienHeDienToan: any, lienHeKeToan: any, maSoThue: any, ngayTaoFrom: Date, ngayTaoTo: Date): void {
    this.form = { 'ma': ma.toLowerCase(), 'tenNgan': tenNgan.toLowerCase(), 'diaChiCn': diaChiCn.toLowerCase(), 'tenDayDu': tenDayDu.toLowerCase(), 'lienHeDienToan': lienHeDienToan.toLowerCase(), 'lienHeKeToan': lienHeKeToan.toLowerCase(), 'maSoThue': maSoThue.toLowerCase() };
    this.dCDSDrequest = this.form;

    const ngayTaoF = new DatePipe('en-US').transform(ngayTaoFrom, 'yyyy-MM-dd');
    const ngayTaoT = new DatePipe('en-US').transform(ngayTaoTo, 'yyyy-MM-dd');
    this.dCDSDDateRequest = { 'ngayTaoFrom': ngayTaoF, 'ngayTaoTo': ngayTaoT };


    this.pageNumber = 0;
    this.getCndvs();

  }

  updateCndv(cndvUpdate: any) {
    this.cndvService.setData(cndvUpdate);
    this.router.navigate(['update-cndvs']);
  }

  deleteCndv(cndvDelete: any) {
    this.cndvService.deleteCndv(cndvDelete).pipe(map(result => result['data'])).subscribe(data => {
      alert(data);
      this.pageNumber = 0;
      this.dCDSDDateRequest = {};
      this.dCDSDrequest = {};
      this.getCndvs();
    })
  }

  updatePageSize(e: any) {
    this.pageSize = e.target.value;
    this.getCndvs();
  }

  nextPaging() {
    this.pageNumber += 1;
    this.getCndvs();
  }

  firstPage() {
    this.pageNumber = 0;
    this.getCndvs();
  }

  previousPaging() {
    this.pageNumber = this.pageNumber - 1;
    this.getCndvs();
  }

  lastPage() {
    this.pageNumber = this.totalPagination - 1;
    this.getCndvs();
  }

  homeCndv() {
    this.pageNumber = 0;
    this.dCDSDDateRequest = {};
    this.dCDSDrequest = {};
    this.getCndvs();
  }


}
