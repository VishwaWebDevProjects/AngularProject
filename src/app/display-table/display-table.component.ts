import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { PigsService } from '../pigs.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MoreInfoDialogComponent } from '../more-info-dialog/more-info-dialog.component';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})

export class DisplayTableComponent implements OnInit {
  pigs : any[];
  query: string = "";
  locationSorter = 1;
  reporterSorter = 1;
  statusSorter = 1;
  timeSorter = 1;
  TellEmBoi : string = ""
  locationDir;
  reporterDir;
  timeDir;
  statusDir;

  constructor(private http: HttpClient, private ps: PigsService, private dialog: MatDialog, private element: ElementRef) {}

  promptForPassword(pig, flag, target) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(password=>{
      if (password === undefined) {
        password = "messi";
      }
      this.http.get<Object>('https://api.hashify.net/hash/md5/hex?value='+password).subscribe((data:any)=>{
        if (data.Digest == "84892b91ef3bf9d216bbc6e88d74a77c") {
          if (flag == 0) {
            this.changeStatus(pig, target);
          } else {
            this.deletePig(pig, target);
          }
        }
      })
    })
  }

  changeTellEmBoiStatus() {
    this.TellEmBoi = "";
  }

  ngOnInit(): void {
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/').subscribe((data:any)=>{
        this.pigs = data;
    })
    this.TellEmBoi = "Hit 'Update' to see changes in table and map after adding or deleting or change status (if there are multiple reports of the same pig).";
    this.locationDir = "↑";
    this.reporterDir = "↑";
    this.timeDir = "↑";
    this.statusDir = "↑";
  }

  get() {
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/').subscribe((data:any)=>{
        this.pigs = data;
    })
  }

  sortLocation() {
    let sortedLocation;
    this.locationSorter++;
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/').subscribe((data:any)=>{
      if (this.locationSorter % 2 == 0) {
        this.locationDir = "↑";
        sortedLocation = this.pigs.sort((a:any, b:any)=>{
          if (a.data.locName > b.data.locName) {
            return 1
          } else {
            return -1
          }
        })
    } else {
      this.locationDir = "↓";
        sortedLocation = this.pigs.sort((a:any, b:any)=>{
          if (a.data.locName < b.data.locName) {
            return 1
          } else {
            return -1
          }
        })
      }
    }) 
  }

  sortReportedBy() {
    let sortedReporters;
    this.reporterSorter++;
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/').subscribe((data:any)=>{
      this.pigs = data;
      if (this.reporterSorter % 2 == 0) {
        this.reporterDir = "↑";
        sortedReporters = this.pigs.sort((a:any, b:any)=>{
          if (a.data.name > b.data.name) {
            return 1;
          } else {
            return -1;
          }
        })
        console.log("x: " + sortedReporters[0].data.name);
      } else {
        this.reporterDir = "↓";
        sortedReporters = this.pigs.sort((a:any, b:any)=>{
          if (a.data.name < b.data.name) {
            return 1;
          } else {
            return -1;
          }
        })
        console.log("y: " + sortedReporters[0].data.name);
      }
    })
  }

  sortTimeReported() {
    let sortedTime;
    this.timeSorter++;
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/').subscribe((data:any)=>{
      if (this.timeSorter % 2 == 0) {
        this.timeDir = "↑";
        sortedTime = this.pigs.sort((a:any, b:any)=>{
          if (a.data.addedOn > b.data.addedOn) {
            return 1;
          } else {
            return -1;
          }
        })
      } else {
        this.timeDir = "↓";
        sortedTime = this.pigs.sort((a:any, b:any)=>{
          if (a.data.addedOn < b.data.addedOn) {
            return 1;
          } else {
            return -1;
          }
        })
      }
    })
  }

  sortStatus() {
    let sortedStatus;
    this.statusSorter++;
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/').subscribe((data:any)=>{
      if (this.statusSorter % 2 == 0) {
        this.statusDir = "↑";
        sortedStatus = this.pigs.sort((a:any, b:any)=>{
          if (a.data.status > b.data.status) {
            return 1;
          } else {
            return -1;
          }
        })
      } else {
        this.statusDir = "↓";
        sortedStatus = this.pigs.sort((a:any, b:any)=>{
          if (a.data.status < b.data.status) {
            return 1;
          } else {
            return -1;
          }
        })
      }
    })
  }

  moreInfo(pig) {
    this.dialog.open(MoreInfoDialogComponent, {
      data: pig
    })
  }

  deletePig(pig, target) {
    this.http.delete('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/' + pig.addedOn  + '/').subscribe();
    this.updateLocInfo(pig);
  }

  updateLocInfo(pig) {
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/').subscribe((data:any)=>{
      let pigLocInfos = data;
      for (let i = 0; i < pigLocInfos.length; i++) {
        if (pigLocInfos[i].data.locName == pig.locName) {
          pigLocInfos[i].data.count = (pigLocInfos[i].data.count) - 1;
          if (pigLocInfos[i].data.count == 0) {
            this.http.delete('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/' + pigLocInfos[i].key).subscribe();
          } else {
            this.http.put('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/' + pigLocInfos[i].key + '/', {"key": pigLocInfos[i].key, "data": pigLocInfos[i].data}).subscribe();
          }
          break;
        }
      }
    })
  }

  changeStatus(pig, target) {
    pig.status = "Retrieved!"
    this.http.put('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/' + pig.addedOn  + '/', {"key": pig.addedOn, "data": pig}).subscribe();
    this.checkForOtherPigsWithSamePigID(pig);
  }

  checkForOtherPigsWithSamePigID(pig) {
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/').subscribe((data:any)=>{
      let pigs = data;
      for (let i = 0; i < pigs.length; i++) {
        if (pigs[i].data.pigID == pig.pigID) {
          if (pigs[i].data.status != "Retrieved!") {
            pigs[i].data.status = "Retrieved!";
            this.http.put('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/pigCollection/documents/' + pigs[i].key  + '/', {"key": pigs[i].key, "data": pigs[i].data}).subscribe();
          }
        }
      }
    })
  }

}