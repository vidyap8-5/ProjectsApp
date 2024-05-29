import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-member-details',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './team-member-details.component.html',
  styleUrl: './team-member-details.component.css'
})

export class TeamMemberDetailsComponent {
  teamMembers: any[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.teamMembers = navigation.extras.state['teamMembers'];
    }
  }

  ngOnInit(): void {
    // You can add initialization logic here if needed
  }
}
