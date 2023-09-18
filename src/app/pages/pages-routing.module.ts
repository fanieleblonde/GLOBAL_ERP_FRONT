import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdashboardComponent} from "./adashboard/adashboard.component";
import {EdashboardComponent} from "./edashboard/edashboard.component";
import {PagesComponent} from "./pages.component";
import {ModuleComponent} from "./security/module/module.component";
import {CampusComponent} from "./school/schooling/configuration/campus/campus.component";
import {BuildingComponent} from "./school/schooling/configuration/building/building.component";
import {RoomComponent} from "./school/schooling/configuration/room/room.component";
import {SchoolComponent} from "./school/schooling/configuration/school/school.component";
import {CycleComponent} from "./school/schooling/configuration/cycle/cycle.component";
import {MinistryComponent} from "./setting/institution/ministry/ministry.component";
import {LevelComponent} from "./school/schooling/configuration/level/level.component";
import {OptionComponent} from "./school/schooling/configuration/option/option.component";
import {PentionschemeComponent} from "./school/schooling/configuration/pentionscheme/pentionscheme.component";
import {PensionBracketComponent} from "./school/schooling/configuration/pension-bracket/pension-bracket.component";
import {RegistrationFormComponent} from "./school/schooling/configuration/registration-form/registration-form.component";
import {TuitionComponent} from "./school/schooling/configuration/tuition/tuition.component";
import {TrainingTypeComponent} from "./school/schooling/configuration/training-type/training-type.component";
import {CostAreaComponent} from "./school/schooling/configuration/cost-area/cost-area.component";
import {FamilyComponent} from "./school/schooling/registration/family/family.component";
import {SchoolOriginComponent} from "./school/schooling/registration/school-origin/school-origin.component";
import {NoteTypeComponent} from "./school/exam/configuration/note-type/note-type.component";
import {DiplomaComponent} from "./school/exam/configuration/diploma/diploma.component";
import {GradingComponent} from "./school/schooling/configuration/grading/grading.component";
import {StudregistrationComponent} from "./school/schooling/registration/studregistration/studregistration.component";
import {CourseModuleComponent} from "./school/study/course-module/course-module.component";
import {DepartmentComponent} from "./school/schooling/configuration/department/department.component";
import {ProgramComponent} from "./school/schooling/configuration/program/program.component";
import {SpecialityComponent} from "./school/schooling/configuration/speciality/speciality.component";
import {ClassCategoryComponent} from "./school/schooling/configuration/class-category/class-category.component";
import {SchoolClassComponent} from "./school/schooling/configuration/school-class/school-class.component";
import {ModuleCategoryComponent} from "./school/study/module-category/module-category.component";
import {SubjectTypeComponent} from "./school/study/subject-type/subject-type.component";
import {SubjectComponent} from "./school/study/subject/subject.component";
import {TeacherComponent} from "./school/study/teacher/teacher.component";
import {PeriodTypeComponent} from "./setting/school/period-type/period-type.component";
import {EvaluationPeriodComponent} from "./school/exam/configuration/evaluation-period/evaluation-period.component";
import {SequenceComponent} from "./school/exam/configuration/sequence/sequence.component";
import {StudentInternshipComponent} from "./school/exam/internship/student-internship/student-internship.component";
import {StatusComponent} from "./setting/school/status/status.component";
import {GraduationComponent} from "./school/exam/internship/graduation/graduation.component";
import {CertificationComponent} from "./school/exam/internship/certification/certification.component";
import {ResearchWorkComponent} from "./school/exam/internship/research-work/research-work.component";
import {ClassAndRoomComponent} from "./school/schooling/configuration/class-and-room/class-and-room.component";
import {
  ClassAndHourlyrateComponent
} from "./school/schooling/configuration/class-and-hourlyrate/class-and-hourlyrate.component";
import {NextClassComponent} from "./school/schooling/configuration/next-class/next-class.component";
import {TeacherContactComponent} from "./school/study/teacher-contact/teacher-contact.component";
import {TeacherIdentityComponent} from "./school/study/teacher-identity/teacher-identity.component";
import {DiplomaTypeComponent} from "./setting/school/diploma-type/diploma-type.component";
import {CountryComponent} from "./setting/location/country/country.component";
import {ManagerTypeComponent} from "./setting/institution/manager-type/manager-type.component";
import {ClassWeightingComponent} from "./school/exam/configuration/class-weighting/class-weighting.component";
import {CycleWeightingComponent} from "./school/exam/configuration/cycle-weighting/cycle-weighting.component";
import {
  SpecialityWeightingComponent
} from "./school/exam/configuration/speciality-weighting/speciality-weighting.component";
import {SkillComponent} from "../others/skill/skill.component";
import {SkillTypeComponent} from "../others/skill-type/skill-type.component";
import {DepartureReasonComponent} from "../others/departure-reason/departure-reason.component";
import {EmploymentTypeComponent} from "../others/employment-type/employment-type.component";
import {JobPositionComponent} from "../others/job-position/job-position.component";
import {WorkLocationComponent} from "../others/work-location/work-location.component";
import {TagComponent} from "../others/tag/tag.component";
import {RankComponent} from "../others/rank/rank.component";
import {JobLocationComponent} from "../others/job-location/job-location.component";
import {DegreeComponent} from "../others/degree/degree.component";
import {ApplicationSourceComponent} from "../others/application-source/application-source.component";
import {ContractTemplateComponent} from "../others/contract-template/contract-template.component";
import {SchoolWeightingComponent} from "./school/exam/configuration/school-weighting/school-weighting.component";
import {SchoolYearComponent} from "./school/schooling/configuration/school-year/school-year.component";
import {BankComponent} from "./accounting/configuration/bank/bank.component";
import {BankAccountComponent} from "./accounting/configuration/bank-account/bank-account.component";
import {CashDeskComponent} from "./accounting/configuration/cash-desk/cash-desk.component";
import {ConcourComponent} from "./school/schooling/configuration/concour/concour.component";
import {TestGroupComponent} from "./school/schooling/configuration/test-group/test-group.component";
import {TestMaterialComponent} from "./school/schooling/configuration/test-material/test-material.component";
import {NationalExamComponent} from "./school/schooling/configuration/national-exam/national-exam.component";
import {QualityComponent} from "./school/schooling/configuration/quality/quality.component";
import {DiplomamensionComponent} from "./school/schooling/configuration/diplomamension/diplomamension.component";
import {TargetComponent} from "./school/schooling/configuration/target/target.component";
import {UserCurrentYearComponent} from "./school/schooling/configuration/user-current-year/user-current-year.component";
import {SchoolSessionComponent} from "./school/schooling/configuration/school-session/school-session.component";
import {SchoolPeriodComponent} from "./school/schooling/configuration/school-period/school-period.component";
import {
  StudoldregistrationComponent
} from "./school/schooling/registration/studoldregistration/studoldregistration.component";
import {
  RegistrationperclassComponent
} from "./school/schooling/registration/registrationperclass/registrationperclass.component";
import {FormulaThComponent} from "./school/exam/configuration/formula-th/formula-th.component";
import {SexComponent} from "./school/schooling/configuration/sex/sex.component";
import {ReligionComponent} from "./school/schooling/configuration/religion/religion.component";
import {InstitutionComponent} from "./security/institution/institution/institution.component";
import {ClassProgramComponent} from "./school/study/class-program/class-program.component";
import { BloodgroupComponent } from './school/schooling/configuration/bloodgroup/bloodgroup.component';
import { CivilityComponent } from './school/schooling/configuration/civility/civility.component';
import { IdentityTypeComponent } from './school/schooling/configuration/identity-type/identity-type.component';
import { MaritalStatusComponent } from './school/schooling/configuration/marital-status/marital-status.component';
import { RhesusComponent } from './school/schooling/configuration/rhesus/rhesus.component';
import { ExspenseHeadingComponent } from './school/schooling/configuration/exspense-heading/exspense-heading.component';
import {ParentComponent} from "./school/schooling/registration/parent/parent.component";
import {StudentComponent} from "./school/schooling/registration/student/student.component";
import {SubjectNatureComponent} from "./school/study/subject-nature/subject-nature.component";

