import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../projects.service';
import { HttpClientModule } from '@angular/common/http';
import { NgClass, NgFor } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-editproject',
  standalone: true,
  imports: [NavBarComponent,ReactiveFormsModule,RouterModule,HttpClientModule,NgFor,NgbCollapseModule,NgClass ],
  templateUrl: './editproject.component.html',
  styleUrl: './editproject.component.css',
  providers:[ProjectService],
})
export class EditprojectComponent {
  projectId: any;
  projectForm: any;
  isTeamMembersCollapsed = true;
  formattedStartDate: string = '';
  formattedEndDate: string = '';
  projectStatus:string='';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
     this.route.params.subscribe(params => {
      this.projectId = params['id'];  
    });
    this.initForm();
    this.loadProjectData();
  }

  initForm(): void {
    this.projectForm = this.formBuilder.group({
      id:[],
      ProjectName: ['', Validators.required],
      Description: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Status: ['', Validators.required],
      Members: this.formBuilder.array([])
    });
  }

  loadProjectData(): void {
    this.projectService.getProjectById(this.projectId).subscribe(project => {
      this.projectForm.patchValue(project);

      this.projectForm.patchValue({
        ProjectName: project.ProjectName,
        Description: project.Description,
        StartDate: this.formatDate(this.projectForm.value.StartDate),
        EndDate: this.formatDate(this.projectForm.value.EndDate),
        Status: project.Status
      });


      //const formattedEndDate = this.formatDate(this.projectForm.value.endDate);
      console.log(project);
      this.setTeamMembers(project.Members);
    });
  }

  formatDate(dateString: string): string {
    // Assume dateString is in the format 'dd-MM-yyyy'
    const parts = dateString.split('-');
    const year = parts[2];
    const month = parts[1];
    const day = parts[0];
    return `${year}-${month}-${day}`;
  }
  toggleTeamMembers(): void {
    this.isTeamMembersCollapsed = !this.isTeamMembersCollapsed;
  }

  setTeamMembers(members: any[]): void {
    const memberArray = this.projectForm.get('Members') as FormArray;
    members.forEach(member => {
      memberArray.push(this.formBuilder.group({
        Name: [member.Name, Validators.required],
        Role: [member.Role, Validators.required],
        Email: [member.Role, Validators.required],
        Phone: [member.Role, Validators.required]
      }));
    });
  }

  get teamMembers(): FormArray {
    return this.projectForm.get('Members') as FormArray;
  }

  addTeamMember(): void {
    this.teamMembers.push(this.formBuilder.group({
      Name: ['', Validators.required],
      Role: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required]

    }));
  }

  removeTeamMember(index: number): void {
    const teamMembersFormArray = this.projectForm.get('Members') as FormArray;
    teamMembersFormArray.removeAt(index);
  }
  onSubmit(): void {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      this.projectService.updateProject(this.projectForm.Value).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

}
