import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LikeWidgetComponent } from "./like-widget.component";
//import { UniqueIdService } from "../../services/unique-id/unique-id.service";
//import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LikeWidgetModule } from "./like-widget.module";

describe(LikeWidgetComponent.name, () => {

    let fixture: ComponentFixture<LikeWidgetComponent> = null;
    let component: LikeWidgetComponent = null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LikeWidgetModule]
            //declarations: [LikeWidgetComponent],
            //providers: [UniqueIdService],
            //imports: [FontAwesomeModule]
        }).compileComponents();

        fixture = TestBed.createComponent(LikeWidgetComponent);
        component = fixture.componentInstance;
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
        fixture.detectChanges();
        expect(component.id).toBeTruthy();
    });

    it('Should NOT auto-generate ID during ngOnInit when (@input id) is assigned', () => {
        const someId = 'someId';
        component.id = someId;
        fixture.detectChanges();        
        expect(component.id).toBe(someId);
    });

    it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called`, done => {
        fixture.detectChanges();
        component.liked.subscribe(() => {
            expect(true).toBeTrue();
            done();
        });
        component.like();
    });

    // A função abaixo faz o mesmo teste que a função acima, mas com um método melhor para este caso em específico.
    it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called - 2`, () => {
        spyOn(component.liked, 'emit');
        fixture.detectChanges();
        component.like();
        expect(component.liked.emit).toHaveBeenCalled();
    });

});