// Core
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
// Form controls
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select'
// Navigation
import {MatMenuModule} from '@angular/material/menu'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar'
// Layout
import {MatCardModule} from '@angular/material/card'
import {MatDividerModule} from '@angular/material/divider'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatListModule} from '@angular/material/list'
import {MatTabsModule} from '@angular/material/tabs'
// Buttons & Indicators
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule, MatIconRegistry} from '@angular/material/icon'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatRippleModule} from '@angular/material/core'
// Popups & Modals
import {MatDialogModule} from '@angular/material/dialog'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatTooltipModule} from '@angular/material/tooltip'
// Data Table
import {MatTableModule} from '@angular/material/table'

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTableModule
  ],
  exports: [
    MatAutocompleteModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTableModule
  ],
  providers: [MatIconRegistry]
})
export class MaterialModule {}
