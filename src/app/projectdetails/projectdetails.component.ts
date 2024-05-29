import { DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProjectService } from '../projects.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-projectdetails',
  standalone: true,
  imports: [HttpClientModule,NgFor, NgIf,NavBarComponent,DatePipe],
  templateUrl: './projectdetails.component.html',
  styleUrl: './projectdetails.component.css',
  providers:[ProjectService],
})
export class ProjectdetailsComponent {

  constructor(private route: ActivatedRoute, private projectService: ProjectService,private router:Router) { }

  project:any;
  id:any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];  
    });
       console.log('id is '+this.id)
        this.projectService.getProjectById(this.id).subscribe(data => {
          this.project = data;
          console.log(this.project);
        });
  
  }
  
  isValueArray(value: any): boolean {
    return Array.isArray(value);
  }
  
  showDetails(arrayValue: any[]): void {
    this.router.navigate(['/teamMemberDetails'], { state: { teamMembers: arrayValue } });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']); // Navigate back to project list
  }
  
  getStatusColor(status: string): string {
    console.log(status);
    switch (status.toLowerCase()) {
      case 'inprogress':
        return 'primary';
      case 'completed':
        return 'success';
      case 'pending':
        return 'danger';
      default:
        return 'secondary';
    }
  }


  deleteProject(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];  
    });
    this.projectService.deleteProject(this.id).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
  // getEmployeeDetailsById() {
  //   this.http.get(`http://localhost:3000/Projects/${this.id}`).subscribe(
  //     (res: any) => {
  //       this.project = Object.entries(res).map(([key, value]) => ({ key, value }));
  //       console.log(this.project);
  //     }
  //   );
  // }
  
  

  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {

      
  //    // var matchingResults = JSON['data'].filter(function(x){ return x.id == 2; });
  //    // const matchingResult = response.data.filter(item => item.id === idToFind);
  //     this.id = params['id'];  // The '+' converts the string to a number
  //   });
  //   this.getEmployeeDetailsById();
  // }

  // getEmployeeDetailsById()
  // {
  //   // this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe(
  //     this.http.get(`http://localhost:3000/Projects/${this.id}`).subscribe(
  //   (res:any)=>{
  //     this.project=res;
  //     console.log(this.project);
  //   }
  
  //   );
  // }


}
