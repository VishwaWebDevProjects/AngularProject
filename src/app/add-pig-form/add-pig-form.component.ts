import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, NgForm, FormGroupDirective} from '@angular/forms';
import { Router } from '@angular/router';
import { PigsService } from '../pigs.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-add-pig-form',
  templateUrl: './add-pig-form.component.html',
  styleUrls: ['./add-pig-form.component.css']
})

export class AddPigFormComponent implements OnInit {
  form: FormGroup;
  formDirective: FormGroupDirective;

  showForm: boolean = false;
  showExistingLoc: boolean = false;
  newLocation:boolean = true;

  noErrorsPresent: boolean = false;
  ErrorMessage: string = "";

  pigLocs = [];
  selectedLocation : string;

  constructor(private pigs: PigsService, private http: HttpClient, private router: Router) {
    let formControls = {
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      pigBreed: new FormControl('', [Validators.required]),
      pigID: new FormControl('', [Validators.required]),
      locName: new FormControl('', [Validators.required]),
      locLong: new FormControl('', [Validators.required]),
      locLat: new FormControl('', [Validators.required]),
      extraInfo: new FormControl('', [])
    }
    this.form = new FormGroup(formControls)
  }

  checkPhone() {
    if (this.form.get('phone').value.toString().length != 10) {
      this.ErrorMessage = "Please enter a phone number of exactly length 10."
      this.noErrorsPresent = false;
    } else {
      this.noErrorsPresent = true;
      this.ErrorMessage = ""
    }
  }
  
  toggleShow() {
    this.ngOnInit();
    this.resetForm();
  }

  resetForm() {
    this.ErrorMessage = ""
    this.form.reset();
    this.form.updateValueAndValidity();
    this.showForm = !this.showForm;
  }

  resetDetails() {
    this.form.get('locName').reset();
    this.form.get('locLong').clearValidators();
    this.form.get('locLong').reset();
    this.form.get('locLat').clearValidators();
    this.form.get('locLat').reset();
  }

  changeLocStatus() {
    this.newLocation = this.showExistingLoc;
    this.showExistingLoc = !this.showExistingLoc;

    if (this.showExistingLoc) {
      let formControls = {
        name: new FormControl(this.form.get('name').value, [Validators.required]),
        phone: new FormControl(this.form.get('phone').value, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
        pigBreed: new FormControl(this.form.get('pigBreed').value, [Validators.required]),
        pigID: new FormControl(this.form.get('pigID').value, [Validators.required]),
        locName: new FormControl(this.form.get('locName').value, [Validators.required]),
        locLong: new FormControl('', []),
        locLat: new FormControl('', []),
        extraInfo: new FormControl(this.form.get('extraInfo').value, [])
      }
      this.form = new FormGroup(formControls)
    } else {
      let formControls = {
        name: new FormControl(this.form.get('name').value, [Validators.required]),
        phone: new FormControl(this.form.get('phone').value, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
        pigBreed: new FormControl(this.form.get('pigBreed').value, [Validators.required]),
        pigID: new FormControl(this.form.get('pigID').value, [Validators.required]),
        locName: new FormControl('', [Validators.required]),
        locLong: new FormControl('', [Validators.required]),
        locLat: new FormControl('', [Validators.required]),
        extraInfo: new FormControl(this.form.get('extraInfo').value, [])
      }
      this.form = new FormGroup(formControls)
    }
  }

  ngOnInit(): void {
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/').subscribe((data:any)=>{
        this.pigLocs = data;
    })
    let formControls = {
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      pigBreed: new FormControl('', [Validators.required]),
      pigID: new FormControl('', [Validators.required]),
      locName: new FormControl('', [Validators.required]),
      locLong: new FormControl('', [Validators.required]),
      locLat: new FormControl('', [Validators.required]),
      extraInfo: new FormControl('', [])
    }
    this.form = new FormGroup(formControls)
    this.noErrorsPresent = false;
    this.ErrorMessage = "";
  }

  changeVal() {
    let lat;
    let long;
    this.form.controls['locName'].setValue(this.selectedLocation);
    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/').subscribe((data:any)=>{
      let pigLocInfos = data;
      for (let i = 0; i < pigLocInfos.length; i++) {
        if (pigLocInfos[i].data.locName == this.selectedLocation) {
          lat = pigLocInfos[i].data.locLat;
          long = pigLocInfos[i].data.loclang;
          break;
        }
      }
    })
  }

  onSubmit(value) {
    if (this.showExistingLoc) {
      this.pigs.updateExistingLoc(value);
    } else {
      this.pigs.addNewLoc(value);
    }
    this.resetForm();
  }
}
