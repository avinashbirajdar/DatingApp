import { from } from 'rxjs'
import { Routes } from '@angular/router'
import { HomeComponent } from './app/home/home.component'
import { MemberListComponent } from './app/members/member-list/member-list.component'
import { MessagesComponent } from './app/messages/messages.component'
import { ListsComponent } from './app/lists/lists.component'
import { AuthGuard } from './app/_guards/auth.guard'
import { MemberDetailComponent } from './app/members/member-detail/member-detail.component'
import { MemberDetailResolver } from './app/_resolvers/member-detail.resolver'
import { MemberListResolver } from './app/_resolvers/member-list.resolver'
import { MemberEditComponent } from './app/members/member-edit/member-edit.component'
import { MemberEditResolver } from './app/_resolvers/member-edit.resolver'
import { PrevetUnsavedChanges } from './app/_guards/prevent-unsaved-changes.guard'
import { PhotoEditorComponent } from './app/members/photo-editor/photo-editor.component'
import { ListsResolver } from './app/_resolvers/lists.resolver'

export const appRoutes=[
    {path:'home',component:HomeComponent},
    {
     path:'',
     runGuardAndResolvers:'always',
     canActivate:[AuthGuard],
     children:[
    {path:'members',component:MemberListComponent,resolve :{users:MemberListResolver}},
    {path:'members/:id',component:MemberDetailComponent,resolve :{user:MemberDetailResolver}},
    {path:'member/edit',component:MemberEditComponent,resolve :{user:MemberEditResolver},canDeactivate:[PrevetUnsavedChanges]},
    {path:'messages',component:MessagesComponent},
    {path:'lists',component:ListsComponent,resolve:{users:ListsResolver}},
    {path:'members/photoedior',component:PhotoEditorComponent}
     ]
    },
    {path:'**',redirectTo: 'home',pathMatch:'full'}
]
