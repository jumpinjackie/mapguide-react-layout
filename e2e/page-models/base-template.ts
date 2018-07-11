import { Selector } from "testcafe";
import { ReactSelector } from "testcafe-react-selectors";

export abstract class BaseTemplate {
    private map: Selector;
    constructor(protected test: TestController) {
        //NOTE: This will fail if using the production viewer bundle as it will mangle React component names
        this.map = ReactSelector("MapViewerBase");
    }
    public async assertMapPresent() {
        await this.test.expect(this.map.visible).ok();
    }
    public async invokeZoomIn() {
        const btn = Selector("div.zoom-in-fixed");
        await this.test.click(btn);
    }
    public async invokeZoomOut() {
        const btn = Selector("div.zoom-out-fixed");
        await this.test.click(btn);
    }
    public async invokeZoomFull() {
        const btn = Selector("div.zoom-out-fixed");
        await this.test.click(btn);
    }
    public async invokeZoomRect() {
        const btn = Selector("div.zoom-in");
        await this.test.click(btn);
    }
    public async invokePan() {
        const btn = Selector("div.pan");
        await this.test.click(btn);
    }
    public async invokeSelect() {
        const btn = Selector("div.select");
        await this.test.click(btn);
    }
    public async invokeMaptip() {
        const btn = Selector("div.maptip");
        await this.test.click(btn);
    }
    public async invokeClearSelection() {
        const btn = Selector("div.select-clear");
        await this.test.click(btn);
    }
    public async boxSelect(offset: [number, number], from: [number, number]) {
        await this.invokeSelect();
        await this.test.drag(this.map, offset[0], offset[1], { offsetX: from[0], offsetY: from[1] });
    }
    public async boxZoom(offset: [number, number], from: [number, number]) {
        await this.invokeZoomRect();
        await this.test.drag(this.map, offset[0], offset[1], { offsetX: from[0], offsetY: from[1] });
    }
    public async dragPan(offset: [number, number], from: [number, number]) {
        await this.invokePan();
        await this.test.drag(this.map, offset[0], offset[1], { offsetX: from[0], offsetY: from[1] });
    }
    public async getMapComponentState() {
        return await this.map.getReact();
    }
    public async getSessionId() {
        const { props } = await this.getMapComponentState();
        return props.map.SessionId;
    }
}