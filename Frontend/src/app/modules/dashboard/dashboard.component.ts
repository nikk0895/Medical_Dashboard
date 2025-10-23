import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  jobColumns = ['patientName', 'confidence', 'errorFlag'];
  errorColumns = ['page', 'reason', 'status'];
  jobLogColumns = ['patientName', 'status', 'errorFlag'];
  auditColumns = ['user', 'action', 'timestamp'];

  jobDetails = [
    { patientName: 'Jelm Smith', confidence: 'Completed', errorFlag: 'No' },
    { patientName: 'Jane Doe', confidence: '9%', errorFlag: 'Yes' },
    { patientName: 'Jane Doe', confidence: 'Completed', errorFlag: 'No' }
  ];

  errorLogs = [
    { page: 3, reason: 'Unreachable', status: 'Pending' },
    { page: 12, reason: 'Keyword Blocked', status: 'Manual Review' }
  ];

  jobLogs = [
    { patientName: 'Lab', status: 'Completed', errorFlag: 'No' },
    { patientName: 'Consult Notes', status: 'Completed', errorFlag: 'Yes' },
    { patientName: 'Jane Doe', status: 'Completed', errorFlag: 'No' }
  ];

  auditLogs = [
    { user: 'Admin', action: 'Changed Threshold', timestamp: '2023-10-26' },
    { user: 'Admin', action: 'Keyword Priority', timestamp: '2023-10-26' }
  ];
}