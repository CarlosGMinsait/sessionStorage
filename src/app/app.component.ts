import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionStorageService } from './services/sessionStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'appStorageTest';
  sessionStorageItems: { [key: string]: any } = {};

  formulario!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _sessionStorage: SessionStorageService
  ) {
    this.buildForm();
  }
  ngOnDestroy(): void {
    window.removeEventListener('storage', this.handleStorageChage);
  }
  ngOnInit(): void {
    this.updateSessionStorageItems();
    window.addEventListener('storage', this.handleStorageChage);
  }
  ngAfterViewInit(): void {}

  buildForm(): void {
    this.formulario = this._fb.group({
      key: [],
      value: [],
    });
  }

  onSubmit() {
    const key = this.formulario.get('key')?.value;
    const value = this.formulario.get('value')?.value;

    this._sessionStorage.setItem(key, value);
    this.clearForm();
    this.updateSessionStorageItems();
  }

  onDelete() {
    const key = this.formulario.get('key')?.value;
    this._sessionStorage.removeItem(key);
    this.clearForm();

    this.updateSessionStorageItems();
  }

  onDeleteAll(){
    this._sessionStorage.clear();
    this.clearForm();

    this.updateSessionStorageItems();
  }

  updateSessionStorageItems() {
    this.sessionStorageItems = this._sessionStorage.getAllItems();
  }

  handleStorageChage = (event: StorageEvent) => {
    if (event.storageArea === sessionStorage) {
      this.updateSessionStorageItems();
    }
  };

  clearForm(){
    this.formulario.reset();
  }
}
