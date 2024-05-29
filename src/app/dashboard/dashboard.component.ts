import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { NgClass, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {ProjectService } from '../projects.service';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatTooltip } from '@angular/material/tooltip';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,NgClass , HttpClientModule, MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule, 
    FormsModule,
    NavBarComponent,
    MatTooltip
  ]

 ,
 providers:[ProjectService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  projects: any[] = [];
  filteredProjects: any[] = [];
  statuses: string[] = ['InProgress', 'Completed', 'Pending'];
  selectedStatus: string = '';
 constructor(private projectService: ProjectService,private router:Router)
  {

  }

 

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {

      console.log(data);
      this.projects = data;
      this.filteredProjects = data; // Initialize filtered projects
    });
  }
  filterProjects(): void {
    if (this.selectedStatus) {
      console.log(this.selectedStatus);
      this.filteredProjects = this.projects.filter(project => project.Status === this.selectedStatus);
    } else {
      this.filteredProjects = this.projects;
    }
  }

  getProjectDetails(project: any): string {
    let details = `Name: ${project.ProjectName}`;
    details += `Description: ${project.Description}`;
    details += `Start Date: ${project.StartDate}`;
    details += `End Date: ${project.EndDate}`;
    details += `Status: ${project.Status}`;
    details += `Team Members: ${project.Members.map((m: { Name: any; }) => m.Name).join(', ')}<br>`;
    // details += `Milestones: ${project.milestones.map(m => m.name).join(', ')}`;
    return details;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'inprogress':
        {
         
        return 'ongoing';
        }
      case 'completed':
        return 'completed';
      case 'pending':
        return 'pending';
      default:
        return '';
    }
  }
  sendDetails(emp:any)
  {
    const id = emp.id;  // Replace this with the actual parameter you want to pass
    this.router.navigate(['/details', id]);
  }

  

  editDetails(emp:any)
  {
    const id = emp.id;  // Replace this with the actual parameter you want to pass
    this.router.navigate(['/edit', id]);
  }

  // getEmployeeDetails()
  // {
  //   // this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe(
  //     this.http.get('http://localhost:3000/Projects').subscribe(
  //   (res:any)=>{
  //     this.projects=res;
  //     this.filteredProjects = res;
  //     console.log(this.projects);
  //   }
  
  //   );
  // }
  

}
