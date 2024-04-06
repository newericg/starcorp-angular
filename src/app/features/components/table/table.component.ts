import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  dataExample = [
    {
      pessoaId: 0,
      nome: 'string111',
      dataNascimento: '2024-04-05T06:05:35.675Z',
      idade: 22,
      email: 'user@example.com',
      telefone: 'string',
      celular: 'string',
      cadastro: '2024-04-05T06:05:35.675Z',
      alteracao: '2024-04-05T06:05:35.675Z'
    },
    {
      pessoaId: 1,
      nome: 'string111',
      dataNascimento: '2024-04-05T06:05:35.675Z',
      idade: 25,
      email: 'user@example.com',
      telefone: 'string',
      celular: 'string',
      cadastro: '2024-04-05T06:05:35.675Z',
      alteracao: '2024-04-05T06:05:35.675Z'
    },
    {
      pessoaId: 2,
      nome: 'string111',
      dataNascimento: '2024-04-05T06:05:35.675Z',
      idade: 33,
      email: 'user@example.com',
      telefone: 'string',
      celular: 'string',
      cadastro: '2024-04-05T06:05:35.675Z',
      alteracao: '2024-04-05T06:05:35.675Z'
    }
  ]

}
