import {Subjects, Publisher, ExpirationCompleteEvent} from '@obitickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
    
}