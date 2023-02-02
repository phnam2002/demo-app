import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs';
import { Cndv } from '../cndv';
import { CndvService } from '../cndv.service';

@Component({
  selector: 'app-create-cndv',
  templateUrl: './create-cndv.component.html',
  styleUrls: ['./create-cndv.component.css']
})
export class CreateCndvComponent implements OnInit {

  cndv: Cndv = new Cndv();
  constructor(private cndvService: CndvService, private router: Router) { }


  ngOnInit(): void {
  }

  goToCndvList() {
    this.router.navigate(['/cndvs']);
  }

  onSubmit() {
    this.cndvService.createCndv(this.cndv).pipe(map(result => result['message'])).subscribe(data => {
      try {
        alert("Add : " + data);
      } catch (error) {
        alert(error);
      }
      this.goToCndvList();
    });
  }

}
;