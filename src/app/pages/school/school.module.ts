import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolRoutingModule } from './school-routing.module';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../shared/shared.module";
import {CampusComponent} from "./schooling/configuration/campus/campus.component";
import { CampusAddEditComponent } from './schooling/configuration/campus/campus-add-edit/campus-add-edit.component';
import { BuildingComponent } from './schooling/configuration/building/building.component';
import { BuildingAddEditComponent } from './schooling/configuration/building/building-add-edit/building-add-edit.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { RoomComponent } from './schooling/configuration/room/room.component';
import { RoomAddEditComponent } from './schooling/configuration/room/room-add-edit/room-add-edit.component';
import { SchoolComponent } from './schooling/configuration/school/school.component';
import { SchoolAddEditComponent } from './schooling/configuration/school/school-add-edit/school-add-edit.component';
import { CycleComponent } from './schooling/configuration/cycle/cycle.component';
import { CycleAddEditComponent } from './schooling/configuration/cycle/cycle-add-edit/cycle-add-edit.component';
import { LevelComponent } from './schooling/configuration/level/level.component';
import { LevelAddEditComponent } from './schooling/configuration/level/level-add-edit/level-add-edit.component';
import { OptionComponent } from './schooling/configuration/option/option.component';
import { OptionAddEditComponent } from './schooling/configuration/option/option-add-edit/option-add-edit.component';
import { PentionschemeComponent } from './schooling/configuration/pentionscheme/pentionscheme.component';
import { PentionschemeAddEditComponent } from './schooling/configuration/pentionscheme/pentionscheme-add-edit/pentionscheme-add-edit.component';
import { PensionBracketComponent } from './schooling/configuration/pension-bracket/pension-bracket.component';
import { PensionBracketAddEditComponent } from './schooling/configuration/pension-bracket/pension-bracket-add-edit/pension-bracket-add-edit.component';
import { RegistrationFormComponent } from './schooling/configuration/registration-form/registration-form.component';
import { RegistrationFormAddEditComponent } from './schooling/configuration/registration-form/registration-form-add-edit/registration-form-add-edit.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TuitionComponent } from './schooling/configuration/tuition/tuition.component';
import { TuitionAddEditComponent } from './schooling/configuration/tuition/tuition-add-edit/tuition-add-edit.component';
import { TrainingTypeComponent } from './schooling/configuration/training-type/training-type.component';
import { TrainingTypeAddEditComponent } from './schooling/configuration/training-type/training-type-add-edit/training-type-add-edit.component';
import { CostAreaComponent } from './schooling/configuration/cost-area/cost-area.component';
import { CostAreaAddEditComponent } from './schooling/configuration/cost-area/cost-area-add-edit/cost-area-add-edit.component';
import { FamilyComponent } from './schooling/registration/family/family.component';
import { FamilyAddEditComponent } from './schooling/registration/family/family-add-edit/family-add-edit.component';
import { SchoolOriginComponent } from './schooling/registration/school-origin/school-origin.component';
import { SchoolOriginAddEditComponent } from './schooling/registration/school-origin/school-origin-add-edit/school-origin-add-edit.component';
import { NoteTypeComponent } from './exam/configuration/note-type/note-type.component';
import { NoteTypeAddEditComponent } from './exam/configuration/note-type/note-type-add-edit/note-type-add-edit.component';
import { DiplomaComponent } from './exam/configuration/diploma/diploma.component';
import { DiplomaAddEditComponent } from './exam/configuration/diploma/diploma-add-edit/diploma-add-edit.component';
import { GradingComponent } from './schooling/configuration/grading/grading.component';
import { GradingAddEditComponent } from './schooling/configuration/grading/grading-add-edit/grading-add-edit.component';
import { StudregistrationComponent } from './schooling/registration/studregistration/studregistration.component';
import { StudregistrationAddEditComponent } from './schooling/registration/studregistration/studregistration-add-edit/studregistration-add-edit.component';
import {TeacherComponent} from "./study/teacher/teacher.component";
import {TeacherAddEditComponent} from "./study/teacher/teacher-add-edit/teacher-add-edit.component";
import {SubjectComponent} from "./study/subject/subject.component";
import {SubjectAddEditComponent} from "./study/subject/subject-add-edit/subject-add-edit.component";
import {SubjectTypeComponent} from "./study/subject-type/subject-type.component";
import {SubjectTypeAddEditComponent} from "./study/subject-type/subject-type-add-edit/subject-type-add-edit.component";
import {CourseModuleComponent} from "./study/course-module/course-module.component";
import {
  CourseModuleAddEditComponent
} from "./study/course-module/course-module-add-edit/course-module-add-edit.component";
import {ModuleCategoryComponent} from "./study/module-category/module-category.component";
import {
  ModuleCategoryAddEditComponent
} from "./study/module-category/module-category-add-edit/module-category-add-edit.component";
import {SchoolClassComponent} from "./schooling/configuration/school-class/school-class.component";
import {
  SchoolClassAddEditComponent
} from "./schooling/configuration/school-class/school-class-add-edit/school-class-add-edit.component";
import {ClassCategoryComponent} from "./schooling/configuration/class-category/class-category.component";
import {
  ClassCategoryAddEditComponent
} from "./schooling/configuration/class-category/class-category-add-edit/class-category-add-edit.component";
import {SpecialityComponent} from "./schooling/configuration/speciality/speciality.component";
import {
  SpecialityAddEditComponent
} from "./schooling/configuration/speciality/speciality-add-edit/speciality-add-edit.component";
import {ProgramComponent} from "./schooling/configuration/program/program.component";
import {ProgramAddEditComponent} from "./schooling/configuration/program/program-add-edit/program-add-edit.component";
import {DepartmentComponent} from "./schooling/configuration/department/department.component";
import {
  DepartmentAddEditComponent
} from "./schooling/configuration/department/department-add-edit/department-add-edit.component";
import {PeriodTypeComponent} from "../setting/school/period-type/period-type.component";
import {
  PeriodTypeAddEditComponent
} from "../setting/school/period-type/period-type-add-edit/period-type-add-edit.component";
import {EvaluationPeriodComponent} from "./exam/configuration/evaluation-period/evaluation-period.component";
import {
  EvaluationPeriodAddEditComponent
} from "./exam/configuration/evaluation-period/evaluation-period-add-edit/evaluation-period-add-edit.component";
import {SequenceAddEditComponent} from "./exam/configuration/sequence/sequence-add-edit/sequence-add-edit.component";
import {SequenceComponent} from "./exam/configuration/sequence/sequence.component";
import { StudentInternshipComponent } from './exam/internship/student-internship/student-internship.component';
import { StudentIntershipAddEditComponent } from './exam/internship/student-internship/student-intership-add-edit/student-intership-add-edit.component';
import { GraduationComponent } from './exam/internship/graduation/graduation.component';
import { GraguationAddEditComponent } from './exam/internship/graduation/graguation-add-edit/graguation-add-edit.component';
import { CertificationComponent } from './exam/internship/certification/certification.component';
import { CertificationAddEditComponent } from './exam/internship/certification/certification-add-edit/certification-add-edit.component';
import { ResearchWorkComponent } from './exam/internship/research-work/research-work.component';
import { ResearchWorkAddEditComponent } from './exam/internship/research-work/research-work-add-edit/research-work-add-edit.component';
import { ClassAndRoomComponent } from './schooling/configuration/class-and-room/class-and-room.component';
import { ClassAndRoomAddEditComponent } from './schooling/configuration/class-and-room/class-and-room-add-edit/class-and-room-add-edit.component';
import { ClassAndHourlyrateComponent } from './schooling/configuration/class-and-hourlyrate/class-and-hourlyrate.component';
import { ClassAndHourlyrateAddEditComponent } from './schooling/configuration/class-and-hourlyrate/class-and-hourlyrate-add-edit/class-and-hourlyrate-add-edit.component';
import { NextClassComponent } from './schooling/configuration/next-class/next-class.component';
import { NextClassAddEditComponent } from './schooling/configuration/next-class/next-class-add-edit/next-class-add-edit.component';
import { TeacherContactComponent } from './study/teacher-contact/teacher-contact.component';
import { TeacherContactAddEditComponent } from './study/teacher-contact/teacher-contact-add-edit/teacher-contact-add-edit.component';
import { TeacherIdentityComponent } from './study/teacher-identity/teacher-identity.component';
import { TeacherIdentityAddEditComponent } from './study/teacher-identity/teacher-identity-add-edit/teacher-identity-add-edit.component';
import { CycleWeightingComponent } from './exam/configuration/cycle-weighting/cycle-weighting.component';
import { CycleWeightingAddEditComponent } from './exam/configuration/cycle-weighting/cycle-weighting-add-edit/cycle-weighting-add-edit.component';
import { ClassWeightingComponent } from './exam/configuration/class-weighting/class-weighting.component';
import { ClassWeightingAddEditComponent } from './exam/configuration/class-weighting/class-weighting-add-edit/class-weighting-add-edit.component';
import { SchoolWeightingComponent } from './exam/configuration/school-weighting/school-weighting.component';
import { SchoolWeightingAddEditComponent } from './exam/configuration/school-weighting/school-weighting-add-edit/school-weighting-add-edit.component';
import { SpecialityWeightingComponent } from './exam/configuration/speciality-weighting/speciality-weighting.component';
import { SpecialityWeightingAddEditComponent } from './exam/configuration/speciality-weighting/speciality-weighting-add-edit/speciality-weighting-add-edit.component';
import { SchoolYearComponent } from './schooling/configuration/school-year/school-year.component';
import { SchoolYearAddEditComponent } from './schooling/configuration/school-year/school-year-add-edit/school-year-add-edit.component';
import {ConcourComponent} from "./schooling/configuration/concour/concour.component";
import {ConcourAddEditComponent} from "./schooling/configuration/concour/concour-add-edit/concour-add-edit.component";
import {TestGroupComponent} from "./schooling/configuration/test-group/test-group.component";
import {
  TestGroupAddEditComponent
} from "./schooling/configuration/test-group/test-group-add-edit/test-group-add-edit.component";
import {TestMaterialComponent} from "./schooling/configuration/test-material/test-material.component";
import {
  TestMaterialAddEditComponent
} from "./schooling/configuration/test-material/test-material-add-edit/test-material-add-edit.component";
import {NationalExamComponent} from "./schooling/configuration/national-exam/national-exam.component";
import {
  NationalExamAddEditComponent
} from "./schooling/configuration/national-exam/national-exam-add-edit/national-exam-add-edit.component";
import {TargetComponent} from "./schooling/configuration/target/target.component";
import {TargetAddEditComponent} from "./schooling/configuration/target/target-add-edit/target-add-edit.component";
import {QualityComponent} from "./schooling/configuration/quality/quality.component";
import {QualityAddEditComponent} from "./schooling/configuration/quality/quality-add-edit/quality-add-edit.component";
import {DiplomamensionComponent} from "./schooling/configuration/diplomamension/diplomamension.component";
import {
  DiplomamensionAddEditComponent
} from "./schooling/configuration/diplomamension/diplomamension-add-edit/diplomamension-add-edit.component";
import {MatStepperModule} from "@angular/material/stepper";
import {MatListModule} from "@angular/material/list";
import { UserCurrentYearComponent } from './schooling/configuration/user-current-year/user-current-year.component';
import { UserCurrentAddEditComponent } from './schooling/configuration/user-current-year/user-current-add-edit/user-current-add-edit.component';
import {MatSelectModule} from "@angular/material/select";
import { SchoolSessionComponent } from './schooling/configuration/school-session/school-session.component';
import { SchoolSessionAddEditComponent } from './schooling/configuration/school-session/school-session-add-edit/school-session-add-edit.component';
import { SchoolPeriodComponent } from './schooling/configuration/school-period/school-period.component';
import { SchoolPeriodAddEditComponent } from './schooling/configuration/school-period/school-period-add-edit/school-period-add-edit.component';
import {StudoldregistrationComponent} from "./schooling/registration/studoldregistration/studoldregistration.component";
import {
  StudoldregistrationAddEditComponent
} from "./schooling/registration/studoldregistration/studoldregistration-add-edit/studoldregistration-add-edit.component";
import {
  RegistrationperclassComponent
} from "./schooling/registration/registrationperclass/registrationperclass.component";
import {
  RegistrationperclassAddEditComponent
} from "./schooling/registration/registrationperclass/registrationperclass-add-edit/registrationperclass-add-edit.component";
import {
  RegistrationperclassEditComponent
} from "./schooling/registration/registrationperclass/registrationperclass-edit/registrationperclass-edit.component";
import { FormulaThComponent } from './exam/configuration/formula-th/formula-th.component';
import { FormulaThAddEditComponent } from './exam/configuration/formula-th/formula-th-add-edit/formula-th-add-edit.component';
import {SexComponent} from "./schooling/configuration/sex/sex.component";
import {SexAddEditComponent} from "./schooling/configuration/sex/sex-add-edit/sex-add-edit.component";
import {ReligionComponent} from "./schooling/configuration/religion/religion.component";
import {
  ReligionAddEditComponent
} from "./schooling/configuration/religion/religion-add-edit/religion-add-edit.component";
import {RegimeComponent} from "./schooling/configuration/regime/regime.component";
import {RegimeAddEditComponent} from "./schooling/configuration/regime/regime-add-edit/regime-add-edit.component";
import { ClassProgramComponent } from './study/class-program/class-program.component';
import { ClassProgramAddEditComponent } from './study/class-program/class-program-add-edit/class-program-add-edit.component';
import { BloodgroupComponent } from './schooling/configuration/bloodgroup/bloodgroup.component';
import { BloodgroupAddEditComponent } from './schooling/configuration/bloodgroup/bloodgroup-add-edit/bloodgroup-add-edit.component';
import { CivilityComponent } from './schooling/configuration/civility/civility.component';
import { CivilityAddEditComponent } from './schooling/configuration/civility/civility-add-edit/civility-add-edit.component';
import { IdentityTypeComponent } from './schooling/configuration/identity-type/identity-type.component';
import { IdentityTypeAddEditComponent } from './schooling/configuration/identity-type/identity-type-add-edit/identity-type-add-edit.component';
import { MaritalStatusComponent } from './schooling/configuration/marital-status/marital-status.component';
import { MaritalStatusAddEditComponent } from './schooling/configuration/marital-status/marital-status-add-edit/marital-status-add-edit.component';
import { RhesusComponent } from './schooling/configuration/rhesus/rhesus.component';
import { RhesusAddEditComponent } from './schooling/configuration/rhesus/rhesus-add-edit/rhesus-add-edit.component';
import { ExspenseHeadingComponent } from './schooling/configuration/exspense-heading/exspense-heading.component';
import { ExspenseHeadingAddEditComponent } from './schooling/configuration/exspense-heading/exspense-heading-add-edit/exspense-heading-add-edit.component';
import {ParentComponent} from "./schooling/registration/parent/parent.component";
import {ParentAddEditComponent} from "./schooling/registration/parent/parent-add-edit/parent-add-edit.component";
import {StudentComponent} from "./schooling/registration/student/student.component";
import {StudentAddEditComponent} from "./schooling/registration/student/student-add-edit/student-add-edit.component";
import { SubjectNatureComponent } from './study/subject-nature/subject-nature.component';
import { SubjectNatureAddEditComponent } from './study/subject-nature/subject-nature-add-edit/subject-nature-add-edit.component';


