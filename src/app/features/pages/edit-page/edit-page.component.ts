import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PessoasService } from '../../../core/services/pessoas.service';
import { ApiHttpService } from '../../../core/services/api-http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from '../../components/form/form.component';
import { EnderecoService } from '../../../core/services/enderecos.service';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [HttpClientModule, FormComponent],
  providers: [PessoasService, ApiHttpService, EnderecoService],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})
export class EditPageComponent implements OnInit {

  constructor(
  ) {}


  ngOnInit(): void {
    
  }


}