const routes: Routes = [
  // { path: 'dashboard', component: PagesComponent,
  //   children: [
  //     { path: '', component: AdashboardComponent },
  //     { path: 'analysis', component: AdashboardComponent },
  //     { path: 'ecommerce', component: EdashboardComponent },
  //     { path: 'module', component: ModuleComponent },
  //   ],
  // },

  { path: 'school', component: PagesComponent, title:"Dashboard",
    children: [
      { path: '', component: AdashboardComponent },
      { path: 'analysis', component: AdashboardComponent },
      { path: 'campus', component: CampusComponent, title:"Campus", data:{'module': 'School', 'title' : 'Campus'} },
      { path: 'building', component: BuildingComponent, title:"Building", data:{'module': 'School', 'title' : 'Building'} },
      { path: 'room', component: RoomComponent, title:"Room", data:{'module': 'School', 'title' : 'Room'} },
      { path: 'school', component: SchoolComponent, title:"School", data:{'module': 'School', 'title' : 'School'} },
      { path: 'cycle', component: CycleComponent, title:"Cycle", data:{'module': 'School', 'title' : 'Cycle'} },
      { path: 'ministry', component: MinistryComponent, title:"Ministry", data:{'module': 'Setting', 'title' : 'Ministry'} },
      { path: 'level', component: LevelComponent, title:"Level", data:{'module': 'School', 'title' : 'Level'} },
      { path: 'option', component: OptionComponent, title:"Option", data:{'module': 'School', 'title' : 'Option'} },
      { path: 'pension/scheme', component: PentionschemeComponent, title:"Pension Scheme", data:{'module': 'School', 'title' : 'Pension Scheme'} },
      { path: 'pension/bracket', component: PensionBracketComponent, title:"Pension Bracket", data:{'module': 'School', 'title' : 'Pension Bracket'} },
      { path: 'registration/form', component: RegistrationFormComponent, title:"Registration Form", data:{'module': 'School', 'title' : 'Registration Form'} },
      { path: 'tuition', component: TuitionComponent, title:"Tuition", data:{'module': 'School', 'title' : 'Tuition'} },
      { path: 'training/type', component: TrainingTypeComponent, title:"Training Type", data:{'module': 'School', 'title' : 'Training Type'} },
      { path: 'costarea', component: CostAreaComponent, title:"Cost Area", data:{'module': 'School', 'title' : 'Cost Area'} },
      { path: 'family', component: FamilyComponent, title:"Family", data:{'module': 'School', 'title' : 'Family'} },
      { path: 'school/origin', component: SchoolOriginComponent, title:"School_Origin", data:{'module': 'School', 'title' : 'School_Origin'} },
      { path: 'notetype', component: NoteTypeComponent, title:"Note Type", data:{'module': 'School', 'title' : 'Note Type'} },
      { path: 'diploma', component: DiplomaComponent, title:"Diploma", data:{'module': 'School', 'title' : 'Diploma'} },
      { path: 'grading', component: GradingComponent, title:"Grading", data:{'module': 'School', 'title' : 'Grading'} },
      { path: 'Student/registration', component: StudregistrationComponent, title:"Studregistration", data:{'module': 'School', 'title' : 'Studregistration'} },
      { path: 'Old/registration', component: StudoldregistrationComponent, title:"StudOldregistration", data:{'module': 'School', 'title' : 'StudOldregistration'} },
      { path: 'Registration/perclass', component: RegistrationperclassComponent, title:"RegistrationPerclass", data:{'module': 'School', 'title' : 'RegistrationPerclass'} },
      { path: 'institution', component: InstitutionComponent, title:"institution", data:{'module': 'School', 'title' : 'institution'} },
      { path: 'class/program', component: ClassProgramComponent, title:"class_program", data:{'module': 'School', 'title' : 'class_program'} },

      { path: 'formula/th', component: FormulaThComponent, title:"formula_th", data:{'module': 'School', 'title' : 'formula_th'} },
      { path: 'sex', component: SexComponent, title:"sex", data:{'module': 'School', 'title' : 'sex'} },
      { path: 'religion', component: ReligionComponent, title:"religion", data:{'module': 'School', 'title' : 'religion'} },
      { path: 'department', component: DepartmentComponent, title:"department", data:{'module': 'School', 'title' : 'department'} },
      { path: 'program', component: ProgramComponent, title:"program", data:{'module': 'School', 'title' : 'program'} },
      { path: 'speciality', component: SpecialityComponent, title:"speciality", data:{'module': 'School', 'title' : 'speciality'} },
      { path: 'class/category', component: ClassCategoryComponent, title:"class-category", data:{'module': 'School', 'title' : 'class-category'} },
      { path: 'school/class', component: SchoolClassComponent, title:"school-class", data:{'module': 'School', 'title' : 'school-class'} },
      { path: 'school/year', component: SchoolYearComponent, title:"school_year", data:{'module': 'School', 'title' : 'school_year'} },
      { path: 'change/year', component: UserCurrentYearComponent, title:"change_year", data:{'module': 'School', 'title' : 'change_year'} },
      { path: 'module/category', component: ModuleCategoryComponent, title:"module-category", data:{'module': 'School', 'title' : 'module-category'} },
      { path: 'course/module', component: CourseModuleComponent, title:"course-module", data:{'module': 'School', 'title' : 'course-module'} },
      { path: 'subject/type', component: SubjectTypeComponent, title:"subject-type", data:{'module': 'School', 'title' : 'subject-type'} },
      { path: 'subject', component: SubjectComponent, title:"subject", data:{'module': 'School', 'title' : 'subject'} },
      { path: 'teacher', component: TeacherComponent, title:"teacher", data:{'module': 'School', 'title' : 'teacher'} },
      { path: 'period_type', component: PeriodTypeComponent, title:"period_type", data:{'module': 'School', 'title' : 'period_type'} },
      { path: 'evaluation/period', component: EvaluationPeriodComponent, title:"evaluation_period", data:{'module': 'School', 'title' : 'evaluation_period'} },
      { path: 'sequence', component: SequenceComponent, title:"sequence", data:{'module': 'School', 'title' : 'sequence'} },
      { path: 'period/type', component: PeriodTypeComponent, title:"period_type", data:{'module': 'School', 'title' : 'period_type'} },
      { path: 'student/internship', component: StudentInternshipComponent, title:"student_internship", data:{'module': 'School', 'title' : 'student_internship'} },
      { path: 'status', component: StatusComponent, title:"status", data:{'module': 'School', 'title' : 'status'} },
      { path: 'graduation', component: GraduationComponent, title:"graduation", data:{'module': 'School', 'title' : 'graduation'} },
      { path: 'certification', component: CertificationComponent, title:"certification", data:{'module': 'School', 'title' : 'certification'} },
      { path: 'research/work', component: ResearchWorkComponent, title:"research_work", data:{'module': 'School', 'title' : 'research_work'} },
      { path: 'class/and/room', component: ClassAndRoomComponent, title:"class_and_room", data:{'module': 'School', 'title' : 'class_and_room'} },
      { path: 'class/and/hourlyrate', component: ClassAndHourlyrateComponent, title:"class_and_hourrlyrate", data:{'module': 'School', 'title' : 'class_and_hourrlyrate'} },
      { path: 'next/class', component: NextClassComponent, title:"next_class", data:{'module': 'School', 'title' : 'next_class'} },
      { path: 'teacher/contact', component: TeacherContactComponent, title:"teacher_contact", data:{'module': 'School', 'title' : 'teacher_contact'} },
      { path: 'teacher/identity', component: TeacherIdentityComponent, title:"teacher_identity", data:{'module': 'School', 'title' : 'teacher_identity'} },
      { path: 'diploma/type', component: DiplomaTypeComponent, title:"diploma_type", data:{'module': 'School', 'title' : 'diploma_type'} },
      { path: 'country', component: CountryComponent, title:"county", data:{'module': 'School', 'title' : 'county'} },
      { path: 'ministry', component: MinistryComponent, title:"ministry", data:{'module': 'School', 'title' : 'ministry'} },
      { path: 'manager/type', component: ManagerTypeComponent, title:"manager_type", data:{'module': 'School', 'title' : 'manager_type'} },
      { path: 'note/type', component: NoteTypeComponent, title:"note_type", data:{'module': 'School', 'title' : 'note_type'} },
      { path: 'speciality/weighting', component: SpecialityWeightingComponent, title:"speciality_weighting", data:{'module': 'School', 'title' : 'speciality_weighting'} },
      { path: 'class/weighting', component: ClassWeightingComponent, title:"class_weighting", data:{'module': 'School', 'title' : 'class_weighting'} },
      { path: 'cycle/weighting', component: CycleWeightingComponent, title:"cycle_weighting", data:{'module': 'School', 'title' : 'cycle_weighting'} },
      { path: 'school/weighting', component: SchoolWeightingComponent, title:"school_weighting", data:{'module': 'School', 'title' : 'school_weighting'} },

      { path: 'skill', component: SkillComponent, title:"skill", data:{'module': 'School', 'title' : 'skill'} },
      { path: 'skill/type', component: SkillTypeComponent, title:"skill_type", data:{'module': 'School', 'title' : 'skill_type'} },
      { path: 'departure/reason', component: DepartureReasonComponent, title:"departure_reason", data:{'module': 'School', 'title' : 'departure_reason'} },
      { path: 'employment/type', component: EmploymentTypeComponent, title:"employment_type", data:{'module': 'School', 'title' : 'employment_type'} },
      { path: 'job/position', component: JobPositionComponent, title:"job_position", data:{'module': 'School', 'title' : 'job_position'} },
      { path: 'work/location', component: WorkLocationComponent, title:"work_location", data:{'module': 'School', 'title' : 'work_location'} },
      { path: 'tag', component: TagComponent, title:"tag", data:{'module': 'School', 'title' : 'tag'} },
      { path: 'rank', component: RankComponent, title:"rank", data:{'module': 'School', 'title' : 'rank'} },
      { path: 'job/location', component: JobLocationComponent, title:"job_location", data:{'module': 'School', 'title' : 'job_location'} },
      { path: 'degree', component: DegreeComponent, title:"degree", data:{'module': 'School', 'title' : 'degree'} },
      { path: 'department', component: DepartmentComponent, title:"department", data:{'module': 'School', 'title' : 'department'} },
      { path: 'application/source', component: ApplicationSourceComponent, title:"application_source", data:{'module': 'School', 'title' : 'application_source'} },
      { path: 'contract/template', component: ContractTemplateComponent, title:"contract_template", data:{'module': 'School', 'title' : 'contract_template'} },

      { path: 'bank', component: BankComponent, title:"bank", data:{'module': 'School', 'title' : 'bank'} },
      { path: 'bank/account', component: BankAccountComponent, title:"bank_account", data:{'module': 'School', 'title' : 'bank_account'} },
      { path: 'cash/desk', component: CashDeskComponent, title:"cash_desk", data:{'module': 'School', 'title' : 'cash_desk'} },
      { path: 'concour', component: ConcourComponent, title:"concour", data:{'module': 'School', 'title' : 'concour'} },
      { path: 'test/group', component: TestGroupComponent, title:"test_group", data:{'module': 'School', 'title' : 'test_group'} },
      { path: 'test/material', component: TestMaterialComponent, title:"test_material", data:{'module': 'School', 'title' : 'test_material'} },
      { path: 'national/exam', component: NationalExamComponent, title:"national_exam", data:{'module': 'School', 'title' : 'national_exam'} },

      { path: 'quality', component: QualityComponent, title:"quality", data:{'module': 'School', 'title' : 'quality'} },
      { path: 'diploma/mension', component: DiplomamensionComponent, title:"diploma_mension", data:{'module': 'School', 'title' : 'diploma_mension'} },
      { path: 'target', component: TargetComponent, title:"target", data:{'module': 'School', 'title' : 'target'} },
      { path: 'school/session', component: SchoolSessionComponent, title:"school_session", data:{'module': 'School', 'title' : 'school_session'} },
      { path: 'school/period', component: SchoolPeriodComponent, title:"school_period", data:{'module': 'School', 'title' : 'school_period'} },
      { path: 'sex', component: SexComponent, title:"sex", data:{'module': 'School', 'title' : 'sex'} },
      { path: 'religion', component: ReligionComponent, title:"religion", data:{'module': 'School', 'title' : 'religion'} },
      { path: 'blood-group', component: BloodgroupComponent, title:"blood_group", data:{'module': 'School', 'title' : 'blood_group'} },
      { path: 'civility', component: CivilityComponent, title:"civility", data:{'module': 'School', 'title' : 'civility'} },
      { path: 'identity-type', component: IdentityTypeComponent, title:"identity_type", data:{'module': 'School', 'title' : 'identity_type'} },
      { path: 'marital-status', component: MaritalStatusComponent, title:"marital_status", data:{'module': 'School', 'title' : 'marital_status'} },
      { path: 'rhesus', component: RhesusComponent, title:"rhesus", data:{'module': 'School', 'title' : 'rhesus'} },
      { path: 'expense/heading', component: ExspenseHeadingComponent, title:"expense_heading", data:{'module': 'School', 'title' : 'expense_heading'} },
      { path: 'parent', component: ParentComponent, title:"parent", data:{'module': 'School', 'title' : 'parent'} },
      { path: 'student', component: StudentComponent, title:"student", data:{'module': 'School', 'title' : 'student'} },
      { path: 'subject/nature', component: SubjectNatureComponent, title:"subject_nature", data:{'module': 'School', 'title' : 'subject_nature'} },

      // { path: 'mode', component: ModeComponent, title:"mode", data:{'module': 'School', 'title' : 'mode'} },

    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

export const routingPagesComponents = [
  PagesComponent, AdashboardComponent, EdashboardComponent, ModuleComponent
]

