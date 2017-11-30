import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'current-skills-item',
  templateUrl: './current-skills-item.component.html',
  styleUrls: ['./current-skills-item.component.scss']
})
export class CurrentSkillsItemComponent implements OnInit {
  //per gestire l'autocomplete
  currentSkillsFilteredOptions: Observable<string[]>;
  
  skillsOptions = [
    'C++', 
    'Java', 
    'Angular', 
    'Oracle', 
    'Credit Risk', 
    'Problem Solving', 
    'SAS', 
    'Front Office', 
    'SCRUM', 
    'Agile development', 
    'Python',
    'Empathetic',
    'Independent',
    'Innovator',
    'Resilient',
    'Team Player'
];

  @Input() skillModel: {id:number, skillName: string, proficiency: number};


  @Output() elementRemoved = new EventEmitter<{id: number, skillName:string, proficiency: number}>();

  skillCardGroup: FormGroup;

  constructor(private fb:FormBuilder) { 
  }

  ngOnInit() {
    this.skillCardGroup = this.fb.group({
      skillName: '',
      proficiency: ''
    });

    //console.log(this.skillCardGroup)
    this.currentSkillsFilteredOptions = this.skillCardGroup.get('skillName').valueChanges
    .startWith(null)
    .map(
      (skill) => 
      {
        console.log(skill);
        return skill ? this.filter(skill) : this.skillsOptions.slice(); 
      }
    )



  }

  //the current element is going to be removed... notify this to the parent
  removeSkill(){
    this.elementRemoved.emit(this.skillModel);
  }


  filter(val: string): string[] 
  {
    //console.log("in filter.. "+ val);
    //questo e' l'operazione di filtering on a typescript array. The argument is the filtering criteria, as anonymous function.
    return this.skillsOptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
