import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataPassService } from '../data-pass.service';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  menu : any[] = [];
  KJsonDATA : any[] = [];
  kLength : any ;
  sumF : number = 0 ;
  idB : number = 0;
  sort : number = 0;

  constructor(private dataP : DataPassService, private router : ActivatedRoute, private http: HttpClient) {
    this.selectBill();

    // this.menu = dataP.dataPass
    console.log(dataP.dataPass);
    // console.log(this.menu);
  }

  selectBill() {
    this.http.get('http://localhost:80/EXwebSV/bill')
    .subscribe((response:any) => {
      this.menu = response;
      console.log(this.menu,"ID");


    },
    (error: any) =>{
      console.log(error);
    });
  }

  selectBillmenu(sort : number) {

    this.http.get('http://localhost:80/EXwebSV/bill/'+ sort)
    .subscribe((response:any) => {
      let keepR = response;

      this.KJsonDATA = JSON.parse(keepR[0].data);
      this.kLength = this.KJsonDATA.length;
      let summ = 0;
      for (let i = 0; i < this.KJsonDATA.length; i++) {
        summ += this.KJsonDATA[i].priceL * this.KJsonDATA[i].amountL;
      }
      this.sumF = summ;

      console.log(keepR[0].data);
    },
    (error: any) =>{
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

}
