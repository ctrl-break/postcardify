import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MediaService {
    #breakpointObserver = inject(BreakpointObserver);

    isMobile = toSignal(
        this.#breakpointObserver.observe('(max-width: 768px)').pipe(
            map((result) => result.matches),
            shareReplay(),
        ),
    );
}
