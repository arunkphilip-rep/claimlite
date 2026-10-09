import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HttpClientTestingModule],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should render claimlite dashboard heading', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const usersRequest = httpTestingController.expectOne(
      'http://localhost:3000/api/users',
    );
    usersRequest.flush([]);

    const claimsRequest = httpTestingController.expectOne(
      'http://localhost:3000/api/claims',
    );
    claimsRequest.flush([]);

    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain(
      'ClaimLite dashboard',
    );
  });
});
