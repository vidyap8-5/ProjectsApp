import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { LoginComponent } from './login/login.component';
import { TeamMemberDetailsComponent } from './team-member-details/team-member-details.component';
import { EditprojectComponent } from './editproject/editproject.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'details/:id',component:ProjectdetailsComponent},
    {path:'add',component:AddProjectComponent},
    {path:'teamMemberDetails', component:TeamMemberDetailsComponent},
    {path:'edit/:id',component:EditprojectComponent}
];