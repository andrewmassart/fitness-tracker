//importing everything separately forces you to only use what you need
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
})
export class MaterialModule {}
