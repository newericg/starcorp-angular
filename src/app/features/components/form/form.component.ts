import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  constructor() {}


  ngOnInit(): void {
    this.createForm()
  }

  pessoaForm!: FormGroup;

  createForm() {
    this.pessoaForm = new FormGroup({
      nome: new FormControl("", [Validators.required]),
      idade: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      dataNascimento: new FormControl("", [Validators.required]),
      telefone: new FormControl("", [Validators.required]),
      celular: new FormControl("", [Validators.required]),
    })
  }

}
