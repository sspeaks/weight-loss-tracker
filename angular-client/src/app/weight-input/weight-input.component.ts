import { BackendService } from './../backend.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-weight-input',
  templateUrl: './weight-input.component.html',
  styleUrls: ['./weight-input.component.css']
})
export class WeightInputComponent implements OnInit, AfterViewInit {
  public weightForm: FormGroup;
  error = '';
  update = new Subject()

  $weights = this.update.pipe(
      switchMap(() => this.getWeights())
    );

  constructor(private http: BackendService) { }

  ngOnInit() {
    this.weightForm = new FormGroup({
      weight: new FormControl('', [Validators.required])
    });
  }


  ngAfterViewInit(): void {
    this.update.next();
  }

  submitWeight(form) {
    console.log(form.weight);
    this.http.logWeight(form.weight).subscribe(() => { 

      this.update.next();
    }, (err) => {
      this.error = err.message;
      console.log(err.message);
    });
    this.weightForm.reset();
    this.weightForm.markAsPristine();
  }

  getWeights() {
    return this.http.getWeights().pipe(map(weights => weights.map(item => item.weight).join(', ')));
  }
}
