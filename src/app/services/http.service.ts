import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable, Subject } from 'rxjs';

export interface Ticket {
  id: string;
  protocol: string;
  subject: string;
  urgency: string;
  category: string;
  status: string;
  type: number; 
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public search$: Subject<void> = new Subject();
  public isLoading = signal<boolean>(true);
  private apiKey = '47c36c7c-adef-4375-920a-a5b783c20207';
  private baseUrl = 'https://api.movidesk.com/public/v1/tickets';

  constructor(
    private readonly http: HttpClient
  ) {}

  public async search(): Promise<any> {
    try {
      const data = await firstValueFrom(this.getTickets());
      return data;
    } catch (err) {
      console.error('Erro na requisição: ', err);
      throw err;
    }
  }

  public refresh(): void {
    this.isLoading.set(true);
    this.search$.next();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private buildUrl(params: string): string {
    return `${this.baseUrl}?token=${this.apiKey}${params}`;
  }

  public getTickets(params?: { status?: string, category?: string }): Observable<any> {
    if (!params) {
      params = {
        status: "'Sustentação'",
        category: "'Falhas'"
      };
    }

    const queryParams = `&$select=id,protocol,subject,type,urgency,status,category&$filter=status eq ${params.status} and category eq ${params.category}`;
    const url = this.buildUrl(queryParams);

    console.log('url: ', url);

    return this.http.get(url, { headers: this.getHeaders() });
  }

  public getTicketById(id: string): Observable<any> {
    const url = this.buildUrl(`&id=${id}`);
    console.log('url: ', url);

    return this.http.get(url, { headers: this.getHeaders() });
  }

  public getTicketByProtocol(protocol: string): Observable<any> {
    const url = this.buildUrl(`&protocol=${protocol}`);
    console.log('url: ', url);

    return this.http.get(url, { headers: this.getHeaders() });
  }
}
