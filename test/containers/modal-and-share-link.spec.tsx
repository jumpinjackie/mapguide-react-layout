/**
 * Coverage tests for modal-launcher and share-link-to-view containers.
 */
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const hooksMock = vi.hoisted(() => ({
   useViewerLocale: vi.fn(),
}));

const hooksMapGuideMock = vi.hoisted(() => ({
   useActiveMapState: vi.fn(),
}));

const mapProviderMock = vi.hoisted(() => ({
   useAppState: vi.fn(),
   useReduxDispatch: vi.fn(),
   useMapProviderContext: vi.fn(),
}));

const modalActionsMock = vi.hoisted(() => ({
   hideModal: vi.fn(),
   updateModal: vi.fn(),
}));

const componentRegistryMock = vi.hoisted(() => ({
   getComponentFactory: vi.fn(),
}));

const i18nMock = vi.hoisted(() => ({
   tr: vi.fn(),
}));

const urlUtilsMock = vi.hoisted(() => ({
   parseComponentUri: vi.fn(),
   parseUrl: vi.fn(),
   stringifyQuery: vi.fn(),
   isComponentUri: vi.fn(),
}));

vi.mock("../../src/containers/hooks", () => hooksMock);
vi.mock("../../src/containers/hooks-mapguide", () => hooksMapGuideMock);
vi.mock("../../src/components/map-providers/context", () => mapProviderMock);
vi.mock("../../src/actions/modal", () => modalActionsMock);
vi.mock("../../src/api/registry/component", () => componentRegistryMock);
vi.mock("../../src/api/i18n", () => i18nMock);
vi.mock("../../src/utils/url", () => urlUtilsMock);

vi.mock("../../src/components/error", () => ({
   Error: ({ error }: { error: unknown }) => <div data-testid="error">{String(error)}</div>,
}));

vi.mock("../../src/components/modal-dialog", () => ({
   RndModalDialog: ({ children, onClose, onChange }: any) => (
      <div data-testid="modal">
         <button data-testid="modal-close" onClick={onClose} />
         <button data-testid="modal-change" onClick={() => onChange({ width: 10, height: 10 })} />
         {typeof children === "function" ? children([300, 200]) : children}
      </div>
   ),
}));

vi.mock("../../src/components/elements/element-context", () => ({
   useElementContext: () => ({
      Checkbox: ({ checked, label, onChange }: any) => (
         <label>
            <input data-testid="session-checkbox" type="checkbox" checked={checked} onChange={onChange} />
            {label}
         </label>
      ),
      Button: ({ children, onClick }: any) => <button data-testid="copy-btn" onClick={onClick}>{children}</button>,
   }),
}));

import { ModalLauncher } from "../../src/containers/modal-launcher";
import { ShareLinkToViewContainer } from "../../src/containers/share-link-to-view";

