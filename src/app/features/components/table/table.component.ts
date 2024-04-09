import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  constructor() { }

  @Input() dataTable: any
  @Input() tableTitles: string[] = []
  @Input() tableItemOrder: string[] = []
  @Input() editButton!: boolean
  @Input() classStyles!: string
  @Input() elementToBeDeleted!: string


  @Output() deleteElementId = new EventEmitter<string>();

  deleteElement(id: string, name: string) {
    if (confirm(`Deseja mesmo deletar ${name}?`)) {
      this.deleteElementId.emit(id)
    }
  }



}
