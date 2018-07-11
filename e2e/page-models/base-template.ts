import { Selector } from "testcafe";
import { ReactSelector } from "testcafe-react-selectors";

export abstract class BaseTemplate {
    private map: Selector;
    constructor(protected test: TestController) {
        this.map = ReactSelector("MapViewerBase");
    }
    public async assertMapPresent() {
        await this.test.expect(this.map.exists).ok();
    }
}