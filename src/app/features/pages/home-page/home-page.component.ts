import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PessoasService } from '../../../core/services/pessoas.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiHttpService } from '../../../core/services/api-http.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TableComponent, ModalComponent, RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule, CommonModule],
  providers: [PessoasService, ApiHttpService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  constructor(
    private pessoasService: PessoasService
  ) {

  }

  data: any

  pessoasTitle: string[] = ['Nome', 'Idade', 'Data de Nascimento', 'Email', 'Telefone', 'Celular', 'Opções']
  pessoasItemOrder: string[] = ['nome', 'idade', 'dataNascimento', 'email', 'telefone', 'celular']

  loading: boolean = true

  ngOnInit(): void {
    this.pessoasService.getPessoas().subscribe((res) => {
      this.data = res
      this.loading = false
    })
  }

  

}
