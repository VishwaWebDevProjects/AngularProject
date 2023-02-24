import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class PigsService implements OnInit {
  pigs = []
  pigLocInfos = []

  ngOnInit(): void {
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/').subscribe((data:any)=>{
        this.pigLocInfos = data;
    })
  }

  constructor(private http: HttpClient){}

  add(pig) {
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/').subscribe((data:any)=>{
      this.pigLocInfos = data;
      for (let i = 0; i < this.pigLocInfos.length; i++) {
        if (this.pigLocInfos[i].data.locName == pig.locName) {
          pig.locLat = this.pigLocInfos[i].data.locLat;
          pig.locLang = this.pigLocInfos[i].data.locLang;
          break;
        }
      }
    })
    pig.addedOn = (new Date()).getTime();
    pig.status = "Ready For Pickup!";
    this.pigs.push(pig);
    this.http.post('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/', {"key":pig.addedOn , "data":pig}).subscribe();
  }

  updateExistingLoc(pig) {
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/').subscribe((data:any)=>{
      this.pigLocInfos = data;
      for (let i = 0; i < this.pigLocInfos.length; i++) {
        if (this.pigLocInfos[i].data.locName == pig.locName) {
          this.pigLocInfos[i].data.count = (this.pigLocInfos[i].data.count) + 1;
          this.http.put('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/' + this.pigLocInfos[i].key  + '/', {"key": this.pigLocInfos[i].key, "data": this.pigLocInfos[i].data}).subscribe();
          
          pig.locLat = this.pigLocInfos[i].data.locLat;
          pig.locLong = this.pigLocInfos[i].data.locLong;
          pig.addedOn = (new Date()).getTime();
          pig.status = "Ready For Pickup!";
          this.pigs.push(pig);
          this.http.post('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/', {"key":pig.addedOn , "data":pig}).subscribe();
          break;
        }
      }
    })
  }

  addNewLoc(pig) {
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/').subscribe((data:any)=>{
      this.pigLocInfos = data;
      for (let i = 0; i < this.pigLocInfos.length; i++) {
        if (this.pigLocInfos[i].data.locName == pig.locName) {
          this.pigLocInfos[i].data.count = (this.pigLocInfos[i].data.count) + 1;
          this.http.put('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/' + this.pigLocInfos[i].key  + '/', {"key": this.pigLocInfos[i].key, "data": this.pigLocInfos[i].data}).subscribe();

          pig.addedOn = (new Date()).getTime();
          pig.status = "Ready For Pickup!";
          this.pigs.push(pig);
          this.http.post('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/', {"key":pig.addedOn , "data":pig}).subscribe();
          return;
        }
      }
    })

    let pigLocInfo = {
      locName: pig.locName,
      locLong: pig.locLong,
      locLat: pig.locLat,
      count: 1
    }

    pig.addedOn = (new Date()).getTime();
    pig.status = "Ready For Pickup!";
    this.pigs.push(pig);
    this.http.post('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/', {"key":pig.addedOn , "data":pig}).subscribe();
    this.http.post('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/', {"key":pigLocInfo.locName.replace(/\s/g, ""), "data":pigLocInfo}).subscribe();
  }
}
