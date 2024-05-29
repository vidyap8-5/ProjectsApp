import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../projects.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [RouterModule, HttpClientModule,FormsModule,ReactiveFormsModule,NavBarComponent, NgFor],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
  providers:[ProjectService]
})
export class AddProjectComponent {
  projectForm: any;
  

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
      
  ) { }



  ngOnInit(): void {
      this.projectForm = this.fb.group({
      ProjectName: ['', Validators.required],
      Description: ['', Validators.required],
      Status: ['Pending', Validators.required], 
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Members: this.fb.array([])
    });
  }

 ;

  get teamMembers(): FormArray {
    return this.projectForm.get('Members') as FormArray;
  }

  addTeamMember(): void {
    this.teamMembers.push(this.fb.group({
      Name: ['', Validators.required],
      Role: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required]
    }));
  }

  removeTeamMember(index: number): void {
    this.teamMembers.removeAt(index);
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
