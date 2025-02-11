import { AfterViewInit, Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Directive({
    selector: '[appInfiniteScroll]',
    standalone: true,
})
export class InfiniteScrollDirective implements AfterViewInit, OnInit {
    @Output() appInfiniteScroll = new EventEmitter<boolean>();
    observer!: IntersectionObserver;

    constructor(private element: ElementRef) {}

    ngOnInit(): void {
        this.intersectionObserver();
    }

    ngAfterViewInit(): void {
        this.observer.observe(this.element.nativeElement);
    }

    intersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log('scroll more');
                this.appInfiniteScroll.emit(true);
            }
        }, options);
    }
}
