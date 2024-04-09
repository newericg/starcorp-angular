import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { DatepickerComponent } from '../../../shared/components/datepicker/datepicker.component';
import { TableComponent } from '../table/table.component';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { PessoasService } from '../../../core/services/pessoas.service';
import { ApiHttpService } from '../../../core/services/api-http.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgbDatepickerModule,
    NgbAlertModule, FormsModule, JsonPipe, DatepickerComponent, TableComponent, HttpClientModule, CommonModule],
  providers: [PessoasService, ApiHttpService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  constructor(
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private pessoasService: PessoasService,
    private route: ActivatedRoute
  ) { }

  @Input() pessoaData: any

  pessoaForm!: FormGroup;
  enderecoForm!: FormGroup;

  loading: boolean = false

  enderecoTitle: string[] = ['Logradouro', 'Número', 'Bairro', 'Cidade-UF', '']
  enderecoItemOrder: string[] = ['logradouro', 'numero', 'bairro', 'cidade' + 'uf']

  readonly DELIMITER = '/';
  model!: NgbDateStruct;

  ngOnInit(): void {
    console.log(this.pessoaData)
    this.createFormPessoa()
    this.createFormEndereço()
    this.loadPessoaData()
  }


  createFormPessoa() {
    this.pessoaForm = new FormGroup({
      nome: new FormControl("", [Validators.required]),
      idade: new FormControl({ value: '', disabled: true}),
      email: new FormControl("", [Validators.required]),
      dataNascimento: new FormControl("", [Validators.required]),
      telefone: new FormControl("", [Validators.required]),
      celular: new FormControl("", [Validators.required]),
    })
  }

  setFormPessoa() {
    this.pessoaForm.setValue({
      nome: this.pessoaData.nome,
      idade: this.pessoaData.idade,
      email: this.pessoaData.email,
      dataNascimento: this.pessoaData.dataNascimento,
      telefone: this.pessoaData.telefone,
      celular: this.pessoaData.celular,
    })
  }

  createFormEndereço() {
    this.enderecoForm = new FormGroup({
      logradouro: new FormControl("", [Validators.required]),
      numero: new FormControl("", [Validators.required]),
      bairro: new FormControl("", [Validators.required]),
      cidade: new FormControl("", [Validators.required]),
      uf: new FormControl("", [Validators.required]),
    })
  }

  loadPessoaData() {
    this.loading = true
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pessoasService.getPessoa(id).subscribe((res) => {
        this.pessoaData = res
        this.setFormPessoa()
        this.loading = false
      })
    }
    
  }

  onSubmit() {
    let date = this.pessoaForm.get('dataNascimento')?.value
    let dateString = this.ngbDateParserFormatter.format(date)
    // let dateFormatFixed = new Date(dateString).toISOString()

    dateString ? this.pessoaForm.get('dataNascimento')?.patchValue(new Date(dateString).toISOString()) : null
    
    
    console.log(this.pessoaForm)
    // this.pessoasService.postPessoas(this.pessoaForm.value)







    // var forms = document.querySelectorAll('.needs-validation-pessoa')
    // Array.prototype.slice.call(forms)
    //   .forEach(function (form) {
    //     form.addEventListener('submit', function (event: any) {
    //       if (!form.checkValidity()) {
    //         event.preventDefault()
    //         event.stopPropagation()
    //       }
    //       form.classList.add('was-validated')
    //     }, false)
    //   })
  }



}
