import Issue from 'domain/entity/issues/issue/index';
import ProgressValueObject from 'domain/valueobject/progress';

describe('Section entity Issue', () => {
    it('confirm make instance Issue', () => {
        const newIssue = new Issue(1, 'Basic', new ProgressValueObject());
        console.log(newIssue);
        expect(newIssue).toBeDefined();
    });
});