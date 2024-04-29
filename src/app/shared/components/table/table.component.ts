import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TableColumnConfig } from '../../utils/culomn.config';
import { CommonModule } from '@angular/common';
import { TypeCheckerPipe } from '../../pipes/type-checker.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,TypeCheckerPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnChanges {

  @Input() displayedColumns: TableColumnConfig[] = [];

  ngOnInit(): void {
    console.log(this.displayedColumns)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayedColumns']) {
      console.log(changes)

    }
  }
}
