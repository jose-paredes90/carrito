import { ComponentErrorDetail } from "./component-error-detail";

export class BadRequestException extends Error {
    public errors: ComponentErrorDetail[];

    constructor(errors: ComponentErrorDetail[]) {
        super();
        this.errors = errors;
    }
}