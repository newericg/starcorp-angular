import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { ApiHttpService } from '../../../core/services/api-http.service';
import { EnderecoService } from '../../../core/services/enderecos.service';
import { PessoasService } from '../../../core/services/pessoas.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [FormComponent, ToastComponent],
  providers: [PessoasService, ApiHttpService, EnderecoService],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {

}
