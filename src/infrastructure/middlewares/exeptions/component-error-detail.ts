export class ComponentError {

    errors: ComponentErrorDetail[];

    constructor() {
        this.errors = [];
    }

    addModelError(field: string, message?: string) {
        this.errors.push({
            field,
            message
        });
    }
}

export class ComponentErrorDetail {
    public field: string;
    public message?: string;
}