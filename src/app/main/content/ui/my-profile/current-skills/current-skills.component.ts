import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-current-skills',
  templateUrl: './current-skills.component.html',
  styleUrls: ['./current-skills.component.scss']
})
export class CurrentSkillsComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  //Role
  roleCtrl: FormControl;
  filteredRoles: Observable<any[]>;
  roles: any[] = [
    {
      name: 'Project Manager'
    },
    {
      name: 'Developer'
    },
    {
      name: 'Senior Developer'
    },
    {
      name: 'Line Manager'
    },
    {
      name: 'Solution Architect'
    }
  ];


  //Area
  areaCtrl: FormControl;
  filteredAreas: Observable<any[]>;
  areas: any[] = [
    {
      name: 'Payments'
    },
    {
      name: 'TAX'
    },
    {
      name: 'Credit Risk'
    },
    {
      name: 'Accounting'
    }

  ];

  //==========================
  //
  //for CURRENT SKILLS
  //
  //==========================
  //form group per gruppo di skills
  options = ['C++', 'Java', 'Angular', 'Oracle', 'Credit Risk', 'Problem Solving', 'SAS', 'Global Markets', 'Front Office', 'SCRUM', 'Payments', 'TAX', 'Agile development', 'Python' ];
  

  currentSkills: any[] = [];
  aspirationalSkills: any[] = [];
  

  //Capacity
  //========
  unlimited: boolean;

  constructor(private _formBuilder: FormBuilder) { 
    this.roleCtrl = new FormControl();
    this.areaCtrl = new FormControl();
    

    this.filteredRoles = this.roleCtrl.valueChanges
    .startWith(null)
    .map(role => role ? this.filterRoles(role) : this.roles.slice());

    this.filteredAreas = this.areaCtrl.valueChanges
    .startWith(null)
    .map(area => area ? this.filterAreas(area) : this.areas.slice())


  }
  filterRoles(name: string) {
    return this.roles.filter((role) =>{
      //console.log(role);
      role.name.toLowerCase().indexOf(name.toLowerCase()) === 0;
      });
  }

  filterAreas(name: string) {
    return this.areas.filter((area) =>
      {
        //console.log(area);
        area.name.toLowerCase().indexOf(name.toLowerCase()) === 0;
      })
  }
  
  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      //roleCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  //add empty element to the array...
  addCurrentSkill(){
    this.currentSkills.push({id: Date.now(), skillName: '', proficiency:0});

  }

  //add empty element to the array...
  addAspirationalSkill(){
    this.aspirationalSkills.push({id: Date.now(), skillName: '', proficiency:0});

  }


  //getting removed event from child and removing the corresponding element in the parent array
  onSkillRemoved(skillData: {id:number, _skillName:string, _proficiency: number})
  {
    let index= this.currentSkills.indexOf(skillData.id);
    this.currentSkills.splice(index);
    
  }

  //getting removed event from child and removing the corresponding element in the parent array
  onAspirationalSkillRemoved(skillData: {id:number, _skillName:string, _proficiency: number})
  {
    let index= this.aspirationalSkills.indexOf(skillData.id);
    this.aspirationalSkills.splice(index);
    
  }

}

