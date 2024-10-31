import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpService } from '../../services/http.service';

export interface Ticket {
  id: string;
  protocol: string;
  subject: string;
  urgency: string;
  category: string;
  status: string;
  type: number; 
}


@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.scss'
})
export class TicketsListComponent implements OnInit {
  displayedColumns: string[] = ['protocol', 'subject', 'urgency', 'category', 'status', 'type', 'id'];
  dataSource: Ticket[] = [];

  constructor(
    private readonly httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.httpService.getTickets().subscribe((tickets: Ticket[]) => {
      console.log('Tickets: ', tickets);
      this.dataSource = tickets;
      console.log('DataSource: ', this.dataSource);
    });
  }
  
  // private mapItemsToTableDataSource(items: Ticket[]): Ticket[] {
  //   return items.map((item) => {
  //     return {
  //       protocol: {
  //         value: item.protocol,
  //         type: 'TEXT'
  //       },
  //       subject: {
  //         value: item.subject,
  //         type: 'TEXT'
  //       },
  //       urgency: {
  //         value: item.urgency,
  //         type: 'TEXT'
  //       },
  //       category: {
  //         value: item.category,
  //         type: 'TEXT'
  //       },
  //       status: {
  //         value: item.status,
  //         type: 'TEXT',
  //       },
  //       type: {
  //         value: item.type,
  //         type: 'STATUS',
  //         label: item.type === 1 ? 'Público' : 'Interno'
  //       },
  //       action: {
  //         value: item.id,
  //         type: 'ACTION',
  //         action: this.editTicket.bind(this)
  //       }
  //     };
  //   });
  // }
}

