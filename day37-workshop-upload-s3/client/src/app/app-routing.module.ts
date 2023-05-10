import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  { path: "", component: PostComponent },
  { path: "view", component: ViewComponent },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
