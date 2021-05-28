import Progress from 'domain/valueobject/progress/index';

export default class Issue {
    private id: number;
    private name: string;
    private progress: Progress;

    constructor(id: number, name: string, progress: Progress) {
        this.id = id;
        this.name = name;
        this.progress = progress;
    }
}