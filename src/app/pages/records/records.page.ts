import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/models/record';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnInit {

  public clasificacion: Record[] = [];

  constructor(private recordService: RecordService) { }

  ngOnInit() {
    this.cargarRecord();
  }

  cargarRecord(){
    this.recordService.getRecord().subscribe((res: Record[]) =>{
      this.clasificacion = [...res];
      
    })
  }

}
