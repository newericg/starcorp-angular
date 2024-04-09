import { Component, Injectable, Input } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AppToastService } from '../../../core/services/toast.service';


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgbToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
@Injectable({ providedIn: 'root' })

export class ToastComponent {

  constructor(public toastService: AppToastService) {}

}