describe("modal-launcher and share-link-to-view", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      hooksMock.useViewerLocale.mockReturnValue("en");
      hooksMapGuideMock.useActiveMapState.mockReturnValue({ Name: "Map1" });

      const dispatch = vi.fn();
      mapProviderMock.useReduxDispatch.mockReturnValue(dispatch);
      mapProviderMock.useMapProviderContext.mockReturnValue({
         isReady: () => true,
         toastSuccess: vi.fn(),
      });
      modalActionsMock.hideModal.mockImplementation((name: string) => ({ type: "HIDE_MODAL", payload: name }));
      modalActionsMock.updateModal.mockImplementation((name: string) => ({ type: "UPDATE_MODAL", payload: name }));

      i18nMock.tr.mockImplementation((key: string) => key);

      urlUtilsMock.parseUrl.mockImplementation(() => ({
         url: "http://example.test/viewer",
         query: { session: "ABC", foo: "bar" },
      }));
      urlUtilsMock.stringifyQuery.mockImplementation((q: Record<string, string>) => {
         return Object.keys(q).map(k => `${k}=${q[k]}`).join("&");
      });

      urlUtilsMock.isComponentUri.mockImplementation((u: string) => u.startsWith("component://"));
      urlUtilsMock.parseComponentUri.mockReturnValue({ name: "SampleComponent", props: { a: 1 } });
   });

   it("renders noscript when modal state is missing", () => {
      mapProviderMock.useAppState.mockReturnValue(undefined);
      const { container } = render(<ModalLauncher />);
      expect(container.querySelector("noscript")).toBeTruthy();
   });

   it("renders component modal and dispatches update/hide actions", () => {
      mapProviderMock.useAppState.mockReturnValue({
         m1: {
            component: "SampleComponent",
            componentProps: { b: 2 },
            modal: { title: "T1" },
         },
      });
      componentRegistryMock.getComponentFactory.mockReturnValue((props: any) => <div data-testid="component-renderer">{JSON.stringify(props)}</div>);

      render(<ModalLauncher />);

      expect(screen.getByTestId("modal")).toBeTruthy();
      expect(screen.getByTestId("component-renderer").textContent).toContain("\"b\":2");
      fireEvent.click(screen.getByTestId("modal-change"));
      fireEvent.click(screen.getByTestId("modal-close"));
      expect(modalActionsMock.updateModal).toHaveBeenCalledWith("m1", { width: 10, height: 10 });
      expect(modalActionsMock.hideModal).toHaveBeenCalledWith("m1");
   });

   it("renders iframe modal when URL modal is not a component uri", () => {
      urlUtilsMock.isComponentUri.mockReturnValue(false);
      mapProviderMock.useAppState.mockReturnValue({
         m2: {
            url: "https://example.test/frame",
            modal: { title: "Frame" },
         },
      });

      const { container } = render(<ModalLauncher />);
      expect(container.querySelector("iframe")?.getAttribute("src")).toBe("https://example.test/frame");
   });

   it("renders share link and copies to clipboard", async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(globalThis.navigator, "clipboard", {
         value: { writeText },
         configurable: true,
      });

      const toastSuccess = vi.fn();
      mapProviderMock.useMapProviderContext.mockReturnValue({
         isReady: () => true,
         toastSuccess,
      });

      render(<ShareLinkToViewContainer />);
      fireEvent.click(screen.getByTestId("copy-btn"));

      await waitFor(() => {
         expect(writeText).toHaveBeenCalled();
      });
      await waitFor(() => {
         expect(toastSuccess).toHaveBeenCalled();
      });
      expect(screen.getByTestId("session-checkbox")).toBeTruthy();
   });

   it("toggles session query parameter in generated share URL", async () => {
      render(<ShareLinkToViewContainer />);

      const before = (screen.getByRole("textbox") as HTMLTextAreaElement).value;
      expect(before.includes("session=ABC")).toBe(false);

      fireEvent.click(screen.getByTestId("session-checkbox"));
      await waitFor(() => {
         const after = (screen.getByRole("textbox") as HTMLTextAreaElement).value;
         expect(after.includes("session=ABC")).toBe(true);
      });
   });

   it("uses fallback clipboard copy when navigator clipboard API is unavailable", async () => {
      Object.defineProperty(globalThis.navigator, "clipboard", {
         value: undefined,
         configurable: true,
      });
      Object.defineProperty(document, "execCommand", {
         value: () => true,
         configurable: true,
      });
      const execSpy = vi.spyOn(document, "execCommand").mockReturnValue(true as any);

      const toastSuccess = vi.fn();
      mapProviderMock.useMapProviderContext.mockReturnValue({
         isReady: () => true,
         toastSuccess,
      });

      render(<ShareLinkToViewContainer />);
      fireEvent.click(screen.getByTestId("copy-btn"));

      await waitFor(() => {
         expect(execSpy).toHaveBeenCalledWith("copy");
      });
      await waitFor(() => {
         expect(toastSuccess).toHaveBeenCalled();
      });
      execSpy.mockRestore();
   });
});
