import { BackendService } from './../backend.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-weight-input',
  templateUrl: './weight-input.component.html',
  styleUrls: ['./weight-input.component.css']
})
export class WeightInputComponent implements OnInit {
  public weightForm: FormGroup;
  error = '';
  constructor(private http: BackendService) { }

  ngOnInit() {
    this.weightForm = new FormGroup({
      weight: new FormControl('', [Validators.required])
    });
  }

  submitWeight(form) {
    console.log(form.weight);
    this.http.logWeight(form.weight).subscribe(() => {}, (err) => {
      this.error = err.message;
      console.log(err.message);
    });
    this.weightForm.reset();
    this.weightForm.markAsPristine();
  }
}
