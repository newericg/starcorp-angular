import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { PessoasService } from '../../../core/services/pessoas.service';
import { ApiHttpService } from '../../../core/services/api-http.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppToastService } from '../../../core/services/toast.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { EnderecoService } from '../../../core/services/enderecos.service';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgbDatepickerModule,
    NgbAlertModule, FormsModule, JsonPipe, TableComponent, HttpClientModule,
    CommonModule, NgxMaskDirective, NgxMaskPipe, NgbToastModule, ToastComponent],
  providers: [PessoasService, ApiHttpService, provideNgxMask()],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit, AfterViewChecked {
  constructor(
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private pessoasService: PessoasService,
    private enderecoService: EnderecoService,
    private route: ActivatedRoute,
    public toastService: AppToastService,
    private readonly changeDetectorRef: ChangeDetectorRef
    
  ) { }

  @Input() pessoaData: any
  @Input() pageTitle!: string

  pessoaForm!: FormGroup;
  enderecoForm!: FormGroup;
  loading: boolean = false;
  showToast: boolean = false;
  pessoaName: string = '';
  pessoaId!: any
  enderecoValidation!: boolean

  enderecoTitle: string[] = ['Logradouro', 'Número', 'Bairro', 'Cidade-UF', '']
  enderecoItemOrder: string[] = ['logradouro', 'numero', 'bairro', 'cidade']
  enderecoList: any

  model!: NgbDateStruct;

  ngOnInit(): void {
    this.pessoaId = this.route.snapshot.paramMap.get('id');
    this.createFormPessoa()
    this.createFormEndereço()
    this.loadPessoaData()
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }


  createFormPessoa() {
    this.pessoaForm = new FormGroup({
      nome: new FormControl("", [Validators.required]),
      idade: new FormControl("", [Validators.required, Validators.maxLength(3)]),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      dataNascimento: new FormControl("", [Validators.required]),
      telefone: new FormControl("", [Validators.required, Validators.minLength(10)]),
      celular: new FormControl("", [Validators.required, Validators.minLength(11)]),
    })
  }

  setFormPessoa() {
    let date = {
      year: parseInt(this.pessoaData.dataNascimento.substr(0, 4)),
      month: parseInt(this.pessoaData.dataNascimento.substr(5, 2)),
      day: parseInt(this.pessoaData.dataNascimento.substr(8, 2)),
    }
    
    this.pessoaForm.setValue({
      nome: this.pessoaData.nome,
      idade: this.pessoaData.idade,
      email: this.pessoaData.email,
      dataNascimento: date,
      telefone: this.pessoaData.telefone,
      celular: this.pessoaData.celular,
    })
  }

  createFormEndereço() {
    let pessoaIdNumber
    if (this.pessoaId) {
      pessoaIdNumber = parseFloat(this.pessoaId)
    }
    this.enderecoForm = new FormGroup({
      pessoaId: new FormControl(pessoaIdNumber),
      logradouro: new FormControl("", [Validators.required]),
      numero: new FormControl("", [Validators.required]),
      bairro: new FormControl("", [Validators.required]),
      cidade: new FormControl("", [Validators.required]),
      uf: new FormControl("", [Validators.required, Validators.maxLength(2)]),
    })
  }


  loadPessoaData() {
    if (this.pessoaId) {
      this.loading = true
      this.pessoasService.getPessoa(this.pessoaId).subscribe((res) => {
        this.pessoaData = res
        this.setFormPessoa()
        this.loading = false
        this.loadEnderecoTable(this.pessoaId)
      })
    }
  }

  loadEnderecoTable(id: any) {
    this.loading = true
    this.enderecoService.getEnderecos(id).subscribe({
      next: (data: any) => {
        this.enderecoList = data
        this.loading = false
      },
      error: (err: any) => {
        this.loading = false
      }
    })
  }

  deleteEndereco(id: any) {
    this.enderecoService.deleteEndereco(id).subscribe(() => {
      window.location.reload()
    })
  }

  dateFormatFix() {
    let date = this.pessoaForm.get('dataNascimento')?.value
    if (date) {
      let dateString = this.ngbDateParserFormatter.format(date)
      dateString ? this.pessoaForm.get('dataNascimento')?.patchValue(new Date(dateString).toISOString()) : null
    }
  }

  onSubmit() {
    this.dateFormatFix()
    if (this.pessoaId) {
      this.pessoasService.putPessoa(this.pessoaForm.value, this.pessoaId)
      this.setFormPessoa()

    } else {
      this.pessoasService.postPessoas(this.pessoaForm.value, this.pessoaForm)
    }

  }

  onSubmitEndereco() {
    this.enderecoService.postEndereco(this.enderecoForm.value)
    window.location.reload()
  }



}
