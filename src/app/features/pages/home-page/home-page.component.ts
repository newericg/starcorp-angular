import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PessoasService } from '../../../core/services/pessoas.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiHttpService } from '../../../core/services/api-http.service';
import { EnderecoService } from '../../../core/services/enderecos.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TableComponent, ModalComponent, RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule, CommonModule],
  providers: [PessoasService, ApiHttpService, EnderecoService],
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

  loading: boolean = false

  ngOnInit(): void {
    this.loadPessoas()
  }

  deletePessoa(id: any) {
    this.pessoasService.deletePessoa(id).subscribe((res) => {
      this.loadPessoas()
    }) 
  }

  loadPessoas() {
    this.loading = true
    this.pessoasService.getPessoas().subscribe((res) => {
      this.data = res
      this.loading = false
    })
  }

  

}