@NgModule({
  declarations: [
    CampusComponent,
    CampusAddEditComponent,
    BuildingComponent,
    BuildingAddEditComponent,
    RoomComponent,
    RoomAddEditComponent,
    SchoolComponent,
    SchoolAddEditComponent,
    CycleComponent,
    CycleAddEditComponent,
    LevelComponent,
    LevelAddEditComponent,
    OptionComponent,
    OptionAddEditComponent,
    PentionschemeComponent,
    PentionschemeAddEditComponent,
    PensionBracketComponent,
    PensionBracketAddEditComponent,
    RegistrationFormComponent,
    RegistrationFormAddEditComponent,
    TuitionComponent,
    TuitionAddEditComponent,
    TrainingTypeComponent,
    TrainingTypeAddEditComponent,
    CostAreaComponent,
    CostAreaAddEditComponent,
    FamilyComponent,
    FamilyAddEditComponent,
    SchoolOriginComponent,
    SchoolOriginAddEditComponent,
    NoteTypeComponent,
    NoteTypeAddEditComponent,
    DiplomaComponent,
    DiplomaAddEditComponent,
    GradingComponent,
    GradingAddEditComponent,
    StudregistrationComponent,
    StudregistrationAddEditComponent,
    StudoldregistrationComponent,
    StudoldregistrationAddEditComponent,
    RegistrationperclassComponent,
    RegistrationperclassAddEditComponent,
    RegistrationperclassEditComponent,
    RegistrationperclassEditComponent,


    TeacherComponent,
    TeacherAddEditComponent,
    SubjectComponent,
    SubjectAddEditComponent,
    SubjectTypeComponent,
    SubjectTypeAddEditComponent,
    CourseModuleComponent,
    CourseModuleAddEditComponent,
    ModuleCategoryComponent,
    ModuleCategoryAddEditComponent,
    SchoolClassComponent,
    SchoolClassAddEditComponent,
    ClassCategoryComponent,
    ClassCategoryAddEditComponent,
    SpecialityComponent,
    SpecialityAddEditComponent,
    ProgramComponent,
    ProgramAddEditComponent,
    DepartmentComponent,
    DepartmentAddEditComponent,
    PeriodTypeComponent,
    PeriodTypeAddEditComponent,
    EvaluationPeriodComponent,
    EvaluationPeriodAddEditComponent,
    SequenceAddEditComponent,
    SequenceComponent,
    StudentInternshipComponent,
    StudentIntershipAddEditComponent,
    GraduationComponent,
    GraguationAddEditComponent,
    CertificationComponent,
    CertificationAddEditComponent,
    ResearchWorkComponent,
    ResearchWorkAddEditComponent,
    ClassAndRoomComponent,
    ClassAndRoomAddEditComponent,
    ClassAndHourlyrateComponent,
    ClassAndHourlyrateAddEditComponent,
    NextClassComponent,
    NextClassAddEditComponent,
    TeacherContactComponent,
    TeacherContactAddEditComponent,
    TeacherIdentityComponent,
    TeacherIdentityAddEditComponent,
    CycleWeightingComponent,
    CycleWeightingAddEditComponent,
    ClassWeightingComponent,
    ClassWeightingAddEditComponent,
    SchoolWeightingComponent,
    SchoolWeightingAddEditComponent,
    SpecialityWeightingComponent,
    SpecialityWeightingAddEditComponent,
    SchoolYearComponent,
    SchoolYearAddEditComponent,
    ConcourComponent,
    ConcourAddEditComponent,
    TestGroupComponent,
    TestGroupAddEditComponent,
    TestMaterialComponent,
    TestMaterialAddEditComponent,
    NationalExamComponent,
    NationalExamAddEditComponent,
    TargetComponent,
    TargetAddEditComponent,
    QualityComponent,
    QualityAddEditComponent,
    DiplomamensionComponent,
    DiplomamensionAddEditComponent,
    UserCurrentYearComponent,
    UserCurrentAddEditComponent,
    SchoolSessionComponent,
    SchoolSessionAddEditComponent,
    SchoolPeriodComponent,
    SchoolPeriodAddEditComponent,
    FormulaThComponent,
    FormulaThAddEditComponent,
    SexComponent,
    SexAddEditComponent,
    ReligionComponent,
    ReligionAddEditComponent,
    RegimeComponent,
    RegimeAddEditComponent,
    ClassProgramComponent,
    ClassProgramAddEditComponent,
    BloodgroupComponent,
    BloodgroupAddEditComponent,
    CivilityComponent,
    CivilityAddEditComponent,
    IdentityTypeComponent,
    IdentityTypeAddEditComponent,
    MaritalStatusComponent,
    MaritalStatusAddEditComponent,
    RhesusComponent,
    RhesusAddEditComponent,
    ExspenseHeadingComponent,
    ExspenseHeadingAddEditComponent,
    ParentComponent,
    ParentAddEditComponent,
    StudentComponent,
    StudentAddEditComponent,
    SubjectNatureComponent,
    SubjectNatureAddEditComponent

  ],
    imports: [
        CommonModule,
        SchoolRoutingModule,
        MatCardModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        TranslateModule,
        SharedModule,
        NgSelectModule,
        MatRadioModule,
        MatInputModule,
        MatStepperModule,
        MatListModule,
        MatSelectModule
    ]
})
export class SchoolModule{ }
