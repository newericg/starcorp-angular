import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})
export class DatepickerComponent {
  @Input()
  formControlName!: string;


}
