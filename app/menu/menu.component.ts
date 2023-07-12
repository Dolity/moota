import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { DataPassService } from '../data-pass.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class MenuComponent implements OnInit {

  displayBasic : boolean | undefined ;
  displayBasic2 : boolean | undefined ;
  displayBasic3 : boolean | undefined ;

  result : any
  menu : any = [];
  id : number = 0;
  idxL : number = 0;
  uId : number = 0;
  kId : number = 0;
  xId : number = 0;
  nameMenu : any [] = ['เครื่องดื่มรีฟิล','ไอศครีมไม่อั้น','ชุดเล็กอิ่มคุ้ม','ชุดใหญ่อิ่มแน่น'];
  kName : any ;
  amount : number[] = [1,1,1,1];
  price : number[] = [30,50,59,129];
  sum : number[] = [0,0,0,0];
  sumMix : number[] = [0,0,0,0];
  sumF : number = 0;
  kLength : number = 0;
  cIndex : number[] = [0,0,0,0];
  pullID : number = 0;
  foodL : any ;
  amountL : number = 1;
  datapT : any ;
  kDate : any;
  kSum : number =0;


  checkMenu : boolean[] = [false,false,false,false];

  constructor(private http: HttpClient, private confirmationService: ConfirmationService, private messageService: MessageService, private dataP: DataPassService) {

    this.selectData();
  }

  showBasicDialog(kName : String,uId : number) {

    this.uId = uId;
    this.nameMenu[uId] = kName;
    this.amount[uId] = this.amount[uId];

    if(this.checkMenu[this.uId] == false){

      this.amount[this.uId] = 1;

    }else{
      for (let i = 0; i < this.menu.length; i++) {
        if (this.uId == this.menu[i].idxL) {
          this.uId = this.menu[i].idxL;
          this.amount[this.uId] = +this.menu[i].amountL; //+set to int
        }
      }
      console.log(this.uId,"uid");
      console.log(this.amount[uId],"amount");
    }

    this.displayBasic = true;

  }

  increasePlus(uId : number) {

    this.amount[uId] = this.amount[uId] + 1;
    console.log(this.amount);
  }

  decreaseMinus(uId : number) {

    this.amount[uId] = this.amount[uId] - 1;
    if (this.amount[uId] < 1){
      this.amount[uId] = 1;
    }
  }

  increasePlus2(idxL : number) {
    this.amount[idxL] ++;
    console.log(this.amount[idxL])
  }

  decreaseMinus2(idxL : number) {
    this.amount[idxL] = this.amount[idxL] - 1;
    if (this.amount[idxL] < 1){
      this.amount[idxL] = 1;
    }
  }

  show(){
    this.insertData();
  }

  showBasicDialog2(foodL : any, amountL : number, idxL : number, row : number) {

    console.log("Amount : " + amountL);
    this.xId = idxL;
    this.foodL = foodL;
    console.log("amountL : "+typeof + amountL);
    this.amount[idxL] = amountL;
    this.amountL = amountL;


    this.displayBasic2 = true;

    console.log(this.xId,"dia2 UID");

  }

  insertData() {
    console.log(this.checkMenu[this.uId],"uid");
    if (this.checkMenu[this.uId] == true) {
      this.updateData(this.uId);
    }else{
        let json =
      {idxL : this.uId,
      foodL : this.nameMenu[this.uId],
      priceL : this.price[this.uId],
      amountL : this.amount[this.uId]};

    this.http.post('http://localhost:80/EXwebSV/insertfood',JSON.stringify(json)) //แปลงข้อมูลเป็นจาก J -> S
    .subscribe((response:any) => {

        this.checkMenu[this.uId] = false;
        console.log(this.checkMenu[this.uId],"ckLAST");

      this.selectData();
      console.log(response)
      console.log(json)
      this.displayBasic = false;
    },
    (error: any) => {
      console.log(error);

    });
    }

}

insertBill() {
  let json =
  {idB : this.kId,
  dateB : this.dataP.dataPass,
  sumB : this.sumF,
  data : JSON.stringify(this.menu)
  };

this.http.post('http://localhost:80/EXwebSV/insertbill',JSON.stringify(json)) //แปลงข้อมูลเป็นจาก J -> S
.subscribe((response:any) => {

  this.delDataALL();
  this.selectData();
  console.log(response)
  console.log(json)
  this.displayBasic3 = false;
},
(error: any) => {
  console.log(error);
});
}

  selectData() {
    this.http.get('http://localhost:80/EXwebSV/food')
    .subscribe((response:any) => {
      this.menu = response;

      this.kLength = this.menu.length;

      let amm: any,summ = 0;
      for (let i = 0; i < this.menu.length; i++) {
        summ += this.menu[i].priceL * this.menu[i].amountL;

        amm = this.menu[i].idxL;
        this.checkMenu[amm] = true;
      }
      this.sumF = summ;

    },
    (error: any) =>{
      console.log(error);
    });
  }

  updateData(idxL : number) {
    let json =
    {
      amountL : this.amount[this.xId]
    };
    console.log(this.idxL,"uid");
    console.log(this.amount[this.xId],"am");

    this.http.post('http://localhost:80/EXwebSV/updatefood/'+ this.xId ,JSON.stringify(json))
    .subscribe((response:any) => {

      this.selectData();
      this.displayBasic2 = false;
    },
    (error: any) =>{
      console.log(error);
    });

  }

  delData() {

  this.confirm();
  this.http.delete('http://localhost:80/EXwebSV/delfood/' + this.xId)

  .subscribe((response:any) => {


    this.selectData();
    this.displayBasic2 = false;
    console.log(this.uId,"UID:");
    console.log(response)

  },
  (error: any) => {
    console.log(error);
  });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'ยืนยันการลบรายการอาหาร?',
      header: 'ยืนยัน',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

          this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});


      },
      reject: (type: any) => {
        switch(type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            break;
        }
    }
  });
  }

  delDataALL() {

    this.http.delete('http://localhost:80/EXwebSV/delfoodALL')

    .subscribe((response:any) => {


      this.displayBasic2 = false;

    },
    (error: any) => {
      console.log(error);
    });
  }

  confirm2() {
    this.confirmationService.confirm({
      message: 'ยืนยันการชำระรายการอาหาร?',
      header: 'ยืนยัน',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

          this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
      this.displayBasic3 = true;

      },
  });
  }

  showBasicDialog3(kName : String,uId : number) {

    this.uId = uId;
    this.nameMenu[uId] = kName;
    this.amount[uId] = this.amount[uId];

    this.displayBasic3 = true;

  }

  ngOnInit(): void {
  }

}
