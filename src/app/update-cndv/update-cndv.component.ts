import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Cndv } from '../cndv';
import { CndvService } from '../cndv.service';


@Component({
  selector: 'app-update-cndv',
  templateUrl: './update-cndv.component.html',
  styleUrls: ['./update-cndv.component.css']
})
export class UpdateCndvComponent implements OnInit {

  id: number;
  cndv: Cndv = new Cndv();
  
  constructor(private cndvService: CndvService,
    
    private router: Router) { }

  ngOnInit(): void {
    this.cndv = this.cndvService.getData();
    console.log(this.cndv);
  }

  onSubmit() {
    this.cndvService.updateCndv(this.cndv).pipe(map(result => result['message'])).subscribe(data => {
      try {
        alert("Update : " + data);
      } catch (error) {
        alert(error);
      }
      this.goToCndvList();
    });
  }

  goToCndvList() {
    this.router.navigate(['/cndvs']);
  }
}

