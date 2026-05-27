import { a as __toESM, i as __toCommonJS, n as __esmMin, r as __exportAll, t as __commonJSMin } from "./chunks/rolldown-runtime-debug.js";
import { a as require_react_dom, i as require_jsx_runtime, n as require_react_is$1, o as require_react, r as require_react_is, t as require_prop_types } from "./chunks/react-vendor-debug.js";
import { Dr as _defineProperty, Er as init_objectSpread2, Jt as init_objectWithoutProperties, Or as init_defineProperty, Tr as _objectSpread2, qt as _objectWithoutProperties, wr as _asyncToGenerator } from "./chunks/geotiff-debug.js";
//#region node_modules/react-tiny-popover/dist/PopoverPortal.js
var require_PopoverPortal = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PopoverPortal = void 0;
	var react_1 = require_react();
	var react_dom_1 = require_react_dom();
	var PopoverPortal = function(_a) {
		var container = _a.container, element = _a.element, scoutElement = _a.scoutElement, children = _a.children;
		(0, react_1.useLayoutEffect)(function() {
			container.appendChild(element);
			container.appendChild(scoutElement);
			return function() {
				container.removeChild(element);
				container.removeChild(scoutElement);
			};
		}, [
			container,
			element,
			scoutElement
		]);
		return (0, react_dom_1.createPortal)(children, element);
	};
	exports.PopoverPortal = PopoverPortal;
}));
//#endregion
//#region node_modules/react-tiny-popover/dist/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __assign = exports && exports.__assign || function() {
		__assign = Object.assign || function(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getNudgedPopoverRect = exports.getNewPopoverRect = exports.popoverRectForPosition = exports.createContainer = exports.rectsAreEqual = exports.createRect = exports.EMPTY_RECT = void 0;
	exports.EMPTY_RECT = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: 0,
		height: 0
	};
	var createRect = function(_a) {
		var top = _a.top, left = _a.left, width = _a.width, height = _a.height;
		return {
			top,
			left,
			width,
			height,
			right: left + width,
			bottom: top + height
		};
	};
	exports.createRect = createRect;
	var rectsAreEqual = function(rectA, rectB) {
		return rectA === rectB || (rectA === null || rectA === void 0 ? void 0 : rectA.bottom) === (rectB === null || rectB === void 0 ? void 0 : rectB.bottom) && (rectA === null || rectA === void 0 ? void 0 : rectA.height) === (rectB === null || rectB === void 0 ? void 0 : rectB.height) && (rectA === null || rectA === void 0 ? void 0 : rectA.left) === (rectB === null || rectB === void 0 ? void 0 : rectB.left) && (rectA === null || rectA === void 0 ? void 0 : rectA.right) === (rectB === null || rectB === void 0 ? void 0 : rectB.right) && (rectA === null || rectA === void 0 ? void 0 : rectA.top) === (rectB === null || rectB === void 0 ? void 0 : rectB.top) && (rectA === null || rectA === void 0 ? void 0 : rectA.width) === (rectB === null || rectB === void 0 ? void 0 : rectB.width);
	};
	exports.rectsAreEqual = rectsAreEqual;
	var createContainer = function(_a) {
		var containerStyle = _a.containerStyle, containerClassName = _a.containerClassName;
		var container = window.document.createElement("div");
		if (containerClassName) container.className = containerClassName;
		Object.assign(container.style, containerStyle);
		return container;
	};
	exports.createContainer = createContainer;
	var popoverRectForPosition = function(position, childRect, popoverRect, padding, align) {
		var targetMidX = childRect.left + childRect.width / 2;
		var targetMidY = childRect.top + childRect.height / 2;
		var width = popoverRect.width, height = popoverRect.height;
		var top;
		var left;
		switch (position) {
			case "left":
				top = targetMidY - height / 2;
				left = childRect.left - padding - width;
				if (align === "start") top = childRect.top;
				if (align === "end") top = childRect.bottom - height;
				break;
			case "bottom":
				top = childRect.bottom + padding;
				left = targetMidX - width / 2;
				if (align === "start") left = childRect.left;
				if (align === "end") left = childRect.right - width;
				break;
			case "right":
				top = targetMidY - height / 2;
				left = childRect.right + padding;
				if (align === "start") top = childRect.top;
				if (align === "end") top = childRect.bottom - height;
				break;
			default:
				top = childRect.top - height - padding;
				left = targetMidX - width / 2;
				if (align === "start") left = childRect.left;
				if (align === "end") left = childRect.right - width;
				break;
		}
		return (0, exports.createRect)({
			left,
			top,
			width,
			height
		});
	};
	exports.popoverRectForPosition = popoverRectForPosition;
	var getNewPopoverRect = function(_a, boundaryInset) {
		var position = _a.position, align = _a.align, childRect = _a.childRect, popoverRect = _a.popoverRect, boundaryRect = _a.boundaryRect, padding = _a.padding, reposition = _a.reposition;
		var rect = (0, exports.popoverRectForPosition)(position, childRect, popoverRect, padding, align);
		return {
			rect,
			boundaryViolation: reposition && (position === "top" && rect.top < boundaryRect.top + boundaryInset || position === "left" && rect.left < boundaryRect.left + boundaryInset || position === "right" && rect.right > boundaryRect.right - boundaryInset || position === "bottom" && rect.bottom > boundaryRect.bottom - boundaryInset)
		};
	};
	exports.getNewPopoverRect = getNewPopoverRect;
	var getNudgedPopoverRect = function(popoverRect, boundaryRect, boundaryInset) {
		var topBoundary = boundaryRect.top + boundaryInset;
		var leftBoundary = boundaryRect.left + boundaryInset;
		var rightBoundary = boundaryRect.right - boundaryInset;
		var bottomBoundary = boundaryRect.bottom - boundaryInset;
		var top = popoverRect.top < topBoundary ? topBoundary : popoverRect.top;
		top = top + popoverRect.height > bottomBoundary ? bottomBoundary - popoverRect.height : top;
		var left = popoverRect.left < leftBoundary ? leftBoundary : popoverRect.left;
		left = left + popoverRect.width > rightBoundary ? rightBoundary - popoverRect.width : left;
		return (0, exports.createRect)(__assign(__assign({}, popoverRect), {
			top,
			left
		}));
	};
	exports.getNudgedPopoverRect = getNudgedPopoverRect;
}));
//#endregion
//#region node_modules/react-tiny-popover/dist/useElementRef.js
var require_useElementRef = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.useElementRef = void 0;
	var react_1 = require_react();
	var util_1 = require_util();
	var useElementRef = function(_a) {
		var containerClassName = _a.containerClassName, containerStyle = _a.containerStyle;
		var ref = (0, react_1.useRef)();
		var element = (0, react_1.useState)(function() {
			return (0, util_1.createContainer)({
				containerStyle,
				containerClassName
			});
		})[0];
		(0, react_1.useLayoutEffect)(function() {
			element.className = containerClassName;
		}, [containerClassName, element]);
		(0, react_1.useLayoutEffect)(function() {
			Object.assign(element.style, containerStyle);
		}, [containerStyle, element]);
		ref.current = element;
		return ref;
	};
	exports.useElementRef = useElementRef;
}));
//#endregion
//#region node_modules/react-tiny-popover/dist/usePopover.js
var require_usePopover = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.usePopover = void 0;
	var react_1 = require_react();
	var util_1 = require_util();
	var useElementRef_1 = require_useElementRef();
	var POPOVER_STYLE = {
		position: "fixed",
		overflow: "visible",
		top: "0px",
		left: "0px"
	};
	var SCOUT_STYLE = {
		position: "fixed",
		top: "0px",
		left: "0px",
		width: "0px",
		height: "0px",
		visibility: "hidden"
	};
	var usePopover = function(_a) {
		var isOpen = _a.isOpen, childRef = _a.childRef, positions = _a.positions, containerClassName = _a.containerClassName, parentElement = _a.parentElement, transform = _a.transform, transformMode = _a.transformMode, align = _a.align, padding = _a.padding, reposition = _a.reposition, boundaryInset = _a.boundaryInset, boundaryElement = _a.boundaryElement, onPositionPopover = _a.onPositionPopover;
		var scoutRef = (0, useElementRef_1.useElementRef)({
			containerClassName: "react-tiny-popover-scout",
			containerStyle: SCOUT_STYLE
		});
		var popoverRef = (0, useElementRef_1.useElementRef)({
			containerClassName: containerClassName != null && containerClassName.length > 0 && containerClassName !== "react-tiny-popover-container" ? "react-tiny-popover-container ".concat(containerClassName) : "react-tiny-popover-container",
			containerStyle: POPOVER_STYLE
		});
		var positionPopover = (0, react_1.useCallback)(function(_a) {
			var _b, _c;
			var _d = _a === void 0 ? {} : _a, _e = _d.positionIndex, positionIndex = _e === void 0 ? 0 : _e, _f = _d.parentRect, parentRect = _f === void 0 ? parentElement.getBoundingClientRect() : _f, _g = _d.childRect, childRect = _g === void 0 ? (_b = childRef === null || childRef === void 0 ? void 0 : childRef.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect() : _g, _h = _d.scoutRect, scoutRect = _h === void 0 ? (_c = scoutRef === null || scoutRef === void 0 ? void 0 : scoutRef.current) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect() : _h, _j = _d.popoverRect, popoverRect = _j === void 0 ? popoverRef.current.getBoundingClientRect() : _j, _k = _d.boundaryRect, boundaryRect = _k === void 0 ? boundaryElement === parentElement ? parentRect : boundaryElement.getBoundingClientRect() : _k;
			if (!childRect || !parentRect || !isOpen) return;
			if (transform && transformMode === "absolute") {
				var _l = typeof transform === "function" ? transform({
					childRect,
					popoverRect,
					parentRect,
					boundaryRect,
					padding,
					align,
					nudgedTop: 0,
					nudgedLeft: 0,
					boundaryInset,
					violations: util_1.EMPTY_RECT,
					hasViolations: false
				}) : transform, inputTop = _l.top, inputLeft = _l.left;
				var finalLeft_1 = Math.round(parentRect.left + inputLeft - scoutRect.left);
				var finalTop_1 = Math.round(parentRect.top + inputTop - scoutRect.top);
				popoverRef.current.style.transform = "translate(".concat(finalLeft_1, "px, ").concat(finalTop_1, "px)");
				onPositionPopover({
					childRect,
					popoverRect: (0, util_1.createRect)({
						left: finalLeft_1,
						top: finalTop_1,
						width: popoverRect.width,
						height: popoverRect.height
					}),
					parentRect,
					boundaryRect,
					padding,
					align,
					transform: {
						top: inputTop,
						left: inputLeft
					},
					nudgedTop: 0,
					nudgedLeft: 0,
					boundaryInset,
					violations: util_1.EMPTY_RECT,
					hasViolations: false
				});
				return;
			}
			var isExhausted = positionIndex === positions.length;
			var position = isExhausted ? positions[0] : positions[positionIndex];
			var _m = (0, util_1.getNewPopoverRect)({
				childRect,
				popoverRect,
				boundaryRect,
				position,
				align,
				padding,
				reposition
			}, boundaryInset), rect = _m.rect;
			if (_m.boundaryViolation && reposition && !isExhausted) {
				positionPopover({
					positionIndex: positionIndex + 1,
					childRect,
					popoverRect,
					parentRect,
					boundaryRect
				});
				return;
			}
			var top = rect.top, left = rect.left, width = rect.width, height = rect.height;
			var shouldNudge = reposition && !isExhausted;
			var _o = (0, util_1.getNudgedPopoverRect)(rect, boundaryRect, boundaryInset), nudgedLeft = _o.left, nudgedTop = _o.top;
			var finalTop = top;
			var finalLeft = left;
			if (shouldNudge) {
				finalTop = nudgedTop;
				finalLeft = nudgedLeft;
			}
			finalTop = Math.round(finalTop - scoutRect.top);
			finalLeft = Math.round(finalLeft - scoutRect.left);
			popoverRef.current.style.transform = "translate(".concat(finalLeft, "px, ").concat(finalTop, "px)");
			var potentialViolations = {
				top: boundaryRect.top + boundaryInset - finalTop,
				left: boundaryRect.left + boundaryInset - finalLeft,
				right: finalLeft + width - boundaryRect.right + boundaryInset,
				bottom: finalTop + height - boundaryRect.bottom + boundaryInset
			};
			var popoverState = {
				childRect,
				popoverRect: (0, util_1.createRect)({
					left: finalLeft,
					top: finalTop,
					width,
					height
				}),
				parentRect,
				boundaryRect,
				position,
				align,
				padding,
				nudgedTop: nudgedTop - top,
				nudgedLeft: nudgedLeft - left,
				boundaryInset,
				violations: {
					top: potentialViolations.top <= 0 ? 0 : potentialViolations.top,
					left: potentialViolations.left <= 0 ? 0 : potentialViolations.left,
					right: potentialViolations.right <= 0 ? 0 : potentialViolations.right,
					bottom: potentialViolations.bottom <= 0 ? 0 : potentialViolations.bottom
				},
				hasViolations: potentialViolations.top > 0 || potentialViolations.left > 0 || potentialViolations.right > 0 || potentialViolations.bottom > 0
			};
			if (transform) {
				onPositionPopover(popoverState);
				var _p = typeof transform === "function" ? transform(popoverState) : transform, transformTop = _p.top, transformLeft = _p.left;
				popoverRef.current.style.transform = "translate(".concat(Math.round(finalLeft + (transformLeft !== null && transformLeft !== void 0 ? transformLeft : 0)), "px, ").concat(Math.round(finalTop + (transformTop !== null && transformTop !== void 0 ? transformTop : 0)), "px)");
				popoverState.nudgedLeft += transformLeft !== null && transformLeft !== void 0 ? transformLeft : 0;
				popoverState.nudgedTop += transformTop !== null && transformTop !== void 0 ? transformTop : 0;
				popoverState.transform = {
					top: transformTop,
					left: transformLeft
				};
			}
			onPositionPopover(popoverState);
		}, [
			parentElement,
			childRef,
			scoutRef,
			popoverRef,
			boundaryElement,
			isOpen,
			transform,
			transformMode,
			positions,
			align,
			padding,
			reposition,
			boundaryInset,
			onPositionPopover
		]);
		return {
			positionPopover,
			popoverRef,
			scoutRef
		};
	};
	exports.usePopover = usePopover;
}));
//#endregion
//#region node_modules/react-tiny-popover/dist/useMemoizedArray.js
var require_useMemoizedArray = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.useMemoizedArray = void 0;
	var react_1 = require_react();
	var useMemoizedArray = function(externalArray) {
		var prevArrayRef = (0, react_1.useRef)(externalArray);
		return (0, react_1.useMemo)(function() {
			if (prevArrayRef.current === externalArray) return prevArrayRef.current;
			if (prevArrayRef.current.length !== externalArray.length) {
				prevArrayRef.current = externalArray;
				return externalArray;
			}
			for (var i = 0; i < externalArray.length; i += 1) if (externalArray[i] !== prevArrayRef.current[i]) {
				prevArrayRef.current = externalArray;
				return externalArray;
			}
			return prevArrayRef.current;
		}, [externalArray]);
	};
	exports.useMemoizedArray = useMemoizedArray;
}));
//#endregion
//#region node_modules/react-tiny-popover/dist/useHandlePrevValues.js
var require_useHandlePrevValues = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.useHandlePrevValues = void 0;
	var react_1 = require_react();
	var useHandlePrevValues = function(props) {
		var prevPositions = (0, react_1.useRef)(props.positions);
		var prevReposition = (0, react_1.useRef)(props.reposition);
		var prevTransformMode = (0, react_1.useRef)(props.transformMode);
		var prevTransform = (0, react_1.useRef)(props.transform);
		var prevBoundaryElement = (0, react_1.useRef)(props.boundaryElement);
		var prevBoundaryInset = (0, react_1.useRef)(props.boundaryInset);
		var updatePrevValues = (0, react_1.useCallback)(function() {
			prevPositions.current = props.positions;
			prevReposition.current = props.reposition;
			prevTransformMode.current = props.transformMode;
			prevTransform.current = props.transform;
			prevBoundaryElement.current = props.boundaryElement;
			prevBoundaryInset.current = props.boundaryInset;
		}, [
			props.boundaryElement,
			props.boundaryInset,
			props.positions,
			props.reposition,
			props.transform,
			props.transformMode
		]);
		return {
			prev: {
				positions: prevPositions.current,
				reposition: prevReposition.current,
				transformMode: prevTransformMode.current,
				transform: prevTransform.current,
				boundaryElement: prevBoundaryElement.current,
				boundaryInset: prevBoundaryInset.current
			},
			updatePrevValues
		};
	};
	exports.useHandlePrevValues = useHandlePrevValues;
}));
//#endregion
//#region node_modules/react-tiny-popover/dist/useArrowContainer.js
var require_useArrowContainer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __assign = exports && exports.__assign || function() {
		__assign = Object.assign || function(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.useArrowContainer = void 0;
	var react_1 = require_react();
	var useArrowContainer = function(_a) {
		var childRect = _a.childRect, popoverRect = _a.popoverRect, position = _a.position, arrowSize = _a.arrowSize, arrowColor = _a.arrowColor;
		return {
			arrowContainerStyle: (0, react_1.useMemo)(function() {
				return { padding: arrowSize };
			}, [arrowSize]),
			arrowStyle: (0, react_1.useMemo)(function() {
				return __assign({ position: "absolute" }, (function() {
					var arrowWidth = arrowSize * 2;
					var top = childRect.top - popoverRect.top + childRect.height / 2 - arrowWidth / 2;
					var left = childRect.left - popoverRect.left + childRect.width / 2 - arrowWidth / 2;
					var lowerBound = arrowSize;
					var leftUpperBound = popoverRect.width - arrowSize;
					var topUpperBound = popoverRect.height - arrowSize;
					left = left < lowerBound ? lowerBound : left;
					left = left + arrowWidth > leftUpperBound ? leftUpperBound - arrowWidth : left;
					top = top < lowerBound ? lowerBound : top;
					top = top + arrowWidth > topUpperBound ? topUpperBound - arrowWidth : top;
					top = Number.isNaN(top) ? 0 : top;
					left = Number.isNaN(left) ? 0 : left;
					switch (position) {
						case "right": return {
							borderTop: "".concat(arrowSize, "px solid transparent"),
							borderBottom: "".concat(arrowSize, "px solid transparent"),
							borderRight: "".concat(arrowSize, "px solid ").concat(arrowColor),
							left: 0,
							top
						};
						case "left": return {
							borderTop: "".concat(arrowSize, "px solid transparent"),
							borderBottom: "".concat(arrowSize, "px solid transparent"),
							borderLeft: "".concat(arrowSize, "px solid ").concat(arrowColor),
							right: 0,
							top
						};
						case "bottom": return {
							borderLeft: "".concat(arrowSize, "px solid transparent"),
							borderRight: "".concat(arrowSize, "px solid transparent"),
							borderBottom: "".concat(arrowSize, "px solid ").concat(arrowColor),
							top: 0,
							left
						};
						case "top": return {
							borderLeft: "".concat(arrowSize, "px solid transparent"),
							borderRight: "".concat(arrowSize, "px solid transparent"),
							borderTop: "".concat(arrowSize, "px solid ").concat(arrowColor),
							bottom: 0,
							left
						};
						default: return { display: "hidden" };
					}
				})());
			}, [
				arrowColor,
				arrowSize,
				childRect.height,
				childRect.left,
				childRect.top,
				childRect.width,
				popoverRect.height,
				popoverRect.left,
				popoverRect.top,
				popoverRect.width,
				position
			])
		};
	};
	exports.useArrowContainer = useArrowContainer;
}));
//#endregion
//#region node_modules/react-tiny-popover/dist/ArrowContainer.js
var require_ArrowContainer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __assign = exports && exports.__assign || function() {
		__assign = Object.assign || function(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ArrowContainer = void 0;
	var jsx_runtime_1 = require_jsx_runtime();
	var react_1 = require_react();
	var useArrowContainer_1 = require_useArrowContainer();
	var ArrowContainer = function(_a) {
		var childRect = _a.childRect, popoverRect = _a.popoverRect, position = _a.position, arrowColor = _a.arrowColor, arrowSize = _a.arrowSize, arrowClassName = _a.arrowClassName, externalArrowStyle = _a.arrowStyle, className = _a.className, children = _a.children, externalArrowContainerStyle = _a.style;
		var _b = (0, useArrowContainer_1.useArrowContainer)({
			childRect,
			popoverRect,
			position,
			arrowColor,
			arrowSize
		}), arrowContainerStyle = _b.arrowContainerStyle, arrowStyle = _b.arrowStyle;
		var mergedContainerStyle = (0, react_1.useMemo)(function() {
			return __assign(__assign({}, arrowContainerStyle), externalArrowContainerStyle);
		}, [arrowContainerStyle, externalArrowContainerStyle]);
		var mergedArrowStyle = (0, react_1.useMemo)(function() {
			return __assign(__assign({}, arrowStyle), externalArrowStyle);
		}, [arrowStyle, externalArrowStyle]);
		return (0, jsx_runtime_1.jsxs)("div", {
			className,
			style: mergedContainerStyle,
			children: [(0, jsx_runtime_1.jsx)("div", {
				style: mergedArrowStyle,
				className: arrowClassName
			}), children]
		});
	};
	exports.ArrowContainer = ArrowContainer;
}));
//#endregion
//#region node_modules/react-tiny-popover/dist/Popover.js
var require_Popover = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __assign = exports && exports.__assign || function() {
		__assign = Object.assign || function(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Popover = exports.usePopover = exports.ArrowContainer = exports.useArrowContainer = void 0;
	var jsx_runtime_1 = require_jsx_runtime();
	var react_1 = require_react();
	var PopoverPortal_1 = require_PopoverPortal();
	var util_1 = require_util();
	var usePopover_1 = require_usePopover();
	Object.defineProperty(exports, "usePopover", {
		enumerable: true,
		get: function() {
			return usePopover_1.usePopover;
		}
	});
	var useMemoizedArray_1 = require_useMemoizedArray();
	var useHandlePrevValues_1 = require_useHandlePrevValues();
	var useArrowContainer_1 = require_useArrowContainer();
	Object.defineProperty(exports, "useArrowContainer", {
		enumerable: true,
		get: function() {
			return useArrowContainer_1.useArrowContainer;
		}
	});
	var ArrowContainer_1 = require_ArrowContainer();
	Object.defineProperty(exports, "ArrowContainer", {
		enumerable: true,
		get: function() {
			return ArrowContainer_1.ArrowContainer;
		}
	});
	var DEFAULT_POSITIONS = [
		"top",
		"left",
		"right",
		"bottom"
	];
	var PopoverInternal = (0, react_1.forwardRef)(function(_a, externalRef) {
		var isOpen = _a.isOpen, children = _a.children, content = _a.content, _b = _a.positions, externalPositions = _b === void 0 ? DEFAULT_POSITIONS : _b, _c = _a.align, align = _c === void 0 ? "center" : _c, _d = _a.padding, padding = _d === void 0 ? 0 : _d, _e = _a.reposition, reposition = _e === void 0 ? true : _e, _f = _a.parentElement, parentElement = _f === void 0 ? window.document.body : _f, _g = _a.boundaryElement, boundaryElement = _g === void 0 ? parentElement : _g, containerClassName = _a.containerClassName, containerStyle = _a.containerStyle, transform = _a.transform, _h = _a.transformMode, transformMode = _h === void 0 ? "absolute" : _h, _j = _a.boundaryInset, boundaryInset = _j === void 0 ? 0 : _j, onClickOutside = _a.onClickOutside, _k = _a.clickOutsideCapture, clickOutsideCapture = _k === void 0 ? false : _k;
		var positions = (0, useMemoizedArray_1.useMemoizedArray)(Array.isArray(externalPositions) ? externalPositions : [externalPositions]);
		var _l = (0, useHandlePrevValues_1.useHandlePrevValues)({
			positions,
			reposition,
			transformMode,
			transform,
			boundaryElement,
			boundaryInset
		}), prev = _l.prev, updatePrevValues = _l.updatePrevValues;
		var childRef = (0, react_1.useRef)();
		var _m = (0, react_1.useState)({
			align,
			nudgedLeft: 0,
			nudgedTop: 0,
			position: positions[0],
			padding,
			childRect: util_1.EMPTY_RECT,
			popoverRect: util_1.EMPTY_RECT,
			parentRect: util_1.EMPTY_RECT,
			boundaryRect: util_1.EMPTY_RECT,
			boundaryInset,
			violations: util_1.EMPTY_RECT,
			hasViolations: false
		}), popoverState = _m[0], setPopoverState = _m[1];
		var onPositionPopover = (0, react_1.useCallback)(function(popoverState) {
			return setPopoverState(popoverState);
		}, []);
		var _o = (0, usePopover_1.usePopover)({
			isOpen,
			childRef,
			containerClassName,
			parentElement,
			boundaryElement,
			transform,
			transformMode,
			positions,
			align,
			padding,
			boundaryInset,
			reposition,
			onPositionPopover
		}), positionPopover = _o.positionPopover, popoverRef = _o.popoverRef, scoutRef = _o.scoutRef;
		(0, react_1.useLayoutEffect)(function() {
			var shouldUpdate = true;
			var updatePopover = function() {
				var _a, _b;
				if (isOpen && shouldUpdate) {
					var childRect = (_a = childRef === null || childRef === void 0 ? void 0 : childRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
					var popoverRect = (_b = popoverRef === null || popoverRef === void 0 ? void 0 : popoverRef.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
					if (childRect != null && popoverRect != null && (!(0, util_1.rectsAreEqual)(childRect, popoverState.childRect) || popoverRect.width !== popoverState.popoverRect.width || popoverRect.height !== popoverState.popoverRect.height || popoverState.padding !== padding || popoverState.align !== align || positions !== prev.positions || reposition !== prev.reposition || transformMode !== prev.transformMode || transform !== prev.transform || boundaryElement !== prev.boundaryElement || boundaryInset !== prev.boundaryInset)) positionPopover();
					updatePrevValues();
					if (shouldUpdate) window.requestAnimationFrame(updatePopover);
				}
			};
			updatePopover();
			return function() {
				shouldUpdate = false;
			};
		}, [
			align,
			boundaryElement,
			boundaryInset,
			isOpen,
			padding,
			popoverRef,
			popoverState.align,
			popoverState.childRect,
			popoverState.padding,
			popoverState.popoverRect.height,
			popoverState.popoverRect.width,
			positionPopover,
			positions,
			prev.boundaryElement,
			prev.boundaryInset,
			prev.positions,
			prev.reposition,
			prev.transform,
			prev.transformMode,
			reposition,
			transform,
			transformMode,
			updatePrevValues
		]);
		(0, react_1.useEffect)(function() {
			var popoverElement = popoverRef.current;
			Object.assign(popoverElement.style, containerStyle);
			return function() {
				Object.keys(containerStyle !== null && containerStyle !== void 0 ? containerStyle : {}).forEach(function(key) {
					return delete popoverElement.style[key];
				});
			};
		}, [
			containerStyle,
			isOpen,
			popoverRef
		]);
		var handleOnClickOutside = (0, react_1.useCallback)(function(e) {
			var _a, _b;
			if (isOpen && !((_a = popoverRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) && !((_b = childRef.current) === null || _b === void 0 ? void 0 : _b.contains(e.target))) onClickOutside === null || onClickOutside === void 0 || onClickOutside(e);
		}, [
			isOpen,
			onClickOutside,
			popoverRef
		]);
		var handleWindowResize = (0, react_1.useCallback)(function() {
			if (childRef.current && isOpen) window.requestAnimationFrame(function() {
				return positionPopover();
			});
		}, [positionPopover, isOpen]);
		(0, react_1.useEffect)(function() {
			var body = parentElement.ownerDocument.body;
			body.addEventListener("click", handleOnClickOutside, clickOutsideCapture);
			body.addEventListener("contextmenu", handleOnClickOutside, clickOutsideCapture);
			window.addEventListener("resize", handleWindowResize);
			return function() {
				body.removeEventListener("click", handleOnClickOutside, clickOutsideCapture);
				body.removeEventListener("contextmenu", handleOnClickOutside, clickOutsideCapture);
				window.removeEventListener("resize", handleWindowResize);
			};
		}, [
			clickOutsideCapture,
			handleOnClickOutside,
			handleWindowResize,
			parentElement
		]);
		var handleRef = (0, react_1.useCallback)(function(node) {
			childRef.current = node;
			if (externalRef != null) {
				if (typeof externalRef === "object") externalRef.current = node;
				else if (typeof externalRef === "function") externalRef(node);
			}
		}, [externalRef]);
		var renderChild = function() {
			return (0, react_1.cloneElement)(children, { ref: handleRef });
		};
		var renderPopover = function() {
			if (!isOpen) return null;
			return (0, jsx_runtime_1.jsx)(PopoverPortal_1.PopoverPortal, {
				element: popoverRef.current,
				scoutElement: scoutRef.current,
				container: parentElement,
				children: typeof content === "function" ? content(popoverState) : content
			});
		};
		return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderChild(), renderPopover()] });
	});
	exports.Popover = (0, react_1.forwardRef)(function(props, ref) {
		if (typeof window === "undefined") return props.children;
		return (0, jsx_runtime_1.jsx)(PopoverInternal, __assign({}, props, { ref }));
	});
}));
//#endregion
//#region node_modules/goober/dist/goober.modern.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
init_objectSpread2();
var e$1 = { data: "" }, t$1 = (t) => {
	if ("object" == typeof window) {
		let e = (t ? t.querySelector("#_goober") : window._goober) || Object.assign(document.createElement("style"), {
			innerHTML: " ",
			id: "_goober"
		});
		return e.nonce = window.__nonce__, e.parentNode || (t || document.head).appendChild(e), e.firstChild;
	}
	return t || e$1;
}, l$1 = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, a$1 = /\/\*[^]*?\*\/|  +/g, n$2 = /\n+/g, o$1 = (e, t) => {
	let r = "", l = "", a = "";
	for (let n in e) {
		let c = e[n];
		"@" == n[0] ? "i" == n[1] ? r = n + " " + c + ";" : l += "f" == n[1] ? o$1(c, n) : n + "{" + o$1(c, "k" == n[1] ? "" : t) + "}" : "object" == typeof c ? l += o$1(c, t ? t.replace(/([^,])+/g, (e) => n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t) => /&/.test(t) ? t.replace(/&/g, e) : e ? e + " " + t : t)) : n) : null != c && (n = /^--/.test(n) ? n : n.replace(/[A-Z]/g, "-$&").toLowerCase(), a += o$1.p ? o$1.p(n, c) : n + ":" + c + ";");
	}
	return r + (t && a ? t + "{" + a + "}" : a) + l;
}, c$1 = {}, s$1 = (e) => {
	if ("object" == typeof e) {
		let t = "";
		for (let r in e) t += r + s$1(e[r]);
		return t;
	}
	return e;
}, i$1 = (e, t, r, i, p) => {
	let u = s$1(e), d = c$1[u] || (c$1[u] = ((e) => {
		let t = 0, r = 11;
		for (; t < e.length;) r = 101 * r + e.charCodeAt(t++) >>> 0;
		return "go" + r;
	})(u));
	if (!c$1[d]) {
		let t = u !== e ? e : ((e) => {
			let t, r, o = [{}];
			for (; t = l$1.exec(e.replace(a$1, ""));) t[4] ? o.shift() : t[3] ? (r = t[3].replace(n$2, " ").trim(), o.unshift(o[0][r] = o[0][r] || {})) : o[0][t[1]] = t[2].replace(n$2, " ").trim();
			return o[0];
		})(e);
		c$1[d] = o$1(p ? { ["@keyframes " + d]: t } : t, r ? "" : "." + d);
	}
	let f = r && c$1.g ? c$1.g : null;
	return r && (c$1.g = c$1[d]), ((e, t, r, l) => {
		l ? t.data = t.data.replace(l, e) : -1 === t.data.indexOf(e) && (t.data = r ? e + t.data : t.data + e);
	})(c$1[d], t, i, f), d;
}, p$1 = (e, t, r) => e.reduce((e, l, a) => {
	let n = t[a];
	if (n && n.call) {
		let e = n(r), t = e && e.props && e.props.className || /^go/.test(e) && e;
		n = t ? "." + t : e && "object" == typeof e ? e.props ? "" : o$1(e, "") : !1 === e ? "" : e;
	}
	return e + l + (null == n ? "" : n);
}, "");
function u$1(e) {
	let r = this || {}, l = e.call ? e(r.p) : e;
	return i$1(l.unshift ? l.raw ? p$1(l, [].slice.call(arguments, 1), r.p) : l.reduce((e, t) => Object.assign(e, t && t.call ? t(r.p) : t), {}) : l, t$1(r.target), r.g, r.o, r.k);
}
var d$1, f$2, g$1;
u$1.bind({ g: 1 });
var h$2 = u$1.bind({ k: 1 });
function m$1(e, t, r, l) {
	o$1.p = t, d$1 = e, f$2 = r, g$1 = l;
}
function w$2(e, t) {
	let r = this || {};
	return function() {
		let l = arguments;
		function a(n, o) {
			let c = Object.assign({}, n), s = c.className || a.className;
			r.p = Object.assign({ theme: f$2 && f$2() }, c), r.o = / *go\d+/.test(s), c.className = u$1.apply(r, l) + (s ? " " + s : ""), t && (c.ref = o);
			let i = e;
			return e[0] && (i = c.as || e, delete c.as), g$1 && i[0] && g$1(c), d$1(i, c);
		}
		return t ? t(a) : a;
	};
}
//#endregion
//#region node_modules/react-hot-toast/dist/index.mjs
var Z$2 = (e) => typeof e == "function", h$1 = (e, t) => Z$2(e) ? e(t) : e;
var W$1 = (() => {
	let e = 0;
	return () => (++e).toString();
})(), E$1 = (() => {
	let e;
	return () => {
		if (e === void 0 && typeof window < "u") {
			let t = matchMedia("(prefers-reduced-motion: reduce)");
			e = !t || t.matches;
		}
		return e;
	};
})();
var re$1 = 20, k$1 = "default";
var H$1 = (e, t) => {
	let { toastLimit: o } = e.settings;
	switch (t.type) {
		case 0: return _objectSpread2(_objectSpread2({}, e), {}, { toasts: [t.toast, ...e.toasts].slice(0, o) });
		case 1: return _objectSpread2(_objectSpread2({}, e), {}, { toasts: e.toasts.map((r) => r.id === t.toast.id ? _objectSpread2(_objectSpread2({}, r), t.toast) : r) });
		case 2:
			let { toast: s } = t;
			return H$1(e, {
				type: e.toasts.find((r) => r.id === s.id) ? 1 : 0,
				toast: s
			});
		case 3:
			let { toastId: a } = t;
			return _objectSpread2(_objectSpread2({}, e), {}, { toasts: e.toasts.map((r) => r.id === a || a === void 0 ? _objectSpread2(_objectSpread2({}, r), {}, {
				dismissed: !0,
				visible: !1
			}) : r) });
		case 4: return t.toastId === void 0 ? _objectSpread2(_objectSpread2({}, e), {}, { toasts: [] }) : _objectSpread2(_objectSpread2({}, e), {}, { toasts: e.toasts.filter((r) => r.id !== t.toastId) });
		case 5: return _objectSpread2(_objectSpread2({}, e), {}, { pausedAt: t.time });
		case 6:
			let i = t.time - (e.pausedAt || 0);
			return _objectSpread2(_objectSpread2({}, e), {}, {
				pausedAt: void 0,
				toasts: e.toasts.map((r) => _objectSpread2(_objectSpread2({}, r), {}, { pauseDuration: r.pauseDuration + i }))
			});
	}
}, v$1 = [], j$1 = {
	toasts: [],
	pausedAt: void 0,
	settings: { toastLimit: re$1 }
}, f$1 = {}, Y$1 = (e, t = k$1) => {
	f$1[t] = H$1(f$1[t] || j$1, e), v$1.forEach(([o, s]) => {
		o === t && s(f$1[t]);
	});
}, _$1 = (e) => Object.keys(f$1).forEach((t) => Y$1(e, t)), Q$1 = (e) => Object.keys(f$1).find((t) => f$1[t].toasts.some((o) => o.id === e)), S$1 = (e = k$1) => (t) => {
	Y$1(t, e);
}, se$1 = {
	blank: 4e3,
	error: 4e3,
	success: 2e3,
	loading: Infinity,
	custom: 4e3
}, V$2 = (e = {}, t = k$1) => {
	let [o, s] = (0, import_react.useState)(f$1[t] || j$1), a = (0, import_react.useRef)(f$1[t]);
	(0, import_react.useEffect)(() => (a.current !== f$1[t] && s(f$1[t]), v$1.push([t, s]), () => {
		let r = v$1.findIndex(([l]) => l === t);
		r > -1 && v$1.splice(r, 1);
	}), [t]);
	let i = o.toasts.map((r) => {
		var l, g, T;
		return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, e), e[r.type]), r), {}, {
			removeDelay: r.removeDelay || ((l = e[r.type]) == null ? void 0 : l.removeDelay) || (e == null ? void 0 : e.removeDelay),
			duration: r.duration || ((g = e[r.type]) == null ? void 0 : g.duration) || (e == null ? void 0 : e.duration) || se$1[r.type],
			style: _objectSpread2(_objectSpread2(_objectSpread2({}, e.style), (T = e[r.type]) == null ? void 0 : T.style), r.style)
		});
	});
	return _objectSpread2(_objectSpread2({}, o), {}, { toasts: i });
};
var ie$1 = (e, t = "blank", o) => _objectSpread2(_objectSpread2({
	createdAt: Date.now(),
	visible: !0,
	dismissed: !1,
	type: t,
	ariaProps: {
		role: "status",
		"aria-live": "polite"
	},
	message: e,
	pauseDuration: 0
}, o), {}, { id: (o == null ? void 0 : o.id) || W$1() }), P$1 = (e) => (t, o) => {
	let s = ie$1(t, e, o);
	return S$1(s.toasterId || Q$1(s.id))({
		type: 2,
		toast: s
	}), s.id;
}, n$1 = (e, t) => P$1("blank")(e, t);
n$1.error = P$1("error");
n$1.success = P$1("success");
n$1.loading = P$1("loading");
n$1.custom = P$1("custom");
n$1.dismiss = (e, t) => {
	let o = {
		type: 3,
		toastId: e
	};
	t ? S$1(t)(o) : _$1(o);
};
n$1.dismissAll = (e) => n$1.dismiss(void 0, e);
n$1.remove = (e, t) => {
	let o = {
		type: 4,
		toastId: e
	};
	t ? S$1(t)(o) : _$1(o);
};
n$1.removeAll = (e) => n$1.remove(void 0, e);
n$1.promise = (e, t, o) => {
	let s = n$1.loading(t.loading, _objectSpread2(_objectSpread2({}, o), o == null ? void 0 : o.loading));
	return typeof e == "function" && (e = e()), e.then((a) => {
		let i = t.success ? h$1(t.success, a) : void 0;
		return i ? n$1.success(i, _objectSpread2(_objectSpread2({ id: s }, o), o == null ? void 0 : o.success)) : n$1.dismiss(s), a;
	}).catch((a) => {
		let i = t.error ? h$1(t.error, a) : void 0;
		i ? n$1.error(i, _objectSpread2(_objectSpread2({ id: s }, o), o == null ? void 0 : o.error)) : n$1.dismiss(s);
	}), e;
};
var ce$1 = 1e3, w$1 = (e, t = "default") => {
	let { toasts: o, pausedAt: s } = V$2(e, t), a = (0, import_react.useRef)(/* @__PURE__ */ new Map()).current, i = (0, import_react.useCallback)((c, m = ce$1) => {
		if (a.has(c)) return;
		let p = setTimeout(() => {
			a.delete(c), r({
				type: 4,
				toastId: c
			});
		}, m);
		a.set(c, p);
	}, []);
	(0, import_react.useEffect)(() => {
		if (s) return;
		let c = Date.now(), m = o.map((p) => {
			if (p.duration === Infinity) return;
			let R = (p.duration || 0) + p.pauseDuration - (c - p.createdAt);
			if (R < 0) {
				p.visible && n$1.dismiss(p.id);
				return;
			}
			return setTimeout(() => n$1.dismiss(p.id, t), R);
		});
		return () => {
			m.forEach((p) => p && clearTimeout(p));
		};
	}, [
		o,
		s,
		t
	]);
	let r = (0, import_react.useCallback)(S$1(t), [t]), l = (0, import_react.useCallback)(() => {
		r({
			type: 5,
			time: Date.now()
		});
	}, [r]), g = (0, import_react.useCallback)((c, m) => {
		r({
			type: 1,
			toast: {
				id: c,
				height: m
			}
		});
	}, [r]), T = (0, import_react.useCallback)(() => {
		s && r({
			type: 6,
			time: Date.now()
		});
	}, [s, r]), d = (0, import_react.useCallback)((c, m) => {
		let { reverseOrder: p = !1, gutter: R = 8, defaultPosition: z } = m || {}, O = o.filter((u) => (u.position || z) === (c.position || z) && u.height), K = O.findIndex((u) => u.id === c.id), B = O.filter((u, I) => I < K && u.visible).length;
		return O.filter((u) => u.visible).slice(...p ? [B + 1] : [0, B]).reduce((u, I) => u + (I.height || 0) + R, 0);
	}, [o]);
	return (0, import_react.useEffect)(() => {
		o.forEach((c) => {
			if (c.dismissed) i(c.id, c.removeDelay);
			else {
				let m = a.get(c.id);
				m && (clearTimeout(m), a.delete(c.id));
			}
		});
	}, [o, i]), {
		toasts: o,
		handlers: {
			updateHeight: g,
			startPause: l,
			endPause: T,
			calculateOffset: d
		}
	};
};
var de$1 = h$2`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, me$1 = h$2`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, le$1 = h$2`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, C$1 = w$2("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${de$1} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${me$1} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e) => e.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${le$1} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;
var Te = h$2`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, F$1 = w$2("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e) => e.secondary || "#e0e0e0"};
  border-right-color: ${(e) => e.primary || "#616161"};
  animation: ${Te} 1s linear infinite;
`;
var ge$1 = h$2`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, he$1 = h$2`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, L$1 = w$2("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ge$1} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${he$1} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e) => e.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;
var be$1 = w$2("div")`
  position: absolute;
`, Se = w$2("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, Ae = h$2`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, Pe = w$2("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ae} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, $$1 = ({ toast: e }) => {
	let { icon: t, type: o, iconTheme: s } = e;
	return t !== void 0 ? typeof t == "string" ? import_react.createElement(Pe, null, t) : t : o === "blank" ? null : import_react.createElement(Se, null, import_react.createElement(F$1, _objectSpread2({}, s)), o !== "loading" && import_react.createElement(be$1, null, o === "error" ? import_react.createElement(C$1, _objectSpread2({}, s)) : import_react.createElement(L$1, _objectSpread2({}, s))));
};
var Re = (e) => `
0% {transform: translate3d(0,${e * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`, Ee$1 = (e) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e * -150}%,-1px) scale(.6); opacity:0;}
`, ve$1 = "0%{opacity:0;} 100%{opacity:1;}", De = "0%{opacity:1;} 100%{opacity:0;}", Oe$1 = w$2("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, Ie$1 = w$2("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, ke$1 = (e, t) => {
	let s = e.includes("top") ? 1 : -1, [a, i] = E$1() ? [ve$1, De] : [Re(s), Ee$1(s)];
	return { animation: t ? `${h$2(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${h$2(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)` };
}, N$1 = import_react.memo(({ toast: e, position: t, style: o, children: s }) => {
	let a = e.height ? ke$1(e.position || t || "top-center", e.visible) : { opacity: 0 }, i = import_react.createElement($$1, { toast: e }), r = import_react.createElement(Ie$1, _objectSpread2({}, e.ariaProps), h$1(e.message, e));
	return import_react.createElement(Oe$1, {
		className: e.className,
		style: _objectSpread2(_objectSpread2(_objectSpread2({}, a), o), e.style)
	}, typeof s == "function" ? s({
		icon: i,
		message: r
	}) : import_react.createElement(import_react.Fragment, null, i, r));
});
m$1(import_react.createElement);
var we$1 = ({ id: e, className: t, style: o, onHeightUpdate: s, children: a }) => {
	let i = import_react.useCallback((r) => {
		if (r) {
			let l = () => {
				let g = r.getBoundingClientRect().height;
				s(e, g);
			};
			l(), new MutationObserver(l).observe(r, {
				subtree: !0,
				childList: !0,
				characterData: !0
			});
		}
	}, [e, s]);
	return import_react.createElement("div", {
		ref: i,
		className: t,
		style: o
	}, a);
}, Me$1 = (e, t) => {
	let o = e.includes("top"), s = o ? { top: 0 } : { bottom: 0 }, a = e.includes("center") ? { justifyContent: "center" } : e.includes("right") ? { justifyContent: "flex-end" } : {};
	return _objectSpread2(_objectSpread2({
		left: 0,
		right: 0,
		display: "flex",
		position: "absolute",
		transition: E$1() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
		transform: `translateY(${t * (o ? 1 : -1)}px)`
	}, s), a);
}, Ce$1 = u$1`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`, D$1 = 16, Fe = ({ reverseOrder: e, position: t = "top-center", toastOptions: o, gutter: s, children: a, toasterId: i, containerStyle: r, containerClassName: l }) => {
	let { toasts: g, handlers: T } = w$1(o, i);
	return import_react.createElement("div", {
		"data-rht-toaster": i || "",
		style: _objectSpread2({
			position: "fixed",
			zIndex: 9999,
			top: D$1,
			left: D$1,
			right: D$1,
			bottom: D$1,
			pointerEvents: "none"
		}, r),
		className: l,
		onMouseEnter: T.startPause,
		onMouseLeave: T.endPause
	}, g.map((d) => {
		let c = d.position || t, p = Me$1(c, T.calculateOffset(d, {
			reverseOrder: e,
			gutter: s,
			defaultPosition: t
		}));
		return import_react.createElement(we$1, {
			id: d.id,
			key: d.id,
			onHeightUpdate: T.updateHeight,
			className: d.visible ? Ce$1 : "",
			style: p
		}, d.type === "custom" ? h$1(d.message, d) : a ? a(d) : import_react.createElement(N$1, {
			toast: d,
			position: c
		}));
	}));
};
var zt = n$1;
//#endregion
//#region node_modules/lodash.xor/index.js
var require_lodash_xor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright jQuery Foundation and other contributors <https://jquery.org/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = "__lodash_hash_undefined__";
	/** Used as references for various `Number` constants. */
	var INFINITY = Infinity, MAX_SAFE_INTEGER = 9007199254740991;
	/** `Object#toString` result references. */
	var funcTag = "[object Function]", genTag = "[object GeneratorFunction]";
	/**
	* Used to match `RegExp`
	* [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	*/
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
	/** Detect free variable `self`. */
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function("return this")();
	/**
	* A faster alternative to `Function#apply`, this function invokes `func`
	* with the `this` binding of `thisArg` and the arguments of `args`.
	*
	* @private
	* @param {Function} func The function to invoke.
	* @param {*} thisArg The `this` binding of `func`.
	* @param {Array} args The arguments to invoke `func` with.
	* @returns {*} Returns the result of `func`.
	*/
	function apply(func, thisArg, args) {
		switch (args.length) {
			case 0: return func.call(thisArg);
			case 1: return func.call(thisArg, args[0]);
			case 2: return func.call(thisArg, args[0], args[1]);
			case 3: return func.call(thisArg, args[0], args[1], args[2]);
		}
		return func.apply(thisArg, args);
	}
	/**
	* A specialized version of `_.filter` for arrays without support for
	* iteratee shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} predicate The function invoked per iteration.
	* @returns {Array} Returns the new filtered array.
	*/
	function arrayFilter(array, predicate) {
		var index = -1, length = array ? array.length : 0, resIndex = 0, result = [];
		while (++index < length) {
			var value = array[index];
			if (predicate(value, index, array)) result[resIndex++] = value;
		}
		return result;
	}
	/**
	* A specialized version of `_.includes` for arrays without support for
	* specifying an index to search from.
	*
	* @private
	* @param {Array} [array] The array to inspect.
	* @param {*} target The value to search for.
	* @returns {boolean} Returns `true` if `target` is found, else `false`.
	*/
	function arrayIncludes(array, value) {
		return !!(array ? array.length : 0) && baseIndexOf(array, value, 0) > -1;
	}
	/**
	* This function is like `arrayIncludes` except that it accepts a comparator.
	*
	* @private
	* @param {Array} [array] The array to inspect.
	* @param {*} target The value to search for.
	* @param {Function} comparator The comparator invoked per element.
	* @returns {boolean} Returns `true` if `target` is found, else `false`.
	*/
	function arrayIncludesWith(array, value, comparator) {
		var index = -1, length = array ? array.length : 0;
		while (++index < length) if (comparator(value, array[index])) return true;
		return false;
	}
	/**
	* A specialized version of `_.map` for arrays without support for iteratee
	* shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Array} Returns the new mapped array.
	*/
	function arrayMap(array, iteratee) {
		var index = -1, length = array ? array.length : 0, result = Array(length);
		while (++index < length) result[index] = iteratee(array[index], index, array);
		return result;
	}
	/**
	* Appends the elements of `values` to `array`.
	*
	* @private
	* @param {Array} array The array to modify.
	* @param {Array} values The values to append.
	* @returns {Array} Returns `array`.
	*/
	function arrayPush(array, values) {
		var index = -1, length = values.length, offset = array.length;
		while (++index < length) array[offset + index] = values[index];
		return array;
	}
	/**
	* The base implementation of `_.findIndex` and `_.findLastIndex` without
	* support for iteratee shorthands.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {Function} predicate The function invoked per iteration.
	* @param {number} fromIndex The index to search from.
	* @param {boolean} [fromRight] Specify iterating from right to left.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
		var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
		while (fromRight ? index-- : ++index < length) if (predicate(array[index], index, array)) return index;
		return -1;
	}
	/**
	* The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {*} value The value to search for.
	* @param {number} fromIndex The index to search from.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function baseIndexOf(array, value, fromIndex) {
		if (value !== value) return baseFindIndex(array, baseIsNaN, fromIndex);
		var index = fromIndex - 1, length = array.length;
		while (++index < length) if (array[index] === value) return index;
		return -1;
	}
	/**
	* The base implementation of `_.isNaN` without support for number objects.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	*/
	function baseIsNaN(value) {
		return value !== value;
	}
	/**
	* The base implementation of `_.unary` without support for storing metadata.
	*
	* @private
	* @param {Function} func The function to cap arguments for.
	* @returns {Function} Returns the new capped function.
	*/
	function baseUnary(func) {
		return function(value) {
			return func(value);
		};
	}
	/**
	* Checks if a cache value for `key` exists.
	*
	* @private
	* @param {Object} cache The cache to query.
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function cacheHas(cache, key) {
		return cache.has(key);
	}
	/**
	* Gets the value at `key` of `object`.
	*
	* @private
	* @param {Object} [object] The object to query.
	* @param {string} key The key of the property to get.
	* @returns {*} Returns the property value.
	*/
	function getValue(object, key) {
		return object == null ? void 0 : object[key];
	}
	/**
	* Checks if `value` is a host object in IE < 9.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	*/
	function isHostObject(value) {
		var result = false;
		if (value != null && typeof value.toString != "function") try {
			result = !!(value + "");
		} catch (e) {}
		return result;
	}
	/**
	* Converts `set` to an array of its values.
	*
	* @private
	* @param {Object} set The set to convert.
	* @returns {Array} Returns the values.
	*/
	function setToArray(set) {
		var index = -1, result = Array(set.size);
		set.forEach(function(value) {
			result[++index] = value;
		});
		return result;
	}
	/** Used for built-in method references. */
	var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root["__core-js_shared__"];
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = function() {
		var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
		return uid ? "Symbol(src)_1." + uid : "";
	}();
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = objectProto.toString;
	/** Used to detect if a method is native. */
	var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
	/** Built-in value references. */
	var splice = arrayProto.splice;
	var nativeMax = Math.max;
	var Map = getNative(root, "Map"), Set = getNative(root, "Set"), nativeCreate = getNative(Object, "create");
	/**
	* Creates a hash object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function Hash(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the hash.
	*
	* @private
	* @name clear
	* @memberOf Hash
	*/
	function hashClear() {
		this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	/**
	* Removes `key` and its value from the hash.
	*
	* @private
	* @name delete
	* @memberOf Hash
	* @param {Object} hash The hash to modify.
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function hashDelete(key) {
		return this.has(key) && delete this.__data__[key];
	}
	/**
	* Gets the hash value for `key`.
	*
	* @private
	* @name get
	* @memberOf Hash
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function hashGet(key) {
		var data = this.__data__;
		if (nativeCreate) {
			var result = data[key];
			return result === HASH_UNDEFINED ? void 0 : result;
		}
		return hasOwnProperty.call(data, key) ? data[key] : void 0;
	}
	/**
	* Checks if a hash value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf Hash
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function hashHas(key) {
		var data = this.__data__;
		return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
	}
	/**
	* Sets the hash `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf Hash
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the hash instance.
	*/
	function hashSet(key, value) {
		var data = this.__data__;
		data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
		return this;
	}
	Hash.prototype.clear = hashClear;
	Hash.prototype["delete"] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	/**
	* Creates an list cache object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function ListCache(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the list cache.
	*
	* @private
	* @name clear
	* @memberOf ListCache
	*/
	function listCacheClear() {
		this.__data__ = [];
	}
	/**
	* Removes `key` and its value from the list cache.
	*
	* @private
	* @name delete
	* @memberOf ListCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function listCacheDelete(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) return false;
		if (index == data.length - 1) data.pop();
		else splice.call(data, index, 1);
		return true;
	}
	/**
	* Gets the list cache value for `key`.
	*
	* @private
	* @name get
	* @memberOf ListCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function listCacheGet(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		return index < 0 ? void 0 : data[index][1];
	}
	/**
	* Checks if a list cache value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf ListCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function listCacheHas(key) {
		return assocIndexOf(this.__data__, key) > -1;
	}
	/**
	* Sets the list cache `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf ListCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the list cache instance.
	*/
	function listCacheSet(key, value) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) data.push([key, value]);
		else data[index][1] = value;
		return this;
	}
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype["delete"] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	/**
	* Creates a map cache object to store key-value pairs.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function MapCache(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the map.
	*
	* @private
	* @name clear
	* @memberOf MapCache
	*/
	function mapCacheClear() {
		this.__data__ = {
			"hash": new Hash(),
			"map": new (Map || ListCache)(),
			"string": new Hash()
		};
	}
	/**
	* Removes `key` and its value from the map.
	*
	* @private
	* @name delete
	* @memberOf MapCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function mapCacheDelete(key) {
		return getMapData(this, key)["delete"](key);
	}
	/**
	* Gets the map value for `key`.
	*
	* @private
	* @name get
	* @memberOf MapCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function mapCacheGet(key) {
		return getMapData(this, key).get(key);
	}
	/**
	* Checks if a map value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf MapCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function mapCacheHas(key) {
		return getMapData(this, key).has(key);
	}
	/**
	* Sets the map `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf MapCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the map cache instance.
	*/
	function mapCacheSet(key, value) {
		getMapData(this, key).set(key, value);
		return this;
	}
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype["delete"] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	/**
	*
	* Creates an array cache object to store unique values.
	*
	* @private
	* @constructor
	* @param {Array} [values] The values to cache.
	*/
	function SetCache(values) {
		var index = -1, length = values ? values.length : 0;
		this.__data__ = new MapCache();
		while (++index < length) this.add(values[index]);
	}
	/**
	* Adds `value` to the array cache.
	*
	* @private
	* @name add
	* @memberOf SetCache
	* @alias push
	* @param {*} value The value to cache.
	* @returns {Object} Returns the cache instance.
	*/
	function setCacheAdd(value) {
		this.__data__.set(value, HASH_UNDEFINED);
		return this;
	}
	/**
	* Checks if `value` is in the array cache.
	*
	* @private
	* @name has
	* @memberOf SetCache
	* @param {*} value The value to search for.
	* @returns {number} Returns `true` if `value` is found, else `false`.
	*/
	function setCacheHas(value) {
		return this.__data__.has(value);
	}
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	/**
	* Gets the index at which the `key` is found in `array` of key-value pairs.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {*} key The key to search for.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function assocIndexOf(array, key) {
		var length = array.length;
		while (length--) if (eq(array[length][0], key)) return length;
		return -1;
	}
	/**
	* The base implementation of methods like `_.difference` without support
	* for excluding multiple arrays or iteratee shorthands.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {Array} values The values to exclude.
	* @param {Function} [iteratee] The iteratee invoked per element.
	* @param {Function} [comparator] The comparator invoked per element.
	* @returns {Array} Returns the new array of filtered values.
	*/
	function baseDifference(array, values, iteratee, comparator) {
		var index = -1, includes = arrayIncludes, isCommon = true, length = array.length, result = [], valuesLength = values.length;
		if (!length) return result;
		if (iteratee) values = arrayMap(values, baseUnary(iteratee));
		if (comparator) {
			includes = arrayIncludesWith;
			isCommon = false;
		} else if (values.length >= LARGE_ARRAY_SIZE) {
			includes = cacheHas;
			isCommon = false;
			values = new SetCache(values);
		}
		outer: while (++index < length) {
			var value = array[index], computed = iteratee ? iteratee(value) : value;
			value = comparator || value !== 0 ? value : 0;
			if (isCommon && computed === computed) {
				var valuesIndex = valuesLength;
				while (valuesIndex--) if (values[valuesIndex] === computed) continue outer;
				result.push(value);
			} else if (!includes(values, computed, comparator)) result.push(value);
		}
		return result;
	}
	/**
	* The base implementation of `_.isNative` without bad shim checks.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a native function,
	*  else `false`.
	*/
	function baseIsNative(value) {
		if (!isObject(value) || isMasked(value)) return false;
		return (isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor).test(toSource(value));
	}
	/**
	* The base implementation of `_.rest` which doesn't validate or coerce arguments.
	*
	* @private
	* @param {Function} func The function to apply a rest parameter to.
	* @param {number} [start=func.length-1] The start position of the rest parameter.
	* @returns {Function} Returns the new function.
	*/
	function baseRest(func, start) {
		start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
		return function() {
			var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
			while (++index < length) array[index] = args[start + index];
			index = -1;
			var otherArgs = Array(start + 1);
			while (++index < start) otherArgs[index] = args[index];
			otherArgs[start] = array;
			return apply(func, this, otherArgs);
		};
	}
	/**
	* The base implementation of `_.uniqBy` without support for iteratee shorthands.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {Function} [iteratee] The iteratee invoked per element.
	* @param {Function} [comparator] The comparator invoked per element.
	* @returns {Array} Returns the new duplicate free array.
	*/
	function baseUniq(array, iteratee, comparator) {
		var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
		if (comparator) {
			isCommon = false;
			includes = arrayIncludesWith;
		} else if (length >= LARGE_ARRAY_SIZE) {
			var set = iteratee ? null : createSet(array);
			if (set) return setToArray(set);
			isCommon = false;
			includes = cacheHas;
			seen = new SetCache();
		} else seen = iteratee ? [] : result;
		outer: while (++index < length) {
			var value = array[index], computed = iteratee ? iteratee(value) : value;
			value = comparator || value !== 0 ? value : 0;
			if (isCommon && computed === computed) {
				var seenIndex = seen.length;
				while (seenIndex--) if (seen[seenIndex] === computed) continue outer;
				if (iteratee) seen.push(computed);
				result.push(value);
			} else if (!includes(seen, computed, comparator)) {
				if (seen !== result) seen.push(computed);
				result.push(value);
			}
		}
		return result;
	}
	/**
	* The base implementation of methods like `_.xor`, without support for
	* iteratee shorthands, that accepts an array of arrays to inspect.
	*
	* @private
	* @param {Array} arrays The arrays to inspect.
	* @param {Function} [iteratee] The iteratee invoked per element.
	* @param {Function} [comparator] The comparator invoked per element.
	* @returns {Array} Returns the new array of values.
	*/
	function baseXor(arrays, iteratee, comparator) {
		var index = -1, length = arrays.length;
		while (++index < length) var result = result ? arrayPush(baseDifference(result, arrays[index], iteratee, comparator), baseDifference(arrays[index], result, iteratee, comparator)) : arrays[index];
		return result && result.length ? baseUniq(result, iteratee, comparator) : [];
	}
	/**
	* Creates a set object of `values`.
	*
	* @private
	* @param {Array} values The values to add to the set.
	* @returns {Object} Returns the new set.
	*/
	var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values) {
		return new Set(values);
	};
	/**
	* Gets the data for `map`.
	*
	* @private
	* @param {Object} map The map to query.
	* @param {string} key The reference key.
	* @returns {*} Returns the map data.
	*/
	function getMapData(map, key) {
		var data = map.__data__;
		return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
	}
	/**
	* Gets the native function at `key` of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {string} key The key of the method to get.
	* @returns {*} Returns the function if it's native, else `undefined`.
	*/
	function getNative(object, key) {
		var value = getValue(object, key);
		return baseIsNative(value) ? value : void 0;
	}
	/**
	* Checks if `value` is suitable for use as unique object key.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	*/
	function isKeyable(value) {
		var type = typeof value;
		return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
	}
	/**
	* Checks if `func` has its source masked.
	*
	* @private
	* @param {Function} func The function to check.
	* @returns {boolean} Returns `true` if `func` is masked, else `false`.
	*/
	function isMasked(func) {
		return !!maskSrcKey && maskSrcKey in func;
	}
	/**
	* Converts `func` to its source code.
	*
	* @private
	* @param {Function} func The function to process.
	* @returns {string} Returns the source code.
	*/
	function toSource(func) {
		if (func != null) {
			try {
				return funcToString.call(func);
			} catch (e) {}
			try {
				return func + "";
			} catch (e) {}
		}
		return "";
	}
	/**
	* Creates an array of unique values that is the
	* [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
	* of the given arrays. The order of result values is determined by the order
	* they occur in the arrays.
	*
	* @static
	* @memberOf _
	* @since 2.4.0
	* @category Array
	* @param {...Array} [arrays] The arrays to inspect.
	* @returns {Array} Returns the new array of filtered values.
	* @see _.difference, _.without
	* @example
	*
	* _.xor([2, 1], [2, 3]);
	* // => [1, 3]
	*/
	var xor = baseRest(function(arrays) {
		return baseXor(arrayFilter(arrays, isArrayLikeObject));
	});
	/**
	* Performs a
	* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* comparison between two values to determine if they are equivalent.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to compare.
	* @param {*} other The other value to compare.
	* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	* @example
	*
	* var object = { 'a': 1 };
	* var other = { 'a': 1 };
	*
	* _.eq(object, object);
	* // => true
	*
	* _.eq(object, other);
	* // => false
	*
	* _.eq('a', 'a');
	* // => true
	*
	* _.eq('a', Object('a'));
	* // => false
	*
	* _.eq(NaN, NaN);
	* // => true
	*/
	function eq(value, other) {
		return value === other || value !== value && other !== other;
	}
	/**
	* Checks if `value` is array-like. A value is considered array-like if it's
	* not a function and has a `value.length` that's an integer greater than or
	* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	* @example
	*
	* _.isArrayLike([1, 2, 3]);
	* // => true
	*
	* _.isArrayLike(document.body.children);
	* // => true
	*
	* _.isArrayLike('abc');
	* // => true
	*
	* _.isArrayLike(_.noop);
	* // => false
	*/
	function isArrayLike(value) {
		return value != null && isLength(value.length) && !isFunction(value);
	}
	/**
	* This method is like `_.isArrayLike` except that it also checks if `value`
	* is an object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an array-like object,
	*  else `false`.
	* @example
	*
	* _.isArrayLikeObject([1, 2, 3]);
	* // => true
	*
	* _.isArrayLikeObject(document.body.children);
	* // => true
	*
	* _.isArrayLikeObject('abc');
	* // => false
	*
	* _.isArrayLikeObject(_.noop);
	* // => false
	*/
	function isArrayLikeObject(value) {
		return isObjectLike(value) && isArrayLike(value);
	}
	/**
	* Checks if `value` is classified as a `Function` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a function, else `false`.
	* @example
	*
	* _.isFunction(_);
	* // => true
	*
	* _.isFunction(/abc/);
	* // => false
	*/
	function isFunction(value) {
		var tag = isObject(value) ? objectToString.call(value) : "";
		return tag == funcTag || tag == genTag;
	}
	/**
	* Checks if `value` is a valid array-like length.
	*
	* **Note:** This method is loosely based on
	* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	* @example
	*
	* _.isLength(3);
	* // => true
	*
	* _.isLength(Number.MIN_VALUE);
	* // => false
	*
	* _.isLength(Infinity);
	* // => false
	*
	* _.isLength('3');
	* // => false
	*/
	function isLength(value) {
		return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	/**
	* Checks if `value` is the
	* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an object, else `false`.
	* @example
	*
	* _.isObject({});
	* // => true
	*
	* _.isObject([1, 2, 3]);
	* // => true
	*
	* _.isObject(_.noop);
	* // => true
	*
	* _.isObject(null);
	* // => false
	*/
	function isObject(value) {
		var type = typeof value;
		return !!value && (type == "object" || type == "function");
	}
	/**
	* Checks if `value` is object-like. A value is object-like if it's not `null`
	* and has a `typeof` result of "object".
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	* @example
	*
	* _.isObjectLike({});
	* // => true
	*
	* _.isObjectLike([1, 2, 3]);
	* // => true
	*
	* _.isObjectLike(_.noop);
	* // => false
	*
	* _.isObjectLike(null);
	* // => false
	*/
	function isObjectLike(value) {
		return !!value && typeof value == "object";
	}
	/**
	* This method returns `undefined`.
	*
	* @static
	* @memberOf _
	* @since 2.3.0
	* @category Util
	* @example
	*
	* _.times(2, _.noop);
	* // => [undefined, undefined]
	*/
	function noop() {}
	module.exports = xor;
}));
//#endregion
//#region node_modules/lodash.xorby/index.js
var require_lodash_xorby = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright jQuery Foundation and other contributors <https://jquery.org/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = "Expected a function";
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = "__lodash_hash_undefined__";
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1, PARTIAL_COMPARE_FLAG = 2;
	/** Used as references for various `Number` constants. */
	var INFINITY = Infinity, MAX_SAFE_INTEGER = 9007199254740991;
	/** `Object#toString` result references. */
	var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
	var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	/**
	* Used to match `RegExp`
	* [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	*/
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
	/** Detect free variable `self`. */
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function("return this")();
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
	/** Detect free variable `process` from Node.js. */
	var freeProcess = freeModule && freeModule.exports === freeExports && freeGlobal.process;
	/** Used to access faster Node.js helpers. */
	var nodeUtil = function() {
		try {
			return freeProcess && freeProcess.binding("util");
		} catch (e) {}
	}();
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	/**
	* A faster alternative to `Function#apply`, this function invokes `func`
	* with the `this` binding of `thisArg` and the arguments of `args`.
	*
	* @private
	* @param {Function} func The function to invoke.
	* @param {*} thisArg The `this` binding of `func`.
	* @param {Array} args The arguments to invoke `func` with.
	* @returns {*} Returns the result of `func`.
	*/
	function apply(func, thisArg, args) {
		switch (args.length) {
			case 0: return func.call(thisArg);
			case 1: return func.call(thisArg, args[0]);
			case 2: return func.call(thisArg, args[0], args[1]);
			case 3: return func.call(thisArg, args[0], args[1], args[2]);
		}
		return func.apply(thisArg, args);
	}
	/**
	* A specialized version of `_.filter` for arrays without support for
	* iteratee shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} predicate The function invoked per iteration.
	* @returns {Array} Returns the new filtered array.
	*/
	function arrayFilter(array, predicate) {
		var index = -1, length = array ? array.length : 0, resIndex = 0, result = [];
		while (++index < length) {
			var value = array[index];
			if (predicate(value, index, array)) result[resIndex++] = value;
		}
		return result;
	}
	/**
	* A specialized version of `_.includes` for arrays without support for
	* specifying an index to search from.
	*
	* @private
	* @param {Array} [array] The array to inspect.
	* @param {*} target The value to search for.
	* @returns {boolean} Returns `true` if `target` is found, else `false`.
	*/
	function arrayIncludes(array, value) {
		return !!(array ? array.length : 0) && baseIndexOf(array, value, 0) > -1;
	}
	/**
	* This function is like `arrayIncludes` except that it accepts a comparator.
	*
	* @private
	* @param {Array} [array] The array to inspect.
	* @param {*} target The value to search for.
	* @param {Function} comparator The comparator invoked per element.
	* @returns {boolean} Returns `true` if `target` is found, else `false`.
	*/
	function arrayIncludesWith(array, value, comparator) {
		var index = -1, length = array ? array.length : 0;
		while (++index < length) if (comparator(value, array[index])) return true;
		return false;
	}
	/**
	* A specialized version of `_.map` for arrays without support for iteratee
	* shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Array} Returns the new mapped array.
	*/
	function arrayMap(array, iteratee) {
		var index = -1, length = array ? array.length : 0, result = Array(length);
		while (++index < length) result[index] = iteratee(array[index], index, array);
		return result;
	}
	/**
	* Appends the elements of `values` to `array`.
	*
	* @private
	* @param {Array} array The array to modify.
	* @param {Array} values The values to append.
	* @returns {Array} Returns `array`.
	*/
	function arrayPush(array, values) {
		var index = -1, length = values.length, offset = array.length;
		while (++index < length) array[offset + index] = values[index];
		return array;
	}
	/**
	* A specialized version of `_.some` for arrays without support for iteratee
	* shorthands.
	*
	* @private
	* @param {Array} [array] The array to iterate over.
	* @param {Function} predicate The function invoked per iteration.
	* @returns {boolean} Returns `true` if any element passes the predicate check,
	*  else `false`.
	*/
	function arraySome(array, predicate) {
		var index = -1, length = array ? array.length : 0;
		while (++index < length) if (predicate(array[index], index, array)) return true;
		return false;
	}
	/**
	* The base implementation of `_.findIndex` and `_.findLastIndex` without
	* support for iteratee shorthands.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {Function} predicate The function invoked per iteration.
	* @param {number} fromIndex The index to search from.
	* @param {boolean} [fromRight] Specify iterating from right to left.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
		var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
		while (fromRight ? index-- : ++index < length) if (predicate(array[index], index, array)) return index;
		return -1;
	}
	/**
	* The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {*} value The value to search for.
	* @param {number} fromIndex The index to search from.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function baseIndexOf(array, value, fromIndex) {
		if (value !== value) return baseFindIndex(array, baseIsNaN, fromIndex);
		var index = fromIndex - 1, length = array.length;
		while (++index < length) if (array[index] === value) return index;
		return -1;
	}
	/**
	* The base implementation of `_.isNaN` without support for number objects.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	*/
	function baseIsNaN(value) {
		return value !== value;
	}
	/**
	* The base implementation of `_.property` without support for deep paths.
	*
	* @private
	* @param {string} key The key of the property to get.
	* @returns {Function} Returns the new accessor function.
	*/
	function baseProperty(key) {
		return function(object) {
			return object == null ? void 0 : object[key];
		};
	}
	/**
	* The base implementation of `_.times` without support for iteratee shorthands
	* or max array length checks.
	*
	* @private
	* @param {number} n The number of times to invoke `iteratee`.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Array} Returns the array of results.
	*/
	function baseTimes(n, iteratee) {
		var index = -1, result = Array(n);
		while (++index < n) result[index] = iteratee(index);
		return result;
	}
	/**
	* The base implementation of `_.unary` without support for storing metadata.
	*
	* @private
	* @param {Function} func The function to cap arguments for.
	* @returns {Function} Returns the new capped function.
	*/
	function baseUnary(func) {
		return function(value) {
			return func(value);
		};
	}
	/**
	* Checks if a cache value for `key` exists.
	*
	* @private
	* @param {Object} cache The cache to query.
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function cacheHas(cache, key) {
		return cache.has(key);
	}
	/**
	* Gets the value at `key` of `object`.
	*
	* @private
	* @param {Object} [object] The object to query.
	* @param {string} key The key of the property to get.
	* @returns {*} Returns the property value.
	*/
	function getValue(object, key) {
		return object == null ? void 0 : object[key];
	}
	/**
	* Checks if `value` is a host object in IE < 9.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	*/
	function isHostObject(value) {
		var result = false;
		if (value != null && typeof value.toString != "function") try {
			result = !!(value + "");
		} catch (e) {}
		return result;
	}
	/**
	* Converts `map` to its key-value pairs.
	*
	* @private
	* @param {Object} map The map to convert.
	* @returns {Array} Returns the key-value pairs.
	*/
	function mapToArray(map) {
		var index = -1, result = Array(map.size);
		map.forEach(function(value, key) {
			result[++index] = [key, value];
		});
		return result;
	}
	/**
	* Creates a unary function that invokes `func` with its argument transformed.
	*
	* @private
	* @param {Function} func The function to wrap.
	* @param {Function} transform The argument transform.
	* @returns {Function} Returns the new function.
	*/
	function overArg(func, transform) {
		return function(arg) {
			return func(transform(arg));
		};
	}
	/**
	* Converts `set` to an array of its values.
	*
	* @private
	* @param {Object} set The set to convert.
	* @returns {Array} Returns the values.
	*/
	function setToArray(set) {
		var index = -1, result = Array(set.size);
		set.forEach(function(value) {
			result[++index] = value;
		});
		return result;
	}
	/** Used for built-in method references. */
	var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root["__core-js_shared__"];
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = function() {
		var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
		return uid ? "Symbol(src)_1." + uid : "";
	}();
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = objectProto.toString;
	/** Used to detect if a method is native. */
	var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
	/** Built-in value references. */
	var Symbol = root.Symbol, Uint8Array = root.Uint8Array, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
	var nativeKeys = overArg(Object.keys, Object), nativeMax = Math.max;
	var DataView = getNative(root, "DataView"), Map = getNative(root, "Map"), Promise = getNative(root, "Promise"), Set = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
	/**
	* Creates a hash object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function Hash(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the hash.
	*
	* @private
	* @name clear
	* @memberOf Hash
	*/
	function hashClear() {
		this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	/**
	* Removes `key` and its value from the hash.
	*
	* @private
	* @name delete
	* @memberOf Hash
	* @param {Object} hash The hash to modify.
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function hashDelete(key) {
		return this.has(key) && delete this.__data__[key];
	}
	/**
	* Gets the hash value for `key`.
	*
	* @private
	* @name get
	* @memberOf Hash
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function hashGet(key) {
		var data = this.__data__;
		if (nativeCreate) {
			var result = data[key];
			return result === HASH_UNDEFINED ? void 0 : result;
		}
		return hasOwnProperty.call(data, key) ? data[key] : void 0;
	}
	/**
	* Checks if a hash value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf Hash
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function hashHas(key) {
		var data = this.__data__;
		return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
	}
	/**
	* Sets the hash `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf Hash
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the hash instance.
	*/
	function hashSet(key, value) {
		var data = this.__data__;
		data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
		return this;
	}
	Hash.prototype.clear = hashClear;
	Hash.prototype["delete"] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	/**
	* Creates an list cache object.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function ListCache(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the list cache.
	*
	* @private
	* @name clear
	* @memberOf ListCache
	*/
	function listCacheClear() {
		this.__data__ = [];
	}
	/**
	* Removes `key` and its value from the list cache.
	*
	* @private
	* @name delete
	* @memberOf ListCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function listCacheDelete(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) return false;
		if (index == data.length - 1) data.pop();
		else splice.call(data, index, 1);
		return true;
	}
	/**
	* Gets the list cache value for `key`.
	*
	* @private
	* @name get
	* @memberOf ListCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function listCacheGet(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		return index < 0 ? void 0 : data[index][1];
	}
	/**
	* Checks if a list cache value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf ListCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function listCacheHas(key) {
		return assocIndexOf(this.__data__, key) > -1;
	}
	/**
	* Sets the list cache `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf ListCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the list cache instance.
	*/
	function listCacheSet(key, value) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) data.push([key, value]);
		else data[index][1] = value;
		return this;
	}
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype["delete"] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	/**
	* Creates a map cache object to store key-value pairs.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function MapCache(entries) {
		var index = -1, length = entries ? entries.length : 0;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	/**
	* Removes all key-value entries from the map.
	*
	* @private
	* @name clear
	* @memberOf MapCache
	*/
	function mapCacheClear() {
		this.__data__ = {
			"hash": new Hash(),
			"map": new (Map || ListCache)(),
			"string": new Hash()
		};
	}
	/**
	* Removes `key` and its value from the map.
	*
	* @private
	* @name delete
	* @memberOf MapCache
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function mapCacheDelete(key) {
		return getMapData(this, key)["delete"](key);
	}
	/**
	* Gets the map value for `key`.
	*
	* @private
	* @name get
	* @memberOf MapCache
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function mapCacheGet(key) {
		return getMapData(this, key).get(key);
	}
	/**
	* Checks if a map value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf MapCache
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function mapCacheHas(key) {
		return getMapData(this, key).has(key);
	}
	/**
	* Sets the map `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf MapCache
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the map cache instance.
	*/
	function mapCacheSet(key, value) {
		getMapData(this, key).set(key, value);
		return this;
	}
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype["delete"] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	/**
	*
	* Creates an array cache object to store unique values.
	*
	* @private
	* @constructor
	* @param {Array} [values] The values to cache.
	*/
	function SetCache(values) {
		var index = -1, length = values ? values.length : 0;
		this.__data__ = new MapCache();
		while (++index < length) this.add(values[index]);
	}
	/**
	* Adds `value` to the array cache.
	*
	* @private
	* @name add
	* @memberOf SetCache
	* @alias push
	* @param {*} value The value to cache.
	* @returns {Object} Returns the cache instance.
	*/
	function setCacheAdd(value) {
		this.__data__.set(value, HASH_UNDEFINED);
		return this;
	}
	/**
	* Checks if `value` is in the array cache.
	*
	* @private
	* @name has
	* @memberOf SetCache
	* @param {*} value The value to search for.
	* @returns {number} Returns `true` if `value` is found, else `false`.
	*/
	function setCacheHas(value) {
		return this.__data__.has(value);
	}
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	/**
	* Creates a stack cache object to store key-value pairs.
	*
	* @private
	* @constructor
	* @param {Array} [entries] The key-value pairs to cache.
	*/
	function Stack(entries) {
		this.__data__ = new ListCache(entries);
	}
	/**
	* Removes all key-value entries from the stack.
	*
	* @private
	* @name clear
	* @memberOf Stack
	*/
	function stackClear() {
		this.__data__ = new ListCache();
	}
	/**
	* Removes `key` and its value from the stack.
	*
	* @private
	* @name delete
	* @memberOf Stack
	* @param {string} key The key of the value to remove.
	* @returns {boolean} Returns `true` if the entry was removed, else `false`.
	*/
	function stackDelete(key) {
		return this.__data__["delete"](key);
	}
	/**
	* Gets the stack value for `key`.
	*
	* @private
	* @name get
	* @memberOf Stack
	* @param {string} key The key of the value to get.
	* @returns {*} Returns the entry value.
	*/
	function stackGet(key) {
		return this.__data__.get(key);
	}
	/**
	* Checks if a stack value for `key` exists.
	*
	* @private
	* @name has
	* @memberOf Stack
	* @param {string} key The key of the entry to check.
	* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	*/
	function stackHas(key) {
		return this.__data__.has(key);
	}
	/**
	* Sets the stack `key` to `value`.
	*
	* @private
	* @name set
	* @memberOf Stack
	* @param {string} key The key of the value to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns the stack cache instance.
	*/
	function stackSet(key, value) {
		var cache = this.__data__;
		if (cache instanceof ListCache) {
			var pairs = cache.__data__;
			if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
				pairs.push([key, value]);
				return this;
			}
			cache = this.__data__ = new MapCache(pairs);
		}
		cache.set(key, value);
		return this;
	}
	Stack.prototype.clear = stackClear;
	Stack.prototype["delete"] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	/**
	* Creates an array of the enumerable property names of the array-like `value`.
	*
	* @private
	* @param {*} value The value to query.
	* @param {boolean} inherited Specify returning inherited property names.
	* @returns {Array} Returns the array of property names.
	*/
	function arrayLikeKeys(value, inherited) {
		var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
		var length = result.length, skipIndexes = !!length;
		for (var key in value) if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) result.push(key);
		return result;
	}
	/**
	* Gets the index at which the `key` is found in `array` of key-value pairs.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {*} key The key to search for.
	* @returns {number} Returns the index of the matched value, else `-1`.
	*/
	function assocIndexOf(array, key) {
		var length = array.length;
		while (length--) if (eq(array[length][0], key)) return length;
		return -1;
	}
	/**
	* The base implementation of methods like `_.difference` without support
	* for excluding multiple arrays or iteratee shorthands.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {Array} values The values to exclude.
	* @param {Function} [iteratee] The iteratee invoked per element.
	* @param {Function} [comparator] The comparator invoked per element.
	* @returns {Array} Returns the new array of filtered values.
	*/
	function baseDifference(array, values, iteratee, comparator) {
		var index = -1, includes = arrayIncludes, isCommon = true, length = array.length, result = [], valuesLength = values.length;
		if (!length) return result;
		if (iteratee) values = arrayMap(values, baseUnary(iteratee));
		if (comparator) {
			includes = arrayIncludesWith;
			isCommon = false;
		} else if (values.length >= LARGE_ARRAY_SIZE) {
			includes = cacheHas;
			isCommon = false;
			values = new SetCache(values);
		}
		outer: while (++index < length) {
			var value = array[index], computed = iteratee ? iteratee(value) : value;
			value = comparator || value !== 0 ? value : 0;
			if (isCommon && computed === computed) {
				var valuesIndex = valuesLength;
				while (valuesIndex--) if (values[valuesIndex] === computed) continue outer;
				result.push(value);
			} else if (!includes(values, computed, comparator)) result.push(value);
		}
		return result;
	}
	/**
	* The base implementation of `_.get` without support for default values.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {Array|string} path The path of the property to get.
	* @returns {*} Returns the resolved value.
	*/
	function baseGet(object, path) {
		path = isKey(path, object) ? [path] : castPath(path);
		var index = 0, length = path.length;
		while (object != null && index < length) object = object[toKey(path[index++])];
		return index && index == length ? object : void 0;
	}
	/**
	* The base implementation of `getTag`.
	*
	* @private
	* @param {*} value The value to query.
	* @returns {string} Returns the `toStringTag`.
	*/
	function baseGetTag(value) {
		return objectToString.call(value);
	}
	/**
	* The base implementation of `_.hasIn` without support for deep paths.
	*
	* @private
	* @param {Object} [object] The object to query.
	* @param {Array|string} key The key to check.
	* @returns {boolean} Returns `true` if `key` exists, else `false`.
	*/
	function baseHasIn(object, key) {
		return object != null && key in Object(object);
	}
	/**
	* The base implementation of `_.isEqual` which supports partial comparisons
	* and tracks traversed objects.
	*
	* @private
	* @param {*} value The value to compare.
	* @param {*} other The other value to compare.
	* @param {Function} [customizer] The function to customize comparisons.
	* @param {boolean} [bitmask] The bitmask of comparison flags.
	*  The bitmask may be composed of the following flags:
	*     1 - Unordered comparison
	*     2 - Partial comparison
	* @param {Object} [stack] Tracks traversed `value` and `other` objects.
	* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	*/
	function baseIsEqual(value, other, customizer, bitmask, stack) {
		if (value === other) return true;
		if (value == null || other == null || !isObject(value) && !isObjectLike(other)) return value !== value && other !== other;
		return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	/**
	* A specialized version of `baseIsEqual` for arrays and objects which performs
	* deep comparisons and tracks traversed objects enabling objects with circular
	* references to be compared.
	*
	* @private
	* @param {Object} object The object to compare.
	* @param {Object} other The other object to compare.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Function} [customizer] The function to customize comparisons.
	* @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	*  for more details.
	* @param {Object} [stack] Tracks traversed `object` and `other` objects.
	* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	*/
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
		var objIsArr = isArray(object), othIsArr = isArray(other), objTag = arrayTag, othTag = arrayTag;
		if (!objIsArr) {
			objTag = getTag(object);
			objTag = objTag == argsTag ? objectTag : objTag;
		}
		if (!othIsArr) {
			othTag = getTag(other);
			othTag = othTag == argsTag ? objectTag : othTag;
		}
		var objIsObj = objTag == objectTag && !isHostObject(object), othIsObj = othTag == objectTag && !isHostObject(other), isSameTag = objTag == othTag;
		if (isSameTag && !objIsObj) {
			stack || (stack = new Stack());
			return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
		}
		if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
			var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
			if (objIsWrapped || othIsWrapped) {
				var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
				stack || (stack = new Stack());
				return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
			}
		}
		if (!isSameTag) return false;
		stack || (stack = new Stack());
		return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	/**
	* The base implementation of `_.isMatch` without support for iteratee shorthands.
	*
	* @private
	* @param {Object} object The object to inspect.
	* @param {Object} source The object of property values to match.
	* @param {Array} matchData The property names, values, and compare flags to match.
	* @param {Function} [customizer] The function to customize comparisons.
	* @returns {boolean} Returns `true` if `object` is a match, else `false`.
	*/
	function baseIsMatch(object, source, matchData, customizer) {
		var index = matchData.length, length = index, noCustomizer = !customizer;
		if (object == null) return !length;
		object = Object(object);
		while (index--) {
			var data = matchData[index];
			if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return false;
		}
		while (++index < length) {
			data = matchData[index];
			var key = data[0], objValue = object[key], srcValue = data[1];
			if (noCustomizer && data[2]) {
				if (objValue === void 0 && !(key in object)) return false;
			} else {
				var stack = new Stack();
				if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack);
				if (!(result === void 0 ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) return false;
			}
		}
		return true;
	}
	/**
	* The base implementation of `_.isNative` without bad shim checks.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a native function,
	*  else `false`.
	*/
	function baseIsNative(value) {
		if (!isObject(value) || isMasked(value)) return false;
		return (isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor).test(toSource(value));
	}
	/**
	* The base implementation of `_.isTypedArray` without Node.js optimizations.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	*/
	function baseIsTypedArray(value) {
		return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	/**
	* The base implementation of `_.iteratee`.
	*
	* @private
	* @param {*} [value=_.identity] The value to convert to an iteratee.
	* @returns {Function} Returns the iteratee.
	*/
	function baseIteratee(value) {
		if (typeof value == "function") return value;
		if (value == null) return identity;
		if (typeof value == "object") return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
		return property(value);
	}
	/**
	* The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	*/
	function baseKeys(object) {
		if (!isPrototype(object)) return nativeKeys(object);
		var result = [];
		for (var key in Object(object)) if (hasOwnProperty.call(object, key) && key != "constructor") result.push(key);
		return result;
	}
	/**
	* The base implementation of `_.matches` which doesn't clone `source`.
	*
	* @private
	* @param {Object} source The object of property values to match.
	* @returns {Function} Returns the new spec function.
	*/
	function baseMatches(source) {
		var matchData = getMatchData(source);
		if (matchData.length == 1 && matchData[0][2]) return matchesStrictComparable(matchData[0][0], matchData[0][1]);
		return function(object) {
			return object === source || baseIsMatch(object, source, matchData);
		};
	}
	/**
	* The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	*
	* @private
	* @param {string} path The path of the property to get.
	* @param {*} srcValue The value to match.
	* @returns {Function} Returns the new spec function.
	*/
	function baseMatchesProperty(path, srcValue) {
		if (isKey(path) && isStrictComparable(srcValue)) return matchesStrictComparable(toKey(path), srcValue);
		return function(object) {
			var objValue = get(object, path);
			return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, void 0, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
		};
	}
	/**
	* A specialized version of `baseProperty` which supports deep paths.
	*
	* @private
	* @param {Array|string} path The path of the property to get.
	* @returns {Function} Returns the new accessor function.
	*/
	function basePropertyDeep(path) {
		return function(object) {
			return baseGet(object, path);
		};
	}
	/**
	* The base implementation of `_.rest` which doesn't validate or coerce arguments.
	*
	* @private
	* @param {Function} func The function to apply a rest parameter to.
	* @param {number} [start=func.length-1] The start position of the rest parameter.
	* @returns {Function} Returns the new function.
	*/
	function baseRest(func, start) {
		start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
		return function() {
			var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
			while (++index < length) array[index] = args[start + index];
			index = -1;
			var otherArgs = Array(start + 1);
			while (++index < start) otherArgs[index] = args[index];
			otherArgs[start] = array;
			return apply(func, this, otherArgs);
		};
	}
	/**
	* The base implementation of `_.toString` which doesn't convert nullish
	* values to empty strings.
	*
	* @private
	* @param {*} value The value to process.
	* @returns {string} Returns the string.
	*/
	function baseToString(value) {
		if (typeof value == "string") return value;
		if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
		var result = value + "";
		return result == "0" && 1 / value == -INFINITY ? "-0" : result;
	}
	/**
	* The base implementation of `_.uniqBy` without support for iteratee shorthands.
	*
	* @private
	* @param {Array} array The array to inspect.
	* @param {Function} [iteratee] The iteratee invoked per element.
	* @param {Function} [comparator] The comparator invoked per element.
	* @returns {Array} Returns the new duplicate free array.
	*/
	function baseUniq(array, iteratee, comparator) {
		var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
		if (comparator) {
			isCommon = false;
			includes = arrayIncludesWith;
		} else if (length >= LARGE_ARRAY_SIZE) {
			var set = iteratee ? null : createSet(array);
			if (set) return setToArray(set);
			isCommon = false;
			includes = cacheHas;
			seen = new SetCache();
		} else seen = iteratee ? [] : result;
		outer: while (++index < length) {
			var value = array[index], computed = iteratee ? iteratee(value) : value;
			value = comparator || value !== 0 ? value : 0;
			if (isCommon && computed === computed) {
				var seenIndex = seen.length;
				while (seenIndex--) if (seen[seenIndex] === computed) continue outer;
				if (iteratee) seen.push(computed);
				result.push(value);
			} else if (!includes(seen, computed, comparator)) {
				if (seen !== result) seen.push(computed);
				result.push(value);
			}
		}
		return result;
	}
	/**
	* The base implementation of methods like `_.xor`, without support for
	* iteratee shorthands, that accepts an array of arrays to inspect.
	*
	* @private
	* @param {Array} arrays The arrays to inspect.
	* @param {Function} [iteratee] The iteratee invoked per element.
	* @param {Function} [comparator] The comparator invoked per element.
	* @returns {Array} Returns the new array of values.
	*/
	function baseXor(arrays, iteratee, comparator) {
		var index = -1, length = arrays.length;
		while (++index < length) var result = result ? arrayPush(baseDifference(result, arrays[index], iteratee, comparator), baseDifference(arrays[index], result, iteratee, comparator)) : arrays[index];
		return result && result.length ? baseUniq(result, iteratee, comparator) : [];
	}
	/**
	* Casts `value` to a path array if it's not one.
	*
	* @private
	* @param {*} value The value to inspect.
	* @returns {Array} Returns the cast property path array.
	*/
	function castPath(value) {
		return isArray(value) ? value : stringToPath(value);
	}
	/**
	* Creates a set object of `values`.
	*
	* @private
	* @param {Array} values The values to add to the set.
	* @returns {Object} Returns the new set.
	*/
	var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values) {
		return new Set(values);
	};
	/**
	* A specialized version of `baseIsEqualDeep` for arrays with support for
	* partial deep comparisons.
	*
	* @private
	* @param {Array} array The array to compare.
	* @param {Array} other The other array to compare.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Function} customizer The function to customize comparisons.
	* @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	*  for more details.
	* @param {Object} stack Tracks traversed `array` and `other` objects.
	* @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	*/
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
		var isPartial = bitmask & PARTIAL_COMPARE_FLAG, arrLength = array.length, othLength = other.length;
		if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
		var stacked = stack.get(array);
		if (stacked && stack.get(other)) return stacked == other;
		var index = -1, result = true, seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : void 0;
		stack.set(array, other);
		stack.set(other, array);
		while (++index < arrLength) {
			var arrValue = array[index], othValue = other[index];
			if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
			if (compared !== void 0) {
				if (compared) continue;
				result = false;
				break;
			}
			if (seen) {
				if (!arraySome(other, function(othValue, othIndex) {
					if (!seen.has(othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) return seen.add(othIndex);
				})) {
					result = false;
					break;
				}
			} else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
				result = false;
				break;
			}
		}
		stack["delete"](array);
		stack["delete"](other);
		return result;
	}
	/**
	* A specialized version of `baseIsEqualDeep` for comparing objects of
	* the same `toStringTag`.
	*
	* **Note:** This function only supports comparing values with tags of
	* `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	*
	* @private
	* @param {Object} object The object to compare.
	* @param {Object} other The other object to compare.
	* @param {string} tag The `toStringTag` of the objects to compare.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Function} customizer The function to customize comparisons.
	* @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	*  for more details.
	* @param {Object} stack Tracks traversed `object` and `other` objects.
	* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	*/
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
		switch (tag) {
			case dataViewTag:
				if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
				object = object.buffer;
				other = other.buffer;
			case arrayBufferTag:
				if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) return false;
				return true;
			case boolTag:
			case dateTag:
			case numberTag: return eq(+object, +other);
			case errorTag: return object.name == other.name && object.message == other.message;
			case regexpTag:
			case stringTag: return object == other + "";
			case mapTag: var convert = mapToArray;
			case setTag:
				var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
				convert || (convert = setToArray);
				if (object.size != other.size && !isPartial) return false;
				var stacked = stack.get(object);
				if (stacked) return stacked == other;
				bitmask |= UNORDERED_COMPARE_FLAG;
				stack.set(object, other);
				var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
				stack["delete"](object);
				return result;
			case symbolTag: if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
		}
		return false;
	}
	/**
	* A specialized version of `baseIsEqualDeep` for objects with support for
	* partial deep comparisons.
	*
	* @private
	* @param {Object} object The object to compare.
	* @param {Object} other The other object to compare.
	* @param {Function} equalFunc The function to determine equivalents of values.
	* @param {Function} customizer The function to customize comparisons.
	* @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	*  for more details.
	* @param {Object} stack Tracks traversed `object` and `other` objects.
	* @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	*/
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
		var isPartial = bitmask & PARTIAL_COMPARE_FLAG, objProps = keys(object), objLength = objProps.length;
		if (objLength != keys(other).length && !isPartial) return false;
		var index = objLength;
		while (index--) {
			var key = objProps[index];
			if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return false;
		}
		var stacked = stack.get(object);
		if (stacked && stack.get(other)) return stacked == other;
		var result = true;
		stack.set(object, other);
		stack.set(other, object);
		var skipCtor = isPartial;
		while (++index < objLength) {
			key = objProps[index];
			var objValue = object[key], othValue = other[key];
			if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
			if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
				result = false;
				break;
			}
			skipCtor || (skipCtor = key == "constructor");
		}
		if (result && !skipCtor) {
			var objCtor = object.constructor, othCtor = other.constructor;
			if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result = false;
		}
		stack["delete"](object);
		stack["delete"](other);
		return result;
	}
	/**
	* Gets the data for `map`.
	*
	* @private
	* @param {Object} map The map to query.
	* @param {string} key The reference key.
	* @returns {*} Returns the map data.
	*/
	function getMapData(map, key) {
		var data = map.__data__;
		return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
	}
	/**
	* Gets the property names, values, and compare flags of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the match data of `object`.
	*/
	function getMatchData(object) {
		var result = keys(object), length = result.length;
		while (length--) {
			var key = result[length], value = object[key];
			result[length] = [
				key,
				value,
				isStrictComparable(value)
			];
		}
		return result;
	}
	/**
	* Gets the native function at `key` of `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {string} key The key of the method to get.
	* @returns {*} Returns the function if it's native, else `undefined`.
	*/
	function getNative(object, key) {
		var value = getValue(object, key);
		return baseIsNative(value) ? value : void 0;
	}
	/**
	* Gets the `toStringTag` of `value`.
	*
	* @private
	* @param {*} value The value to query.
	* @returns {string} Returns the `toStringTag`.
	*/
	var getTag = baseGetTag;
	if (DataView && getTag(new DataView(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) getTag = function(value) {
		var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
		if (ctorString) switch (ctorString) {
			case dataViewCtorString: return dataViewTag;
			case mapCtorString: return mapTag;
			case promiseCtorString: return promiseTag;
			case setCtorString: return setTag;
			case weakMapCtorString: return weakMapTag;
		}
		return result;
	};
	/**
	* Checks if `path` exists on `object`.
	*
	* @private
	* @param {Object} object The object to query.
	* @param {Array|string} path The path to check.
	* @param {Function} hasFunc The function to check properties.
	* @returns {boolean} Returns `true` if `path` exists, else `false`.
	*/
	function hasPath(object, path, hasFunc) {
		path = isKey(path, object) ? [path] : castPath(path);
		var result, index = -1, length = path.length;
		while (++index < length) {
			var key = toKey(path[index]);
			if (!(result = object != null && hasFunc(object, key))) break;
			object = object[key];
		}
		if (result) return result;
		var length = object ? object.length : 0;
		return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
	}
	/**
	* Checks if `value` is a valid array-like index.
	*
	* @private
	* @param {*} value The value to check.
	* @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	* @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	*/
	function isIndex(value, length) {
		length = length == null ? MAX_SAFE_INTEGER : length;
		return !!length && (typeof value == "number" || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}
	/**
	* Checks if `value` is a property name and not a property path.
	*
	* @private
	* @param {*} value The value to check.
	* @param {Object} [object] The object to query keys on.
	* @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	*/
	function isKey(value, object) {
		if (isArray(value)) return false;
		var type = typeof value;
		if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) return true;
		return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
	}
	/**
	* Checks if `value` is suitable for use as unique object key.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	*/
	function isKeyable(value) {
		var type = typeof value;
		return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
	}
	/**
	* Checks if `func` has its source masked.
	*
	* @private
	* @param {Function} func The function to check.
	* @returns {boolean} Returns `true` if `func` is masked, else `false`.
	*/
	function isMasked(func) {
		return !!maskSrcKey && maskSrcKey in func;
	}
	/**
	* Checks if `value` is likely a prototype object.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	*/
	function isPrototype(value) {
		var Ctor = value && value.constructor;
		return value === (typeof Ctor == "function" && Ctor.prototype || objectProto);
	}
	/**
	* Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` if suitable for strict
	*  equality comparisons, else `false`.
	*/
	function isStrictComparable(value) {
		return value === value && !isObject(value);
	}
	/**
	* A specialized version of `matchesProperty` for source values suitable
	* for strict equality comparisons, i.e. `===`.
	*
	* @private
	* @param {string} key The key of the property to get.
	* @param {*} srcValue The value to match.
	* @returns {Function} Returns the new spec function.
	*/
	function matchesStrictComparable(key, srcValue) {
		return function(object) {
			if (object == null) return false;
			return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
		};
	}
	/**
	* Converts `string` to a property path array.
	*
	* @private
	* @param {string} string The string to convert.
	* @returns {Array} Returns the property path array.
	*/
	var stringToPath = memoize(function(string) {
		string = toString(string);
		var result = [];
		if (reLeadingDot.test(string)) result.push("");
		string.replace(rePropName, function(match, number, quote, string) {
			result.push(quote ? string.replace(reEscapeChar, "$1") : number || match);
		});
		return result;
	});
	/**
	* Converts `value` to a string key if it's not a string or symbol.
	*
	* @private
	* @param {*} value The value to inspect.
	* @returns {string|symbol} Returns the key.
	*/
	function toKey(value) {
		if (typeof value == "string" || isSymbol(value)) return value;
		var result = value + "";
		return result == "0" && 1 / value == -INFINITY ? "-0" : result;
	}
	/**
	* Converts `func` to its source code.
	*
	* @private
	* @param {Function} func The function to process.
	* @returns {string} Returns the source code.
	*/
	function toSource(func) {
		if (func != null) {
			try {
				return funcToString.call(func);
			} catch (e) {}
			try {
				return func + "";
			} catch (e) {}
		}
		return "";
	}
	/**
	* Gets the last element of `array`.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Array
	* @param {Array} array The array to query.
	* @returns {*} Returns the last element of `array`.
	* @example
	*
	* _.last([1, 2, 3]);
	* // => 3
	*/
	function last(array) {
		var length = array ? array.length : 0;
		return length ? array[length - 1] : void 0;
	}
	/**
	* This method is like `_.xor` except that it accepts `iteratee` which is
	* invoked for each element of each `arrays` to generate the criterion by
	* which by which they're compared. The iteratee is invoked with one argument:
	* (value).
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Array
	* @param {...Array} [arrays] The arrays to inspect.
	* @param {Function} [iteratee=_.identity]
	*  The iteratee invoked per element.
	* @returns {Array} Returns the new array of filtered values.
	* @example
	*
	* _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
	* // => [1.2, 3.4]
	*
	* // The `_.property` iteratee shorthand.
	* _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
	* // => [{ 'x': 2 }]
	*/
	var xorBy = baseRest(function(arrays) {
		var iteratee = last(arrays);
		if (isArrayLikeObject(iteratee)) iteratee = void 0;
		return baseXor(arrayFilter(arrays, isArrayLikeObject), baseIteratee(iteratee, 2));
	});
	/**
	* Creates a function that memoizes the result of `func`. If `resolver` is
	* provided, it determines the cache key for storing the result based on the
	* arguments provided to the memoized function. By default, the first argument
	* provided to the memoized function is used as the map cache key. The `func`
	* is invoked with the `this` binding of the memoized function.
	*
	* **Note:** The cache is exposed as the `cache` property on the memoized
	* function. Its creation may be customized by replacing the `_.memoize.Cache`
	* constructor with one whose instances implement the
	* [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	* method interface of `delete`, `get`, `has`, and `set`.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Function
	* @param {Function} func The function to have its output memoized.
	* @param {Function} [resolver] The function to resolve the cache key.
	* @returns {Function} Returns the new memoized function.
	* @example
	*
	* var object = { 'a': 1, 'b': 2 };
	* var other = { 'c': 3, 'd': 4 };
	*
	* var values = _.memoize(_.values);
	* values(object);
	* // => [1, 2]
	*
	* values(other);
	* // => [3, 4]
	*
	* object.a = 2;
	* values(object);
	* // => [1, 2]
	*
	* // Modify the result cache.
	* values.cache.set(object, ['a', 'b']);
	* values(object);
	* // => ['a', 'b']
	*
	* // Replace `_.memoize.Cache`.
	* _.memoize.Cache = WeakMap;
	*/
	function memoize(func, resolver) {
		if (typeof func != "function" || resolver && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT);
		var memoized = function() {
			var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
			if (cache.has(key)) return cache.get(key);
			var result = func.apply(this, args);
			memoized.cache = cache.set(key, result);
			return result;
		};
		memoized.cache = new (memoize.Cache || MapCache)();
		return memoized;
	}
	memoize.Cache = MapCache;
	/**
	* Performs a
	* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* comparison between two values to determine if they are equivalent.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to compare.
	* @param {*} other The other value to compare.
	* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	* @example
	*
	* var object = { 'a': 1 };
	* var other = { 'a': 1 };
	*
	* _.eq(object, object);
	* // => true
	*
	* _.eq(object, other);
	* // => false
	*
	* _.eq('a', 'a');
	* // => true
	*
	* _.eq('a', Object('a'));
	* // => false
	*
	* _.eq(NaN, NaN);
	* // => true
	*/
	function eq(value, other) {
		return value === other || value !== value && other !== other;
	}
	/**
	* Checks if `value` is likely an `arguments` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an `arguments` object,
	*  else `false`.
	* @example
	*
	* _.isArguments(function() { return arguments; }());
	* // => true
	*
	* _.isArguments([1, 2, 3]);
	* // => false
	*/
	function isArguments(value) {
		return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
	}
	/**
	* Checks if `value` is classified as an `Array` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an array, else `false`.
	* @example
	*
	* _.isArray([1, 2, 3]);
	* // => true
	*
	* _.isArray(document.body.children);
	* // => false
	*
	* _.isArray('abc');
	* // => false
	*
	* _.isArray(_.noop);
	* // => false
	*/
	var isArray = Array.isArray;
	/**
	* Checks if `value` is array-like. A value is considered array-like if it's
	* not a function and has a `value.length` that's an integer greater than or
	* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	* @example
	*
	* _.isArrayLike([1, 2, 3]);
	* // => true
	*
	* _.isArrayLike(document.body.children);
	* // => true
	*
	* _.isArrayLike('abc');
	* // => true
	*
	* _.isArrayLike(_.noop);
	* // => false
	*/
	function isArrayLike(value) {
		return value != null && isLength(value.length) && !isFunction(value);
	}
	/**
	* This method is like `_.isArrayLike` except that it also checks if `value`
	* is an object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an array-like object,
	*  else `false`.
	* @example
	*
	* _.isArrayLikeObject([1, 2, 3]);
	* // => true
	*
	* _.isArrayLikeObject(document.body.children);
	* // => true
	*
	* _.isArrayLikeObject('abc');
	* // => false
	*
	* _.isArrayLikeObject(_.noop);
	* // => false
	*/
	function isArrayLikeObject(value) {
		return isObjectLike(value) && isArrayLike(value);
	}
	/**
	* Checks if `value` is classified as a `Function` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a function, else `false`.
	* @example
	*
	* _.isFunction(_);
	* // => true
	*
	* _.isFunction(/abc/);
	* // => false
	*/
	function isFunction(value) {
		var tag = isObject(value) ? objectToString.call(value) : "";
		return tag == funcTag || tag == genTag;
	}
	/**
	* Checks if `value` is a valid array-like length.
	*
	* **Note:** This method is loosely based on
	* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	* @example
	*
	* _.isLength(3);
	* // => true
	*
	* _.isLength(Number.MIN_VALUE);
	* // => false
	*
	* _.isLength(Infinity);
	* // => false
	*
	* _.isLength('3');
	* // => false
	*/
	function isLength(value) {
		return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	/**
	* Checks if `value` is the
	* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an object, else `false`.
	* @example
	*
	* _.isObject({});
	* // => true
	*
	* _.isObject([1, 2, 3]);
	* // => true
	*
	* _.isObject(_.noop);
	* // => true
	*
	* _.isObject(null);
	* // => false
	*/
	function isObject(value) {
		var type = typeof value;
		return !!value && (type == "object" || type == "function");
	}
	/**
	* Checks if `value` is object-like. A value is object-like if it's not `null`
	* and has a `typeof` result of "object".
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	* @example
	*
	* _.isObjectLike({});
	* // => true
	*
	* _.isObjectLike([1, 2, 3]);
	* // => true
	*
	* _.isObjectLike(_.noop);
	* // => false
	*
	* _.isObjectLike(null);
	* // => false
	*/
	function isObjectLike(value) {
		return !!value && typeof value == "object";
	}
	/**
	* Checks if `value` is classified as a `Symbol` primitive or object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	* @example
	*
	* _.isSymbol(Symbol.iterator);
	* // => true
	*
	* _.isSymbol('abc');
	* // => false
	*/
	function isSymbol(value) {
		return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	/**
	* Checks if `value` is classified as a typed array.
	*
	* @static
	* @memberOf _
	* @since 3.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	* @example
	*
	* _.isTypedArray(new Uint8Array);
	* // => true
	*
	* _.isTypedArray([]);
	* // => false
	*/
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	/**
	* Converts `value` to a string. An empty string is returned for `null`
	* and `undefined` values. The sign of `-0` is preserved.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to process.
	* @returns {string} Returns the string.
	* @example
	*
	* _.toString(null);
	* // => ''
	*
	* _.toString(-0);
	* // => '-0'
	*
	* _.toString([1, 2, 3]);
	* // => '1,2,3'
	*/
	function toString(value) {
		return value == null ? "" : baseToString(value);
	}
	/**
	* Gets the value at `path` of `object`. If the resolved value is
	* `undefined`, the `defaultValue` is returned in its place.
	*
	* @static
	* @memberOf _
	* @since 3.7.0
	* @category Object
	* @param {Object} object The object to query.
	* @param {Array|string} path The path of the property to get.
	* @param {*} [defaultValue] The value returned for `undefined` resolved values.
	* @returns {*} Returns the resolved value.
	* @example
	*
	* var object = { 'a': [{ 'b': { 'c': 3 } }] };
	*
	* _.get(object, 'a[0].b.c');
	* // => 3
	*
	* _.get(object, ['a', '0', 'b', 'c']);
	* // => 3
	*
	* _.get(object, 'a.b.c', 'default');
	* // => 'default'
	*/
	function get(object, path, defaultValue) {
		var result = object == null ? void 0 : baseGet(object, path);
		return result === void 0 ? defaultValue : result;
	}
	/**
	* Checks if `path` is a direct or inherited property of `object`.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Object
	* @param {Object} object The object to query.
	* @param {Array|string} path The path to check.
	* @returns {boolean} Returns `true` if `path` exists, else `false`.
	* @example
	*
	* var object = _.create({ 'a': _.create({ 'b': 2 }) });
	*
	* _.hasIn(object, 'a');
	* // => true
	*
	* _.hasIn(object, 'a.b');
	* // => true
	*
	* _.hasIn(object, ['a', 'b']);
	* // => true
	*
	* _.hasIn(object, 'b');
	* // => false
	*/
	function hasIn(object, path) {
		return object != null && hasPath(object, path, baseHasIn);
	}
	/**
	* Creates an array of the own enumerable property names of `object`.
	*
	* **Note:** Non-object values are coerced to objects. See the
	* [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	* for more details.
	*
	* @static
	* @since 0.1.0
	* @memberOf _
	* @category Object
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	* @example
	*
	* function Foo() {
	*   this.a = 1;
	*   this.b = 2;
	* }
	*
	* Foo.prototype.c = 3;
	*
	* _.keys(new Foo);
	* // => ['a', 'b'] (iteration order is not guaranteed)
	*
	* _.keys('hi');
	* // => ['0', '1']
	*/
	function keys(object) {
		return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	/**
	* This method returns the first argument it receives.
	*
	* @static
	* @since 0.1.0
	* @memberOf _
	* @category Util
	* @param {*} value Any value.
	* @returns {*} Returns `value`.
	* @example
	*
	* var object = { 'a': 1 };
	*
	* console.log(_.identity(object) === object);
	* // => true
	*/
	function identity(value) {
		return value;
	}
	/**
	* This method returns `undefined`.
	*
	* @static
	* @memberOf _
	* @since 2.3.0
	* @category Util
	* @example
	*
	* _.times(2, _.noop);
	* // => [undefined, undefined]
	*/
	function noop() {}
	/**
	* Creates a function that returns the value at `path` of a given object.
	*
	* @static
	* @memberOf _
	* @since 2.4.0
	* @category Util
	* @param {Array|string} path The path of the property to get.
	* @returns {Function} Returns the new accessor function.
	* @example
	*
	* var objects = [
	*   { 'a': { 'b': 2 } },
	*   { 'a': { 'b': 1 } }
	* ];
	*
	* _.map(objects, _.property('a.b'));
	* // => [2, 1]
	*
	* _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	* // => [1, 2]
	*/
	function property(path) {
		return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}
	module.exports = xorBy;
}));
//#endregion
//#region node_modules/proj4/lib/global.js
function global_default(defs) {
	defs("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
	defs("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
	defs("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
	for (var i = 1; i <= 60; ++i) {
		defs("EPSG:" + (32600 + i), "+proj=utm +zone=" + i + " +datum=WGS84 +units=m");
		defs("EPSG:" + (32700 + i), "+proj=utm +zone=" + i + " +south +datum=WGS84 +units=m");
	}
	defs("EPSG:5041", "+title=WGS 84 / UPS North (E,N) +proj=stere +lat_0=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m");
	defs("EPSG:5042", "+title=WGS 84 / UPS South (E,N) +proj=stere +lat_0=-90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m");
	defs.WGS84 = defs["EPSG:4326"];
	defs["EPSG:3785"] = defs["EPSG:3857"];
	defs.GOOGLE = defs["EPSG:3857"];
	defs["EPSG:900913"] = defs["EPSG:3857"];
	defs["EPSG:102113"] = defs["EPSG:3857"];
}
//#endregion
//#region node_modules/proj4/lib/constants/values.js
var SRS_WGS84_SEMIMAJOR = 6378137;
var SRS_WGS84_SEMIMINOR = 6356752.314;
var SRS_WGS84_ESQUARED = .0066943799901413165;
var SEC_TO_RAD = 484813681109536e-20;
var HALF_PI = Math.PI / 2;
var SIXTH = .16666666666666666;
var RA4 = .04722222222222222;
var RA6 = .022156084656084655;
var EPSLN = 1e-10;
var D2R$1 = .017453292519943295;
var R2D = 57.29577951308232;
var FORTPI = Math.PI / 4;
var TWO_PI = Math.PI * 2;
var SPI = 3.14159265359;
//#endregion
//#region node_modules/proj4/lib/constants/PrimeMeridian.js
var primeMeridian = {};
primeMeridian.greenwich = 0;
primeMeridian.lisbon = -9.131906111111;
primeMeridian.paris = 2.337229166667;
primeMeridian.bogota = -74.080916666667;
primeMeridian.madrid = -3.687938888889;
primeMeridian.rome = 12.452333333333;
primeMeridian.bern = 7.439583333333;
primeMeridian.jakarta = 106.807719444444;
primeMeridian.ferro = -17.666666666667;
primeMeridian.brussels = 4.367975;
primeMeridian.stockholm = 18.058277777778;
primeMeridian.athens = 23.7163375;
primeMeridian.oslo = 10.722916666667;
//#endregion
//#region node_modules/proj4/lib/constants/units.js
var units_default = {
	mm: { to_meter: .001 },
	cm: { to_meter: .01 },
	ft: { to_meter: .3048 },
	"us-ft": { to_meter: 1200 / 3937 },
	fath: { to_meter: 1.8288 },
	kmi: { to_meter: 1852 },
	"us-ch": { to_meter: 20.1168402336805 },
	"us-mi": { to_meter: 1609.34721869444 },
	km: { to_meter: 1e3 },
	"ind-ft": { to_meter: .30479841 },
	"ind-yd": { to_meter: .91439523 },
	mi: { to_meter: 1609.344 },
	yd: { to_meter: .9144 },
	ch: { to_meter: 20.1168 },
	link: { to_meter: .201168 },
	dm: { to_meter: .1 },
	in: { to_meter: .0254 },
	"ind-ch": { to_meter: 20.11669506 },
	"us-in": { to_meter: .025400050800101 },
	"us-yd": { to_meter: .914401828803658 }
};
//#endregion
//#region node_modules/proj4/lib/match.js
var ignoredChar = /[\s_\-\/\(\)]/g;
function match(obj, key) {
	if (obj[key]) return obj[key];
	var keys = Object.keys(obj);
	var lkey = key.toLowerCase().replace(ignoredChar, "");
	var i = -1;
	var testkey, processedKey;
	while (++i < keys.length) {
		testkey = keys[i];
		processedKey = testkey.toLowerCase().replace(ignoredChar, "");
		if (processedKey === lkey) return obj[testkey];
	}
}
//#endregion
//#region node_modules/proj4/lib/projString.js
/**
* @param {string} defData
* @returns {import('./defs').ProjectionDefinition}
*/
function projString_default(defData) {
	/** @type {import('./defs').ProjectionDefinition} */
	var self = {};
	var paramObj = defData.split("+").map(function(v) {
		return v.trim();
	}).filter(function(a) {
		return a;
	}).reduce(function(p, a) {
		/** @type {Array<?>} */
		var split = a.split("=");
		split.push(true);
		p[split[0].toLowerCase()] = split[1];
		return p;
	}, {});
	var paramName, paramVal, paramOutname;
	var params = {
		proj: "projName",
		datum: "datumCode",
		rf: function(v) {
			self.rf = parseFloat(v);
		},
		lat_0: function(v) {
			self.lat0 = v * D2R$1;
		},
		lat_1: function(v) {
			self.lat1 = v * D2R$1;
		},
		lat_2: function(v) {
			self.lat2 = v * D2R$1;
		},
		lat_ts: function(v) {
			self.lat_ts = v * D2R$1;
		},
		lon_0: function(v) {
			self.long0 = v * D2R$1;
		},
		lon_1: function(v) {
			self.long1 = v * D2R$1;
		},
		lon_2: function(v) {
			self.long2 = v * D2R$1;
		},
		alpha: function(v) {
			self.alpha = parseFloat(v) * D2R$1;
		},
		gamma: function(v) {
			self.rectified_grid_angle = parseFloat(v) * D2R$1;
		},
		lonc: function(v) {
			self.longc = v * D2R$1;
		},
		x_0: function(v) {
			self.x0 = parseFloat(v);
		},
		y_0: function(v) {
			self.y0 = parseFloat(v);
		},
		k_0: function(v) {
			self.k0 = parseFloat(v);
		},
		k: function(v) {
			self.k0 = parseFloat(v);
		},
		a: function(v) {
			self.a = parseFloat(v);
		},
		b: function(v) {
			self.b = parseFloat(v);
		},
		r: function(v) {
			self.a = self.b = parseFloat(v);
		},
		r_a: function() {
			self.R_A = true;
		},
		zone: function(v) {
			self.zone = parseInt(v, 10);
		},
		south: function() {
			self.utmSouth = true;
		},
		towgs84: function(v) {
			self.datum_params = v.split(",").map(function(a) {
				return parseFloat(a);
			});
		},
		to_meter: function(v) {
			self.to_meter = parseFloat(v);
		},
		units: function(v) {
			self.units = v;
			var unit = match(units_default, v);
			if (unit) self.to_meter = unit.to_meter;
		},
		from_greenwich: function(v) {
			self.from_greenwich = v * D2R$1;
		},
		pm: function(v) {
			var pm = match(primeMeridian, v);
			self.from_greenwich = (pm ? pm : parseFloat(v)) * D2R$1;
		},
		nadgrids: function(v) {
			if (v === "@null") self.datumCode = "none";
			else self.nadgrids = v;
		},
		axis: function(v) {
			var legalAxis = "ewnsud";
			if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) self.axis = v;
		},
		approx: function() {
			self.approx = true;
		},
		over: function() {
			self.over = true;
		}
	};
	for (paramName in paramObj) {
		paramVal = paramObj[paramName];
		if (paramName in params) {
			paramOutname = params[paramName];
			if (typeof paramOutname === "function") paramOutname(paramVal);
			else self[paramOutname] = paramVal;
		} else self[paramName] = paramVal;
	}
	if (typeof self.datumCode === "string" && self.datumCode !== "WGS84") self.datumCode = self.datumCode.toLowerCase();
	self["projStr"] = defData;
	return self;
}
//#endregion
//#region node_modules/wkt-parser/PROJJSONBuilderBase.js
var PROJJSONBuilderBase = class {
	static getId(node) {
		const idNode = node.find((child) => Array.isArray(child) && child[0] === "ID");
		if (idNode && idNode.length >= 3) return {
			authority: idNode[1],
			code: parseInt(idNode[2], 10)
		};
		return null;
	}
	static convertUnit(node, type = "unit") {
		if (!node || node.length < 3) return {
			type,
			name: "unknown",
			conversion_factor: null
		};
		const name = node[1];
		const conversionFactor = parseFloat(node[2]) || null;
		const idNode = node.find((child) => Array.isArray(child) && child[0] === "ID");
		return {
			type,
			name,
			conversion_factor: conversionFactor,
			id: idNode ? {
				authority: idNode[1],
				code: parseInt(idNode[2], 10)
			} : null
		};
	}
	static convertAxis(node) {
		const name = node[1] || "Unknown";
		let direction;
		const abbreviationMatch = name.match(/^\((.)\)$/);
		if (abbreviationMatch) {
			const abbreviation = abbreviationMatch[1].toUpperCase();
			if (abbreviation === "E") direction = "east";
			else if (abbreviation === "N") direction = "north";
			else if (abbreviation === "U") direction = "up";
			else if (node[2]) direction = node[2];
			else throw new Error(`Unknown axis abbreviation: ${abbreviation}`);
		} else direction = node[2] || "unknown";
		const orderNode = node.find((child) => Array.isArray(child) && child[0] === "ORDER");
		const order = orderNode ? parseInt(orderNode[1], 10) : null;
		const unitNode = node.find((child) => Array.isArray(child) && (child[0] === "LENGTHUNIT" || child[0] === "ANGLEUNIT" || child[0] === "SCALEUNIT"));
		const unit = this.convertUnit(unitNode);
		return {
			name,
			direction,
			unit,
			order
		};
	}
	static extractAxes(node) {
		return node.filter((child) => Array.isArray(child) && child[0] === "AXIS").map((axis) => this.convertAxis(axis)).sort((a, b) => (a.order || 0) - (b.order || 0));
	}
	static convert(node, result = {}) {
		switch (node[0]) {
			case "PROJCRS":
				result.type = "ProjectedCRS";
				result.name = node[1];
				result.base_crs = node.find((child) => Array.isArray(child) && child[0] === "BASEGEOGCRS") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "BASEGEOGCRS")) : null;
				result.conversion = node.find((child) => Array.isArray(child) && child[0] === "CONVERSION") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "CONVERSION")) : null;
				const csNode = node.find((child) => Array.isArray(child) && child[0] === "CS");
				if (csNode) result.coordinate_system = {
					type: csNode[1],
					axis: this.extractAxes(node)
				};
				const lengthUnitNode = node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT");
				if (lengthUnitNode) {
					const unit = this.convertUnit(lengthUnitNode);
					result.coordinate_system.unit = unit;
				}
				result.id = this.getId(node);
				break;
			case "BASEGEOGCRS":
			case "GEOGCRS":
			case "GEODCRS":
				result.type = node[0] === "GEODCRS" ? "GeodeticCRS" : "GeographicCRS";
				result.name = node[1];
				const datumOrEnsembleNode = node.find((child) => Array.isArray(child) && (child[0] === "DATUM" || child[0] === "ENSEMBLE"));
				if (datumOrEnsembleNode) {
					const datumOrEnsemble = this.convert(datumOrEnsembleNode);
					if (datumOrEnsembleNode[0] === "ENSEMBLE") result.datum_ensemble = datumOrEnsemble;
					else result.datum = datumOrEnsemble;
					const primem = node.find((child) => Array.isArray(child) && child[0] === "PRIMEM");
					if (primem && primem[1] !== "Greenwich") datumOrEnsemble.prime_meridian = {
						name: primem[1],
						longitude: parseFloat(primem[2])
					};
				}
				result.coordinate_system = {
					type: "ellipsoidal",
					axis: this.extractAxes(node)
				};
				result.id = this.getId(node);
				break;
			case "DATUM":
				result.type = "GeodeticReferenceFrame";
				result.name = node[1];
				result.ellipsoid = node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID")) : null;
				break;
			case "ENSEMBLE":
				result.type = "DatumEnsemble";
				result.name = node[1];
				result.members = node.filter((child) => Array.isArray(child) && child[0] === "MEMBER").map((member) => ({
					type: "DatumEnsembleMember",
					name: member[1],
					id: this.getId(member)
				}));
				const accuracyNode = node.find((child) => Array.isArray(child) && child[0] === "ENSEMBLEACCURACY");
				if (accuracyNode) result.accuracy = parseFloat(accuracyNode[1]);
				const ellipsoidNode = node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID");
				if (ellipsoidNode) result.ellipsoid = this.convert(ellipsoidNode);
				result.id = this.getId(node);
				break;
			case "ELLIPSOID":
				result.type = "Ellipsoid";
				result.name = node[1];
				result.semi_major_axis = parseFloat(node[2]);
				result.inverse_flattening = parseFloat(node[3]);
				node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT") && this.convert(node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT"), result);
				break;
			case "CONVERSION":
				result.type = "Conversion";
				result.name = node[1];
				result.method = node.find((child) => Array.isArray(child) && child[0] === "METHOD") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "METHOD")) : null;
				result.parameters = node.filter((child) => Array.isArray(child) && child[0] === "PARAMETER").map((param) => this.convert(param));
				break;
			case "METHOD":
				result.type = "Method";
				result.name = node[1];
				result.id = this.getId(node);
				break;
			case "PARAMETER":
				result.type = "Parameter";
				result.name = node[1];
				result.value = parseFloat(node[2]);
				result.unit = this.convertUnit(node.find((child) => Array.isArray(child) && (child[0] === "LENGTHUNIT" || child[0] === "ANGLEUNIT" || child[0] === "SCALEUNIT")));
				result.id = this.getId(node);
				break;
			case "BOUNDCRS":
				result.type = "BoundCRS";
				const sourceCrsNode = node.find((child) => Array.isArray(child) && child[0] === "SOURCECRS");
				if (sourceCrsNode) {
					const sourceCrsContent = sourceCrsNode.find((child) => Array.isArray(child));
					result.source_crs = sourceCrsContent ? this.convert(sourceCrsContent) : null;
				}
				const targetCrsNode = node.find((child) => Array.isArray(child) && child[0] === "TARGETCRS");
				if (targetCrsNode) {
					const targetCrsContent = targetCrsNode.find((child) => Array.isArray(child));
					result.target_crs = targetCrsContent ? this.convert(targetCrsContent) : null;
				}
				const transformationNode = node.find((child) => Array.isArray(child) && child[0] === "ABRIDGEDTRANSFORMATION");
				if (transformationNode) result.transformation = this.convert(transformationNode);
				else result.transformation = null;
				break;
			case "ABRIDGEDTRANSFORMATION":
				result.type = "Transformation";
				result.name = node[1];
				result.method = node.find((child) => Array.isArray(child) && child[0] === "METHOD") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "METHOD")) : null;
				result.parameters = node.filter((child) => Array.isArray(child) && (child[0] === "PARAMETER" || child[0] === "PARAMETERFILE")).map((param) => {
					if (param[0] === "PARAMETER") return this.convert(param);
					else if (param[0] === "PARAMETERFILE") return {
						name: param[1],
						value: param[2],
						id: {
							"authority": "EPSG",
							"code": 8656
						}
					};
				});
				if (result.parameters.length === 7) {
					const scaleDifference = result.parameters[6];
					if (scaleDifference.name === "Scale difference") scaleDifference.value = Math.round((scaleDifference.value - 1) * 0xe8d4a51000) / 1e6;
				}
				result.id = this.getId(node);
				break;
			case "AXIS":
				if (!result.coordinate_system) result.coordinate_system = {
					type: "unspecified",
					axis: []
				};
				result.coordinate_system.axis.push(this.convertAxis(node));
				break;
			case "LENGTHUNIT":
				const unit = this.convertUnit(node, "LinearUnit");
				if (result.coordinate_system && result.coordinate_system.axis) result.coordinate_system.axis.forEach((axis) => {
					if (!axis.unit) axis.unit = unit;
				});
				if (unit.conversion_factor && unit.conversion_factor !== 1) {
					if (result.semi_major_axis) result.semi_major_axis = {
						value: result.semi_major_axis,
						unit
					};
				}
				break;
			default:
				result.keyword = node[0];
				break;
		}
		return result;
	}
};
//#endregion
//#region node_modules/wkt-parser/PROJJSONBuilder2015.js
var PROJJSONBuilder2015 = class extends PROJJSONBuilderBase {
	static convert(node, result = {}) {
		super.convert(node, result);
		if (result.coordinate_system && result.coordinate_system.subtype === "Cartesian") delete result.coordinate_system;
		if (result.usage) delete result.usage;
		return result;
	}
};
//#endregion
//#region node_modules/wkt-parser/PROJJSONBuilder2019.js
var PROJJSONBuilder2019 = class extends PROJJSONBuilderBase {
	static convert(node, result = {}) {
		super.convert(node, result);
		const csNode = node.find((child) => Array.isArray(child) && child[0] === "CS");
		if (csNode) result.coordinate_system = {
			subtype: csNode[1],
			axis: this.extractAxes(node)
		};
		const usageNode = node.find((child) => Array.isArray(child) && child[0] === "USAGE");
		if (usageNode) {
			const scope = usageNode.find((child) => Array.isArray(child) && child[0] === "SCOPE");
			const area = usageNode.find((child) => Array.isArray(child) && child[0] === "AREA");
			const bbox = usageNode.find((child) => Array.isArray(child) && child[0] === "BBOX");
			result.usage = {};
			if (scope) result.usage.scope = scope[1];
			if (area) result.usage.area = area[1];
			if (bbox) result.usage.bbox = bbox.slice(1);
		}
		return result;
	}
};
//#endregion
//#region node_modules/wkt-parser/buildPROJJSON.js
/**
* Detects the WKT2 version based on the structure of the WKT.
* @param {Array} root The root WKT array node.
* @returns {string} The detected version ("2015" or "2019").
*/
function detectWKT2Version(root) {
	if (root.find((child) => Array.isArray(child) && child[0] === "USAGE")) return "2019";
	if (root.find((child) => Array.isArray(child) && child[0] === "CS")) return "2015";
	if (root[0] === "BOUNDCRS" || root[0] === "PROJCRS" || root[0] === "GEOGCRS") return "2015";
	return "2015";
}
/**
* Builds a PROJJSON object from a WKT array structure.
* @param {Array} root The root WKT array node.
* @returns {Object} The PROJJSON object.
*/
function buildPROJJSON(root) {
	return (detectWKT2Version(root) === "2019" ? PROJJSONBuilder2019 : PROJJSONBuilder2015).convert(root);
}
//#endregion
//#region node_modules/wkt-parser/detectWKTVersion.js
/**
* Detects whether the WKT string is WKT1 or WKT2.
* @param {string} wkt The WKT string.
* @returns {string} The detected version ("WKT1" or "WKT2").
*/
function detectWKTVersion(wkt) {
	const normalizedWKT = wkt.toUpperCase();
	if (normalizedWKT.includes("PROJCRS") || normalizedWKT.includes("GEOGCRS") || normalizedWKT.includes("BOUNDCRS") || normalizedWKT.includes("VERTCRS") || normalizedWKT.includes("LENGTHUNIT") || normalizedWKT.includes("ANGLEUNIT") || normalizedWKT.includes("SCALEUNIT")) return "WKT2";
	if (normalizedWKT.includes("PROJCS") || normalizedWKT.includes("GEOGCS") || normalizedWKT.includes("LOCAL_CS") || normalizedWKT.includes("VERT_CS") || normalizedWKT.includes("UNIT")) return "WKT1";
	return "WKT1";
}
//#endregion
//#region node_modules/wkt-parser/parser.js
var parser_default = parseString;
var NEUTRAL = 1;
var KEYWORD = 2;
var NUMBER = 3;
var QUOTED = 4;
var AFTERQUOTE = 5;
var ENDED = -1;
var whitespace = /\s/;
var latin = /[A-Za-z]/;
var keyword = /[A-Za-z84_]/;
var endThings = /[,\]]/;
var digets = /[\d\.E\-\+]/;
function Parser(text) {
	if (typeof text !== "string") throw new Error("not a string");
	this.text = text.trim();
	this.level = 0;
	this.place = 0;
	this.root = null;
	this.stack = [];
	this.currentObject = null;
	this.state = NEUTRAL;
}
Parser.prototype.readCharicter = function() {
	var char = this.text[this.place++];
	if (this.state !== QUOTED) while (whitespace.test(char)) {
		if (this.place >= this.text.length) return;
		char = this.text[this.place++];
	}
	switch (this.state) {
		case NEUTRAL: return this.neutral(char);
		case KEYWORD: return this.keyword(char);
		case QUOTED: return this.quoted(char);
		case AFTERQUOTE: return this.afterquote(char);
		case NUMBER: return this.number(char);
		case ENDED: return;
	}
};
Parser.prototype.afterquote = function(char) {
	if (char === "\"") {
		this.word += "\"";
		this.state = QUOTED;
		return;
	}
	if (endThings.test(char)) {
		this.word = this.word.trim();
		this.afterItem(char);
		return;
	}
	throw new Error("havn't handled \"" + char + "\" in afterquote yet, index " + this.place);
};
Parser.prototype.afterItem = function(char) {
	if (char === ",") {
		if (this.word !== null) this.currentObject.push(this.word);
		this.word = null;
		this.state = NEUTRAL;
		return;
	}
	if (char === "]") {
		this.level--;
		if (this.word !== null) {
			this.currentObject.push(this.word);
			this.word = null;
		}
		this.state = NEUTRAL;
		this.currentObject = this.stack.pop();
		if (!this.currentObject) this.state = ENDED;
		return;
	}
};
Parser.prototype.number = function(char) {
	if (digets.test(char)) {
		this.word += char;
		return;
	}
	if (endThings.test(char)) {
		this.word = parseFloat(this.word);
		this.afterItem(char);
		return;
	}
	throw new Error("havn't handled \"" + char + "\" in number yet, index " + this.place);
};
Parser.prototype.quoted = function(char) {
	if (char === "\"") {
		this.state = AFTERQUOTE;
		return;
	}
	this.word += char;
};
Parser.prototype.keyword = function(char) {
	if (keyword.test(char)) {
		this.word += char;
		return;
	}
	if (char === "[") {
		var newObjects = [];
		newObjects.push(this.word);
		this.level++;
		if (this.root === null) this.root = newObjects;
		else this.currentObject.push(newObjects);
		this.stack.push(this.currentObject);
		this.currentObject = newObjects;
		this.state = NEUTRAL;
		return;
	}
	if (endThings.test(char)) {
		this.afterItem(char);
		return;
	}
	throw new Error("havn't handled \"" + char + "\" in keyword yet, index " + this.place);
};
Parser.prototype.neutral = function(char) {
	if (latin.test(char)) {
		this.word = char;
		this.state = KEYWORD;
		return;
	}
	if (char === "\"") {
		this.word = "";
		this.state = QUOTED;
		return;
	}
	if (digets.test(char)) {
		this.word = char;
		this.state = NUMBER;
		return;
	}
	if (endThings.test(char)) {
		this.afterItem(char);
		return;
	}
	throw new Error("havn't handled \"" + char + "\" in neutral yet, index " + this.place);
};
Parser.prototype.output = function() {
	while (this.place < this.text.length) this.readCharicter();
	if (this.state === ENDED) return this.root;
	throw new Error("unable to parse string \"" + this.text + "\". State is " + this.state);
};
function parseString(txt) {
	return new Parser(txt).output();
}
//#endregion
//#region node_modules/wkt-parser/process.js
function mapit(obj, key, value) {
	if (Array.isArray(key)) {
		value.unshift(key);
		key = null;
	}
	var thing = key ? {} : obj;
	var out = value.reduce(function(newObj, item) {
		sExpr(item, newObj);
		return newObj;
	}, thing);
	if (key) obj[key] = out;
}
function sExpr(v, obj) {
	if (!Array.isArray(v)) {
		obj[v] = true;
		return;
	}
	var key = v.shift();
	if (key === "PARAMETER") key = v.shift();
	if (v.length === 1) {
		if (Array.isArray(v[0])) {
			obj[key] = {};
			sExpr(v[0], obj[key]);
			return;
		}
		obj[key] = v[0];
		return;
	}
	if (!v.length) {
		obj[key] = true;
		return;
	}
	if (key === "TOWGS84") {
		obj[key] = v;
		return;
	}
	if (key === "AXIS") {
		if (!(key in obj)) obj[key] = [];
		obj[key].push(v);
		return;
	}
	if (!Array.isArray(key)) obj[key] = {};
	var i;
	switch (key) {
		case "UNIT":
		case "PRIMEM":
		case "VERT_DATUM":
			obj[key] = {
				name: v[0].toLowerCase(),
				convert: v[1]
			};
			if (v.length === 3) sExpr(v[2], obj[key]);
			return;
		case "SPHEROID":
		case "ELLIPSOID":
			obj[key] = {
				name: v[0],
				a: v[1],
				rf: v[2]
			};
			if (v.length === 4) sExpr(v[3], obj[key]);
			return;
		case "EDATUM":
		case "ENGINEERINGDATUM":
		case "LOCAL_DATUM":
		case "DATUM":
		case "VERT_CS":
		case "VERTCRS":
		case "VERTICALCRS":
			v[0] = ["name", v[0]];
			mapit(obj, key, v);
			return;
		case "COMPD_CS":
		case "COMPOUNDCRS":
		case "FITTED_CS":
		case "PROJECTEDCRS":
		case "PROJCRS":
		case "GEOGCS":
		case "GEOCCS":
		case "PROJCS":
		case "LOCAL_CS":
		case "GEODCRS":
		case "GEODETICCRS":
		case "GEODETICDATUM":
		case "ENGCRS":
		case "ENGINEERINGCRS":
			v[0] = ["name", v[0]];
			mapit(obj, key, v);
			obj[key].type = key;
			return;
		default:
			i = -1;
			while (++i < v.length) if (!Array.isArray(v[i])) return sExpr(v, obj[key]);
			return mapit(obj, key, v);
	}
}
//#endregion
//#region node_modules/wkt-parser/util.js
var D2R = .017453292519943295;
function d2r(input) {
	return input * D2R;
}
function applyProjectionDefaults(wkt) {
	const normalizedProjName = (wkt.projName || "").toLowerCase().replace(/_/g, " ");
	if (wkt.long0 === void 0 && wkt.longc !== void 0) wkt.long0 = wkt.longc;
	if (!wkt.lat_ts && wkt.lat1 && (normalizedProjName === "stereographic south pole" || normalizedProjName === "polar stereographic (variant b)")) {
		wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);
		wkt.lat_ts = wkt.lat1;
		delete wkt.lat1;
	} else if (!wkt.lat_ts && wkt.lat0 && (normalizedProjName === "polar stereographic" || normalizedProjName === "polar stereographic (variant a)")) {
		wkt.lat_ts = wkt.lat0;
		wkt.lat0 = d2r(wkt.lat0 > 0 ? 90 : -90);
		delete wkt.lat1;
	}
}
//#endregion
//#region node_modules/wkt-parser/transformPROJJSON.js
function processUnit(unit) {
	let result = {
		units: null,
		to_meter: void 0
	};
	if (typeof unit === "string") {
		result.units = unit.toLowerCase();
		if (result.units === "metre") result.units = "meter";
		if (result.units === "meter") result.to_meter = 1;
	} else if (unit && unit.name) {
		result.units = unit.name.toLowerCase();
		if (result.units === "metre") result.units = "meter";
		result.to_meter = unit.conversion_factor;
	}
	return result;
}
function toValue(valueOrObject) {
	if (typeof valueOrObject === "object") return valueOrObject.value * valueOrObject.unit.conversion_factor;
	return valueOrObject;
}
function calculateEllipsoid(value, result) {
	if (value.ellipsoid.radius) {
		result.a = value.ellipsoid.radius;
		result.rf = 0;
	} else {
		result.a = toValue(value.ellipsoid.semi_major_axis);
		if (value.ellipsoid.inverse_flattening !== void 0) result.rf = value.ellipsoid.inverse_flattening;
		else if (value.ellipsoid.semi_major_axis !== void 0 && value.ellipsoid.semi_minor_axis !== void 0) result.rf = result.a / (result.a - toValue(value.ellipsoid.semi_minor_axis));
	}
}
function transformPROJJSON(projjson, result = {}) {
	if (!projjson || typeof projjson !== "object") return projjson;
	if (projjson.type === "BoundCRS") {
		transformPROJJSON(projjson.source_crs, result);
		if (projjson.transformation) if (projjson.transformation.method && projjson.transformation.method.name === "NTv2") result.nadgrids = projjson.transformation.parameters[0].value;
		else result.datum_params = projjson.transformation.parameters.map((param) => param.value);
		return result;
	}
	Object.keys(projjson).forEach((key) => {
		const value = projjson[key];
		if (value === null) return;
		switch (key) {
			case "name":
				if (result.srsCode) break;
				result.name = value;
				result.srsCode = value;
				break;
			case "type":
				if (value === "GeographicCRS") result.projName = "longlat";
				else if (value === "GeodeticCRS") if (projjson.coordinate_system && projjson.coordinate_system.subtype === "Cartesian") result.projName = "geocent";
				else result.projName = "longlat";
				else if (value === "ProjectedCRS" && projjson.conversion && projjson.conversion.method) result.projName = projjson.conversion.method.name;
				break;
			case "datum":
			case "datum_ensemble":
				if (value.ellipsoid) {
					result.ellps = value.ellipsoid.name;
					calculateEllipsoid(value, result);
				}
				if (value.prime_meridian) result.from_greenwich = value.prime_meridian.longitude * Math.PI / 180;
				break;
			case "ellipsoid":
				result.ellps = value.name;
				calculateEllipsoid(value, result);
				break;
			case "prime_meridian":
				result.long0 = (value.longitude || 0) * Math.PI / 180;
				break;
			case "coordinate_system":
				if (value.axis) {
					const directionMap = {
						"east": "e",
						"north": "n",
						"west": "w",
						"south": "s",
						"up": "u",
						"down": "d",
						"geocentricx": "e",
						"geocentricy": "n",
						"geocentricz": "u"
					};
					const mapped = value.axis.map((axis) => directionMap[axis.direction.toLowerCase()]);
					if (mapped.every(Boolean)) {
						result.axis = mapped.join("");
						if (result.axis.length === 2) result.axis += "u";
					}
					if (value.unit) {
						const { units, to_meter } = processUnit(value.unit);
						result.units = units;
						result.to_meter = to_meter;
					} else if (value.axis[0] && value.axis[0].unit) {
						const { units, to_meter } = processUnit(value.axis[0].unit);
						result.units = units;
						result.to_meter = to_meter;
					}
				}
				break;
			case "id":
				if (value.authority && value.code) result.title = value.authority + ":" + value.code;
				break;
			case "conversion":
				if (value.method && value.method.name) result.projName = value.method.name;
				if (value.parameters) value.parameters.forEach((param) => {
					const paramName = param.name.toLowerCase().replace(/\s+/g, "_");
					const paramValue = param.value;
					if (param.unit && param.unit.conversion_factor) result[paramName] = paramValue * param.unit.conversion_factor;
					else if (param.unit === "degree") result[paramName] = paramValue * Math.PI / 180;
					else result[paramName] = paramValue;
				});
				break;
			case "unit":
				if (value.name) {
					result.units = value.name.toLowerCase();
					if (result.units === "metre") result.units = "meter";
				}
				if (value.conversion_factor) result.to_meter = value.conversion_factor;
				break;
			case "base_crs":
				transformPROJJSON(value, result);
				result.datumCode = value.id ? value.id.authority + "_" + value.id.code : value.name;
				break;
			default: break;
		}
	});
	if (result.latitude_of_false_origin !== void 0) result.lat0 = result.latitude_of_false_origin;
	if (result.longitude_of_false_origin !== void 0) result.long0 = result.longitude_of_false_origin;
	if (result.latitude_of_standard_parallel !== void 0) {
		result.lat0 = result.latitude_of_standard_parallel;
		result.lat1 = result.latitude_of_standard_parallel;
	}
	if (result.latitude_of_1st_standard_parallel !== void 0) result.lat1 = result.latitude_of_1st_standard_parallel;
	if (result.latitude_of_2nd_standard_parallel !== void 0) result.lat2 = result.latitude_of_2nd_standard_parallel;
	if (result.latitude_of_projection_centre !== void 0) result.lat0 = result.latitude_of_projection_centre;
	if (result.longitude_of_projection_centre !== void 0) result.longc = result.longitude_of_projection_centre;
	if (result.easting_at_false_origin !== void 0) result.x0 = result.easting_at_false_origin;
	if (result.northing_at_false_origin !== void 0) result.y0 = result.northing_at_false_origin;
	if (result.latitude_of_natural_origin !== void 0) result.lat0 = result.latitude_of_natural_origin;
	if (result.longitude_of_natural_origin !== void 0) result.long0 = result.longitude_of_natural_origin;
	if (result.longitude_of_origin !== void 0) result.long0 = result.longitude_of_origin;
	if (result.false_easting !== void 0) result.x0 = result.false_easting;
	if (result.easting_at_projection_centre) result.x0 = result.easting_at_projection_centre;
	if (result.false_northing !== void 0) result.y0 = result.false_northing;
	if (result.northing_at_projection_centre) result.y0 = result.northing_at_projection_centre;
	if (result.standard_parallel_1 !== void 0) result.lat1 = result.standard_parallel_1;
	if (result.standard_parallel_2 !== void 0) result.lat2 = result.standard_parallel_2;
	if (result.scale_factor_at_natural_origin !== void 0) result.k0 = result.scale_factor_at_natural_origin;
	if (result.scale_factor_at_projection_centre !== void 0) result.k0 = result.scale_factor_at_projection_centre;
	if (result.scale_factor_on_pseudo_standard_parallel !== void 0) result.k0 = result.scale_factor_on_pseudo_standard_parallel;
	if (result.azimuth !== void 0) result.alpha = result.azimuth;
	if (result.azimuth_at_projection_centre !== void 0) result.alpha = result.azimuth_at_projection_centre;
	if (result.angle_from_rectified_to_skew_grid) result.rectified_grid_angle = result.angle_from_rectified_to_skew_grid;
	applyProjectionDefaults(result);
	return result;
}
//#endregion
//#region node_modules/wkt-parser/index.js
var knownTypes = [
	"PROJECTEDCRS",
	"PROJCRS",
	"GEOGCS",
	"GEOCCS",
	"PROJCS",
	"LOCAL_CS",
	"GEODCRS",
	"GEODETICCRS",
	"GEODETICDATUM",
	"ENGCRS",
	"ENGINEERINGCRS"
];
function rename(obj, params) {
	var outName = params[0];
	var inName = params[1];
	if (!(outName in obj) && inName in obj) {
		obj[outName] = obj[inName];
		if (params.length === 3) obj[outName] = params[2](obj[outName]);
	}
}
function cleanWKT(wkt) {
	var keys = Object.keys(wkt);
	for (var i = 0, ii = keys.length; i < ii; ++i) {
		var key = keys[i];
		if (knownTypes.indexOf(key) !== -1) setPropertiesFromWkt(wkt[key]);
		if (typeof wkt[key] === "object") cleanWKT(wkt[key]);
	}
}
function setPropertiesFromWkt(wkt) {
	if (wkt.AUTHORITY) {
		var authority = Object.keys(wkt.AUTHORITY)[0];
		if (authority && authority in wkt.AUTHORITY) wkt.title = authority + ":" + wkt.AUTHORITY[authority];
	}
	if (wkt.type === "GEOGCS") wkt.projName = "longlat";
	else if (wkt.type === "LOCAL_CS") {
		wkt.projName = "identity";
		wkt.local = true;
	} else if (typeof wkt.PROJECTION === "object") wkt.projName = Object.keys(wkt.PROJECTION)[0];
	else wkt.projName = wkt.PROJECTION;
	if (wkt.AXIS) {
		var axisOrder = "";
		for (var i = 0, ii = wkt.AXIS.length; i < ii; ++i) {
			var axis = [wkt.AXIS[i][0].toLowerCase(), wkt.AXIS[i][1].toLowerCase()];
			if (axis[0].indexOf("north") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "north") axisOrder += "n";
			else if (axis[0].indexOf("south") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "south") axisOrder += "s";
			else if (axis[0].indexOf("east") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "east") axisOrder += "e";
			else if (axis[0].indexOf("west") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "west") axisOrder += "w";
		}
		if (axisOrder.length === 2) axisOrder += "u";
		if (axisOrder.length === 3) wkt.axis = axisOrder;
	}
	if (wkt.UNIT) {
		wkt.units = wkt.UNIT.name.toLowerCase();
		if (wkt.units === "metre") wkt.units = "meter";
		if (wkt.UNIT.convert) if (wkt.type === "GEOGCS") {
			if (wkt.DATUM && wkt.DATUM.SPHEROID) wkt.to_meter = wkt.UNIT.convert * wkt.DATUM.SPHEROID.a;
		} else wkt.to_meter = wkt.UNIT.convert;
	}
	var geogcs = wkt.GEOGCS;
	if (wkt.type === "GEOGCS") geogcs = wkt;
	if (geogcs) {
		if (geogcs.PRIMEM && geogcs.PRIMEM.convert) wkt.from_greenwich = d2r(geogcs.PRIMEM.convert);
		if (geogcs.DATUM) wkt.datumCode = geogcs.DATUM.name.toLowerCase();
		else wkt.datumCode = geogcs.name.toLowerCase();
		if (wkt.datumCode.slice(0, 2) === "d_") wkt.datumCode = wkt.datumCode.slice(2);
		if (wkt.datumCode === "new_zealand_1949") wkt.datumCode = "nzgd49";
		if (wkt.datumCode === "wgs_1984" || wkt.datumCode === "world_geodetic_system_1984") {
			if (wkt.PROJECTION === "Mercator_Auxiliary_Sphere") wkt.sphere = true;
			wkt.datumCode = "wgs84";
		}
		if (wkt.datumCode === "belge_1972") wkt.datumCode = "rnb72";
		if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
			wkt.ellps = geogcs.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk");
			if (wkt.ellps.toLowerCase().slice(0, 13) === "international") wkt.ellps = "intl";
			wkt.a = geogcs.DATUM.SPHEROID.a;
			wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf);
		}
		if (geogcs.DATUM && geogcs.DATUM.TOWGS84) wkt.datum_params = geogcs.DATUM.TOWGS84;
		if (~wkt.datumCode.indexOf("osgb_1936")) wkt.datumCode = "osgb36";
		if (~wkt.datumCode.indexOf("osni_1952")) wkt.datumCode = "osni52";
		if (~wkt.datumCode.indexOf("tm65") || ~wkt.datumCode.indexOf("geodetic_datum_of_1965")) wkt.datumCode = "ire65";
		if (wkt.datumCode === "ch1903+") wkt.datumCode = "ch1903";
		if (~wkt.datumCode.indexOf("israel")) wkt.datumCode = "isr93";
	}
	if (wkt.b && !isFinite(wkt.b)) wkt.b = wkt.a;
	if (wkt.rectified_grid_angle) wkt.rectified_grid_angle = d2r(wkt.rectified_grid_angle);
	function toMeter(input) {
		return input * (wkt.to_meter || 1);
	}
	var renamer = function(a) {
		return rename(wkt, a);
	};
	[
		["standard_parallel_1", "Standard_Parallel_1"],
		["standard_parallel_1", "Latitude of 1st standard parallel"],
		["standard_parallel_2", "Standard_Parallel_2"],
		["standard_parallel_2", "Latitude of 2nd standard parallel"],
		["false_easting", "False_Easting"],
		["false_easting", "False easting"],
		["false-easting", "Easting at false origin"],
		["false_northing", "False_Northing"],
		["false_northing", "False northing"],
		["false_northing", "Northing at false origin"],
		["central_meridian", "Central_Meridian"],
		["central_meridian", "Longitude of natural origin"],
		["central_meridian", "Longitude of false origin"],
		["latitude_of_origin", "Latitude_Of_Origin"],
		["latitude_of_origin", "Central_Parallel"],
		["latitude_of_origin", "Latitude of natural origin"],
		["latitude_of_origin", "Latitude of false origin"],
		["scale_factor", "Scale_Factor"],
		["k0", "scale_factor"],
		["latitude_of_center", "Latitude_Of_Center"],
		["latitude_of_center", "Latitude_of_center"],
		[
			"lat0",
			"latitude_of_center",
			d2r
		],
		["longitude_of_center", "Longitude_Of_Center"],
		["longitude_of_center", "Longitude_of_center"],
		[
			"longc",
			"longitude_of_center",
			d2r
		],
		[
			"x0",
			"false_easting",
			toMeter
		],
		[
			"y0",
			"false_northing",
			toMeter
		],
		[
			"long0",
			"central_meridian",
			d2r
		],
		[
			"lat0",
			"latitude_of_origin",
			d2r
		],
		[
			"lat0",
			"standard_parallel_1",
			d2r
		],
		[
			"lat1",
			"standard_parallel_1",
			d2r
		],
		[
			"lat2",
			"standard_parallel_2",
			d2r
		],
		["azimuth", "Azimuth"],
		[
			"alpha",
			"azimuth",
			d2r
		],
		["srsCode", "name"]
	].forEach(renamer);
	applyProjectionDefaults(wkt);
}
function wkt_parser_default(wkt) {
	if (typeof wkt === "object") return transformPROJJSON(wkt);
	const version = detectWKTVersion(wkt);
	var lisp = parser_default(wkt);
	if (version === "WKT2") return transformPROJJSON(buildPROJJSON(lisp));
	var type = lisp[0];
	var obj = {};
	sExpr(lisp, obj);
	cleanWKT(obj);
	return obj[type];
}
//#endregion
//#region node_modules/proj4/lib/defs.js
/**
* @typedef {Object} ProjectionDefinition
* @property {string} title
* @property {string} [projName]
* @property {string} [ellps]
* @property {import('./Proj.js').DatumDefinition} [datum]
* @property {string} [datumName]
* @property {number} [rf]
* @property {number} [lat0]
* @property {number} [lat1]
* @property {number} [lat2]
* @property {number} [lat_ts]
* @property {number} [long0]
* @property {number} [long1]
* @property {number} [long2]
* @property {number} [alpha]
* @property {number} [longc]
* @property {number} [x0]
* @property {number} [y0]
* @property {number} [k0]
* @property {number} [a]
* @property {number} [b]
* @property {true} [R_A]
* @property {number} [zone]
* @property {true} [utmSouth]
* @property {string|Array<number>} [datum_params]
* @property {number} [to_meter]
* @property {string} [units]
* @property {number} [from_greenwich]
* @property {string} [datumCode]
* @property {string} [nadgrids]
* @property {string} [axis]
* @property {boolean} [sphere]
* @property {number} [rectified_grid_angle]
* @property {boolean} [approx]
* @property {boolean} [over]
* @property {string} [projStr]
* @property {<T extends import('./core').TemplateCoordinates>(coordinates: T, enforceAxis?: boolean) => T} inverse
* @property {<T extends import('./core').TemplateCoordinates>(coordinates: T, enforceAxis?: boolean) => T} forward
*/
/**
* @overload
* @param {string} name
* @param {string|ProjectionDefinition|import('./core.js').PROJJSONDefinition} projection
* @returns {void}
*/
/**
* @overload
* @param {Array<[string, string]>} name
* @returns {Array<ProjectionDefinition|undefined>}
*/
/**
* @overload
* @param {string} name
* @returns {ProjectionDefinition}
*/
/**
* @param {string | Array<Array<string>> | Partial<Record<'EPSG'|'ESRI'|'IAU2000', ProjectionDefinition>>} name
* @returns {ProjectionDefinition | Array<ProjectionDefinition|undefined> | void}
*/
function defs(name) {
	var that = this;
	if (arguments.length === 2) {
		var def = arguments[1];
		if (typeof def === "string") if (def.charAt(0) === "+") defs[name] = projString_default(arguments[1]);
		else defs[name] = wkt_parser_default(arguments[1]);
		else if (def && typeof def === "object" && !("projName" in def)) defs[name] = wkt_parser_default(arguments[1]);
		else {
			defs[name] = def;
			if (!def) delete defs[name];
		}
	} else if (arguments.length === 1) {
		if (Array.isArray(name)) return name.map(function(v) {
			if (Array.isArray(v)) return defs.apply(that, v);
			else return defs(v);
		});
		else if (typeof name === "string") {
			if (name in defs) return defs[name];
		} else if ("EPSG" in name) defs["EPSG:" + name.EPSG] = name;
		else if ("ESRI" in name) defs["ESRI:" + name.ESRI] = name;
		else if ("IAU2000" in name) defs["IAU2000:" + name.IAU2000] = name;
		else console.log(name);
		return;
	}
}
global_default(defs);
//#endregion
//#region node_modules/proj4/lib/parseCode.js
function testObj(code) {
	return typeof code === "string";
}
function testDef(code) {
	return code in defs;
}
function testWKT(code) {
	return code.indexOf("+") !== 0 && code.indexOf("[") !== -1 || typeof code === "object" && !("srsCode" in code);
}
var codes = [
	"3857",
	"900913",
	"3785",
	"102113"
];
function checkMercator(item) {
	if (item.title) return item.title.toLowerCase().indexOf("epsg:") === 0 && codes.indexOf(item.title.substr(5)) > -1;
	var auth = match(item, "authority");
	if (!auth) return;
	var code = match(auth, "epsg");
	return code && codes.indexOf(code) > -1;
}
function checkProjStr(item) {
	var ext = match(item, "extension");
	if (!ext) return;
	return match(ext, "proj4");
}
function testProj(code) {
	return code[0] === "+";
}
/**
* @param {string | import('./core').PROJJSONDefinition | import('./defs').ProjectionDefinition} code
* @returns {import('./defs').ProjectionDefinition}
*/
function parse(code) {
	let out;
	if (testObj(code)) {
		if (testDef(code)) out = defs[code];
		else if (testWKT(code)) {
			out = wkt_parser_default(code);
			var maybeProjStr = checkProjStr(out);
			if (maybeProjStr) out = projString_default(maybeProjStr);
		} else if (testProj(code)) out = projString_default(code);
	} else if (!("projName" in code)) out = wkt_parser_default(code);
	else out = code;
	return out && checkMercator(out) ? defs["EPSG:3857"] : out;
}
//#endregion
//#region node_modules/proj4/lib/extend.js
function extend_default(destination, source) {
	destination = destination || {};
	var value, property;
	if (!source) return destination;
	for (property in source) {
		value = source[property];
		if (value !== void 0) destination[property] = value;
	}
	return destination;
}
//#endregion
//#region node_modules/proj4/lib/common/msfnz.js
function msfnz_default(eccent, sinphi, cosphi) {
	var con = eccent * sinphi;
	return cosphi / Math.sqrt(1 - con * con);
}
//#endregion
//#region node_modules/proj4/lib/common/sign.js
function sign_default(x) {
	return x < 0 ? -1 : 1;
}
//#endregion
//#region node_modules/proj4/lib/common/adjust_lon.js
function adjust_lon_default(x, skipAdjust) {
	if (skipAdjust) return x;
	return Math.abs(x) <= 3.14159265359 ? x : x - sign_default(x) * TWO_PI;
}
//#endregion
//#region node_modules/proj4/lib/common/tsfnz.js
function tsfnz_default(eccent, phi, sinphi) {
	var con = eccent * sinphi;
	var com = .5 * eccent;
	con = Math.pow((1 - con) / (1 + con), com);
	return Math.tan(.5 * (HALF_PI - phi)) / con;
}
//#endregion
//#region node_modules/proj4/lib/common/phi2z.js
function phi2z_default(eccent, ts) {
	var eccnth = .5 * eccent;
	var con, dphi;
	var phi = HALF_PI - 2 * Math.atan(ts);
	for (var i = 0; i <= 15; i++) {
		con = eccent * Math.sin(phi);
		dphi = HALF_PI - 2 * Math.atan(ts * Math.pow((1 - con) / (1 + con), eccnth)) - phi;
		phi += dphi;
		if (Math.abs(dphi) <= 1e-10) return phi;
	}
	return -9999;
}
//#endregion
//#region node_modules/proj4/lib/projections/merc.js
/**
* @typedef {Object} LocalThis
* @property {number} es
* @property {number} e
* @property {number} k
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$34() {
	var con = this.b / this.a;
	this.es = 1 - con * con;
	if (!("x0" in this)) this.x0 = 0;
	if (!("y0" in this)) this.y0 = 0;
	this.e = Math.sqrt(this.es);
	if (this.lat_ts) if (this.sphere) this.k0 = Math.cos(this.lat_ts);
	else this.k0 = msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
	else if (!this.k0) if (this.k) this.k0 = this.k;
	else this.k0 = 1;
}
function forward$32(p) {
	var lon = p.x;
	var lat = p.y;
	if (lat * 57.29577951308232 > 90 && lat * 57.29577951308232 < -90 && lon * 57.29577951308232 > 180 && lon * 57.29577951308232 < -180) return null;
	var x, y;
	if (Math.abs(Math.abs(lat) - HALF_PI) <= 1e-10) return null;
	else {
		if (this.sphere) {
			x = this.x0 + this.a * this.k0 * adjust_lon_default(lon - this.long0, this.over);
			y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + .5 * lat));
		} else {
			var sinphi = Math.sin(lat);
			var ts = tsfnz_default(this.e, lat, sinphi);
			x = this.x0 + this.a * this.k0 * adjust_lon_default(lon - this.long0, this.over);
			y = this.y0 - this.a * this.k0 * Math.log(ts);
		}
		p.x = x;
		p.y = y;
		return p;
	}
}
function inverse$32(p) {
	var x = p.x - this.x0;
	var y = p.y - this.y0;
	var lon, lat;
	if (this.sphere) lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
	else {
		var ts = Math.exp(-y / (this.a * this.k0));
		lat = phi2z_default(this.e, ts);
		if (lat === -9999) return null;
	}
	lon = adjust_lon_default(this.long0 + x / (this.a * this.k0), this.over);
	p.x = lon;
	p.y = lat;
	return p;
}
var merc_default = {
	init: init$34,
	forward: forward$32,
	inverse: inverse$32,
	names: [
		"Mercator",
		"Popular Visualisation Pseudo Mercator",
		"Mercator_1SP",
		"Mercator_Auxiliary_Sphere",
		"Mercator_Variant_A",
		"merc"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/longlat.js
function init$33() {}
function identity(pt) {
	return pt;
}
var names$34 = ["longlat", "identity"];
//#endregion
//#region node_modules/proj4/lib/projections.js
/** @type {Array<Partial<import('./Proj').default>>} */
var projs = [merc_default, {
	init: init$33,
	forward: identity,
	inverse: identity,
	names: names$34
}];
var names$33 = {};
var projStore = [];
/**
* @param {import('./Proj').default} proj
* @param {number} i
*/
function add(proj, i) {
	var len = projStore.length;
	if (!proj.names) {
		console.log(i);
		return true;
	}
	projStore[len] = proj;
	proj.names.forEach(function(n) {
		names$33[n.toLowerCase()] = len;
	});
	return this;
}
function getNormalizedProjName(n) {
	return n.replace(/[-\(\)\s]+/g, " ").trim().replace(/ /g, "_");
}
/**
* Get a projection by name.
* @param {string} name
* @returns {import('./Proj').default|false}
*/
function get(name) {
	if (!name) return false;
	var n = name.toLowerCase();
	if (typeof names$33[n] !== "undefined" && projStore[names$33[n]]) return projStore[names$33[n]];
	n = getNormalizedProjName(n);
	if (n in names$33 && projStore[names$33[n]]) return projStore[names$33[n]];
}
function start() {
	projs.forEach(add);
}
var projections_default = {
	start,
	add,
	get
};
//#endregion
//#region node_modules/proj4/lib/constants/Ellipsoid.js
var ellipsoids = {
	MERIT: {
		a: 6378137,
		rf: 298.257,
		ellipseName: "MERIT 1983"
	},
	SGS85: {
		a: 6378136,
		rf: 298.257,
		ellipseName: "Soviet Geodetic System 85"
	},
	GRS80: {
		a: 6378137,
		rf: 298.257222101,
		ellipseName: "GRS 1980(IUGG, 1980)"
	},
	IAU76: {
		a: 6378140,
		rf: 298.257,
		ellipseName: "IAU 1976"
	},
	airy: {
		a: 6377563.396,
		b: 6356256.91,
		ellipseName: "Airy 1830"
	},
	APL4: {
		a: 6378137,
		rf: 298.25,
		ellipseName: "Appl. Physics. 1965"
	},
	NWL9D: {
		a: 6378145,
		rf: 298.25,
		ellipseName: "Naval Weapons Lab., 1965"
	},
	mod_airy: {
		a: 6377340.189,
		b: 6356034.446,
		ellipseName: "Modified Airy"
	},
	andrae: {
		a: 6377104.43,
		rf: 300,
		ellipseName: "Andrae 1876 (Den., Iclnd.)"
	},
	aust_SA: {
		a: 6378160,
		rf: 298.25,
		ellipseName: "Australian Natl & S. Amer. 1969"
	},
	GRS67: {
		a: 6378160,
		rf: 298.247167427,
		ellipseName: "GRS 67(IUGG 1967)"
	},
	bessel: {
		a: 6377397.155,
		rf: 299.1528128,
		ellipseName: "Bessel 1841"
	},
	bess_nam: {
		a: 6377483.865,
		rf: 299.1528128,
		ellipseName: "Bessel 1841 (Namibia)"
	},
	clrk66: {
		a: 6378206.4,
		b: 6356583.8,
		ellipseName: "Clarke 1866"
	},
	clrk80: {
		a: 6378249.145,
		rf: 293.4663,
		ellipseName: "Clarke 1880 mod."
	},
	clrk80ign: {
		a: 6378249.2,
		b: 6356515,
		rf: 293.4660213,
		ellipseName: "Clarke 1880 (IGN)"
	},
	clrk58: {
		a: 6378293.645208759,
		rf: 294.2606763692654,
		ellipseName: "Clarke 1858"
	},
	CPM: {
		a: 6375738.7,
		rf: 334.29,
		ellipseName: "Comm. des Poids et Mesures 1799"
	},
	delmbr: {
		a: 6376428,
		rf: 311.5,
		ellipseName: "Delambre 1810 (Belgium)"
	},
	engelis: {
		a: 6378136.05,
		rf: 298.2566,
		ellipseName: "Engelis 1985"
	},
	evrst30: {
		a: 6377276.345,
		rf: 300.8017,
		ellipseName: "Everest 1830"
	},
	evrst48: {
		a: 6377304.063,
		rf: 300.8017,
		ellipseName: "Everest 1948"
	},
	evrst56: {
		a: 6377301.243,
		rf: 300.8017,
		ellipseName: "Everest 1956"
	},
	evrst69: {
		a: 6377295.664,
		rf: 300.8017,
		ellipseName: "Everest 1969"
	},
	evrstSS: {
		a: 6377298.556,
		rf: 300.8017,
		ellipseName: "Everest (Sabah & Sarawak)"
	},
	fschr60: {
		a: 6378166,
		rf: 298.3,
		ellipseName: "Fischer (Mercury Datum) 1960"
	},
	fschr60m: {
		a: 6378155,
		rf: 298.3,
		ellipseName: "Fischer 1960"
	},
	fschr68: {
		a: 6378150,
		rf: 298.3,
		ellipseName: "Fischer 1968"
	},
	helmert: {
		a: 6378200,
		rf: 298.3,
		ellipseName: "Helmert 1906"
	},
	hough: {
		a: 6378270,
		rf: 297,
		ellipseName: "Hough"
	},
	intl: {
		a: 6378388,
		rf: 297,
		ellipseName: "International 1909 (Hayford)"
	},
	kaula: {
		a: 6378163,
		rf: 298.24,
		ellipseName: "Kaula 1961"
	},
	lerch: {
		a: 6378139,
		rf: 298.257,
		ellipseName: "Lerch 1979"
	},
	mprts: {
		a: 6397300,
		rf: 191,
		ellipseName: "Maupertius 1738"
	},
	new_intl: {
		a: 6378157.5,
		b: 6356772.2,
		ellipseName: "New International 1967"
	},
	plessis: {
		a: 6376523,
		rf: 6355863,
		ellipseName: "Plessis 1817 (France)"
	},
	krass: {
		a: 6378245,
		rf: 298.3,
		ellipseName: "Krassovsky, 1942"
	},
	SEasia: {
		a: 6378155,
		b: 6356773.3205,
		ellipseName: "Southeast Asia"
	},
	walbeck: {
		a: 6376896,
		b: 6355834.8467,
		ellipseName: "Walbeck"
	},
	WGS60: {
		a: 6378165,
		rf: 298.3,
		ellipseName: "WGS 60"
	},
	WGS66: {
		a: 6378145,
		rf: 298.25,
		ellipseName: "WGS 66"
	},
	WGS7: {
		a: 6378135,
		rf: 298.26,
		ellipseName: "WGS 72"
	},
	WGS84: {
		a: 6378137,
		rf: 298.257223563,
		ellipseName: "WGS 84"
	},
	sphere: {
		a: 6370997,
		b: 6370997,
		ellipseName: "Normal Sphere (r=6370997)"
	}
};
//#endregion
//#region node_modules/proj4/lib/deriveConstants.js
var WGS84 = ellipsoids.WGS84;
function eccentricity(a, b, rf, R_A) {
	var a2 = a * a;
	var b2 = b * b;
	var es = (a2 - b2) / a2;
	var e = 0;
	if (R_A) {
		a *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
		a2 = a * a;
		es = 0;
	} else e = Math.sqrt(es);
	var ep2 = (a2 - b2) / b2;
	return {
		es,
		e,
		ep2
	};
}
function sphere(a, b, rf, ellps, sphere) {
	if (!a) {
		var ellipse = match(ellipsoids, ellps);
		if (!ellipse) ellipse = WGS84;
		a = ellipse.a;
		b = ellipse.b;
		rf = ellipse.rf;
	}
	if (rf && !b) b = (1 - 1 / rf) * a;
	if (rf === 0 || Math.abs(a - b) < 1e-10) {
		sphere = true;
		b = a;
	}
	return {
		a,
		b,
		rf,
		sphere
	};
}
//#endregion
//#region node_modules/proj4/lib/constants/Datum.js
var datums = {
	wgs84: {
		towgs84: "0,0,0",
		ellipse: "WGS84",
		datumName: "WGS84"
	},
	ch1903: {
		towgs84: "674.374,15.056,405.346",
		ellipse: "bessel",
		datumName: "swiss"
	},
	ggrs87: {
		towgs84: "-199.87,74.79,246.62",
		ellipse: "GRS80",
		datumName: "Greek_Geodetic_Reference_System_1987"
	},
	nad83: {
		towgs84: "0,0,0",
		ellipse: "GRS80",
		datumName: "North_American_Datum_1983"
	},
	nad27: {
		nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
		ellipse: "clrk66",
		datumName: "North_American_Datum_1927"
	},
	potsdam: {
		towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
		ellipse: "bessel",
		datumName: "Potsdam Rauenberg 1950 DHDN"
	},
	carthage: {
		towgs84: "-263.0,6.0,431.0",
		ellipse: "clark80",
		datumName: "Carthage 1934 Tunisia"
	},
	hermannskogel: {
		towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
		ellipse: "bessel",
		datumName: "Hermannskogel"
	},
	mgi: {
		towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
		ellipse: "bessel",
		datumName: "Militar-Geographische Institut"
	},
	osni52: {
		towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
		ellipse: "airy",
		datumName: "Irish National"
	},
	ire65: {
		towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
		ellipse: "mod_airy",
		datumName: "Ireland 1965"
	},
	rassadiran: {
		towgs84: "-133.63,-157.5,-158.62",
		ellipse: "intl",
		datumName: "Rassadiran"
	},
	nzgd49: {
		towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
		ellipse: "intl",
		datumName: "New Zealand Geodetic Datum 1949"
	},
	osgb36: {
		towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
		ellipse: "airy",
		datumName: "Ordnance Survey of Great Britain 1936"
	},
	s_jtsk: {
		towgs84: "589,76,480",
		ellipse: "bessel",
		datumName: "S-JTSK (Ferro)"
	},
	beduaram: {
		towgs84: "-106,-87,188",
		ellipse: "clrk80",
		datumName: "Beduaram"
	},
	gunung_segara: {
		towgs84: "-403,684,41",
		ellipse: "bessel",
		datumName: "Gunung Segara Jakarta"
	},
	rnb72: {
		towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
		ellipse: "intl",
		datumName: "Reseau National Belge 1972"
	},
	EPSG_5451: { towgs84: "6.41,-49.05,-11.28,1.5657,0.5242,6.9718,-5.7649" },
	IGNF_LURESG: { towgs84: "-192.986,13.673,-39.309,-0.4099,-2.9332,2.6881,0.43" },
	EPSG_4614: { towgs84: "-119.4248,-303.65872,-11.00061,1.164298,0.174458,1.096259,3.657065" },
	EPSG_4615: { towgs84: "-494.088,-312.129,279.877,-1.423,-1.013,1.59,-0.748" },
	ESRI_37241: { towgs84: "-76.822,257.457,-12.817,2.136,-0.033,-2.392,-0.031" },
	ESRI_37249: { towgs84: "-440.296,58.548,296.265,1.128,10.202,4.559,-0.438" },
	ESRI_37245: { towgs84: "-511.151,-181.269,139.609,1.05,2.703,1.798,3.071" },
	EPSG_4178: { towgs84: "24.9,-126.4,-93.2,-0.063,-0.247,-0.041,1.01" },
	EPSG_4622: { towgs84: "-472.29,-5.63,-304.12,0.4362,-0.8374,0.2563,1.8984" },
	EPSG_4625: { towgs84: "126.93,547.94,130.41,-2.7867,5.1612,-0.8584,13.8227" },
	EPSG_5252: { towgs84: "0.023,0.036,-0.068,0.00176,0.00912,-0.01136,0.00439" },
	EPSG_4314: { towgs84: "597.1,71.4,412.1,0.894,0.068,-1.563,7.58" },
	EPSG_4282: { towgs84: "-178.3,-316.7,-131.5,5.278,6.077,10.979,19.166" },
	EPSG_4231: { towgs84: "-83.11,-97.38,-117.22,0.005693,-0.044698,0.044285,0.1218" },
	EPSG_4274: { towgs84: "-230.994,102.591,25.199,0.633,-0.239,0.9,1.95" },
	EPSG_4134: { towgs84: "-180.624,-225.516,173.919,-0.81,-1.898,8.336,16.71006" },
	EPSG_4254: { towgs84: "18.38,192.45,96.82,0.056,-0.142,-0.2,-0.0013" },
	EPSG_4159: { towgs84: "-194.513,-63.978,-25.759,-3.4027,3.756,-3.352,-0.9175" },
	EPSG_4687: { towgs84: "0.072,-0.507,-0.245,0.0183,-0.0003,0.007,-0.0093" },
	EPSG_4227: { towgs84: "-83.58,-397.54,458.78,-17.595,-2.847,4.256,3.225" },
	EPSG_4746: { towgs84: "599.4,72.4,419.2,-0.062,-0.022,-2.723,6.46" },
	EPSG_4745: { towgs84: "612.4,77,440.2,-0.054,0.057,-2.797,2.55" },
	EPSG_6311: { towgs84: "8.846,-4.394,-1.122,-0.00237,-0.146528,0.130428,0.783926" },
	EPSG_4289: { towgs84: "565.7381,50.4018,465.2904,-0.395026,0.330772,-1.876073,4.07244" },
	EPSG_4230: { towgs84: "-68.863,-134.888,-111.49,-0.53,-0.14,0.57,-3.4" },
	EPSG_4154: { towgs84: "-123.02,-158.95,-168.47" },
	EPSG_4156: { towgs84: "570.8,85.7,462.8,4.998,1.587,5.261,3.56" },
	EPSG_4299: { towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15" },
	EPSG_4179: { towgs84: "33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84" },
	EPSG_4313: { towgs84: "-106.8686,52.2978,-103.7239,0.3366,-0.457,1.8422,-1.2747" },
	EPSG_4194: { towgs84: "163.511,127.533,-159.789" },
	EPSG_4195: { towgs84: "105,326,-102.5" },
	EPSG_4196: { towgs84: "-45,417,-3.5" },
	EPSG_4611: { towgs84: "-162.619,-276.959,-161.764,0.067753,-2.243648,-1.158828,-1.094246" },
	EPSG_4633: { towgs84: "137.092,131.66,91.475,-1.9436,-11.5993,-4.3321,-7.4824" },
	EPSG_4641: { towgs84: "-408.809,366.856,-412.987,1.8842,-0.5308,2.1655,-121.0993" },
	EPSG_4643: { towgs84: "-480.26,-438.32,-643.429,16.3119,20.1721,-4.0349,-111.7002" },
	EPSG_4300: { towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15" },
	EPSG_4188: { towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15" },
	EPSG_4660: { towgs84: "982.6087,552.753,-540.873,6.681627,-31.611492,-19.848161,16.805" },
	EPSG_4662: { towgs84: "97.295,-263.247,310.882,-1.5999,0.8386,3.1409,13.3259" },
	EPSG_3906: { towgs84: "577.88891,165.22205,391.18289,4.9145,-0.94729,-13.05098,7.78664" },
	EPSG_4307: { towgs84: "-209.3622,-87.8162,404.6198,0.0046,3.4784,0.5805,-1.4547" },
	EPSG_6892: { towgs84: "-76.269,-16.683,68.562,-6.275,10.536,-4.286,-13.686" },
	EPSG_4690: { towgs84: "221.597,152.441,176.523,2.403,1.3893,0.884,11.4648" },
	EPSG_4691: { towgs84: "218.769,150.75,176.75,3.5231,2.0037,1.288,10.9817" },
	EPSG_4629: { towgs84: "72.51,345.411,79.241,-1.5862,-0.8826,-0.5495,1.3653" },
	EPSG_4630: { towgs84: "165.804,216.213,180.26,-0.6251,-0.4515,-0.0721,7.4111" },
	EPSG_4692: { towgs84: "217.109,86.452,23.711,0.0183,-0.0003,0.007,-0.0093" },
	EPSG_9333: { towgs84: "0,0,0,-0.008393,0.000749,-0.010276,0" },
	EPSG_9059: { towgs84: "0,0,0" },
	EPSG_4312: { towgs84: "601.705,84.263,485.227,4.7354,1.3145,5.393,-2.3887" },
	EPSG_4123: { towgs84: "-96.062,-82.428,-121.753,4.801,0.345,-1.376,1.496" },
	EPSG_4309: { towgs84: "-124.45,183.74,44.64,-0.4384,0.5446,-0.9706,-2.1365" },
	ESRI_104106: { towgs84: "-283.088,-70.693,117.445,-1.157,0.059,-0.652,-4.058" },
	EPSG_4281: { towgs84: "-219.247,-73.802,269.529" },
	EPSG_4322: { towgs84: "0,0,4.5" },
	EPSG_4324: { towgs84: "0,0,1.9" },
	EPSG_4284: { towgs84: "43.822,-108.842,-119.585,1.455,-0.761,0.737,0.549" },
	EPSG_4277: { towgs84: "446.448,-125.157,542.06,0.15,0.247,0.842,-20.489" },
	EPSG_4207: { towgs84: "-282.1,-72.2,120,-1.529,0.145,-0.89,-4.46" },
	EPSG_4688: { towgs84: "347.175,1077.618,2623.677,33.9058,-70.6776,9.4013,186.0647" },
	EPSG_4689: { towgs84: "410.793,54.542,80.501,-2.5596,-2.3517,-0.6594,17.3218" },
	EPSG_4720: { towgs84: "0,0,4.5" },
	EPSG_4273: { towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21" },
	EPSG_4240: { towgs84: "204.64,834.74,293.8" },
	EPSG_4817: { towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21" },
	ESRI_104131: { towgs84: "426.62,142.62,460.09,4.98,4.49,-12.42,-17.1" },
	EPSG_4265: { towgs84: "-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68" },
	EPSG_4263: { towgs84: "-111.92,-87.85,114.5,1.875,0.202,0.219,0.032" },
	EPSG_4298: { towgs84: "-689.5937,623.84046,-65.93566,-0.02331,1.17094,-0.80054,5.88536" },
	EPSG_4270: { towgs84: "-253.4392,-148.452,386.5267,0.15605,0.43,-0.1013,-0.0424" },
	EPSG_4229: { towgs84: "-121.8,98.1,-10.7" },
	EPSG_4220: { towgs84: "-55.5,-348,-229.2" },
	EPSG_4214: { towgs84: "12.646,-155.176,-80.863" },
	EPSG_4232: { towgs84: "-345,3,223" },
	EPSG_4238: { towgs84: "-1.977,-13.06,-9.993,0.364,0.254,0.689,-1.037" },
	EPSG_4168: { towgs84: "-170,33,326" },
	EPSG_4131: { towgs84: "199,931,318.9" },
	EPSG_4152: { towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0" },
	EPSG_5228: { towgs84: "572.213,85.334,461.94,4.9732,1.529,5.2484,3.5378" },
	EPSG_8351: { towgs84: "485.021,169.465,483.839,7.786342,4.397554,4.102655,0" },
	EPSG_4683: { towgs84: "-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06" },
	EPSG_4133: { towgs84: "0,0,0" },
	EPSG_7373: { towgs84: "0.819,-0.5762,-1.6446,-0.00378,-0.03317,0.00318,0.0693" },
	EPSG_9075: { towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0" },
	EPSG_9072: { towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0" },
	EPSG_9294: { towgs84: "1.16835,-1.42001,-2.24431,-0.00822,-0.05508,0.01818,0.23388" },
	EPSG_4212: { towgs84: "-267.434,173.496,181.814,-13.4704,8.7154,7.3926,14.7492" },
	EPSG_4191: { towgs84: "-44.183,-0.58,-38.489,2.3867,2.7072,-3.5196,-8.2703" },
	EPSG_4237: { towgs84: "52.684,-71.194,-13.975,-0.312,-0.1063,-0.3729,1.0191" },
	EPSG_4740: { towgs84: "-1.08,-0.27,-0.9" },
	EPSG_4124: { towgs84: "419.3836,99.3335,591.3451,0.850389,1.817277,-7.862238,-0.99496" },
	EPSG_5681: { towgs84: "584.9636,107.7175,413.8067,1.1155,0.2824,-3.1384,7.9922" },
	EPSG_4141: { towgs84: "23.772,17.49,17.859,-0.3132,-1.85274,1.67299,-5.4262" },
	EPSG_4204: { towgs84: "-85.645,-273.077,-79.708,2.289,-1.421,2.532,3.194" },
	EPSG_4319: { towgs84: "226.702,-193.337,-35.371,-2.229,-4.391,9.238,0.9798" },
	EPSG_4200: { towgs84: "24.82,-131.21,-82.66" },
	EPSG_4130: { towgs84: "0,0,0" },
	EPSG_4127: { towgs84: "-82.875,-57.097,-156.768,-2.158,1.524,-0.982,-0.359" },
	EPSG_4149: { towgs84: "674.374,15.056,405.346" },
	EPSG_4617: { towgs84: "-0.991,1.9072,0.5129,0.02579,0.00965,0.01166,0" },
	EPSG_4663: { towgs84: "-210.502,-66.902,-48.476,2.094,-15.067,-5.817,0.485" },
	EPSG_4664: { towgs84: "-211.939,137.626,58.3,-0.089,0.251,0.079,0.384" },
	EPSG_4665: { towgs84: "-105.854,165.589,-38.312,-0.003,-0.026,0.024,-0.048" },
	EPSG_4666: { towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43" },
	EPSG_4756: { towgs84: "-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188" },
	EPSG_4723: { towgs84: "-179.483,-69.379,-27.584,-7.862,8.163,6.042,-13.925" },
	EPSG_4726: { towgs84: "8.853,-52.644,180.304,-0.393,-2.323,2.96,-24.081" },
	EPSG_4267: { towgs84: "-8.0,160.0,176.0" },
	EPSG_5365: { towgs84: "-0.16959,0.35312,0.51846,0.03385,-0.16325,0.03446,0.03693" },
	EPSG_4218: { towgs84: "304.5,306.5,-318.1" },
	EPSG_4242: { towgs84: "-33.722,153.789,94.959,-8.581,-4.478,4.54,8.95" },
	EPSG_4216: { towgs84: "-292.295,248.758,429.447,4.9971,2.99,6.6906,1.0289" },
	ESRI_104105: { towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43" },
	ESRI_104129: { towgs84: "0,0,0" },
	EPSG_4673: { towgs84: "174.05,-25.49,112.57" },
	EPSG_4202: { towgs84: "-124,-60,154" },
	EPSG_4203: { towgs84: "-117.763,-51.51,139.061,0.292,0.443,0.277,-0.191" },
	EPSG_3819: { towgs84: "595.48,121.69,515.35,4.115,-2.9383,0.853,-3.408" },
	EPSG_8694: { towgs84: "-93.799,-132.737,-219.073,-1.844,0.648,-6.37,-0.169" },
	EPSG_4145: { towgs84: "275.57,676.78,229.6" },
	EPSG_4283: { towgs84: "0.06155,-0.01087,-0.04019,0.039492,0.032722,0.032898,-0.009994" },
	EPSG_4317: { towgs84: "2.3287,-147.0425,-92.0802,-0.309248,0.324822,0.497299,5.689063" },
	EPSG_4272: { towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993" },
	EPSG_4248: { towgs84: "-307.7,265.3,-363.5" },
	EPSG_5561: { towgs84: "24,-121,-76" },
	EPSG_5233: { towgs84: "-0.293,766.95,87.713,0.195704,1.695068,3.473016,-0.039338" },
	ESRI_104130: { towgs84: "-86,-98,-119" },
	ESRI_104102: { towgs84: "682,-203,480" },
	ESRI_37207: { towgs84: "7,-10,-26" },
	EPSG_4675: { towgs84: "59.935,118.4,-10.871" },
	ESRI_104109: { towgs84: "-89.121,-348.182,260.871" },
	ESRI_104112: { towgs84: "-185.583,-230.096,281.361" },
	ESRI_104113: { towgs84: "25.1,-275.6,222.6" },
	IGNF_WGS72G: { towgs84: "0,12,6" },
	IGNF_NTFG: { towgs84: "-168,-60,320" },
	IGNF_EFATE57G: { towgs84: "-127,-769,472" },
	IGNF_PGP50G: { towgs84: "324.8,153.6,172.1" },
	IGNF_REUN47G: { towgs84: "94,-948,-1262" },
	IGNF_CSG67G: { towgs84: "-186,230,110" },
	IGNF_GUAD48G: { towgs84: "-467,-16,-300" },
	IGNF_TAHI51G: { towgs84: "162,117,154" },
	IGNF_TAHAAG: { towgs84: "65,342,77" },
	IGNF_NUKU72G: { towgs84: "84,274,65" },
	IGNF_PETRELS72G: { towgs84: "365,194,166" },
	IGNF_WALL78G: { towgs84: "253,-133,-127" },
	IGNF_MAYO50G: { towgs84: "-382,-59,-262" },
	IGNF_TANNAG: { towgs84: "-139,-967,436" },
	IGNF_IGN72G: { towgs84: "-13,-348,292" },
	IGNF_ATIGG: { towgs84: "1118,23,66" },
	IGNF_FANGA84G: { towgs84: "150.57,158.33,118.32" },
	IGNF_RUSAT84G: { towgs84: "202.13,174.6,-15.74" },
	IGNF_KAUE70G: { towgs84: "126.74,300.1,-75.49" },
	IGNF_MOP90G: { towgs84: "-10.8,-1.8,12.77" },
	IGNF_MHPF67G: { towgs84: "338.08,212.58,-296.17" },
	IGNF_TAHI79G: { towgs84: "160.61,116.05,153.69" },
	IGNF_ANAA92G: { towgs84: "1.5,3.84,4.81" },
	IGNF_MARQUI72G: { towgs84: "330.91,-13.92,58.56" },
	IGNF_APAT86G: { towgs84: "143.6,197.82,74.05" },
	IGNF_TUBU69G: { towgs84: "237.17,171.61,-77.84" },
	IGNF_STPM50G: { towgs84: "11.363,424.148,373.13" },
	EPSG_4150: { towgs84: "674.374,15.056,405.346" },
	EPSG_4754: { towgs84: "-208.4058,-109.8777,-2.5764" },
	ESRI_104101: { towgs84: "372.87,149.23,585.29" },
	EPSG_4693: { towgs84: "0,-0.15,0.68" },
	EPSG_6207: { towgs84: "293.17,726.18,245.36" },
	EPSG_4153: { towgs84: "-133.63,-157.5,-158.62" },
	EPSG_4132: { towgs84: "-241.54,-163.64,396.06" },
	EPSG_4221: { towgs84: "-154.5,150.7,100.4" },
	EPSG_4266: { towgs84: "-80.7,-132.5,41.1" },
	EPSG_4193: { towgs84: "-70.9,-151.8,-41.4" },
	EPSG_5340: { towgs84: "-0.41,0.46,-0.35" },
	EPSG_4246: { towgs84: "-294.7,-200.1,525.5" },
	EPSG_4318: { towgs84: "-3.2,-5.7,2.8" },
	EPSG_4121: { towgs84: "-199.87,74.79,246.62" },
	EPSG_4223: { towgs84: "-260.1,5.5,432.2" },
	EPSG_4158: { towgs84: "-0.465,372.095,171.736" },
	EPSG_4285: { towgs84: "-128.16,-282.42,21.93" },
	EPSG_4613: { towgs84: "-404.78,685.68,45.47" },
	EPSG_4607: { towgs84: "195.671,332.517,274.607" },
	EPSG_4475: { towgs84: "-381.788,-57.501,-256.673" },
	EPSG_4208: { towgs84: "-157.84,308.54,-146.6" },
	EPSG_4743: { towgs84: "70.995,-335.916,262.898" },
	EPSG_4710: { towgs84: "-323.65,551.39,-491.22" },
	EPSG_7881: { towgs84: "-0.077,0.079,0.086" },
	EPSG_4682: { towgs84: "283.729,735.942,261.143" },
	EPSG_4739: { towgs84: "-156,-271,-189" },
	EPSG_4679: { towgs84: "-80.01,253.26,291.19" },
	EPSG_4750: { towgs84: "-56.263,16.136,-22.856" },
	EPSG_4644: { towgs84: "-10.18,-350.43,291.37" },
	EPSG_4695: { towgs84: "-103.746,-9.614,-255.95" },
	EPSG_4292: { towgs84: "-355,21,72" },
	EPSG_4302: { towgs84: "-61.702,284.488,472.052" },
	EPSG_4143: { towgs84: "-124.76,53,466.79" },
	EPSG_4606: { towgs84: "-153,153,307" },
	EPSG_4699: { towgs84: "-770.1,158.4,-498.2" },
	EPSG_4247: { towgs84: "-273.5,110.6,-357.9" },
	EPSG_4160: { towgs84: "8.88,184.86,106.69" },
	EPSG_4161: { towgs84: "-233.43,6.65,173.64" },
	EPSG_9251: { towgs84: "-9.5,122.9,138.2" },
	EPSG_9253: { towgs84: "-78.1,101.6,133.3" },
	EPSG_4297: { towgs84: "-198.383,-240.517,-107.909" },
	EPSG_4269: { towgs84: "0,0,0" },
	EPSG_4301: { towgs84: "-147,506,687" },
	EPSG_4618: { towgs84: "-59,-11,-52" },
	EPSG_4612: { towgs84: "0,0,0" },
	EPSG_4678: { towgs84: "44.585,-131.212,-39.544" },
	EPSG_4250: { towgs84: "-130,29,364" },
	EPSG_4144: { towgs84: "214,804,268" },
	EPSG_4147: { towgs84: "-17.51,-108.32,-62.39" },
	EPSG_4259: { towgs84: "-254.1,-5.36,-100.29" },
	EPSG_4164: { towgs84: "-76,-138,67" },
	EPSG_4211: { towgs84: "-378.873,676.002,-46.255" },
	EPSG_4182: { towgs84: "-422.651,-172.995,84.02" },
	EPSG_4224: { towgs84: "-143.87,243.37,-33.52" },
	EPSG_4225: { towgs84: "-205.57,168.77,-4.12" },
	EPSG_5527: { towgs84: "-67.35,3.88,-38.22" },
	EPSG_4752: { towgs84: "98,390,-22" },
	EPSG_4310: { towgs84: "-30,190,89" },
	EPSG_9248: { towgs84: "-192.26,65.72,132.08" },
	EPSG_4680: { towgs84: "124.5,-63.5,-281" },
	EPSG_4701: { towgs84: "-79.9,-158,-168.9" },
	EPSG_4706: { towgs84: "-146.21,112.63,4.05" },
	EPSG_4805: { towgs84: "682,-203,480" },
	EPSG_4201: { towgs84: "-165,-11,206" },
	EPSG_4210: { towgs84: "-157,-2,-299" },
	EPSG_4183: { towgs84: "-104,167,-38" },
	EPSG_4139: { towgs84: "11,72,-101" },
	EPSG_4668: { towgs84: "-86,-98,-119" },
	EPSG_4717: { towgs84: "-2,151,181" },
	EPSG_4732: { towgs84: "102,52,-38" },
	EPSG_4280: { towgs84: "-377,681,-50" },
	EPSG_4209: { towgs84: "-138,-105,-289" },
	EPSG_4261: { towgs84: "31,146,47" },
	EPSG_4658: { towgs84: "-73,46,-86" },
	EPSG_4721: { towgs84: "265.025,384.929,-194.046" },
	EPSG_4222: { towgs84: "-136,-108,-292" },
	EPSG_4601: { towgs84: "-255,-15,71" },
	EPSG_4602: { towgs84: "725,685,536" },
	EPSG_4603: { towgs84: "72,213.7,93" },
	EPSG_4605: { towgs84: "9,183,236" },
	EPSG_4621: { towgs84: "137,248,-430" },
	EPSG_4657: { towgs84: "-28,199,5" },
	EPSG_4316: { towgs84: "103.25,-100.4,-307.19" },
	EPSG_4642: { towgs84: "-13,-348,292" },
	EPSG_4698: { towgs84: "145,-187,103" },
	EPSG_4192: { towgs84: "-206.1,-174.7,-87.7" },
	EPSG_4311: { towgs84: "-265,120,-358" },
	EPSG_4135: { towgs84: "58,-283,-182" },
	ESRI_104138: { towgs84: "198,-226,-347" },
	EPSG_4245: { towgs84: "-11,851,5" },
	EPSG_4142: { towgs84: "-125,53,467" },
	EPSG_4213: { towgs84: "-106,-87,188" },
	EPSG_4253: { towgs84: "-133,-77,-51" },
	EPSG_4129: { towgs84: "-132,-110,-335" },
	EPSG_4713: { towgs84: "-77,-128,142" },
	EPSG_4239: { towgs84: "217,823,299" },
	EPSG_4146: { towgs84: "295,736,257" },
	EPSG_4155: { towgs84: "-83,37,124" },
	EPSG_4165: { towgs84: "-173,253,27" },
	EPSG_4672: { towgs84: "175,-38,113" },
	EPSG_4236: { towgs84: "-637,-549,-203" },
	EPSG_4251: { towgs84: "-90,40,88" },
	EPSG_4271: { towgs84: "-2,374,172" },
	EPSG_4175: { towgs84: "-88,4,101" },
	EPSG_4716: { towgs84: "298,-304,-375" },
	EPSG_4315: { towgs84: "-23,259,-9" },
	EPSG_4744: { towgs84: "-242.2,-144.9,370.3" },
	EPSG_4244: { towgs84: "-97,787,86" },
	EPSG_4293: { towgs84: "616,97,-251" },
	EPSG_4714: { towgs84: "-127,-769,472" },
	EPSG_4736: { towgs84: "260,12,-147" },
	EPSG_6883: { towgs84: "-235,-110,393" },
	EPSG_6894: { towgs84: "-63,176,185" },
	EPSG_4205: { towgs84: "-43,-163,45" },
	EPSG_4256: { towgs84: "41,-220,-134" },
	EPSG_4262: { towgs84: "639,405,60" },
	EPSG_4604: { towgs84: "174,359,365" },
	EPSG_4169: { towgs84: "-115,118,426" },
	EPSG_4620: { towgs84: "-106,-129,165" },
	EPSG_4184: { towgs84: "-203,141,53" },
	EPSG_4616: { towgs84: "-289,-124,60" },
	EPSG_9403: { towgs84: "-307,-92,127" },
	EPSG_4684: { towgs84: "-133,-321,50" },
	EPSG_4708: { towgs84: "-491,-22,435" },
	EPSG_4707: { towgs84: "114,-116,-333" },
	EPSG_4709: { towgs84: "145,75,-272" },
	EPSG_4712: { towgs84: "-205,107,53" },
	EPSG_4711: { towgs84: "124,-234,-25" },
	EPSG_4718: { towgs84: "230,-199,-752" },
	EPSG_4719: { towgs84: "211,147,111" },
	EPSG_4724: { towgs84: "208,-435,-229" },
	EPSG_4725: { towgs84: "189,-79,-202" },
	EPSG_4735: { towgs84: "647,1777,-1124" },
	EPSG_4722: { towgs84: "-794,119,-298" },
	EPSG_4728: { towgs84: "-307,-92,127" },
	EPSG_4734: { towgs84: "-632,438,-609" },
	EPSG_4727: { towgs84: "912,-58,1227" },
	EPSG_4729: { towgs84: "185,165,42" },
	EPSG_4730: { towgs84: "170,42,84" },
	EPSG_4733: { towgs84: "276,-57,149" },
	ESRI_37218: { towgs84: "230,-199,-752" },
	ESRI_37240: { towgs84: "-7,215,225" },
	ESRI_37221: { towgs84: "252,-209,-751" },
	ESRI_4305: { towgs84: "-123,-206,219" },
	ESRI_104139: { towgs84: "-73,-247,227" },
	EPSG_4748: { towgs84: "51,391,-36" },
	EPSG_4219: { towgs84: "-384,664,-48" },
	EPSG_4255: { towgs84: "-333,-222,114" },
	EPSG_4257: { towgs84: "-587.8,519.75,145.76" },
	EPSG_4646: { towgs84: "-963,510,-359" },
	EPSG_6881: { towgs84: "-24,-203,268" },
	EPSG_6882: { towgs84: "-183,-15,273" },
	EPSG_4715: { towgs84: "-104,-129,239" },
	IGNF_RGF93GDD: { towgs84: "0,0,0" },
	IGNF_RGM04GDD: { towgs84: "0,0,0" },
	IGNF_RGSPM06GDD: { towgs84: "0,0,0" },
	IGNF_RGTAAF07GDD: { towgs84: "0,0,0" },
	IGNF_RGFG95GDD: { towgs84: "0,0,0" },
	IGNF_RGNCG: { towgs84: "0,0,0" },
	IGNF_RGPFGDD: { towgs84: "0,0,0" },
	IGNF_ETRS89G: { towgs84: "0,0,0" },
	IGNF_RGR92GDD: { towgs84: "0,0,0" },
	EPSG_4173: { towgs84: "0,0,0" },
	EPSG_4180: { towgs84: "0,0,0" },
	EPSG_4619: { towgs84: "0,0,0" },
	EPSG_4667: { towgs84: "0,0,0" },
	EPSG_4075: { towgs84: "0,0,0" },
	EPSG_6706: { towgs84: "0,0,0" },
	EPSG_7798: { towgs84: "0,0,0" },
	EPSG_4661: { towgs84: "0,0,0" },
	EPSG_4669: { towgs84: "0,0,0" },
	EPSG_8685: { towgs84: "0,0,0" },
	EPSG_4151: { towgs84: "0,0,0" },
	EPSG_9702: { towgs84: "0,0,0" },
	EPSG_4758: { towgs84: "0,0,0" },
	EPSG_4761: { towgs84: "0,0,0" },
	EPSG_4765: { towgs84: "0,0,0" },
	EPSG_8997: { towgs84: "0,0,0" },
	EPSG_4023: { towgs84: "0,0,0" },
	EPSG_4670: { towgs84: "0,0,0" },
	EPSG_4694: { towgs84: "0,0,0" },
	EPSG_4148: { towgs84: "0,0,0" },
	EPSG_4163: { towgs84: "0,0,0" },
	EPSG_4167: { towgs84: "0,0,0" },
	EPSG_4189: { towgs84: "0,0,0" },
	EPSG_4190: { towgs84: "0,0,0" },
	EPSG_4176: { towgs84: "0,0,0" },
	EPSG_4659: { towgs84: "0,0,0" },
	EPSG_3824: { towgs84: "0,0,0" },
	EPSG_3889: { towgs84: "0,0,0" },
	EPSG_4046: { towgs84: "0,0,0" },
	EPSG_4081: { towgs84: "0,0,0" },
	EPSG_4558: { towgs84: "0,0,0" },
	EPSG_4483: { towgs84: "0,0,0" },
	EPSG_5013: { towgs84: "0,0,0" },
	EPSG_5264: { towgs84: "0,0,0" },
	EPSG_5324: { towgs84: "0,0,0" },
	EPSG_5354: { towgs84: "0,0,0" },
	EPSG_5371: { towgs84: "0,0,0" },
	EPSG_5373: { towgs84: "0,0,0" },
	EPSG_5381: { towgs84: "0,0,0" },
	EPSG_5393: { towgs84: "0,0,0" },
	EPSG_5489: { towgs84: "0,0,0" },
	EPSG_5593: { towgs84: "0,0,0" },
	EPSG_6135: { towgs84: "0,0,0" },
	EPSG_6365: { towgs84: "0,0,0" },
	EPSG_5246: { towgs84: "0,0,0" },
	EPSG_7886: { towgs84: "0,0,0" },
	EPSG_8431: { towgs84: "0,0,0" },
	EPSG_8427: { towgs84: "0,0,0" },
	EPSG_8699: { towgs84: "0,0,0" },
	EPSG_8818: { towgs84: "0,0,0" },
	EPSG_4757: { towgs84: "0,0,0" },
	EPSG_9140: { towgs84: "0,0,0" },
	EPSG_8086: { towgs84: "0,0,0" },
	EPSG_4686: { towgs84: "0,0,0" },
	EPSG_4737: { towgs84: "0,0,0" },
	EPSG_4702: { towgs84: "0,0,0" },
	EPSG_4747: { towgs84: "0,0,0" },
	EPSG_4749: { towgs84: "0,0,0" },
	EPSG_4674: { towgs84: "0,0,0" },
	EPSG_4755: { towgs84: "0,0,0" },
	EPSG_4759: { towgs84: "0,0,0" },
	EPSG_4762: { towgs84: "0,0,0" },
	EPSG_4763: { towgs84: "0,0,0" },
	EPSG_4764: { towgs84: "0,0,0" },
	EPSG_4166: { towgs84: "0,0,0" },
	EPSG_4170: { towgs84: "0,0,0" },
	EPSG_5546: { towgs84: "0,0,0" },
	EPSG_7844: { towgs84: "0,0,0" },
	EPSG_4818: { towgs84: "589,76,480" },
	EPSG_10328: { towgs84: "0,0,0" },
	EPSG_9782: { towgs84: "0,0,0" },
	EPSG_9777: { towgs84: "0,0,0" },
	EPSG_10690: { towgs84: "0,0,0" },
	EPSG_10639: { towgs84: "0,0,0" },
	EPSG_10739: { towgs84: "0,0,0" },
	EPSG_7686: { towgs84: "0,0,0" },
	EPSG_8900: { towgs84: "0,0,0" },
	EPSG_5886: { towgs84: "0,0,0" },
	EPSG_7683: { towgs84: "0,0,0" },
	EPSG_6668: { towgs84: "0,0,0" },
	EPSG_20046: { towgs84: "0,0,0" },
	EPSG_10299: { towgs84: "0,0,0" },
	EPSG_10310: { towgs84: "0,0,0" },
	EPSG_10475: { towgs84: "0,0,0" },
	EPSG_4742: { towgs84: "0,0,0" },
	EPSG_10671: { towgs84: "0,0,0" },
	EPSG_10762: { towgs84: "0,0,0" },
	EPSG_10725: { towgs84: "0,0,0" },
	EPSG_10791: { towgs84: "0,0,0" },
	EPSG_10800: { towgs84: "0,0,0" },
	EPSG_10305: { towgs84: "0,0,0" },
	EPSG_10941: { towgs84: "0,0,0" },
	EPSG_10968: { towgs84: "0,0,0" },
	EPSG_10875: { towgs84: "0,0,0" },
	EPSG_6318: { towgs84: "0,0,0" },
	EPSG_10910: { towgs84: "0,0,0" }
};
for (var key in datums) {
	var datum$1 = datums[key];
	if (!datum$1.datumName) continue;
	datums[datum$1.datumName] = datum$1;
}
//#endregion
//#region node_modules/proj4/lib/datum.js
function datum(datumCode, datum_params, a, b, es, ep2, nadgrids) {
	var out = {};
	if (datumCode === void 0 || datumCode === "none") out.datum_type = 5;
	else out.datum_type = 4;
	if (datum_params) {
		out.datum_params = datum_params.map(parseFloat);
		if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) out.datum_type = 1;
		if (out.datum_params.length > 3) {
			if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
				out.datum_type = 2;
				out.datum_params[3] *= SEC_TO_RAD;
				out.datum_params[4] *= SEC_TO_RAD;
				out.datum_params[5] *= SEC_TO_RAD;
				out.datum_params[6] = out.datum_params[6] / 1e6 + 1;
			}
		}
	}
	if (nadgrids) {
		out.datum_type = 3;
		out.grids = nadgrids;
	}
	out.a = a;
	out.b = b;
	out.es = es;
	out.ep2 = ep2;
	return out;
}
//#endregion
//#region node_modules/proj4/lib/nadgrid.js
/**
* Resources for details of NTv2 file formats:
* - https://web.archive.org/web/20140127204822if_/http://www.mgs.gov.on.ca:80/stdprodconsume/groups/content/@mgs/@iandit/documents/resourcelist/stel02_047447.pdf
* - http://mimaka.com/help/gs/html/004_NTV2%20Data%20Format.htm
*/
/**
* @typedef {Object} NadgridInfo
* @property {string} name The name of the NAD grid or 'null' if not specified.
* @property {boolean} mandatory Indicates if the grid is mandatory (true) or optional (false).
* @property {*} grid The loaded NAD grid object, or null if not loaded or not applicable.
* @property {boolean} isNull True if the grid is explicitly 'null', otherwise false.
*/
/**
* @typedef {Object} NTV2GridOptions
* @property {boolean} [includeErrorFields=true] Whether to include error fields in the subgrids.
*/
/**
* @typedef {Object} NadgridHeader
* @property {number} [nFields] Number of fields in the header.
* @property {number} [nSubgridFields] Number of fields in each subgrid header.
* @property {number} nSubgrids Number of subgrids in the file.
* @property {string} [shiftType] Type of shift (e.g., "SECONDS").
* @property {number} [fromSemiMajorAxis] Source ellipsoid semi-major axis.
* @property {number} [fromSemiMinorAxis] Source ellipsoid semi-minor axis.
* @property {number} [toSemiMajorAxis] Target ellipsoid semi-major axis.
* @property {number} [toSemiMinorAxis] Target ellipsoid semi-minor axis.
*/
/**
* @typedef {Object} Subgrid
* @property {Array<number>} ll Lower left corner of the grid in radians [longitude, latitude].
* @property {Array<number>} del Grid spacing in radians [longitude interval, latitude interval].
* @property {Array<number>} lim Number of columns in the grid [longitude columns, latitude columns].
* @property {number} [count] Total number of grid nodes.
* @property {Array} cvs Mapped node values for the grid.
*/
/** @typedef {{header: NadgridHeader, subgrids: Array<Subgrid>}} NADGrid */
/**
* @typedef {Object} GeoTIFF
* @property {() => Promise<number>} getImageCount - Returns the number of images in the GeoTIFF.
* @property {(index: number) => Promise<GeoTIFFImage>} getImage - Returns a GeoTIFFImage for the given index.
*/
/**
* @typedef {Object} GeoTIFFImage
* @property {() => number} getWidth - Returns the width of the image.
* @property {() => number} getHeight - Returns the height of the image.
* @property {() => number[]} getBoundingBox - Returns the bounding box as [minX, minY, maxX, maxY] in degrees.
* @property {() => Promise<ArrayLike<ArrayLike<number>>>} readRasters - Returns the raster data as an array of bands.
* @property {Object} fileDirectory - The file directory object containing metadata.
* @property {Object} fileDirectory.ModelPixelScale - The pixel scale array [scaleX, scaleY, scaleZ] in degrees.
*/
var loadedNadgrids = {};
/**
* @overload
* @param {string} key - The key to associate with the loaded grid.
* @param {ArrayBuffer} data - The NTv2 grid data as an ArrayBuffer.
* @param {NTV2GridOptions} [options] - Optional parameters for loading the grid.
* @returns {NADGrid} - The loaded NAD grid information.
*/
/**
* @overload
* @param {string} key - The key to associate with the loaded grid.
* @param {GeoTIFF} data - The GeoTIFF instance to read the grid from.
* @returns {{ready: Promise<NADGrid>}} - A promise that resolves to the loaded grid information.
*/
/**
* Load either a NTv2 file (.gsb) or a Geotiff (.tif) to a key that can be used in a proj string like +nadgrids=<key>. Pass the NTv2 file
* as an ArrayBuffer. Pass Geotiff as a GeoTIFF instance from the geotiff.js library.
* @param {string} key - The key to associate with the loaded grid.
* @param {ArrayBuffer|GeoTIFF} data The data to load, either an ArrayBuffer for NTv2 or a GeoTIFF instance.
* @param {NTV2GridOptions} [options] Optional parameters.
* @returns {{ready: Promise<NADGrid>}|NADGrid} - A promise that resolves to the loaded grid information.
*/
function nadgrid(key, data, options) {
	if (data instanceof ArrayBuffer) return readNTV2Grid(key, data, options);
	return { ready: readGeotiffGrid(key, data) };
}
/**
* @param {string} key The key to associate with the loaded grid.
* @param {ArrayBuffer} data The NTv2 grid data as an ArrayBuffer.
* @param {NTV2GridOptions} [options] Optional parameters for loading the grid.
* @returns {NADGrid} The loaded NAD grid information.
*/
function readNTV2Grid(key, data, options) {
	var includeErrorFields = true;
	if (options !== void 0 && options.includeErrorFields === false) includeErrorFields = false;
	var view = new DataView(data);
	var isLittleEndian = detectLittleEndian(view);
	var header = readHeader(view, isLittleEndian);
	var nadgrid = {
		header,
		subgrids: readSubgrids(view, header, isLittleEndian, includeErrorFields)
	};
	loadedNadgrids[key] = nadgrid;
	return nadgrid;
}
/**
* @param {string} key The key to associate with the loaded grid.
* @param {GeoTIFF} tiff The GeoTIFF instance to read the grid from.
* @returns {Promise<NADGrid>} A promise that resolves to the loaded NAD grid information.
*/
function readGeotiffGrid(_x, _x2) {
	return _readGeotiffGrid.apply(this, arguments);
}
function _readGeotiffGrid() {
	_readGeotiffGrid = _asyncToGenerator(function* (key, tiff) {
		var subgrids = [];
		var subGridCount = yield tiff.getImageCount();
		for (var subgridIndex = subGridCount - 1; subgridIndex >= 0; subgridIndex--) {
			var image = yield tiff.getImage(subgridIndex);
			var data = yield image.readRasters();
			var lim = [image.getWidth(), image.getHeight()];
			var imageBBoxRadians = image.getBoundingBox().map(degreesToRadians);
			var del = [image.fileDirectory.ModelPixelScale[0], image.fileDirectory.ModelPixelScale[1]].map(degreesToRadians);
			var maxX = imageBBoxRadians[0] + (lim[0] - 1) * del[0];
			var minY = imageBBoxRadians[3] - (lim[1] - 1) * del[1];
			var latitudeOffsetBand = data[0];
			var longitudeOffsetBand = data[1];
			var nodes = [];
			for (let i = lim[1] - 1; i >= 0; i--) for (let j = lim[0] - 1; j >= 0; j--) {
				var index = i * lim[0] + j;
				nodes.push([-secondsToRadians(longitudeOffsetBand[index]), secondsToRadians(latitudeOffsetBand[index])]);
			}
			subgrids.push({
				del,
				lim,
				ll: [-maxX, minY],
				cvs: nodes
			});
		}
		var tifGrid = {
			header: { nSubgrids: subGridCount },
			subgrids
		};
		loadedNadgrids[key] = tifGrid;
		return tifGrid;
	});
	return _readGeotiffGrid.apply(this, arguments);
}
/**
* Given a proj4 value for nadgrids, return an array of loaded grids
* @param {string} nadgrids A comma-separated list of grid names, optionally prefixed with '@' to indicate optional grids.
* @returns
*/
function getNadgrids(nadgrids) {
	if (nadgrids === void 0) return null;
	return nadgrids.split(",").map(parseNadgridString);
}
/**
* @param {string} value The nadgrid string to get information for.
* @returns {NadgridInfo|null} An object with grid information, or null if the input is empty.
*/
function parseNadgridString(value) {
	if (value.length === 0) return null;
	var optional = value[0] === "@";
	if (optional) value = value.slice(1);
	if (value === "null") return {
		name: "null",
		mandatory: !optional,
		grid: null,
		isNull: true
	};
	return {
		name: value,
		mandatory: !optional,
		grid: loadedNadgrids[value] || null,
		isNull: false
	};
}
function degreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}
function secondsToRadians(seconds) {
	return seconds / 3600 * Math.PI / 180;
}
function detectLittleEndian(view) {
	var nFields = view.getInt32(8, false);
	if (nFields === 11) return false;
	nFields = view.getInt32(8, true);
	if (nFields !== 11) console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian");
	return true;
}
function readHeader(view, isLittleEndian) {
	return {
		nFields: view.getInt32(8, isLittleEndian),
		nSubgridFields: view.getInt32(24, isLittleEndian),
		nSubgrids: view.getInt32(40, isLittleEndian),
		shiftType: decodeString(view, 56, 64).trim(),
		fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
		fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
		toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
		toSemiMinorAxis: view.getFloat64(168, isLittleEndian)
	};
}
function decodeString(view, start, end) {
	return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start, end)));
}
function readSubgrids(view, header, isLittleEndian, includeErrorFields) {
	var gridOffset = 176;
	var grids = [];
	for (var i = 0; i < header.nSubgrids; i++) {
		var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
		var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian, includeErrorFields);
		var lngColumnCount = Math.round(1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval);
		var latColumnCount = Math.round(1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval);
		grids.push({
			ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
			del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
			lim: [lngColumnCount, latColumnCount],
			count: subHeader.gridNodeCount,
			cvs: mapNodes(nodes)
		});
		var rowSize = 16;
		if (includeErrorFields === false) rowSize = 8;
		gridOffset += 176 + subHeader.gridNodeCount * rowSize;
	}
	return grids;
}
/**
* @param {*} nodes
* @returns Array<Array<number>>
*/
function mapNodes(nodes) {
	return nodes.map(function(r) {
		return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)];
	});
}
function readGridHeader(view, offset, isLittleEndian) {
	return {
		name: decodeString(view, offset + 8, offset + 16).trim(),
		parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
		lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
		upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
		lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
		upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
		latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
		longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
		gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
	};
}
function readGridNodes(view, offset, gridHeader, isLittleEndian, includeErrorFields) {
	var nodesOffset = offset + 176;
	var gridRecordLength = 16;
	if (includeErrorFields === false) gridRecordLength = 8;
	var gridShiftRecords = [];
	for (var i = 0; i < gridHeader.gridNodeCount; i++) {
		var record = {
			latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
			longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian)
		};
		if (includeErrorFields !== false) {
			record.latitudeAccuracy = view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian);
			record.longitudeAccuracy = view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian);
		}
		gridShiftRecords.push(record);
	}
	return gridShiftRecords;
}
//#endregion
//#region node_modules/proj4/lib/Proj.js
/**
* @typedef {Object} DatumDefinition
* @property {number} datum_type - The type of datum.
* @property {number} a - Semi-major axis of the ellipsoid.
* @property {number} b - Semi-minor axis of the ellipsoid.
* @property {number} es - Eccentricity squared of the ellipsoid.
* @property {number} ep2 - Second eccentricity squared of the ellipsoid.
*/
/**
* @param {string | import('./core').PROJJSONDefinition | import('./defs').ProjectionDefinition} srsCode
* @param {(errorMessage?: string, instance?: Projection) => void} [callback]
*/
function Projection(srsCode, callback) {
	if (!(this instanceof Projection)) return new Projection(srsCode);
	/** @type {<T extends import('./core').TemplateCoordinates>(coordinates: T, enforceAxis?: boolean) => T} */
	this.forward = null;
	/** @type {<T extends import('./core').TemplateCoordinates>(coordinates: T, enforceAxis?: boolean) => T} */
	this.inverse = null;
	/** @type {function(): void} */
	this.init = null;
	/** @type {string} */
	this.name;
	/** @type {Array<string>} */
	this.names = null;
	/** @type {string} */
	this.title;
	callback = callback || function(error) {
		if (error) throw error;
	};
	var json = parse(srsCode);
	if (typeof json !== "object") {
		callback("Could not parse to valid json: " + srsCode);
		return;
	}
	var ourProj = Projection.projections.get(json.projName);
	if (!ourProj) {
		callback("Could not get projection name from: " + srsCode);
		return;
	}
	if (json.datumCode && json.datumCode !== "none") {
		var datumDef = match(datums, json.datumCode);
		if (datumDef) {
			json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(",") : null);
			json.ellps = datumDef.ellipse;
			json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
		}
	}
	json.k0 = json.k0 || 1;
	json.axis = json.axis || "enu";
	json.ellps = json.ellps || "wgs84";
	json.lat1 = json.lat1 || json.lat0;
	var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
	var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
	var nadgrids = getNadgrids(json.nadgrids);
	/** @type {DatumDefinition} */
	var datumObj = json.datum || datum(json.datumCode, json.datum_params, sphere_.a, sphere_.b, ecc.es, ecc.ep2, nadgrids);
	extend_default(this, json);
	extend_default(this, ourProj);
	this.a = sphere_.a;
	this.b = sphere_.b;
	this.rf = sphere_.rf;
	this.sphere = sphere_.sphere;
	this.es = ecc.es;
	this.e = ecc.e;
	this.ep2 = ecc.ep2;
	this.datum = datumObj;
	if ("init" in this && typeof this.init === "function") this.init();
	callback(null, this);
}
Projection.projections = projections_default;
Projection.projections.start();
//#endregion
//#region node_modules/proj4/lib/datumUtils.js
function compareDatums(source, dest) {
	if (source.datum_type !== dest.datum_type) return false;
	else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 5e-11) return false;
	else if (source.datum_type === 1) return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2];
	else if (source.datum_type === 2) return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6];
	else return true;
}
function geodeticToGeocentric(p, es, a) {
	var Longitude = p.x;
	var Latitude = p.y;
	var Height = p.z ? p.z : 0;
	var Rn;
	var Sin_Lat;
	var Sin2_Lat;
	var Cos_Lat;
	if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) Latitude = -HALF_PI;
	else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) Latitude = HALF_PI;
	else if (Latitude < -HALF_PI) return {
		x: -Infinity,
		y: -Infinity,
		z: p.z
	};
	else if (Latitude > HALF_PI) return {
		x: Infinity,
		y: Infinity,
		z: p.z
	};
	if (Longitude > Math.PI) Longitude -= 2 * Math.PI;
	Sin_Lat = Math.sin(Latitude);
	Cos_Lat = Math.cos(Latitude);
	Sin2_Lat = Sin_Lat * Sin_Lat;
	Rn = a / Math.sqrt(1 - es * Sin2_Lat);
	return {
		x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
		y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
		z: (Rn * (1 - es) + Height) * Sin_Lat
	};
}
function geocentricToGeodetic(p, es, a, b) {
	var genau = 1e-12;
	var genau2 = genau * genau;
	var maxiter = 30;
	var P;
	var RR;
	var CT;
	var ST;
	var RX;
	var RK;
	var RN;
	var CPHI0;
	var SPHI0;
	var CPHI;
	var SPHI;
	var SDPHI;
	var iter;
	var X = p.x;
	var Y = p.y;
	var Z = p.z ? p.z : 0;
	var Longitude;
	var Latitude;
	var Height;
	P = Math.sqrt(X * X + Y * Y);
	RR = Math.sqrt(X * X + Y * Y + Z * Z);
	if (P / a < genau) {
		Longitude = 0;
		if (RR / a < genau) {
			Latitude = HALF_PI;
			Height = -b;
			return {
				x: p.x,
				y: p.y,
				z: p.z
			};
		}
	} else Longitude = Math.atan2(Y, X);
	CT = Z / RR;
	ST = P / RR;
	RX = 1 / Math.sqrt(1 - es * (2 - es) * ST * ST);
	CPHI0 = ST * (1 - es) * RX;
	SPHI0 = CT * RX;
	iter = 0;
	do {
		iter++;
		RN = a / Math.sqrt(1 - es * SPHI0 * SPHI0);
		Height = P * CPHI0 + Z * SPHI0 - RN * (1 - es * SPHI0 * SPHI0);
		RK = es * RN / (RN + Height);
		RX = 1 / Math.sqrt(1 - RK * (2 - RK) * ST * ST);
		CPHI = ST * (1 - RK) * RX;
		SPHI = CT * RX;
		SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
		CPHI0 = CPHI;
		SPHI0 = SPHI;
	} while (SDPHI * SDPHI > genau2 && iter < maxiter);
	Latitude = Math.atan(SPHI / Math.abs(CPHI));
	return {
		x: Longitude,
		y: Latitude,
		z: Height
	};
}
/** point object, nothing fancy, just allows values to be
passed back and forth by reference rather than by value.
Other point classes may be used as long as they have
x and y properties, which will get modified in the transform method.
*/
function geocentricToWgs84(p, datum_type, datum_params) {
	if (datum_type === 1) return {
		x: p.x + datum_params[0],
		y: p.y + datum_params[1],
		z: p.z + datum_params[2]
	};
	else if (datum_type === 2) {
		var Dx_BF = datum_params[0];
		var Dy_BF = datum_params[1];
		var Dz_BF = datum_params[2];
		var Rx_BF = datum_params[3];
		var Ry_BF = datum_params[4];
		var Rz_BF = datum_params[5];
		var M_BF = datum_params[6];
		return {
			x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
			y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
			z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
		};
	}
}
function geocentricFromWgs84(p, datum_type, datum_params) {
	if (datum_type === 1) return {
		x: p.x - datum_params[0],
		y: p.y - datum_params[1],
		z: p.z - datum_params[2]
	};
	else if (datum_type === 2) {
		var Dx_BF = datum_params[0];
		var Dy_BF = datum_params[1];
		var Dz_BF = datum_params[2];
		var Rx_BF = datum_params[3];
		var Ry_BF = datum_params[4];
		var Rz_BF = datum_params[5];
		var M_BF = datum_params[6];
		var x_tmp = (p.x - Dx_BF) / M_BF;
		var y_tmp = (p.y - Dy_BF) / M_BF;
		var z_tmp = (p.z - Dz_BF) / M_BF;
		return {
			x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
			y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
			z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
		};
	}
}
//#endregion
//#region node_modules/proj4/lib/datum_transform.js
function checkParams(type) {
	return type === 1 || type === 2;
}
function datum_transform_default(source, dest, point) {
	if (compareDatums(source, dest)) return point;
	if (source.datum_type === 5 || dest.datum_type === 5) return point;
	var source_a = source.a;
	var source_es = source.es;
	if (source.datum_type === 3) {
		if (applyGridShift(source, false, point) !== 0) return;
		source_a = SRS_WGS84_SEMIMAJOR;
		source_es = SRS_WGS84_ESQUARED;
	}
	var dest_a = dest.a;
	var dest_b = dest.b;
	var dest_es = dest.es;
	if (dest.datum_type === 3) {
		dest_a = SRS_WGS84_SEMIMAJOR;
		dest_b = SRS_WGS84_SEMIMINOR;
		dest_es = SRS_WGS84_ESQUARED;
	}
	if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) && !checkParams(dest.datum_type)) return point;
	point = geodeticToGeocentric(point, source_es, source_a);
	if (checkParams(source.datum_type)) point = geocentricToWgs84(point, source.datum_type, source.datum_params);
	if (checkParams(dest.datum_type)) point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
	point = geocentricToGeodetic(point, dest_es, dest_a, dest_b);
	if (dest.datum_type === 3) {
		if (applyGridShift(dest, true, point) !== 0) return;
	}
	return point;
}
function applyGridShift(source, inverse, point) {
	if (source.grids === null || source.grids.length === 0) {
		console.log("Grid shift grids not found");
		return -1;
	}
	var input = {
		x: -point.x,
		y: point.y
	};
	var output = {
		x: NaN,
		y: NaN
	};
	var attemptedGrids = [];
	outer: for (var i = 0; i < source.grids.length; i++) {
		var grid = source.grids[i];
		attemptedGrids.push(grid.name);
		if (grid.isNull) {
			output = input;
			break;
		}
		if (grid.grid === null) {
			if (grid.mandatory) {
				console.log("Unable to find mandatory grid '" + grid.name + "'");
				return -1;
			}
			continue;
		}
		var subgrids = grid.grid.subgrids;
		for (var j = 0, jj = subgrids.length; j < jj; j++) {
			var subgrid = subgrids[j];
			var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 1e4;
			var minX = subgrid.ll[0] - epsilon;
			var minY = subgrid.ll[1] - epsilon;
			var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
			var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
			if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x) continue;
			output = applySubgridShift(input, inverse, subgrid);
			if (!isNaN(output.x)) break outer;
		}
	}
	if (isNaN(output.x)) {
		console.log("Failed to find a grid shift table for location '" + -input.x * R2D + " " + input.y * R2D + " tried: '" + attemptedGrids + "'");
		return -1;
	}
	point.x = -output.x;
	point.y = output.y;
	return 0;
}
function applySubgridShift(pin, inverse, ct) {
	var val = {
		x: NaN,
		y: NaN
	};
	if (isNaN(pin.x)) return val;
	var tb = {
		x: pin.x,
		y: pin.y
	};
	tb.x -= ct.ll[0];
	tb.y -= ct.ll[1];
	tb.x = adjust_lon_default(tb.x - Math.PI) + Math.PI;
	var t = nadInterpolate(tb, ct);
	if (inverse) {
		if (isNaN(t.x)) return val;
		t.x = tb.x - t.x;
		t.y = tb.y - t.y;
		var i = 9, tol = 1e-12;
		var dif, del;
		do {
			del = nadInterpolate(t, ct);
			if (isNaN(del.x)) {
				console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
				break;
			}
			dif = {
				x: tb.x - (del.x + t.x),
				y: tb.y - (del.y + t.y)
			};
			t.x += dif.x;
			t.y += dif.y;
		} while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
		if (i < 0) {
			console.log("Inverse grid shift iterator failed to converge.");
			return val;
		}
		val.x = adjust_lon_default(t.x + ct.ll[0]);
		val.y = t.y + ct.ll[1];
	} else if (!isNaN(t.x)) {
		val.x = pin.x + t.x;
		val.y = pin.y + t.y;
	}
	return val;
}
function nadInterpolate(pin, ct) {
	var t = {
		x: pin.x / ct.del[0],
		y: pin.y / ct.del[1]
	};
	var indx = {
		x: Math.floor(t.x),
		y: Math.floor(t.y)
	};
	var frct = {
		x: t.x - 1 * indx.x,
		y: t.y - 1 * indx.y
	};
	var val = {
		x: NaN,
		y: NaN
	};
	var inx;
	if (indx.x < 0 || indx.x >= ct.lim[0]) return val;
	if (indx.y < 0 || indx.y >= ct.lim[1]) return val;
	inx = indx.y * ct.lim[0] + indx.x;
	var f00 = {
		x: ct.cvs[inx][0],
		y: ct.cvs[inx][1]
	};
	inx++;
	var f10 = {
		x: ct.cvs[inx][0],
		y: ct.cvs[inx][1]
	};
	inx += ct.lim[0];
	var f11 = {
		x: ct.cvs[inx][0],
		y: ct.cvs[inx][1]
	};
	inx--;
	var f01 = {
		x: ct.cvs[inx][0],
		y: ct.cvs[inx][1]
	};
	var m11 = frct.x * frct.y, m10 = frct.x * (1 - frct.y), m00 = (1 - frct.x) * (1 - frct.y), m01 = (1 - frct.x) * frct.y;
	val.x = m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x;
	val.y = m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y;
	return val;
}
//#endregion
//#region node_modules/proj4/lib/adjust_axis.js
function adjust_axis_default(crs, denorm, point) {
	var xin = point.x, yin = point.y, zin = point.z || 0;
	var v, t, i;
	/** @type {import("./core").InterfaceCoordinates} */
	var out = {};
	for (i = 0; i < 3; i++) {
		if (denorm && i === 2 && point.z === void 0) continue;
		if (i === 0) {
			v = xin;
			if ("ew".indexOf(crs.axis[i]) !== -1) t = "x";
			else t = "y";
		} else if (i === 1) {
			v = yin;
			if ("ns".indexOf(crs.axis[i]) !== -1) t = "y";
			else t = "x";
		} else {
			v = zin;
			t = "z";
		}
		switch (crs.axis[i]) {
			case "e":
				out[t] = v;
				break;
			case "w":
				out[t] = -v;
				break;
			case "n":
				out[t] = v;
				break;
			case "s":
				out[t] = -v;
				break;
			case "u":
				if (point[t] !== void 0) out.z = v;
				break;
			case "d":
				if (point[t] !== void 0) out.z = -v;
				break;
			default: return null;
		}
	}
	return out;
}
//#endregion
//#region node_modules/proj4/lib/common/toPoint.js
/**
* @param {Array<number>} array
* @returns {import("../core").InterfaceCoordinates}
*/
function toPoint_default(array) {
	var out = {
		x: array[0],
		y: array[1]
	};
	if (array.length > 2) out.z = array[2];
	if (array.length > 3) out.m = array[3];
	return out;
}
//#endregion
//#region node_modules/proj4/lib/checkSanity.js
function checkSanity_default(point) {
	checkCoord(point.x);
	checkCoord(point.y);
}
function checkCoord(num) {
	if (typeof Number.isFinite === "function") {
		if (Number.isFinite(num)) return;
		throw new TypeError("coordinates must be finite numbers");
	}
	if (typeof num !== "number" || num !== num || !isFinite(num)) throw new TypeError("coordinates must be finite numbers");
}
//#endregion
//#region node_modules/proj4/lib/transform.js
function checkNotWGS(source, dest) {
	return (source.datum.datum_type === 1 || source.datum.datum_type === 2 || source.datum.datum_type === 3) && dest.datumCode !== "WGS84" || (dest.datum.datum_type === 1 || dest.datum.datum_type === 2 || dest.datum.datum_type === 3) && source.datumCode !== "WGS84";
}
/**
* @param {import('./defs').ProjectionDefinition} source
* @param {import('./defs').ProjectionDefinition} dest
* @param {import('./core').TemplateCoordinates} point
* @param {boolean} enforceAxis
* @returns {import('./core').InterfaceCoordinates | undefined}
*/
function transform(source, dest, point, enforceAxis) {
	var wgs84;
	if (Array.isArray(point)) point = toPoint_default(point);
	else point = {
		x: point.x,
		y: point.y,
		z: point.z,
		m: point.m
	};
	var hasZ = point.z !== void 0;
	checkSanity_default(point);
	if (source.datum && dest.datum && checkNotWGS(source, dest)) {
		wgs84 = new Projection("WGS84");
		point = transform(source, wgs84, point, enforceAxis);
		source = wgs84;
	}
	if (enforceAxis && source.axis !== "enu") point = adjust_axis_default(source, false, point);
	if (source.projName === "longlat") point = {
		x: point.x * D2R$1,
		y: point.y * D2R$1,
		z: point.z || 0
	};
	else {
		if (source.to_meter) point = {
			x: point.x * source.to_meter,
			y: point.y * source.to_meter,
			z: point.z || 0
		};
		point = source.inverse(point);
		if (!point) return;
	}
	if (source.from_greenwich) point.x += source.from_greenwich;
	point = datum_transform_default(source.datum, dest.datum, point);
	if (!point) return;
	point = point;
	if (dest.from_greenwich) point = {
		x: point.x - dest.from_greenwich,
		y: point.y,
		z: point.z || 0
	};
	if (dest.projName === "longlat") point = {
		x: point.x * R2D,
		y: point.y * R2D,
		z: point.z || 0
	};
	else {
		point = dest.forward(point);
		if (dest.to_meter) point = {
			x: point.x / dest.to_meter,
			y: point.y / dest.to_meter,
			z: point.z || 0
		};
	}
	if (enforceAxis && dest.axis !== "enu") return adjust_axis_default(dest, true, point);
	if (point && !hasZ && dest.projName !== "geocent") delete point.z;
	return point;
}
//#endregion
//#region node_modules/proj4/lib/core.js
var wgs84 = Projection("WGS84");
/**
* @typedef {{x: number, y: number, z?: number, m?: number}} InterfaceCoordinates
*/
/**
* @typedef {Array<number> | InterfaceCoordinates} TemplateCoordinates
*/
/**
* @typedef {Object} Converter
* @property {<T extends TemplateCoordinates>(coordinates: T, enforceAxis?: boolean) => T} forward
* @property {<T extends TemplateCoordinates>(coordinates: T, enforceAxis?: boolean) => T} inverse
* @property {proj} [oProj]
*/
/**
* @typedef {Object} PROJJSONDefinition
* @property {string} [$schema]
* @property {string} type
* @property {string} [name]
* @property {{authority: string, code: number}} [id]
* @property {string} [scope]
* @property {string} [area]
* @property {{south_latitude: number, west_longitude: number, north_latitude: number, east_longitude: number}} [bbox]
* @property {PROJJSONDefinition[]} [components]
* @property {{type: string, name: string}} [datum]
* @property {{
*   name: string,
*   members: Array<{
*     name: string,
*     id?: {authority: string, code: number}
*   }>,
*   ellipsoid?: {
*     name: string,
*     semi_major_axis: number,
*     inverse_flattening?: number
*   },
*   accuracy?: string,
*   id?: {authority: string, code: number}
* }} [datum_ensemble]
* @property {{
*   subtype: string,
*   axis: Array<{
*     name: string,
*     abbreviation?: string,
*     direction: string,
*     unit: string
*   }>
* }} [coordinate_system]
* @property {{
*   name: string,
*   method: {name: string},
*   parameters: Array<{
*     name: string,
*     value: number,
*     unit?: string
*   }>
* }} [conversion]
* @property {{
*   name: string,
*   method: {name: string},
*   parameters: Array<{
*     name: string,
*     value: number,
*     unit?: string,
*     type?: string,
*     file_name?: string
*   }>
* }} [transformation]
*/
/**
* @template {TemplateCoordinates} T
* @param {proj} from
* @param {proj} to
* @param {T} coords
* @param {boolean} [enforceAxis]
* @returns {T}
*/
function transformer(from, to, coords, enforceAxis) {
	var transformedArray, out, keys;
	if (Array.isArray(coords)) {
		transformedArray = transform(from, to, coords, enforceAxis) || {
			x: NaN,
			y: NaN
		};
		if (coords.length > 2) if (typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent") if (typeof transformedArray.z === "number") return [
			transformedArray.x,
			transformedArray.y,
			transformedArray.z
		].concat(coords.slice(3));
		else return [
			transformedArray.x,
			transformedArray.y,
			coords[2]
		].concat(coords.slice(3));
		else return [transformedArray.x, transformedArray.y].concat(coords.slice(2));
		else return [transformedArray.x, transformedArray.y];
	} else {
		out = transform(from, to, coords, enforceAxis);
		keys = Object.keys(coords);
		if (keys.length === 2) return out;
		keys.forEach(function(key) {
			if (typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent") {
				if (key === "x" || key === "y" || key === "z") return;
			} else if (key === "x" || key === "y") return;
			out[key] = coords[key];
		});
		return out;
	}
}
/**
* @param {proj | string | PROJJSONDefinition | Converter} item
* @returns {import('./Proj').default}
*/
function checkProj(item) {
	if (item instanceof Projection) return item;
	if (typeof item === "object" && "oProj" in item) return item.oProj;
	return Projection(item);
}
/**
* @overload
* @param {string | PROJJSONDefinition | proj} toProj
* @returns {Converter}
*/
/**
* @overload
* @param {string | PROJJSONDefinition | proj} fromProj
* @param {string | PROJJSONDefinition | proj} toProj
* @returns {Converter}
*/
/**
* @template {TemplateCoordinates} T
* @overload
* @param {string | PROJJSONDefinition | proj} toProj
* @param {T} coord
* @returns {T}
*/
/**
* @template {TemplateCoordinates} T
* @overload
* @param {string | PROJJSONDefinition | proj} fromProj
* @param {string | PROJJSONDefinition | proj} toProj
* @param {T} coord
* @returns {T}
*/
/**
* @template {TemplateCoordinates} T
* @param {string | PROJJSONDefinition | proj} fromProjOrToProj
* @param {string | PROJJSONDefinition | proj | TemplateCoordinates} [toProjOrCoord]
* @param {T} [coord]
* @returns {T|Converter}
*/
function proj4$1(fromProjOrToProj, toProjOrCoord, coord) {
	/** @type {proj} */
	var fromProj;
	/** @type {proj} */
	var toProj;
	var single = false;
	/** @type {Converter} */
	var obj;
	if (typeof toProjOrCoord === "undefined") {
		toProj = checkProj(fromProjOrToProj);
		fromProj = wgs84;
		single = true;
	} else if (typeof toProjOrCoord.x !== "undefined" || Array.isArray(toProjOrCoord)) {
		coord = toProjOrCoord;
		toProj = checkProj(fromProjOrToProj);
		fromProj = wgs84;
		single = true;
	}
	if (!fromProj) fromProj = checkProj(fromProjOrToProj);
	if (!toProj) toProj = checkProj(toProjOrCoord);
	if (coord) return transformer(fromProj, toProj, coord);
	else {
		obj = {
			/**
			* @template {TemplateCoordinates} T
			* @param {T} coords
			* @param {boolean=} enforceAxis
			* @returns {T}
			*/
			forward: function(coords, enforceAxis) {
				return transformer(fromProj, toProj, coords, enforceAxis);
			},
			/**
			* @template {TemplateCoordinates} T
			* @param {T} coords
			* @param {boolean=} enforceAxis
			* @returns {T}
			*/
			inverse: function(coords, enforceAxis) {
				return transformer(toProj, fromProj, coords, enforceAxis);
			}
		};
		if (single) obj.oProj = toProj;
		return obj;
	}
}
//#endregion
//#region node_modules/mgrs/mgrs.js
/**
* UTM zones are grouped, and assigned to one of a group of 6
* sets.
*
* {int} @private
*/
var NUM_100K_SETS = 6;
/**
* The column letters (for easting) of the lower left value, per
* set.
*
* {string} @private
*/
var SET_ORIGIN_COLUMN_LETTERS = "AJSAJS";
/**
* The row letters (for northing) of the lower left value, per
* set.
*
* {string} @private
*/
var SET_ORIGIN_ROW_LETTERS = "AFAFAF";
var A$1 = 65;
var I$1 = 73;
var O$1 = 79;
var V$1 = 86;
var Z$1 = 90;
var mgrs_default = {
	forward: forward$31,
	inverse: inverse$31,
	toPoint
};
/**
* Conversion of lat/lon to MGRS.
*
* @param {object} ll Object literal with lat and lon properties on a
*     WGS84 ellipsoid.
* @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
*      100 m, 2 for 1000 m or 1 for 10000 m). Optional, default is 5.
* @return {string} the MGRS string for the given location and accuracy.
*/
function forward$31(ll, accuracy) {
	accuracy = accuracy || 5;
	return encode(LLtoUTM({
		lat: ll[1],
		lon: ll[0]
	}), accuracy);
}
/**
* Conversion of MGRS to lat/lon.
*
* @param {string} mgrs MGRS string.
* @return {array} An array with left (longitude), bottom (latitude), right
*     (longitude) and top (latitude) values in WGS84, representing the
*     bounding box for the provided MGRS reference.
*/
function inverse$31(mgrs) {
	var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
	if (bbox.lat && bbox.lon) return [
		bbox.lon,
		bbox.lat,
		bbox.lon,
		bbox.lat
	];
	return [
		bbox.left,
		bbox.bottom,
		bbox.right,
		bbox.top
	];
}
function toPoint(mgrs) {
	var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
	if (bbox.lat && bbox.lon) return [bbox.lon, bbox.lat];
	return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
}
/**
* Conversion from degrees to radians.
*
* @private
* @param {number} deg the angle in degrees.
* @return {number} the angle in radians.
*/
function degToRad(deg) {
	return deg * (Math.PI / 180);
}
/**
* Conversion from radians to degrees.
*
* @private
* @param {number} rad the angle in radians.
* @return {number} the angle in degrees.
*/
function radToDeg(rad) {
	return 180 * (rad / Math.PI);
}
/**
* Converts a set of Longitude and Latitude co-ordinates to UTM
* using the WGS84 ellipsoid.
*
* @private
* @param {object} ll Object literal with lat and lon properties
*     representing the WGS84 coordinate to be converted.
* @return {object} Object literal containing the UTM value with easting,
*     northing, zoneNumber and zoneLetter properties, and an optional
*     accuracy property in digits. Returns null if the conversion failed.
*/
function LLtoUTM(ll) {
	var Lat = ll.lat;
	var Long = ll.lon;
	var a = 6378137;
	var eccSquared = .00669438;
	var k0 = .9996;
	var LongOrigin;
	var eccPrimeSquared;
	var N, T, C, A, M;
	var LatRad = degToRad(Lat);
	var LongRad = degToRad(Long);
	var LongOriginRad;
	var ZoneNumber = Math.floor((Long + 180) / 6) + 1;
	if (Long === 180) ZoneNumber = 60;
	if (Lat >= 56 && Lat < 64 && Long >= 3 && Long < 12) ZoneNumber = 32;
	if (Lat >= 72 && Lat < 84) {
		if (Long >= 0 && Long < 9) ZoneNumber = 31;
		else if (Long >= 9 && Long < 21) ZoneNumber = 33;
		else if (Long >= 21 && Long < 33) ZoneNumber = 35;
		else if (Long >= 33 && Long < 42) ZoneNumber = 37;
	}
	LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;
	LongOriginRad = degToRad(LongOrigin);
	eccPrimeSquared = eccSquared / (1 - eccSquared);
	N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
	T = Math.tan(LatRad) * Math.tan(LatRad);
	C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
	A = Math.cos(LatRad) * (LongRad - LongOriginRad);
	M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - 35 * eccSquared * eccSquared * eccSquared / 3072 * Math.sin(6 * LatRad));
	var UTMEasting = k0 * N * (A + (1 - T + C) * A * A * A / 6 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120) + 5e5;
	var UTMNorthing = k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720));
	if (Lat < 0) UTMNorthing += 1e7;
	return {
		northing: Math.round(UTMNorthing),
		easting: Math.round(UTMEasting),
		zoneNumber: ZoneNumber,
		zoneLetter: getLetterDesignator(Lat)
	};
}
/**
* Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
* class where the Zone can be specified as a single string eg."60N" which
* is then broken down into the ZoneNumber and ZoneLetter.
*
* @private
* @param {object} utm An object literal with northing, easting, zoneNumber
*     and zoneLetter properties. If an optional accuracy property is
*     provided (in meters), a bounding box will be returned instead of
*     latitude and longitude.
* @return {object} An object literal containing either lat and lon values
*     (if no accuracy was provided), or top, right, bottom and left values
*     for the bounding box calculated according to the provided accuracy.
*     Returns null if the conversion failed.
*/
function UTMtoLL(utm) {
	var UTMNorthing = utm.northing;
	var UTMEasting = utm.easting;
	var zoneLetter = utm.zoneLetter;
	var zoneNumber = utm.zoneNumber;
	if (zoneNumber < 0 || zoneNumber > 60) return null;
	var k0 = .9996;
	var a = 6378137;
	var eccSquared = .00669438;
	var eccPrimeSquared;
	var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
	var N1, T1, C1, R1, D, M;
	var LongOrigin;
	var mu, phi1Rad;
	var x = UTMEasting - 5e5;
	var y = UTMNorthing;
	if (zoneLetter < "N") y -= 1e7;
	LongOrigin = (zoneNumber - 1) * 6 - 180 + 3;
	eccPrimeSquared = eccSquared / (1 - eccSquared);
	M = y / k0;
	mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));
	phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + 151 * e1 * e1 * e1 / 96 * Math.sin(6 * mu);
	N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
	T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
	C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
	R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
	D = x / (N1 * k0);
	var lat = phi1Rad - N1 * Math.tan(phi1Rad) / R1 * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
	lat = radToDeg(lat);
	var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
	lon = LongOrigin + radToDeg(lon);
	var result;
	if (utm.accuracy) {
		var topRight = UTMtoLL({
			northing: utm.northing + utm.accuracy,
			easting: utm.easting + utm.accuracy,
			zoneLetter: utm.zoneLetter,
			zoneNumber: utm.zoneNumber
		});
		result = {
			top: topRight.lat,
			right: topRight.lon,
			bottom: lat,
			left: lon
		};
	} else result = {
		lat,
		lon
	};
	return result;
}
/**
* Calculates the MGRS letter designator for the given latitude.
*
* @private
* @param {number} lat The latitude in WGS84 to get the letter designator
*     for.
* @return {char} The letter designator.
*/
function getLetterDesignator(lat) {
	var LetterDesignator = "Z";
	if (84 >= lat && lat >= 72) LetterDesignator = "X";
	else if (72 > lat && lat >= 64) LetterDesignator = "W";
	else if (64 > lat && lat >= 56) LetterDesignator = "V";
	else if (56 > lat && lat >= 48) LetterDesignator = "U";
	else if (48 > lat && lat >= 40) LetterDesignator = "T";
	else if (40 > lat && lat >= 32) LetterDesignator = "S";
	else if (32 > lat && lat >= 24) LetterDesignator = "R";
	else if (24 > lat && lat >= 16) LetterDesignator = "Q";
	else if (16 > lat && lat >= 8) LetterDesignator = "P";
	else if (8 > lat && lat >= 0) LetterDesignator = "N";
	else if (0 > lat && lat >= -8) LetterDesignator = "M";
	else if (-8 > lat && lat >= -16) LetterDesignator = "L";
	else if (-16 > lat && lat >= -24) LetterDesignator = "K";
	else if (-24 > lat && lat >= -32) LetterDesignator = "J";
	else if (-32 > lat && lat >= -40) LetterDesignator = "H";
	else if (-40 > lat && lat >= -48) LetterDesignator = "G";
	else if (-48 > lat && lat >= -56) LetterDesignator = "F";
	else if (-56 > lat && lat >= -64) LetterDesignator = "E";
	else if (-64 > lat && lat >= -72) LetterDesignator = "D";
	else if (-72 > lat && lat >= -80) LetterDesignator = "C";
	return LetterDesignator;
}
/**
* Encodes a UTM location as MGRS string.
*
* @private
* @param {object} utm An object literal with easting, northing,
*     zoneLetter, zoneNumber
* @param {number} accuracy Accuracy in digits (1-5).
* @return {string} MGRS string for the given UTM location.
*/
function encode(utm, accuracy) {
	var seasting = "00000" + utm.easting, snorthing = "00000" + utm.northing;
	return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
}
/**
* Get the two letter 100k designator for a given UTM easting,
* northing and zone number value.
*
* @private
* @param {number} easting
* @param {number} northing
* @param {number} zoneNumber
* @return the two letter 100k designator for the given UTM location.
*/
function get100kID(easting, northing, zoneNumber) {
	var setParm = get100kSetForZone(zoneNumber);
	return getLetter100kID(Math.floor(easting / 1e5), Math.floor(northing / 1e5) % 20, setParm);
}
/**
* Given a UTM zone number, figure out the MGRS 100K set it is in.
*
* @private
* @param {number} i An UTM zone number.
* @return {number} the 100k set the UTM zone is in.
*/
function get100kSetForZone(i) {
	var setParm = i % NUM_100K_SETS;
	if (setParm === 0) setParm = NUM_100K_SETS;
	return setParm;
}
/**
* Get the two-letter MGRS 100k designator given information
* translated from the UTM northing, easting and zone number.
*
* @private
* @param {number} column the column index as it relates to the MGRS
*        100k set spreadsheet, created from the UTM easting.
*        Values are 1-8.
* @param {number} row the row index as it relates to the MGRS 100k set
*        spreadsheet, created from the UTM northing value. Values
*        are from 0-19.
* @param {number} parm the set block, as it relates to the MGRS 100k set
*        spreadsheet, created from the UTM zone. Values are from
*        1-60.
* @return two letter MGRS 100k code.
*/
function getLetter100kID(column, row, parm) {
	var index = parm - 1;
	var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
	var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);
	var colInt = colOrigin + column - 1;
	var rowInt = rowOrigin + row;
	var rollover = false;
	if (colInt > Z$1) {
		colInt = colInt - Z$1 + A$1 - 1;
		rollover = true;
	}
	if (colInt === I$1 || colOrigin < I$1 && colInt > I$1 || (colInt > I$1 || colOrigin < I$1) && rollover) colInt++;
	if (colInt === O$1 || colOrigin < O$1 && colInt > O$1 || (colInt > O$1 || colOrigin < O$1) && rollover) {
		colInt++;
		if (colInt === I$1) colInt++;
	}
	if (colInt > Z$1) colInt = colInt - Z$1 + A$1 - 1;
	if (rowInt > V$1) {
		rowInt = rowInt - V$1 + A$1 - 1;
		rollover = true;
	} else rollover = false;
	if (rowInt === I$1 || rowOrigin < I$1 && rowInt > I$1 || (rowInt > I$1 || rowOrigin < I$1) && rollover) rowInt++;
	if (rowInt === O$1 || rowOrigin < O$1 && rowInt > O$1 || (rowInt > O$1 || rowOrigin < O$1) && rollover) {
		rowInt++;
		if (rowInt === I$1) rowInt++;
	}
	if (rowInt > V$1) rowInt = rowInt - V$1 + A$1 - 1;
	return String.fromCharCode(colInt) + String.fromCharCode(rowInt);
}
/**
* Decode the UTM parameters from a MGRS string.
*
* @private
* @param {string} mgrsString an UPPERCASE coordinate string is expected.
* @return {object} An object literal with easting, northing, zoneLetter,
*     zoneNumber and accuracy (in meters) properties.
*/
function decode(mgrsString) {
	if (mgrsString && mgrsString.length === 0) throw "MGRSPoint coverting from nothing";
	var length = mgrsString.length;
	var hunK = null;
	var sb = "";
	var testChar;
	var i = 0;
	while (!/[A-Z]/.test(testChar = mgrsString.charAt(i))) {
		if (i >= 2) throw "MGRSPoint bad conversion from: " + mgrsString;
		sb += testChar;
		i++;
	}
	var zoneNumber = parseInt(sb, 10);
	if (i === 0 || i + 3 > length) throw "MGRSPoint bad conversion from: " + mgrsString;
	var zoneLetter = mgrsString.charAt(i++);
	if (zoneLetter <= "A" || zoneLetter === "B" || zoneLetter === "Y" || zoneLetter >= "Z" || zoneLetter === "I" || zoneLetter === "O") throw "MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString;
	hunK = mgrsString.substring(i, i += 2);
	var set = get100kSetForZone(zoneNumber);
	var east100k = getEastingFromChar(hunK.charAt(0), set);
	var north100k = getNorthingFromChar(hunK.charAt(1), set);
	while (north100k < getMinNorthing(zoneLetter)) north100k += 2e6;
	var remainder = length - i;
	if (remainder % 2 !== 0) throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString;
	var sep = remainder / 2;
	var sepEasting = 0;
	var sepNorthing = 0;
	var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
	if (sep > 0) {
		accuracyBonus = 1e5 / Math.pow(10, sep);
		sepEastingString = mgrsString.substring(i, i + sep);
		sepEasting = parseFloat(sepEastingString) * accuracyBonus;
		sepNorthingString = mgrsString.substring(i + sep);
		sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
	}
	easting = sepEasting + east100k;
	northing = sepNorthing + north100k;
	return {
		easting,
		northing,
		zoneLetter,
		zoneNumber,
		accuracy: accuracyBonus
	};
}
/**
* Given the first letter from a two-letter MGRS 100k zone, and given the
* MGRS table set for the zone number, figure out the easting value that
* should be added to the other, secondary easting value.
*
* @private
* @param {char} e The first letter from a two-letter MGRS 100´k zone.
* @param {number} set The MGRS table set for the zone number.
* @return {number} The easting value for the given letter and set.
*/
function getEastingFromChar(e, set) {
	var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
	var eastingValue = 1e5;
	var rewindMarker = false;
	while (curCol !== e.charCodeAt(0)) {
		curCol++;
		if (curCol === I$1) curCol++;
		if (curCol === O$1) curCol++;
		if (curCol > Z$1) {
			if (rewindMarker) throw "Bad character: " + e;
			curCol = A$1;
			rewindMarker = true;
		}
		eastingValue += 1e5;
	}
	return eastingValue;
}
/**
* Given the second letter from a two-letter MGRS 100k zone, and given the
* MGRS table set for the zone number, figure out the northing value that
* should be added to the other, secondary northing value. You have to
* remember that Northings are determined from the equator, and the vertical
* cycle of letters mean a 2000000 additional northing meters. This happens
* approx. every 18 degrees of latitude. This method does *NOT* count any
* additional northings. You have to figure out how many 2000000 meters need
* to be added for the zone letter of the MGRS coordinate.
*
* @private
* @param {char} n Second letter of the MGRS 100k zone
* @param {number} set The MGRS table set number, which is dependent on the
*     UTM zone number.
* @return {number} The northing value for the given letter and set.
*/
function getNorthingFromChar(n, set) {
	if (n > "V") throw "MGRSPoint given invalid Northing " + n;
	var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
	var northingValue = 0;
	var rewindMarker = false;
	while (curRow !== n.charCodeAt(0)) {
		curRow++;
		if (curRow === I$1) curRow++;
		if (curRow === O$1) curRow++;
		if (curRow > V$1) {
			if (rewindMarker) throw "Bad character: " + n;
			curRow = A$1;
			rewindMarker = true;
		}
		northingValue += 1e5;
	}
	return northingValue;
}
/**
* The function getMinNorthing returns the minimum northing value of a MGRS
* zone.
*
* Ported from Geotrans' c Lattitude_Band_Value structure table.
*
* @private
* @param {char} zoneLetter The MGRS zone to get the min northing for.
* @return {number}
*/
function getMinNorthing(zoneLetter) {
	var northing;
	switch (zoneLetter) {
		case "C":
			northing = 11e5;
			break;
		case "D":
			northing = 2e6;
			break;
		case "E":
			northing = 28e5;
			break;
		case "F":
			northing = 37e5;
			break;
		case "G":
			northing = 46e5;
			break;
		case "H":
			northing = 55e5;
			break;
		case "J":
			northing = 64e5;
			break;
		case "K":
			northing = 73e5;
			break;
		case "L":
			northing = 82e5;
			break;
		case "M":
			northing = 91e5;
			break;
		case "N":
			northing = 0;
			break;
		case "P":
			northing = 8e5;
			break;
		case "Q":
			northing = 17e5;
			break;
		case "R":
			northing = 26e5;
			break;
		case "S":
			northing = 35e5;
			break;
		case "T":
			northing = 44e5;
			break;
		case "U":
			northing = 53e5;
			break;
		case "V":
			northing = 62e5;
			break;
		case "W":
			northing = 7e6;
			break;
		case "X":
			northing = 79e5;
			break;
		default: northing = -1;
	}
	if (northing >= 0) return northing;
	else throw "Invalid zone letter: " + zoneLetter;
}
//#endregion
//#region node_modules/proj4/lib/Point.js
/**
* @deprecated v3.0.0 - use proj4.toPoint instead
* @param {number | import('./core').TemplateCoordinates | string} x
* @param {number} [y]
* @param {number} [z]
*/
function Point(x, y, z) {
	if (!(this instanceof Point)) return new Point(x, y, z);
	if (Array.isArray(x)) {
		this.x = x[0];
		this.y = x[1];
		this.z = x[2] || 0;
	} else if (typeof x === "object") {
		this.x = x.x;
		this.y = x.y;
		this.z = x.z || 0;
	} else if (typeof x === "string" && typeof y === "undefined") {
		var coords = x.split(",");
		this.x = parseFloat(coords[0]);
		this.y = parseFloat(coords[1]);
		this.z = parseFloat(coords[2]) || 0;
	} else {
		this.x = x;
		this.y = y;
		this.z = z || 0;
	}
	console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
}
Point.fromMGRS = function(mgrsStr) {
	return new Point(toPoint(mgrsStr));
};
Point.prototype.toMGRS = function(accuracy) {
	return forward$31([this.x, this.y], accuracy);
};
//#endregion
//#region node_modules/proj4/lib/common/pj_enfn.js
var C00 = 1;
var C02 = .25;
var C04 = .046875;
var C06 = .01953125;
var C08 = .01068115234375;
var C22 = .75;
var C44 = .46875;
var C46 = .013020833333333334;
var C48 = .007120768229166667;
var C66 = .3645833333333333;
var C68 = .005696614583333333;
var C88 = .3076171875;
function pj_enfn_default(es) {
	var en = [];
	en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
	en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
	var t = es * es;
	en[2] = t * (C44 - es * (C46 + es * C48));
	t *= es;
	en[3] = t * (C66 - es * C68);
	en[4] = t * es * C88;
	return en;
}
//#endregion
//#region node_modules/proj4/lib/common/pj_mlfn.js
function pj_mlfn_default(phi, sphi, cphi, en) {
	cphi *= sphi;
	sphi *= sphi;
	return en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4])));
}
//#endregion
//#region node_modules/proj4/lib/common/pj_inv_mlfn.js
var MAX_ITER$3 = 20;
function pj_inv_mlfn_default(arg, es, en) {
	var k = 1 / (1 - es);
	var phi = arg;
	for (var i = MAX_ITER$3; i; --i) {
		var s = Math.sin(phi);
		var t = 1 - es * s * s;
		t = (pj_mlfn_default(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
		phi -= t;
		if (Math.abs(t) < 1e-10) return phi;
	}
	return phi;
}
//#endregion
//#region node_modules/proj4/lib/projections/tmerc.js
/**
* @typedef {Object} LocalThis
* @property {number} es
* @property {Array<number>} en
* @property {number} ml0
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$32() {
	this.x0 = this.x0 !== void 0 ? this.x0 : 0;
	this.y0 = this.y0 !== void 0 ? this.y0 : 0;
	this.long0 = this.long0 !== void 0 ? this.long0 : 0;
	this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0;
	if (this.es) {
		this.en = pj_enfn_default(this.es);
		this.ml0 = pj_mlfn_default(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
	}
}
/**
Transverse Mercator Forward  - long/lat to x/y
long/lat in radians
*/
function forward$30(p) {
	var lon = p.x;
	var lat = p.y;
	var delta_lon = adjust_lon_default(lon - this.long0, this.over);
	var con;
	var x, y;
	var sin_phi = Math.sin(lat);
	var cos_phi = Math.cos(lat);
	if (!this.es) {
		var b = cos_phi * Math.sin(delta_lon);
		if (Math.abs(Math.abs(b) - 1) < 1e-10) return 93;
		else {
			x = .5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
			y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
			b = Math.abs(y);
			if (b >= 1) if (b - 1 > 1e-10) return 93;
			else y = 0;
			else y = Math.acos(y);
			if (lat < 0) y = -y;
			y = this.a * this.k0 * (y - this.lat0) + this.y0;
		}
	} else {
		var al = cos_phi * delta_lon;
		var als = Math.pow(al, 2);
		var c = this.ep2 * Math.pow(cos_phi, 2);
		var cs = Math.pow(c, 2);
		var t = Math.pow(Math.abs(cos_phi) > 1e-10 ? Math.tan(lat) : 0, 2);
		var ts = Math.pow(t, 2);
		con = 1 - this.es * Math.pow(sin_phi, 2);
		al = al / Math.sqrt(con);
		var ml = pj_mlfn_default(lat, sin_phi, cos_phi, this.en);
		x = this.a * (this.k0 * al * (1 + als / 6 * (1 - t + c + als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c + als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) + this.x0;
		y = this.a * (this.k0 * (ml - this.ml0 + sin_phi * delta_lon * al / 2 * (1 + als / 12 * (5 - t + 9 * c + 4 * cs + als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c + als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) + this.y0;
	}
	p.x = x;
	p.y = y;
	return p;
}
/**
Transverse Mercator Inverse  -  x/y to long/lat
*/
function inverse$30(p) {
	var con, phi;
	var lat, lon;
	var x = (p.x - this.x0) * (1 / this.a);
	var y = (p.y - this.y0) * (1 / this.a);
	if (!this.es) {
		var f = Math.exp(x / this.k0);
		var g = .5 * (f - 1 / f);
		var temp = this.lat0 + y / this.k0;
		var h = Math.cos(temp);
		con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
		lat = Math.asin(con);
		if (y < 0) lat = -lat;
		if (g === 0 && h === 0) lon = 0;
		else lon = adjust_lon_default(Math.atan2(g, h) + this.long0, this.over);
	} else {
		con = this.ml0 + y / this.k0;
		phi = pj_inv_mlfn_default(con, this.es, this.en);
		if (Math.abs(phi) < HALF_PI) {
			var sin_phi = Math.sin(phi);
			var cos_phi = Math.cos(phi);
			var tan_phi = Math.abs(cos_phi) > 1e-10 ? Math.tan(phi) : 0;
			var c = this.ep2 * Math.pow(cos_phi, 2);
			var cs = Math.pow(c, 2);
			var t = Math.pow(tan_phi, 2);
			var ts = Math.pow(t, 2);
			con = 1 - this.es * Math.pow(sin_phi, 2);
			var d = x * Math.sqrt(con) / this.k0;
			var ds = Math.pow(d, 2);
			con = con * tan_phi;
			lat = phi - con * ds / (1 - this.es) * .5 * (1 - ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs - ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c - ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));
			lon = adjust_lon_default(this.long0 + d * (1 - ds / 6 * (1 + 2 * t + c - ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c - ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi, this.over);
		} else {
			lat = HALF_PI * sign_default(y);
			lon = 0;
		}
	}
	p.x = lon;
	p.y = lat;
	return p;
}
var tmerc_default = {
	init: init$32,
	forward: forward$30,
	inverse: inverse$30,
	names: ["Fast_Transverse_Mercator", "Fast Transverse Mercator"]
};
//#endregion
//#region node_modules/proj4/lib/common/sinh.js
function sinh_default(x) {
	var r = Math.exp(x);
	r = (r - 1 / r) / 2;
	return r;
}
//#endregion
//#region node_modules/proj4/lib/common/hypot.js
function hypot_default(x, y) {
	x = Math.abs(x);
	y = Math.abs(y);
	var a = Math.max(x, y);
	var b = Math.min(x, y) / (a ? a : 1);
	return a * Math.sqrt(1 + Math.pow(b, 2));
}
//#endregion
//#region node_modules/proj4/lib/common/log1py.js
function log1py_default(x) {
	var y = 1 + x;
	var z = y - 1;
	return z === 0 ? x : x * Math.log(y) / z;
}
//#endregion
//#region node_modules/proj4/lib/common/asinhy.js
function asinhy_default(x) {
	var y = Math.abs(x);
	y = log1py_default(y * (1 + y / (hypot_default(1, y) + 1)));
	return x < 0 ? -y : y;
}
//#endregion
//#region node_modules/proj4/lib/common/gatg.js
function gatg_default(pp, B) {
	var cos_2B = 2 * Math.cos(2 * B);
	var i = pp.length - 1;
	var h1 = pp[i];
	var h2 = 0;
	var h;
	while (--i >= 0) {
		h = -h2 + cos_2B * h1 + pp[i];
		h2 = h1;
		h1 = h;
	}
	return B + h * Math.sin(2 * B);
}
//#endregion
//#region node_modules/proj4/lib/common/clens.js
function clens_default(pp, arg_r) {
	var r = 2 * Math.cos(arg_r);
	var i = pp.length - 1;
	var hr1 = pp[i];
	var hr2 = 0;
	var hr;
	while (--i >= 0) {
		hr = -hr2 + r * hr1 + pp[i];
		hr2 = hr1;
		hr1 = hr;
	}
	return Math.sin(arg_r) * hr;
}
//#endregion
//#region node_modules/proj4/lib/common/cosh.js
function cosh_default(x) {
	var r = Math.exp(x);
	r = (r + 1 / r) / 2;
	return r;
}
//#endregion
//#region node_modules/proj4/lib/common/clens_cmplx.js
function clens_cmplx_default(pp, arg_r, arg_i) {
	var sin_arg_r = Math.sin(arg_r);
	var cos_arg_r = Math.cos(arg_r);
	var sinh_arg_i = sinh_default(arg_i);
	var cosh_arg_i = cosh_default(arg_i);
	var r = 2 * cos_arg_r * cosh_arg_i;
	var i = -2 * sin_arg_r * sinh_arg_i;
	var j = pp.length - 1;
	var hr = pp[j];
	var hi1 = 0;
	var hr1 = 0;
	var hi = 0;
	var hr2;
	var hi2;
	while (--j >= 0) {
		hr2 = hr1;
		hi2 = hi1;
		hr1 = hr;
		hi1 = hi;
		hr = -hr2 + r * hr1 - i * hi1 + pp[j];
		hi = -hi2 + i * hr1 + r * hi1;
	}
	r = sin_arg_r * cosh_arg_i;
	i = cos_arg_r * sinh_arg_i;
	return [r * hr - i * hi, r * hi + i * hr];
}
//#endregion
//#region node_modules/proj4/lib/projections/etmerc.js
/**
* @typedef {Object} LocalThis
* @property {number} es
* @property {Array<number>} cbg
* @property {Array<number>} cgb
* @property {Array<number>} utg
* @property {Array<number>} gtu
* @property {number} Qn
* @property {number} Zb
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$31() {
	if (!this.approx && (isNaN(this.es) || this.es <= 0)) throw new Error("Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION[\"Fast_Transverse_Mercator\"] in the WKT.");
	if (this.approx) {
		tmerc_default.init.apply(this);
		this.forward = tmerc_default.forward;
		this.inverse = tmerc_default.inverse;
	}
	this.x0 = this.x0 !== void 0 ? this.x0 : 0;
	this.y0 = this.y0 !== void 0 ? this.y0 : 0;
	this.long0 = this.long0 !== void 0 ? this.long0 : 0;
	this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0;
	this.cgb = [];
	this.cbg = [];
	this.utg = [];
	this.gtu = [];
	var f = this.es / (1 + Math.sqrt(1 - this.es));
	var n = f / (2 - f);
	var np = n;
	this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675))))));
	this.cbg[0] = n * (-2 + n * (2 / 3 + n * (4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));
	np = np * n;
	this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
	this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * (-13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));
	np = np * n;
	this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
	this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));
	np = np * n;
	this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
	this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * (-24832 / 14175)));
	np = np * n;
	this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
	this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));
	np = np * n;
	this.cgb[5] = np * (601676 / 22275);
	this.cbg[5] = np * (444337 / 155925);
	np = Math.pow(n, 2);
	this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));
	this.utg[0] = n * (-.5 + n * (2 / 3 + n * (-37 / 96 + n * (1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
	this.gtu[0] = n * (.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));
	this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
	this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));
	np = np * n;
	this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720))));
	this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));
	np = np * n;
	this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
	this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));
	np = np * n;
	this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
	this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));
	np = np * n;
	this.utg[5] = np * (-20648693 / 638668800);
	this.gtu[5] = np * (212378941 / 319334400);
	var Z = gatg_default(this.cbg, this.lat0);
	this.Zb = -this.Qn * (Z + clens_default(this.gtu, 2 * Z));
}
function forward$29(p) {
	var Ce = adjust_lon_default(p.x - this.long0, this.over);
	var Cn = p.y;
	Cn = gatg_default(this.cbg, Cn);
	var sin_Cn = Math.sin(Cn);
	var cos_Cn = Math.cos(Cn);
	var sin_Ce = Math.sin(Ce);
	var cos_Ce = Math.cos(Ce);
	Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
	Ce = Math.atan2(sin_Ce * cos_Cn, hypot_default(sin_Cn, cos_Cn * cos_Ce));
	Ce = asinhy_default(Math.tan(Ce));
	var tmp = clens_cmplx_default(this.gtu, 2 * Cn, 2 * Ce);
	Cn = Cn + tmp[0];
	Ce = Ce + tmp[1];
	var x;
	var y;
	if (Math.abs(Ce) <= 2.623395162778) {
		x = this.a * (this.Qn * Ce) + this.x0;
		y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
	} else {
		x = Infinity;
		y = Infinity;
	}
	p.x = x;
	p.y = y;
	return p;
}
function inverse$29(p) {
	var Ce = (p.x - this.x0) * (1 / this.a);
	var Cn = (p.y - this.y0) * (1 / this.a);
	Cn = (Cn - this.Zb) / this.Qn;
	Ce = Ce / this.Qn;
	var lon;
	var lat;
	if (Math.abs(Ce) <= 2.623395162778) {
		var tmp = clens_cmplx_default(this.utg, 2 * Cn, 2 * Ce);
		Cn = Cn + tmp[0];
		Ce = Ce + tmp[1];
		Ce = Math.atan(sinh_default(Ce));
		var sin_Cn = Math.sin(Cn);
		var cos_Cn = Math.cos(Cn);
		var sin_Ce = Math.sin(Ce);
		var cos_Ce = Math.cos(Ce);
		Cn = Math.atan2(sin_Cn * cos_Ce, hypot_default(sin_Ce, cos_Ce * cos_Cn));
		Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);
		lon = adjust_lon_default(Ce + this.long0, this.over);
		lat = gatg_default(this.cgb, Cn);
	} else {
		lon = Infinity;
		lat = Infinity;
	}
	p.x = lon;
	p.y = lat;
	return p;
}
var etmerc_default = {
	init: init$31,
	forward: forward$29,
	inverse: inverse$29,
	names: [
		"Extended_Transverse_Mercator",
		"Extended Transverse Mercator",
		"etmerc",
		"Transverse_Mercator",
		"Transverse Mercator",
		"Gauss Kruger",
		"Gauss_Kruger",
		"tmerc"
	]
};
//#endregion
//#region node_modules/proj4/lib/common/adjust_zone.js
function adjust_zone_default(zone, lon) {
	if (zone === void 0) {
		zone = Math.floor((adjust_lon_default(lon) + Math.PI) * 30 / Math.PI) + 1;
		if (zone < 0) return 0;
		else if (zone > 60) return 60;
	}
	return zone;
}
//#endregion
//#region node_modules/proj4/lib/projections/utm.js
var dependsOn = "etmerc";
/** @this {import('../defs.js').ProjectionDefinition} */
function init$30() {
	var zone = adjust_zone_default(this.zone, this.long0);
	if (zone === void 0) throw new Error("unknown utm zone");
	this.lat0 = 0;
	this.long0 = (6 * Math.abs(zone) - 183) * D2R$1;
	this.x0 = 5e5;
	this.y0 = this.utmSouth ? 1e7 : 0;
	this.k0 = .9996;
	etmerc_default.init.apply(this);
	this.forward = etmerc_default.forward;
	this.inverse = etmerc_default.inverse;
}
var utm_default = {
	init: init$30,
	names: ["Universal Transverse Mercator System", "utm"],
	dependsOn
};
//#endregion
//#region node_modules/proj4/lib/common/srat.js
function srat_default(esinp, exp) {
	return Math.pow((1 - esinp) / (1 + esinp), exp);
}
//#endregion
//#region node_modules/proj4/lib/projections/gauss.js
var MAX_ITER$2 = 20;
/**
* @typedef {Object} LocalThis
* @property {number} rc
* @property {number} C
* @property {number} phic0
* @property {number} ratexp
* @property {number} K
* @property {number} e
* @property {number} es
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$29() {
	var sphi = Math.sin(this.lat0);
	var cphi = Math.cos(this.lat0);
	cphi *= cphi;
	this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
	this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
	this.phic0 = Math.asin(sphi / this.C);
	this.ratexp = .5 * this.C * this.e;
	this.K = Math.tan(.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(.5 * this.lat0 + FORTPI), this.C) * srat_default(this.e * sphi, this.ratexp));
}
function forward$28(p) {
	var lon = p.x;
	var lat = p.y;
	p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(.5 * lat + FORTPI), this.C) * srat_default(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
	p.x = this.C * lon;
	return p;
}
function inverse$28(p) {
	var DEL_TOL = 1e-14;
	var lon = p.x / this.C;
	var lat = p.y;
	var num = Math.pow(Math.tan(.5 * lat + FORTPI) / this.K, 1 / this.C);
	for (var i = MAX_ITER$2; i > 0; --i) {
		lat = 2 * Math.atan(num * srat_default(this.e * Math.sin(p.y), -.5 * this.e)) - HALF_PI;
		if (Math.abs(lat - p.y) < DEL_TOL) break;
		p.y = lat;
	}
	if (!i) return null;
	p.x = lon;
	p.y = lat;
	return p;
}
var gauss_default = {
	init: init$29,
	forward: forward$28,
	inverse: inverse$28,
	names: ["gauss"]
};
//#endregion
//#region node_modules/proj4/lib/projections/sterea.js
/**
* @typedef {Object} LocalThis
* @property {number} sinc0
* @property {number} cosc0
* @property {number} R2
* @property {number} rc
* @property {number} phic0
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$28() {
	gauss_default.init.apply(this);
	if (!this.rc) return;
	this.sinc0 = Math.sin(this.phic0);
	this.cosc0 = Math.cos(this.phic0);
	this.R2 = 2 * this.rc;
	if (!this.title) this.title = "Oblique Stereographic Alternative";
}
function forward$27(p) {
	var sinc, cosc, cosl, k;
	p.x = adjust_lon_default(p.x - this.long0, this.over);
	gauss_default.forward.apply(this, [p]);
	sinc = Math.sin(p.y);
	cosc = Math.cos(p.y);
	cosl = Math.cos(p.x);
	k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
	p.x = k * cosc * Math.sin(p.x);
	p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
	p.x = this.a * p.x + this.x0;
	p.y = this.a * p.y + this.y0;
	return p;
}
function inverse$27(p) {
	var sinc, cosc, lon, lat, rho;
	p.x = (p.x - this.x0) / this.a;
	p.y = (p.y - this.y0) / this.a;
	p.x /= this.k0;
	p.y /= this.k0;
	if (rho = hypot_default(p.x, p.y)) {
		var c = 2 * Math.atan2(rho, this.R2);
		sinc = Math.sin(c);
		cosc = Math.cos(c);
		lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
		lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
	} else {
		lat = this.phic0;
		lon = 0;
	}
	p.x = lon;
	p.y = lat;
	gauss_default.inverse.apply(this, [p]);
	p.x = adjust_lon_default(p.x + this.long0, this.over);
	return p;
}
var sterea_default = {
	init: init$28,
	forward: forward$27,
	inverse: inverse$27,
	names: [
		"Stereographic_North_Pole",
		"Oblique_Stereographic",
		"sterea",
		"Oblique Stereographic Alternative",
		"Double_Stereographic"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/stere.js
/**
* @typedef {Object} LocalThis
* @property {number} coslat0
* @property {number} sinlat0
* @property {number} ms1
* @property {number} X0
* @property {number} cosX0
* @property {number} sinX0
* @property {number} con
* @property {number} cons
* @property {number} e
*/
function ssfn_(phit, sinphi, eccen) {
	sinphi *= eccen;
	return Math.tan(.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), .5 * eccen);
}
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$27() {
	this.x0 = this.x0 || 0;
	this.y0 = this.y0 || 0;
	this.lat0 = this.lat0 || 0;
	this.long0 = this.long0 || 0;
	this.coslat0 = Math.cos(this.lat0);
	this.sinlat0 = Math.sin(this.lat0);
	if (this.sphere) {
		if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= 1e-10) this.k0 = .5 * (1 + sign_default(this.lat0) * Math.sin(this.lat_ts));
	} else {
		if (Math.abs(this.coslat0) <= 1e-10) if (this.lat0 > 0) this.con = 1;
		else this.con = -1;
		this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
		if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= 1e-10 && Math.abs(Math.cos(this.lat_ts)) > 1e-10) this.k0 = .5 * this.cons * msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz_default(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
		this.ms1 = msfnz_default(this.e, this.sinlat0, this.coslat0);
		this.X0 = 2 * Math.atan(ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
		this.cosX0 = Math.cos(this.X0);
		this.sinX0 = Math.sin(this.X0);
	}
}
function forward$26(p) {
	var lon = p.x;
	var lat = p.y;
	var sinlat = Math.sin(lat);
	var coslat = Math.cos(lat);
	var A, X, sinX, cosX, ts, rh;
	var dlon = adjust_lon_default(lon - this.long0, this.over);
	if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= 1e-10 && Math.abs(lat + this.lat0) <= 1e-10) {
		p.x = NaN;
		p.y = NaN;
		return p;
	}
	if (this.sphere) {
		A = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
		p.x = this.a * A * coslat * Math.sin(dlon) + this.x0;
		p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
		return p;
	} else {
		X = 2 * Math.atan(ssfn_(lat, sinlat, this.e)) - HALF_PI;
		cosX = Math.cos(X);
		sinX = Math.sin(X);
		if (Math.abs(this.coslat0) <= 1e-10) {
			ts = tsfnz_default(this.e, lat * this.con, this.con * sinlat);
			rh = 2 * this.a * this.k0 * ts / this.cons;
			p.x = this.x0 + rh * Math.sin(lon - this.long0);
			p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
			return p;
		} else if (Math.abs(this.sinlat0) < 1e-10) {
			A = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
			p.y = A * sinX;
		} else {
			A = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
			p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
		}
		p.x = A * cosX * Math.sin(dlon) + this.x0;
	}
	return p;
}
function inverse$26(p) {
	p.x -= this.x0;
	p.y -= this.y0;
	var lon, lat, ts, ce, Chi;
	var rh = Math.sqrt(p.x * p.x + p.y * p.y);
	if (this.sphere) {
		var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
		lon = this.long0;
		lat = this.lat0;
		if (rh <= 1e-10) {
			p.x = lon;
			p.y = lat;
			return p;
		}
		lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
		if (Math.abs(this.coslat0) < 1e-10) if (this.lat0 > 0) lon = adjust_lon_default(this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
		else lon = adjust_lon_default(this.long0 + Math.atan2(p.x, p.y), this.over);
		else lon = adjust_lon_default(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)), this.over);
		p.x = lon;
		p.y = lat;
		return p;
	} else if (Math.abs(this.coslat0) <= 1e-10) {
		if (rh <= 1e-10) {
			lat = this.lat0;
			lon = this.long0;
			p.x = lon;
			p.y = lat;
			return p;
		}
		p.x *= this.con;
		p.y *= this.con;
		ts = rh * this.cons / (2 * this.a * this.k0);
		lat = this.con * phi2z_default(this.e, ts);
		lon = this.con * adjust_lon_default(this.con * this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
	} else {
		ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
		lon = this.long0;
		if (rh <= 1e-10) Chi = this.X0;
		else {
			Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
			lon = adjust_lon_default(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)), this.over);
		}
		lat = -1 * phi2z_default(this.e, Math.tan(.5 * (HALF_PI + Chi)));
	}
	p.x = lon;
	p.y = lat;
	return p;
}
var stere_default = {
	init: init$27,
	forward: forward$26,
	inverse: inverse$26,
	names: [
		"stere",
		"Stereographic_South_Pole",
		"Polar_Stereographic_variant_A",
		"Polar_Stereographic_variant_B",
		"Polar_Stereographic"
	],
	ssfn_
};
//#endregion
//#region node_modules/proj4/lib/projections/somerc.js
/**
* @typedef {Object} LocalThis
* @property {number} lambda0
* @property {number} e
* @property {number} R
* @property {number} b0
* @property {number} K
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$26() {
	var phy0 = this.lat0;
	this.lambda0 = this.long0;
	var sinPhy0 = Math.sin(phy0);
	var semiMajorAxis = this.a;
	var flattening = 1 / this.rf;
	var e2 = 2 * flattening - Math.pow(flattening, 2);
	var e = this.e = Math.sqrt(e2);
	this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
	this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
	this.b0 = Math.asin(sinPhy0 / this.alpha);
	var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
	var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
	var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
	this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
}
function forward$25(p) {
	var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
	var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
	var S = -this.alpha * (Sa1 + Sa2) + this.K;
	var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);
	var I = this.alpha * (p.x - this.lambda0);
	var rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I)));
	var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I));
	p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
	p.x = this.R * rotI + this.x0;
	return p;
}
function inverse$25(p) {
	var Y = p.x - this.x0;
	var X = p.y - this.y0;
	var rotI = Y / this.R;
	var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);
	var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
	var I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));
	var lambda = this.lambda0 + I / this.alpha;
	var S = 0;
	var phy = b;
	var prevPhy = -1e3;
	var iteration = 0;
	while (Math.abs(phy - prevPhy) > 1e-7) {
		if (++iteration > 20) return;
		S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
		prevPhy = phy;
		phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
	}
	p.x = lambda;
	p.y = phy;
	return p;
}
var somerc_default = {
	init: init$26,
	forward: forward$25,
	inverse: inverse$25,
	names: ["somerc"]
};
//#endregion
//#region node_modules/proj4/lib/projections/omerc.js
/**
* @typedef {Object} LocalThis
* @property {boolean} no_off
* @property {boolean} no_rot
* @property {number} rectified_grid_angle
* @property {number} es
* @property {number} A
* @property {number} B
* @property {number} E
* @property {number} e
* @property {number} lam0
* @property {number} singam
* @property {number} cosgam
* @property {number} sinrot
* @property {number} cosrot
* @property {number} rB
* @property {number} ArB
* @property {number} BrA
* @property {number} u_0
* @property {number} v_pole_n
* @property {number} v_pole_s
*/
var TOL = 1e-7;
function isTypeA(P) {
	var typeAProjections = [
		"Hotine_Oblique_Mercator",
		"Hotine_Oblique_Mercator_variant_A",
		"Hotine_Oblique_Mercator_Azimuth_Natural_Origin"
	];
	var projectionName = typeof P.projName === "object" ? Object.keys(P.projName)[0] : P.projName;
	return "no_uoff" in P || "no_off" in P || typeAProjections.indexOf(projectionName) !== -1 || typeAProjections.indexOf(getNormalizedProjName(projectionName)) !== -1;
}
/**
* Initialize the Oblique Mercator  projection
* @this {import('../defs.js').ProjectionDefinition & LocalThis}
*/
function init$25() {
	var con, com, cosph0, D, F, H, L, sinph0, p, J, gamma = 0, gamma0, lamc = 0, lam1 = 0, lam2 = 0, phi1 = 0, phi2 = 0, alpha_c = 0;
	this.no_off = isTypeA(this);
	this.no_rot = "no_rot" in this;
	var alp = false;
	if ("alpha" in this) alp = true;
	var gam = false;
	if ("rectified_grid_angle" in this) gam = true;
	if (alp) alpha_c = this.alpha;
	if (gam) gamma = this.rectified_grid_angle;
	if (alp || gam) lamc = this.longc;
	else {
		lam1 = this.long1;
		phi1 = this.lat1;
		lam2 = this.long2;
		phi2 = this.lat2;
		if (Math.abs(phi1 - phi2) <= TOL || (con = Math.abs(phi1)) <= TOL || Math.abs(con - HALF_PI) <= TOL || Math.abs(Math.abs(this.lat0) - HALF_PI) <= TOL || Math.abs(Math.abs(phi2) - HALF_PI) <= TOL) throw new Error();
	}
	var one_es = 1 - this.es;
	com = Math.sqrt(one_es);
	if (Math.abs(this.lat0) > 1e-10) {
		sinph0 = Math.sin(this.lat0);
		cosph0 = Math.cos(this.lat0);
		con = 1 - this.es * sinph0 * sinph0;
		this.B = cosph0 * cosph0;
		this.B = Math.sqrt(1 + this.es * this.B * this.B / one_es);
		this.A = this.B * this.k0 * com / con;
		D = this.B * com / (cosph0 * Math.sqrt(con));
		F = D * D - 1;
		if (F <= 0) F = 0;
		else {
			F = Math.sqrt(F);
			if (this.lat0 < 0) F = -F;
		}
		this.E = F += D;
		this.E *= Math.pow(tsfnz_default(this.e, this.lat0, sinph0), this.B);
	} else {
		this.B = 1 / com;
		this.A = this.k0;
		this.E = D = F = 1;
	}
	if (alp || gam) {
		if (alp) {
			gamma0 = Math.asin(Math.sin(alpha_c) / D);
			if (!gam) gamma = alpha_c;
		} else {
			gamma0 = gamma;
			alpha_c = Math.asin(D * Math.sin(gamma0));
		}
		this.lam0 = lamc - Math.asin(.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B;
	} else {
		H = Math.pow(tsfnz_default(this.e, phi1, Math.sin(phi1)), this.B);
		L = Math.pow(tsfnz_default(this.e, phi2, Math.sin(phi2)), this.B);
		F = this.E / H;
		p = (L - H) / (L + H);
		J = this.E * this.E;
		J = (J - L * H) / (J + L * H);
		con = lam1 - lam2;
		if (con < -Math.PI) lam2 -= TWO_PI;
		else if (con > Math.PI) lam2 += TWO_PI;
		this.lam0 = adjust_lon_default(.5 * (lam1 + lam2) - Math.atan(J * Math.tan(.5 * this.B * (lam1 - lam2)) / p) / this.B, this.over);
		gamma0 = Math.atan(2 * Math.sin(this.B * adjust_lon_default(lam1 - this.lam0, this.over)) / (F - 1 / F));
		gamma = alpha_c = Math.asin(D * Math.sin(gamma0));
	}
	this.singam = Math.sin(gamma0);
	this.cosgam = Math.cos(gamma0);
	this.sinrot = Math.sin(gamma);
	this.cosrot = Math.cos(gamma);
	this.rB = 1 / this.B;
	this.ArB = this.A * this.rB;
	this.BrA = 1 / this.ArB;
	if (this.no_off) this.u_0 = 0;
	else {
		this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D * D - 1) / Math.cos(alpha_c)));
		if (this.lat0 < 0) this.u_0 = -this.u_0;
	}
	F = .5 * gamma0;
	this.v_pole_n = this.ArB * Math.log(Math.tan(FORTPI - F));
	this.v_pole_s = this.ArB * Math.log(Math.tan(FORTPI + F));
}
function forward$24(p) {
	var coords = {};
	var S, T, U, V, W, temp, u, v;
	p.x = p.x - this.lam0;
	if (Math.abs(Math.abs(p.y) - HALF_PI) > 1e-10) {
		W = this.E / Math.pow(tsfnz_default(this.e, p.y, Math.sin(p.y)), this.B);
		temp = 1 / W;
		S = .5 * (W - temp);
		T = .5 * (W + temp);
		V = Math.sin(this.B * p.x);
		U = (S * this.singam - V * this.cosgam) / T;
		if (Math.abs(Math.abs(U) - 1) < 1e-10) throw new Error();
		v = .5 * this.ArB * Math.log((1 - U) / (1 + U));
		temp = Math.cos(this.B * p.x);
		if (Math.abs(temp) < TOL) u = this.A * p.x;
		else u = this.ArB * Math.atan2(S * this.cosgam + V * this.singam, temp);
	} else {
		v = p.y > 0 ? this.v_pole_n : this.v_pole_s;
		u = this.ArB * p.y;
	}
	if (this.no_rot) {
		coords.x = u;
		coords.y = v;
	} else {
		u -= this.u_0;
		coords.x = v * this.cosrot + u * this.sinrot;
		coords.y = u * this.cosrot - v * this.sinrot;
	}
	coords.x = this.a * coords.x + this.x0;
	coords.y = this.a * coords.y + this.y0;
	return coords;
}
function inverse$24(p) {
	var u, v, Qp, Sp, Tp, Vp, Up;
	var coords = {};
	p.x = (p.x - this.x0) * (1 / this.a);
	p.y = (p.y - this.y0) * (1 / this.a);
	if (this.no_rot) {
		v = p.y;
		u = p.x;
	} else {
		v = p.x * this.cosrot - p.y * this.sinrot;
		u = p.y * this.cosrot + p.x * this.sinrot + this.u_0;
	}
	Qp = Math.exp(-this.BrA * v);
	Sp = .5 * (Qp - 1 / Qp);
	Tp = .5 * (Qp + 1 / Qp);
	Vp = Math.sin(this.BrA * u);
	Up = (Vp * this.cosgam + Sp * this.singam) / Tp;
	if (Math.abs(Math.abs(Up) - 1) < 1e-10) {
		coords.x = 0;
		coords.y = Up < 0 ? -HALF_PI : HALF_PI;
	} else {
		coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up));
		coords.y = phi2z_default(this.e, Math.pow(coords.y, 1 / this.B));
		if (coords.y === Infinity) throw new Error();
		coords.x = -this.rB * Math.atan2(Sp * this.cosgam - Vp * this.singam, Math.cos(this.BrA * u));
	}
	coords.x += this.lam0;
	return coords;
}
var omerc_default = {
	init: init$25,
	forward: forward$24,
	inverse: inverse$24,
	names: [
		"Hotine_Oblique_Mercator",
		"Hotine Oblique Mercator",
		"Hotine_Oblique_Mercator_variant_A",
		"Hotine_Oblique_Mercator_Variant_B",
		"Hotine_Oblique_Mercator_Azimuth_Natural_Origin",
		"Hotine_Oblique_Mercator_Two_Point_Natural_Origin",
		"Hotine_Oblique_Mercator_Azimuth_Center",
		"Oblique_Mercator",
		"omerc"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/lcc.js
/**
* @typedef {Object} LocalThis
* @property {number} e
* @property {number} ns
* @property {number} f0
* @property {number} rh
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$24() {
	if (!this.lat2) this.lat2 = this.lat1;
	if (!this.k0) this.k0 = 1;
	this.x0 = this.x0 || 0;
	this.y0 = this.y0 || 0;
	if (Math.abs(this.lat1 + this.lat2) < 1e-10) return;
	var temp = this.b / this.a;
	this.e = Math.sqrt(1 - temp * temp);
	var sin1 = Math.sin(this.lat1);
	var cos1 = Math.cos(this.lat1);
	var ms1 = msfnz_default(this.e, sin1, cos1);
	var ts1 = tsfnz_default(this.e, this.lat1, sin1);
	var sin2 = Math.sin(this.lat2);
	var cos2 = Math.cos(this.lat2);
	var ms2 = msfnz_default(this.e, sin2, cos2);
	var ts2 = tsfnz_default(this.e, this.lat2, sin2);
	var ts0 = Math.abs(Math.abs(this.lat0) - HALF_PI) < 1e-10 ? 0 : tsfnz_default(this.e, this.lat0, Math.sin(this.lat0));
	if (Math.abs(this.lat1 - this.lat2) > 1e-10) this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
	else this.ns = sin1;
	if (isNaN(this.ns)) this.ns = sin1;
	this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
	this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
	if (!this.title) this.title = "Lambert Conformal Conic";
}
function forward$23(p) {
	var lon = p.x;
	var lat = p.y;
	if (Math.abs(2 * Math.abs(lat) - Math.PI) <= 1e-10) lat = sign_default(lat) * (HALF_PI - 2 * EPSLN);
	var con = Math.abs(Math.abs(lat) - HALF_PI);
	var ts, rh1;
	if (con > 1e-10) {
		ts = tsfnz_default(this.e, lat, Math.sin(lat));
		rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
	} else {
		con = lat * this.ns;
		if (con <= 0) return null;
		rh1 = 0;
	}
	var theta = this.ns * adjust_lon_default(lon - this.long0, this.over);
	p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
	p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;
	return p;
}
function inverse$23(p) {
	var rh1, con, ts;
	var lat, lon;
	var x = (p.x - this.x0) / this.k0;
	var y = this.rh - (p.y - this.y0) / this.k0;
	if (this.ns > 0) {
		rh1 = Math.sqrt(x * x + y * y);
		con = 1;
	} else {
		rh1 = -Math.sqrt(x * x + y * y);
		con = -1;
	}
	var theta = 0;
	if (rh1 !== 0) theta = Math.atan2(con * x, con * y);
	if (rh1 !== 0 || this.ns > 0) {
		con = 1 / this.ns;
		ts = Math.pow(rh1 / (this.a * this.f0), con);
		lat = phi2z_default(this.e, ts);
		if (lat === -9999) return null;
	} else lat = -HALF_PI;
	lon = adjust_lon_default(theta / this.ns + this.long0, this.over);
	p.x = lon;
	p.y = lat;
	return p;
}
var lcc_default = {
	init: init$24,
	forward: forward$23,
	inverse: inverse$23,
	names: [
		"Lambert Tangential Conformal Conic Projection",
		"Lambert_Conformal_Conic",
		"Lambert_Conformal_Conic_1SP",
		"Lambert_Conformal_Conic_2SP",
		"lcc",
		"Lambert Conic Conformal (1SP)",
		"Lambert Conic Conformal (2SP)"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/krovak.js
function init$23() {
	this.a = 6377397.155;
	this.es = .006674372230614;
	this.e = Math.sqrt(this.es);
	if (!this.lat0) this.lat0 = .863937979737193;
	if (!this.long0) this.long0 = .4334234309119251;
	if (!this.k0) this.k0 = .9999;
	this.s45 = .785398163397448;
	this.s90 = 2 * this.s45;
	this.fi0 = this.lat0;
	this.e2 = this.es;
	this.e = Math.sqrt(this.e2);
	this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2));
	this.uq = 1.04216856380474;
	this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
	this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
	this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
	this.k1 = this.k0;
	this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
	this.s0 = 1.37008346281555;
	this.n = Math.sin(this.s0);
	this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
	this.ad = this.s90 - this.uq;
}
function forward$22(p) {
	var gfi, u, deltav, s, d, eps, ro;
	var lon = p.x;
	var lat = p.y;
	var delta_lon = adjust_lon_default(lon - this.long0, this.over);
	gfi = Math.pow((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat)), this.alfa * this.e / 2);
	u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
	deltav = -delta_lon * this.alfa;
	s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
	d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
	eps = this.n * d;
	ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
	p.y = ro * Math.cos(eps) / 1;
	p.x = ro * Math.sin(eps) / 1;
	if (!this.czech) {
		p.y *= -1;
		p.x *= -1;
	}
	return p;
}
function inverse$22(p) {
	var u, deltav, s, d, eps, ro, fi1;
	var ok;
	var tmp = p.x;
	p.x = p.y;
	p.y = tmp;
	if (!this.czech) {
		p.y *= -1;
		p.x *= -1;
	}
	ro = Math.sqrt(p.x * p.x + p.y * p.y);
	eps = Math.atan2(p.y, p.x);
	d = eps / Math.sin(this.s0);
	s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
	u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
	deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
	p.x = this.long0 - deltav / this.alfa;
	fi1 = u;
	ok = 0;
	var iter = 0;
	do {
		p.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
		if (Math.abs(fi1 - p.y) < 1e-10) ok = 1;
		fi1 = p.y;
		iter += 1;
	} while (ok === 0 && iter < 15);
	if (iter >= 15) return null;
	return p;
}
var krovak_default = {
	init: init$23,
	forward: forward$22,
	inverse: inverse$22,
	names: [
		"Krovak",
		"Krovak Modified",
		"Krovak (North Orientated)",
		"Krovak Modified (North Orientated)",
		"krovak"
	]
};
//#endregion
//#region node_modules/proj4/lib/common/mlfn.js
function mlfn_default(e0, e1, e2, e3, phi) {
	return e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi);
}
//#endregion
//#region node_modules/proj4/lib/common/e0fn.js
function e0fn_default(x) {
	return 1 - .25 * x * (1 + x / 16 * (3 + 1.25 * x));
}
//#endregion
//#region node_modules/proj4/lib/common/e1fn.js
function e1fn_default(x) {
	return .375 * x * (1 + .25 * x * (1 + .46875 * x));
}
//#endregion
//#region node_modules/proj4/lib/common/e2fn.js
function e2fn_default(x) {
	return .05859375 * x * x * (1 + .75 * x);
}
//#endregion
//#region node_modules/proj4/lib/common/e3fn.js
function e3fn_default(x) {
	return x * x * x * (35 / 3072);
}
//#endregion
//#region node_modules/proj4/lib/common/gN.js
function gN_default(a, e, sinphi) {
	var temp = e * sinphi;
	return a / Math.sqrt(1 - temp * temp);
}
//#endregion
//#region node_modules/proj4/lib/common/adjust_lat.js
function adjust_lat_default(x) {
	return Math.abs(x) < HALF_PI ? x : x - sign_default(x) * Math.PI;
}
//#endregion
//#region node_modules/proj4/lib/common/imlfn.js
function imlfn_default(ml, e0, e1, e2, e3) {
	var phi;
	var dphi;
	phi = ml / e0;
	for (var i = 0; i < 15; i++) {
		dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
		phi += dphi;
		if (Math.abs(dphi) <= 1e-10) return phi;
	}
	return NaN;
}
//#endregion
//#region node_modules/proj4/lib/projections/cass.js
/**
* @typedef {Object} LocalThis
* @property {number} es
* @property {number} e0
* @property {number} e1
* @property {number} e2
* @property {number} e3
* @property {number} ml0
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$22() {
	if (!this.sphere) {
		this.e0 = e0fn_default(this.es);
		this.e1 = e1fn_default(this.es);
		this.e2 = e2fn_default(this.es);
		this.e3 = e3fn_default(this.es);
		this.ml0 = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat0);
	}
}
function forward$21(p) {
	var x, y;
	var lam = p.x;
	var phi = p.y;
	lam = adjust_lon_default(lam - this.long0, this.over);
	if (this.sphere) {
		x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
		y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
	} else {
		var sinphi = Math.sin(phi);
		var cosphi = Math.cos(phi);
		var nl = gN_default(this.a, this.e, sinphi);
		var tl = Math.tan(phi) * Math.tan(phi);
		var al = lam * Math.cos(phi);
		var asq = al * al;
		var cl = this.es * cosphi * cosphi / (1 - this.es);
		var ml = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, phi);
		x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
		y = ml - this.ml0 + nl * sinphi / cosphi * asq * (.5 + (5 - tl + 6 * cl) * asq / 24);
	}
	p.x = x + this.x0;
	p.y = y + this.y0;
	return p;
}
function inverse$21(p) {
	p.x -= this.x0;
	p.y -= this.y0;
	var x = p.x / this.a;
	var y = p.y / this.a;
	var phi, lam;
	if (this.sphere) {
		var dd = y + this.lat0;
		phi = Math.asin(Math.sin(dd) * Math.cos(x));
		lam = Math.atan2(Math.tan(x), Math.cos(dd));
	} else {
		var phi1 = imlfn_default(this.ml0 / this.a + y, this.e0, this.e1, this.e2, this.e3);
		if (Math.abs(Math.abs(phi1) - HALF_PI) <= 1e-10) {
			p.x = this.long0;
			p.y = HALF_PI;
			if (y < 0) p.y *= -1;
			return p;
		}
		var nl1 = gN_default(this.a, this.e, Math.sin(phi1));
		var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
		var tl1 = Math.pow(Math.tan(phi1), 2);
		var dl = x * this.a / nl1;
		var dsq = dl * dl;
		phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (.5 - (1 + 3 * tl1) * dl * dl / 24);
		lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);
	}
	p.x = adjust_lon_default(lam + this.long0, this.over);
	p.y = adjust_lat_default(phi);
	return p;
}
var cass_default = {
	init: init$22,
	forward: forward$21,
	inverse: inverse$21,
	names: [
		"Cassini",
		"Cassini_Soldner",
		"cass"
	]
};
//#endregion
//#region node_modules/proj4/lib/common/qsfnz.js
function qsfnz_default(eccent, sinphi) {
	var con;
	if (eccent > 1e-7) {
		con = eccent * sinphi;
		return (1 - eccent * eccent) * (sinphi / (1 - con * con) - .5 / eccent * Math.log((1 - con) / (1 + con)));
	} else return 2 * sinphi;
}
/**
* Initialize the Lambert Azimuthal Equal Area projection
* @this {import('../defs.js').ProjectionDefinition & LocalThis}
*/
function init$21() {
	var t = Math.abs(this.lat0);
	if (Math.abs(t - HALF_PI) < 1e-10) this.mode = this.lat0 < 0 ? 1 : 2;
	else if (Math.abs(t) < 1e-10) this.mode = 3;
	else this.mode = 4;
	if (this.es > 0) {
		var sinphi;
		this.qp = qsfnz_default(this.e, 1);
		this.mmf = .5 / (1 - this.es);
		this.apa = authset(this.es);
		switch (this.mode) {
			case 2:
				this.dd = 1;
				break;
			case 1:
				this.dd = 1;
				break;
			case 3:
				this.rq = Math.sqrt(.5 * this.qp);
				this.dd = 1 / this.rq;
				this.xmf = 1;
				this.ymf = .5 * this.qp;
				break;
			case 4:
				this.rq = Math.sqrt(.5 * this.qp);
				sinphi = Math.sin(this.lat0);
				this.sinb1 = qsfnz_default(this.e, sinphi) / this.qp;
				this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
				this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
				this.ymf = (this.xmf = this.rq) / this.dd;
				this.xmf *= this.dd;
				break;
		}
	} else if (this.mode === 4) {
		this.sinph0 = Math.sin(this.lat0);
		this.cosph0 = Math.cos(this.lat0);
	}
}
function forward$20(p) {
	var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
	var lam = p.x;
	var phi = p.y;
	lam = adjust_lon_default(lam - this.long0, this.over);
	if (this.sphere) {
		sinphi = Math.sin(phi);
		cosphi = Math.cos(phi);
		coslam = Math.cos(lam);
		if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
			y = this.mode === this.EQUIT ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
			if (y <= 1e-10) return null;
			y = Math.sqrt(2 / y);
			x = y * cosphi * Math.sin(lam);
			y *= this.mode === this.EQUIT ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
		} else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
			if (this.mode === this.N_POLE) coslam = -coslam;
			if (Math.abs(phi + this.lat0) < 1e-10) return null;
			y = FORTPI - phi * .5;
			y = 2 * (this.mode === this.S_POLE ? Math.cos(y) : Math.sin(y));
			x = y * Math.sin(lam);
			y *= coslam;
		}
	} else {
		sinb = 0;
		cosb = 0;
		b = 0;
		coslam = Math.cos(lam);
		sinlam = Math.sin(lam);
		sinphi = Math.sin(phi);
		q = qsfnz_default(this.e, sinphi);
		if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
			sinb = q / this.qp;
			cosb = Math.sqrt(1 - sinb * sinb);
		}
		switch (this.mode) {
			case this.OBLIQ:
				b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
				break;
			case this.EQUIT:
				b = 1 + cosb * coslam;
				break;
			case this.N_POLE:
				b = HALF_PI + phi;
				q = this.qp - q;
				break;
			case this.S_POLE:
				b = phi - HALF_PI;
				q = this.qp + q;
				break;
		}
		if (Math.abs(b) < 1e-10) return null;
		switch (this.mode) {
			case this.OBLIQ:
			case this.EQUIT:
				b = Math.sqrt(2 / b);
				if (this.mode === this.OBLIQ) y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
				else y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
				x = this.xmf * b * cosb * sinlam;
				break;
			case this.N_POLE:
			case this.S_POLE:
				if (q >= 0) {
					x = (b = Math.sqrt(q)) * sinlam;
					y = coslam * (this.mode === this.S_POLE ? b : -b);
				} else x = y = 0;
				break;
		}
	}
	p.x = this.a * x + this.x0;
	p.y = this.a * y + this.y0;
	return p;
}
function inverse$20(p) {
	p.x -= this.x0;
	p.y -= this.y0;
	var x = p.x / this.a;
	var y = p.y / this.a;
	var lam, phi, cCe, sCe, q, rho, ab;
	if (this.sphere) {
		var cosz = 0, rh, sinz = 0;
		rh = Math.sqrt(x * x + y * y);
		phi = rh * .5;
		if (phi > 1) return null;
		phi = 2 * Math.asin(phi);
		if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
			sinz = Math.sin(phi);
			cosz = Math.cos(phi);
		}
		switch (this.mode) {
			case this.EQUIT:
				phi = Math.abs(rh) <= 1e-10 ? 0 : Math.asin(y * sinz / rh);
				x *= sinz;
				y = cosz * rh;
				break;
			case this.OBLIQ:
				phi = Math.abs(rh) <= 1e-10 ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
				x *= sinz * this.cosph0;
				y = (cosz - Math.sin(phi) * this.sinph0) * rh;
				break;
			case this.N_POLE:
				y = -y;
				phi = HALF_PI - phi;
				break;
			case this.S_POLE:
				phi -= HALF_PI;
				break;
		}
		lam = y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(x, y);
	} else {
		ab = 0;
		if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
			x /= this.dd;
			y *= this.dd;
			rho = Math.sqrt(x * x + y * y);
			if (rho < 1e-10) {
				p.x = this.long0;
				p.y = this.lat0;
				return p;
			}
			sCe = 2 * Math.asin(.5 * rho / this.rq);
			cCe = Math.cos(sCe);
			x *= sCe = Math.sin(sCe);
			if (this.mode === this.OBLIQ) {
				ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
				q = this.qp * ab;
				y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
			} else {
				ab = y * sCe / rho;
				q = this.qp * ab;
				y = rho * cCe;
			}
		} else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
			if (this.mode === this.N_POLE) y = -y;
			q = x * x + y * y;
			if (!q) {
				p.x = this.long0;
				p.y = this.lat0;
				return p;
			}
			ab = 1 - q / this.qp;
			if (this.mode === this.S_POLE) ab = -ab;
		}
		lam = Math.atan2(x, y);
		phi = authlat(Math.asin(ab), this.apa);
	}
	p.x = adjust_lon_default(this.long0 + lam, this.over);
	p.y = phi;
	return p;
}
var P00 = .3333333333333333;
var P01 = .17222222222222222;
var P02 = .10257936507936508;
var P10 = .06388888888888888;
var P11 = .0664021164021164;
var P20 = .016415012942191543;
function authset(es) {
	var t;
	var APA = [];
	APA[0] = es * P00;
	t = es * es;
	APA[0] += t * P01;
	APA[1] = t * P10;
	t *= es;
	APA[0] += t * P02;
	APA[1] += t * P11;
	APA[2] = t * P20;
	return APA;
}
function authlat(beta, APA) {
	var t = beta + beta;
	return beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t);
}
var laea_default = {
	init: init$21,
	forward: forward$20,
	inverse: inverse$20,
	names: [
		"Lambert Azimuthal Equal Area",
		"Lambert_Azimuthal_Equal_Area",
		"laea"
	],
	S_POLE: 1,
	N_POLE: 2,
	EQUIT: 3,
	OBLIQ: 4
};
//#endregion
//#region node_modules/proj4/lib/common/asinz.js
function asinz_default(x) {
	if (Math.abs(x) > 1) x = x > 1 ? 1 : -1;
	return Math.asin(x);
}
//#endregion
//#region node_modules/proj4/lib/projections/aea.js
/**
* @typedef {Object} LocalThis
* @property {number} temp
* @property {number} es
* @property {number} e3
* @property {number} sin_po
* @property {number} cos_po
* @property {number} t1
* @property {number} con
* @property {number} ms1
* @property {number} qs1
* @property {number} t2
* @property {number} ms2
* @property {number} qs2
* @property {number} t3
* @property {number} qs0
* @property {number} ns0
* @property {number} c
* @property {number} rh
* @property {number} sin_phi
* @property {number} cos_phi
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$20() {
	if (Math.abs(this.lat1 + this.lat2) < 1e-10) return;
	this.temp = this.b / this.a;
	this.es = 1 - Math.pow(this.temp, 2);
	this.e3 = Math.sqrt(this.es);
	this.sin_po = Math.sin(this.lat1);
	this.cos_po = Math.cos(this.lat1);
	this.t1 = this.sin_po;
	this.con = this.sin_po;
	this.ms1 = msfnz_default(this.e3, this.sin_po, this.cos_po);
	this.qs1 = qsfnz_default(this.e3, this.sin_po);
	this.sin_po = Math.sin(this.lat2);
	this.cos_po = Math.cos(this.lat2);
	this.t2 = this.sin_po;
	this.ms2 = msfnz_default(this.e3, this.sin_po, this.cos_po);
	this.qs2 = qsfnz_default(this.e3, this.sin_po);
	this.sin_po = Math.sin(this.lat0);
	this.cos_po = Math.cos(this.lat0);
	this.t3 = this.sin_po;
	this.qs0 = qsfnz_default(this.e3, this.sin_po);
	if (Math.abs(this.lat1 - this.lat2) > 1e-10) this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
	else this.ns0 = this.con;
	this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
	this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
}
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function forward$19(p) {
	var lon = p.x;
	var lat = p.y;
	this.sin_phi = Math.sin(lat);
	this.cos_phi = Math.cos(lat);
	var qs = qsfnz_default(this.e3, this.sin_phi);
	var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
	var theta = this.ns0 * adjust_lon_default(lon - this.long0, this.over);
	var x = rh1 * Math.sin(theta) + this.x0;
	var y = this.rh - rh1 * Math.cos(theta) + this.y0;
	p.x = x;
	p.y = y;
	return p;
}
function inverse$19(p) {
	var rh1, qs, con, theta, lon, lat;
	p.x -= this.x0;
	p.y = this.rh - p.y + this.y0;
	if (this.ns0 >= 0) {
		rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
		con = 1;
	} else {
		rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
		con = -1;
	}
	theta = 0;
	if (rh1 !== 0) theta = Math.atan2(con * p.x, con * p.y);
	con = rh1 * this.ns0 / this.a;
	if (this.sphere) lat = Math.asin((this.c - con * con) / (2 * this.ns0));
	else {
		qs = (this.c - con * con) / this.ns0;
		lat = this.phi1z(this.e3, qs);
	}
	lon = adjust_lon_default(theta / this.ns0 + this.long0, this.over);
	p.x = lon;
	p.y = lat;
	return p;
}
function phi1z(eccent, qs) {
	var sinphi, cosphi, con, com, dphi;
	var phi = asinz_default(.5 * qs);
	if (eccent < 1e-10) return phi;
	var eccnts = eccent * eccent;
	for (var i = 1; i <= 25; i++) {
		sinphi = Math.sin(phi);
		cosphi = Math.cos(phi);
		con = eccent * sinphi;
		com = 1 - con * con;
		dphi = .5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + .5 / eccent * Math.log((1 - con) / (1 + con)));
		phi = phi + dphi;
		if (Math.abs(dphi) <= 1e-7) return phi;
	}
	return null;
}
var aea_default = {
	init: init$20,
	forward: forward$19,
	inverse: inverse$19,
	names: [
		"Albers_Conic_Equal_Area",
		"Albers_Equal_Area",
		"Albers",
		"aea"
	],
	phi1z
};
//#endregion
//#region node_modules/proj4/lib/projections/gnom.js
/**
* @typedef {Object} LocalThis
* @property {number} sin_p14
* @property {number} cos_p14
* @property {number} infinity_dist
* @property {number} rc
*/
/**
reference:
Wolfram Mathworld "Gnomonic Projection"
http://mathworld.wolfram.com/GnomonicProjection.html
Accessed: 12th November 2009
@this {import('../defs.js').ProjectionDefinition & LocalThis}
*/
function init$19() {
	this.sin_p14 = Math.sin(this.lat0);
	this.cos_p14 = Math.cos(this.lat0);
	this.infinity_dist = 1e3 * this.a;
	this.rc = 1;
}
function forward$18(p) {
	var sinphi, cosphi;
	var dlon;
	var coslon;
	var ksp;
	var g;
	var x, y;
	var lon = p.x;
	var lat = p.y;
	dlon = adjust_lon_default(lon - this.long0, this.over);
	sinphi = Math.sin(lat);
	cosphi = Math.cos(lat);
	coslon = Math.cos(dlon);
	g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
	ksp = 1;
	if (g > 0 || Math.abs(g) <= 1e-10) {
		x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
		y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
	} else {
		x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
		y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
	}
	p.x = x;
	p.y = y;
	return p;
}
function inverse$18(p) {
	var rh;
	var sinc, cosc;
	var c;
	var lon, lat;
	p.x = (p.x - this.x0) / this.a;
	p.y = (p.y - this.y0) / this.a;
	p.x /= this.k0;
	p.y /= this.k0;
	if (rh = Math.sqrt(p.x * p.x + p.y * p.y)) {
		c = Math.atan2(rh, this.rc);
		sinc = Math.sin(c);
		cosc = Math.cos(c);
		lat = asinz_default(cosc * this.sin_p14 + p.y * sinc * this.cos_p14 / rh);
		lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
		lon = adjust_lon_default(this.long0 + lon, this.over);
	} else {
		lat = this.phic0;
		lon = 0;
	}
	p.x = lon;
	p.y = lat;
	return p;
}
var gnom_default = {
	init: init$19,
	forward: forward$18,
	inverse: inverse$18,
	names: ["gnom"]
};
//#endregion
//#region node_modules/proj4/lib/common/iqsfnz.js
function iqsfnz_default(eccent, q) {
	var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
	if (Math.abs(Math.abs(q) - temp) < 1e-6) if (q < 0) return -1 * HALF_PI;
	else return HALF_PI;
	var phi = Math.asin(.5 * q);
	var dphi;
	var sin_phi;
	var cos_phi;
	var con;
	for (var i = 0; i < 30; i++) {
		sin_phi = Math.sin(phi);
		cos_phi = Math.cos(phi);
		con = eccent * sin_phi;
		dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + .5 / eccent * Math.log((1 - con) / (1 + con)));
		phi += dphi;
		if (Math.abs(dphi) <= 1e-10) return phi;
	}
	return NaN;
}
//#endregion
//#region node_modules/proj4/lib/projections/cea.js
/**
* @typedef {Object} LocalThis
* @property {number} e
*/
/**
reference:
"Cartographic Projection Procedures for the UNIX Environment-
A User's Manual" by Gerald I. Evenden,
USGS Open File Report 90-284and Release 4 Interim Reports (2003)
@this {import('../defs.js').ProjectionDefinition & LocalThis}
*/
function init$18() {
	if (!this.sphere) this.k0 = msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
}
function forward$17(p) {
	var lon = p.x;
	var lat = p.y;
	var x, y;
	var dlon = adjust_lon_default(lon - this.long0, this.over);
	if (this.sphere) {
		x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
		y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
	} else {
		var qs = qsfnz_default(this.e, Math.sin(lat));
		x = this.x0 + this.a * this.k0 * dlon;
		y = this.y0 + this.a * qs * .5 / this.k0;
	}
	p.x = x;
	p.y = y;
	return p;
}
function inverse$17(p) {
	p.x -= this.x0;
	p.y -= this.y0;
	var lon, lat;
	if (this.sphere) {
		lon = adjust_lon_default(this.long0 + p.x / this.a / Math.cos(this.lat_ts), this.over);
		lat = Math.asin(p.y / this.a * Math.cos(this.lat_ts));
	} else {
		lat = iqsfnz_default(this.e, 2 * p.y * this.k0 / this.a);
		lon = adjust_lon_default(this.long0 + p.x / (this.a * this.k0), this.over);
	}
	p.x = lon;
	p.y = lat;
	return p;
}
var cea_default = {
	init: init$18,
	forward: forward$17,
	inverse: inverse$17,
	names: ["cea"]
};
//#endregion
//#region node_modules/proj4/lib/projections/eqc.js
function init$17() {
	this.x0 = this.x0 || 0;
	this.y0 = this.y0 || 0;
	this.lat0 = this.lat0 || 0;
	this.long0 = this.long0 || 0;
	this.lat_ts = this.lat_ts || 0;
	this.title = this.title || "Equidistant Cylindrical (Plate Carre)";
	this.rc = Math.cos(this.lat_ts);
}
function forward$16(p) {
	var lon = p.x;
	var lat = p.y;
	var dlon = adjust_lon_default(lon - this.long0, this.over);
	var dlat = adjust_lat_default(lat - this.lat0);
	p.x = this.x0 + this.a * dlon * this.rc;
	p.y = this.y0 + this.a * dlat;
	return p;
}
function inverse$16(p) {
	var x = p.x;
	var y = p.y;
	p.x = adjust_lon_default(this.long0 + (x - this.x0) / (this.a * this.rc), this.over);
	p.y = adjust_lat_default(this.lat0 + (y - this.y0) / this.a);
	return p;
}
var eqc_default = {
	init: init$17,
	forward: forward$16,
	inverse: inverse$16,
	names: [
		"Equirectangular",
		"Equidistant_Cylindrical",
		"Equidistant_Cylindrical_Spherical",
		"eqc"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/poly.js
/**
* @typedef {Object} LocalThis
* @property {number} temp
* @property {number} es
* @property {number} e
* @property {number} e0
* @property {number} e1
* @property {number} e2
* @property {number} e3
* @property {number} ml0
*/
var MAX_ITER$1 = 20;
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$16() {
	this.temp = this.b / this.a;
	this.es = 1 - Math.pow(this.temp, 2);
	this.e = Math.sqrt(this.es);
	this.e0 = e0fn_default(this.es);
	this.e1 = e1fn_default(this.es);
	this.e2 = e2fn_default(this.es);
	this.e3 = e3fn_default(this.es);
	this.ml0 = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat0);
}
function forward$15(p) {
	var lon = p.x;
	var lat = p.y;
	var x, y, el;
	var dlon = adjust_lon_default(lon - this.long0, this.over);
	el = dlon * Math.sin(lat);
	if (this.sphere) if (Math.abs(lat) <= 1e-10) {
		x = this.a * dlon;
		y = -1 * this.a * this.lat0;
	} else {
		x = this.a * Math.sin(el) / Math.tan(lat);
		y = this.a * (adjust_lat_default(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
	}
	else if (Math.abs(lat) <= 1e-10) {
		x = this.a * dlon;
		y = -1 * this.ml0;
	} else {
		var nl = gN_default(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
		x = nl * Math.sin(el);
		y = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
	}
	p.x = x + this.x0;
	p.y = y + this.y0;
	return p;
}
function inverse$15(p) {
	var lon, lat, x, y, i;
	var al, bl;
	var phi, dphi;
	x = p.x - this.x0;
	y = p.y - this.y0;
	if (this.sphere) if (Math.abs(y + this.a * this.lat0) <= 1e-10) {
		lon = adjust_lon_default(x / this.a + this.long0, this.over);
		lat = 0;
	} else {
		al = this.lat0 + y / this.a;
		bl = x * x / this.a / this.a + al * al;
		phi = al;
		var tanphi;
		for (i = MAX_ITER$1; i; --i) {
			tanphi = Math.tan(phi);
			dphi = -1 * (al * (phi * tanphi + 1) - phi - .5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
			phi += dphi;
			if (Math.abs(dphi) <= 1e-10) {
				lat = phi;
				break;
			}
		}
		lon = adjust_lon_default(this.long0 + Math.asin(x * Math.tan(phi) / this.a) / Math.sin(lat), this.over);
	}
	else if (Math.abs(y + this.ml0) <= 1e-10) {
		lat = 0;
		lon = adjust_lon_default(this.long0 + x / this.a, this.over);
	} else {
		al = (this.ml0 + y) / this.a;
		bl = x * x / this.a / this.a + al * al;
		phi = al;
		var cl, mln, mlnp, ma;
		var con;
		for (i = MAX_ITER$1; i; --i) {
			con = this.e * Math.sin(phi);
			cl = Math.sqrt(1 - con * con) * Math.tan(phi);
			mln = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, phi);
			mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
			ma = mln / this.a;
			dphi = (al * (cl * ma + 1) - ma - .5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
			phi -= dphi;
			if (Math.abs(dphi) <= 1e-10) {
				lat = phi;
				break;
			}
		}
		cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
		lon = adjust_lon_default(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat), this.over);
	}
	p.x = lon;
	p.y = lat;
	return p;
}
var poly_default = {
	init: init$16,
	forward: forward$15,
	inverse: inverse$15,
	names: [
		"Polyconic",
		"American_Polyconic",
		"poly"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/nzmg.js
function init$15() {
	this.A = [];
	this.A[1] = .6399175073;
	this.A[2] = -.1358797613;
	this.A[3] = .063294409;
	this.A[4] = -.02526853;
	this.A[5] = .0117879;
	this.A[6] = -.0055161;
	this.A[7] = .0026906;
	this.A[8] = -.001333;
	this.A[9] = 67e-5;
	this.A[10] = -34e-5;
	this.B_re = [];
	this.B_im = [];
	this.B_re[1] = .7557853228;
	this.B_im[1] = 0;
	this.B_re[2] = .249204646;
	this.B_im[2] = .003371507;
	this.B_re[3] = -.001541739;
	this.B_im[3] = .04105856;
	this.B_re[4] = -.10162907;
	this.B_im[4] = .01727609;
	this.B_re[5] = -.26623489;
	this.B_im[5] = -.36249218;
	this.B_re[6] = -.6870983;
	this.B_im[6] = -1.1651967;
	this.C_re = [];
	this.C_im = [];
	this.C_re[1] = 1.3231270439;
	this.C_im[1] = 0;
	this.C_re[2] = -.577245789;
	this.C_im[2] = -.007809598;
	this.C_re[3] = .508307513;
	this.C_im[3] = -.112208952;
	this.C_re[4] = -.15094762;
	this.C_im[4] = .18200602;
	this.C_re[5] = 1.01418179;
	this.C_im[5] = 1.64497696;
	this.C_re[6] = 1.9660549;
	this.C_im[6] = 2.5127645;
	this.D = [];
	this.D[1] = 1.5627014243;
	this.D[2] = .5185406398;
	this.D[3] = -.03333098;
	this.D[4] = -.1052906;
	this.D[5] = -.0368594;
	this.D[6] = .007317;
	this.D[7] = .0122;
	this.D[8] = .00394;
	this.D[9] = -.0013;
}
/**
New Zealand Map Grid Forward  - long/lat to x/y
long/lat in radians
*/
function forward$14(p) {
	var n;
	var lon = p.x;
	var delta_lat = p.y - this.lat0;
	var delta_lon = lon - this.long0;
	var d_phi = delta_lat / SEC_TO_RAD * 1e-5;
	var d_lambda = delta_lon;
	var d_phi_n = 1;
	var d_psi = 0;
	for (n = 1; n <= 10; n++) {
		d_phi_n = d_phi_n * d_phi;
		d_psi = d_psi + this.A[n] * d_phi_n;
	}
	var th_re = d_psi;
	var th_im = d_lambda;
	var th_n_re = 1;
	var th_n_im = 0;
	var th_n_re1;
	var th_n_im1;
	var z_re = 0;
	var z_im = 0;
	for (n = 1; n <= 6; n++) {
		th_n_re1 = th_n_re * th_re - th_n_im * th_im;
		th_n_im1 = th_n_im * th_re + th_n_re * th_im;
		th_n_re = th_n_re1;
		th_n_im = th_n_im1;
		z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
		z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
	}
	p.x = z_im * this.a + this.x0;
	p.y = z_re * this.a + this.y0;
	return p;
}
/**
New Zealand Map Grid Inverse  -  x/y to long/lat
*/
function inverse$14(p) {
	var n;
	var x = p.x;
	var y = p.y;
	var delta_x = x - this.x0;
	var z_re = (y - this.y0) / this.a;
	var z_im = delta_x / this.a;
	var z_n_re = 1;
	var z_n_im = 0;
	var z_n_re1;
	var z_n_im1;
	var th_re = 0;
	var th_im = 0;
	for (n = 1; n <= 6; n++) {
		z_n_re1 = z_n_re * z_re - z_n_im * z_im;
		z_n_im1 = z_n_im * z_re + z_n_re * z_im;
		z_n_re = z_n_re1;
		z_n_im = z_n_im1;
		th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
		th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
	}
	for (var i = 0; i < this.iterations; i++) {
		var th_n_re = th_re;
		var th_n_im = th_im;
		var th_n_re1;
		var th_n_im1;
		var num_re = z_re;
		var num_im = z_im;
		for (n = 2; n <= 6; n++) {
			th_n_re1 = th_n_re * th_re - th_n_im * th_im;
			th_n_im1 = th_n_im * th_re + th_n_re * th_im;
			th_n_re = th_n_re1;
			th_n_im = th_n_im1;
			num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
			num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
		}
		th_n_re = 1;
		th_n_im = 0;
		var den_re = this.B_re[1];
		var den_im = this.B_im[1];
		for (n = 2; n <= 6; n++) {
			th_n_re1 = th_n_re * th_re - th_n_im * th_im;
			th_n_im1 = th_n_im * th_re + th_n_re * th_im;
			th_n_re = th_n_re1;
			th_n_im = th_n_im1;
			den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
			den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
		}
		var den2 = den_re * den_re + den_im * den_im;
		th_re = (num_re * den_re + num_im * den_im) / den2;
		th_im = (num_im * den_re - num_re * den_im) / den2;
	}
	var d_psi = th_re;
	var d_lambda = th_im;
	var d_psi_n = 1;
	var d_phi = 0;
	for (n = 1; n <= 9; n++) {
		d_psi_n = d_psi_n * d_psi;
		d_phi = d_phi + this.D[n] * d_psi_n;
	}
	var lat = this.lat0 + d_phi * SEC_TO_RAD * 1e5;
	p.x = this.long0 + d_lambda;
	p.y = lat;
	return p;
}
var nzmg_default = {
	init: init$15,
	forward: forward$14,
	inverse: inverse$14,
	names: ["New_Zealand_Map_Grid", "nzmg"]
};
//#endregion
//#region node_modules/proj4/lib/projections/mill.js
function init$14() {}
function forward$13(p) {
	var lon = p.x;
	var lat = p.y;
	var dlon = adjust_lon_default(lon - this.long0, this.over);
	var x = this.x0 + this.a * dlon;
	var y = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + lat / 2.5)) * 1.25;
	p.x = x;
	p.y = y;
	return p;
}
function inverse$13(p) {
	p.x -= this.x0;
	p.y -= this.y0;
	var lon = adjust_lon_default(this.long0 + p.x / this.a, this.over);
	var lat = 2.5 * (Math.atan(Math.exp(.8 * p.y / this.a)) - Math.PI / 4);
	p.x = lon;
	p.y = lat;
	return p;
}
var mill_default = {
	init: init$14,
	forward: forward$13,
	inverse: inverse$13,
	names: ["Miller_Cylindrical", "mill"]
};
//#endregion
//#region node_modules/proj4/lib/projections/sinu.js
var MAX_ITER = 20;
/**
* @typedef {Object} LocalThis
* @property {Array<number>} en
* @property {number} n
* @property {number} m
* @property {number} C_y
* @property {number} C_x
* @property {number} es
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$13() {
	this.long0 = this.long0 || 0;
	if (!this.sphere) this.en = pj_enfn_default(this.es);
	else {
		this.n = 1;
		this.m = 0;
		this.es = 0;
		this.C_y = Math.sqrt((this.m + 1) / this.n);
		this.C_x = this.C_y / (this.m + 1);
	}
}
function forward$12(p) {
	var x, y;
	var lon = p.x;
	var lat = p.y;
	lon = adjust_lon_default(lon - this.long0, this.over);
	if (this.sphere) {
		if (!this.m) lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
		else {
			var k = this.n * Math.sin(lat);
			for (var i = MAX_ITER; i; --i) {
				var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
				lat -= V;
				if (Math.abs(V) < 1e-10) break;
			}
		}
		x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
		y = this.a * this.C_y * lat;
	} else {
		var s = Math.sin(lat);
		var c = Math.cos(lat);
		y = this.a * pj_mlfn_default(lat, s, c, this.en);
		x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
	}
	p.x = x;
	p.y = y;
	return p;
}
function inverse$12(p) {
	var lat, temp, lon, s;
	p.x -= this.x0;
	lon = p.x / this.a;
	p.y -= this.y0;
	lat = p.y / this.a;
	if (this.sphere) {
		lat /= this.C_y;
		lon = lon / (this.C_x * (this.m + Math.cos(lat)));
		if (this.m) lat = asinz_default((this.m * lat + Math.sin(lat)) / this.n);
		else if (this.n !== 1) lat = asinz_default(Math.sin(lat) / this.n);
		lon = adjust_lon_default(lon + this.long0, this.over);
		lat = adjust_lat_default(lat);
	} else {
		lat = pj_inv_mlfn_default(p.y / this.a, this.es, this.en);
		s = Math.abs(lat);
		if (s < HALF_PI) {
			s = Math.sin(lat);
			temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
			lon = adjust_lon_default(temp, this.over);
		} else if (s - 1e-10 < HALF_PI) lon = this.long0;
	}
	p.x = lon;
	p.y = lat;
	return p;
}
var sinu_default = {
	init: init$13,
	forward: forward$12,
	inverse: inverse$12,
	names: ["Sinusoidal", "sinu"]
};
//#endregion
//#region node_modules/proj4/lib/projections/moll.js
/** @this {import('../defs.js').ProjectionDefinition} */
function init$12() {
	this.x0 = this.x0 !== void 0 ? this.x0 : 0;
	this.y0 = this.y0 !== void 0 ? this.y0 : 0;
	this.long0 = this.long0 !== void 0 ? this.long0 : 0;
}
function forward$11(p) {
	var lon = p.x;
	var lat = p.y;
	var delta_lon = adjust_lon_default(lon - this.long0, this.over);
	var theta = lat;
	var con = Math.PI * Math.sin(lat);
	while (true) {
		var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
		theta += delta_theta;
		if (Math.abs(delta_theta) < 1e-10) break;
	}
	theta /= 2;
	if (Math.PI / 2 - Math.abs(lat) < 1e-10) delta_lon = 0;
	var x = .900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
	var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;
	p.x = x;
	p.y = y;
	return p;
}
function inverse$11(p) {
	var theta;
	var arg;
	p.x -= this.x0;
	p.y -= this.y0;
	arg = p.y / (1.4142135623731 * this.a);
	if (Math.abs(arg) > .999999999999) arg = .999999999999;
	theta = Math.asin(arg);
	var lon = adjust_lon_default(this.long0 + p.x / (.900316316158 * this.a * Math.cos(theta)), this.over);
	if (lon < -Math.PI) lon = -Math.PI;
	if (lon > Math.PI) lon = Math.PI;
	arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
	if (Math.abs(arg) > 1) arg = 1;
	var lat = Math.asin(arg);
	p.x = lon;
	p.y = lat;
	return p;
}
var moll_default = {
	init: init$12,
	forward: forward$11,
	inverse: inverse$11,
	names: ["Mollweide", "moll"]
};
//#endregion
//#region node_modules/proj4/lib/projections/eqdc.js
/**
* @typedef {Object} LocalThis
* @property {number} temp
* @property {number} es
* @property {number} e
* @property {number} e0
* @property {number} e1
* @property {number} e2
* @property {number} e3
* @property {number} sin_phi
* @property {number} cos_phi
* @property {number} ms1
* @property {number} ml1
* @property {number} ms2
* @property {number} ml2
* @property {number} ns
* @property {number} g
* @property {number} ml0
* @property {number} rh
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$11() {
	if (Math.abs(this.lat1 + this.lat2) < 1e-10) return;
	this.lat2 = this.lat2 || this.lat1;
	this.temp = this.b / this.a;
	this.es = 1 - Math.pow(this.temp, 2);
	this.e = Math.sqrt(this.es);
	this.e0 = e0fn_default(this.es);
	this.e1 = e1fn_default(this.es);
	this.e2 = e2fn_default(this.es);
	this.e3 = e3fn_default(this.es);
	this.sin_phi = Math.sin(this.lat1);
	this.cos_phi = Math.cos(this.lat1);
	this.ms1 = msfnz_default(this.e, this.sin_phi, this.cos_phi);
	this.ml1 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat1);
	if (Math.abs(this.lat1 - this.lat2) < 1e-10) this.ns = this.sin_phi;
	else {
		this.sin_phi = Math.sin(this.lat2);
		this.cos_phi = Math.cos(this.lat2);
		this.ms2 = msfnz_default(this.e, this.sin_phi, this.cos_phi);
		this.ml2 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat2);
		this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
	}
	this.g = this.ml1 + this.ms1 / this.ns;
	this.ml0 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat0);
	this.rh = this.a * (this.g - this.ml0);
}
function forward$10(p) {
	var lon = p.x;
	var lat = p.y;
	var rh1;
	if (this.sphere) rh1 = this.a * (this.g - lat);
	else {
		var ml = mlfn_default(this.e0, this.e1, this.e2, this.e3, lat);
		rh1 = this.a * (this.g - ml);
	}
	var theta = this.ns * adjust_lon_default(lon - this.long0, this.over);
	var x = this.x0 + rh1 * Math.sin(theta);
	var y = this.y0 + this.rh - rh1 * Math.cos(theta);
	p.x = x;
	p.y = y;
	return p;
}
function inverse$10(p) {
	p.x -= this.x0;
	p.y = this.rh - p.y + this.y0;
	var con, rh1, lat, lon;
	if (this.ns >= 0) {
		rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
		con = 1;
	} else {
		rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
		con = -1;
	}
	var theta = 0;
	if (rh1 !== 0) theta = Math.atan2(con * p.x, con * p.y);
	if (this.sphere) {
		lon = adjust_lon_default(this.long0 + theta / this.ns, this.over);
		lat = adjust_lat_default(this.g - rh1 / this.a);
		p.x = lon;
		p.y = lat;
		return p;
	} else {
		lat = imlfn_default(this.g - rh1 / this.a, this.e0, this.e1, this.e2, this.e3);
		lon = adjust_lon_default(this.long0 + theta / this.ns, this.over);
		p.x = lon;
		p.y = lat;
		return p;
	}
}
var eqdc_default = {
	init: init$11,
	forward: forward$10,
	inverse: inverse$10,
	names: ["Equidistant_Conic", "eqdc"]
};
//#endregion
//#region node_modules/proj4/lib/projections/vandg.js
/**
* @typedef {Object} LocalThis
* @property {number} R - Radius of the Earth
*/
/**
* Initialize the Van Der Grinten projection
* @this {import('../defs.js').ProjectionDefinition & LocalThis}
*/
function init$10() {
	this.R = this.a;
}
function forward$9(p) {
	var lon = p.x;
	var lat = p.y;
	var dlon = adjust_lon_default(lon - this.long0, this.over);
	var x, y;
	if (Math.abs(lat) <= 1e-10) {
		x = this.x0 + this.R * dlon;
		y = this.y0;
	}
	var theta = asinz_default(2 * Math.abs(lat / Math.PI));
	if (Math.abs(dlon) <= 1e-10 || Math.abs(Math.abs(lat) - HALF_PI) <= 1e-10) {
		x = this.x0;
		if (lat >= 0) y = this.y0 + Math.PI * this.R * Math.tan(.5 * theta);
		else y = this.y0 + Math.PI * this.R * -Math.tan(.5 * theta);
	}
	var al = .5 * Math.abs(Math.PI / dlon - dlon / Math.PI);
	var asq = al * al;
	var sinth = Math.sin(theta);
	var costh = Math.cos(theta);
	var g = costh / (sinth + costh - 1);
	var gsq = g * g;
	var m = g * (2 / sinth - 1);
	var msq = m * m;
	var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
	if (dlon < 0) con = -con;
	x = this.x0 + con;
	var q = asq + g;
	con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
	if (lat >= 0) y = this.y0 + con;
	else y = this.y0 - con;
	p.x = x;
	p.y = y;
	return p;
}
function inverse$9(p) {
	var lon, lat;
	var xx, yy, xys, c1, c2, c3;
	var a1;
	var m1;
	var con;
	var th1;
	var d;
	p.x -= this.x0;
	p.y -= this.y0;
	con = Math.PI * this.R;
	xx = p.x / con;
	yy = p.y / con;
	xys = xx * xx + yy * yy;
	c1 = -Math.abs(yy) * (1 + xys);
	c2 = c1 - 2 * yy * yy + xx * xx;
	c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
	d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
	a1 = (c1 - c2 * c2 / 3 / c3) / c3;
	m1 = 2 * Math.sqrt(-a1 / 3);
	con = 3 * d / a1 / m1;
	if (Math.abs(con) > 1) if (con >= 0) con = 1;
	else con = -1;
	th1 = Math.acos(con) / 3;
	if (p.y >= 0) lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
	else lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
	if (Math.abs(xx) < 1e-10) lon = this.long0;
	else lon = adjust_lon_default(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx, this.over);
	p.x = lon;
	p.y = lat;
	return p;
}
var vandg_default = {
	init: init$10,
	forward: forward$9,
	inverse: inverse$9,
	names: [
		"Van_der_Grinten_I",
		"VanDerGrinten",
		"Van_der_Grinten",
		"vandg"
	]
};
//#endregion
//#region node_modules/proj4/lib/common/vincenty.js
/**
* Calculates the inverse geodesic problem using Vincenty's formulae.
* Computes the forward azimuth and ellipsoidal distance between two points
* specified by latitude and longitude on the surface of an ellipsoid.
*
* @param {number} lat1 Latitude of the first point in radians.
* @param {number} lon1 Longitude of the first point in radians.
* @param {number} lat2 Latitude of the second point in radians.
* @param {number} lon2 Longitude of the second point in radians.
* @param {number} a Semi-major axis of the ellipsoid (meters).
* @param {number} f Flattening of the ellipsoid.
* @returns {{ azi1: number, s12: number }} An object containing:
*   - azi1: Forward azimuth from the first point to the second point (radians).
*   - s12: Ellipsoidal distance between the two points (meters).
*/
function vincentyInverse(lat1, lon1, lat2, lon2, a, f) {
	const L = lon2 - lon1;
	const U1 = Math.atan((1 - f) * Math.tan(lat1));
	const U2 = Math.atan((1 - f) * Math.tan(lat2));
	const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
	const sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
	let lambda = L, lambdaP, iterLimit = 100;
	let sinLambda, cosLambda, sinSigma, cosSigma, sigma, sinAlpha, cos2Alpha, cos2SigmaM, C;
	let uSq, A, B, deltaSigma, s;
	do {
		sinLambda = Math.sin(lambda);
		cosLambda = Math.cos(lambda);
		sinSigma = Math.sqrt(cosU2 * sinLambda * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
		if (sinSigma === 0) return {
			azi1: 0,
			s12: 0
		};
		cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
		sigma = Math.atan2(sinSigma, cosSigma);
		sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
		cos2Alpha = 1 - sinAlpha * sinAlpha;
		cos2SigmaM = cos2Alpha !== 0 ? cosSigma - 2 * sinU1 * sinU2 / cos2Alpha : 0;
		C = f / 16 * cos2Alpha * (4 + f * (4 - 3 * cos2Alpha));
		lambdaP = lambda;
		lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
	} while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
	if (iterLimit === 0) return {
		azi1: NaN,
		s12: NaN
	};
	uSq = cos2Alpha * (a * a - a * (1 - f) * (a * (1 - f))) / (a * (1 - f) * (a * (1 - f)));
	A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
	B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
	deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
	s = a * (1 - f) * A * (sigma - deltaSigma);
	return {
		azi1: Math.atan2(cosU2 * sinLambda, cosU1 * sinU2 - sinU1 * cosU2 * cosLambda),
		s12: s
	};
}
/**
* Solves the direct geodetic problem using Vincenty's formulae.
* Given a starting point, initial azimuth, and distance, computes the destination point on the ellipsoid.
*
* @param {number} lat1 Latitude of the starting point in radians.
* @param {number} lon1 Longitude of the starting point in radians.
* @param {number} azi1 Initial azimuth (forward azimuth) in radians.
* @param {number} s12 Distance to travel from the starting point in meters.
* @param {number} a Semi-major axis of the ellipsoid in meters.
* @param {number} f Flattening of the ellipsoid.
* @returns {{lat2: number, lon2: number}} The latitude and longitude (in radians) of the destination point.
*/
function vincentyDirect(lat1, lon1, azi1, s12, a, f) {
	const U1 = Math.atan((1 - f) * Math.tan(lat1));
	const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
	const sinAlpha1 = Math.sin(azi1), cosAlpha1 = Math.cos(azi1);
	const sigma1 = Math.atan2(sinU1, cosU1 * cosAlpha1);
	const sinAlpha = cosU1 * sinAlpha1;
	const cos2Alpha = 1 - sinAlpha * sinAlpha;
	const uSq = cos2Alpha * (a * a - a * (1 - f) * (a * (1 - f))) / (a * (1 - f) * (a * (1 - f)));
	const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
	const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
	let sigma = s12 / (a * (1 - f) * A), sigmaP, iterLimit = 100;
	let cos2SigmaM, sinSigma, cosSigma, deltaSigma;
	do {
		cos2SigmaM = Math.cos(2 * sigma1 + sigma);
		sinSigma = Math.sin(sigma);
		cosSigma = Math.cos(sigma);
		deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
		sigmaP = sigma;
		sigma = s12 / (a * (1 - f) * A) + deltaSigma;
	} while (Math.abs(sigma - sigmaP) > 1e-12 && --iterLimit > 0);
	if (iterLimit === 0) return {
		lat2: NaN,
		lon2: NaN
	};
	const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
	const lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
	const lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
	const C = f / 16 * cos2Alpha * (4 + f * (4 - 3 * cos2Alpha));
	return {
		lat2,
		lon2: lon1 + (lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM))))
	};
}
//#endregion
//#region node_modules/proj4/lib/projections/aeqd.js
/**
* @typedef {Object} LocalThis
* @property {number} es
* @property {number} sin_p12
* @property {number} cos_p12
* @property {number} a
* @property {number} f
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$9() {
	this.sin_p12 = Math.sin(this.lat0);
	this.cos_p12 = Math.cos(this.lat0);
	this.f = this.es / (1 + Math.sqrt(1 - this.es));
}
function forward$8(p) {
	var lon = p.x;
	var lat = p.y;
	var sinphi = Math.sin(p.y);
	var cosphi = Math.cos(p.y);
	var dlon = adjust_lon_default(lon - this.long0, this.over);
	var e0, e1, e2, e3, Mlp, Ml, c, kp, cos_c, vars, azi1;
	if (this.sphere) if (Math.abs(this.sin_p12 - 1) <= 1e-10) {
		p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
		p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
		return p;
	} else if (Math.abs(this.sin_p12 + 1) <= 1e-10) {
		p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
		p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
		return p;
	} else {
		cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
		c = Math.acos(cos_c);
		kp = c ? c / Math.sin(c) : 1;
		p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
		p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
		return p;
	}
	else {
		e0 = e0fn_default(this.es);
		e1 = e1fn_default(this.es);
		e2 = e2fn_default(this.es);
		e3 = e3fn_default(this.es);
		if (Math.abs(this.sin_p12 - 1) <= 1e-10) {
			Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
			Ml = this.a * mlfn_default(e0, e1, e2, e3, lat);
			p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
			p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
			return p;
		} else if (Math.abs(this.sin_p12 + 1) <= 1e-10) {
			Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
			Ml = this.a * mlfn_default(e0, e1, e2, e3, lat);
			p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
			p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
			return p;
		} else {
			if (Math.abs(lon) < 1e-10 && Math.abs(lat - this.lat0) < 1e-10) {
				p.x = p.y = 0;
				return p;
			}
			vars = vincentyInverse(this.lat0, this.long0, lat, lon, this.a, this.f);
			azi1 = vars.azi1;
			p.x = vars.s12 * Math.sin(azi1);
			p.y = vars.s12 * Math.cos(azi1);
			return p;
		}
	}
}
function inverse$8(p) {
	p.x -= this.x0;
	p.y -= this.y0;
	var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, azi1, s12, vars;
	if (this.sphere) {
		rh = Math.sqrt(p.x * p.x + p.y * p.y);
		if (rh > 2 * HALF_PI * this.a) return;
		z = rh / this.a;
		sinz = Math.sin(z);
		cosz = Math.cos(z);
		lon = this.long0;
		if (Math.abs(rh) <= 1e-10) lat = this.lat0;
		else {
			lat = asinz_default(cosz * this.sin_p12 + p.y * sinz * this.cos_p12 / rh);
			con = Math.abs(this.lat0) - HALF_PI;
			if (Math.abs(con) <= 1e-10) if (this.lat0 >= 0) lon = adjust_lon_default(this.long0 + Math.atan2(p.x, -p.y), this.over);
			else lon = adjust_lon_default(this.long0 - Math.atan2(-p.x, p.y), this.over);
			else lon = adjust_lon_default(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz), this.over);
		}
		p.x = lon;
		p.y = lat;
		return p;
	} else {
		e0 = e0fn_default(this.es);
		e1 = e1fn_default(this.es);
		e2 = e2fn_default(this.es);
		e3 = e3fn_default(this.es);
		if (Math.abs(this.sin_p12 - 1) <= 1e-10) {
			Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
			rh = Math.sqrt(p.x * p.x + p.y * p.y);
			M = Mlp - rh;
			lat = imlfn_default(M / this.a, e0, e1, e2, e3);
			lon = adjust_lon_default(this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
			p.x = lon;
			p.y = lat;
			return p;
		} else if (Math.abs(this.sin_p12 + 1) <= 1e-10) {
			Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
			rh = Math.sqrt(p.x * p.x + p.y * p.y);
			M = rh - Mlp;
			lat = imlfn_default(M / this.a, e0, e1, e2, e3);
			lon = adjust_lon_default(this.long0 + Math.atan2(p.x, p.y), this.over);
			p.x = lon;
			p.y = lat;
			return p;
		} else {
			azi1 = Math.atan2(p.x, p.y);
			s12 = Math.sqrt(p.x * p.x + p.y * p.y);
			vars = vincentyDirect(this.lat0, this.long0, azi1, s12, this.a, this.f);
			p.x = vars.lon2;
			p.y = vars.lat2;
			return p;
		}
	}
}
var aeqd_default = {
	init: init$9,
	forward: forward$8,
	inverse: inverse$8,
	names: ["Azimuthal_Equidistant", "aeqd"]
};
//#endregion
//#region node_modules/proj4/lib/projections/ortho.js
/**
* @typedef {Object} LocalThis
* @property {number} sin_p14
* @property {number} cos_p14
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$8() {
	this.sin_p14 = Math.sin(this.lat0 || 0);
	this.cos_p14 = Math.cos(this.lat0 || 0);
}
function forward$7(p) {
	var sinphi, cosphi;
	var dlon;
	var coslon;
	var ksp;
	var g, x, y;
	var lon = p.x;
	var lat = p.y;
	dlon = adjust_lon_default(lon - (this.long0 || 0), this.over);
	sinphi = Math.sin(lat);
	cosphi = Math.cos(lat);
	coslon = Math.cos(dlon);
	g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
	ksp = 1;
	if (g > 0 || Math.abs(g) <= 1e-10) {
		x = this.a * ksp * cosphi * Math.sin(dlon);
		y = (this.y0 || 0) + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
	}
	p.x = x;
	p.y = y;
	return p;
}
function inverse$7(p) {
	var rh;
	var z;
	var sinz, cosz;
	var con;
	var lon, lat;
	var long0, lat0;
	p.x -= this.x0 || 0;
	p.y -= this.y0 || 0;
	rh = Math.sqrt(p.x * p.x + p.y * p.y);
	z = asinz_default(rh / this.a);
	sinz = Math.sin(z);
	cosz = Math.cos(z);
	long0 = this.long0 || 0;
	lat0 = this.lat0 || 0;
	lon = long0;
	if (Math.abs(rh) <= 1e-10) {
		lat = lat0;
		p.x = lon;
		p.y = lat;
		return p;
	}
	lat = asinz_default(cosz * this.sin_p14 + p.y * sinz * this.cos_p14 / rh);
	con = Math.abs(lat0) - HALF_PI;
	if (Math.abs(con) <= 1e-10) {
		if (lat0 >= 0) lon = adjust_lon_default(long0 + Math.atan2(p.x, -p.y), this.over);
		else lon = adjust_lon_default(long0 - Math.atan2(-p.x, p.y), this.over);
		p.x = lon;
		p.y = lat;
		return p;
	}
	lon = adjust_lon_default(long0 + Math.atan2(p.x * sinz, rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz), this.over);
	p.x = lon;
	p.y = lat;
	return p;
}
var ortho_default = {
	init: init$8,
	forward: forward$7,
	inverse: inverse$7,
	names: ["ortho"]
};
//#endregion
//#region node_modules/proj4/lib/projections/qsc.js
/**
* @typedef {Object} LocalThis
* @property {number} face
* @property {number} x0
* @property {number} y0
* @property {number} es
* @property {number} one_minus_f
* @property {number} one_minus_f_squared
*/
var FACE_ENUM = {
	FRONT: 1,
	RIGHT: 2,
	BACK: 3,
	LEFT: 4,
	TOP: 5,
	BOTTOM: 6
};
var AREA_ENUM = {
	AREA_0: 1,
	AREA_1: 2,
	AREA_2: 3,
	AREA_3: 4
};
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$7() {
	this.x0 = this.x0 || 0;
	this.y0 = this.y0 || 0;
	this.lat0 = this.lat0 || 0;
	this.long0 = this.long0 || 0;
	this.lat_ts = this.lat_ts || 0;
	this.title = this.title || "Quadrilateralized Spherical Cube";
	if (this.lat0 >= HALF_PI - FORTPI / 2) this.face = FACE_ENUM.TOP;
	else if (this.lat0 <= -(HALF_PI - FORTPI / 2)) this.face = FACE_ENUM.BOTTOM;
	else if (Math.abs(this.long0) <= FORTPI) this.face = FACE_ENUM.FRONT;
	else if (Math.abs(this.long0) <= HALF_PI + FORTPI) this.face = this.long0 > 0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
	else this.face = FACE_ENUM.BACK;
	if (this.es !== 0) {
		this.one_minus_f = 1 - (this.a - this.b) / this.a;
		this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
	}
}
function forward$6(p) {
	var xy = {
		x: 0,
		y: 0
	};
	var lat, lon;
	var theta, phi;
	var t, mu;
	var area = { value: 0 };
	p.x -= this.long0;
	if (this.es !== 0) lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
	else lat = p.y;
	lon = p.x;
	if (this.face === FACE_ENUM.TOP) {
		phi = HALF_PI - lat;
		if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
			area.value = AREA_ENUM.AREA_0;
			theta = lon - HALF_PI;
		} else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
			area.value = AREA_ENUM.AREA_1;
			theta = lon > 0 ? lon - SPI : lon + SPI;
		} else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
			area.value = AREA_ENUM.AREA_2;
			theta = lon + HALF_PI;
		} else {
			area.value = AREA_ENUM.AREA_3;
			theta = lon;
		}
	} else if (this.face === FACE_ENUM.BOTTOM) {
		phi = HALF_PI + lat;
		if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
			area.value = AREA_ENUM.AREA_0;
			theta = -lon + HALF_PI;
		} else if (lon < FORTPI && lon >= -FORTPI) {
			area.value = AREA_ENUM.AREA_1;
			theta = -lon;
		} else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
			area.value = AREA_ENUM.AREA_2;
			theta = -lon - HALF_PI;
		} else {
			area.value = AREA_ENUM.AREA_3;
			theta = lon > 0 ? -lon + SPI : -lon - SPI;
		}
	} else {
		var q, r, s;
		var sinlat, coslat;
		var sinlon, coslon;
		if (this.face === FACE_ENUM.RIGHT) lon = qsc_shift_lon_origin(lon, +HALF_PI);
		else if (this.face === FACE_ENUM.BACK) lon = qsc_shift_lon_origin(lon, +SPI);
		else if (this.face === FACE_ENUM.LEFT) lon = qsc_shift_lon_origin(lon, -HALF_PI);
		sinlat = Math.sin(lat);
		coslat = Math.cos(lat);
		sinlon = Math.sin(lon);
		coslon = Math.cos(lon);
		q = coslat * coslon;
		r = coslat * sinlon;
		s = sinlat;
		if (this.face === FACE_ENUM.FRONT) {
			phi = Math.acos(q);
			theta = qsc_fwd_equat_face_theta(phi, s, r, area);
		} else if (this.face === FACE_ENUM.RIGHT) {
			phi = Math.acos(r);
			theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
		} else if (this.face === FACE_ENUM.BACK) {
			phi = Math.acos(-q);
			theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
		} else if (this.face === FACE_ENUM.LEFT) {
			phi = Math.acos(-r);
			theta = qsc_fwd_equat_face_theta(phi, s, q, area);
		} else {
			phi = theta = 0;
			area.value = AREA_ENUM.AREA_0;
		}
	}
	mu = Math.atan(12 / SPI * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
	t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));
	if (area.value === AREA_ENUM.AREA_1) mu += HALF_PI;
	else if (area.value === AREA_ENUM.AREA_2) mu += SPI;
	else if (area.value === AREA_ENUM.AREA_3) mu += 1.5 * SPI;
	xy.x = t * Math.cos(mu);
	xy.y = t * Math.sin(mu);
	xy.x = xy.x * this.a + this.x0;
	xy.y = xy.y * this.a + this.y0;
	p.x = xy.x;
	p.y = xy.y;
	return p;
}
function inverse$6(p) {
	var lp = {
		lam: 0,
		phi: 0
	};
	var mu, nu, cosmu, tannu;
	var tantheta, theta, cosphi, phi;
	var t;
	var area = { value: 0 };
	p.x = (p.x - this.x0) / this.a;
	p.y = (p.y - this.y0) / this.a;
	nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
	mu = Math.atan2(p.y, p.x);
	if (p.x >= 0 && p.x >= Math.abs(p.y)) area.value = AREA_ENUM.AREA_0;
	else if (p.y >= 0 && p.y >= Math.abs(p.x)) {
		area.value = AREA_ENUM.AREA_1;
		mu -= HALF_PI;
	} else if (p.x < 0 && -p.x >= Math.abs(p.y)) {
		area.value = AREA_ENUM.AREA_2;
		mu = mu < 0 ? mu + SPI : mu - SPI;
	} else {
		area.value = AREA_ENUM.AREA_3;
		mu += HALF_PI;
	}
	t = SPI / 12 * Math.tan(mu);
	tantheta = Math.sin(t) / (Math.cos(t) - 1 / Math.sqrt(2));
	theta = Math.atan(tantheta);
	cosmu = Math.cos(mu);
	tannu = Math.tan(nu);
	cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
	if (cosphi < -1) cosphi = -1;
	else if (cosphi > 1) cosphi = 1;
	if (this.face === FACE_ENUM.TOP) {
		phi = Math.acos(cosphi);
		lp.phi = HALF_PI - phi;
		if (area.value === AREA_ENUM.AREA_0) lp.lam = theta + HALF_PI;
		else if (area.value === AREA_ENUM.AREA_1) lp.lam = theta < 0 ? theta + SPI : theta - SPI;
		else if (area.value === AREA_ENUM.AREA_2) lp.lam = theta - HALF_PI;
		else lp.lam = theta;
	} else if (this.face === FACE_ENUM.BOTTOM) {
		phi = Math.acos(cosphi);
		lp.phi = phi - HALF_PI;
		if (area.value === AREA_ENUM.AREA_0) lp.lam = -theta + HALF_PI;
		else if (area.value === AREA_ENUM.AREA_1) lp.lam = -theta;
		else if (area.value === AREA_ENUM.AREA_2) lp.lam = -theta - HALF_PI;
		else lp.lam = theta < 0 ? -theta - SPI : -theta + SPI;
	} else {
		var q = cosphi, r, s;
		t = q * q;
		if (t >= 1) s = 0;
		else s = Math.sqrt(1 - t) * Math.sin(theta);
		t += s * s;
		if (t >= 1) r = 0;
		else r = Math.sqrt(1 - t);
		if (area.value === AREA_ENUM.AREA_1) {
			t = r;
			r = -s;
			s = t;
		} else if (area.value === AREA_ENUM.AREA_2) {
			r = -r;
			s = -s;
		} else if (area.value === AREA_ENUM.AREA_3) {
			t = r;
			r = s;
			s = -t;
		}
		if (this.face === FACE_ENUM.RIGHT) {
			t = q;
			q = -r;
			r = t;
		} else if (this.face === FACE_ENUM.BACK) {
			q = -q;
			r = -r;
		} else if (this.face === FACE_ENUM.LEFT) {
			t = q;
			q = r;
			r = -t;
		}
		lp.phi = Math.acos(-s) - HALF_PI;
		lp.lam = Math.atan2(r, q);
		if (this.face === FACE_ENUM.RIGHT) lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI);
		else if (this.face === FACE_ENUM.BACK) lp.lam = qsc_shift_lon_origin(lp.lam, -SPI);
		else if (this.face === FACE_ENUM.LEFT) lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI);
	}
	if (this.es !== 0) {
		var invert_sign;
		var tanphi, xa;
		invert_sign = lp.phi < 0 ? 1 : 0;
		tanphi = Math.tan(lp.phi);
		xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
		lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
		if (invert_sign) lp.phi = -lp.phi;
	}
	lp.lam += this.long0;
	p.x = lp.lam;
	p.y = lp.phi;
	return p;
}
function qsc_fwd_equat_face_theta(phi, y, x, area) {
	var theta;
	if (phi < 1e-10) {
		area.value = AREA_ENUM.AREA_0;
		theta = 0;
	} else {
		theta = Math.atan2(y, x);
		if (Math.abs(theta) <= FORTPI) area.value = AREA_ENUM.AREA_0;
		else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
			area.value = AREA_ENUM.AREA_1;
			theta -= HALF_PI;
		} else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
			area.value = AREA_ENUM.AREA_2;
			theta = theta >= 0 ? theta - SPI : theta + SPI;
		} else {
			area.value = AREA_ENUM.AREA_3;
			theta += HALF_PI;
		}
	}
	return theta;
}
function qsc_shift_lon_origin(lon, offset) {
	var slon = lon + offset;
	if (slon < -3.14159265359) slon += TWO_PI;
	else if (slon > 3.14159265359) slon -= TWO_PI;
	return slon;
}
var qsc_default = {
	init: init$7,
	forward: forward$6,
	inverse: inverse$6,
	names: [
		"Quadrilateralized Spherical Cube",
		"Quadrilateralized_Spherical_Cube",
		"qsc"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/robin.js
var COEFS_X = [
	[
		1,
		22199e-21,
		-715515e-10,
		31103e-10
	],
	[
		.9986,
		-482243e-9,
		-24897e-9,
		-13309e-10
	],
	[
		.9954,
		-83103e-8,
		-448605e-10,
		-9.86701e-7
	],
	[
		.99,
		-.00135364,
		-59661e-9,
		36777e-10
	],
	[
		.9822,
		-.00167442,
		-449547e-11,
		-572411e-11
	],
	[
		.973,
		-.00214868,
		-903571e-10,
		1.8736e-8
	],
	[
		.96,
		-.00305085,
		-900761e-10,
		164917e-11
	],
	[
		.9427,
		-.00382792,
		-653386e-10,
		-26154e-10
	],
	[
		.9216,
		-.00467746,
		-10457e-8,
		481243e-11
	],
	[
		.8962,
		-.00536223,
		-323831e-10,
		-543432e-11
	],
	[
		.8679,
		-.00609363,
		-113898e-9,
		332484e-11
	],
	[
		.835,
		-.00698325,
		-640253e-10,
		9.34959e-7
	],
	[
		.7986,
		-.00755338,
		-500009e-10,
		9.35324e-7
	],
	[
		.7597,
		-.00798324,
		-35971e-9,
		-227626e-11
	],
	[
		.7186,
		-.00851367,
		-701149e-10,
		-86303e-10
	],
	[
		.6732,
		-.00986209,
		-199569e-9,
		191974e-10
	],
	[
		.6213,
		-.010418,
		883923e-10,
		624051e-11
	],
	[
		.5722,
		-.00906601,
		182e-6,
		624051e-11
	],
	[
		.5322,
		-.00677797,
		275608e-9,
		624051e-11
	]
];
var COEFS_Y = [
	[
		-520417e-23,
		.0124,
		121431e-23,
		-845284e-16
	],
	[
		.062,
		.0124,
		-1.26793e-9,
		422642e-15
	],
	[
		.124,
		.0124,
		5.07171e-9,
		-1.60604e-9
	],
	[
		.186,
		.0123999,
		-1.90189e-8,
		6.00152e-9
	],
	[
		.248,
		.0124002,
		7.10039e-8,
		-2.24e-8
	],
	[
		.31,
		.0123992,
		-2.64997e-7,
		8.35986e-8
	],
	[
		.372,
		.0124029,
		9.88983e-7,
		-3.11994e-7
	],
	[
		.434,
		.0123893,
		-369093e-11,
		-4.35621e-7
	],
	[
		.4958,
		.0123198,
		-102252e-10,
		-3.45523e-7
	],
	[
		.5571,
		.0121916,
		-154081e-10,
		-5.82288e-7
	],
	[
		.6176,
		.0119938,
		-241424e-10,
		-5.25327e-7
	],
	[
		.6769,
		.011713,
		-320223e-10,
		-5.16405e-7
	],
	[
		.7346,
		.0113541,
		-397684e-10,
		-6.09052e-7
	],
	[
		.7903,
		.0109107,
		-489042e-10,
		-104739e-11
	],
	[
		.8435,
		.0103431,
		-64615e-9,
		-1.40374e-9
	],
	[
		.8936,
		.00969686,
		-64636e-9,
		-8547e-9
	],
	[
		.9394,
		.00840947,
		-192841e-9,
		-42106e-10
	],
	[
		.9761,
		.00616527,
		-256e-6,
		-42106e-10
	],
	[
		1,
		.00328947,
		-319159e-9,
		-42106e-10
	]
];
var FXC = .8487;
var FYC = 1.3523;
var C1 = R2D / 5;
var RC1 = 1 / C1;
var NODES = 18;
var poly3_val = function(coefs, x) {
	return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
};
var poly3_der = function(coefs, x) {
	return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
};
function newton_rapshon(f_df, start, max_err, iters) {
	var x = start;
	for (; iters; --iters) {
		var upd = f_df(x);
		x -= upd;
		if (Math.abs(upd) < max_err) break;
	}
	return x;
}
function init$6() {
	this.x0 = this.x0 || 0;
	this.y0 = this.y0 || 0;
	this.long0 = this.long0 || 0;
	this.es = 0;
	this.title = this.title || "Robinson";
}
function forward$5(ll) {
	var lon = adjust_lon_default(ll.x - this.long0, this.over);
	var dphi = Math.abs(ll.y);
	var i = Math.floor(dphi * C1);
	if (i < 0) i = 0;
	else if (i >= NODES) i = NODES - 1;
	dphi = R2D * (dphi - RC1 * i);
	var xy = {
		x: poly3_val(COEFS_X[i], dphi) * lon,
		y: poly3_val(COEFS_Y[i], dphi)
	};
	if (ll.y < 0) xy.y = -xy.y;
	xy.x = xy.x * this.a * FXC + this.x0;
	xy.y = xy.y * this.a * FYC + this.y0;
	return xy;
}
function inverse$5(xy) {
	var ll = {
		x: (xy.x - this.x0) / (this.a * FXC),
		y: Math.abs(xy.y - this.y0) / (this.a * FYC)
	};
	if (ll.y >= 1) {
		ll.x /= COEFS_X[NODES][0];
		ll.y = xy.y < 0 ? -HALF_PI : HALF_PI;
	} else {
		var i = Math.floor(ll.y * NODES);
		if (i < 0) i = 0;
		else if (i >= NODES) i = NODES - 1;
		for (;;) if (COEFS_Y[i][0] > ll.y) --i;
		else if (COEFS_Y[i + 1][0] <= ll.y) ++i;
		else break;
		var coefs = COEFS_Y[i];
		var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i + 1][0] - coefs[0]);
		t = newton_rapshon(function(x) {
			return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
		}, t, EPSLN, 100);
		ll.x /= poly3_val(COEFS_X[i], t);
		ll.y = (5 * i + t) * D2R$1;
		if (xy.y < 0) ll.y = -ll.y;
	}
	ll.x = adjust_lon_default(ll.x + this.long0, this.over);
	return ll;
}
var robin_default = {
	init: init$6,
	forward: forward$5,
	inverse: inverse$5,
	names: ["Robinson", "robin"]
};
//#endregion
//#region node_modules/proj4/lib/projections/geocent.js
function init$5() {
	this.name = "geocent";
}
function forward$4(p) {
	return geodeticToGeocentric(p, this.es, this.a);
}
function inverse$4(p) {
	return geocentricToGeodetic(p, this.es, this.a, this.b);
}
var geocent_default = {
	init: init$5,
	forward: forward$4,
	inverse: inverse$4,
	names: [
		"Geocentric",
		"geocentric",
		"geocent",
		"Geocent"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/tpers.js
/**
* @typedef {Object} LocalThis
* @property {number} mode
* @property {number} sinph0
* @property {number} cosph0
* @property {number} pn1
* @property {number} h
* @property {number} rp
* @property {number} p
* @property {number} h1
* @property {number} pfact
* @property {number} es
* @property {number} tilt
* @property {number} azi
* @property {number} cg
* @property {number} sg
* @property {number} cw
* @property {number} sw
*/
var mode = {
	N_POLE: 0,
	S_POLE: 1,
	EQUIT: 2,
	OBLIQ: 3
};
var params = {
	h: {
		def: 1e5,
		num: true
	},
	azi: {
		def: 0,
		num: true,
		degrees: true
	},
	tilt: {
		def: 0,
		num: true,
		degrees: true
	},
	long0: {
		def: 0,
		num: true
	},
	lat0: {
		def: 0,
		num: true
	}
};
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$4() {
	Object.keys(params).forEach(function(p) {
		if (typeof this[p] === "undefined") this[p] = params[p].def;
		else if (params[p].num && isNaN(this[p])) throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p]);
		else if (params[p].num) this[p] = parseFloat(this[p]);
		if (params[p].degrees) this[p] = this[p] * D2R$1;
	}.bind(this));
	if (Math.abs(Math.abs(this.lat0) - HALF_PI) < 1e-10) this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
	else if (Math.abs(this.lat0) < 1e-10) this.mode = mode.EQUIT;
	else {
		this.mode = mode.OBLIQ;
		this.sinph0 = Math.sin(this.lat0);
		this.cosph0 = Math.cos(this.lat0);
	}
	this.pn1 = this.h / this.a;
	if (this.pn1 <= 0 || this.pn1 > 1e10) throw new Error("Invalid height");
	this.p = 1 + this.pn1;
	this.rp = 1 / this.p;
	this.h1 = 1 / this.pn1;
	this.pfact = (this.p + 1) * this.h1;
	this.es = 0;
	var omega = this.tilt;
	var gamma = this.azi;
	this.cg = Math.cos(gamma);
	this.sg = Math.sin(gamma);
	this.cw = Math.cos(omega);
	this.sw = Math.sin(omega);
}
function forward$3(p) {
	p.x -= this.long0;
	var sinphi = Math.sin(p.y);
	var cosphi = Math.cos(p.y);
	var coslam = Math.cos(p.x);
	var x, y;
	switch (this.mode) {
		case mode.OBLIQ:
			y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
			break;
		case mode.EQUIT:
			y = cosphi * coslam;
			break;
		case mode.S_POLE:
			y = -sinphi;
			break;
		case mode.N_POLE:
			y = sinphi;
			break;
	}
	y = this.pn1 / (this.p - y);
	x = y * cosphi * Math.sin(p.x);
	switch (this.mode) {
		case mode.OBLIQ:
			y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
			break;
		case mode.EQUIT:
			y *= sinphi;
			break;
		case mode.N_POLE:
			y *= -(cosphi * coslam);
			break;
		case mode.S_POLE:
			y *= cosphi * coslam;
			break;
	}
	var yt = y * this.cg + x * this.sg, ba = 1 / (yt * this.sw * this.h1 + this.cw);
	x = (x * this.cg - y * this.sg) * this.cw * ba;
	y = yt * ba;
	p.x = x * this.a;
	p.y = y * this.a;
	return p;
}
function inverse$3(p) {
	p.x /= this.a;
	p.y /= this.a;
	var r = {
		x: p.x,
		y: p.y
	};
	var bm, bq, yt = 1 / (this.pn1 - p.y * this.sw);
	bm = this.pn1 * p.x * yt;
	bq = this.pn1 * p.y * this.cw * yt;
	p.x = bm * this.cg + bq * this.sg;
	p.y = bq * this.cg - bm * this.sg;
	var rh = hypot_default(p.x, p.y);
	if (Math.abs(rh) < 1e-10) {
		r.x = 0;
		r.y = p.y;
	} else {
		var cosz, sinz = 1 - rh * rh * this.pfact;
		sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
		cosz = Math.sqrt(1 - sinz * sinz);
		switch (this.mode) {
			case mode.OBLIQ:
				r.y = Math.asin(cosz * this.sinph0 + p.y * sinz * this.cosph0 / rh);
				p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
				p.x *= sinz * this.cosph0;
				break;
			case mode.EQUIT:
				r.y = Math.asin(p.y * sinz / rh);
				p.y = cosz * rh;
				p.x *= sinz;
				break;
			case mode.N_POLE:
				r.y = Math.asin(cosz);
				p.y = -p.y;
				break;
			case mode.S_POLE:
				r.y = -Math.asin(cosz);
				break;
		}
		r.x = Math.atan2(p.x, p.y);
	}
	p.x = r.x + this.long0;
	p.y = r.y;
	return p;
}
var tpers_default = {
	init: init$4,
	forward: forward$3,
	inverse: inverse$3,
	names: ["Tilted_Perspective", "tpers"]
};
//#endregion
//#region node_modules/proj4/lib/projections/geos.js
/**
* @typedef {Object} LocalThis
* @property {1 | 0} flip_axis
* @property {number} h
* @property {number} radius_g_1
* @property {number} radius_g
* @property {number} radius_p
* @property {number} radius_p2
* @property {number} radius_p_inv2
* @property {'ellipse'|'sphere'} shape
* @property {number} C
* @property {string} sweep
* @property {number} es
*/
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$3() {
	this.flip_axis = this.sweep === "x" ? 1 : 0;
	this.h = Number(this.h);
	this.radius_g_1 = this.h / this.a;
	if (this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) throw new Error();
	this.radius_g = 1 + this.radius_g_1;
	this.C = this.radius_g * this.radius_g - 1;
	if (this.es !== 0) {
		var one_es = 1 - this.es;
		var rone_es = 1 / one_es;
		this.radius_p = Math.sqrt(one_es);
		this.radius_p2 = one_es;
		this.radius_p_inv2 = rone_es;
		this.shape = "ellipse";
	} else {
		this.radius_p = 1;
		this.radius_p2 = 1;
		this.radius_p_inv2 = 1;
		this.shape = "sphere";
	}
	if (!this.title) this.title = "Geostationary Satellite View";
}
function forward$2(p) {
	var lon = p.x;
	var lat = p.y;
	var tmp, v_x, v_y, v_z;
	lon = lon - this.long0;
	if (this.shape === "ellipse") {
		lat = Math.atan(this.radius_p2 * Math.tan(lat));
		var r = this.radius_p / hypot_default(this.radius_p * Math.cos(lat), Math.sin(lat));
		v_x = r * Math.cos(lon) * Math.cos(lat);
		v_y = r * Math.sin(lon) * Math.cos(lat);
		v_z = r * Math.sin(lat);
		if ((this.radius_g - v_x) * v_x - v_y * v_y - v_z * v_z * this.radius_p_inv2 < 0) {
			p.x = NaN;
			p.y = NaN;
			return p;
		}
		tmp = this.radius_g - v_x;
		if (this.flip_axis) {
			p.x = this.radius_g_1 * Math.atan(v_y / hypot_default(v_z, tmp));
			p.y = this.radius_g_1 * Math.atan(v_z / tmp);
		} else {
			p.x = this.radius_g_1 * Math.atan(v_y / tmp);
			p.y = this.radius_g_1 * Math.atan(v_z / hypot_default(v_y, tmp));
		}
	} else if (this.shape === "sphere") {
		tmp = Math.cos(lat);
		v_x = Math.cos(lon) * tmp;
		v_y = Math.sin(lon) * tmp;
		v_z = Math.sin(lat);
		tmp = this.radius_g - v_x;
		if (this.flip_axis) {
			p.x = this.radius_g_1 * Math.atan(v_y / hypot_default(v_z, tmp));
			p.y = this.radius_g_1 * Math.atan(v_z / tmp);
		} else {
			p.x = this.radius_g_1 * Math.atan(v_y / tmp);
			p.y = this.radius_g_1 * Math.atan(v_z / hypot_default(v_y, tmp));
		}
	}
	p.x = p.x * this.a;
	p.y = p.y * this.a;
	return p;
}
function inverse$2(p) {
	var v_x = -1;
	var v_y = 0;
	var v_z = 0;
	var a, b, det, k;
	p.x = p.x / this.a;
	p.y = p.y / this.a;
	if (this.shape === "ellipse") {
		if (this.flip_axis) {
			v_z = Math.tan(p.y / this.radius_g_1);
			v_y = Math.tan(p.x / this.radius_g_1) * hypot_default(1, v_z);
		} else {
			v_y = Math.tan(p.x / this.radius_g_1);
			v_z = Math.tan(p.y / this.radius_g_1) * hypot_default(1, v_y);
		}
		var v_zp = v_z / this.radius_p;
		a = v_y * v_y + v_zp * v_zp + v_x * v_x;
		b = 2 * this.radius_g * v_x;
		det = b * b - 4 * a * this.C;
		if (det < 0) {
			p.x = NaN;
			p.y = NaN;
			return p;
		}
		k = (-b - Math.sqrt(det)) / (2 * a);
		v_x = this.radius_g + k * v_x;
		v_y *= k;
		v_z *= k;
		p.x = Math.atan2(v_y, v_x);
		p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
		p.y = Math.atan(this.radius_p_inv2 * Math.tan(p.y));
	} else if (this.shape === "sphere") {
		if (this.flip_axis) {
			v_z = Math.tan(p.y / this.radius_g_1);
			v_y = Math.tan(p.x / this.radius_g_1) * Math.sqrt(1 + v_z * v_z);
		} else {
			v_y = Math.tan(p.x / this.radius_g_1);
			v_z = Math.tan(p.y / this.radius_g_1) * Math.sqrt(1 + v_y * v_y);
		}
		a = v_y * v_y + v_z * v_z + v_x * v_x;
		b = 2 * this.radius_g * v_x;
		det = b * b - 4 * a * this.C;
		if (det < 0) {
			p.x = NaN;
			p.y = NaN;
			return p;
		}
		k = (-b - Math.sqrt(det)) / (2 * a);
		v_x = this.radius_g + k * v_x;
		v_y *= k;
		v_z *= k;
		p.x = Math.atan2(v_y, v_x);
		p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
	}
	p.x = p.x + this.long0;
	return p;
}
var geos_default = {
	init: init$3,
	forward: forward$2,
	inverse: inverse$2,
	names: [
		"Geostationary Satellite View",
		"Geostationary_Satellite",
		"geos"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/eqearth.js
/**
* Copyright 2018 Bernie Jenny, Monash University, Melbourne, Australia.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Equal Earth is a projection inspired by the Robinson projection, but unlike
* the Robinson projection retains the relative size of areas. The projection
* was designed in 2018 by Bojan Savric, Tom Patterson and Bernhard Jenny.
*
* Publication:
* Bojan Savric, Tom Patterson & Bernhard Jenny (2018). The Equal Earth map
* projection, International Journal of Geographical Information Science,
* DOI: 10.1080/13658816.2018.1504949
*
* Code released August 2018
* Ported to JavaScript and adapted for mapshaper-proj by Matthew Bloch August 2018
* Modified for proj4js by Andreas Hocevar by Andreas Hocevar March 2024
*/
var A1 = 1.340264, A2 = -.081106, A3 = 893e-6, A4 = .003796, M$1 = Math.sqrt(3) / 2;
function init$2() {
	this.es = 0;
	this.long0 = this.long0 !== void 0 ? this.long0 : 0;
	this.x0 = this.x0 !== void 0 ? this.x0 : 0;
	this.y0 = this.y0 !== void 0 ? this.y0 : 0;
}
function forward$1(p) {
	var lam = adjust_lon_default(p.x - this.long0, this.over);
	var phi = p.y;
	var paramLat = Math.asin(M$1 * Math.sin(phi)), paramLatSq = paramLat * paramLat, paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
	p.x = lam * Math.cos(paramLat) / (M$1 * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)));
	p.y = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq));
	p.x = this.a * p.x + this.x0;
	p.y = this.a * p.y + this.y0;
	return p;
}
function inverse$1(p) {
	p.x = (p.x - this.x0) / this.a;
	p.y = (p.y - this.y0) / this.a;
	var EPS = 1e-9, NITER = 12, paramLat = p.y, paramLatSq, paramLatPow6, fy, fpy, dlat, i;
	for (i = 0; i < NITER; ++i) {
		paramLatSq = paramLat * paramLat;
		paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
		fy = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq)) - p.y;
		fpy = A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq);
		paramLat -= dlat = fy / fpy;
		if (Math.abs(dlat) < EPS) break;
	}
	paramLatSq = paramLat * paramLat;
	paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
	p.x = M$1 * p.x * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)) / Math.cos(paramLat);
	p.y = Math.asin(Math.sin(paramLat) / M$1);
	p.x = adjust_lon_default(p.x + this.long0, this.over);
	return p;
}
var eqearth_default = {
	init: init$2,
	forward: forward$1,
	inverse: inverse$1,
	names: [
		"eqearth",
		"Equal Earth",
		"Equal_Earth"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/bonne.js
/**
* @typedef {Object} LocalThis
* @property {number} phi1
* @property {number} cphi1
* @property {number} es
* @property {Array<number>} en
* @property {number} m1
* @property {number} am1
*/
var EPS10 = 1e-10;
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init$1() {
	var c;
	this.phi1 = this.lat1;
	if (Math.abs(this.phi1) < EPS10) throw new Error();
	if (this.es) {
		this.en = pj_enfn_default(this.es);
		this.m1 = pj_mlfn_default(this.phi1, this.am1 = Math.sin(this.phi1), c = Math.cos(this.phi1), this.en);
		this.am1 = c / (Math.sqrt(1 - this.es * this.am1 * this.am1) * this.am1);
		this.inverse = e_inv;
		this.forward = e_fwd;
	} else {
		if (Math.abs(this.phi1) + EPS10 >= HALF_PI) this.cphi1 = 0;
		else this.cphi1 = 1 / Math.tan(this.phi1);
		this.inverse = s_inv;
		this.forward = s_fwd;
	}
}
function e_fwd(p) {
	var lam = adjust_lon_default(p.x - (this.long0 || 0), this.over);
	var phi = p.y;
	var rh = this.am1 + this.m1 - pj_mlfn_default(phi, E = Math.sin(phi), c = Math.cos(phi), this.en), E = c * lam / (rh * Math.sqrt(1 - this.es * E * E)), c;
	p.x = rh * Math.sin(E);
	p.y = this.am1 - rh * Math.cos(E);
	p.x = this.a * p.x + (this.x0 || 0);
	p.y = this.a * p.y + (this.y0 || 0);
	return p;
}
function e_inv(p) {
	p.x = (p.x - (this.x0 || 0)) / this.a;
	p.y = (p.y - (this.y0 || 0)) / this.a;
	var s, rh = hypot_default(p.x, p.y = this.am1 - p.y), lam, phi = pj_inv_mlfn_default(this.am1 + this.m1 - rh, this.es, this.en);
	if ((s = Math.abs(phi)) < HALF_PI) {
		s = Math.sin(phi);
		lam = rh * Math.atan2(p.x, p.y) * Math.sqrt(1 - this.es * s * s) / Math.cos(phi);
	} else if (Math.abs(s - HALF_PI) <= EPS10) lam = 0;
	else throw new Error();
	p.x = adjust_lon_default(lam + (this.long0 || 0), this.over);
	p.y = adjust_lat_default(phi);
	return p;
}
function s_fwd(p) {
	var lam = adjust_lon_default(p.x - (this.long0 || 0), this.over);
	var phi = p.y;
	var E, rh = this.cphi1 + this.phi1 - phi;
	if (Math.abs(rh) > EPS10) {
		p.x = rh * Math.sin(E = lam * Math.cos(phi) / rh);
		p.y = this.cphi1 - rh * Math.cos(E);
	} else p.x = p.y = 0;
	p.x = this.a * p.x + (this.x0 || 0);
	p.y = this.a * p.y + (this.y0 || 0);
	return p;
}
function s_inv(p) {
	p.x = (p.x - (this.x0 || 0)) / this.a;
	p.y = (p.y - (this.y0 || 0)) / this.a;
	var lam, phi;
	var rh = hypot_default(p.x, p.y = this.cphi1 - p.y);
	phi = this.cphi1 + this.phi1 - rh;
	if (Math.abs(phi) > HALF_PI) throw new Error();
	if (Math.abs(Math.abs(phi) - HALF_PI) <= EPS10) lam = 0;
	else lam = rh * Math.atan2(p.x, p.y) / Math.cos(phi);
	p.x = adjust_lon_default(lam + (this.long0 || 0), this.over);
	p.y = adjust_lat_default(phi);
	return p;
}
var bonne_default = {
	init: init$1,
	names: ["bonne", "Bonne (Werner lat_1=90)"]
};
//#endregion
//#region node_modules/proj4/lib/projections/ob_tran.js
/**
Original projection implementation:
https://github.com/OSGeo/PROJ/blob/46c47e9adf6376ae06afabe5d24a0016a05ced82/src/projections/ob_tran.cpp

Documentation:
https://proj.org/operations/projections/ob_tran.html

References/Formulas:
https://pubs.usgs.gov/pp/1395/report.pdf

Examples:
+proj=ob_tran +o_proj=moll +o_lat_p=45 +o_lon_p=-90
+proj=ob_tran +o_proj=moll +o_lat_p=45 +o_lon_p=-90 +lon_0=60
+proj=ob_tran +o_proj=moll +o_lat_p=45 +o_lon_p=-90 +lon_0=-90
*/
var projectionType = {
	OBLIQUE: {
		forward: forwardOblique,
		inverse: inverseOblique
	},
	TRANSVERSE: {
		forward: forwardTransverse,
		inverse: inverseTransverse
	}
};
/**
* @typedef {Object} LocalThis
* @property {number} lamp
* @property {number} cphip
* @property {number} sphip
* @property {Object} projectionType
* @property {string | undefined} o_proj
* @property {string | undefined} o_lon_p
* @property {string | undefined} o_lat_p
* @property {string | undefined} o_alpha
* @property {string | undefined} o_lon_c
* @property {string | undefined} o_lat_c
* @property {string | undefined} o_lon_1
* @property {string | undefined} o_lat_1
* @property {string | undefined} o_lon_2
* @property {string | undefined} o_lat_2
* @property {number | undefined} oLongP
* @property {number | undefined} oLatP
* @property {number | undefined} oAlpha
* @property {number | undefined} oLongC
* @property {number | undefined} oLatC
* @property {number | undefined} oLong1
* @property {number | undefined} oLat1
* @property {number | undefined} oLong2
* @property {number | undefined} oLat2
* @property {boolean} isIdentity
* @property {import('..').Converter} obliqueProjection
*
*/
/**
*    Parameters can be from the following sets:
*       New pole --> o_lat_p, o_lon_p
*       Rotate about point --> o_alpha, o_lon_c, o_lat_c
*       New equator points --> lon_1, lat_1, lon_2, lat_2
*
*    Per the original source code, the parameter sets are
*    checked in the order of the object below.
*/
var paramSets = {
	ROTATE: {
		o_alpha: "oAlpha",
		o_lon_c: "oLongC",
		o_lat_c: "oLatC"
	},
	NEW_POLE: {
		o_lat_p: "oLatP",
		o_lon_p: "oLongP"
	},
	NEW_EQUATOR: {
		o_lon_1: "oLong1",
		o_lat_1: "oLat1",
		o_lon_2: "oLong2",
		o_lat_2: "oLat2"
	}
};
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function init() {
	this.x0 = this.x0 || 0;
	this.y0 = this.y0 || 0;
	this.long0 = this.long0 || 0;
	this.title = this.title || "General Oblique Transformation";
	this.isIdentity = names$34.includes(this.o_proj);
	/** Verify required parameters exist */
	if (!this.o_proj) throw new Error("Missing parameter: o_proj");
	if (this.o_proj === `ob_tran`) throw new Error("Invalid value for o_proj: " + this.o_proj);
	/** @type {import('../defs.js').ProjectionDefinition} */
	const oProj = Projection(this.projStr.replace("+proj=ob_tran", "").replace("+o_proj=", "+proj=").trim());
	if (!oProj) throw new Error("Invalid parameter: o_proj. Unknown projection " + this.o_proj);
	oProj.long0 = 0;
	this.obliqueProjection = oProj;
	let matchedSet;
	const paramSetsKeys = Object.keys(paramSets);
	/**
	* parse strings, convert to radians, throw on NaN
	* @param {string} name
	* @returns {number | undefined}
	*/
	const parseParam = (name) => {
		if (typeof this[name] === `undefined`) return;
		const val = parseFloat(this[name]) * D2R$1;
		if (isNaN(val)) throw new Error("Invalid value for " + name + ": " + this[name]);
		return val;
	};
	for (let i = 0; i < paramSetsKeys.length; i++) {
		const set = paramSets[paramSetsKeys[i]];
		const params = Object.entries(set);
		if (!params.some(([p]) => typeof this[p] !== "undefined")) continue;
		matchedSet = set;
		for (let ii = 0; ii < params.length; ii++) {
			const [inputParam, param] = params[ii];
			const val = parseParam(inputParam);
			if (typeof val === "undefined") throw new Error("Missing parameter: " + inputParam + ".");
			this[param] = val;
		}
		break;
	}
	if (!matchedSet) throw new Error("No valid parameters provided for ob_tran projection.");
	const { lamp, phip } = createRotation(this, matchedSet);
	this.lamp = lamp;
	if (Math.abs(phip) > 1e-10) {
		this.cphip = Math.cos(phip);
		this.sphip = Math.sin(phip);
		this.projectionType = projectionType.OBLIQUE;
	} else this.projectionType = projectionType.TRANSVERSE;
}
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function forward(p) {
	return this.projectionType.forward(this, p);
}
/** @this {import('../defs.js').ProjectionDefinition & LocalThis} */
function inverse(p) {
	return this.projectionType.inverse(this, p);
}
/**
* @param {import('../defs.js').ProjectionDefinition & LocalThis} params - Initialized projection definition
* @param {Object} how - Transformation method
* @returns {{phip: number, lamp: number}}
*/
function createRotation(params, how) {
	let phip, lamp;
	if (how === paramSets.ROTATE) {
		let lamc = params.oLongC;
		let phic = params.oLatC;
		let alpha = params.oAlpha;
		if (Math.abs(Math.abs(phic) - HALF_PI) <= 1e-10) throw new Error("Invalid value for o_lat_c: " + params.o_lat_c + " should be < 90°");
		lamp = lamc + Math.atan2(-1 * Math.cos(alpha), -1 * Math.sin(alpha) * Math.sin(phic));
		phip = Math.asin(Math.cos(phic) * Math.sin(alpha));
	} else if (how === paramSets.NEW_POLE) {
		lamp = params.oLongP;
		phip = params.oLatP;
	} else {
		let lam1 = params.oLong1;
		let phi1 = params.oLat1;
		let lam2 = params.oLong2;
		let phi2 = params.oLat2;
		let con = Math.abs(phi1);
		if (Math.abs(phi1) > HALF_PI - 1e-10) throw new Error("Invalid value for o_lat_1: " + params.o_lat_1 + " should be < 90°");
		if (Math.abs(phi2) > HALF_PI - 1e-10) throw new Error("Invalid value for o_lat_2: " + params.o_lat_2 + " should be < 90°");
		if (Math.abs(phi1 - phi2) < 1e-10) throw new Error("Invalid value for o_lat_1 and o_lat_2: o_lat_1 should be different from o_lat_2");
		if (con < 1e-10) throw new Error("Invalid value for o_lat_1: o_lat_1 should be different from zero");
		lamp = Math.atan2(Math.cos(phi1) * Math.sin(phi2) * Math.cos(lam1) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(lam2), Math.sin(phi1) * Math.cos(phi2) * Math.sin(lam2) - Math.cos(phi1) * Math.sin(phi2) * Math.sin(lam1));
		phip = Math.atan(-1 * Math.cos(lamp - lam1) / Math.tan(phi1));
	}
	return {
		lamp,
		phip
	};
}
/**
* Forward (lng, lat) to (x, y) for oblique case
* @param {import('../defs.js').ProjectionDefinition & LocalThis} self
* @param {{x: number, y: number}} lp - lambda, phi
*/
function forwardOblique(self, lp) {
	let { x: lam, y: phi } = lp;
	lam += self.long0;
	const coslam = Math.cos(lam);
	const sinphi = Math.sin(phi);
	const cosphi = Math.cos(phi);
	lp.x = adjust_lon_default(Math.atan2(cosphi * Math.sin(lam), self.sphip * cosphi * coslam + self.cphip * sinphi) + self.lamp);
	lp.y = Math.asin(self.sphip * sinphi - self.cphip * cosphi * coslam);
	const result = self.obliqueProjection.forward(lp);
	if (self.isIdentity) {
		result.x *= R2D;
		result.y *= R2D;
	}
	return result;
}
/**
* Forward (lng, lat) to (x, y) for transverse case
* @param {import('../defs.js').ProjectionDefinition & LocalThis} self
* @param {{x: number, y: number}} lp - lambda, phi
*/
function forwardTransverse(self, lp) {
	let { x: lam, y: phi } = lp;
	lam += self.long0;
	const cosphi = Math.cos(phi);
	const coslam = Math.cos(lam);
	lp.x = adjust_lon_default(Math.atan2(cosphi * Math.sin(lam), Math.sin(phi)) + self.lamp);
	lp.y = Math.asin(-1 * cosphi * coslam);
	const result = self.obliqueProjection.forward(lp);
	if (self.isIdentity) {
		result.x *= R2D;
		result.y *= R2D;
	}
	return result;
}
/**
* Inverse (x, y) to (lng, lat) for oblique case
* @param {import('../defs.js').ProjectionDefinition & LocalThis} self
* @param {{x: number, y: number}} lp - lambda, phi
*/
function inverseOblique(self, lp) {
	if (self.isIdentity) {
		lp.x *= D2R$1;
		lp.y *= D2R$1;
	}
	let { x: lam, y: phi } = self.obliqueProjection.inverse(lp);
	if (lam < Number.MAX_VALUE) {
		lam -= self.lamp;
		const coslam = Math.cos(lam);
		const sinphi = Math.sin(phi);
		const cosphi = Math.cos(phi);
		lp.x = Math.atan2(cosphi * Math.sin(lam), self.sphip * cosphi * coslam - self.cphip * sinphi);
		lp.y = Math.asin(self.sphip * sinphi + self.cphip * cosphi * coslam);
	}
	lp.x = adjust_lon_default(lp.x + self.long0);
	return lp;
}
/**
* Inverse (x, y) to (lng, lat) for transverse case
* @param {import('../defs.js').ProjectionDefinition & LocalThis} self
* @param {{x: number, y: number}} lp - lambda, phi
*/
function inverseTransverse(self, lp) {
	if (self.isIdentity) {
		lp.x *= D2R$1;
		lp.y *= D2R$1;
	}
	let { x: lam, y: phi } = self.obliqueProjection.inverse(lp);
	if (lam < Number.MAX_VALUE) {
		const cosphi = Math.cos(phi);
		lam -= self.lamp;
		lp.x = Math.atan2(cosphi * Math.sin(lam), -1 * Math.sin(phi));
		lp.y = Math.asin(cosphi * Math.cos(lam));
	}
	lp.x = adjust_lon_default(lp.x + self.long0);
	return lp;
}
var ob_tran_default = {
	init,
	forward,
	inverse,
	names: [
		"General Oblique Transformation",
		"General_Oblique_Transformation",
		"ob_tran"
	]
};
//#endregion
//#region node_modules/proj4/projs.js
function projs_default(proj4) {
	proj4.Proj.projections.add(tmerc_default);
	proj4.Proj.projections.add(etmerc_default);
	proj4.Proj.projections.add(utm_default);
	proj4.Proj.projections.add(sterea_default);
	proj4.Proj.projections.add(stere_default);
	proj4.Proj.projections.add(somerc_default);
	proj4.Proj.projections.add(omerc_default);
	proj4.Proj.projections.add(lcc_default);
	proj4.Proj.projections.add(krovak_default);
	proj4.Proj.projections.add(cass_default);
	proj4.Proj.projections.add(laea_default);
	proj4.Proj.projections.add(aea_default);
	proj4.Proj.projections.add(gnom_default);
	proj4.Proj.projections.add(cea_default);
	proj4.Proj.projections.add(eqc_default);
	proj4.Proj.projections.add(poly_default);
	proj4.Proj.projections.add(nzmg_default);
	proj4.Proj.projections.add(mill_default);
	proj4.Proj.projections.add(sinu_default);
	proj4.Proj.projections.add(moll_default);
	proj4.Proj.projections.add(eqdc_default);
	proj4.Proj.projections.add(vandg_default);
	proj4.Proj.projections.add(aeqd_default);
	proj4.Proj.projections.add(ortho_default);
	proj4.Proj.projections.add(qsc_default);
	proj4.Proj.projections.add(robin_default);
	proj4.Proj.projections.add(geocent_default);
	proj4.Proj.projections.add(tpers_default);
	proj4.Proj.projections.add(geos_default);
	proj4.Proj.projections.add(eqearth_default);
	proj4.Proj.projections.add(bonne_default);
	proj4.Proj.projections.add(ob_tran_default);
}
//#endregion
//#region node_modules/proj4/lib/index.js
/**
* @typedef {Object} Mgrs
* @property {(lonlat: [number, number]) => string} forward
* @property {(mgrsString: string) => [number, number, number, number]} inverse
* @property {(mgrsString: string) => [number, number]} toPoint
*/
/**
* @typedef {import('./defs').ProjectionDefinition} ProjectionDefinition
* @typedef {import('./core').TemplateCoordinates} TemplateCoordinates
* @typedef {import('./core').InterfaceCoordinates} InterfaceCoordinates
* @typedef {import('./core').Converter} Converter
* @typedef {import('./Proj').DatumDefinition} DatumDefinition
*/
/**
* @template {import('./core').TemplateCoordinates} T
* @type {core<T> & {defaultDatum: string, Proj: typeof Proj, WGS84: Proj, Point: typeof Point, toPoint: typeof common, defs: typeof defs, nadgrid: typeof nadgrid, transform: typeof transform, mgrs: Mgrs, version: string}}
*/
var proj4 = Object.assign(proj4$1, {
	defaultDatum: "WGS84",
	Proj: Projection,
	WGS84: new Projection("WGS84"),
	Point,
	toPoint: toPoint_default,
	defs,
	nadgrid,
	transform,
	mgrs: mgrs_default,
	version: "__VERSION__"
});
projs_default(proj4);
//#endregion
//#region node_modules/redux/dist/redux.mjs
init_objectSpread2();
function formatProdErrorMessage$1(code) {
	return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
var symbol_observable_default = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var actionTypes_default = {
	INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
	REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
	PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
function isPlainObject(obj) {
	if (typeof obj !== "object" || obj === null) return false;
	let proto = obj;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
function createStore(reducer, preloadedState, enhancer) {
	if (typeof reducer !== "function") throw new Error(formatProdErrorMessage$1(2));
	if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") throw new Error(formatProdErrorMessage$1(0));
	if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
		enhancer = preloadedState;
		preloadedState = void 0;
	}
	if (typeof enhancer !== "undefined") {
		if (typeof enhancer !== "function") throw new Error(formatProdErrorMessage$1(1));
		return enhancer(createStore)(reducer, preloadedState);
	}
	let currentReducer = reducer;
	let currentState = preloadedState;
	let currentListeners = /* @__PURE__ */ new Map();
	let nextListeners = currentListeners;
	let listenerIdCounter = 0;
	let isDispatching = false;
	function ensureCanMutateNextListeners() {
		if (nextListeners === currentListeners) {
			nextListeners = /* @__PURE__ */ new Map();
			currentListeners.forEach((listener, key) => {
				nextListeners.set(key, listener);
			});
		}
	}
	function getState() {
		if (isDispatching) throw new Error(formatProdErrorMessage$1(3));
		return currentState;
	}
	function subscribe(listener) {
		if (typeof listener !== "function") throw new Error(formatProdErrorMessage$1(4));
		if (isDispatching) throw new Error(formatProdErrorMessage$1(5));
		let isSubscribed = true;
		ensureCanMutateNextListeners();
		const listenerId = listenerIdCounter++;
		nextListeners.set(listenerId, listener);
		return function unsubscribe() {
			if (!isSubscribed) return;
			if (isDispatching) throw new Error(formatProdErrorMessage$1(6));
			isSubscribed = false;
			ensureCanMutateNextListeners();
			nextListeners.delete(listenerId);
			currentListeners = null;
		};
	}
	function dispatch(action) {
		if (!isPlainObject(action)) throw new Error(formatProdErrorMessage$1(7));
		if (typeof action.type === "undefined") throw new Error(formatProdErrorMessage$1(8));
		if (typeof action.type !== "string") throw new Error(formatProdErrorMessage$1(17));
		if (isDispatching) throw new Error(formatProdErrorMessage$1(9));
		try {
			isDispatching = true;
			currentState = currentReducer(currentState, action);
		} finally {
			isDispatching = false;
		}
		(currentListeners = nextListeners).forEach((listener) => {
			listener();
		});
		return action;
	}
	function replaceReducer(nextReducer) {
		if (typeof nextReducer !== "function") throw new Error(formatProdErrorMessage$1(10));
		currentReducer = nextReducer;
		dispatch({ type: actionTypes_default.REPLACE });
	}
	function observable() {
		const outerSubscribe = subscribe;
		return {
			/**
			* The minimal observable subscription method.
			* @param observer Any object that can be used as an observer.
			* The observer object should have a `next` method.
			* @returns An object with an `unsubscribe` method that can
			* be used to unsubscribe the observable from the store, and prevent further
			* emission of values from the observable.
			*/
			subscribe(observer) {
				if (typeof observer !== "object" || observer === null) throw new Error(formatProdErrorMessage$1(11));
				function observeState() {
					const observerAsObserver = observer;
					if (observerAsObserver.next) observerAsObserver.next(getState());
				}
				observeState();
				return { unsubscribe: outerSubscribe(observeState) };
			},
			[symbol_observable_default]() {
				return this;
			}
		};
	}
	dispatch({ type: actionTypes_default.INIT });
	return {
		dispatch,
		subscribe,
		getState,
		replaceReducer,
		[symbol_observable_default]: observable
	};
}
function assertReducerShape(reducers) {
	Object.keys(reducers).forEach((key) => {
		const reducer = reducers[key];
		if (typeof reducer(void 0, { type: actionTypes_default.INIT }) === "undefined") throw new Error(formatProdErrorMessage$1(12));
		if (typeof reducer(void 0, { type: actionTypes_default.PROBE_UNKNOWN_ACTION() }) === "undefined") throw new Error(formatProdErrorMessage$1(13));
	});
}
function combineReducers(reducers) {
	const reducerKeys = Object.keys(reducers);
	const finalReducers = {};
	for (let i = 0; i < reducerKeys.length; i++) {
		const key = reducerKeys[i];
		if (typeof reducers[key] === "function") finalReducers[key] = reducers[key];
	}
	const finalReducerKeys = Object.keys(finalReducers);
	let shapeAssertionError;
	try {
		assertReducerShape(finalReducers);
	} catch (e) {
		shapeAssertionError = e;
	}
	return function combination(state = {}, action) {
		if (shapeAssertionError) throw shapeAssertionError;
		let hasChanged = false;
		const nextState = {};
		for (let i = 0; i < finalReducerKeys.length; i++) {
			const key = finalReducerKeys[i];
			const reducer = finalReducers[key];
			const previousStateForKey = state[key];
			const nextStateForKey = reducer(previousStateForKey, action);
			if (typeof nextStateForKey === "undefined") {
				action && action.type;
				throw new Error(formatProdErrorMessage$1(14));
			}
			nextState[key] = nextStateForKey;
			hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
		}
		hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
		return hasChanged ? nextState : state;
	};
}
function compose(...funcs) {
	if (funcs.length === 0) return (arg) => arg;
	if (funcs.length === 1) return funcs[0];
	return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
function applyMiddleware(...middlewares) {
	return (createStore2) => (reducer, preloadedState) => {
		const store = createStore2(reducer, preloadedState);
		let dispatch = () => {
			throw new Error(formatProdErrorMessage$1(15));
		};
		const middlewareAPI = {
			getState: store.getState,
			dispatch: (action, ...args) => dispatch(action, ...args)
		};
		dispatch = compose(...middlewares.map((middleware) => middleware(middlewareAPI)))(store.dispatch);
		return _objectSpread2(_objectSpread2({}, store), {}, { dispatch });
	};
}
function isAction(action) {
	return isPlainObject(action) && "type" in action && typeof action.type === "string";
}
//#endregion
//#region node_modules/reselect/dist/reselect.mjs
init_objectSpread2();
function assertIsFunction(func, errorMessage = `expected a function, instead received ${typeof func}`) {
	if (typeof func !== "function") throw new TypeError(errorMessage);
}
function assertIsObject(object, errorMessage = `expected an object, instead received ${typeof object}`) {
	if (typeof object !== "object") throw new TypeError(errorMessage);
}
function assertIsArrayOfFunctions(array, errorMessage = `expected all items to be functions, instead received the following types: `) {
	if (!array.every((item) => typeof item === "function")) {
		const itemTypes = array.map((item) => typeof item === "function" ? `function ${item.name || "unnamed"}()` : typeof item).join(", ");
		throw new TypeError(`${errorMessage}[${itemTypes}]`);
	}
}
var ensureIsArray = (item) => {
	return Array.isArray(item) ? item : [item];
};
function getDependencies(createSelectorArgs) {
	const dependencies = Array.isArray(createSelectorArgs[0]) ? createSelectorArgs[0] : createSelectorArgs;
	assertIsArrayOfFunctions(dependencies, `createSelector expects all input-selectors to be functions, but received the following types: `);
	return dependencies;
}
function collectInputSelectorResults(dependencies, inputSelectorArgs) {
	const inputSelectorResults = [];
	const { length } = dependencies;
	for (let i = 0; i < length; i++) inputSelectorResults.push(dependencies[i].apply(null, inputSelectorArgs));
	return inputSelectorResults;
}
var StrongRef = class {
	constructor(value) {
		this.value = value;
	}
	deref() {
		return this.value;
	}
};
var Ref = typeof WeakRef !== "undefined" ? WeakRef : StrongRef;
var UNTERMINATED = 0;
var TERMINATED = 1;
function createCacheNode() {
	return {
		s: UNTERMINATED,
		v: void 0,
		o: null,
		p: null
	};
}
function weakMapMemoize(func, options = {}) {
	let fnNode = createCacheNode();
	const { resultEqualityCheck } = options;
	let lastResult;
	let resultsCount = 0;
	function memoized() {
		let cacheNode = fnNode;
		const { length } = arguments;
		for (let i = 0, l = length; i < l; i++) {
			const arg = arguments[i];
			if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
				let objectCache = cacheNode.o;
				if (objectCache === null) cacheNode.o = objectCache = /* @__PURE__ */ new WeakMap();
				const objectNode = objectCache.get(arg);
				if (objectNode === void 0) {
					cacheNode = createCacheNode();
					objectCache.set(arg, cacheNode);
				} else cacheNode = objectNode;
			} else {
				let primitiveCache = cacheNode.p;
				if (primitiveCache === null) cacheNode.p = primitiveCache = /* @__PURE__ */ new Map();
				const primitiveNode = primitiveCache.get(arg);
				if (primitiveNode === void 0) {
					cacheNode = createCacheNode();
					primitiveCache.set(arg, cacheNode);
				} else cacheNode = primitiveNode;
			}
		}
		const terminatedNode = cacheNode;
		let result;
		if (cacheNode.s === TERMINATED) result = cacheNode.v;
		else {
			result = func.apply(null, arguments);
			resultsCount++;
			if (resultEqualityCheck) {
				var _lastResult$deref, _lastResult$deref2;
				const lastResultValue = (_lastResult$deref = lastResult === null || lastResult === void 0 || (_lastResult$deref2 = lastResult.deref) === null || _lastResult$deref2 === void 0 ? void 0 : _lastResult$deref2.call(lastResult)) !== null && _lastResult$deref !== void 0 ? _lastResult$deref : lastResult;
				if (lastResultValue != null && resultEqualityCheck(lastResultValue, result)) {
					result = lastResultValue;
					resultsCount !== 0 && resultsCount--;
				}
				lastResult = typeof result === "object" && result !== null || typeof result === "function" ? new Ref(result) : result;
			}
		}
		terminatedNode.s = TERMINATED;
		terminatedNode.v = result;
		return result;
	}
	memoized.clearCache = () => {
		fnNode = createCacheNode();
		memoized.resetResultsCount();
	};
	memoized.resultsCount = () => resultsCount;
	memoized.resetResultsCount = () => {
		resultsCount = 0;
	};
	return memoized;
}
function createSelectorCreator(memoizeOrOptions, ...memoizeOptionsFromArgs) {
	const createSelectorCreatorOptions = typeof memoizeOrOptions === "function" ? {
		memoize: memoizeOrOptions,
		memoizeOptions: memoizeOptionsFromArgs
	} : memoizeOrOptions;
	const createSelector2 = (...createSelectorArgs) => {
		let recomputations = 0;
		let dependencyRecomputations = 0;
		let lastResult;
		let directlyPassedOptions = {};
		let resultFunc = createSelectorArgs.pop();
		if (typeof resultFunc === "object") {
			directlyPassedOptions = resultFunc;
			resultFunc = createSelectorArgs.pop();
		}
		assertIsFunction(resultFunc, `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`);
		const { memoize, memoizeOptions = [], argsMemoize = weakMapMemoize, argsMemoizeOptions = [], devModeChecks = {} } = _objectSpread2(_objectSpread2({}, createSelectorCreatorOptions), directlyPassedOptions);
		const finalMemoizeOptions = ensureIsArray(memoizeOptions);
		const finalArgsMemoizeOptions = ensureIsArray(argsMemoizeOptions);
		const dependencies = getDependencies(createSelectorArgs);
		const memoizedResultFunc = memoize(function recomputationWrapper() {
			recomputations++;
			return resultFunc.apply(null, arguments);
		}, ...finalMemoizeOptions);
		const selector = argsMemoize(function dependenciesChecker() {
			dependencyRecomputations++;
			const inputSelectorResults = collectInputSelectorResults(dependencies, arguments);
			lastResult = memoizedResultFunc.apply(null, inputSelectorResults);
			return lastResult;
		}, ...finalArgsMemoizeOptions);
		return Object.assign(selector, {
			resultFunc,
			memoizedResultFunc,
			dependencies,
			dependencyRecomputations: () => dependencyRecomputations,
			resetDependencyRecomputations: () => {
				dependencyRecomputations = 0;
			},
			lastResult: () => lastResult,
			recomputations: () => recomputations,
			resetRecomputations: () => {
				recomputations = 0;
			},
			memoize,
			argsMemoize
		});
	};
	Object.assign(createSelector2, { withTypes: () => createSelector2 });
	return createSelector2;
}
var createSelector = /* @__PURE__ */ createSelectorCreator(weakMapMemoize);
var createStructuredSelector = Object.assign((inputSelectorsObject, selectorCreator = createSelector) => {
	assertIsObject(inputSelectorsObject, `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof inputSelectorsObject}`);
	const inputSelectorKeys = Object.keys(inputSelectorsObject);
	return selectorCreator(inputSelectorKeys.map((key) => inputSelectorsObject[key]), (...inputSelectorResults) => {
		return inputSelectorResults.reduce((composition, value, index) => {
			composition[inputSelectorKeys[index]] = value;
			return composition;
		}, {});
	});
}, { withTypes: () => createStructuredSelector });
//#endregion
//#region node_modules/redux-thunk/dist/redux-thunk.mjs
function createThunkMiddleware(extraArgument) {
	const middleware = ({ dispatch, getState }) => (next) => (action) => {
		if (typeof action === "function") return action(dispatch, getState, extraArgument);
		return next(action);
	};
	return middleware;
}
var thunk = createThunkMiddleware();
var withExtraArgument = createThunkMiddleware;
//#endregion
//#region node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs
init_objectSpread2();
init_defineProperty();
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
	if (arguments.length === 0) return void 0;
	if (typeof arguments[0] === "object") return compose;
	return compose.apply(null, arguments);
};
typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__;
function createAction(type, prepareAction) {
	function actionCreator(...args) {
		if (prepareAction) {
			let prepared = prepareAction(...args);
			if (!prepared) throw new Error(formatProdErrorMessage(0));
			return _objectSpread2(_objectSpread2({
				type,
				payload: prepared.payload
			}, "meta" in prepared && { meta: prepared.meta }), "error" in prepared && { error: prepared.error });
		}
		return {
			type,
			payload: args[0]
		};
	}
	actionCreator.toString = () => `${type}`;
	actionCreator.type = type;
	actionCreator.match = (action) => isAction(action) && action.type === type;
	return actionCreator;
}
var Tuple = class _Tuple extends Array {
	constructor(...items) {
		super(...items);
		Object.setPrototypeOf(this, _Tuple.prototype);
	}
	static get [Symbol.species]() {
		return _Tuple;
	}
	concat(...arr) {
		return super.concat.apply(this, arr);
	}
	prepend(...arr) {
		if (arr.length === 1 && Array.isArray(arr[0])) return new _Tuple(...arr[0].concat(this));
		return new _Tuple(...arr.concat(this));
	}
};
function isBoolean(x) {
	return typeof x === "boolean";
}
var buildGetDefaultMiddleware = () => function getDefaultMiddleware(options) {
	const { thunk: thunk$1 = true, immutableCheck = true, serializableCheck = true, actionCreatorCheck = true } = options !== null && options !== void 0 ? options : {};
	let middlewareArray = new Tuple();
	if (thunk$1) if (isBoolean(thunk$1)) middlewareArray.push(thunk);
	else middlewareArray.push(withExtraArgument(thunk$1.extraArgument));
	return middlewareArray;
};
var SHOULD_AUTOBATCH = "RTK_autoBatch";
var createQueueWithTimer = (timeout) => {
	return (notify) => {
		setTimeout(notify, timeout);
	};
};
var autoBatchEnhancer = (options = { type: "raf" }) => (next) => (...args) => {
	const store = next(...args);
	let notifying = true;
	let shouldNotifyAtEndOfTick = false;
	let notificationQueued = false;
	const listeners = /* @__PURE__ */ new Set();
	const queueCallback = options.type === "tick" ? queueMicrotask : options.type === "raf" ? typeof window !== "undefined" && window.requestAnimationFrame ? window.requestAnimationFrame : createQueueWithTimer(10) : options.type === "callback" ? options.queueNotification : createQueueWithTimer(options.timeout);
	const notifyListeners = () => {
		notificationQueued = false;
		if (shouldNotifyAtEndOfTick) {
			shouldNotifyAtEndOfTick = false;
			listeners.forEach((l) => l());
		}
	};
	return Object.assign({}, store, {
		subscribe(listener2) {
			const wrappedListener = () => notifying && listener2();
			const unsubscribe = store.subscribe(wrappedListener);
			listeners.add(listener2);
			return () => {
				unsubscribe();
				listeners.delete(listener2);
			};
		},
		dispatch(action) {
			try {
				var _action$meta;
				notifying = !(action === null || action === void 0 || (_action$meta = action.meta) === null || _action$meta === void 0 ? void 0 : _action$meta[SHOULD_AUTOBATCH]);
				shouldNotifyAtEndOfTick = !notifying;
				if (shouldNotifyAtEndOfTick) {
					if (!notificationQueued) {
						notificationQueued = true;
						queueCallback(notifyListeners);
					}
				}
				return store.dispatch(action);
			} finally {
				notifying = true;
			}
		}
	});
};
var buildGetDefaultEnhancers = (middlewareEnhancer) => function getDefaultEnhancers(options) {
	const { autoBatch = true } = options !== null && options !== void 0 ? options : {};
	let enhancerArray = new Tuple(middlewareEnhancer);
	if (autoBatch) enhancerArray.push(autoBatchEnhancer(typeof autoBatch === "object" ? autoBatch : void 0));
	return enhancerArray;
};
function configureStore(options) {
	const getDefaultMiddleware = buildGetDefaultMiddleware();
	const { reducer = void 0, middleware, devTools = true, duplicateMiddlewareCheck = true, preloadedState = void 0, enhancers = void 0 } = options || {};
	let rootReducer;
	if (typeof reducer === "function") rootReducer = reducer;
	else if (isPlainObject(reducer)) rootReducer = combineReducers(reducer);
	else throw new Error(formatProdErrorMessage(1));
	let finalMiddleware;
	if (typeof middleware === "function") finalMiddleware = middleware(getDefaultMiddleware);
	else finalMiddleware = getDefaultMiddleware();
	let finalCompose = compose;
	if (devTools) finalCompose = composeWithDevTools(_objectSpread2({ trace: false }, typeof devTools === "object" && devTools));
	const getDefaultEnhancers = buildGetDefaultEnhancers(applyMiddleware(...finalMiddleware));
	let storeEnhancers = typeof enhancers === "function" ? enhancers(getDefaultEnhancers) : getDefaultEnhancers();
	const composedEnhancer = finalCompose(...storeEnhancers);
	return createStore(rootReducer, preloadedState, composedEnhancer);
}
var task = "task";
var listener = "listener";
var completed = "completed";
var cancelled = "cancelled";
`${cancelled}`;
`${completed}`;
`${listener}${cancelled}`;
`${listener}${completed}`;
var TaskAbortError = class {
	constructor(code) {
		_defineProperty(this, "name", "TaskAbortError");
		_defineProperty(this, "message", void 0);
		this.code = code;
		this.message = `${task} ${cancelled} (reason: ${code})`;
	}
};
(function() {
	var _ref2 = _asyncToGenerator(function* (task2, cleanUp) {
		try {
			yield Promise.resolve();
			return {
				status: "ok",
				value: yield task2()
			};
		} catch (error) {
			return {
				status: error instanceof TaskAbortError ? "cancelled" : "rejected",
				error
			};
		} finally {
			cleanUp === null || cleanUp === void 0 || cleanUp();
		}
	});
	return function runTask(_x, _x2) {
		return _ref2.apply(this, arguments);
	};
})();
var { assign } = Object;
var alm = "listenerMiddleware";
var addListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/add`), { withTypes: () => addListener });
`${alm}`;
var removeListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/remove`), { withTypes: () => removeListener });
function formatProdErrorMessage(code) {
	return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
//#endregion
//#region node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production();
}));
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react(), shim = require_shim();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
	exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
		var instRef = useRef(null);
		if (null === instRef.current) {
			var inst = {
				hasValue: !1,
				value: null
			};
			instRef.current = inst;
		} else inst = instRef.current;
		instRef = useMemo(function() {
			function memoizedSelector(nextSnapshot) {
				if (!hasMemo) {
					hasMemo = !0;
					memoizedSnapshot = nextSnapshot;
					nextSnapshot = selector(nextSnapshot);
					if (void 0 !== isEqual && inst.hasValue) {
						var currentSelection = inst.value;
						if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
					}
					return memoizedSelection = nextSnapshot;
				}
				currentSelection = memoizedSelection;
				if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
				var nextSelection = selector(nextSnapshot);
				if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
				memoizedSnapshot = nextSnapshot;
				return memoizedSelection = nextSelection;
			}
			var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
			return [function() {
				return memoizedSelector(getSnapshot());
			}, null === maybeGetServerSnapshot ? void 0 : function() {
				return memoizedSelector(maybeGetServerSnapshot());
			}];
		}, [
			getSnapshot,
			getServerSnapshot,
			selector,
			isEqual
		]);
		var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
		useEffect(function() {
			inst.hasValue = !0;
			inst.value = value;
		}, [value]);
		useDebugValue(value);
		return value;
	};
}));
//#endregion
//#region node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_with_selector_production();
}));
//#endregion
//#region node_modules/react-redux/es/utils/reactBatchedUpdates.js
var import_shim = require_shim();
var import_with_selector = require_with_selector();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
//#endregion
//#region node_modules/react-redux/es/utils/batch.js
function defaultNoopBatch(callback) {
	callback();
}
var batch$1 = defaultNoopBatch;
var setBatch = (newBatch) => batch$1 = newBatch;
var getBatch = () => batch$1;
//#endregion
//#region node_modules/react-redux/es/components/Context.js
var ContextKey = Symbol.for(`react-redux-context`);
var gT = typeof globalThis !== "undefined" ? globalThis : {};
function getContext() {
	var _gT$ContextKey;
	if (!import_react.createContext) return {};
	const contextMap = (_gT$ContextKey = gT[ContextKey]) != null ? _gT$ContextKey : gT[ContextKey] = /* @__PURE__ */ new Map();
	let realContext = contextMap.get(import_react.createContext);
	if (!realContext) {
		realContext = import_react.createContext(null);
		contextMap.set(import_react.createContext, realContext);
	}
	return realContext;
}
var ReactReduxContext = /* @__PURE__ */ getContext();
//#endregion
//#region node_modules/react-redux/es/hooks/useReduxContext.js
/**
* Hook factory, which creates a `useReduxContext` hook bound to a given context. This is a low-level
* hook that you should usually not need to call directly.
*
* @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
* @returns {Function} A `useReduxContext` hook bound to the specified context.
*/
function createReduxContextHook(context = ReactReduxContext) {
	return function useReduxContext() {
		return (0, import_react.useContext)(context);
	};
}
/**
* A hook to access the value of the `ReactReduxContext`. This is a low-level
* hook that you should usually not need to call directly.
*
* @returns {any} the value of the `ReactReduxContext`
*
* @example
*
* import React from 'react'
* import { useReduxContext } from 'react-redux'
*
* export const CounterComponent = () => {
*   const { store } = useReduxContext()
*   return <div>{store.getState()}</div>
* }
*/
var useReduxContext = /* @__PURE__ */ createReduxContextHook();
//#endregion
//#region node_modules/react-redux/es/utils/useSyncExternalStore.js
var notInitialized = () => {
	throw new Error("uSES not initialized!");
};
//#endregion
//#region node_modules/react-redux/es/hooks/useSelector.js
var useSyncExternalStoreWithSelector$1 = notInitialized;
var initializeUseSelector = (fn) => {
	useSyncExternalStoreWithSelector$1 = fn;
};
var refEquality = (a, b) => a === b;
/**
* Hook factory, which creates a `useSelector` hook bound to a given context.
*
* @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
* @returns {Function} A `useSelector` hook bound to the specified context.
*/
function createSelectorHook(context = ReactReduxContext) {
	const useReduxContext$2 = context === ReactReduxContext ? useReduxContext : createReduxContextHook(context);
	return function useSelector(selector, equalityFnOrOptions = {}) {
		const { equalityFn = refEquality, stabilityCheck = void 0, noopCheck = void 0 } = typeof equalityFnOrOptions === "function" ? { equalityFn: equalityFnOrOptions } : equalityFnOrOptions;
		const { store, subscription, getServerState, stabilityCheck: globalStabilityCheck, noopCheck: globalNoopCheck } = useReduxContext$2();
		(0, import_react.useRef)(true);
		const wrappedSelector = (0, import_react.useCallback)({ [selector.name](state) {
			return selector(state);
		} }[selector.name], [
			selector,
			globalStabilityCheck,
			stabilityCheck
		]);
		const selectedState = useSyncExternalStoreWithSelector$1(subscription.addNestedSub, store.getState, getServerState || store.getState, wrappedSelector, equalityFn);
		(0, import_react.useDebugValue)(selectedState);
		return selectedState;
	};
}
/**
* A hook to access the redux store's state. This hook takes a selector function
* as an argument. The selector is called with the store state.
*
* This hook takes an optional equality comparison function as the second parameter
* that allows you to customize the way the selected state is compared to determine
* whether the component needs to be re-rendered.
*
* @param {Function} selector the selector function
* @param {Function=} equalityFn the function that will be used to determine equality
*
* @returns {any} the selected state
*
* @example
*
* import React from 'react'
* import { useSelector } from 'react-redux'
*
* export const CounterComponent = () => {
*   const counter = useSelector(state => state.counter)
*   return <div>{counter}</div>
* }
*/
var useSelector = /* @__PURE__ */ createSelectorHook();
(/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var reactIs = require_react_is();
	/**
	* Copyright 2015, Yahoo! Inc.
	* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	*/
	var REACT_STATICS = {
		childContextTypes: true,
		contextType: true,
		contextTypes: true,
		defaultProps: true,
		displayName: true,
		getDefaultProps: true,
		getDerivedStateFromError: true,
		getDerivedStateFromProps: true,
		mixins: true,
		propTypes: true,
		type: true
	};
	var KNOWN_STATICS = {
		name: true,
		length: true,
		prototype: true,
		caller: true,
		callee: true,
		arguments: true,
		arity: true
	};
	var FORWARD_REF_STATICS = {
		"$$typeof": true,
		render: true,
		defaultProps: true,
		displayName: true,
		propTypes: true
	};
	var MEMO_STATICS = {
		"$$typeof": true,
		compare: true,
		defaultProps: true,
		displayName: true,
		propTypes: true,
		type: true
	};
	var TYPE_STATICS = {};
	TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
	TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
	function getStatics(component) {
		if (reactIs.isMemo(component)) return MEMO_STATICS;
		return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
	}
	var defineProperty = Object.defineProperty;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getPrototypeOf = Object.getPrototypeOf;
	var objectPrototype = Object.prototype;
	function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
		if (typeof sourceComponent !== "string") {
			if (objectPrototype) {
				var inheritedComponent = getPrototypeOf(sourceComponent);
				if (inheritedComponent && inheritedComponent !== objectPrototype) hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
			}
			var keys = getOwnPropertyNames(sourceComponent);
			if (getOwnPropertySymbols) keys = keys.concat(getOwnPropertySymbols(sourceComponent));
			var targetStatics = getStatics(targetComponent);
			var sourceStatics = getStatics(sourceComponent);
			for (var i = 0; i < keys.length; ++i) {
				var key = keys[i];
				if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
					var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
					try {
						defineProperty(targetComponent, key, descriptor);
					} catch (e) {}
				}
			}
		}
		return targetComponent;
	}
	module.exports = hoistNonReactStatics;
})))();
require_react_is$1();
function createListenerCollection() {
	const batch = getBatch();
	let first = null;
	let last = null;
	return {
		clear() {
			first = null;
			last = null;
		},
		notify() {
			batch(() => {
				let listener = first;
				while (listener) {
					listener.callback();
					listener = listener.next;
				}
			});
		},
		get() {
			let listeners = [];
			let listener = first;
			while (listener) {
				listeners.push(listener);
				listener = listener.next;
			}
			return listeners;
		},
		subscribe(callback) {
			let isSubscribed = true;
			let listener = last = {
				callback,
				next: null,
				prev: last
			};
			if (listener.prev) listener.prev.next = listener;
			else first = listener;
			return function unsubscribe() {
				if (!isSubscribed || first === null) return;
				isSubscribed = false;
				if (listener.next) listener.next.prev = listener.prev;
				else last = listener.prev;
				if (listener.prev) listener.prev.next = listener.next;
				else first = listener.next;
			};
		}
	};
}
var nullListeners = {
	notify() {},
	get: () => []
};
function createSubscription(store, parentSub) {
	let unsubscribe;
	let listeners = nullListeners;
	let subscriptionsAmount = 0;
	let selfSubscribed = false;
	function addNestedSub(listener) {
		trySubscribe();
		const cleanupListener = listeners.subscribe(listener);
		let removed = false;
		return () => {
			if (!removed) {
				removed = true;
				cleanupListener();
				tryUnsubscribe();
			}
		};
	}
	function notifyNestedSubs() {
		listeners.notify();
	}
	function handleChangeWrapper() {
		if (subscription.onStateChange) subscription.onStateChange();
	}
	function isSubscribed() {
		return selfSubscribed;
	}
	function trySubscribe() {
		subscriptionsAmount++;
		if (!unsubscribe) {
			unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
			listeners = createListenerCollection();
		}
	}
	function tryUnsubscribe() {
		subscriptionsAmount--;
		if (unsubscribe && subscriptionsAmount === 0) {
			unsubscribe();
			unsubscribe = void 0;
			listeners.clear();
			listeners = nullListeners;
		}
	}
	function trySubscribeSelf() {
		if (!selfSubscribed) {
			selfSubscribed = true;
			trySubscribe();
		}
	}
	function tryUnsubscribeSelf() {
		if (selfSubscribed) {
			selfSubscribed = false;
			tryUnsubscribe();
		}
	}
	const subscription = {
		addNestedSub,
		notifyNestedSubs,
		handleChangeWrapper,
		isSubscribed,
		trySubscribe: trySubscribeSelf,
		tryUnsubscribe: tryUnsubscribeSelf,
		getListeners: () => listeners
	};
	return subscription;
}
var useIsomorphicLayoutEffect = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined") ? import_react.useLayoutEffect : import_react.useEffect;
//#endregion
//#region node_modules/react-redux/es/components/Provider.js
function Provider({ store, context, children, serverState, stabilityCheck = "once", noopCheck = "once" }) {
	const contextValue = import_react.useMemo(() => {
		return {
			store,
			subscription: createSubscription(store),
			getServerState: serverState ? () => serverState : void 0,
			stabilityCheck,
			noopCheck
		};
	}, [
		store,
		serverState,
		stabilityCheck,
		noopCheck
	]);
	const previousState = import_react.useMemo(() => store.getState(), [store]);
	useIsomorphicLayoutEffect(() => {
		const { subscription } = contextValue;
		subscription.onStateChange = subscription.notifyNestedSubs;
		subscription.trySubscribe();
		if (previousState !== store.getState()) subscription.notifyNestedSubs();
		return () => {
			subscription.tryUnsubscribe();
			subscription.onStateChange = void 0;
		};
	}, [contextValue, previousState]);
	const Context = context || ReactReduxContext;
	return /* @__PURE__ */ import_react.createElement(Context.Provider, { value: contextValue }, children);
}
//#endregion
//#region node_modules/react-redux/es/hooks/useStore.js
/**
* Hook factory, which creates a `useStore` hook bound to a given context.
*
* @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
* @returns {Function} A `useStore` hook bound to the specified context.
*/
function createStoreHook(context = ReactReduxContext) {
	const useReduxContext$1 = context === ReactReduxContext ? useReduxContext : createReduxContextHook(context);
	return function useStore() {
		const { store } = useReduxContext$1();
		return store;
	};
}
/**
* A hook to access the redux store.
*
* @returns {any} the redux store
*
* @example
*
* import React from 'react'
* import { useStore } from 'react-redux'
*
* export const ExampleComponent = () => {
*   const store = useStore()
*   return <div>{store.getState()}</div>
* }
*/
var useStore = /* @__PURE__ */ createStoreHook();
//#endregion
//#region node_modules/react-redux/es/hooks/useDispatch.js
/**
* Hook factory, which creates a `useDispatch` hook bound to a given context.
*
* @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
* @returns {Function} A `useDispatch` hook bound to the specified context.
*/
function createDispatchHook(context = ReactReduxContext) {
	const useStore$1 = context === ReactReduxContext ? useStore : createStoreHook(context);
	return function useDispatch() {
		return useStore$1().dispatch;
	};
}
/**
* A hook to access the redux `dispatch` function.
*
* @returns {any|function} redux store's `dispatch` function
*
* @example
*
* import React, { useCallback } from 'react'
* import { useDispatch } from 'react-redux'
*
* export const CounterComponent = ({ value }) => {
*   const dispatch = useDispatch()
*   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
*   return (
*     <div>
*       <span>{value}</span>
*       <button onClick={increaseCounter}>Increase counter</button>
*     </div>
*   )
* }
*/
var useDispatch = /* @__PURE__ */ createDispatchHook();
//#endregion
//#region node_modules/react-redux/es/index.js
initializeUseSelector(import_with_selector.useSyncExternalStoreWithSelector);
import_shim.useSyncExternalStore;
setBatch(import_react_dom.unstable_batchedUpdates);
//#endregion
//#region node_modules/dompurify/dist/purify.es.mjs
/*! @license DOMPurify 3.4.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.0/LICENSE */
var { entries, setPrototypeOf, isFrozen, getPrototypeOf, getOwnPropertyDescriptor } = Object;
var { freeze, seal, create } = Object;
var { apply, construct } = typeof Reflect !== "undefined" && Reflect;
if (!freeze) freeze = function freeze(x) {
	return x;
};
if (!seal) seal = function seal(x) {
	return x;
};
if (!apply) apply = function apply(func, thisArg) {
	for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
	return func.apply(thisArg, args);
};
if (!construct) construct = function construct(Func) {
	for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
	return new Func(...args);
};
var arrayForEach = unapply(Array.prototype.forEach);
var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
var arrayPop = unapply(Array.prototype.pop);
var arrayPush = unapply(Array.prototype.push);
var arraySplice = unapply(Array.prototype.splice);
var stringToLowerCase = unapply(String.prototype.toLowerCase);
var stringToString = unapply(String.prototype.toString);
var stringMatch = unapply(String.prototype.match);
var stringReplace = unapply(String.prototype.replace);
var stringIndexOf = unapply(String.prototype.indexOf);
var stringTrim = unapply(String.prototype.trim);
var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
var regExpTest = unapply(RegExp.prototype.test);
var typeErrorCreate = unconstruct(TypeError);
/**
* Creates a new function that calls the given function with a specified thisArg and arguments.
*
* @param func - The function to be wrapped and called.
* @returns A new function that calls the given function with a specified thisArg and arguments.
*/
function unapply(func) {
	return function(thisArg) {
		if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
		for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
		return apply(func, thisArg, args);
	};
}
/**
* Creates a new function that constructs an instance of the given constructor function with the provided arguments.
*
* @param func - The constructor function to be wrapped and called.
* @returns A new function that constructs an instance of the given constructor function with the provided arguments.
*/
function unconstruct(Func) {
	return function() {
		for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
		return construct(Func, args);
	};
}
/**
* Add properties to a lookup table
*
* @param set - The set to which elements will be added.
* @param array - The array containing elements to be added to the set.
* @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
* @returns The modified set with added elements.
*/
function addToSet(set, array) {
	let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
	if (setPrototypeOf) setPrototypeOf(set, null);
	let l = array.length;
	while (l--) {
		let element = array[l];
		if (typeof element === "string") {
			const lcElement = transformCaseFunc(element);
			if (lcElement !== element) {
				if (!isFrozen(array)) array[l] = lcElement;
				element = lcElement;
			}
		}
		set[element] = true;
	}
	return set;
}
/**
* Clean up an array to harden against CSPP
*
* @param array - The array to be cleaned.
* @returns The cleaned version of the array
*/
function cleanArray(array) {
	for (let index = 0; index < array.length; index++) if (!objectHasOwnProperty(array, index)) array[index] = null;
	return array;
}
/**
* Shallow clone an object
*
* @param object - The object to be cloned.
* @returns A new object that copies the original.
*/
function clone(object) {
	const newObject = create(null);
	for (const [property, value] of entries(object)) if (objectHasOwnProperty(object, property)) if (Array.isArray(value)) newObject[property] = cleanArray(value);
	else if (value && typeof value === "object" && value.constructor === Object) newObject[property] = clone(value);
	else newObject[property] = value;
	return newObject;
}
/**
* This method automatically checks if the prop is function or getter and behaves accordingly.
*
* @param object - The object to look up the getter function in its prototype chain.
* @param prop - The property name for which to find the getter function.
* @returns The getter function found in the prototype chain or a fallback function.
*/
function lookupGetter(object, prop) {
	while (object !== null) {
		const desc = getOwnPropertyDescriptor(object, prop);
		if (desc) {
			if (desc.get) return unapply(desc.get);
			if (typeof desc.value === "function") return unapply(desc.value);
		}
		object = getPrototypeOf(object);
	}
	function fallbackValue() {
		return null;
	}
	return fallbackValue;
}
var html$1 = freeze([
	"a",
	"abbr",
	"acronym",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"bdi",
	"bdo",
	"big",
	"blink",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"center",
	"cite",
	"code",
	"col",
	"colgroup",
	"content",
	"data",
	"datalist",
	"dd",
	"decorator",
	"del",
	"details",
	"dfn",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"element",
	"em",
	"fieldset",
	"figcaption",
	"figure",
	"font",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"main",
	"map",
	"mark",
	"marquee",
	"menu",
	"menuitem",
	"meter",
	"nav",
	"nobr",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"search",
	"section",
	"select",
	"shadow",
	"slot",
	"small",
	"source",
	"spacer",
	"span",
	"strike",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"track",
	"tt",
	"u",
	"ul",
	"var",
	"video",
	"wbr"
]);
var svg$1 = freeze([
	"svg",
	"a",
	"altglyph",
	"altglyphdef",
	"altglyphitem",
	"animatecolor",
	"animatemotion",
	"animatetransform",
	"circle",
	"clippath",
	"defs",
	"desc",
	"ellipse",
	"enterkeyhint",
	"exportparts",
	"filter",
	"font",
	"g",
	"glyph",
	"glyphref",
	"hkern",
	"image",
	"inputmode",
	"line",
	"lineargradient",
	"marker",
	"mask",
	"metadata",
	"mpath",
	"part",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialgradient",
	"rect",
	"stop",
	"style",
	"switch",
	"symbol",
	"text",
	"textpath",
	"title",
	"tref",
	"tspan",
	"view",
	"vkern"
]);
var svgFilters = freeze([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]);
var svgDisallowed = freeze([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]);
var mathMl$1 = freeze([
	"math",
	"menclose",
	"merror",
	"mfenced",
	"mfrac",
	"mglyph",
	"mi",
	"mlabeledtr",
	"mmultiscripts",
	"mn",
	"mo",
	"mover",
	"mpadded",
	"mphantom",
	"mroot",
	"mrow",
	"ms",
	"mspace",
	"msqrt",
	"mstyle",
	"msub",
	"msup",
	"msubsup",
	"mtable",
	"mtd",
	"mtext",
	"mtr",
	"munder",
	"munderover",
	"mprescripts"
]);
var mathMlDisallowed = freeze([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]);
var text = freeze(["#text"]);
var html = freeze([
	"accept",
	"action",
	"align",
	"alt",
	"autocapitalize",
	"autocomplete",
	"autopictureinpicture",
	"autoplay",
	"background",
	"bgcolor",
	"border",
	"capture",
	"cellpadding",
	"cellspacing",
	"checked",
	"cite",
	"class",
	"clear",
	"color",
	"cols",
	"colspan",
	"controls",
	"controlslist",
	"coords",
	"crossorigin",
	"datetime",
	"decoding",
	"default",
	"dir",
	"disabled",
	"disablepictureinpicture",
	"disableremoteplayback",
	"download",
	"draggable",
	"enctype",
	"enterkeyhint",
	"exportparts",
	"face",
	"for",
	"headers",
	"height",
	"hidden",
	"high",
	"href",
	"hreflang",
	"id",
	"inert",
	"inputmode",
	"integrity",
	"ismap",
	"kind",
	"label",
	"lang",
	"list",
	"loading",
	"loop",
	"low",
	"max",
	"maxlength",
	"media",
	"method",
	"min",
	"minlength",
	"multiple",
	"muted",
	"name",
	"nonce",
	"noshade",
	"novalidate",
	"nowrap",
	"open",
	"optimum",
	"part",
	"pattern",
	"placeholder",
	"playsinline",
	"popover",
	"popovertarget",
	"popovertargetaction",
	"poster",
	"preload",
	"pubdate",
	"radiogroup",
	"readonly",
	"rel",
	"required",
	"rev",
	"reversed",
	"role",
	"rows",
	"rowspan",
	"spellcheck",
	"scope",
	"selected",
	"shape",
	"size",
	"sizes",
	"slot",
	"span",
	"srclang",
	"start",
	"src",
	"srcset",
	"step",
	"style",
	"summary",
	"tabindex",
	"title",
	"translate",
	"type",
	"usemap",
	"valign",
	"value",
	"width",
	"wrap",
	"xmlns",
	"slot"
]);
var svg = freeze([
	"accent-height",
	"accumulate",
	"additive",
	"alignment-baseline",
	"amplitude",
	"ascent",
	"attributename",
	"attributetype",
	"azimuth",
	"basefrequency",
	"baseline-shift",
	"begin",
	"bias",
	"by",
	"class",
	"clip",
	"clippathunits",
	"clip-path",
	"clip-rule",
	"color",
	"color-interpolation",
	"color-interpolation-filters",
	"color-profile",
	"color-rendering",
	"cx",
	"cy",
	"d",
	"dx",
	"dy",
	"diffuseconstant",
	"direction",
	"display",
	"divisor",
	"dur",
	"edgemode",
	"elevation",
	"end",
	"exponent",
	"fill",
	"fill-opacity",
	"fill-rule",
	"filter",
	"filterunits",
	"flood-color",
	"flood-opacity",
	"font-family",
	"font-size",
	"font-size-adjust",
	"font-stretch",
	"font-style",
	"font-variant",
	"font-weight",
	"fx",
	"fy",
	"g1",
	"g2",
	"glyph-name",
	"glyphref",
	"gradientunits",
	"gradienttransform",
	"height",
	"href",
	"id",
	"image-rendering",
	"in",
	"in2",
	"intercept",
	"k",
	"k1",
	"k2",
	"k3",
	"k4",
	"kerning",
	"keypoints",
	"keysplines",
	"keytimes",
	"lang",
	"lengthadjust",
	"letter-spacing",
	"kernelmatrix",
	"kernelunitlength",
	"lighting-color",
	"local",
	"marker-end",
	"marker-mid",
	"marker-start",
	"markerheight",
	"markerunits",
	"markerwidth",
	"maskcontentunits",
	"maskunits",
	"max",
	"mask",
	"mask-type",
	"media",
	"method",
	"mode",
	"min",
	"name",
	"numoctaves",
	"offset",
	"operator",
	"opacity",
	"order",
	"orient",
	"orientation",
	"origin",
	"overflow",
	"paint-order",
	"path",
	"pathlength",
	"patterncontentunits",
	"patterntransform",
	"patternunits",
	"points",
	"preservealpha",
	"preserveaspectratio",
	"primitiveunits",
	"r",
	"rx",
	"ry",
	"radius",
	"refx",
	"refy",
	"repeatcount",
	"repeatdur",
	"restart",
	"result",
	"rotate",
	"scale",
	"seed",
	"shape-rendering",
	"slope",
	"specularconstant",
	"specularexponent",
	"spreadmethod",
	"startoffset",
	"stddeviation",
	"stitchtiles",
	"stop-color",
	"stop-opacity",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"stroke-opacity",
	"stroke",
	"stroke-width",
	"style",
	"surfacescale",
	"systemlanguage",
	"tabindex",
	"tablevalues",
	"targetx",
	"targety",
	"transform",
	"transform-origin",
	"text-anchor",
	"text-decoration",
	"text-rendering",
	"textlength",
	"type",
	"u1",
	"u2",
	"unicode",
	"values",
	"viewbox",
	"visibility",
	"version",
	"vert-adv-y",
	"vert-origin-x",
	"vert-origin-y",
	"width",
	"word-spacing",
	"wrap",
	"writing-mode",
	"xchannelselector",
	"ychannelselector",
	"x",
	"x1",
	"x2",
	"xmlns",
	"y",
	"y1",
	"y2",
	"z",
	"zoomandpan"
]);
var mathMl = freeze([
	"accent",
	"accentunder",
	"align",
	"bevelled",
	"close",
	"columnalign",
	"columnlines",
	"columnspacing",
	"columnspan",
	"denomalign",
	"depth",
	"dir",
	"display",
	"displaystyle",
	"encoding",
	"fence",
	"frame",
	"height",
	"href",
	"id",
	"largeop",
	"length",
	"linethickness",
	"lquote",
	"lspace",
	"mathbackground",
	"mathcolor",
	"mathsize",
	"mathvariant",
	"maxsize",
	"minsize",
	"movablelimits",
	"notation",
	"numalign",
	"open",
	"rowalign",
	"rowlines",
	"rowspacing",
	"rowspan",
	"rspace",
	"rquote",
	"scriptlevel",
	"scriptminsize",
	"scriptsizemultiplier",
	"selection",
	"separator",
	"separators",
	"stretchy",
	"subscriptshift",
	"supscriptshift",
	"symmetric",
	"voffset",
	"width",
	"xmlns"
]);
var xml = freeze([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]);
var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
var TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
var DOCTYPE_NAME = seal(/^html$/i);
var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	ARIA_ATTR,
	ATTR_WHITESPACE,
	CUSTOM_ELEMENT,
	DATA_ATTR,
	DOCTYPE_NAME,
	ERB_EXPR,
	IS_ALLOWED_URI,
	IS_SCRIPT_OR_DATA,
	MUSTACHE_EXPR,
	TMPLIT_EXPR
});
var NODE_TYPE = {
	element: 1,
	text: 3,
	progressingInstruction: 7,
	comment: 8,
	document: 9
};
var getGlobal = function getGlobal() {
	return typeof window === "undefined" ? null : window;
};
/**
* Creates a no-op policy for internal use only.
* Don't export this function outside this module!
* @param trustedTypes The policy factory.
* @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
* @return The policy created (or null, if Trusted Types
* are not supported or creating the policy failed).
*/
var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
	if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") return null;
	let suffix = null;
	const ATTR_NAME = "data-tt-policy-suffix";
	if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
	const policyName = "dompurify" + (suffix ? "#" + suffix : "");
	try {
		return trustedTypes.createPolicy(policyName, {
			createHTML(html) {
				return html;
			},
			createScriptURL(scriptUrl) {
				return scriptUrl;
			}
		});
	} catch (_) {
		console.warn("TrustedTypes policy " + policyName + " could not be created.");
		return null;
	}
};
var _createHooksMap = function _createHooksMap() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
};
function createDOMPurify() {
	let window = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
	const DOMPurify = (root) => createDOMPurify(root);
	DOMPurify.version = "3.4.0";
	DOMPurify.removed = [];
	if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
		DOMPurify.isSupported = false;
		return DOMPurify;
	}
	let { document } = window;
	const originalDocument = document;
	const currentScript = originalDocument.currentScript;
	const { DocumentFragment, HTMLTemplateElement, Node, Element, NodeFilter, NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap, HTMLFormElement, DOMParser, trustedTypes } = window;
	const ElementPrototype = Element.prototype;
	const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
	const remove = lookupGetter(ElementPrototype, "remove");
	const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
	const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
	const getParentNode = lookupGetter(ElementPrototype, "parentNode");
	if (typeof HTMLTemplateElement === "function") {
		const template = document.createElement("template");
		if (template.content && template.content.ownerDocument) document = template.content.ownerDocument;
	}
	let trustedTypesPolicy;
	let emptyHTML = "";
	const { implementation, createNodeIterator, createDocumentFragment, getElementsByTagName } = document;
	const { importNode } = originalDocument;
	let hooks = _createHooksMap();
	/**
	* Expose whether this browser supports running the full DOMPurify.
	*/
	DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
	const { MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR, DATA_ATTR, ARIA_ATTR, IS_SCRIPT_OR_DATA, ATTR_WHITESPACE, CUSTOM_ELEMENT } = EXPRESSIONS;
	let { IS_ALLOWED_URI: IS_ALLOWED_URI$1 } = EXPRESSIONS;
	/**
	* We consider the elements and attributes below to be safe. Ideally
	* don't add any new ones but feel free to remove unwanted ones.
	*/
	let ALLOWED_TAGS = null;
	const DEFAULT_ALLOWED_TAGS = addToSet({}, [
		...html$1,
		...svg$1,
		...svgFilters,
		...mathMl$1,
		...text
	]);
	let ALLOWED_ATTR = null;
	const DEFAULT_ALLOWED_ATTR = addToSet({}, [
		...html,
		...svg,
		...mathMl,
		...xml
	]);
	let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
		tagNameCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		attributeNameCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: false
		}
	}));
	let FORBID_TAGS = null;
	let FORBID_ATTR = null;
	const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
		tagCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		},
		attributeCheck: {
			writable: true,
			configurable: false,
			enumerable: true,
			value: null
		}
	}));
	let ALLOW_ARIA_ATTR = true;
	let ALLOW_DATA_ATTR = true;
	let ALLOW_UNKNOWN_PROTOCOLS = false;
	let ALLOW_SELF_CLOSE_IN_ATTR = true;
	let SAFE_FOR_TEMPLATES = false;
	let SAFE_FOR_XML = true;
	let WHOLE_DOCUMENT = false;
	let SET_CONFIG = false;
	let FORCE_BODY = false;
	let RETURN_DOM = false;
	let RETURN_DOM_FRAGMENT = false;
	let RETURN_TRUSTED_TYPE = false;
	let SANITIZE_DOM = true;
	let SANITIZE_NAMED_PROPS = false;
	const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
	let KEEP_CONTENT = true;
	let IN_PLACE = false;
	let USE_PROFILES = {};
	let FORBID_CONTENTS = null;
	const DEFAULT_FORBID_CONTENTS = addToSet({}, [
		"annotation-xml",
		"audio",
		"colgroup",
		"desc",
		"foreignobject",
		"head",
		"iframe",
		"math",
		"mi",
		"mn",
		"mo",
		"ms",
		"mtext",
		"noembed",
		"noframes",
		"noscript",
		"plaintext",
		"script",
		"style",
		"svg",
		"template",
		"thead",
		"title",
		"video",
		"xmp"
	]);
	let DATA_URI_TAGS = null;
	const DEFAULT_DATA_URI_TAGS = addToSet({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]);
	let URI_SAFE_ATTRIBUTES = null;
	const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]);
	const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
	const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
	const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
	let NAMESPACE = HTML_NAMESPACE;
	let IS_EMPTY_INPUT = false;
	let ALLOWED_NAMESPACES = null;
	const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
		MATHML_NAMESPACE,
		SVG_NAMESPACE,
		HTML_NAMESPACE
	], stringToString);
	let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, [
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]);
	let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
	const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]);
	let PARSER_MEDIA_TYPE = null;
	const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
	const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
	let transformCaseFunc = null;
	let CONFIG = null;
	const formElement = document.createElement("form");
	const isRegexOrFunction = function isRegexOrFunction(testValue) {
		return testValue instanceof RegExp || testValue instanceof Function;
	};
	/**
	* _parseConfig
	*
	* @param cfg optional config literal
	*/
	const _parseConfig = function _parseConfig() {
		let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (CONFIG && CONFIG === cfg) return;
		if (!cfg || typeof cfg !== "object") cfg = {};
		cfg = clone(cfg);
		PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
		transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
		ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
		ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
		ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
		URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
		DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
		FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
		FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
		FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
		USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
		ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
		ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
		ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
		ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
		SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
		SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
		WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
		RETURN_DOM = cfg.RETURN_DOM || false;
		RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
		RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
		FORCE_BODY = cfg.FORCE_BODY || false;
		SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
		SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
		KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
		IN_PLACE = cfg.IN_PLACE || false;
		IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
		NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
		MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
		HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
		CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || create(null);
		if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
		if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
		if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
		if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
		if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
		if (USE_PROFILES) {
			ALLOWED_TAGS = addToSet({}, text);
			ALLOWED_ATTR = create(null);
			if (USE_PROFILES.html === true) {
				addToSet(ALLOWED_TAGS, html$1);
				addToSet(ALLOWED_ATTR, html);
			}
			if (USE_PROFILES.svg === true) {
				addToSet(ALLOWED_TAGS, svg$1);
				addToSet(ALLOWED_ATTR, svg);
				addToSet(ALLOWED_ATTR, xml);
			}
			if (USE_PROFILES.svgFilters === true) {
				addToSet(ALLOWED_TAGS, svgFilters);
				addToSet(ALLOWED_ATTR, svg);
				addToSet(ALLOWED_ATTR, xml);
			}
			if (USE_PROFILES.mathMl === true) {
				addToSet(ALLOWED_TAGS, mathMl$1);
				addToSet(ALLOWED_ATTR, mathMl);
				addToSet(ALLOWED_ATTR, xml);
			}
		}
		EXTRA_ELEMENT_HANDLING.tagCheck = null;
		EXTRA_ELEMENT_HANDLING.attributeCheck = null;
		if (cfg.ADD_TAGS) if (typeof cfg.ADD_TAGS === "function") EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
		else {
			if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone(ALLOWED_TAGS);
			addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
		}
		if (cfg.ADD_ATTR) if (typeof cfg.ADD_ATTR === "function") EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
		else {
			if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone(ALLOWED_ATTR);
			addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
		}
		if (cfg.ADD_URI_SAFE_ATTR) addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
		if (cfg.FORBID_CONTENTS) {
			if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
			addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
		}
		if (cfg.ADD_FORBID_CONTENTS) {
			if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
			addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
		}
		if (KEEP_CONTENT) ALLOWED_TAGS["#text"] = true;
		if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
			"html",
			"head",
			"body"
		]);
		if (ALLOWED_TAGS.table) {
			addToSet(ALLOWED_TAGS, ["tbody"]);
			delete FORBID_TAGS.tbody;
		}
		if (cfg.TRUSTED_TYPES_POLICY) {
			if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
			emptyHTML = trustedTypesPolicy.createHTML("");
		} else {
			if (trustedTypesPolicy === void 0) trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
			if (trustedTypesPolicy !== null && typeof emptyHTML === "string") emptyHTML = trustedTypesPolicy.createHTML("");
		}
		if (freeze) freeze(cfg);
		CONFIG = cfg;
	};
	const ALL_SVG_TAGS = addToSet({}, [
		...svg$1,
		...svgFilters,
		...svgDisallowed
	]);
	const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
	/**
	* @param element a DOM element whose namespace is being checked
	* @returns Return false if the element has a
	*  namespace that a spec-compliant parser would never
	*  return. Return true otherwise.
	*/
	const _checkValidNamespace = function _checkValidNamespace(element) {
		let parent = getParentNode(element);
		if (!parent || !parent.tagName) parent = {
			namespaceURI: NAMESPACE,
			tagName: "template"
		};
		const tagName = stringToLowerCase(element.tagName);
		const parentTagName = stringToLowerCase(parent.tagName);
		if (!ALLOWED_NAMESPACES[element.namespaceURI]) return false;
		if (element.namespaceURI === SVG_NAMESPACE) {
			if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "svg";
			if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
			return Boolean(ALL_SVG_TAGS[tagName]);
		}
		if (element.namespaceURI === MATHML_NAMESPACE) {
			if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "math";
			if (parent.namespaceURI === SVG_NAMESPACE) return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
			return Boolean(ALL_MATHML_TAGS[tagName]);
		}
		if (element.namespaceURI === HTML_NAMESPACE) {
			if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
			if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
			return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
		}
		if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) return true;
		return false;
	};
	/**
	* _forceRemove
	*
	* @param node a DOM node
	*/
	const _forceRemove = function _forceRemove(node) {
		arrayPush(DOMPurify.removed, { element: node });
		try {
			getParentNode(node).removeChild(node);
		} catch (_) {
			remove(node);
		}
	};
	/**
	* _removeAttribute
	*
	* @param name an Attribute name
	* @param element a DOM node
	*/
	const _removeAttribute = function _removeAttribute(name, element) {
		try {
			arrayPush(DOMPurify.removed, {
				attribute: element.getAttributeNode(name),
				from: element
			});
		} catch (_) {
			arrayPush(DOMPurify.removed, {
				attribute: null,
				from: element
			});
		}
		element.removeAttribute(name);
		if (name === "is") if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
			_forceRemove(element);
		} catch (_) {}
		else try {
			element.setAttribute(name, "");
		} catch (_) {}
	};
	/**
	* _initDocument
	*
	* @param dirty - a string of dirty markup
	* @return a DOM, filled with the dirty markup
	*/
	const _initDocument = function _initDocument(dirty) {
		let doc = null;
		let leadingWhitespace = null;
		if (FORCE_BODY) dirty = "<remove></remove>" + dirty;
		else {
			const matches = stringMatch(dirty, /^[\r\n\t ]+/);
			leadingWhitespace = matches && matches[0];
		}
		if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) dirty = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + dirty + "</body></html>";
		const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
		if (NAMESPACE === HTML_NAMESPACE) try {
			doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
		} catch (_) {}
		if (!doc || !doc.documentElement) {
			doc = implementation.createDocument(NAMESPACE, "template", null);
			try {
				doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
			} catch (_) {}
		}
		const body = doc.body || doc.documentElement;
		if (dirty && leadingWhitespace) body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
		if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
		return WHOLE_DOCUMENT ? doc.documentElement : body;
	};
	/**
	* Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
	*
	* @param root The root element or node to start traversing on.
	* @return The created NodeIterator
	*/
	const _createNodeIterator = function _createNodeIterator(root) {
		return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
	};
	/**
	* _isClobbered
	*
	* @param element element to check for clobbering attacks
	* @return true if clobbered, false if safe
	*/
	const _isClobbered = function _isClobbered(element) {
		return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
	};
	/**
	* Checks whether the given object is a DOM node.
	*
	* @param value object to check whether it's a DOM node
	* @return true is object is a DOM node
	*/
	const _isNode = function _isNode(value) {
		return typeof Node === "function" && value instanceof Node;
	};
	function _executeHooks(hooks, currentNode, data) {
		arrayForEach(hooks, (hook) => {
			hook.call(DOMPurify, currentNode, data, CONFIG);
		});
	}
	/**
	* _sanitizeElements
	*
	* @protect nodeName
	* @protect textContent
	* @protect removeChild
	* @param currentNode to check for permission to exist
	* @return true if node was killed, false if left alive
	*/
	const _sanitizeElements = function _sanitizeElements(currentNode) {
		let content = null;
		_executeHooks(hooks.beforeSanitizeElements, currentNode, null);
		if (_isClobbered(currentNode)) {
			_forceRemove(currentNode);
			return true;
		}
		const tagName = transformCaseFunc(currentNode.nodeName);
		_executeHooks(hooks.uponSanitizeElement, currentNode, {
			tagName,
			allowedTags: ALLOWED_TAGS
		});
		if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
			_forceRemove(currentNode);
			return true;
		}
		if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && tagName === "style" && _isNode(currentNode.firstElementChild)) {
			_forceRemove(currentNode);
			return true;
		}
		if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
			_forceRemove(currentNode);
			return true;
		}
		if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
			_forceRemove(currentNode);
			return true;
		}
		if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
			if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
				if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
				if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
			}
			if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
				const parentNode = getParentNode(currentNode) || currentNode.parentNode;
				const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
				if (childNodes && parentNode) {
					const childCount = childNodes.length;
					for (let i = childCount - 1; i >= 0; --i) {
						const childClone = cloneNode(childNodes[i], true);
						childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
						parentNode.insertBefore(childClone, getNextSibling(currentNode));
					}
				}
			}
			_forceRemove(currentNode);
			return true;
		}
		if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
			_forceRemove(currentNode);
			return true;
		}
		if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
			_forceRemove(currentNode);
			return true;
		}
		if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
			content = currentNode.textContent;
			arrayForEach([
				MUSTACHE_EXPR,
				ERB_EXPR,
				TMPLIT_EXPR
			], (expr) => {
				content = stringReplace(content, expr, " ");
			});
			if (currentNode.textContent !== content) {
				arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
				currentNode.textContent = content;
			}
		}
		_executeHooks(hooks.afterSanitizeElements, currentNode, null);
		return false;
	};
	/**
	* _isValidAttribute
	*
	* @param lcTag Lowercase tag name of containing element.
	* @param lcName Lowercase attribute name.
	* @param value Attribute value.
	* @return Returns true if `value` is valid, otherwise false.
	*/
	const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
		if (FORBID_ATTR[lcName]) return false;
		if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document || value in formElement)) return false;
		if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName));
		else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName));
		else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag));
		else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) if (_isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value)));
		else return false;
		else if (URI_SAFE_ATTRIBUTES[lcName]);
		else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, "")));
		else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]);
		else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, "")));
		else if (value) return false;
		return true;
	};
	/**
	* _isBasicCustomElement
	* checks if at least one dash is included in tagName, and it's not the first char
	* for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
	*
	* @param tagName name of the tag of the node to sanitize
	* @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
	*/
	const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
		return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT);
	};
	/**
	* _sanitizeAttributes
	*
	* @protect attributes
	* @protect nodeName
	* @protect removeAttribute
	* @protect setAttribute
	*
	* @param currentNode to sanitize
	*/
	const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
		_executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
		const { attributes } = currentNode;
		if (!attributes || _isClobbered(currentNode)) return;
		const hookEvent = {
			attrName: "",
			attrValue: "",
			keepAttr: true,
			allowedAttributes: ALLOWED_ATTR,
			forceKeepAttr: void 0
		};
		let l = attributes.length;
		while (l--) {
			const { name, namespaceURI, value: attrValue } = attributes[l];
			const lcName = transformCaseFunc(name);
			const initValue = attrValue;
			let value = name === "value" ? initValue : stringTrim(initValue);
			hookEvent.attrName = lcName;
			hookEvent.attrValue = value;
			hookEvent.keepAttr = true;
			hookEvent.forceKeepAttr = void 0;
			_executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
			value = hookEvent.attrValue;
			if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
				_removeAttribute(name, currentNode);
				value = SANITIZE_NAMED_PROPS_PREFIX + value;
			}
			if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
				_removeAttribute(name, currentNode);
				continue;
			}
			if (lcName === "attributename" && stringMatch(value, "href")) {
				_removeAttribute(name, currentNode);
				continue;
			}
			if (hookEvent.forceKeepAttr) continue;
			if (!hookEvent.keepAttr) {
				_removeAttribute(name, currentNode);
				continue;
			}
			if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
				_removeAttribute(name, currentNode);
				continue;
			}
			if (SAFE_FOR_TEMPLATES) arrayForEach([
				MUSTACHE_EXPR,
				ERB_EXPR,
				TMPLIT_EXPR
			], (expr) => {
				value = stringReplace(value, expr, " ");
			});
			const lcTag = transformCaseFunc(currentNode.nodeName);
			if (!_isValidAttribute(lcTag, lcName, value)) {
				_removeAttribute(name, currentNode);
				continue;
			}
			if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") if (namespaceURI);
			else switch (trustedTypes.getAttributeType(lcTag, lcName)) {
				case "TrustedHTML":
					value = trustedTypesPolicy.createHTML(value);
					break;
				case "TrustedScriptURL":
					value = trustedTypesPolicy.createScriptURL(value);
					break;
			}
			if (value !== initValue) try {
				if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
				else currentNode.setAttribute(name, value);
				if (_isClobbered(currentNode)) _forceRemove(currentNode);
				else arrayPop(DOMPurify.removed);
			} catch (_) {
				_removeAttribute(name, currentNode);
			}
		}
		_executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
	};
	/**
	* _sanitizeShadowDOM
	*
	* @param fragment to iterate over recursively
	*/
	const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
		let shadowNode = null;
		const shadowIterator = _createNodeIterator(fragment);
		_executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
		while (shadowNode = shadowIterator.nextNode()) {
			_executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
			_sanitizeElements(shadowNode);
			_sanitizeAttributes(shadowNode);
			if (shadowNode.content instanceof DocumentFragment) _sanitizeShadowDOM2(shadowNode.content);
		}
		_executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
	};
	DOMPurify.sanitize = function(dirty) {
		let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		let body = null;
		let importedNode = null;
		let currentNode = null;
		let returnNode = null;
		IS_EMPTY_INPUT = !dirty;
		if (IS_EMPTY_INPUT) dirty = "<!-->";
		if (typeof dirty !== "string" && !_isNode(dirty)) if (typeof dirty.toString === "function") {
			dirty = dirty.toString();
			if (typeof dirty !== "string") throw typeErrorCreate("dirty is not a string, aborting");
		} else throw typeErrorCreate("toString is not a function");
		if (!DOMPurify.isSupported) return dirty;
		if (!SET_CONFIG) _parseConfig(cfg);
		DOMPurify.removed = [];
		if (typeof dirty === "string") IN_PLACE = false;
		if (IN_PLACE) {
			if (dirty.nodeName) {
				const tagName = transformCaseFunc(dirty.nodeName);
				if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
			}
		} else if (dirty instanceof Node) {
			body = _initDocument("<!---->");
			importedNode = body.ownerDocument.importNode(dirty, true);
			if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") body = importedNode;
			else if (importedNode.nodeName === "HTML") body = importedNode;
			else body.appendChild(importedNode);
		} else {
			if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
			body = _initDocument(dirty);
			if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
		}
		if (body && FORCE_BODY) _forceRemove(body.firstChild);
		const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
		while (currentNode = nodeIterator.nextNode()) {
			_sanitizeElements(currentNode);
			_sanitizeAttributes(currentNode);
			if (currentNode.content instanceof DocumentFragment) _sanitizeShadowDOM2(currentNode.content);
		}
		if (IN_PLACE) return dirty;
		if (RETURN_DOM) {
			if (SAFE_FOR_TEMPLATES) {
				body.normalize();
				let html = body.innerHTML;
				arrayForEach([
					MUSTACHE_EXPR,
					ERB_EXPR,
					TMPLIT_EXPR
				], (expr) => {
					html = stringReplace(html, expr, " ");
				});
				body.innerHTML = html;
			}
			if (RETURN_DOM_FRAGMENT) {
				returnNode = createDocumentFragment.call(body.ownerDocument);
				while (body.firstChild) returnNode.appendChild(body.firstChild);
			} else returnNode = body;
			if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) returnNode = importNode.call(originalDocument, returnNode, true);
			return returnNode;
		}
		let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
		if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
		if (SAFE_FOR_TEMPLATES) arrayForEach([
			MUSTACHE_EXPR,
			ERB_EXPR,
			TMPLIT_EXPR
		], (expr) => {
			serializedHTML = stringReplace(serializedHTML, expr, " ");
		});
		return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
	};
	DOMPurify.setConfig = function() {
		_parseConfig(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {});
		SET_CONFIG = true;
	};
	DOMPurify.clearConfig = function() {
		CONFIG = null;
		SET_CONFIG = false;
	};
	DOMPurify.isValidAttribute = function(tag, attr, value) {
		if (!CONFIG) _parseConfig({});
		return _isValidAttribute(transformCaseFunc(tag), transformCaseFunc(attr), value);
	};
	DOMPurify.addHook = function(entryPoint, hookFunction) {
		if (typeof hookFunction !== "function") return;
		arrayPush(hooks[entryPoint], hookFunction);
	};
	DOMPurify.removeHook = function(entryPoint, hookFunction) {
		if (hookFunction !== void 0) {
			const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
			return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
		}
		return arrayPop(hooks[entryPoint]);
	};
	DOMPurify.removeHooks = function(entryPoint) {
		hooks[entryPoint] = [];
	};
	DOMPurify.removeAllHooks = function() {
		hooks = _createHooksMap();
	};
	return DOMPurify;
}
var purify = createDOMPurify();
//#endregion
//#region node_modules/clsx/dist/clsx.m.js
var clsx_m_exports = /* @__PURE__ */ __exportAll({
	clsx: () => clsx,
	default: () => clsx
});
function r$1(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (f = r$1(e[t])) && (n && (n += " "), n += f);
	else for (t in e) e[t] && (n && (n += " "), n += t);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = ""; f < arguments.length;) (e = arguments[f++]) && (t = r$1(e)) && (n && (n += " "), n += t);
	return n;
}
var init_clsx_m = __esmMin((() => {}));
//#endregion
//#region node_modules/react-draggable/build/cjs/utils/shims.js
var require_shims = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.dontSetMe = dontSetMe;
	exports.findInArray = findInArray;
	exports.int = int;
	exports.isFunction = isFunction;
	exports.isNum = isNum;
	function findInArray(array, callback) {
		for (let i = 0, length = array.length; i < length; i++) if (callback.apply(callback, [
			array[i],
			i,
			array
		])) return array[i];
	}
	function isFunction(func) {
		return typeof func === "function" || Object.prototype.toString.call(func) === "[object Function]";
	}
	function isNum(num) {
		return typeof num === "number" && !isNaN(num);
	}
	function int(a) {
		return parseInt(a, 10);
	}
	function dontSetMe(props, propName, componentName) {
		if (props[propName]) return new Error("Invalid prop ".concat(propName, " passed to ").concat(componentName, " - do not set this, set it on the child."));
	}
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/utils/getPrefix.js
var require_getPrefix = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.browserPrefixToKey = browserPrefixToKey;
	exports.browserPrefixToStyle = browserPrefixToStyle;
	exports.default = void 0;
	exports.getPrefix = getPrefix;
	var prefixes = [
		"Moz",
		"Webkit",
		"O",
		"ms"
	];
	function getPrefix() {
		var _window$document;
		let prop = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
		if (typeof window === "undefined") return "";
		const style = (_window$document = window.document) === null || _window$document === void 0 || (_window$document = _window$document.documentElement) === null || _window$document === void 0 ? void 0 : _window$document.style;
		if (!style) return "";
		if (prop in style) return "";
		for (let i = 0; i < prefixes.length; i++) if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
		return "";
	}
	function browserPrefixToKey(prop, prefix) {
		return prefix ? "".concat(prefix).concat(kebabToTitleCase(prop)) : prop;
	}
	function browserPrefixToStyle(prop, prefix) {
		return prefix ? "-".concat(prefix.toLowerCase(), "-").concat(prop) : prop;
	}
	function kebabToTitleCase(str) {
		let out = "";
		let shouldCapitalize = true;
		for (let i = 0; i < str.length; i++) if (shouldCapitalize) {
			out += str[i].toUpperCase();
			shouldCapitalize = false;
		} else if (str[i] === "-") shouldCapitalize = true;
		else out += str[i];
		return out;
	}
	exports.default = getPrefix();
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/utils/domFns.js
var require_domFns = /* @__PURE__ */ __commonJSMin(((exports) => {
	init_objectSpread2();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.addClassName = addClassName;
	exports.addEvent = addEvent;
	exports.addUserSelectStyles = addUserSelectStyles;
	exports.createCSSTransform = createCSSTransform;
	exports.createSVGTransform = createSVGTransform;
	exports.getTouch = getTouch;
	exports.getTouchIdentifier = getTouchIdentifier;
	exports.getTranslation = getTranslation;
	exports.innerHeight = innerHeight;
	exports.innerWidth = innerWidth;
	exports.matchesSelector = matchesSelector;
	exports.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
	exports.offsetXYFromParent = offsetXYFromParent;
	exports.outerHeight = outerHeight;
	exports.outerWidth = outerWidth;
	exports.removeClassName = removeClassName;
	exports.removeEvent = removeEvent;
	exports.removeUserSelectStyles = removeUserSelectStyles;
	var _shims = require_shims();
	var _getPrefix = _interopRequireWildcard(require_getPrefix());
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interopRequireWildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj.default = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	var matchesSelectorFunc = "";
	function matchesSelector(el, selector) {
		if (!matchesSelectorFunc) matchesSelectorFunc = (0, _shims.findInArray)([
			"matches",
			"webkitMatchesSelector",
			"mozMatchesSelector",
			"msMatchesSelector",
			"oMatchesSelector"
		], function(method) {
			return (0, _shims.isFunction)(el[method]);
		});
		if (!(0, _shims.isFunction)(el[matchesSelectorFunc])) return false;
		return el[matchesSelectorFunc](selector);
	}
	function matchesSelectorAndParentsTo(el, selector, baseNode) {
		let node = el;
		do {
			if (matchesSelector(node, selector)) return true;
			if (node === baseNode) return false;
			node = node.parentNode;
		} while (node);
		return false;
	}
	function addEvent(el, event, handler, inputOptions) {
		if (!el) return;
		const options = _objectSpread2({ capture: true }, inputOptions);
		if (el.addEventListener) el.addEventListener(event, handler, options);
		else if (el.attachEvent) el.attachEvent("on" + event, handler);
		else el["on" + event] = handler;
	}
	function removeEvent(el, event, handler, inputOptions) {
		if (!el) return;
		const options = _objectSpread2({ capture: true }, inputOptions);
		if (el.removeEventListener) el.removeEventListener(event, handler, options);
		else if (el.detachEvent) el.detachEvent("on" + event, handler);
		else el["on" + event] = null;
	}
	function outerHeight(node) {
		let height = node.clientHeight;
		const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		height += (0, _shims.int)(computedStyle.borderTopWidth);
		height += (0, _shims.int)(computedStyle.borderBottomWidth);
		return height;
	}
	function outerWidth(node) {
		let width = node.clientWidth;
		const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		width += (0, _shims.int)(computedStyle.borderLeftWidth);
		width += (0, _shims.int)(computedStyle.borderRightWidth);
		return width;
	}
	function innerHeight(node) {
		let height = node.clientHeight;
		const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		height -= (0, _shims.int)(computedStyle.paddingTop);
		height -= (0, _shims.int)(computedStyle.paddingBottom);
		return height;
	}
	function innerWidth(node) {
		let width = node.clientWidth;
		const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
		width -= (0, _shims.int)(computedStyle.paddingLeft);
		width -= (0, _shims.int)(computedStyle.paddingRight);
		return width;
	}
	function offsetXYFromParent(evt, offsetParent, scale) {
		const offsetParentRect = offsetParent === offsetParent.ownerDocument.body ? {
			left: 0,
			top: 0
		} : offsetParent.getBoundingClientRect();
		return {
			x: (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale,
			y: (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale
		};
	}
	function createCSSTransform(controlPos, positionOffset) {
		const translation = getTranslation(controlPos, positionOffset, "px");
		return { [(0, _getPrefix.browserPrefixToKey)("transform", _getPrefix.default)]: translation };
	}
	function createSVGTransform(controlPos, positionOffset) {
		return getTranslation(controlPos, positionOffset, "");
	}
	function getTranslation(_ref, positionOffset, unitSuffix) {
		let { x, y } = _ref;
		let translation = "translate(".concat(x).concat(unitSuffix, ",").concat(y).concat(unitSuffix, ")");
		if (positionOffset) {
			const defaultX = "".concat(typeof positionOffset.x === "string" ? positionOffset.x : positionOffset.x + unitSuffix);
			const defaultY = "".concat(typeof positionOffset.y === "string" ? positionOffset.y : positionOffset.y + unitSuffix);
			translation = "translate(".concat(defaultX, ", ").concat(defaultY, ")") + translation;
		}
		return translation;
	}
	function getTouch(e, identifier) {
		return e.targetTouches && (0, _shims.findInArray)(e.targetTouches, (t) => identifier === t.identifier) || e.changedTouches && (0, _shims.findInArray)(e.changedTouches, (t) => identifier === t.identifier);
	}
	function getTouchIdentifier(e) {
		if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
		if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
	}
	function addUserSelectStyles(doc) {
		if (!doc) return;
		let styleEl = doc.getElementById("react-draggable-style-el");
		if (!styleEl) {
			styleEl = doc.createElement("style");
			styleEl.type = "text/css";
			styleEl.id = "react-draggable-style-el";
			styleEl.innerHTML = ".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n";
			styleEl.innerHTML += ".react-draggable-transparent-selection *::selection {all: inherit;}\n";
			doc.getElementsByTagName("head")[0].appendChild(styleEl);
		}
		if (doc.body) addClassName(doc.body, "react-draggable-transparent-selection");
	}
	function removeUserSelectStyles(doc) {
		if (!doc) return;
		try {
			if (doc.body) removeClassName(doc.body, "react-draggable-transparent-selection");
			if (doc.selection) doc.selection.empty();
			else {
				const selection = (doc.defaultView || window).getSelection();
				if (selection && selection.type !== "Caret") selection.removeAllRanges();
			}
		} catch (e) {}
	}
	function addClassName(el, className) {
		if (el.classList) el.classList.add(className);
		else if (!el.className.match(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)")))) el.className += " ".concat(className);
	}
	function removeClassName(el, className) {
		if (el.classList) el.classList.remove(className);
		else el.className = el.className.replace(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)"), "g"), "");
	}
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/utils/positionFns.js
var require_positionFns = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.canDragX = canDragX;
	exports.canDragY = canDragY;
	exports.createCoreData = createCoreData;
	exports.createDraggableData = createDraggableData;
	exports.getBoundPosition = getBoundPosition;
	exports.getControlPosition = getControlPosition;
	exports.snapToGrid = snapToGrid;
	var _shims = require_shims();
	var _domFns = require_domFns();
	function getBoundPosition(draggable, x, y) {
		if (!draggable.props.bounds) return [x, y];
		let { bounds } = draggable.props;
		bounds = typeof bounds === "string" ? bounds : cloneBounds(bounds);
		const node = findDOMNode(draggable);
		if (typeof bounds === "string") {
			const { ownerDocument } = node;
			const ownerWindow = ownerDocument.defaultView;
			let boundNode;
			if (bounds === "parent") boundNode = node.parentNode;
			else boundNode = ownerDocument.querySelector(bounds);
			if (!(boundNode instanceof ownerWindow.HTMLElement)) throw new Error("Bounds selector \"" + bounds + "\" could not find an element.");
			const boundNodeEl = boundNode;
			const nodeStyle = ownerWindow.getComputedStyle(node);
			const boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl);
			bounds = {
				left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.marginLeft),
				top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.marginTop),
				right: (0, _domFns.innerWidth)(boundNodeEl) - (0, _domFns.outerWidth)(node) - node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingRight) - (0, _shims.int)(nodeStyle.marginRight),
				bottom: (0, _domFns.innerHeight)(boundNodeEl) - (0, _domFns.outerHeight)(node) - node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingBottom) - (0, _shims.int)(nodeStyle.marginBottom)
			};
		}
		if ((0, _shims.isNum)(bounds.right)) x = Math.min(x, bounds.right);
		if ((0, _shims.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom);
		if ((0, _shims.isNum)(bounds.left)) x = Math.max(x, bounds.left);
		if ((0, _shims.isNum)(bounds.top)) y = Math.max(y, bounds.top);
		return [x, y];
	}
	function snapToGrid(grid, pendingX, pendingY) {
		return [Math.round(pendingX / grid[0]) * grid[0], Math.round(pendingY / grid[1]) * grid[1]];
	}
	function canDragX(draggable) {
		return draggable.props.axis === "both" || draggable.props.axis === "x";
	}
	function canDragY(draggable) {
		return draggable.props.axis === "both" || draggable.props.axis === "y";
	}
	function getControlPosition(e, touchIdentifier, draggableCore) {
		const touchObj = typeof touchIdentifier === "number" ? (0, _domFns.getTouch)(e, touchIdentifier) : null;
		if (typeof touchIdentifier === "number" && !touchObj) return null;
		const node = findDOMNode(draggableCore);
		const offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
		return (0, _domFns.offsetXYFromParent)(touchObj || e, offsetParent, draggableCore.props.scale);
	}
	function createCoreData(draggable, x, y) {
		const isStart = !(0, _shims.isNum)(draggable.lastX);
		const node = findDOMNode(draggable);
		if (isStart) return {
			node,
			deltaX: 0,
			deltaY: 0,
			lastX: x,
			lastY: y,
			x,
			y
		};
		else return {
			node,
			deltaX: x - draggable.lastX,
			deltaY: y - draggable.lastY,
			lastX: draggable.lastX,
			lastY: draggable.lastY,
			x,
			y
		};
	}
	function createDraggableData(draggable, coreData) {
		const scale = draggable.props.scale;
		return {
			node: coreData.node,
			x: draggable.state.x + coreData.deltaX / scale,
			y: draggable.state.y + coreData.deltaY / scale,
			deltaX: coreData.deltaX / scale,
			deltaY: coreData.deltaY / scale,
			lastX: draggable.state.x,
			lastY: draggable.state.y
		};
	}
	function cloneBounds(bounds) {
		return {
			left: bounds.left,
			top: bounds.top,
			right: bounds.right,
			bottom: bounds.bottom
		};
	}
	function findDOMNode(draggable) {
		const node = draggable.findDOMNode();
		if (!node) throw new Error("<DraggableCore>: Unmounted during event!");
		return node;
	}
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/utils/log.js
var require_log = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = log;
	function log() {}
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/DraggableCore.js
var require_DraggableCore = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var React = _interopRequireWildcard(require_react());
	var _propTypes = _interopRequireDefault(require_prop_types());
	var _reactDom = _interopRequireDefault(require_react_dom());
	var _domFns = require_domFns();
	var _positionFns = require_positionFns();
	var _shims = require_shims();
	var _log = _interopRequireDefault(require_log());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interopRequireWildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj.default = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	function _defineProperty(obj, key, value) {
		key = _toPropertyKey(key);
		if (key in obj) Object.defineProperty(obj, key, {
			value,
			enumerable: true,
			configurable: true,
			writable: true
		});
		else obj[key] = value;
		return obj;
	}
	function _toPropertyKey(arg) {
		var key = _toPrimitive(arg, "string");
		return typeof key === "symbol" ? key : String(key);
	}
	function _toPrimitive(input, hint) {
		if (typeof input !== "object" || input === null) return input;
		var prim = input[Symbol.toPrimitive];
		if (prim !== void 0) {
			var res = prim.call(input, hint || "default");
			if (typeof res !== "object") return res;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return (hint === "string" ? String : Number)(input);
	}
	var eventsFor = {
		touch: {
			start: "touchstart",
			move: "touchmove",
			stop: "touchend"
		},
		mouse: {
			start: "mousedown",
			move: "mousemove",
			stop: "mouseup"
		}
	};
	var dragEventFor = eventsFor.mouse;
	var DraggableCore = class extends React.Component {
		constructor() {
			super(...arguments);
			_defineProperty(this, "dragging", false);
			_defineProperty(this, "lastX", NaN);
			_defineProperty(this, "lastY", NaN);
			_defineProperty(this, "touchIdentifier", null);
			_defineProperty(this, "mounted", false);
			_defineProperty(this, "handleDragStart", (e) => {
				this.props.onMouseDown(e);
				if (!this.props.allowAnyClick && typeof e.button === "number" && e.button !== 0) return false;
				const thisNode = this.findDOMNode();
				if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) throw new Error("<DraggableCore> not mounted on DragStart!");
				const { ownerDocument } = thisNode;
				if (this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, this.props.handle, thisNode) || this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, this.props.cancel, thisNode)) return;
				if (e.type === "touchstart") e.preventDefault();
				const touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
				this.touchIdentifier = touchIdentifier;
				const position = (0, _positionFns.getControlPosition)(e, touchIdentifier, this);
				if (position == null) return;
				const { x, y } = position;
				const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
				(0, _log.default)("DraggableCore: handleDragStart: %j", coreEvent);
				(0, _log.default)("calling", this.props.onStart);
				if (this.props.onStart(e, coreEvent) === false || this.mounted === false) return;
				if (this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument);
				this.dragging = true;
				this.lastX = x;
				this.lastY = y;
				(0, _domFns.addEvent)(ownerDocument, dragEventFor.move, this.handleDrag);
				(0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, this.handleDragStop);
			});
			_defineProperty(this, "handleDrag", (e) => {
				const position = (0, _positionFns.getControlPosition)(e, this.touchIdentifier, this);
				if (position == null) return;
				let { x, y } = position;
				if (Array.isArray(this.props.grid)) {
					let deltaX = x - this.lastX, deltaY = y - this.lastY;
					[deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
					if (!deltaX && !deltaY) return;
					x = this.lastX + deltaX, y = this.lastY + deltaY;
				}
				const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
				(0, _log.default)("DraggableCore: handleDrag: %j", coreEvent);
				if (this.props.onDrag(e, coreEvent) === false || this.mounted === false) {
					try {
						this.handleDragStop(new MouseEvent("mouseup"));
					} catch (err) {
						const event = document.createEvent("MouseEvents");
						event.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						this.handleDragStop(event);
					}
					return;
				}
				this.lastX = x;
				this.lastY = y;
			});
			_defineProperty(this, "handleDragStop", (e) => {
				if (!this.dragging) return;
				const position = (0, _positionFns.getControlPosition)(e, this.touchIdentifier, this);
				if (position == null) return;
				let { x, y } = position;
				if (Array.isArray(this.props.grid)) {
					let deltaX = x - this.lastX || 0;
					let deltaY = y - this.lastY || 0;
					[deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
					x = this.lastX + deltaX, y = this.lastY + deltaY;
				}
				const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
				if (this.props.onStop(e, coreEvent) === false || this.mounted === false) return false;
				const thisNode = this.findDOMNode();
				if (thisNode) {
					if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(thisNode.ownerDocument);
				}
				(0, _log.default)("DraggableCore: handleDragStop: %j", coreEvent);
				this.dragging = false;
				this.lastX = NaN;
				this.lastY = NaN;
				if (thisNode) {
					(0, _log.default)("DraggableCore: Removing handlers");
					(0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, this.handleDrag);
					(0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, this.handleDragStop);
				}
			});
			_defineProperty(this, "onMouseDown", (e) => {
				dragEventFor = eventsFor.mouse;
				return this.handleDragStart(e);
			});
			_defineProperty(this, "onMouseUp", (e) => {
				dragEventFor = eventsFor.mouse;
				return this.handleDragStop(e);
			});
			_defineProperty(this, "onTouchStart", (e) => {
				dragEventFor = eventsFor.touch;
				return this.handleDragStart(e);
			});
			_defineProperty(this, "onTouchEnd", (e) => {
				dragEventFor = eventsFor.touch;
				return this.handleDragStop(e);
			});
		}
		componentDidMount() {
			this.mounted = true;
			const thisNode = this.findDOMNode();
			if (thisNode) (0, _domFns.addEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, { passive: false });
		}
		componentWillUnmount() {
			this.mounted = false;
			const thisNode = this.findDOMNode();
			if (thisNode) {
				const { ownerDocument } = thisNode;
				(0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
				(0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
				(0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
				(0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
				(0, _domFns.removeEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, { passive: false });
				if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument);
			}
		}
		findDOMNode() {
			var _this$props, _this$props2;
			return (_this$props = this.props) !== null && _this$props !== void 0 && _this$props.nodeRef ? (_this$props2 = this.props) === null || _this$props2 === void 0 || (_this$props2 = _this$props2.nodeRef) === null || _this$props2 === void 0 ? void 0 : _this$props2.current : _reactDom.default.findDOMNode(this);
		}
		render() {
			return /* @__PURE__ */ React.cloneElement(React.Children.only(this.props.children), {
				onMouseDown: this.onMouseDown,
				onMouseUp: this.onMouseUp,
				onTouchEnd: this.onTouchEnd
			});
		}
	};
	exports.default = DraggableCore;
	_defineProperty(DraggableCore, "displayName", "DraggableCore");
	_defineProperty(DraggableCore, "propTypes", {
		/**
		* `allowAnyClick` allows dragging using any mouse button.
		* By default, we only accept the left button.
		*
		* Defaults to `false`.
		*/
		allowAnyClick: _propTypes.default.bool,
		children: _propTypes.default.node.isRequired,
		/**
		* `disabled`, if true, stops the <Draggable> from dragging. All handlers,
		* with the exception of `onMouseDown`, will not fire.
		*/
		disabled: _propTypes.default.bool,
		/**
		* By default, we add 'user-select:none' attributes to the document body
		* to prevent ugly text selection during drag. If this is causing problems
		* for your app, set this to `false`.
		*/
		enableUserSelectHack: _propTypes.default.bool,
		/**
		* `offsetParent`, if set, uses the passed DOM node to compute drag offsets
		* instead of using the parent node.
		*/
		offsetParent: function(props, propName) {
			if (props[propName] && props[propName].nodeType !== 1) throw new Error("Draggable's offsetParent must be a DOM Node.");
		},
		/**
		* `grid` specifies the x and y that dragging should snap to.
		*/
		grid: _propTypes.default.arrayOf(_propTypes.default.number),
		/**
		* `handle` specifies a selector to be used as the handle that initiates drag.
		*
		* Example:
		*
		* ```jsx
		*   let App = React.createClass({
		*       render: function () {
		*         return (
		*            <Draggable handle=".handle">
		*              <div>
		*                  <div className="handle">Click me to drag</div>
		*                  <div>This is some other content</div>
		*              </div>
		*           </Draggable>
		*         );
		*       }
		*   });
		* ```
		*/
		handle: _propTypes.default.string,
		/**
		* `cancel` specifies a selector to be used to prevent drag initialization.
		*
		* Example:
		*
		* ```jsx
		*   let App = React.createClass({
		*       render: function () {
		*           return(
		*               <Draggable cancel=".cancel">
		*                   <div>
		*                     <div className="cancel">You can't drag from here</div>
		*                     <div>Dragging here works fine</div>
		*                   </div>
		*               </Draggable>
		*           );
		*       }
		*   });
		* ```
		*/
		cancel: _propTypes.default.string,
		nodeRef: _propTypes.default.object,
		/**
		* Called when dragging starts.
		* If this function returns the boolean false, dragging will be canceled.
		*/
		onStart: _propTypes.default.func,
		/**
		* Called while dragging.
		* If this function returns the boolean false, dragging will be canceled.
		*/
		onDrag: _propTypes.default.func,
		/**
		* Called when dragging stops.
		* If this function returns the boolean false, the drag will remain active.
		*/
		onStop: _propTypes.default.func,
		/**
		* A workaround option which can be passed if onMouseDown needs to be accessed,
		* since it'll always be blocked (as there is internal use of onMouseDown)
		*/
		onMouseDown: _propTypes.default.func,
		/**
		* `scale`, if set, applies scaling while dragging an element
		*/
		scale: _propTypes.default.number,
		/**
		* These properties should be defined on the child, not here.
		*/
		className: _shims.dontSetMe,
		style: _shims.dontSetMe,
		transform: _shims.dontSetMe
	});
	_defineProperty(DraggableCore, "defaultProps", {
		allowAnyClick: false,
		disabled: false,
		enableUserSelectHack: true,
		onStart: function() {},
		onDrag: function() {},
		onStop: function() {},
		onMouseDown: function() {},
		scale: 1
	});
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/Draggable.js
var require_Draggable = /* @__PURE__ */ __commonJSMin(((exports) => {
	init_objectSpread2();
	init_objectWithoutProperties();
	var _excluded = [
		"axis",
		"bounds",
		"children",
		"defaultPosition",
		"defaultClassName",
		"defaultClassNameDragging",
		"defaultClassNameDragged",
		"position",
		"positionOffset",
		"scale"
	];
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "DraggableCore", {
		enumerable: true,
		get: function() {
			return _DraggableCore.default;
		}
	});
	exports.default = void 0;
	var React = _interopRequireWildcard(require_react());
	var _propTypes = _interopRequireDefault(require_prop_types());
	var _reactDom = _interopRequireDefault(require_react_dom());
	var _clsx = _interopRequireDefault((init_clsx_m(), __toCommonJS(clsx_m_exports)));
	var _domFns = require_domFns();
	var _positionFns = require_positionFns();
	var _shims = require_shims();
	var _DraggableCore = _interopRequireDefault(require_DraggableCore());
	var _log = _interopRequireDefault(require_log());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function(nodeInterop) {
			return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interopRequireWildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = {};
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj.default = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	function _extends() {
		_extends = Object.assign ? Object.assign.bind() : function(target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];
				for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
			}
			return target;
		};
		return _extends.apply(this, arguments);
	}
	function _defineProperty(obj, key, value) {
		key = _toPropertyKey(key);
		if (key in obj) Object.defineProperty(obj, key, {
			value,
			enumerable: true,
			configurable: true,
			writable: true
		});
		else obj[key] = value;
		return obj;
	}
	function _toPropertyKey(arg) {
		var key = _toPrimitive(arg, "string");
		return typeof key === "symbol" ? key : String(key);
	}
	function _toPrimitive(input, hint) {
		if (typeof input !== "object" || input === null) return input;
		var prim = input[Symbol.toPrimitive];
		if (prim !== void 0) {
			var res = prim.call(input, hint || "default");
			if (typeof res !== "object") return res;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return (hint === "string" ? String : Number)(input);
	}
	var Draggable = class extends React.Component {
		static getDerivedStateFromProps(_ref, _ref2) {
			let { position } = _ref;
			let { prevPropsPosition } = _ref2;
			if (position && (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y)) {
				(0, _log.default)("Draggable: getDerivedStateFromProps %j", {
					position,
					prevPropsPosition
				});
				return {
					x: position.x,
					y: position.y,
					prevPropsPosition: _objectSpread2({}, position)
				};
			}
			return null;
		}
		constructor(props) {
			super(props);
			_defineProperty(this, "onDragStart", (e, coreData) => {
				(0, _log.default)("Draggable: onDragStart: %j", coreData);
				if (this.props.onStart(e, (0, _positionFns.createDraggableData)(this, coreData)) === false) return false;
				this.setState({
					dragging: true,
					dragged: true
				});
			});
			_defineProperty(this, "onDrag", (e, coreData) => {
				if (!this.state.dragging) return false;
				(0, _log.default)("Draggable: onDrag: %j", coreData);
				const uiData = (0, _positionFns.createDraggableData)(this, coreData);
				const newState = {
					x: uiData.x,
					y: uiData.y,
					slackX: 0,
					slackY: 0
				};
				if (this.props.bounds) {
					const { x, y } = newState;
					newState.x += this.state.slackX;
					newState.y += this.state.slackY;
					const [newStateX, newStateY] = (0, _positionFns.getBoundPosition)(this, newState.x, newState.y);
					newState.x = newStateX;
					newState.y = newStateY;
					newState.slackX = this.state.slackX + (x - newState.x);
					newState.slackY = this.state.slackY + (y - newState.y);
					uiData.x = newState.x;
					uiData.y = newState.y;
					uiData.deltaX = newState.x - this.state.x;
					uiData.deltaY = newState.y - this.state.y;
				}
				if (this.props.onDrag(e, uiData) === false) return false;
				this.setState(newState);
			});
			_defineProperty(this, "onDragStop", (e, coreData) => {
				if (!this.state.dragging) return false;
				if (this.props.onStop(e, (0, _positionFns.createDraggableData)(this, coreData)) === false) return false;
				(0, _log.default)("Draggable: onDragStop: %j", coreData);
				const newState = {
					dragging: false,
					slackX: 0,
					slackY: 0
				};
				if (Boolean(this.props.position)) {
					const { x, y } = this.props.position;
					newState.x = x;
					newState.y = y;
				}
				this.setState(newState);
			});
			this.state = {
				dragging: false,
				dragged: false,
				x: props.position ? props.position.x : props.defaultPosition.x,
				y: props.position ? props.position.y : props.defaultPosition.y,
				prevPropsPosition: _objectSpread2({}, props.position),
				slackX: 0,
				slackY: 0,
				isElementSVG: false
			};
			if (props.position && !(props.onDrag || props.onStop)) console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.");
		}
		componentDidMount() {
			if (typeof window.SVGElement !== "undefined" && this.findDOMNode() instanceof window.SVGElement) this.setState({ isElementSVG: true });
		}
		componentWillUnmount() {
			this.setState({ dragging: false });
		}
		findDOMNode() {
			var _this$props$nodeRef$c, _this$props;
			return (_this$props$nodeRef$c = (_this$props = this.props) === null || _this$props === void 0 || (_this$props = _this$props.nodeRef) === null || _this$props === void 0 ? void 0 : _this$props.current) !== null && _this$props$nodeRef$c !== void 0 ? _this$props$nodeRef$c : _reactDom.default.findDOMNode(this);
		}
		render() {
			const _this$props2 = this.props, { axis, bounds, children, defaultPosition, defaultClassName, defaultClassNameDragging, defaultClassNameDragged, position, positionOffset, scale } = _this$props2, draggableCoreProps = _objectWithoutProperties(_this$props2, _excluded);
			let style = {};
			let svgTransform = null;
			const draggable = !Boolean(position) || this.state.dragging;
			const validPosition = position || defaultPosition;
			const transformOpts = {
				x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : validPosition.x,
				y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : validPosition.y
			};
			if (this.state.isElementSVG) svgTransform = (0, _domFns.createSVGTransform)(transformOpts, positionOffset);
			else style = (0, _domFns.createCSSTransform)(transformOpts, positionOffset);
			const className = (0, _clsx.default)(children.props.className || "", defaultClassName, {
				[defaultClassNameDragging]: this.state.dragging,
				[defaultClassNameDragged]: this.state.dragged
			});
			return /* @__PURE__ */ React.createElement(_DraggableCore.default, _extends({}, draggableCoreProps, {
				onStart: this.onDragStart,
				onDrag: this.onDrag,
				onStop: this.onDragStop
			}), /* @__PURE__ */ React.cloneElement(React.Children.only(children), {
				className,
				style: _objectSpread2(_objectSpread2({}, children.props.style), style),
				transform: svgTransform
			}));
		}
	};
	exports.default = Draggable;
	_defineProperty(Draggable, "displayName", "Draggable");
	_defineProperty(Draggable, "propTypes", _objectSpread2(_objectSpread2({}, _DraggableCore.default.propTypes), {}, {
		/**
		* `axis` determines which axis the draggable can move.
		*
		*  Note that all callbacks will still return data as normal. This only
		*  controls flushing to the DOM.
		*
		* 'both' allows movement horizontally and vertically.
		* 'x' limits movement to horizontal axis.
		* 'y' limits movement to vertical axis.
		* 'none' limits all movement.
		*
		* Defaults to 'both'.
		*/
		axis: _propTypes.default.oneOf([
			"both",
			"x",
			"y",
			"none"
		]),
		/**
		* `bounds` determines the range of movement available to the element.
		* Available values are:
		*
		* 'parent' restricts movement within the Draggable's parent node.
		*
		* Alternatively, pass an object with the following properties, all of which are optional:
		*
		* {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
		*
		* All values are in px.
		*
		* Example:
		*
		* ```jsx
		*   let App = React.createClass({
		*       render: function () {
		*         return (
		*            <Draggable bounds={{right: 300, bottom: 300}}>
		*              <div>Content</div>
		*           </Draggable>
		*         );
		*       }
		*   });
		* ```
		*/
		bounds: _propTypes.default.oneOfType([
			_propTypes.default.shape({
				left: _propTypes.default.number,
				right: _propTypes.default.number,
				top: _propTypes.default.number,
				bottom: _propTypes.default.number
			}),
			_propTypes.default.string,
			_propTypes.default.oneOf([false])
		]),
		defaultClassName: _propTypes.default.string,
		defaultClassNameDragging: _propTypes.default.string,
		defaultClassNameDragged: _propTypes.default.string,
		/**
		* `defaultPosition` specifies the x and y that the dragged item should start at
		*
		* Example:
		*
		* ```jsx
		*      let App = React.createClass({
		*          render: function () {
		*              return (
		*                  <Draggable defaultPosition={{x: 25, y: 25}}>
		*                      <div>I start with transformX: 25px and transformY: 25px;</div>
		*                  </Draggable>
		*              );
		*          }
		*      });
		* ```
		*/
		defaultPosition: _propTypes.default.shape({
			x: _propTypes.default.number,
			y: _propTypes.default.number
		}),
		positionOffset: _propTypes.default.shape({
			x: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
			y: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
		}),
		/**
		* `position`, if present, defines the current position of the element.
		*
		*  This is similar to how form elements in React work - if no `position` is supplied, the component
		*  is uncontrolled.
		*
		* Example:
		*
		* ```jsx
		*      let App = React.createClass({
		*          render: function () {
		*              return (
		*                  <Draggable position={{x: 25, y: 25}}>
		*                      <div>I start with transformX: 25px and transformY: 25px;</div>
		*                  </Draggable>
		*              );
		*          }
		*      });
		* ```
		*/
		position: _propTypes.default.shape({
			x: _propTypes.default.number,
			y: _propTypes.default.number
		}),
		/**
		* These properties should be defined on the child, not here.
		*/
		className: _shims.dontSetMe,
		style: _shims.dontSetMe,
		transform: _shims.dontSetMe
	}));
	_defineProperty(Draggable, "defaultProps", _objectSpread2(_objectSpread2({}, _DraggableCore.default.defaultProps), {}, {
		axis: "both",
		bounds: false,
		defaultClassName: "react-draggable",
		defaultClassNameDragging: "react-draggable-dragging",
		defaultClassNameDragged: "react-draggable-dragged",
		defaultPosition: {
			x: 0,
			y: 0
		},
		scale: 1
	}));
}));
//#endregion
//#region node_modules/react-draggable/build/cjs/cjs.js
var require_cjs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { default: Draggable, DraggableCore } = require_Draggable();
	module.exports = Draggable;
	module.exports.default = Draggable;
	module.exports.DraggableCore = DraggableCore;
}));
//#endregion
//#region node_modules/re-resizable/lib/resizer.js
var import_cjs = /* @__PURE__ */ __toESM(require_cjs());
var import_jsx_runtime = require_jsx_runtime();
var __assign$2 = function() {
	__assign$2 = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign$2.apply(this, arguments);
};
var rowSizeBase = {
	width: "100%",
	height: "10px",
	top: "0px",
	left: "0px",
	cursor: "row-resize"
};
var colSizeBase = {
	width: "10px",
	height: "100%",
	top: "0px",
	left: "0px",
	cursor: "col-resize"
};
var edgeBase = {
	width: "20px",
	height: "20px",
	position: "absolute",
	zIndex: 1
};
var styles = {
	top: __assign$2(__assign$2({}, rowSizeBase), { top: "-5px" }),
	right: __assign$2(__assign$2({}, colSizeBase), {
		left: void 0,
		right: "-5px"
	}),
	bottom: __assign$2(__assign$2({}, rowSizeBase), {
		top: void 0,
		bottom: "-5px"
	}),
	left: __assign$2(__assign$2({}, colSizeBase), { left: "-5px" }),
	topRight: __assign$2(__assign$2({}, edgeBase), {
		right: "-10px",
		top: "-10px",
		cursor: "ne-resize"
	}),
	bottomRight: __assign$2(__assign$2({}, edgeBase), {
		right: "-10px",
		bottom: "-10px",
		cursor: "se-resize"
	}),
	bottomLeft: __assign$2(__assign$2({}, edgeBase), {
		left: "-10px",
		bottom: "-10px",
		cursor: "sw-resize"
	}),
	topLeft: __assign$2(__assign$2({}, edgeBase), {
		left: "-10px",
		top: "-10px",
		cursor: "nw-resize"
	})
};
var Resizer = (0, import_react.memo)(function(props) {
	var onResizeStart = props.onResizeStart, direction = props.direction, children = props.children, replaceStyles = props.replaceStyles, className = props.className;
	var onMouseDown = (0, import_react.useCallback)(function(e) {
		onResizeStart(e, direction);
	}, [onResizeStart, direction]);
	var onTouchStart = (0, import_react.useCallback)(function(e) {
		onResizeStart(e, direction);
	}, [onResizeStart, direction]);
	var style = (0, import_react.useMemo)(function() {
		return __assign$2(__assign$2({
			position: "absolute",
			userSelect: "none"
		}, styles[direction]), replaceStyles !== null && replaceStyles !== void 0 ? replaceStyles : {});
	}, [replaceStyles, direction]);
	return (0, import_jsx_runtime.jsx)("div", {
		className: className || void 0,
		style,
		onMouseDown,
		onTouchStart,
		children
	});
});
//#endregion
//#region node_modules/re-resizable/lib/index.js
var __extends$1 = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var __assign$1 = function() {
	__assign$1 = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign$1.apply(this, arguments);
};
var DEFAULT_SIZE = {
	width: "auto",
	height: "auto"
};
var clamp = function(n, min, max) {
	return Math.max(Math.min(n, max), min);
};
var snap = function(n, size, gridGap) {
	var v = Math.round(n / size);
	return v * size + gridGap * (v - 1);
};
var hasDirection = function(dir, target) {
	return new RegExp(dir, "i").test(target);
};
var isTouchEvent = function(event) {
	return Boolean(event.touches && event.touches.length);
};
var isMouseEvent = function(event) {
	return Boolean((event.clientX || event.clientX === 0) && (event.clientY || event.clientY === 0));
};
var findClosestSnap = function(n, snapArray, snapGap) {
	if (snapGap === void 0) snapGap = 0;
	var closestGapIndex = snapArray.reduce(function(prev, curr, index) {
		return Math.abs(curr - n) < Math.abs(snapArray[prev] - n) ? index : prev;
	}, 0);
	var gap = Math.abs(snapArray[closestGapIndex] - n);
	return snapGap === 0 || gap < snapGap ? snapArray[closestGapIndex] : n;
};
var getStringSize = function(n) {
	n = n.toString();
	if (n === "auto") return n;
	if (n.endsWith("px")) return n;
	if (n.endsWith("%")) return n;
	if (n.endsWith("vh")) return n;
	if (n.endsWith("vw")) return n;
	if (n.endsWith("vmax")) return n;
	if (n.endsWith("vmin")) return n;
	return "".concat(n, "px");
};
var getPixelSize = function(size, parentSize, innerWidth, innerHeight) {
	if (size && typeof size === "string") {
		if (size.endsWith("px")) return Number(size.replace("px", ""));
		if (size.endsWith("%")) {
			var ratio = Number(size.replace("%", "")) / 100;
			return parentSize * ratio;
		}
		if (size.endsWith("vw")) {
			var ratio = Number(size.replace("vw", "")) / 100;
			return innerWidth * ratio;
		}
		if (size.endsWith("vh")) {
			var ratio = Number(size.replace("vh", "")) / 100;
			return innerHeight * ratio;
		}
	}
	return size;
};
var calculateNewMax = function(parentSize, innerWidth, innerHeight, maxWidth, maxHeight, minWidth, minHeight) {
	maxWidth = getPixelSize(maxWidth, parentSize.width, innerWidth, innerHeight);
	maxHeight = getPixelSize(maxHeight, parentSize.height, innerWidth, innerHeight);
	minWidth = getPixelSize(minWidth, parentSize.width, innerWidth, innerHeight);
	minHeight = getPixelSize(minHeight, parentSize.height, innerWidth, innerHeight);
	return {
		maxWidth: typeof maxWidth === "undefined" ? void 0 : Number(maxWidth),
		maxHeight: typeof maxHeight === "undefined" ? void 0 : Number(maxHeight),
		minWidth: typeof minWidth === "undefined" ? void 0 : Number(minWidth),
		minHeight: typeof minHeight === "undefined" ? void 0 : Number(minHeight)
	};
};
/**
* transform T | [T, T] to [T, T]
* @param val
* @returns
*/
var normalizeToPair = function(val) {
	return Array.isArray(val) ? val : [val, val];
};
var definedProps = [
	"as",
	"ref",
	"style",
	"className",
	"grid",
	"gridGap",
	"snap",
	"bounds",
	"boundsByDirection",
	"size",
	"defaultSize",
	"minWidth",
	"minHeight",
	"maxWidth",
	"maxHeight",
	"lockAspectRatio",
	"lockAspectRatioExtraWidth",
	"lockAspectRatioExtraHeight",
	"enable",
	"handleStyles",
	"handleClasses",
	"handleWrapperStyle",
	"handleWrapperClass",
	"children",
	"onResizeStart",
	"onResize",
	"onResizeStop",
	"handleComponent",
	"scale",
	"resizeRatio",
	"snapGap"
];
var baseClassName = "__resizable_base__";
var Resizable = function(_super) {
	__extends$1(Resizable, _super);
	function Resizable(props) {
		var _a, _b, _c, _d;
		var _this = _super.call(this, props) || this;
		_this.ratio = 1;
		_this.resizable = null;
		_this.parentLeft = 0;
		_this.parentTop = 0;
		_this.resizableLeft = 0;
		_this.resizableRight = 0;
		_this.resizableTop = 0;
		_this.resizableBottom = 0;
		_this.targetLeft = 0;
		_this.targetTop = 0;
		_this.delta = {
			width: 0,
			height: 0
		};
		_this.appendBase = function() {
			if (!_this.resizable || !_this.window) return null;
			var parent = _this.parentNode;
			if (!parent) return null;
			var element = _this.window.document.createElement("div");
			element.style.width = "100%";
			element.style.height = "100%";
			element.style.position = "absolute";
			element.style.transform = "scale(0, 0)";
			element.style.left = "0";
			element.style.flex = "0 0 100%";
			if (element.classList) element.classList.add(baseClassName);
			else element.className += baseClassName;
			parent.appendChild(element);
			return element;
		};
		_this.removeBase = function(base) {
			var parent = _this.parentNode;
			if (!parent) return;
			parent.removeChild(base);
		};
		_this.state = {
			isResizing: false,
			width: (_b = (_a = _this.propsSize) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : "auto",
			height: (_d = (_c = _this.propsSize) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : "auto",
			direction: "right",
			original: {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			},
			backgroundStyle: {
				height: "100%",
				width: "100%",
				backgroundColor: "rgba(0,0,0,0)",
				cursor: "auto",
				opacity: 0,
				position: "fixed",
				zIndex: 9999,
				top: "0",
				left: "0",
				bottom: "0",
				right: "0"
			},
			flexBasis: void 0
		};
		_this.onResizeStart = _this.onResizeStart.bind(_this);
		_this.onMouseMove = _this.onMouseMove.bind(_this);
		_this.onMouseUp = _this.onMouseUp.bind(_this);
		return _this;
	}
	Object.defineProperty(Resizable.prototype, "parentNode", {
		get: function() {
			if (!this.resizable) return null;
			return this.resizable.parentNode;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Resizable.prototype, "window", {
		get: function() {
			if (!this.resizable) return null;
			if (!this.resizable.ownerDocument) return null;
			return this.resizable.ownerDocument.defaultView;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Resizable.prototype, "propsSize", {
		get: function() {
			return this.props.size || this.props.defaultSize || DEFAULT_SIZE;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Resizable.prototype, "size", {
		get: function() {
			var width = 0;
			var height = 0;
			if (this.resizable && this.window) {
				var orgWidth = this.resizable.offsetWidth;
				var orgHeight = this.resizable.offsetHeight;
				var orgPosition = this.resizable.style.position;
				if (orgPosition !== "relative") this.resizable.style.position = "relative";
				width = this.resizable.style.width !== "auto" ? this.resizable.offsetWidth : orgWidth;
				height = this.resizable.style.height !== "auto" ? this.resizable.offsetHeight : orgHeight;
				this.resizable.style.position = orgPosition;
			}
			return {
				width,
				height
			};
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Resizable.prototype, "sizeStyle", {
		get: function() {
			var _this = this;
			var size = this.props.size;
			var getSize = function(key) {
				var _a;
				if (typeof _this.state[key] === "undefined" || _this.state[key] === "auto") return "auto";
				if (_this.propsSize && _this.propsSize[key] && ((_a = _this.propsSize[key]) === null || _a === void 0 ? void 0 : _a.toString().endsWith("%"))) {
					if (_this.state[key].toString().endsWith("%")) return _this.state[key].toString();
					var parentSize = _this.getParentSize();
					var percent = Number(_this.state[key].toString().replace("px", "")) / parentSize[key] * 100;
					return "".concat(percent, "%");
				}
				return getStringSize(_this.state[key]);
			};
			return {
				width: size && typeof size.width !== "undefined" && !this.state.isResizing ? getStringSize(size.width) : getSize("width"),
				height: size && typeof size.height !== "undefined" && !this.state.isResizing ? getStringSize(size.height) : getSize("height")
			};
		},
		enumerable: false,
		configurable: true
	});
	Resizable.prototype.getParentSize = function() {
		if (!this.parentNode) {
			if (!this.window) return {
				width: 0,
				height: 0
			};
			return {
				width: this.window.innerWidth,
				height: this.window.innerHeight
			};
		}
		var base = this.appendBase();
		if (!base) return {
			width: 0,
			height: 0
		};
		var wrapChanged = false;
		var wrap = this.parentNode.style.flexWrap;
		if (wrap !== "wrap") {
			wrapChanged = true;
			this.parentNode.style.flexWrap = "wrap";
		}
		base.style.position = "relative";
		base.style.minWidth = "100%";
		base.style.minHeight = "100%";
		var size = {
			width: base.offsetWidth,
			height: base.offsetHeight
		};
		if (wrapChanged) this.parentNode.style.flexWrap = wrap;
		this.removeBase(base);
		return size;
	};
	Resizable.prototype.bindEvents = function() {
		if (this.window) {
			this.window.addEventListener("mouseup", this.onMouseUp);
			this.window.addEventListener("mousemove", this.onMouseMove);
			this.window.addEventListener("mouseleave", this.onMouseUp);
			this.window.addEventListener("touchmove", this.onMouseMove, {
				capture: true,
				passive: false
			});
			this.window.addEventListener("touchend", this.onMouseUp);
		}
	};
	Resizable.prototype.unbindEvents = function() {
		if (this.window) {
			this.window.removeEventListener("mouseup", this.onMouseUp);
			this.window.removeEventListener("mousemove", this.onMouseMove);
			this.window.removeEventListener("mouseleave", this.onMouseUp);
			this.window.removeEventListener("touchmove", this.onMouseMove, true);
			this.window.removeEventListener("touchend", this.onMouseUp);
		}
	};
	Resizable.prototype.componentDidMount = function() {
		if (!this.resizable || !this.window) return;
		var computedStyle = this.window.getComputedStyle(this.resizable);
		this.setState({
			width: this.state.width || this.size.width,
			height: this.state.height || this.size.height,
			flexBasis: computedStyle.flexBasis !== "auto" ? computedStyle.flexBasis : void 0
		});
	};
	Resizable.prototype.componentWillUnmount = function() {
		if (this.window) this.unbindEvents();
	};
	Resizable.prototype.createSizeForCssProperty = function(newSize, kind) {
		var propsSize = this.propsSize && this.propsSize[kind];
		return this.state[kind] === "auto" && this.state.original[kind] === newSize && (typeof propsSize === "undefined" || propsSize === "auto") ? "auto" : newSize;
	};
	Resizable.prototype.calculateNewMaxFromBoundary = function(maxWidth, maxHeight) {
		var boundsByDirection = this.props.boundsByDirection;
		var direction = this.state.direction;
		var widthByDirection = boundsByDirection && hasDirection("left", direction);
		var heightByDirection = boundsByDirection && hasDirection("top", direction);
		var boundWidth;
		var boundHeight;
		if (this.props.bounds === "parent") {
			var parent_1 = this.parentNode;
			if (parent_1) {
				boundWidth = widthByDirection ? this.resizableRight - this.parentLeft : parent_1.offsetWidth + (this.parentLeft - this.resizableLeft);
				boundHeight = heightByDirection ? this.resizableBottom - this.parentTop : parent_1.offsetHeight + (this.parentTop - this.resizableTop);
			}
		} else if (this.props.bounds === "window") {
			if (this.window) {
				boundWidth = widthByDirection ? this.resizableRight : this.window.innerWidth - this.resizableLeft;
				boundHeight = heightByDirection ? this.resizableBottom : this.window.innerHeight - this.resizableTop;
			}
		} else if (this.props.bounds) {
			boundWidth = widthByDirection ? this.resizableRight - this.targetLeft : this.props.bounds.offsetWidth + (this.targetLeft - this.resizableLeft);
			boundHeight = heightByDirection ? this.resizableBottom - this.targetTop : this.props.bounds.offsetHeight + (this.targetTop - this.resizableTop);
		}
		if (boundWidth && Number.isFinite(boundWidth)) maxWidth = maxWidth && maxWidth < boundWidth ? maxWidth : boundWidth;
		if (boundHeight && Number.isFinite(boundHeight)) maxHeight = maxHeight && maxHeight < boundHeight ? maxHeight : boundHeight;
		return {
			maxWidth,
			maxHeight
		};
	};
	Resizable.prototype.calculateNewSizeFromDirection = function(clientX, clientY) {
		var scale = this.props.scale || 1;
		var _a = normalizeToPair(this.props.resizeRatio || 1), resizeRatioX = _a[0], resizeRatioY = _a[1];
		var _b = this.state, direction = _b.direction, original = _b.original;
		var _c = this.props, lockAspectRatio = _c.lockAspectRatio, lockAspectRatioExtraHeight = _c.lockAspectRatioExtraHeight, lockAspectRatioExtraWidth = _c.lockAspectRatioExtraWidth;
		var newWidth = original.width;
		var newHeight = original.height;
		var extraHeight = lockAspectRatioExtraHeight || 0;
		var extraWidth = lockAspectRatioExtraWidth || 0;
		if (hasDirection("right", direction)) {
			newWidth = original.width + (clientX - original.x) * resizeRatioX / scale;
			if (lockAspectRatio) newHeight = (newWidth - extraWidth) / this.ratio + extraHeight;
		}
		if (hasDirection("left", direction)) {
			newWidth = original.width - (clientX - original.x) * resizeRatioX / scale;
			if (lockAspectRatio) newHeight = (newWidth - extraWidth) / this.ratio + extraHeight;
		}
		if (hasDirection("bottom", direction)) {
			newHeight = original.height + (clientY - original.y) * resizeRatioY / scale;
			if (lockAspectRatio) newWidth = (newHeight - extraHeight) * this.ratio + extraWidth;
		}
		if (hasDirection("top", direction)) {
			newHeight = original.height - (clientY - original.y) * resizeRatioY / scale;
			if (lockAspectRatio) newWidth = (newHeight - extraHeight) * this.ratio + extraWidth;
		}
		return {
			newWidth,
			newHeight
		};
	};
	Resizable.prototype.calculateNewSizeFromAspectRatio = function(newWidth, newHeight, max, min) {
		var _a = this.props, lockAspectRatio = _a.lockAspectRatio, lockAspectRatioExtraHeight = _a.lockAspectRatioExtraHeight, lockAspectRatioExtraWidth = _a.lockAspectRatioExtraWidth;
		var computedMinWidth = typeof min.width === "undefined" ? 10 : min.width;
		var computedMaxWidth = typeof max.width === "undefined" || max.width < 0 ? newWidth : max.width;
		var computedMinHeight = typeof min.height === "undefined" ? 10 : min.height;
		var computedMaxHeight = typeof max.height === "undefined" || max.height < 0 ? newHeight : max.height;
		var extraHeight = lockAspectRatioExtraHeight || 0;
		var extraWidth = lockAspectRatioExtraWidth || 0;
		if (lockAspectRatio) {
			var extraMinWidth = (computedMinHeight - extraHeight) * this.ratio + extraWidth;
			var extraMaxWidth = (computedMaxHeight - extraHeight) * this.ratio + extraWidth;
			var extraMinHeight = (computedMinWidth - extraWidth) / this.ratio + extraHeight;
			var extraMaxHeight = (computedMaxWidth - extraWidth) / this.ratio + extraHeight;
			var lockedMinWidth = Math.max(computedMinWidth, extraMinWidth);
			var lockedMaxWidth = Math.min(computedMaxWidth, extraMaxWidth);
			var lockedMinHeight = Math.max(computedMinHeight, extraMinHeight);
			var lockedMaxHeight = Math.min(computedMaxHeight, extraMaxHeight);
			newWidth = clamp(newWidth, lockedMinWidth, lockedMaxWidth);
			newHeight = clamp(newHeight, lockedMinHeight, lockedMaxHeight);
		} else {
			newWidth = clamp(newWidth, computedMinWidth, computedMaxWidth);
			newHeight = clamp(newHeight, computedMinHeight, computedMaxHeight);
		}
		return {
			newWidth,
			newHeight
		};
	};
	Resizable.prototype.setBoundingClientRect = function() {
		var adjustedScale = 1 / (this.props.scale || 1);
		if (this.props.bounds === "parent") {
			var parent_2 = this.parentNode;
			if (parent_2) {
				var parentRect = parent_2.getBoundingClientRect();
				this.parentLeft = parentRect.left * adjustedScale;
				this.parentTop = parentRect.top * adjustedScale;
			}
		}
		if (this.props.bounds && typeof this.props.bounds !== "string") {
			var targetRect = this.props.bounds.getBoundingClientRect();
			this.targetLeft = targetRect.left * adjustedScale;
			this.targetTop = targetRect.top * adjustedScale;
		}
		if (this.resizable) {
			var _a = this.resizable.getBoundingClientRect(), left = _a.left, top_1 = _a.top, right = _a.right, bottom = _a.bottom;
			this.resizableLeft = left * adjustedScale;
			this.resizableRight = right * adjustedScale;
			this.resizableTop = top_1 * adjustedScale;
			this.resizableBottom = bottom * adjustedScale;
		}
	};
	Resizable.prototype.onResizeStart = function(event, direction) {
		if (!this.resizable || !this.window) return;
		var clientX = 0;
		var clientY = 0;
		if (event.nativeEvent && isMouseEvent(event.nativeEvent)) {
			clientX = event.nativeEvent.clientX;
			clientY = event.nativeEvent.clientY;
		} else if (event.nativeEvent && isTouchEvent(event.nativeEvent)) {
			clientX = event.nativeEvent.touches[0].clientX;
			clientY = event.nativeEvent.touches[0].clientY;
		}
		if (this.props.onResizeStart) {
			if (this.resizable) {
				if (this.props.onResizeStart(event, direction, this.resizable) === false) return;
			}
		}
		if (this.props.size) {
			if (typeof this.props.size.height !== "undefined" && this.props.size.height !== this.state.height) this.setState({ height: this.props.size.height });
			if (typeof this.props.size.width !== "undefined" && this.props.size.width !== this.state.width) this.setState({ width: this.props.size.width });
		}
		this.ratio = typeof this.props.lockAspectRatio === "number" ? this.props.lockAspectRatio : this.size.width / this.size.height;
		var flexBasis;
		var computedStyle = this.window.getComputedStyle(this.resizable);
		if (computedStyle.flexBasis !== "auto") {
			var parent_3 = this.parentNode;
			if (parent_3) {
				var dir = this.window.getComputedStyle(parent_3).flexDirection;
				this.flexDir = dir.startsWith("row") ? "row" : "column";
				flexBasis = computedStyle.flexBasis;
			}
		}
		this.setBoundingClientRect();
		this.bindEvents();
		var state = {
			original: {
				x: clientX,
				y: clientY,
				width: this.size.width,
				height: this.size.height
			},
			isResizing: true,
			backgroundStyle: __assign$1(__assign$1({}, this.state.backgroundStyle), { cursor: this.window.getComputedStyle(event.target).cursor || "auto" }),
			direction,
			flexBasis
		};
		this.setState(state);
	};
	Resizable.prototype.onMouseMove = function(event) {
		var _this = this;
		if (!this.state.isResizing || !this.resizable || !this.window) return;
		if (this.window.TouchEvent && isTouchEvent(event)) try {
			event.preventDefault();
			event.stopPropagation();
		} catch (e) {}
		var _a = this.props, maxWidth = _a.maxWidth, maxHeight = _a.maxHeight, minWidth = _a.minWidth, minHeight = _a.minHeight;
		var clientX = isTouchEvent(event) ? event.touches[0].clientX : event.clientX;
		var clientY = isTouchEvent(event) ? event.touches[0].clientY : event.clientY;
		var _b = this.state, direction = _b.direction, original = _b.original, width = _b.width, height = _b.height;
		var parentSize = this.getParentSize();
		var max = calculateNewMax(parentSize, this.window.innerWidth, this.window.innerHeight, maxWidth, maxHeight, minWidth, minHeight);
		maxWidth = max.maxWidth;
		maxHeight = max.maxHeight;
		minWidth = max.minWidth;
		minHeight = max.minHeight;
		var _c = this.calculateNewSizeFromDirection(clientX, clientY), newHeight = _c.newHeight, newWidth = _c.newWidth;
		var boundaryMax = this.calculateNewMaxFromBoundary(maxWidth, maxHeight);
		if (this.props.snap && this.props.snap.x) newWidth = findClosestSnap(newWidth, this.props.snap.x, this.props.snapGap);
		if (this.props.snap && this.props.snap.y) newHeight = findClosestSnap(newHeight, this.props.snap.y, this.props.snapGap);
		var newSize = this.calculateNewSizeFromAspectRatio(newWidth, newHeight, {
			width: boundaryMax.maxWidth,
			height: boundaryMax.maxHeight
		}, {
			width: minWidth,
			height: minHeight
		});
		newWidth = newSize.newWidth;
		newHeight = newSize.newHeight;
		if (this.props.grid) {
			var newGridWidth = snap(newWidth, this.props.grid[0], this.props.gridGap ? this.props.gridGap[0] : 0);
			var newGridHeight = snap(newHeight, this.props.grid[1], this.props.gridGap ? this.props.gridGap[1] : 0);
			var gap = this.props.snapGap || 0;
			var w = gap === 0 || Math.abs(newGridWidth - newWidth) <= gap ? newGridWidth : newWidth;
			var h = gap === 0 || Math.abs(newGridHeight - newHeight) <= gap ? newGridHeight : newHeight;
			newWidth = w;
			newHeight = h;
		}
		var delta = {
			width: newWidth - original.width,
			height: newHeight - original.height
		};
		this.delta = delta;
		if (width && typeof width === "string") {
			if (width.endsWith("%")) {
				var percent = newWidth / parentSize.width * 100;
				newWidth = "".concat(percent, "%");
			} else if (width.endsWith("vw")) {
				var vw = newWidth / this.window.innerWidth * 100;
				newWidth = "".concat(vw, "vw");
			} else if (width.endsWith("vh")) {
				var vh = newWidth / this.window.innerHeight * 100;
				newWidth = "".concat(vh, "vh");
			}
		}
		if (height && typeof height === "string") {
			if (height.endsWith("%")) {
				var percent = newHeight / parentSize.height * 100;
				newHeight = "".concat(percent, "%");
			} else if (height.endsWith("vw")) {
				var vw = newHeight / this.window.innerWidth * 100;
				newHeight = "".concat(vw, "vw");
			} else if (height.endsWith("vh")) {
				var vh = newHeight / this.window.innerHeight * 100;
				newHeight = "".concat(vh, "vh");
			}
		}
		var newState = {
			width: this.createSizeForCssProperty(newWidth, "width"),
			height: this.createSizeForCssProperty(newHeight, "height")
		};
		if (this.flexDir === "row") newState.flexBasis = newState.width;
		else if (this.flexDir === "column") newState.flexBasis = newState.height;
		var widthChanged = this.state.width !== newState.width;
		var heightChanged = this.state.height !== newState.height;
		var flexBaseChanged = this.state.flexBasis !== newState.flexBasis;
		var changed = widthChanged || heightChanged || flexBaseChanged;
		if (changed) (0, import_react_dom.flushSync)(function() {
			_this.setState(newState);
		});
		if (this.props.onResize) {
			if (changed) this.props.onResize(event, direction, this.resizable, delta);
		}
	};
	Resizable.prototype.onMouseUp = function(event) {
		var _a, _b, _c = this.state, isResizing = _c.isResizing, direction = _c.direction;
		_c.original;
		if (!isResizing || !this.resizable) return;
		if (this.props.onResizeStop) this.props.onResizeStop(event, direction, this.resizable, this.delta);
		if (this.props.size) this.setState({
			width: (_a = this.props.size.width) !== null && _a !== void 0 ? _a : "auto",
			height: (_b = this.props.size.height) !== null && _b !== void 0 ? _b : "auto"
		});
		this.unbindEvents();
		this.setState({
			isResizing: false,
			backgroundStyle: __assign$1(__assign$1({}, this.state.backgroundStyle), { cursor: "auto" })
		});
	};
	Resizable.prototype.updateSize = function(size) {
		var _a, _b;
		this.setState({
			width: (_a = size.width) !== null && _a !== void 0 ? _a : "auto",
			height: (_b = size.height) !== null && _b !== void 0 ? _b : "auto"
		});
	};
	Resizable.prototype.renderResizer = function() {
		var _this = this;
		var _a = this.props, enable = _a.enable, handleStyles = _a.handleStyles, handleClasses = _a.handleClasses, handleWrapperStyle = _a.handleWrapperStyle, handleWrapperClass = _a.handleWrapperClass, handleComponent = _a.handleComponent;
		if (!enable) return null;
		return (0, import_jsx_runtime.jsx)("div", {
			className: handleWrapperClass,
			style: handleWrapperStyle,
			children: Object.keys(enable).map(function(dir) {
				if (enable[dir] !== false) return (0, import_jsx_runtime.jsx)(Resizer, {
					direction: dir,
					onResizeStart: _this.onResizeStart,
					replaceStyles: handleStyles && handleStyles[dir],
					className: handleClasses && handleClasses[dir],
					children: handleComponent && handleComponent[dir] ? handleComponent[dir] : null
				}, dir);
				return null;
			})
		});
	};
	Resizable.prototype.render = function() {
		var _this = this;
		var extendsProps = Object.keys(this.props).reduce(function(acc, key) {
			if (definedProps.indexOf(key) !== -1) return acc;
			acc[key] = _this.props[key];
			return acc;
		}, {});
		var style = __assign$1(__assign$1(__assign$1({
			position: "relative",
			userSelect: this.state.isResizing ? "none" : "auto"
		}, this.props.style), this.sizeStyle), {
			maxWidth: this.props.maxWidth,
			maxHeight: this.props.maxHeight,
			minWidth: this.props.minWidth,
			minHeight: this.props.minHeight,
			boxSizing: "border-box",
			flexShrink: 0
		});
		if (this.state.flexBasis) style.flexBasis = this.state.flexBasis;
		return (0, import_jsx_runtime.jsxs)(this.props.as || "div", __assign$1({
			style,
			className: this.props.className
		}, extendsProps, {
			ref: function(c) {
				if (c) _this.resizable = c;
			},
			children: [
				this.state.isResizing && (0, import_jsx_runtime.jsx)("div", { style: this.state.backgroundStyle }),
				this.props.children,
				this.renderResizer()
			]
		}));
	};
	Resizable.defaultProps = {
		as: "div",
		onResizeStart: function() {},
		onResize: function() {},
		onResizeStop: function() {},
		enable: {
			top: true,
			right: true,
			bottom: true,
			left: true,
			topRight: true,
			bottomRight: true,
			bottomLeft: true,
			topLeft: true
		},
		style: {},
		grid: [1, 1],
		gridGap: [0, 0],
		lockAspectRatio: false,
		lockAspectRatioExtraWidth: 0,
		lockAspectRatioExtraHeight: 0,
		scale: 1,
		resizeRatio: 1,
		snapGap: 0
	};
	return Resizable;
}(import_react.PureComponent);
//#endregion
//#region node_modules/react-rnd/lib/index.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var extendStatics = function(d, b) {
	extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
		d.__proto__ = b;
	} || function(d, b) {
		for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	};
	return extendStatics(d, b);
};
function __extends(d, b) {
	extendStatics(d, b);
	function __() {
		this.constructor = d;
	}
	d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
	__assign = Object.assign || function __assign(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
function __rest(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
}
var resizableStyle = {
	width: "auto",
	height: "auto",
	display: "inline-block",
	position: "absolute",
	top: 0,
	left: 0
};
var getEnableResizingByFlag = function(flag) {
	return {
		bottom: flag,
		bottomLeft: flag,
		bottomRight: flag,
		left: flag,
		right: flag,
		top: flag,
		topLeft: flag,
		topRight: flag
	};
};
var Rnd = function(_super) {
	__extends(Rnd, _super);
	function Rnd(props) {
		var _this = _super.call(this, props) || this;
		_this.resizingPosition = {
			x: 0,
			y: 0
		};
		_this.offsetFromParent = {
			left: 0,
			top: 0
		};
		_this.resizableElement = { current: null };
		_this.originalPosition = {
			x: 0,
			y: 0
		};
		_this.state = {
			resizing: false,
			bounds: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},
			maxWidth: props.maxWidth,
			maxHeight: props.maxHeight
		};
		_this.onResizeStart = _this.onResizeStart.bind(_this);
		_this.onResize = _this.onResize.bind(_this);
		_this.onResizeStop = _this.onResizeStop.bind(_this);
		_this.onDragStart = _this.onDragStart.bind(_this);
		_this.onDrag = _this.onDrag.bind(_this);
		_this.onDragStop = _this.onDragStop.bind(_this);
		_this.getMaxSizesFromProps = _this.getMaxSizesFromProps.bind(_this);
		return _this;
	}
	Rnd.prototype.componentDidMount = function() {
		this.updateOffsetFromParent();
		var _a = this.offsetFromParent, left = _a.left, top = _a.top;
		var _b = this.getDraggablePosition(), x = _b.x, y = _b.y;
		this.draggable.setState({
			x: x - left,
			y: y - top
		});
		this.forceUpdate();
	};
	Rnd.prototype.getDraggablePosition = function() {
		var _a = this.draggable.state;
		return {
			x: _a.x,
			y: _a.y
		};
	};
	Rnd.prototype.getParent = function() {
		return this.resizable && this.resizable.parentNode;
	};
	Rnd.prototype.getParentSize = function() {
		return this.resizable.getParentSize();
	};
	Rnd.prototype.getMaxSizesFromProps = function() {
		return {
			maxWidth: typeof this.props.maxWidth === "undefined" ? Number.MAX_SAFE_INTEGER : this.props.maxWidth,
			maxHeight: typeof this.props.maxHeight === "undefined" ? Number.MAX_SAFE_INTEGER : this.props.maxHeight
		};
	};
	Rnd.prototype.getSelfElement = function() {
		return this.resizable && this.resizable.resizable;
	};
	Rnd.prototype.getOffsetHeight = function(boundary) {
		var scale = this.props.scale;
		switch (this.props.bounds) {
			case "window": return window.innerHeight / scale;
			case "body": return document.body.offsetHeight / scale;
			default: return boundary.offsetHeight;
		}
	};
	Rnd.prototype.getOffsetWidth = function(boundary) {
		var scale = this.props.scale;
		switch (this.props.bounds) {
			case "window": return window.innerWidth / scale;
			case "body": return document.body.offsetWidth / scale;
			default: return boundary.offsetWidth;
		}
	};
	Rnd.prototype.onDragStart = function(e, data) {
		if (this.props.onDragStart) this.props.onDragStart(e, data);
		var pos = this.getDraggablePosition();
		this.originalPosition = pos;
		if (!this.props.bounds) return;
		var parent = this.getParent();
		var scale = this.props.scale;
		var boundary;
		if (this.props.bounds === "parent") boundary = parent;
		else if (this.props.bounds === "body") {
			var parentRect_1 = parent.getBoundingClientRect();
			var parentLeft_1 = parentRect_1.left;
			var parentTop_1 = parentRect_1.top;
			var bodyRect = document.body.getBoundingClientRect();
			var left_1 = -(parentLeft_1 - parent.offsetLeft * scale - bodyRect.left) / scale;
			var top_1 = -(parentTop_1 - parent.offsetTop * scale - bodyRect.top) / scale;
			var right = (document.body.offsetWidth - this.resizable.size.width * scale) / scale + left_1;
			var bottom = (document.body.offsetHeight - this.resizable.size.height * scale) / scale + top_1;
			return this.setState({ bounds: {
				top: top_1,
				right,
				bottom,
				left: left_1
			} });
		} else if (this.props.bounds === "window") {
			if (!this.resizable) return;
			var parentRect_2 = parent.getBoundingClientRect();
			var parentLeft_2 = parentRect_2.left;
			var parentTop_2 = parentRect_2.top;
			var left_2 = -(parentLeft_2 - parent.offsetLeft * scale) / scale;
			var top_2 = -(parentTop_2 - parent.offsetTop * scale) / scale;
			var right = (window.innerWidth - this.resizable.size.width * scale) / scale + left_2;
			var bottom = (window.innerHeight - this.resizable.size.height * scale) / scale + top_2;
			return this.setState({ bounds: {
				top: top_2,
				right,
				bottom,
				left: left_2
			} });
		} else if (typeof this.props.bounds === "string") boundary = document.querySelector(this.props.bounds);
		else if (this.props.bounds instanceof HTMLElement) boundary = this.props.bounds;
		if (!(boundary instanceof HTMLElement) || !(parent instanceof HTMLElement)) return;
		var boundaryRect = boundary.getBoundingClientRect();
		var boundaryLeft = boundaryRect.left;
		var boundaryTop = boundaryRect.top;
		var parentRect = parent.getBoundingClientRect();
		var parentLeft = parentRect.left;
		var parentTop = parentRect.top;
		var left = (boundaryLeft - parentLeft) / scale;
		var top = boundaryTop - parentTop;
		if (!this.resizable) return;
		this.updateOffsetFromParent();
		var offset = this.offsetFromParent;
		this.setState({ bounds: {
			top: top - offset.top,
			right: left + (boundary.offsetWidth - this.resizable.size.width) - offset.left / scale,
			bottom: top + (boundary.offsetHeight - this.resizable.size.height) - offset.top,
			left: left - offset.left / scale
		} });
	};
	Rnd.prototype.onDrag = function(e, data) {
		if (!this.props.onDrag) return;
		var _a = this.offsetFromParent, left = _a.left, top = _a.top;
		if (!this.props.dragAxis || this.props.dragAxis === "both") return this.props.onDrag(e, __assign(__assign({}, data), {
			x: data.x + left,
			y: data.y + top
		}));
		else if (this.props.dragAxis === "x") return this.props.onDrag(e, __assign(__assign({}, data), {
			x: data.x + left,
			y: this.originalPosition.y + top,
			deltaY: 0
		}));
		else if (this.props.dragAxis === "y") return this.props.onDrag(e, __assign(__assign({}, data), {
			x: this.originalPosition.x + left,
			y: data.y + top,
			deltaX: 0
		}));
	};
	Rnd.prototype.onDragStop = function(e, data) {
		if (!this.props.onDragStop) return;
		var _a = this.offsetFromParent, left = _a.left, top = _a.top;
		if (!this.props.dragAxis || this.props.dragAxis === "both") return this.props.onDragStop(e, __assign(__assign({}, data), {
			x: data.x + left,
			y: data.y + top
		}));
		else if (this.props.dragAxis === "x") return this.props.onDragStop(e, __assign(__assign({}, data), {
			x: data.x + left,
			y: this.originalPosition.y + top,
			deltaY: 0
		}));
		else if (this.props.dragAxis === "y") return this.props.onDragStop(e, __assign(__assign({}, data), {
			x: this.originalPosition.x + left,
			y: data.y + top,
			deltaX: 0
		}));
	};
	Rnd.prototype.onResizeStart = function(e, dir, elementRef) {
		e.stopPropagation();
		this.setState({ resizing: true });
		var scale = this.props.scale;
		var offset = this.offsetFromParent;
		var pos = this.getDraggablePosition();
		this.resizingPosition = {
			x: pos.x + offset.left,
			y: pos.y + offset.top
		};
		this.originalPosition = pos;
		if (this.props.bounds) {
			var parent_1 = this.getParent();
			var boundary = void 0;
			if (this.props.bounds === "parent") boundary = parent_1;
			else if (this.props.bounds === "body") boundary = document.body;
			else if (this.props.bounds === "window") boundary = window;
			else if (typeof this.props.bounds === "string") boundary = document.querySelector(this.props.bounds);
			else if (this.props.bounds instanceof HTMLElement) boundary = this.props.bounds;
			var self_1 = this.getSelfElement();
			if (self_1 instanceof Element && (boundary instanceof HTMLElement || boundary === window) && parent_1 instanceof HTMLElement) {
				var _a = this.getMaxSizesFromProps(), maxWidth = _a.maxWidth, maxHeight = _a.maxHeight;
				var parentSize = this.getParentSize();
				if (maxWidth && typeof maxWidth === "string") {
					if (maxWidth.endsWith("%")) {
						var ratio = Number(maxWidth.replace("%", "")) / 100;
						maxWidth = parentSize.width * ratio;
					} else if (maxWidth.endsWith("px")) maxWidth = Number(maxWidth.replace("px", ""));
				}
				if (maxHeight && typeof maxHeight === "string") {
					if (maxHeight.endsWith("%")) {
						var ratio = Number(maxHeight.replace("%", "")) / 100;
						maxHeight = parentSize.height * ratio;
					} else if (maxHeight.endsWith("px")) maxHeight = Number(maxHeight.replace("px", ""));
				}
				var selfRect = self_1.getBoundingClientRect();
				var selfLeft = selfRect.left;
				var selfTop = selfRect.top;
				var boundaryRect = this.props.bounds === "window" ? {
					left: 0,
					top: 0
				} : boundary.getBoundingClientRect();
				var boundaryLeft = boundaryRect.left;
				var boundaryTop = boundaryRect.top;
				var offsetWidth = this.getOffsetWidth(boundary);
				var offsetHeight = this.getOffsetHeight(boundary);
				var hasLeft = dir.toLowerCase().endsWith("left");
				var hasRight = dir.toLowerCase().endsWith("right");
				var hasTop = dir.startsWith("top");
				var hasBottom = dir.startsWith("bottom");
				if ((hasLeft || hasTop) && this.resizable) {
					var max = (selfLeft - boundaryLeft) / scale + this.resizable.size.width;
					this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
				}
				if (hasRight || this.props.lockAspectRatio && !hasLeft && !hasTop) {
					var max = offsetWidth + (boundaryLeft - selfLeft) / scale;
					this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
				}
				if ((hasTop || hasLeft) && this.resizable) {
					var max = (selfTop - boundaryTop) / scale + this.resizable.size.height;
					this.setState({ maxHeight: max > Number(maxHeight) ? maxHeight : max });
				}
				if (hasBottom || this.props.lockAspectRatio && !hasTop && !hasLeft) {
					var max = offsetHeight + (boundaryTop - selfTop) / scale;
					this.setState({ maxHeight: max > Number(maxHeight) ? maxHeight : max });
				}
			}
		} else this.setState({
			maxWidth: this.props.maxWidth,
			maxHeight: this.props.maxHeight
		});
		if (this.props.onResizeStart) this.props.onResizeStart(e, dir, elementRef);
	};
	Rnd.prototype.onResize = function(e, direction, elementRef, delta) {
		var _this = this;
		var newPos = {
			x: this.originalPosition.x,
			y: this.originalPosition.y
		};
		var left = -delta.width;
		var top = -delta.height;
		if ([
			"top",
			"left",
			"topLeft",
			"bottomLeft",
			"topRight"
		].includes(direction)) if (direction === "bottomLeft") newPos.x += left;
		else if (direction === "topRight") newPos.y += top;
		else {
			newPos.x += left;
			newPos.y += top;
		}
		var draggableState = this.draggable.state;
		if (newPos.x !== draggableState.x || newPos.y !== draggableState.y) (0, import_react_dom.flushSync)(function() {
			_this.draggable.setState(newPos);
		});
		this.updateOffsetFromParent();
		var offset = this.offsetFromParent;
		var x = this.getDraggablePosition().x + offset.left;
		var y = this.getDraggablePosition().y + offset.top;
		this.resizingPosition = {
			x,
			y
		};
		if (!this.props.onResize) return;
		this.props.onResize(e, direction, elementRef, delta, {
			x,
			y
		});
	};
	Rnd.prototype.onResizeStop = function(e, direction, elementRef, delta) {
		this.setState({ resizing: false });
		var _a = this.getMaxSizesFromProps(), maxWidth = _a.maxWidth, maxHeight = _a.maxHeight;
		this.setState({
			maxWidth,
			maxHeight
		});
		if (this.props.onResizeStop) this.props.onResizeStop(e, direction, elementRef, delta, this.resizingPosition);
	};
	Rnd.prototype.updateSize = function(size) {
		if (!this.resizable) return;
		this.resizable.updateSize({
			width: size.width,
			height: size.height
		});
	};
	Rnd.prototype.updatePosition = function(position) {
		this.draggable.setState(position);
	};
	Rnd.prototype.updateOffsetFromParent = function() {
		var scale = this.props.scale;
		var parent = this.getParent();
		var self = this.getSelfElement();
		if (!parent || self === null) return {
			top: 0,
			left: 0
		};
		var parentRect = parent.getBoundingClientRect();
		var parentLeft = parentRect.left;
		var parentTop = parentRect.top;
		var selfRect = self.getBoundingClientRect();
		var position = this.getDraggablePosition();
		var scrollLeft = parent.scrollLeft;
		var scrollTop = parent.scrollTop;
		this.offsetFromParent = {
			left: selfRect.left - parentLeft + scrollLeft - position.x * scale,
			top: selfRect.top - parentTop + scrollTop - position.y * scale
		};
	};
	Rnd.prototype.render = function() {
		var _this = this, _a = this.props, disableDragging = _a.disableDragging, style = _a.style, dragHandleClassName = _a.dragHandleClassName, position = _a.position, onMouseDown = _a.onMouseDown, onMouseUp = _a.onMouseUp, dragAxis = _a.dragAxis, dragGrid = _a.dragGrid, bounds = _a.bounds, enableUserSelectHack = _a.enableUserSelectHack, cancel = _a.cancel, children = _a.children;
		_a.onResizeStart;
		_a.onResize;
		_a.onResizeStop;
		_a.onDragStart;
		_a.onDrag;
		_a.onDragStop;
		var resizeHandleStyles = _a.resizeHandleStyles, resizeHandleClasses = _a.resizeHandleClasses, resizeHandleComponent = _a.resizeHandleComponent, enableResizing = _a.enableResizing, resizeGrid = _a.resizeGrid, resizeHandleWrapperClass = _a.resizeHandleWrapperClass, resizeHandleWrapperStyle = _a.resizeHandleWrapperStyle, scale = _a.scale, allowAnyClick = _a.allowAnyClick, dragPositionOffset = _a.dragPositionOffset, resizableProps = __rest(_a, [
			"disableDragging",
			"style",
			"dragHandleClassName",
			"position",
			"onMouseDown",
			"onMouseUp",
			"dragAxis",
			"dragGrid",
			"bounds",
			"enableUserSelectHack",
			"cancel",
			"children",
			"onResizeStart",
			"onResize",
			"onResizeStop",
			"onDragStart",
			"onDrag",
			"onDragStop",
			"resizeHandleStyles",
			"resizeHandleClasses",
			"resizeHandleComponent",
			"enableResizing",
			"resizeGrid",
			"resizeHandleWrapperClass",
			"resizeHandleWrapperStyle",
			"scale",
			"allowAnyClick",
			"dragPositionOffset"
		]);
		var defaultValue = this.props.default ? __assign({}, this.props.default) : void 0;
		delete resizableProps.default;
		var cursorStyle = disableDragging || dragHandleClassName ? { cursor: "auto" } : { cursor: "move" };
		var innerStyle = __assign(__assign(__assign({}, resizableStyle), cursorStyle), style);
		var _b = this.offsetFromParent, left = _b.left, top = _b.top;
		var draggablePosition;
		if (position) draggablePosition = {
			x: position.x - left,
			y: position.y - top
		};
		var pos = this.state.resizing ? void 0 : draggablePosition;
		var dragAxisOrUndefined = this.state.resizing ? "both" : dragAxis;
		return (0, import_react.createElement)(import_cjs.default, {
			ref: function(c) {
				if (!c) return;
				_this.draggable = c;
			},
			handle: dragHandleClassName ? ".".concat(dragHandleClassName) : void 0,
			defaultPosition: defaultValue,
			onMouseDown,
			onMouseUp,
			onStart: this.onDragStart,
			onDrag: this.onDrag,
			onStop: this.onDragStop,
			axis: dragAxisOrUndefined,
			disabled: disableDragging,
			grid: dragGrid,
			bounds: bounds ? this.state.bounds : void 0,
			position: pos,
			enableUserSelectHack,
			cancel,
			scale,
			allowAnyClick,
			nodeRef: this.resizableElement,
			positionOffset: dragPositionOffset
		}, (0, import_react.createElement)(Resizable, __assign({}, resizableProps, {
			ref: function(c) {
				if (!c) return;
				_this.resizable = c;
				_this.resizableElement.current = c.resizable;
			},
			defaultSize: defaultValue,
			size: this.props.size,
			enable: typeof enableResizing === "boolean" ? getEnableResizingByFlag(enableResizing) : enableResizing,
			onResizeStart: this.onResizeStart,
			onResize: this.onResize,
			onResizeStop: this.onResizeStop,
			style: innerStyle,
			minWidth: this.props.minWidth,
			minHeight: this.props.minHeight,
			maxWidth: this.state.resizing ? this.state.maxWidth : this.props.maxWidth,
			maxHeight: this.state.resizing ? this.state.maxHeight : this.props.maxHeight,
			grid: resizeGrid,
			handleWrapperClass: resizeHandleWrapperClass,
			handleWrapperStyle: resizeHandleWrapperStyle,
			lockAspectRatio: this.props.lockAspectRatio,
			lockAspectRatioExtraWidth: this.props.lockAspectRatioExtraWidth,
			lockAspectRatioExtraHeight: this.props.lockAspectRatioExtraHeight,
			handleStyles: resizeHandleStyles,
			handleClasses: resizeHandleClasses,
			handleComponent: resizeHandleComponent,
			scale: this.props.scale
		}), children));
	};
	Rnd.defaultProps = {
		maxWidth: Number.MAX_SAFE_INTEGER,
		maxHeight: Number.MAX_SAFE_INTEGER,
		scale: 1,
		onResizeStart: function() {},
		onResize: function() {},
		onResizeStop: function() {},
		onDragStart: function() {},
		onDrag: function() {},
		onDragStop: function() {}
	};
	return Rnd;
}(import_react.PureComponent);
//#endregion
//#region node_modules/papaparse/papaparse.min.js
var require_papaparse_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/* @license
	Papa Parse
	v5.5.3
	https://github.com/mholt/PapaParse
	License: MIT
	*/
	((e, t) => {
		"function" == typeof define && define.amd ? define([], t) : "object" == typeof module && "undefined" != typeof exports ? module.exports = t() : e.Papa = t();
	})(exports, function r() {
		var n = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {};
		var d, s = !n.document && !!n.postMessage, a = n.IS_PAPA_WORKER || !1, o = {}, h = 0, v = {};
		function u(e) {
			this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = {
				data: [],
				errors: [],
				meta: {}
			}, function(e) {
				var t = b(e);
				t.chunkSize = parseInt(t.chunkSize), e.step || e.chunk || (t.chunkSize = null);
				this._handle = new i(t), (this._handle.streamer = this)._config = t;
			}.call(this, e), this.parseChunk = function(t, e) {
				var i = parseInt(this._config.skipFirstNLines) || 0;
				if (this.isFirstChunk && 0 < i) {
					let e = this._config.newline;
					e || (r = this._config.quoteChar || "\"", e = this._handle.guessLineEndings(t, r)), t = [...t.split(e).slice(i)].join(e);
				}
				this.isFirstChunk && U(this._config.beforeFirstChunk) && void 0 !== (r = this._config.beforeFirstChunk(t)) && (t = r), this.isFirstChunk = !1, this._halted = !1;
				var i = this._partialLine + t, r = (this._partialLine = "", this._handle.parse(i, this._baseIndex, !this._finished));
				if (!this._handle.paused() && !this._handle.aborted()) {
					t = r.meta.cursor, i = (this._finished || (this._partialLine = i.substring(t - this._baseIndex), this._baseIndex = t), r && r.data && (this._rowCount += r.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview);
					if (a) n.postMessage({
						results: r,
						workerId: v.WORKER_ID,
						finished: i
					});
					else if (U(this._config.chunk) && !e) {
						if (this._config.chunk(r, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
						this._completeResults = r = void 0;
					}
					return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(r.data), this._completeResults.errors = this._completeResults.errors.concat(r.errors), this._completeResults.meta = r.meta), this._completed || !i || !U(this._config.complete) || r && r.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), i || r && r.meta.paused || this._nextChunk(), r;
				}
				this._halted = !0;
			}, this._sendError = function(e) {
				U(this._config.error) ? this._config.error(e) : a && this._config.error && n.postMessage({
					workerId: v.WORKER_ID,
					error: e,
					finished: !1
				});
			};
		}
		function f(e) {
			var r;
			(e = e || {}).chunkSize || (e.chunkSize = v.RemoteChunkSize), u.call(this, e), this._nextChunk = s ? function() {
				this._readChunk(), this._chunkLoaded();
			} : function() {
				this._readChunk();
			}, this.stream = function(e) {
				this._input = e, this._nextChunk();
			}, this._readChunk = function() {
				if (this._finished) this._chunkLoaded();
				else {
					if (r = new XMLHttpRequest(), this._config.withCredentials && (r.withCredentials = this._config.withCredentials), s || (r.onload = y(this._chunkLoaded, this), r.onerror = y(this._chunkError, this)), r.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !s), this._config.downloadRequestHeaders) {
						var e, t = this._config.downloadRequestHeaders;
						for (e in t) r.setRequestHeader(e, t[e]);
					}
					var i;
					this._config.chunkSize && (i = this._start + this._config.chunkSize - 1, r.setRequestHeader("Range", "bytes=" + this._start + "-" + i));
					try {
						r.send(this._config.downloadRequestBody);
					} catch (e) {
						this._chunkError(e.message);
					}
					s && 0 === r.status && this._chunkError();
				}
			}, this._chunkLoaded = function() {
				4 === r.readyState && (r.status < 200 || 400 <= r.status ? this._chunkError() : (this._start += this._config.chunkSize || r.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((e) => null !== (e = e.getResponseHeader("Content-Range")) ? parseInt(e.substring(e.lastIndexOf("/") + 1)) : -1)(r), this.parseChunk(r.responseText)));
			}, this._chunkError = function(e) {
				e = r.statusText || e;
				this._sendError(new Error(e));
			};
		}
		function l(e) {
			(e = e || {}).chunkSize || (e.chunkSize = v.LocalChunkSize), u.call(this, e);
			var i, r, n = "undefined" != typeof FileReader;
			this.stream = function(e) {
				this._input = e, r = e.slice || e.webkitSlice || e.mozSlice, n ? ((i = new FileReader()).onload = y(this._chunkLoaded, this), i.onerror = y(this._chunkError, this)) : i = new FileReaderSync(), this._nextChunk();
			}, this._nextChunk = function() {
				this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
			}, this._readChunk = function() {
				var e = this._input, t = (this._config.chunkSize && (t = Math.min(this._start + this._config.chunkSize, this._input.size), e = r.call(e, this._start, t)), i.readAsText(e, this._config.encoding));
				n || this._chunkLoaded({ target: { result: t } });
			}, this._chunkLoaded = function(e) {
				this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e.target.result);
			}, this._chunkError = function() {
				this._sendError(i.error);
			};
		}
		function c(e) {
			var i;
			u.call(this, e = e || {}), this.stream = function(e) {
				return i = e, this._nextChunk();
			}, this._nextChunk = function() {
				var e, t;
				if (!this._finished) return e = this._config.chunkSize, i = e ? (t = i.substring(0, e), i.substring(e)) : (t = i, ""), this._finished = !i, this.parseChunk(t);
			};
		}
		function p(e) {
			u.call(this, e = e || {});
			var t = [], i = !0, r = !1;
			this.pause = function() {
				u.prototype.pause.apply(this, arguments), this._input.pause();
			}, this.resume = function() {
				u.prototype.resume.apply(this, arguments), this._input.resume();
			}, this.stream = function(e) {
				this._input = e, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
			}, this._checkIsFinished = function() {
				r && 1 === t.length && (this._finished = !0);
			}, this._nextChunk = function() {
				this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i = !0;
			}, this._streamData = y(function(e) {
				try {
					t.push("string" == typeof e ? e : e.toString(this._config.encoding)), i && (i = !1, this._checkIsFinished(), this.parseChunk(t.shift()));
				} catch (e) {
					this._streamError(e);
				}
			}, this), this._streamError = y(function(e) {
				this._streamCleanUp(), this._sendError(e);
			}, this), this._streamEnd = y(function() {
				this._streamCleanUp(), r = !0, this._streamData("");
			}, this), this._streamCleanUp = y(function() {
				this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
			}, this);
		}
		function i(m) {
			var n, s, a, t, o = Math.pow(2, 53), h = -o, u = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, d = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, i = this, r = 0, f = 0, l = !1, e = !1, c = [], p = {
				data: [],
				errors: [],
				meta: {}
			};
			function y(e) {
				return "greedy" === m.skipEmptyLines ? "" === e.join("").trim() : 1 === e.length && 0 === e[0].length;
			}
			function g() {
				if (p && a && (k("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + v.DefaultDelimiter + "'"), a = !1), m.skipEmptyLines && (p.data = p.data.filter(function(e) {
					return !y(e);
				})), _()) {
					if (p) if (Array.isArray(p.data[0])) {
						for (var e = 0; _() && e < p.data.length; e++) p.data[e].forEach(t);
						p.data.splice(0, 1);
					} else p.data.forEach(t);
					function t(e, t) {
						U(m.transformHeader) && (e = m.transformHeader(e, t)), c.push(e);
					}
				}
				function i(e, t) {
					for (var i = m.header ? {} : [], r = 0; r < e.length; r++) {
						var n = r, s = e[r], s = ((e, t) => ((e) => (m.dynamicTypingFunction && void 0 === m.dynamicTyping[e] && (m.dynamicTyping[e] = m.dynamicTypingFunction(e)), !0 === (m.dynamicTyping[e] || m.dynamicTyping)))(e) ? "true" === t || "TRUE" === t || "false" !== t && "FALSE" !== t && (((e) => {
							if (u.test(e)) {
								e = parseFloat(e);
								if (h < e && e < o) return 1;
							}
						})(t) ? parseFloat(t) : d.test(t) ? new Date(t) : "" === t ? null : t) : t)(n = m.header ? r >= c.length ? "__parsed_extra" : c[r] : n, s = m.transform ? m.transform(s, n) : s);
						"__parsed_extra" === n ? (i[n] = i[n] || [], i[n].push(s)) : i[n] = s;
					}
					return m.header && (r > c.length ? k("FieldMismatch", "TooManyFields", "Too many fields: expected " + c.length + " fields but parsed " + r, f + t) : r < c.length && k("FieldMismatch", "TooFewFields", "Too few fields: expected " + c.length + " fields but parsed " + r, f + t)), i;
				}
				var r;
				p && (m.header || m.dynamicTyping || m.transform) && (r = 1, !p.data.length || Array.isArray(p.data[0]) ? (p.data = p.data.map(i), r = p.data.length) : p.data = i(p.data, 0), m.header && p.meta && (p.meta.fields = c), f += r);
			}
			function _() {
				return m.header && 0 === c.length;
			}
			function k(e, t, i, r) {
				e = {
					type: e,
					code: t,
					message: i
				};
				void 0 !== r && (e.row = r), p.errors.push(e);
			}
			U(m.step) && (t = m.step, m.step = function(e) {
				p = e, _() ? g() : (g(), 0 !== p.data.length && (r += e.data.length, m.preview && r > m.preview ? s.abort() : (p.data = p.data[0], t(p, i))));
			}), this.parse = function(e, t, i) {
				var r = m.quoteChar || "\"", r = (m.newline || (m.newline = this.guessLineEndings(e, r)), a = !1, m.delimiter ? U(m.delimiter) && (m.delimiter = m.delimiter(e), p.meta.delimiter = m.delimiter) : ((r = ((e, t, i, r, n) => {
					var s, a, o, h;
					n = n || [
						",",
						"	",
						"|",
						";",
						v.RECORD_SEP,
						v.UNIT_SEP
					];
					for (var u = 0; u < n.length; u++) {
						for (var d, f = n[u], l = 0, c = 0, p = 0, g = (o = void 0, new E({
							comments: r,
							delimiter: f,
							newline: t,
							preview: 10
						}).parse(e)), _ = 0; _ < g.data.length; _++) i && y(g.data[_]) ? p++ : (d = g.data[_].length, c += d, void 0 === o ? o = d : 0 < d && (l += Math.abs(d - o), o = d));
						0 < g.data.length && (c /= g.data.length - p), (void 0 === a || l <= a) && (void 0 === h || h < c) && 1.99 < c && (a = l, s = f, h = c);
					}
					return {
						successful: !!(m.delimiter = s),
						bestDelimiter: s
					};
				})(e, m.newline, m.skipEmptyLines, m.comments, m.delimitersToGuess)).successful ? m.delimiter = r.bestDelimiter : (a = !0, m.delimiter = v.DefaultDelimiter), p.meta.delimiter = m.delimiter), b(m));
				return m.preview && m.header && r.preview++, n = e, s = new E(r), p = s.parse(n, t, i), g(), l ? { meta: { paused: !0 } } : p || { meta: { paused: !1 } };
			}, this.paused = function() {
				return l;
			}, this.pause = function() {
				l = !0, s.abort(), n = U(m.chunk) ? "" : n.substring(s.getCharIndex());
			}, this.resume = function() {
				i.streamer._halted ? (l = !1, i.streamer.parseChunk(n, !0)) : setTimeout(i.resume, 3);
			}, this.aborted = function() {
				return e;
			}, this.abort = function() {
				e = !0, s.abort(), p.meta.aborted = !0, U(m.complete) && m.complete(p), n = "";
			}, this.guessLineEndings = function(e, t) {
				e = e.substring(0, 1048576);
				var t = new RegExp(P(t) + "([^]*?)" + P(t), "gm"), i = (e = e.replace(t, "")).split("\r"), t = e.split("\n"), e = 1 < t.length && t[0].length < i[0].length;
				if (1 === i.length || e) return "\n";
				for (var r = 0, n = 0; n < i.length; n++) "\n" === i[n][0] && r++;
				return r >= i.length / 2 ? "\r\n" : "\r";
			};
		}
		function P(e) {
			return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		function E(C) {
			var S = (C = C || {}).delimiter, O = C.newline, x = C.comments, I = C.step, A = C.preview, T = C.fastMode, D = null, L = !1, F = null == C.quoteChar ? "\"" : C.quoteChar, j = F;
			if (void 0 !== C.escapeChar && (j = C.escapeChar), ("string" != typeof S || -1 < v.BAD_DELIMITERS.indexOf(S)) && (S = ","), x === S) throw new Error("Comment character same as delimiter");
			!0 === x ? x = "#" : ("string" != typeof x || -1 < v.BAD_DELIMITERS.indexOf(x)) && (x = !1), "\n" !== O && "\r" !== O && "\r\n" !== O && (O = "\n");
			var z = 0, M = !1;
			this.parse = function(i, t, r) {
				if ("string" != typeof i) throw new Error("Input must be a string");
				var n = i.length, e = S.length, s = O.length, a = x.length, o = U(I), h = [], u = [], d = [], f = z = 0;
				if (!i) return w();
				if (T || !1 !== T && -1 === i.indexOf(F)) {
					for (var l = i.split(O), c = 0; c < l.length; c++) {
						if (d = l[c], z += d.length, c !== l.length - 1) z += O.length;
						else if (r) return w();
						if (!x || d.substring(0, a) !== x) {
							if (o) {
								if (h = [], k(d.split(S)), R(), M) return w();
							} else k(d.split(S));
							if (A && A <= c) return h = h.slice(0, A), w(!0);
						}
					}
					return w();
				}
				for (var p = i.indexOf(S, z), g = i.indexOf(O, z), _ = new RegExp(P(j) + P(F), "g"), m = i.indexOf(F, z);;) if (i[z] === F) for (m = z, z++;;) {
					if (-1 === (m = i.indexOf(F, m + 1))) return r || u.push({
						type: "Quotes",
						code: "MissingQuotes",
						message: "Quoted field unterminated",
						row: h.length,
						index: z
					}), E();
					if (m === n - 1) return E(i.substring(z, m).replace(_, F));
					if (F === j && i[m + 1] === j) m++;
					else if (F === j || 0 === m || i[m - 1] !== j) {
						-1 !== p && p < m + 1 && (p = i.indexOf(S, m + 1));
						var y = v(-1 === (g = -1 !== g && g < m + 1 ? i.indexOf(O, m + 1) : g) ? p : Math.min(p, g));
						if (i.substr(m + 1 + y, e) === S) {
							d.push(i.substring(z, m).replace(_, F)), i[z = m + 1 + y + e] !== F && (m = i.indexOf(F, z)), p = i.indexOf(S, z), g = i.indexOf(O, z);
							break;
						}
						y = v(g);
						if (i.substring(m + 1 + y, m + 1 + y + s) === O) {
							if (d.push(i.substring(z, m).replace(_, F)), b(m + 1 + y + s), p = i.indexOf(S, z), m = i.indexOf(F, z), o && (R(), M)) return w();
							if (A && h.length >= A) return w(!0);
							break;
						}
						u.push({
							type: "Quotes",
							code: "InvalidQuotes",
							message: "Trailing quote on quoted field is malformed",
							row: h.length,
							index: z
						}), m++;
					}
				}
				else if (x && 0 === d.length && i.substring(z, z + a) === x) {
					if (-1 === g) return w();
					z = g + s, g = i.indexOf(O, z), p = i.indexOf(S, z);
				} else if (-1 !== p && (p < g || -1 === g)) d.push(i.substring(z, p)), z = p + e, p = i.indexOf(S, z);
				else {
					if (-1 === g) break;
					if (d.push(i.substring(z, g)), b(g + s), o && (R(), M)) return w();
					if (A && h.length >= A) return w(!0);
				}
				return E();
				function k(e) {
					h.push(e), f = z;
				}
				function v(e) {
					var t = 0;
					return t = -1 !== e && (e = i.substring(m + 1, e)) && "" === e.trim() ? e.length : t;
				}
				function E(e) {
					return r || (void 0 === e && (e = i.substring(z)), d.push(e), z = n, k(d), o && R()), w();
				}
				function b(e) {
					z = e, k(d), d = [], g = i.indexOf(O, z);
				}
				function w(e) {
					if (C.header && !t && h.length && !L) {
						var s = h[0], a = Object.create(null), o = new Set(s);
						let n = !1;
						for (let r = 0; r < s.length; r++) {
							let i = s[r];
							if (a[i = U(C.transformHeader) ? C.transformHeader(i, r) : i]) {
								let e, t = a[i];
								for (; e = i + "_" + t, t++, o.has(e););
								o.add(e), s[r] = e, a[i]++, n = !0, (D = null === D ? {} : D)[e] = i;
							} else a[i] = 1, s[r] = i;
							o.add(i);
						}
						n && console.warn("Duplicate headers found and renamed."), L = !0;
					}
					return {
						data: h,
						errors: u,
						meta: {
							delimiter: S,
							linebreak: O,
							aborted: M,
							truncated: !!e,
							cursor: f + (t || 0),
							renamedHeaders: D
						}
					};
				}
				function R() {
					I(w()), h = [], u = [];
				}
			}, this.abort = function() {
				M = !0;
			}, this.getCharIndex = function() {
				return z;
			};
		}
		function g(e) {
			var t = e.data, i = o[t.workerId], r = !1;
			if (t.error) i.userError(t.error, t.file);
			else if (t.results && t.results.data) {
				var n = {
					abort: function() {
						r = !0, _(t.workerId, {
							data: [],
							errors: [],
							meta: { aborted: !0 }
						});
					},
					pause: m,
					resume: m
				};
				if (U(i.userStep)) {
					for (var s = 0; s < t.results.data.length && (i.userStep({
						data: t.results.data[s],
						errors: t.results.errors,
						meta: t.results.meta
					}, n), !r); s++);
					delete t.results;
				} else U(i.userChunk) && (i.userChunk(t.results, n, t.file), delete t.results);
			}
			t.finished && !r && _(t.workerId, t.results);
		}
		function _(e, t) {
			var i = o[e];
			U(i.userComplete) && i.userComplete(t), i.terminate(), delete o[e];
		}
		function m() {
			throw new Error("Not implemented.");
		}
		function b(e) {
			if ("object" != typeof e || null === e) return e;
			var t, i = Array.isArray(e) ? [] : {};
			for (t in e) i[t] = b(e[t]);
			return i;
		}
		function y(e, t) {
			return function() {
				e.apply(t, arguments);
			};
		}
		function U(e) {
			return "function" == typeof e;
		}
		return v.parse = function(e, t) {
			var i = (t = t || {}).dynamicTyping || !1;
			U(i) && (t.dynamicTypingFunction = i, i = {});
			if (t.dynamicTyping = i, t.transform = !!U(t.transform) && t.transform, !t.worker || !v.WORKERS_SUPPORTED) return i = null, v.NODE_STREAM_INPUT, "string" == typeof e ? (e = ((e) => 65279 !== e.charCodeAt(0) ? e : e.slice(1))(e), i = new (t.download ? f : c)(t)) : !0 === e.readable && U(e.read) && U(e.on) ? i = new p(t) : (n.File && e instanceof File || e instanceof Object) && (i = new l(t)), i.stream(e);
			(i = (() => {
				var e;
				return !!v.WORKERS_SUPPORTED && (e = (() => {
					var e = n.URL || n.webkitURL || null, t = r.toString();
					return v.BLOB_URL || (v.BLOB_URL = e.createObjectURL(new Blob([
						"var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ",
						"(",
						t,
						")();"
					], { type: "text/javascript" })));
				})(), (e = new n.Worker(e)).onmessage = g, e.id = h++, o[e.id] = e);
			})()).userStep = t.step, i.userChunk = t.chunk, i.userComplete = t.complete, i.userError = t.error, t.step = U(t.step), t.chunk = U(t.chunk), t.complete = U(t.complete), t.error = U(t.error), delete t.worker, i.postMessage({
				input: e,
				config: t,
				workerId: i.id
			});
		}, v.unparse = function(e, t) {
			var n = !1, _ = !0, m = ",", y = "\r\n", s = "\"", a = s + s, i = !1, r = null, o = !1, h = ((() => {
				if ("object" == typeof t) {
					if ("string" != typeof t.delimiter || v.BAD_DELIMITERS.filter(function(e) {
						return -1 !== t.delimiter.indexOf(e);
					}).length || (m = t.delimiter), "boolean" != typeof t.quotes && "function" != typeof t.quotes && !Array.isArray(t.quotes) || (n = t.quotes), "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (i = t.skipEmptyLines), "string" == typeof t.newline && (y = t.newline), "string" == typeof t.quoteChar && (s = t.quoteChar), "boolean" == typeof t.header && (_ = t.header), Array.isArray(t.columns)) {
						if (0 === t.columns.length) throw new Error("Option columns is empty");
						r = t.columns;
					}
					void 0 !== t.escapeChar && (a = t.escapeChar + s), t.escapeFormulae instanceof RegExp ? o = t.escapeFormulae : "boolean" == typeof t.escapeFormulae && t.escapeFormulae && (o = /^[=+\-@\t\r].*$/);
				}
			})(), new RegExp(P(s), "g"));
			"string" == typeof e && (e = JSON.parse(e));
			if (Array.isArray(e)) {
				if (!e.length || Array.isArray(e[0])) return u(null, e, i);
				if ("object" == typeof e[0]) return u(r || Object.keys(e[0]), e, i);
			} else if ("object" == typeof e) return "string" == typeof e.data && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields || r), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : "object" == typeof e.data[0] ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || "object" == typeof e.data[0] || (e.data = [e.data])), u(e.fields || [], e.data || [], i);
			throw new Error("Unable to serialize unrecognized input");
			function u(e, t, i) {
				var r = "", n = ("string" == typeof e && (e = JSON.parse(e)), "string" == typeof t && (t = JSON.parse(t)), Array.isArray(e) && 0 < e.length), s = !Array.isArray(t[0]);
				if (n && _) {
					for (var a = 0; a < e.length; a++) 0 < a && (r += m), r += k(e[a], a);
					0 < t.length && (r += y);
				}
				for (var o = 0; o < t.length; o++) {
					var h = (n ? e : t[o]).length, u = !1, d = n ? 0 === Object.keys(t[o]).length : 0 === t[o].length;
					if (i && !n && (u = "greedy" === i ? "" === t[o].join("").trim() : 1 === t[o].length && 0 === t[o][0].length), "greedy" === i && n) {
						for (var f = [], l = 0; l < h; l++) {
							var c = s ? e[l] : l;
							f.push(t[o][c]);
						}
						u = "" === f.join("").trim();
					}
					if (!u) {
						for (var p = 0; p < h; p++) {
							0 < p && !d && (r += m);
							var g = n && s ? e[p] : p;
							r += k(t[o][g], p);
						}
						o < t.length - 1 && (!i || 0 < h && !d) && (r += y);
					}
				}
				return r;
			}
			function k(e, t) {
				var i, r;
				return null == e ? "" : e.constructor === Date ? JSON.stringify(e).slice(1, 25) : (r = !1, o && "string" == typeof e && o.test(e) && (e = "'" + e, r = !0), i = e.toString().replace(h, a), (r = r || !0 === n || "function" == typeof n && n(e, t) || Array.isArray(n) && n[t] || ((e, t) => {
					for (var i = 0; i < t.length; i++) if (-1 < e.indexOf(t[i])) return !0;
					return !1;
				})(i, v.BAD_DELIMITERS) || -1 < i.indexOf(m) || " " === i.charAt(0) || " " === i.charAt(i.length - 1)) ? s + i + s : i);
			}
		}, v.RECORD_SEP = String.fromCharCode(30), v.UNIT_SEP = String.fromCharCode(31), v.BYTE_ORDER_MARK = "﻿", v.BAD_DELIMITERS = [
			"\r",
			"\n",
			"\"",
			v.BYTE_ORDER_MARK
		], v.WORKERS_SUPPORTED = !s && !!n.Worker, v.NODE_STREAM_INPUT = 1, v.LocalChunkSize = 10485760, v.RemoteChunkSize = 5242880, v.DefaultDelimiter = ",", v.Parser = E, v.ParserHandle = i, v.NetworkStreamer = f, v.FileStreamer = l, v.StringStreamer = c, v.ReadableStreamStreamer = p, n.jQuery && ((d = n.jQuery).fn.parse = function(o) {
			var i = o.config || {}, h = [];
			return this.each(function(e) {
				if (!("INPUT" === d(this).prop("tagName").toUpperCase() && "file" === d(this).attr("type").toLowerCase() && n.FileReader) || !this.files || 0 === this.files.length) return !0;
				for (var t = 0; t < this.files.length; t++) h.push({
					file: this.files[t],
					inputElem: this,
					instanceConfig: d.extend({}, i)
				});
			}), e(), this;
			function e() {
				if (0 === h.length) U(o.complete) && o.complete();
				else {
					var e, t, i, r, n = h[0];
					if (U(o.before)) {
						var s = o.before(n.file, n.inputElem);
						if ("object" == typeof s) {
							if ("abort" === s.action) return e = "AbortError", t = n.file, i = n.inputElem, r = s.reason, void (U(o.error) && o.error({ name: e }, t, i, r));
							if ("skip" === s.action) return void u();
							"object" == typeof s.config && (n.instanceConfig = d.extend(n.instanceConfig, s.config));
						} else if ("skip" === s) return void u();
					}
					var a = n.instanceConfig.complete;
					n.instanceConfig.complete = function(e) {
						U(a) && a(e, n.file, n.inputElem), u();
					}, v.parse(n.file, n.instanceConfig);
				}
			}
			function u() {
				h.splice(0, 1), e();
			}
		}), a && (n.onmessage = function(e) {
			e = e.data;
			void 0 === v.WORKER_ID && e && (v.WORKER_ID = e.workerId);
			"string" == typeof e.input ? n.postMessage({
				workerId: v.WORKER_ID,
				results: v.parse(e.input, e.config),
				finished: !0
			}) : (n.File && e.input instanceof File || e.input instanceof Object) && (e = v.parse(e.input, e.config)) && n.postMessage({
				workerId: v.WORKER_ID,
				results: e,
				finished: !0
			});
		}), (f.prototype = Object.create(u.prototype)).constructor = f, (l.prototype = Object.create(u.prototype)).constructor = l, (c.prototype = Object.create(c.prototype)).constructor = c, (p.prototype = Object.create(u.prototype)).constructor = p, v;
	});
}));
//#endregion
//#region node_modules/geojson-vt/src/simplify.js
function simplify(coords, first, last, sqTolerance) {
	let maxSqDist = sqTolerance;
	const mid = first + (last - first >> 1);
	let minPosToMid = last - first;
	let index;
	const ax = coords[first];
	const ay = coords[first + 1];
	const bx = coords[last];
	const by = coords[last + 1];
	for (let i = first + 3; i < last; i += 3) {
		const d = getSqSegDist(coords[i], coords[i + 1], ax, ay, bx, by);
		if (d > maxSqDist) {
			index = i;
			maxSqDist = d;
		} else if (d === maxSqDist) {
			const posToMid = Math.abs(i - mid);
			if (posToMid < minPosToMid) {
				index = i;
				minPosToMid = posToMid;
			}
		}
	}
	if (maxSqDist > sqTolerance) {
		if (index - first > 3) simplify(coords, first, index, sqTolerance);
		coords[index + 2] = maxSqDist;
		if (last - index > 3) simplify(coords, index, last, sqTolerance);
	}
}
function getSqSegDist(px, py, x, y, bx, by) {
	let dx = bx - x;
	let dy = by - y;
	if (dx !== 0 || dy !== 0) {
		const t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);
		if (t > 1) {
			x = bx;
			y = by;
		} else if (t > 0) {
			x += dx * t;
			y += dy * t;
		}
	}
	dx = px - x;
	dy = py - y;
	return dx * dx + dy * dy;
}
//#endregion
//#region node_modules/geojson-vt/src/feature.js
function createFeature(id, type, geom, tags) {
	const feature = {
		id: id == null ? null : id,
		type,
		geometry: geom,
		tags,
		minX: Infinity,
		minY: Infinity,
		maxX: -Infinity,
		maxY: -Infinity
	};
	if (type === "Point" || type === "MultiPoint" || type === "LineString") calcLineBBox(feature, geom);
	else if (type === "Polygon") calcLineBBox(feature, geom[0]);
	else if (type === "MultiLineString") for (const line of geom) calcLineBBox(feature, line);
	else if (type === "MultiPolygon") for (const polygon of geom) calcLineBBox(feature, polygon[0]);
	return feature;
}
function calcLineBBox(feature, geom) {
	for (let i = 0; i < geom.length; i += 3) {
		feature.minX = Math.min(feature.minX, geom[i]);
		feature.minY = Math.min(feature.minY, geom[i + 1]);
		feature.maxX = Math.max(feature.maxX, geom[i]);
		feature.maxY = Math.max(feature.maxY, geom[i + 1]);
	}
}
//#endregion
//#region node_modules/geojson-vt/src/convert.js
function convert(data, options) {
	const features = [];
	if (data.type === "FeatureCollection") for (let i = 0; i < data.features.length; i++) convertFeature(features, data.features[i], options, i);
	else if (data.type === "Feature") convertFeature(features, data, options);
	else convertFeature(features, { geometry: data }, options);
	return features;
}
function convertFeature(features, geojson, options, index) {
	if (!geojson.geometry) return;
	const coords = geojson.geometry.coordinates;
	if (coords && coords.length === 0) return;
	const type = geojson.geometry.type;
	const tolerance = Math.pow(options.tolerance / ((1 << options.maxZoom) * options.extent), 2);
	let geometry = [];
	let id = geojson.id;
	if (options.promoteId) id = geojson.properties[options.promoteId];
	else if (options.generateId) id = index || 0;
	if (type === "Point") convertPoint(coords, geometry);
	else if (type === "MultiPoint") for (const p of coords) convertPoint(p, geometry);
	else if (type === "LineString") convertLine(coords, geometry, tolerance, false);
	else if (type === "MultiLineString") if (options.lineMetrics) {
		for (const line of coords) {
			geometry = [];
			convertLine(line, geometry, tolerance, false);
			features.push(createFeature(id, "LineString", geometry, geojson.properties));
		}
		return;
	} else convertLines(coords, geometry, tolerance, false);
	else if (type === "Polygon") convertLines(coords, geometry, tolerance, true);
	else if (type === "MultiPolygon") for (const polygon of coords) {
		const newPolygon = [];
		convertLines(polygon, newPolygon, tolerance, true);
		geometry.push(newPolygon);
	}
	else if (type === "GeometryCollection") {
		for (const singleGeometry of geojson.geometry.geometries) convertFeature(features, {
			id,
			geometry: singleGeometry,
			properties: geojson.properties
		}, options, index);
		return;
	} else throw new Error("Input data is not a valid GeoJSON object.");
	features.push(createFeature(id, type, geometry, geojson.properties));
}
function convertPoint(coords, out) {
	out.push(projectX(coords[0]), projectY(coords[1]), 0);
}
function convertLine(ring, out, tolerance, isPolygon) {
	let x0, y0;
	let size = 0;
	for (let j = 0; j < ring.length; j++) {
		const x = projectX(ring[j][0]);
		const y = projectY(ring[j][1]);
		out.push(x, y, 0);
		if (j > 0) if (isPolygon) size += (x0 * y - x * y0) / 2;
		else size += Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2));
		x0 = x;
		y0 = y;
	}
	const last = out.length - 3;
	out[2] = 1;
	simplify(out, 0, last, tolerance);
	out[last + 2] = 1;
	out.size = Math.abs(size);
	out.start = 0;
	out.end = out.size;
}
function convertLines(rings, out, tolerance, isPolygon) {
	for (let i = 0; i < rings.length; i++) {
		const geom = [];
		convertLine(rings[i], geom, tolerance, isPolygon);
		out.push(geom);
	}
}
function projectX(x) {
	return x / 360 + .5;
}
function projectY(y) {
	const sin = Math.sin(y * Math.PI / 180);
	const y2 = .5 - .25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
	return y2 < 0 ? 0 : y2 > 1 ? 1 : y2;
}
//#endregion
//#region node_modules/geojson-vt/src/clip.js
function clip(features, scale, k1, k2, axis, minAll, maxAll, options) {
	k1 /= scale;
	k2 /= scale;
	if (minAll >= k1 && maxAll < k2) return features;
	else if (maxAll < k1 || minAll >= k2) return null;
	const clipped = [];
	for (const feature of features) {
		const geometry = feature.geometry;
		let type = feature.type;
		const min = axis === 0 ? feature.minX : feature.minY;
		const max = axis === 0 ? feature.maxX : feature.maxY;
		if (min >= k1 && max < k2) {
			clipped.push(feature);
			continue;
		} else if (max < k1 || min >= k2) continue;
		let newGeometry = [];
		if (type === "Point" || type === "MultiPoint") clipPoints(geometry, newGeometry, k1, k2, axis);
		else if (type === "LineString") clipLine(geometry, newGeometry, k1, k2, axis, false, options.lineMetrics);
		else if (type === "MultiLineString") clipLines(geometry, newGeometry, k1, k2, axis, false);
		else if (type === "Polygon") clipLines(geometry, newGeometry, k1, k2, axis, true);
		else if (type === "MultiPolygon") for (const polygon of geometry) {
			const newPolygon = [];
			clipLines(polygon, newPolygon, k1, k2, axis, true);
			if (newPolygon.length) newGeometry.push(newPolygon);
		}
		if (newGeometry.length) {
			if (options.lineMetrics && type === "LineString") {
				for (const line of newGeometry) clipped.push(createFeature(feature.id, type, line, feature.tags));
				continue;
			}
			if (type === "LineString" || type === "MultiLineString") if (newGeometry.length === 1) {
				type = "LineString";
				newGeometry = newGeometry[0];
			} else type = "MultiLineString";
			if (type === "Point" || type === "MultiPoint") type = newGeometry.length === 3 ? "Point" : "MultiPoint";
			clipped.push(createFeature(feature.id, type, newGeometry, feature.tags));
		}
	}
	return clipped.length ? clipped : null;
}
function clipPoints(geom, newGeom, k1, k2, axis) {
	for (let i = 0; i < geom.length; i += 3) {
		const a = geom[i + axis];
		if (a >= k1 && a <= k2) addPoint(newGeom, geom[i], geom[i + 1], geom[i + 2]);
	}
}
function clipLine(geom, newGeom, k1, k2, axis, isPolygon, trackMetrics) {
	let slice = newSlice(geom);
	const intersect = axis === 0 ? intersectX : intersectY;
	let len = geom.start;
	let segLen, t;
	for (let i = 0; i < geom.length - 3; i += 3) {
		const ax = geom[i];
		const ay = geom[i + 1];
		const az = geom[i + 2];
		const bx = geom[i + 3];
		const by = geom[i + 4];
		const a = axis === 0 ? ax : ay;
		const b = axis === 0 ? bx : by;
		let exited = false;
		if (trackMetrics) segLen = Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
		if (a < k1) {
			if (b > k1) {
				t = intersect(slice, ax, ay, bx, by, k1);
				if (trackMetrics) slice.start = len + segLen * t;
			}
		} else if (a > k2) {
			if (b < k2) {
				t = intersect(slice, ax, ay, bx, by, k2);
				if (trackMetrics) slice.start = len + segLen * t;
			}
		} else addPoint(slice, ax, ay, az);
		if (b < k1 && a >= k1) {
			t = intersect(slice, ax, ay, bx, by, k1);
			exited = true;
		}
		if (b > k2 && a <= k2) {
			t = intersect(slice, ax, ay, bx, by, k2);
			exited = true;
		}
		if (!isPolygon && exited) {
			if (trackMetrics) slice.end = len + segLen * t;
			newGeom.push(slice);
			slice = newSlice(geom);
		}
		if (trackMetrics) len += segLen;
	}
	let last = geom.length - 3;
	const ax = geom[last];
	const ay = geom[last + 1];
	const az = geom[last + 2];
	const a = axis === 0 ? ax : ay;
	if (a >= k1 && a <= k2) addPoint(slice, ax, ay, az);
	last = slice.length - 3;
	if (isPolygon && last >= 3 && (slice[last] !== slice[0] || slice[last + 1] !== slice[1])) addPoint(slice, slice[0], slice[1], slice[2]);
	if (slice.length) newGeom.push(slice);
}
function newSlice(line) {
	const slice = [];
	slice.size = line.size;
	slice.start = line.start;
	slice.end = line.end;
	return slice;
}
function clipLines(geom, newGeom, k1, k2, axis, isPolygon) {
	for (const line of geom) clipLine(line, newGeom, k1, k2, axis, isPolygon, false);
}
function addPoint(out, x, y, z) {
	out.push(x, y, z);
}
function intersectX(out, ax, ay, bx, by, x) {
	const t = (x - ax) / (bx - ax);
	addPoint(out, x, ay + (by - ay) * t, 1);
	return t;
}
function intersectY(out, ax, ay, bx, by, y) {
	const t = (y - ay) / (by - ay);
	addPoint(out, ax + (bx - ax) * t, y, 1);
	return t;
}
//#endregion
//#region node_modules/geojson-vt/src/wrap.js
function wrap(features, options) {
	const buffer = options.buffer / options.extent;
	let merged = features;
	const left = clip(features, 1, -1 - buffer, buffer, 0, -1, 2, options);
	const right = clip(features, 1, 1 - buffer, 2 + buffer, 0, -1, 2, options);
	if (left || right) {
		merged = clip(features, 1, -buffer, 1 + buffer, 0, -1, 2, options) || [];
		if (left) merged = shiftFeatureCoords(left, 1).concat(merged);
		if (right) merged = merged.concat(shiftFeatureCoords(right, -1));
	}
	return merged;
}
function shiftFeatureCoords(features, offset) {
	const newFeatures = [];
	for (let i = 0; i < features.length; i++) {
		const feature = features[i];
		const type = feature.type;
		let newGeometry;
		if (type === "Point" || type === "MultiPoint" || type === "LineString") newGeometry = shiftCoords(feature.geometry, offset);
		else if (type === "MultiLineString" || type === "Polygon") {
			newGeometry = [];
			for (const line of feature.geometry) newGeometry.push(shiftCoords(line, offset));
		} else if (type === "MultiPolygon") {
			newGeometry = [];
			for (const polygon of feature.geometry) {
				const newPolygon = [];
				for (const line of polygon) newPolygon.push(shiftCoords(line, offset));
				newGeometry.push(newPolygon);
			}
		}
		newFeatures.push(createFeature(feature.id, type, newGeometry, feature.tags));
	}
	return newFeatures;
}
function shiftCoords(points, offset) {
	const newPoints = [];
	newPoints.size = points.size;
	if (points.start !== void 0) {
		newPoints.start = points.start;
		newPoints.end = points.end;
	}
	for (let i = 0; i < points.length; i += 3) newPoints.push(points[i] + offset, points[i + 1], points[i + 2]);
	return newPoints;
}
//#endregion
//#region node_modules/geojson-vt/src/transform.js
function transformTile(tile, extent) {
	if (tile.transformed) return tile;
	const z2 = 1 << tile.z;
	const tx = tile.x;
	const ty = tile.y;
	for (const feature of tile.features) {
		const geom = feature.geometry;
		const type = feature.type;
		feature.geometry = [];
		if (type === 1) for (let j = 0; j < geom.length; j += 2) feature.geometry.push(transformPoint(geom[j], geom[j + 1], extent, z2, tx, ty));
		else for (let j = 0; j < geom.length; j++) {
			const ring = [];
			for (let k = 0; k < geom[j].length; k += 2) ring.push(transformPoint(geom[j][k], geom[j][k + 1], extent, z2, tx, ty));
			feature.geometry.push(ring);
		}
	}
	tile.transformed = true;
	return tile;
}
function transformPoint(x, y, extent, z2, tx, ty) {
	return [Math.round(extent * (x * z2 - tx)), Math.round(extent * (y * z2 - ty))];
}
//#endregion
//#region node_modules/geojson-vt/src/tile.js
function createTile(features, z, tx, ty, options) {
	const tolerance = z === options.maxZoom ? 0 : options.tolerance / ((1 << z) * options.extent);
	const tile = {
		features: [],
		numPoints: 0,
		numSimplified: 0,
		numFeatures: features.length,
		source: null,
		x: tx,
		y: ty,
		z,
		transformed: false,
		minX: 2,
		minY: 1,
		maxX: -1,
		maxY: 0
	};
	for (const feature of features) addFeature(tile, feature, tolerance, options);
	return tile;
}
function addFeature(tile, feature, tolerance, options) {
	const geom = feature.geometry;
	const type = feature.type;
	const simplified = [];
	tile.minX = Math.min(tile.minX, feature.minX);
	tile.minY = Math.min(tile.minY, feature.minY);
	tile.maxX = Math.max(tile.maxX, feature.maxX);
	tile.maxY = Math.max(tile.maxY, feature.maxY);
	if (type === "Point" || type === "MultiPoint") for (let i = 0; i < geom.length; i += 3) {
		simplified.push(geom[i], geom[i + 1]);
		tile.numPoints++;
		tile.numSimplified++;
	}
	else if (type === "LineString") addLine(simplified, geom, tile, tolerance, false, false);
	else if (type === "MultiLineString" || type === "Polygon") for (let i = 0; i < geom.length; i++) addLine(simplified, geom[i], tile, tolerance, type === "Polygon", i === 0);
	else if (type === "MultiPolygon") for (let k = 0; k < geom.length; k++) {
		const polygon = geom[k];
		for (let i = 0; i < polygon.length; i++) addLine(simplified, polygon[i], tile, tolerance, true, i === 0);
	}
	if (simplified.length) {
		let tags = feature.tags || null;
		if (type === "LineString" && options.lineMetrics) {
			tags = {};
			for (const key in feature.tags) tags[key] = feature.tags[key];
			tags["mapbox_clip_start"] = geom.start / geom.size;
			tags["mapbox_clip_end"] = geom.end / geom.size;
		}
		const tileFeature = {
			geometry: simplified,
			type: type === "Polygon" || type === "MultiPolygon" ? 3 : type === "LineString" || type === "MultiLineString" ? 2 : 1,
			tags
		};
		if (feature.id !== null) tileFeature.id = feature.id;
		tile.features.push(tileFeature);
	}
}
function addLine(result, geom, tile, tolerance, isPolygon, isOuter) {
	const sqTolerance = tolerance * tolerance;
	if (tolerance > 0 && geom.size < (isPolygon ? sqTolerance : tolerance)) {
		tile.numPoints += geom.length / 3;
		return;
	}
	const ring = [];
	for (let i = 0; i < geom.length; i += 3) {
		if (tolerance === 0 || geom[i + 2] > sqTolerance) {
			tile.numSimplified++;
			ring.push(geom[i], geom[i + 1]);
		}
		tile.numPoints++;
	}
	if (isPolygon) rewind(ring, isOuter);
	result.push(ring);
}
function rewind(ring, clockwise) {
	let area = 0;
	for (let i = 0, len = ring.length, j = len - 2; i < len; j = i, i += 2) area += (ring[i] - ring[j]) * (ring[i + 1] + ring[j + 1]);
	if (area > 0 === clockwise) for (let i = 0, len = ring.length; i < len / 2; i += 2) {
		const x = ring[i];
		const y = ring[i + 1];
		ring[i] = ring[len - 2 - i];
		ring[i + 1] = ring[len - 1 - i];
		ring[len - 2 - i] = x;
		ring[len - 1 - i] = y;
	}
}
//#endregion
//#region node_modules/geojson-vt/src/index.js
var defaultOptions = {
	maxZoom: 14,
	indexMaxZoom: 5,
	indexMaxPoints: 1e5,
	tolerance: 3,
	extent: 4096,
	buffer: 64,
	lineMetrics: false,
	promoteId: null,
	generateId: false,
	debug: 0
};
var GeoJSONVT = class {
	constructor(data, options) {
		options = this.options = extend(Object.create(defaultOptions), options);
		const debug = options.debug;
		if (debug) console.time("preprocess data");
		if (options.maxZoom < 0 || options.maxZoom > 24) throw new Error("maxZoom should be in the 0-24 range");
		if (options.promoteId && options.generateId) throw new Error("promoteId and generateId cannot be used together.");
		let features = convert(data, options);
		this.tiles = {};
		this.tileCoords = [];
		if (debug) {
			console.timeEnd("preprocess data");
			console.log("index: maxZoom: %d, maxPoints: %d", options.indexMaxZoom, options.indexMaxPoints);
			console.time("generate tiles");
			this.stats = {};
			this.total = 0;
		}
		features = wrap(features, options);
		if (features.length) this.splitTile(features, 0, 0, 0);
		if (debug) {
			if (features.length) console.log("features: %d, points: %d", this.tiles[0].numFeatures, this.tiles[0].numPoints);
			console.timeEnd("generate tiles");
			console.log("tiles generated:", this.total, JSON.stringify(this.stats));
		}
	}
	splitTile(features, z, x, y, cz, cx, cy) {
		const stack = [
			features,
			z,
			x,
			y
		];
		const options = this.options;
		const debug = options.debug;
		while (stack.length) {
			y = stack.pop();
			x = stack.pop();
			z = stack.pop();
			features = stack.pop();
			const z2 = 1 << z;
			const id = toID(z, x, y);
			let tile = this.tiles[id];
			if (!tile) {
				if (debug > 1) console.time("creation");
				tile = this.tiles[id] = createTile(features, z, x, y, options);
				this.tileCoords.push({
					z,
					x,
					y
				});
				if (debug) {
					if (debug > 1) {
						console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)", z, x, y, tile.numFeatures, tile.numPoints, tile.numSimplified);
						console.timeEnd("creation");
					}
					const key = `z${z}`;
					this.stats[key] = (this.stats[key] || 0) + 1;
					this.total++;
				}
			}
			tile.source = features;
			if (cz == null) {
				if (z === options.indexMaxZoom || tile.numPoints <= options.indexMaxPoints) continue;
			} else if (z === options.maxZoom || z === cz) continue;
			else if (cz != null) {
				const zoomSteps = cz - z;
				if (x !== cx >> zoomSteps || y !== cy >> zoomSteps) continue;
			}
			tile.source = null;
			if (features.length === 0) continue;
			if (debug > 1) console.time("clipping");
			const k1 = .5 * options.buffer / options.extent;
			const k2 = .5 - k1;
			const k3 = .5 + k1;
			const k4 = 1 + k1;
			let tl = null;
			let bl = null;
			let tr = null;
			let br = null;
			let left = clip(features, z2, x - k1, x + k3, 0, tile.minX, tile.maxX, options);
			let right = clip(features, z2, x + k2, x + k4, 0, tile.minX, tile.maxX, options);
			features = null;
			if (left) {
				tl = clip(left, z2, y - k1, y + k3, 1, tile.minY, tile.maxY, options);
				bl = clip(left, z2, y + k2, y + k4, 1, tile.minY, tile.maxY, options);
				left = null;
			}
			if (right) {
				tr = clip(right, z2, y - k1, y + k3, 1, tile.minY, tile.maxY, options);
				br = clip(right, z2, y + k2, y + k4, 1, tile.minY, tile.maxY, options);
				right = null;
			}
			if (debug > 1) console.timeEnd("clipping");
			stack.push(tl || [], z + 1, x * 2, y * 2);
			stack.push(bl || [], z + 1, x * 2, y * 2 + 1);
			stack.push(tr || [], z + 1, x * 2 + 1, y * 2);
			stack.push(br || [], z + 1, x * 2 + 1, y * 2 + 1);
		}
	}
	getTile(z, x, y) {
		z = +z;
		x = +x;
		y = +y;
		const { extent, debug } = this.options;
		if (z < 0 || z > 24) return null;
		const z2 = 1 << z;
		x = x + z2 & z2 - 1;
		const id = toID(z, x, y);
		if (this.tiles[id]) return transformTile(this.tiles[id], extent);
		if (debug > 1) console.log("drilling down to z%d-%d-%d", z, x, y);
		let z0 = z;
		let x0 = x;
		let y0 = y;
		let parent;
		while (!parent && z0 > 0) {
			z0--;
			x0 = x0 >> 1;
			y0 = y0 >> 1;
			parent = this.tiles[toID(z0, x0, y0)];
		}
		if (!parent || !parent.source) return null;
		if (debug > 1) {
			console.log("found parent tile z%d-%d-%d", z0, x0, y0);
			console.time("drilling down");
		}
		this.splitTile(parent.source, z0, x0, y0, z, x, y);
		if (debug > 1) console.timeEnd("drilling down");
		return this.tiles[id] ? transformTile(this.tiles[id], extent) : null;
	}
};
function toID(z, x, y) {
	return ((1 << z) * y + x) * 32 + z;
}
function extend(dest, src) {
	for (const i in src) dest[i] = src[i];
	return dest;
}
function geojsonvt(data, options) {
	return new GeoJSONVT(data, options);
}
//#endregion
//#region node_modules/react-colorful/dist/index.mjs
function u() {
	return (u = Object.assign || function(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = arguments[r];
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		}
		return e;
	}).apply(this, arguments);
}
function c(e, r) {
	if (null == e) return {};
	var t, n, o = {}, a = Object.keys(e);
	for (n = 0; n < a.length; n++) r.indexOf(t = a[n]) >= 0 || (o[t] = e[t]);
	return o;
}
function i(e) {
	var t = (0, import_react.useRef)(e), n = (0, import_react.useRef)(function(e) {
		t.current && t.current(e);
	});
	return t.current = e, n.current;
}
var s = function(e, r, t) {
	return void 0 === r && (r = 0), void 0 === t && (t = 1), e > t ? t : e < r ? r : e;
}, f = function(e) {
	return "touches" in e;
}, v = function(e) {
	return e && e.ownerDocument.defaultView || self;
}, d = function(e, r, t) {
	var n = e.getBoundingClientRect(), o = f(r) ? function(e, r) {
		for (var t = 0; t < e.length; t++) if (e[t].identifier === r) return e[t];
		return e[0];
	}(r.touches, t) : r;
	return {
		left: s((o.pageX - (n.left + v(e).pageXOffset)) / n.width),
		top: s((o.pageY - (n.top + v(e).pageYOffset)) / n.height)
	};
}, h = function(e) {
	!f(e) && e.preventDefault();
}, m = import_react.memo(function(o) {
	var a = o.onMove, l = o.onKey, s = c(o, ["onMove", "onKey"]), m = (0, import_react.useRef)(null), g = i(a), p = i(l), b = (0, import_react.useRef)(null), _ = (0, import_react.useRef)(!1), x = (0, import_react.useMemo)(function() {
		var e = function(e) {
			h(e), (f(e) ? e.touches.length > 0 : e.buttons > 0) && m.current ? g(d(m.current, e, b.current)) : t(!1);
		}, r = function() {
			return t(!1);
		};
		function t(t) {
			var n = _.current, o = v(m.current), a = t ? o.addEventListener : o.removeEventListener;
			a(n ? "touchmove" : "mousemove", e), a(n ? "touchend" : "mouseup", r);
		}
		return [
			function(e) {
				var r = e.nativeEvent, n = m.current;
				if (n && (h(r), !function(e, r) {
					return r && !f(e);
				}(r, _.current) && n)) {
					if (f(r)) {
						_.current = !0;
						var o = r.changedTouches || [];
						o.length && (b.current = o[0].identifier);
					}
					n.focus(), g(d(n, r, b.current)), t(!0);
				}
			},
			function(e) {
				var r = e.which || e.keyCode;
				r < 37 || r > 40 || (e.preventDefault(), p({
					left: 39 === r ? .05 : 37 === r ? -.05 : 0,
					top: 40 === r ? .05 : 38 === r ? -.05 : 0
				}));
			},
			t
		];
	}, [p, g]), C = x[0], E = x[1], H = x[2];
	return (0, import_react.useEffect)(function() {
		return H;
	}, [H]), import_react.createElement("div", u({}, s, {
		onTouchStart: C,
		onMouseDown: C,
		className: "react-colorful__interactive",
		ref: m,
		onKeyDown: E,
		tabIndex: 0,
		role: "slider"
	}));
}), g = function(e) {
	return e.filter(Boolean).join(" ");
}, p = function(r) {
	var t = r.color, n = r.left, o = r.top, a = void 0 === o ? .5 : o, l = g(["react-colorful__pointer", r.className]);
	return import_react.createElement("div", {
		className: l,
		style: {
			top: 100 * a + "%",
			left: 100 * n + "%"
		}
	}, import_react.createElement("div", {
		className: "react-colorful__pointer-fill",
		style: { backgroundColor: t }
	}));
}, b = function(e, r, t) {
	return void 0 === r && (r = 0), void 0 === t && (t = Math.pow(10, r)), Math.round(t * e) / t;
};
360 / (2 * Math.PI);
var x = function(e) {
	return L(C(e));
}, C = function(e) {
	return "#" === e[0] && (e = e.substring(1)), e.length < 6 ? {
		r: parseInt(e[0] + e[0], 16),
		g: parseInt(e[1] + e[1], 16),
		b: parseInt(e[2] + e[2], 16),
		a: 4 === e.length ? b(parseInt(e[3] + e[3], 16) / 255, 2) : 1
	} : {
		r: parseInt(e.substring(0, 2), 16),
		g: parseInt(e.substring(2, 4), 16),
		b: parseInt(e.substring(4, 6), 16),
		a: 8 === e.length ? b(parseInt(e.substring(6, 8), 16) / 255, 2) : 1
	};
}, w = function(e) {
	return K(I(e));
}, y = function(e) {
	var r = e.s, t = e.v, n = e.a, o = (200 - r) * t / 100;
	return {
		h: b(e.h),
		s: b(o > 0 && o < 200 ? r * t / 100 / (o <= 100 ? o : 200 - o) * 100 : 0),
		l: b(o / 2),
		a: b(n, 2)
	};
}, q = function(e) {
	var r = y(e);
	return "hsl(" + r.h + ", " + r.s + "%, " + r.l + "%)";
}, I = function(e) {
	var r = e.h, t = e.s, n = e.v, o = e.a;
	r = r / 360 * 6, t /= 100, n /= 100;
	var a = Math.floor(r), l = n * (1 - t), u = n * (1 - (r - a) * t), c = n * (1 - (1 - r + a) * t), i = a % 6;
	return {
		r: b(255 * [
			n,
			u,
			l,
			l,
			c,
			n
		][i]),
		g: b(255 * [
			c,
			n,
			n,
			u,
			l,
			l
		][i]),
		b: b(255 * [
			l,
			l,
			c,
			n,
			n,
			u
		][i]),
		a: b(o, 2)
	};
}, D = function(e) {
	var r = e.toString(16);
	return r.length < 2 ? "0" + r : r;
}, K = function(e) {
	var r = e.r, t = e.g, n = e.b, o = e.a, a = o < 1 ? D(b(255 * o)) : "";
	return "#" + D(r) + D(t) + D(n) + a;
}, L = function(e) {
	var r = e.r, t = e.g, n = e.b, o = e.a, a = Math.max(r, t, n), l = a - Math.min(r, t, n), u = l ? a === r ? (t - n) / l : a === t ? 2 + (n - r) / l : 4 + (r - t) / l : 0;
	return {
		h: b(60 * (u < 0 ? u + 6 : u)),
		s: b(a ? l / a * 100 : 0),
		v: b(a / 255 * 100),
		a: o
	};
}, S = import_react.memo(function(r) {
	var t = r.hue, n = r.onChange, o = g(["react-colorful__hue", r.className]);
	return import_react.createElement("div", { className: o }, import_react.createElement(m, {
		onMove: function(e) {
			n({ h: 360 * e.left });
		},
		onKey: function(e) {
			n({ h: s(t + 360 * e.left, 0, 360) });
		},
		"aria-label": "Hue",
		"aria-valuenow": b(t),
		"aria-valuemax": "360",
		"aria-valuemin": "0"
	}, import_react.createElement(p, {
		className: "react-colorful__hue-pointer",
		left: t / 360,
		color: q({
			h: t,
			s: 100,
			v: 100,
			a: 1
		})
	})));
}), T = import_react.memo(function(r) {
	var t = r.hsva, n = r.onChange, o = { backgroundColor: q({
		h: t.h,
		s: 100,
		v: 100,
		a: 1
	}) };
	return import_react.createElement("div", {
		className: "react-colorful__saturation",
		style: o
	}, import_react.createElement(m, {
		onMove: function(e) {
			n({
				s: 100 * e.left,
				v: 100 - 100 * e.top
			});
		},
		onKey: function(e) {
			n({
				s: s(t.s + 100 * e.left, 0, 100),
				v: s(t.v - 100 * e.top, 0, 100)
			});
		},
		"aria-label": "Color",
		"aria-valuetext": "Saturation " + b(t.s) + "%, Brightness " + b(t.v) + "%"
	}, import_react.createElement(p, {
		className: "react-colorful__saturation-pointer",
		top: 1 - t.v / 100,
		left: t.s / 100,
		color: q(t)
	})));
}), F = function(e, r) {
	if (e === r) return !0;
	for (var t in e) if (e[t] !== r[t]) return !1;
	return !0;
}, X = function(e, r) {
	return e.toLowerCase() === r.toLowerCase() || F(C(e), C(r));
};
function Y(e, t, l) {
	var u = i(l), c = (0, import_react.useState)(function() {
		return e.toHsva(t);
	}), s = c[0], f = c[1], v = (0, import_react.useRef)({
		color: t,
		hsva: s
	});
	(0, import_react.useEffect)(function() {
		if (!e.equal(t, v.current.color)) {
			var r = e.toHsva(t);
			v.current = {
				hsva: r,
				color: t
			}, f(r);
		}
	}, [t, e]), (0, import_react.useEffect)(function() {
		var r;
		F(s, v.current.hsva) || e.equal(r = e.fromHsva(s), v.current.color) || (v.current = {
			hsva: s,
			color: r
		}, u(r));
	}, [
		s,
		e,
		u
	]);
	return [s, (0, import_react.useCallback)(function(e) {
		f(function(r) {
			return Object.assign({}, r, e);
		});
	}, [])];
}
var R, V = "undefined" != typeof window ? import_react.useLayoutEffect : import_react.useEffect, $ = function() {
	return R || ("undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : void 0);
}, J = /* @__PURE__ */ new Map(), Q = function(e) {
	V(function() {
		var r = e.current ? e.current.ownerDocument : document;
		if (void 0 !== r && !J.has(r)) {
			var t = r.createElement("style");
			t.innerHTML = ".react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:\"\";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill-opacity=\".05\"><path d=\"M8 0h8v8H8zM0 8h8v8H0z\"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}", J.set(r, t);
			var n = $();
			n && t.setAttribute("nonce", n), r.head.appendChild(t);
		}
	}, []);
}, U = function(t) {
	var n = t.className, o = t.colorModel, a = t.color, l = void 0 === a ? o.defaultColor : a, i = t.onChange, s = c(t, [
		"className",
		"colorModel",
		"color",
		"onChange"
	]), f = (0, import_react.useRef)(null);
	Q(f);
	var v = Y(o, l, i), d = v[0], h = v[1], m = g(["react-colorful", n]);
	return import_react.createElement("div", u({}, s, {
		ref: f,
		className: m
	}), import_react.createElement(T, {
		hsva: d,
		onChange: h
	}), import_react.createElement(S, {
		hue: d.h,
		onChange: h,
		className: "react-colorful__last-control"
	}));
}, W = {
	defaultColor: "000",
	toHsva: x,
	fromHsva: function(e) {
		return w({
			h: e.h,
			s: e.s,
			v: e.v,
			a: 1
		});
	},
	equal: X
}, Z = function(r) {
	return import_react.createElement(U, u({}, r, { colorModel: W }));
};
//#endregion
//#region node_modules/colorbrewer/index.es.js
var index = {
	schemeGroups: {
		sequential: [
			"BuGn",
			"BuPu",
			"GnBu",
			"OrRd",
			"PuBu",
			"PuBuGn",
			"PuRd",
			"RdPu",
			"YlGn",
			"YlGnBu",
			"YlOrBr",
			"YlOrRd"
		],
		singlehue: [
			"Blues",
			"Greens",
			"Greys",
			"Oranges",
			"Purples",
			"Reds"
		],
		diverging: [
			"BrBG",
			"PiYG",
			"PRGn",
			"PuOr",
			"RdBu",
			"RdGy",
			"RdYlBu",
			"RdYlGn",
			"Spectral"
		],
		qualitative: [
			"Accent",
			"Dark2",
			"Paired",
			"Pastel1",
			"Pastel2",
			"Set1",
			"Set2",
			"Set3"
		]
	},
	YlGn: {
		3: [
			"#f7fcb9",
			"#addd8e",
			"#31a354"
		],
		4: [
			"#ffffcc",
			"#c2e699",
			"#78c679",
			"#238443"
		],
		5: [
			"#ffffcc",
			"#c2e699",
			"#78c679",
			"#31a354",
			"#006837"
		],
		6: [
			"#ffffcc",
			"#d9f0a3",
			"#addd8e",
			"#78c679",
			"#31a354",
			"#006837"
		],
		7: [
			"#ffffcc",
			"#d9f0a3",
			"#addd8e",
			"#78c679",
			"#41ab5d",
			"#238443",
			"#005a32"
		],
		8: [
			"#ffffe5",
			"#f7fcb9",
			"#d9f0a3",
			"#addd8e",
			"#78c679",
			"#41ab5d",
			"#238443",
			"#005a32"
		],
		9: [
			"#ffffe5",
			"#f7fcb9",
			"#d9f0a3",
			"#addd8e",
			"#78c679",
			"#41ab5d",
			"#238443",
			"#006837",
			"#004529"
		]
	},
	YlGnBu: {
		3: [
			"#edf8b1",
			"#7fcdbb",
			"#2c7fb8"
		],
		4: [
			"#ffffcc",
			"#a1dab4",
			"#41b6c4",
			"#225ea8"
		],
		5: [
			"#ffffcc",
			"#a1dab4",
			"#41b6c4",
			"#2c7fb8",
			"#253494"
		],
		6: [
			"#ffffcc",
			"#c7e9b4",
			"#7fcdbb",
			"#41b6c4",
			"#2c7fb8",
			"#253494"
		],
		7: [
			"#ffffcc",
			"#c7e9b4",
			"#7fcdbb",
			"#41b6c4",
			"#1d91c0",
			"#225ea8",
			"#0c2c84"
		],
		8: [
			"#ffffd9",
			"#edf8b1",
			"#c7e9b4",
			"#7fcdbb",
			"#41b6c4",
			"#1d91c0",
			"#225ea8",
			"#0c2c84"
		],
		9: [
			"#ffffd9",
			"#edf8b1",
			"#c7e9b4",
			"#7fcdbb",
			"#41b6c4",
			"#1d91c0",
			"#225ea8",
			"#253494",
			"#081d58"
		]
	},
	GnBu: {
		3: [
			"#e0f3db",
			"#a8ddb5",
			"#43a2ca"
		],
		4: [
			"#f0f9e8",
			"#bae4bc",
			"#7bccc4",
			"#2b8cbe"
		],
		5: [
			"#f0f9e8",
			"#bae4bc",
			"#7bccc4",
			"#43a2ca",
			"#0868ac"
		],
		6: [
			"#f0f9e8",
			"#ccebc5",
			"#a8ddb5",
			"#7bccc4",
			"#43a2ca",
			"#0868ac"
		],
		7: [
			"#f0f9e8",
			"#ccebc5",
			"#a8ddb5",
			"#7bccc4",
			"#4eb3d3",
			"#2b8cbe",
			"#08589e"
		],
		8: [
			"#f7fcf0",
			"#e0f3db",
			"#ccebc5",
			"#a8ddb5",
			"#7bccc4",
			"#4eb3d3",
			"#2b8cbe",
			"#08589e"
		],
		9: [
			"#f7fcf0",
			"#e0f3db",
			"#ccebc5",
			"#a8ddb5",
			"#7bccc4",
			"#4eb3d3",
			"#2b8cbe",
			"#0868ac",
			"#084081"
		]
	},
	BuGn: {
		3: [
			"#e5f5f9",
			"#99d8c9",
			"#2ca25f"
		],
		4: [
			"#edf8fb",
			"#b2e2e2",
			"#66c2a4",
			"#238b45"
		],
		5: [
			"#edf8fb",
			"#b2e2e2",
			"#66c2a4",
			"#2ca25f",
			"#006d2c"
		],
		6: [
			"#edf8fb",
			"#ccece6",
			"#99d8c9",
			"#66c2a4",
			"#2ca25f",
			"#006d2c"
		],
		7: [
			"#edf8fb",
			"#ccece6",
			"#99d8c9",
			"#66c2a4",
			"#41ae76",
			"#238b45",
			"#005824"
		],
		8: [
			"#f7fcfd",
			"#e5f5f9",
			"#ccece6",
			"#99d8c9",
			"#66c2a4",
			"#41ae76",
			"#238b45",
			"#005824"
		],
		9: [
			"#f7fcfd",
			"#e5f5f9",
			"#ccece6",
			"#99d8c9",
			"#66c2a4",
			"#41ae76",
			"#238b45",
			"#006d2c",
			"#00441b"
		]
	},
	PuBuGn: {
		3: [
			"#ece2f0",
			"#a6bddb",
			"#1c9099"
		],
		4: [
			"#f6eff7",
			"#bdc9e1",
			"#67a9cf",
			"#02818a"
		],
		5: [
			"#f6eff7",
			"#bdc9e1",
			"#67a9cf",
			"#1c9099",
			"#016c59"
		],
		6: [
			"#f6eff7",
			"#d0d1e6",
			"#a6bddb",
			"#67a9cf",
			"#1c9099",
			"#016c59"
		],
		7: [
			"#f6eff7",
			"#d0d1e6",
			"#a6bddb",
			"#67a9cf",
			"#3690c0",
			"#02818a",
			"#016450"
		],
		8: [
			"#fff7fb",
			"#ece2f0",
			"#d0d1e6",
			"#a6bddb",
			"#67a9cf",
			"#3690c0",
			"#02818a",
			"#016450"
		],
		9: [
			"#fff7fb",
			"#ece2f0",
			"#d0d1e6",
			"#a6bddb",
			"#67a9cf",
			"#3690c0",
			"#02818a",
			"#016c59",
			"#014636"
		]
	},
	PuBu: {
		3: [
			"#ece7f2",
			"#a6bddb",
			"#2b8cbe"
		],
		4: [
			"#f1eef6",
			"#bdc9e1",
			"#74a9cf",
			"#0570b0"
		],
		5: [
			"#f1eef6",
			"#bdc9e1",
			"#74a9cf",
			"#2b8cbe",
			"#045a8d"
		],
		6: [
			"#f1eef6",
			"#d0d1e6",
			"#a6bddb",
			"#74a9cf",
			"#2b8cbe",
			"#045a8d"
		],
		7: [
			"#f1eef6",
			"#d0d1e6",
			"#a6bddb",
			"#74a9cf",
			"#3690c0",
			"#0570b0",
			"#034e7b"
		],
		8: [
			"#fff7fb",
			"#ece7f2",
			"#d0d1e6",
			"#a6bddb",
			"#74a9cf",
			"#3690c0",
			"#0570b0",
			"#034e7b"
		],
		9: [
			"#fff7fb",
			"#ece7f2",
			"#d0d1e6",
			"#a6bddb",
			"#74a9cf",
			"#3690c0",
			"#0570b0",
			"#045a8d",
			"#023858"
		]
	},
	BuPu: {
		3: [
			"#e0ecf4",
			"#9ebcda",
			"#8856a7"
		],
		4: [
			"#edf8fb",
			"#b3cde3",
			"#8c96c6",
			"#88419d"
		],
		5: [
			"#edf8fb",
			"#b3cde3",
			"#8c96c6",
			"#8856a7",
			"#810f7c"
		],
		6: [
			"#edf8fb",
			"#bfd3e6",
			"#9ebcda",
			"#8c96c6",
			"#8856a7",
			"#810f7c"
		],
		7: [
			"#edf8fb",
			"#bfd3e6",
			"#9ebcda",
			"#8c96c6",
			"#8c6bb1",
			"#88419d",
			"#6e016b"
		],
		8: [
			"#f7fcfd",
			"#e0ecf4",
			"#bfd3e6",
			"#9ebcda",
			"#8c96c6",
			"#8c6bb1",
			"#88419d",
			"#6e016b"
		],
		9: [
			"#f7fcfd",
			"#e0ecf4",
			"#bfd3e6",
			"#9ebcda",
			"#8c96c6",
			"#8c6bb1",
			"#88419d",
			"#810f7c",
			"#4d004b"
		]
	},
	RdPu: {
		3: [
			"#fde0dd",
			"#fa9fb5",
			"#c51b8a"
		],
		4: [
			"#feebe2",
			"#fbb4b9",
			"#f768a1",
			"#ae017e"
		],
		5: [
			"#feebe2",
			"#fbb4b9",
			"#f768a1",
			"#c51b8a",
			"#7a0177"
		],
		6: [
			"#feebe2",
			"#fcc5c0",
			"#fa9fb5",
			"#f768a1",
			"#c51b8a",
			"#7a0177"
		],
		7: [
			"#feebe2",
			"#fcc5c0",
			"#fa9fb5",
			"#f768a1",
			"#dd3497",
			"#ae017e",
			"#7a0177"
		],
		8: [
			"#fff7f3",
			"#fde0dd",
			"#fcc5c0",
			"#fa9fb5",
			"#f768a1",
			"#dd3497",
			"#ae017e",
			"#7a0177"
		],
		9: [
			"#fff7f3",
			"#fde0dd",
			"#fcc5c0",
			"#fa9fb5",
			"#f768a1",
			"#dd3497",
			"#ae017e",
			"#7a0177",
			"#49006a"
		]
	},
	PuRd: {
		3: [
			"#e7e1ef",
			"#c994c7",
			"#dd1c77"
		],
		4: [
			"#f1eef6",
			"#d7b5d8",
			"#df65b0",
			"#ce1256"
		],
		5: [
			"#f1eef6",
			"#d7b5d8",
			"#df65b0",
			"#dd1c77",
			"#980043"
		],
		6: [
			"#f1eef6",
			"#d4b9da",
			"#c994c7",
			"#df65b0",
			"#dd1c77",
			"#980043"
		],
		7: [
			"#f1eef6",
			"#d4b9da",
			"#c994c7",
			"#df65b0",
			"#e7298a",
			"#ce1256",
			"#91003f"
		],
		8: [
			"#f7f4f9",
			"#e7e1ef",
			"#d4b9da",
			"#c994c7",
			"#df65b0",
			"#e7298a",
			"#ce1256",
			"#91003f"
		],
		9: [
			"#f7f4f9",
			"#e7e1ef",
			"#d4b9da",
			"#c994c7",
			"#df65b0",
			"#e7298a",
			"#ce1256",
			"#980043",
			"#67001f"
		]
	},
	OrRd: {
		3: [
			"#fee8c8",
			"#fdbb84",
			"#e34a33"
		],
		4: [
			"#fef0d9",
			"#fdcc8a",
			"#fc8d59",
			"#d7301f"
		],
		5: [
			"#fef0d9",
			"#fdcc8a",
			"#fc8d59",
			"#e34a33",
			"#b30000"
		],
		6: [
			"#fef0d9",
			"#fdd49e",
			"#fdbb84",
			"#fc8d59",
			"#e34a33",
			"#b30000"
		],
		7: [
			"#fef0d9",
			"#fdd49e",
			"#fdbb84",
			"#fc8d59",
			"#ef6548",
			"#d7301f",
			"#990000"
		],
		8: [
			"#fff7ec",
			"#fee8c8",
			"#fdd49e",
			"#fdbb84",
			"#fc8d59",
			"#ef6548",
			"#d7301f",
			"#990000"
		],
		9: [
			"#fff7ec",
			"#fee8c8",
			"#fdd49e",
			"#fdbb84",
			"#fc8d59",
			"#ef6548",
			"#d7301f",
			"#b30000",
			"#7f0000"
		]
	},
	YlOrRd: {
		3: [
			"#ffeda0",
			"#feb24c",
			"#f03b20"
		],
		4: [
			"#ffffb2",
			"#fecc5c",
			"#fd8d3c",
			"#e31a1c"
		],
		5: [
			"#ffffb2",
			"#fecc5c",
			"#fd8d3c",
			"#f03b20",
			"#bd0026"
		],
		6: [
			"#ffffb2",
			"#fed976",
			"#feb24c",
			"#fd8d3c",
			"#f03b20",
			"#bd0026"
		],
		7: [
			"#ffffb2",
			"#fed976",
			"#feb24c",
			"#fd8d3c",
			"#fc4e2a",
			"#e31a1c",
			"#b10026"
		],
		8: [
			"#ffffcc",
			"#ffeda0",
			"#fed976",
			"#feb24c",
			"#fd8d3c",
			"#fc4e2a",
			"#e31a1c",
			"#b10026"
		],
		9: [
			"#ffffcc",
			"#ffeda0",
			"#fed976",
			"#feb24c",
			"#fd8d3c",
			"#fc4e2a",
			"#e31a1c",
			"#bd0026",
			"#800026"
		]
	},
	YlOrBr: {
		3: [
			"#fff7bc",
			"#fec44f",
			"#d95f0e"
		],
		4: [
			"#ffffd4",
			"#fed98e",
			"#fe9929",
			"#cc4c02"
		],
		5: [
			"#ffffd4",
			"#fed98e",
			"#fe9929",
			"#d95f0e",
			"#993404"
		],
		6: [
			"#ffffd4",
			"#fee391",
			"#fec44f",
			"#fe9929",
			"#d95f0e",
			"#993404"
		],
		7: [
			"#ffffd4",
			"#fee391",
			"#fec44f",
			"#fe9929",
			"#ec7014",
			"#cc4c02",
			"#8c2d04"
		],
		8: [
			"#ffffe5",
			"#fff7bc",
			"#fee391",
			"#fec44f",
			"#fe9929",
			"#ec7014",
			"#cc4c02",
			"#8c2d04"
		],
		9: [
			"#ffffe5",
			"#fff7bc",
			"#fee391",
			"#fec44f",
			"#fe9929",
			"#ec7014",
			"#cc4c02",
			"#993404",
			"#662506"
		]
	},
	Purples: {
		3: [
			"#efedf5",
			"#bcbddc",
			"#756bb1"
		],
		4: [
			"#f2f0f7",
			"#cbc9e2",
			"#9e9ac8",
			"#6a51a3"
		],
		5: [
			"#f2f0f7",
			"#cbc9e2",
			"#9e9ac8",
			"#756bb1",
			"#54278f"
		],
		6: [
			"#f2f0f7",
			"#dadaeb",
			"#bcbddc",
			"#9e9ac8",
			"#756bb1",
			"#54278f"
		],
		7: [
			"#f2f0f7",
			"#dadaeb",
			"#bcbddc",
			"#9e9ac8",
			"#807dba",
			"#6a51a3",
			"#4a1486"
		],
		8: [
			"#fcfbfd",
			"#efedf5",
			"#dadaeb",
			"#bcbddc",
			"#9e9ac8",
			"#807dba",
			"#6a51a3",
			"#4a1486"
		],
		9: [
			"#fcfbfd",
			"#efedf5",
			"#dadaeb",
			"#bcbddc",
			"#9e9ac8",
			"#807dba",
			"#6a51a3",
			"#54278f",
			"#3f007d"
		]
	},
	Blues: {
		3: [
			"#deebf7",
			"#9ecae1",
			"#3182bd"
		],
		4: [
			"#eff3ff",
			"#bdd7e7",
			"#6baed6",
			"#2171b5"
		],
		5: [
			"#eff3ff",
			"#bdd7e7",
			"#6baed6",
			"#3182bd",
			"#08519c"
		],
		6: [
			"#eff3ff",
			"#c6dbef",
			"#9ecae1",
			"#6baed6",
			"#3182bd",
			"#08519c"
		],
		7: [
			"#eff3ff",
			"#c6dbef",
			"#9ecae1",
			"#6baed6",
			"#4292c6",
			"#2171b5",
			"#084594"
		],
		8: [
			"#f7fbff",
			"#deebf7",
			"#c6dbef",
			"#9ecae1",
			"#6baed6",
			"#4292c6",
			"#2171b5",
			"#084594"
		],
		9: [
			"#f7fbff",
			"#deebf7",
			"#c6dbef",
			"#9ecae1",
			"#6baed6",
			"#4292c6",
			"#2171b5",
			"#08519c",
			"#08306b"
		]
	},
	Greens: {
		3: [
			"#e5f5e0",
			"#a1d99b",
			"#31a354"
		],
		4: [
			"#edf8e9",
			"#bae4b3",
			"#74c476",
			"#238b45"
		],
		5: [
			"#edf8e9",
			"#bae4b3",
			"#74c476",
			"#31a354",
			"#006d2c"
		],
		6: [
			"#edf8e9",
			"#c7e9c0",
			"#a1d99b",
			"#74c476",
			"#31a354",
			"#006d2c"
		],
		7: [
			"#edf8e9",
			"#c7e9c0",
			"#a1d99b",
			"#74c476",
			"#41ab5d",
			"#238b45",
			"#005a32"
		],
		8: [
			"#f7fcf5",
			"#e5f5e0",
			"#c7e9c0",
			"#a1d99b",
			"#74c476",
			"#41ab5d",
			"#238b45",
			"#005a32"
		],
		9: [
			"#f7fcf5",
			"#e5f5e0",
			"#c7e9c0",
			"#a1d99b",
			"#74c476",
			"#41ab5d",
			"#238b45",
			"#006d2c",
			"#00441b"
		]
	},
	Oranges: {
		3: [
			"#fee6ce",
			"#fdae6b",
			"#e6550d"
		],
		4: [
			"#feedde",
			"#fdbe85",
			"#fd8d3c",
			"#d94701"
		],
		5: [
			"#feedde",
			"#fdbe85",
			"#fd8d3c",
			"#e6550d",
			"#a63603"
		],
		6: [
			"#feedde",
			"#fdd0a2",
			"#fdae6b",
			"#fd8d3c",
			"#e6550d",
			"#a63603"
		],
		7: [
			"#feedde",
			"#fdd0a2",
			"#fdae6b",
			"#fd8d3c",
			"#f16913",
			"#d94801",
			"#8c2d04"
		],
		8: [
			"#fff5eb",
			"#fee6ce",
			"#fdd0a2",
			"#fdae6b",
			"#fd8d3c",
			"#f16913",
			"#d94801",
			"#8c2d04"
		],
		9: [
			"#fff5eb",
			"#fee6ce",
			"#fdd0a2",
			"#fdae6b",
			"#fd8d3c",
			"#f16913",
			"#d94801",
			"#a63603",
			"#7f2704"
		]
	},
	Reds: {
		3: [
			"#fee0d2",
			"#fc9272",
			"#de2d26"
		],
		4: [
			"#fee5d9",
			"#fcae91",
			"#fb6a4a",
			"#cb181d"
		],
		5: [
			"#fee5d9",
			"#fcae91",
			"#fb6a4a",
			"#de2d26",
			"#a50f15"
		],
		6: [
			"#fee5d9",
			"#fcbba1",
			"#fc9272",
			"#fb6a4a",
			"#de2d26",
			"#a50f15"
		],
		7: [
			"#fee5d9",
			"#fcbba1",
			"#fc9272",
			"#fb6a4a",
			"#ef3b2c",
			"#cb181d",
			"#99000d"
		],
		8: [
			"#fff5f0",
			"#fee0d2",
			"#fcbba1",
			"#fc9272",
			"#fb6a4a",
			"#ef3b2c",
			"#cb181d",
			"#99000d"
		],
		9: [
			"#fff5f0",
			"#fee0d2",
			"#fcbba1",
			"#fc9272",
			"#fb6a4a",
			"#ef3b2c",
			"#cb181d",
			"#a50f15",
			"#67000d"
		]
	},
	Greys: {
		3: [
			"#f0f0f0",
			"#bdbdbd",
			"#636363"
		],
		4: [
			"#f7f7f7",
			"#cccccc",
			"#969696",
			"#525252"
		],
		5: [
			"#f7f7f7",
			"#cccccc",
			"#969696",
			"#636363",
			"#252525"
		],
		6: [
			"#f7f7f7",
			"#d9d9d9",
			"#bdbdbd",
			"#969696",
			"#636363",
			"#252525"
		],
		7: [
			"#f7f7f7",
			"#d9d9d9",
			"#bdbdbd",
			"#969696",
			"#737373",
			"#525252",
			"#252525"
		],
		8: [
			"#ffffff",
			"#f0f0f0",
			"#d9d9d9",
			"#bdbdbd",
			"#969696",
			"#737373",
			"#525252",
			"#252525"
		],
		9: [
			"#ffffff",
			"#f0f0f0",
			"#d9d9d9",
			"#bdbdbd",
			"#969696",
			"#737373",
			"#525252",
			"#252525",
			"#000000"
		]
	},
	PuOr: {
		3: [
			"#f1a340",
			"#f7f7f7",
			"#998ec3"
		],
		4: [
			"#e66101",
			"#fdb863",
			"#b2abd2",
			"#5e3c99"
		],
		5: [
			"#e66101",
			"#fdb863",
			"#f7f7f7",
			"#b2abd2",
			"#5e3c99"
		],
		6: [
			"#b35806",
			"#f1a340",
			"#fee0b6",
			"#d8daeb",
			"#998ec3",
			"#542788"
		],
		7: [
			"#b35806",
			"#f1a340",
			"#fee0b6",
			"#f7f7f7",
			"#d8daeb",
			"#998ec3",
			"#542788"
		],
		8: [
			"#b35806",
			"#e08214",
			"#fdb863",
			"#fee0b6",
			"#d8daeb",
			"#b2abd2",
			"#8073ac",
			"#542788"
		],
		9: [
			"#b35806",
			"#e08214",
			"#fdb863",
			"#fee0b6",
			"#f7f7f7",
			"#d8daeb",
			"#b2abd2",
			"#8073ac",
			"#542788"
		],
		10: [
			"#7f3b08",
			"#b35806",
			"#e08214",
			"#fdb863",
			"#fee0b6",
			"#d8daeb",
			"#b2abd2",
			"#8073ac",
			"#542788",
			"#2d004b"
		],
		11: [
			"#7f3b08",
			"#b35806",
			"#e08214",
			"#fdb863",
			"#fee0b6",
			"#f7f7f7",
			"#d8daeb",
			"#b2abd2",
			"#8073ac",
			"#542788",
			"#2d004b"
		]
	},
	BrBG: {
		3: [
			"#d8b365",
			"#f5f5f5",
			"#5ab4ac"
		],
		4: [
			"#a6611a",
			"#dfc27d",
			"#80cdc1",
			"#018571"
		],
		5: [
			"#a6611a",
			"#dfc27d",
			"#f5f5f5",
			"#80cdc1",
			"#018571"
		],
		6: [
			"#8c510a",
			"#d8b365",
			"#f6e8c3",
			"#c7eae5",
			"#5ab4ac",
			"#01665e"
		],
		7: [
			"#8c510a",
			"#d8b365",
			"#f6e8c3",
			"#f5f5f5",
			"#c7eae5",
			"#5ab4ac",
			"#01665e"
		],
		8: [
			"#8c510a",
			"#bf812d",
			"#dfc27d",
			"#f6e8c3",
			"#c7eae5",
			"#80cdc1",
			"#35978f",
			"#01665e"
		],
		9: [
			"#8c510a",
			"#bf812d",
			"#dfc27d",
			"#f6e8c3",
			"#f5f5f5",
			"#c7eae5",
			"#80cdc1",
			"#35978f",
			"#01665e"
		],
		10: [
			"#543005",
			"#8c510a",
			"#bf812d",
			"#dfc27d",
			"#f6e8c3",
			"#c7eae5",
			"#80cdc1",
			"#35978f",
			"#01665e",
			"#003c30"
		],
		11: [
			"#543005",
			"#8c510a",
			"#bf812d",
			"#dfc27d",
			"#f6e8c3",
			"#f5f5f5",
			"#c7eae5",
			"#80cdc1",
			"#35978f",
			"#01665e",
			"#003c30"
		]
	},
	PRGn: {
		3: [
			"#af8dc3",
			"#f7f7f7",
			"#7fbf7b"
		],
		4: [
			"#7b3294",
			"#c2a5cf",
			"#a6dba0",
			"#008837"
		],
		5: [
			"#7b3294",
			"#c2a5cf",
			"#f7f7f7",
			"#a6dba0",
			"#008837"
		],
		6: [
			"#762a83",
			"#af8dc3",
			"#e7d4e8",
			"#d9f0d3",
			"#7fbf7b",
			"#1b7837"
		],
		7: [
			"#762a83",
			"#af8dc3",
			"#e7d4e8",
			"#f7f7f7",
			"#d9f0d3",
			"#7fbf7b",
			"#1b7837"
		],
		8: [
			"#762a83",
			"#9970ab",
			"#c2a5cf",
			"#e7d4e8",
			"#d9f0d3",
			"#a6dba0",
			"#5aae61",
			"#1b7837"
		],
		9: [
			"#762a83",
			"#9970ab",
			"#c2a5cf",
			"#e7d4e8",
			"#f7f7f7",
			"#d9f0d3",
			"#a6dba0",
			"#5aae61",
			"#1b7837"
		],
		10: [
			"#40004b",
			"#762a83",
			"#9970ab",
			"#c2a5cf",
			"#e7d4e8",
			"#d9f0d3",
			"#a6dba0",
			"#5aae61",
			"#1b7837",
			"#00441b"
		],
		11: [
			"#40004b",
			"#762a83",
			"#9970ab",
			"#c2a5cf",
			"#e7d4e8",
			"#f7f7f7",
			"#d9f0d3",
			"#a6dba0",
			"#5aae61",
			"#1b7837",
			"#00441b"
		]
	},
	PiYG: {
		3: [
			"#e9a3c9",
			"#f7f7f7",
			"#a1d76a"
		],
		4: [
			"#d01c8b",
			"#f1b6da",
			"#b8e186",
			"#4dac26"
		],
		5: [
			"#d01c8b",
			"#f1b6da",
			"#f7f7f7",
			"#b8e186",
			"#4dac26"
		],
		6: [
			"#c51b7d",
			"#e9a3c9",
			"#fde0ef",
			"#e6f5d0",
			"#a1d76a",
			"#4d9221"
		],
		7: [
			"#c51b7d",
			"#e9a3c9",
			"#fde0ef",
			"#f7f7f7",
			"#e6f5d0",
			"#a1d76a",
			"#4d9221"
		],
		8: [
			"#c51b7d",
			"#de77ae",
			"#f1b6da",
			"#fde0ef",
			"#e6f5d0",
			"#b8e186",
			"#7fbc41",
			"#4d9221"
		],
		9: [
			"#c51b7d",
			"#de77ae",
			"#f1b6da",
			"#fde0ef",
			"#f7f7f7",
			"#e6f5d0",
			"#b8e186",
			"#7fbc41",
			"#4d9221"
		],
		10: [
			"#8e0152",
			"#c51b7d",
			"#de77ae",
			"#f1b6da",
			"#fde0ef",
			"#e6f5d0",
			"#b8e186",
			"#7fbc41",
			"#4d9221",
			"#276419"
		],
		11: [
			"#8e0152",
			"#c51b7d",
			"#de77ae",
			"#f1b6da",
			"#fde0ef",
			"#f7f7f7",
			"#e6f5d0",
			"#b8e186",
			"#7fbc41",
			"#4d9221",
			"#276419"
		]
	},
	RdBu: {
		3: [
			"#ef8a62",
			"#f7f7f7",
			"#67a9cf"
		],
		4: [
			"#ca0020",
			"#f4a582",
			"#92c5de",
			"#0571b0"
		],
		5: [
			"#ca0020",
			"#f4a582",
			"#f7f7f7",
			"#92c5de",
			"#0571b0"
		],
		6: [
			"#b2182b",
			"#ef8a62",
			"#fddbc7",
			"#d1e5f0",
			"#67a9cf",
			"#2166ac"
		],
		7: [
			"#b2182b",
			"#ef8a62",
			"#fddbc7",
			"#f7f7f7",
			"#d1e5f0",
			"#67a9cf",
			"#2166ac"
		],
		8: [
			"#b2182b",
			"#d6604d",
			"#f4a582",
			"#fddbc7",
			"#d1e5f0",
			"#92c5de",
			"#4393c3",
			"#2166ac"
		],
		9: [
			"#b2182b",
			"#d6604d",
			"#f4a582",
			"#fddbc7",
			"#f7f7f7",
			"#d1e5f0",
			"#92c5de",
			"#4393c3",
			"#2166ac"
		],
		10: [
			"#67001f",
			"#b2182b",
			"#d6604d",
			"#f4a582",
			"#fddbc7",
			"#d1e5f0",
			"#92c5de",
			"#4393c3",
			"#2166ac",
			"#053061"
		],
		11: [
			"#67001f",
			"#b2182b",
			"#d6604d",
			"#f4a582",
			"#fddbc7",
			"#f7f7f7",
			"#d1e5f0",
			"#92c5de",
			"#4393c3",
			"#2166ac",
			"#053061"
		]
	},
	RdGy: {
		3: [
			"#ef8a62",
			"#ffffff",
			"#999999"
		],
		4: [
			"#ca0020",
			"#f4a582",
			"#bababa",
			"#404040"
		],
		5: [
			"#ca0020",
			"#f4a582",
			"#ffffff",
			"#bababa",
			"#404040"
		],
		6: [
			"#b2182b",
			"#ef8a62",
			"#fddbc7",
			"#e0e0e0",
			"#999999",
			"#4d4d4d"
		],
		7: [
			"#b2182b",
			"#ef8a62",
			"#fddbc7",
			"#ffffff",
			"#e0e0e0",
			"#999999",
			"#4d4d4d"
		],
		8: [
			"#b2182b",
			"#d6604d",
			"#f4a582",
			"#fddbc7",
			"#e0e0e0",
			"#bababa",
			"#878787",
			"#4d4d4d"
		],
		9: [
			"#b2182b",
			"#d6604d",
			"#f4a582",
			"#fddbc7",
			"#ffffff",
			"#e0e0e0",
			"#bababa",
			"#878787",
			"#4d4d4d"
		],
		10: [
			"#67001f",
			"#b2182b",
			"#d6604d",
			"#f4a582",
			"#fddbc7",
			"#e0e0e0",
			"#bababa",
			"#878787",
			"#4d4d4d",
			"#1a1a1a"
		],
		11: [
			"#67001f",
			"#b2182b",
			"#d6604d",
			"#f4a582",
			"#fddbc7",
			"#ffffff",
			"#e0e0e0",
			"#bababa",
			"#878787",
			"#4d4d4d",
			"#1a1a1a"
		]
	},
	RdYlBu: {
		3: [
			"#fc8d59",
			"#ffffbf",
			"#91bfdb"
		],
		4: [
			"#d7191c",
			"#fdae61",
			"#abd9e9",
			"#2c7bb6"
		],
		5: [
			"#d7191c",
			"#fdae61",
			"#ffffbf",
			"#abd9e9",
			"#2c7bb6"
		],
		6: [
			"#d73027",
			"#fc8d59",
			"#fee090",
			"#e0f3f8",
			"#91bfdb",
			"#4575b4"
		],
		7: [
			"#d73027",
			"#fc8d59",
			"#fee090",
			"#ffffbf",
			"#e0f3f8",
			"#91bfdb",
			"#4575b4"
		],
		8: [
			"#d73027",
			"#f46d43",
			"#fdae61",
			"#fee090",
			"#e0f3f8",
			"#abd9e9",
			"#74add1",
			"#4575b4"
		],
		9: [
			"#d73027",
			"#f46d43",
			"#fdae61",
			"#fee090",
			"#ffffbf",
			"#e0f3f8",
			"#abd9e9",
			"#74add1",
			"#4575b4"
		],
		10: [
			"#a50026",
			"#d73027",
			"#f46d43",
			"#fdae61",
			"#fee090",
			"#e0f3f8",
			"#abd9e9",
			"#74add1",
			"#4575b4",
			"#313695"
		],
		11: [
			"#a50026",
			"#d73027",
			"#f46d43",
			"#fdae61",
			"#fee090",
			"#ffffbf",
			"#e0f3f8",
			"#abd9e9",
			"#74add1",
			"#4575b4",
			"#313695"
		]
	},
	Spectral: {
		3: [
			"#fc8d59",
			"#ffffbf",
			"#99d594"
		],
		4: [
			"#d7191c",
			"#fdae61",
			"#abdda4",
			"#2b83ba"
		],
		5: [
			"#d7191c",
			"#fdae61",
			"#ffffbf",
			"#abdda4",
			"#2b83ba"
		],
		6: [
			"#d53e4f",
			"#fc8d59",
			"#fee08b",
			"#e6f598",
			"#99d594",
			"#3288bd"
		],
		7: [
			"#d53e4f",
			"#fc8d59",
			"#fee08b",
			"#ffffbf",
			"#e6f598",
			"#99d594",
			"#3288bd"
		],
		8: [
			"#d53e4f",
			"#f46d43",
			"#fdae61",
			"#fee08b",
			"#e6f598",
			"#abdda4",
			"#66c2a5",
			"#3288bd"
		],
		9: [
			"#d53e4f",
			"#f46d43",
			"#fdae61",
			"#fee08b",
			"#ffffbf",
			"#e6f598",
			"#abdda4",
			"#66c2a5",
			"#3288bd"
		],
		10: [
			"#9e0142",
			"#d53e4f",
			"#f46d43",
			"#fdae61",
			"#fee08b",
			"#e6f598",
			"#abdda4",
			"#66c2a5",
			"#3288bd",
			"#5e4fa2"
		],
		11: [
			"#9e0142",
			"#d53e4f",
			"#f46d43",
			"#fdae61",
			"#fee08b",
			"#ffffbf",
			"#e6f598",
			"#abdda4",
			"#66c2a5",
			"#3288bd",
			"#5e4fa2"
		]
	},
	RdYlGn: {
		3: [
			"#fc8d59",
			"#ffffbf",
			"#91cf60"
		],
		4: [
			"#d7191c",
			"#fdae61",
			"#a6d96a",
			"#1a9641"
		],
		5: [
			"#d7191c",
			"#fdae61",
			"#ffffbf",
			"#a6d96a",
			"#1a9641"
		],
		6: [
			"#d73027",
			"#fc8d59",
			"#fee08b",
			"#d9ef8b",
			"#91cf60",
			"#1a9850"
		],
		7: [
			"#d73027",
			"#fc8d59",
			"#fee08b",
			"#ffffbf",
			"#d9ef8b",
			"#91cf60",
			"#1a9850"
		],
		8: [
			"#d73027",
			"#f46d43",
			"#fdae61",
			"#fee08b",
			"#d9ef8b",
			"#a6d96a",
			"#66bd63",
			"#1a9850"
		],
		9: [
			"#d73027",
			"#f46d43",
			"#fdae61",
			"#fee08b",
			"#ffffbf",
			"#d9ef8b",
			"#a6d96a",
			"#66bd63",
			"#1a9850"
		],
		10: [
			"#a50026",
			"#d73027",
			"#f46d43",
			"#fdae61",
			"#fee08b",
			"#d9ef8b",
			"#a6d96a",
			"#66bd63",
			"#1a9850",
			"#006837"
		],
		11: [
			"#a50026",
			"#d73027",
			"#f46d43",
			"#fdae61",
			"#fee08b",
			"#ffffbf",
			"#d9ef8b",
			"#a6d96a",
			"#66bd63",
			"#1a9850",
			"#006837"
		]
	},
	Accent: {
		3: [
			"#7fc97f",
			"#beaed4",
			"#fdc086"
		],
		4: [
			"#7fc97f",
			"#beaed4",
			"#fdc086",
			"#ffff99"
		],
		5: [
			"#7fc97f",
			"#beaed4",
			"#fdc086",
			"#ffff99",
			"#386cb0"
		],
		6: [
			"#7fc97f",
			"#beaed4",
			"#fdc086",
			"#ffff99",
			"#386cb0",
			"#f0027f"
		],
		7: [
			"#7fc97f",
			"#beaed4",
			"#fdc086",
			"#ffff99",
			"#386cb0",
			"#f0027f",
			"#bf5b17"
		],
		8: [
			"#7fc97f",
			"#beaed4",
			"#fdc086",
			"#ffff99",
			"#386cb0",
			"#f0027f",
			"#bf5b17",
			"#666666"
		]
	},
	Dark2: {
		3: [
			"#1b9e77",
			"#d95f02",
			"#7570b3"
		],
		4: [
			"#1b9e77",
			"#d95f02",
			"#7570b3",
			"#e7298a"
		],
		5: [
			"#1b9e77",
			"#d95f02",
			"#7570b3",
			"#e7298a",
			"#66a61e"
		],
		6: [
			"#1b9e77",
			"#d95f02",
			"#7570b3",
			"#e7298a",
			"#66a61e",
			"#e6ab02"
		],
		7: [
			"#1b9e77",
			"#d95f02",
			"#7570b3",
			"#e7298a",
			"#66a61e",
			"#e6ab02",
			"#a6761d"
		],
		8: [
			"#1b9e77",
			"#d95f02",
			"#7570b3",
			"#e7298a",
			"#66a61e",
			"#e6ab02",
			"#a6761d",
			"#666666"
		]
	},
	Paired: {
		3: [
			"#a6cee3",
			"#1f78b4",
			"#b2df8a"
		],
		4: [
			"#a6cee3",
			"#1f78b4",
			"#b2df8a",
			"#33a02c"
		],
		5: [
			"#a6cee3",
			"#1f78b4",
			"#b2df8a",
			"#33a02c",
			"#fb9a99"
		],
		6: [
			"#a6cee3",
			"#1f78b4",
			"#b2df8a",
			"#33a02c",
			"#fb9a99",
			"#e31a1c"
		],
		7: [
			"#a6cee3",
			"#1f78b4",
			"#b2df8a",
			"#33a02c",
			"#fb9a99",
			"#e31a1c",
			"#fdbf6f"
		],
		8: [
			"#a6cee3",
			"#1f78b4",
			"#b2df8a",
			"#33a02c",
			"#fb9a99",
			"#e31a1c",
			"#fdbf6f",
			"#ff7f00"
		],
		9: [
			"#a6cee3",
			"#1f78b4",
			"#b2df8a",
			"#33a02c",
			"#fb9a99",
			"#e31a1c",
			"#fdbf6f",
			"#ff7f00",
			"#cab2d6"
		],
		10: [
			"#a6cee3",
			"#1f78b4",
			"#b2df8a",
			"#33a02c",
			"#fb9a99",
			"#e31a1c",
			"#fdbf6f",
			"#ff7f00",
			"#cab2d6",
			"#6a3d9a"
		],
		11: [
			"#a6cee3",
			"#1f78b4",
			"#b2df8a",
			"#33a02c",
			"#fb9a99",
			"#e31a1c",
			"#fdbf6f",
			"#ff7f00",
			"#cab2d6",
			"#6a3d9a",
			"#ffff99"
		],
		12: [
			"#a6cee3",
			"#1f78b4",
			"#b2df8a",
			"#33a02c",
			"#fb9a99",
			"#e31a1c",
			"#fdbf6f",
			"#ff7f00",
			"#cab2d6",
			"#6a3d9a",
			"#ffff99",
			"#b15928"
		]
	},
	Pastel1: {
		3: [
			"#fbb4ae",
			"#b3cde3",
			"#ccebc5"
		],
		4: [
			"#fbb4ae",
			"#b3cde3",
			"#ccebc5",
			"#decbe4"
		],
		5: [
			"#fbb4ae",
			"#b3cde3",
			"#ccebc5",
			"#decbe4",
			"#fed9a6"
		],
		6: [
			"#fbb4ae",
			"#b3cde3",
			"#ccebc5",
			"#decbe4",
			"#fed9a6",
			"#ffffcc"
		],
		7: [
			"#fbb4ae",
			"#b3cde3",
			"#ccebc5",
			"#decbe4",
			"#fed9a6",
			"#ffffcc",
			"#e5d8bd"
		],
		8: [
			"#fbb4ae",
			"#b3cde3",
			"#ccebc5",
			"#decbe4",
			"#fed9a6",
			"#ffffcc",
			"#e5d8bd",
			"#fddaec"
		],
		9: [
			"#fbb4ae",
			"#b3cde3",
			"#ccebc5",
			"#decbe4",
			"#fed9a6",
			"#ffffcc",
			"#e5d8bd",
			"#fddaec",
			"#f2f2f2"
		]
	},
	Pastel2: {
		3: [
			"#b3e2cd",
			"#fdcdac",
			"#cbd5e8"
		],
		4: [
			"#b3e2cd",
			"#fdcdac",
			"#cbd5e8",
			"#f4cae4"
		],
		5: [
			"#b3e2cd",
			"#fdcdac",
			"#cbd5e8",
			"#f4cae4",
			"#e6f5c9"
		],
		6: [
			"#b3e2cd",
			"#fdcdac",
			"#cbd5e8",
			"#f4cae4",
			"#e6f5c9",
			"#fff2ae"
		],
		7: [
			"#b3e2cd",
			"#fdcdac",
			"#cbd5e8",
			"#f4cae4",
			"#e6f5c9",
			"#fff2ae",
			"#f1e2cc"
		],
		8: [
			"#b3e2cd",
			"#fdcdac",
			"#cbd5e8",
			"#f4cae4",
			"#e6f5c9",
			"#fff2ae",
			"#f1e2cc",
			"#cccccc"
		]
	},
	Set1: {
		3: [
			"#e41a1c",
			"#377eb8",
			"#4daf4a"
		],
		4: [
			"#e41a1c",
			"#377eb8",
			"#4daf4a",
			"#984ea3"
		],
		5: [
			"#e41a1c",
			"#377eb8",
			"#4daf4a",
			"#984ea3",
			"#ff7f00"
		],
		6: [
			"#e41a1c",
			"#377eb8",
			"#4daf4a",
			"#984ea3",
			"#ff7f00",
			"#ffff33"
		],
		7: [
			"#e41a1c",
			"#377eb8",
			"#4daf4a",
			"#984ea3",
			"#ff7f00",
			"#ffff33",
			"#a65628"
		],
		8: [
			"#e41a1c",
			"#377eb8",
			"#4daf4a",
			"#984ea3",
			"#ff7f00",
			"#ffff33",
			"#a65628",
			"#f781bf"
		],
		9: [
			"#e41a1c",
			"#377eb8",
			"#4daf4a",
			"#984ea3",
			"#ff7f00",
			"#ffff33",
			"#a65628",
			"#f781bf",
			"#999999"
		]
	},
	Set2: {
		3: [
			"#66c2a5",
			"#fc8d62",
			"#8da0cb"
		],
		4: [
			"#66c2a5",
			"#fc8d62",
			"#8da0cb",
			"#e78ac3"
		],
		5: [
			"#66c2a5",
			"#fc8d62",
			"#8da0cb",
			"#e78ac3",
			"#a6d854"
		],
		6: [
			"#66c2a5",
			"#fc8d62",
			"#8da0cb",
			"#e78ac3",
			"#a6d854",
			"#ffd92f"
		],
		7: [
			"#66c2a5",
			"#fc8d62",
			"#8da0cb",
			"#e78ac3",
			"#a6d854",
			"#ffd92f",
			"#e5c494"
		],
		8: [
			"#66c2a5",
			"#fc8d62",
			"#8da0cb",
			"#e78ac3",
			"#a6d854",
			"#ffd92f",
			"#e5c494",
			"#b3b3b3"
		]
	},
	Set3: {
		3: [
			"#8dd3c7",
			"#ffffb3",
			"#bebada"
		],
		4: [
			"#8dd3c7",
			"#ffffb3",
			"#bebada",
			"#fb8072"
		],
		5: [
			"#8dd3c7",
			"#ffffb3",
			"#bebada",
			"#fb8072",
			"#80b1d3"
		],
		6: [
			"#8dd3c7",
			"#ffffb3",
			"#bebada",
			"#fb8072",
			"#80b1d3",
			"#fdb462"
		],
		7: [
			"#8dd3c7",
			"#ffffb3",
			"#bebada",
			"#fb8072",
			"#80b1d3",
			"#fdb462",
			"#b3de69"
		],
		8: [
			"#8dd3c7",
			"#ffffb3",
			"#bebada",
			"#fb8072",
			"#80b1d3",
			"#fdb462",
			"#b3de69",
			"#fccde5"
		],
		9: [
			"#8dd3c7",
			"#ffffb3",
			"#bebada",
			"#fb8072",
			"#80b1d3",
			"#fdb462",
			"#b3de69",
			"#fccde5",
			"#d9d9d9"
		],
		10: [
			"#8dd3c7",
			"#ffffb3",
			"#bebada",
			"#fb8072",
			"#80b1d3",
			"#fdb462",
			"#b3de69",
			"#fccde5",
			"#d9d9d9",
			"#bc80bd"
		],
		11: [
			"#8dd3c7",
			"#ffffb3",
			"#bebada",
			"#fb8072",
			"#80b1d3",
			"#fdb462",
			"#b3de69",
			"#fccde5",
			"#d9d9d9",
			"#bc80bd",
			"#ccebc5"
		],
		12: [
			"#8dd3c7",
			"#ffffb3",
			"#bebada",
			"#fb8072",
			"#80b1d3",
			"#fdb462",
			"#b3de69",
			"#fccde5",
			"#d9d9d9",
			"#bc80bd",
			"#ccebc5",
			"#ffed6f"
		]
	}
};
//#endregion
//#region node_modules/stickybits/dist/stickybits.es.js
/**
stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
@version v3.7.11
@link https://github.com/yowainwright/stickybits#readme
@author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
@license MIT
**/
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
var Stickybits = /* @__PURE__ */ function() {
	function Stickybits(target, obj) {
		var _this = this;
		var o = typeof obj !== "undefined" ? obj : {};
		this.version = "3.7.11";
		this.userAgent = window.navigator.userAgent || "no `userAgent` provided by the browser";
		this.props = {
			customStickyChangeNumber: o.customStickyChangeNumber || null,
			noStyles: o.noStyles || false,
			stickyBitStickyOffset: o.stickyBitStickyOffset || 0,
			parentClass: o.parentClass || "js-stickybit-parent",
			scrollEl: typeof o.scrollEl === "string" ? document.querySelector(o.scrollEl) : o.scrollEl || window,
			stickyClass: o.stickyClass || "js-is-sticky",
			stuckClass: o.stuckClass || "js-is-stuck",
			stickyChangeClass: o.stickyChangeClass || "js-is-sticky--change",
			useStickyClasses: o.useStickyClasses || false,
			useFixed: o.useFixed || false,
			useGetBoundingClientRect: o.useGetBoundingClientRect || false,
			verticalPosition: o.verticalPosition || "top",
			applyStyle: o.applyStyle || function(item, style) {
				return _this.applyStyle(item, style);
			}
		};
		this.props.positionVal = this.definePosition() || "fixed";
		this.instances = [];
		var _this$props = this.props, positionVal = _this$props.positionVal, verticalPosition = _this$props.verticalPosition, noStyles = _this$props.noStyles, stickyBitStickyOffset = _this$props.stickyBitStickyOffset;
		var verticalPositionStyle = verticalPosition === "top" && !noStyles ? stickyBitStickyOffset + "px" : "";
		var positionStyle = positionVal !== "fixed" ? positionVal : "";
		this.els = typeof target === "string" ? document.querySelectorAll(target) : target;
		if (!("length" in this.els)) this.els = [this.els];
		for (var i = 0; i < this.els.length; i++) {
			var _styles;
			var el = this.els[i];
			var instance = this.addInstance(el, this.props);
			this.props.applyStyle({
				styles: (_styles = {}, _styles[verticalPosition] = verticalPositionStyle, _styles.position = positionStyle, _styles),
				classes: {}
			}, instance);
			this.manageState(instance);
			this.instances.push(instance);
		}
	}
	var _proto = Stickybits.prototype;
	_proto.definePosition = function definePosition() {
		var stickyProp;
		if (this.props.useFixed) stickyProp = "fixed";
		else {
			var prefix = [
				"",
				"-o-",
				"-webkit-",
				"-moz-",
				"-ms-"
			];
			var test = document.head.style;
			for (var i = 0; i < prefix.length; i += 1) test.position = prefix[i] + "sticky";
			stickyProp = test.position ? test.position : "fixed";
			test.position = "";
		}
		return stickyProp;
	};
	_proto.addInstance = function addInstance(el, props) {
		var _this2 = this;
		var item = {
			el,
			parent: el.parentNode,
			props
		};
		if (props.positionVal === "fixed" || props.useStickyClasses) {
			this.isWin = this.props.scrollEl === window;
			var se = this.isWin ? window : this.getClosestParent(item.el, item.props.scrollEl);
			this.computeScrollOffsets(item);
			this.toggleClasses(item.parent, "", props.parentClass);
			item.state = "default";
			item.stateChange = "default";
			item.stateContainer = function() {
				return _this2.manageState(item);
			};
			se.addEventListener("scroll", item.stateContainer);
		}
		return item;
	};
	_proto.getClosestParent = function getClosestParent(el, match) {
		var p = match;
		var e = el;
		if (e.parentElement === p) return p;
		while (e.parentElement !== p) e = e.parentElement;
		return p;
	};
	_proto.getTopPosition = function getTopPosition(el) {
		if (this.props.useGetBoundingClientRect) return el.getBoundingClientRect().top + (this.props.scrollEl.pageYOffset || document.documentElement.scrollTop);
		var topPosition = 0;
		do
			topPosition = el.offsetTop + topPosition;
		while (el = el.offsetParent);
		return topPosition;
	};
	_proto.computeScrollOffsets = function computeScrollOffsets(item) {
		var it = item;
		var p = it.props;
		var el = it.el;
		var parent = it.parent;
		var isCustom = !this.isWin && p.positionVal === "fixed";
		var isTop = p.verticalPosition !== "bottom";
		var scrollElOffset = isCustom ? this.getTopPosition(p.scrollEl) : 0;
		var stickyStart = isCustom ? this.getTopPosition(parent) - scrollElOffset : this.getTopPosition(parent);
		var stickyChangeOffset = p.customStickyChangeNumber !== null ? p.customStickyChangeNumber : el.offsetHeight;
		var parentBottom = stickyStart + parent.offsetHeight;
		it.offset = !isCustom ? scrollElOffset + p.stickyBitStickyOffset : 0;
		it.stickyStart = isTop ? stickyStart - it.offset : 0;
		it.stickyChange = it.stickyStart + stickyChangeOffset;
		it.stickyStop = isTop ? parentBottom - (el.offsetHeight + it.offset) : parentBottom - window.innerHeight;
	};
	_proto.toggleClasses = function toggleClasses(el, r, a) {
		var e = el;
		var cArray = e.className.split(" ");
		if (a && cArray.indexOf(a) === -1) cArray.push(a);
		var rItem = cArray.indexOf(r);
		if (rItem !== -1) cArray.splice(rItem, 1);
		e.className = cArray.join(" ");
	};
	_proto.manageState = function manageState(item) {
		var _this3 = this;
		var it = item;
		var p = it.props;
		var state = it.state;
		var stateChange = it.stateChange;
		var start = it.stickyStart;
		var change = it.stickyChange;
		var stop = it.stickyStop;
		var pv = p.positionVal;
		var se = p.scrollEl;
		var sticky = p.stickyClass;
		var stickyChange = p.stickyChangeClass;
		var stuck = p.stuckClass;
		var vp = p.verticalPosition;
		var isTop = vp !== "bottom";
		var aS = p.applyStyle;
		var ns = p.noStyles;
		var rAFStub = function rAFDummy(f) {
			f();
		};
		var rAF = !this.isWin ? rAFStub : window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || rAFStub;
		var scroll = this.isWin ? window.scrollY || window.pageYOffset : se.scrollTop;
		var notSticky = scroll > start && scroll < stop && (state === "default" || state === "stuck");
		var isSticky = isTop && scroll <= start && (state === "sticky" || state === "stuck");
		var isStuck = scroll >= stop && state === "sticky";
		if (notSticky) it.state = "sticky";
		else if (isSticky) it.state = "default";
		else if (isStuck) it.state = "stuck";
		var isStickyChange = scroll >= change && scroll <= stop;
		if (scroll < change / 2 || scroll > stop) it.stateChange = "default";
		else if (isStickyChange) it.stateChange = "sticky";
		if (state === it.state && stateChange === it.stateChange) return;
		rAF(function() {
			var _styles2, _classes, _styles3, _extends2, _classes2, _style$classes;
			var stateStyles = {
				sticky: {
					styles: (_styles2 = {
						position: pv,
						top: "",
						bottom: ""
					}, _styles2[vp] = p.stickyBitStickyOffset + "px", _styles2),
					classes: (_classes = {}, _classes[sticky] = true, _classes)
				},
				default: {
					styles: (_styles3 = {}, _styles3[vp] = "", _styles3),
					classes: {}
				},
				stuck: {
					styles: _extends((_extends2 = {}, _extends2[vp] = "", _extends2), pv === "fixed" && !ns || !_this3.isWin ? {
						position: "absolute",
						top: "",
						bottom: "0"
					} : {}),
					classes: (_classes2 = {}, _classes2[stuck] = true, _classes2)
				}
			};
			if (pv === "fixed") stateStyles.default.styles.position = "";
			var style = stateStyles[it.state];
			style.classes = (_style$classes = {}, _style$classes[stuck] = !!style.classes[stuck], _style$classes[sticky] = !!style.classes[sticky], _style$classes[stickyChange] = isStickyChange, _style$classes);
			aS(style, item);
		});
	};
	_proto.applyStyle = function applyStyle(_ref, item) {
		var styles = _ref.styles, classes = _ref.classes;
		var it = item;
		var e = it.el;
		var p = it.props;
		var stl = e.style;
		var ns = p.noStyles;
		var cArray = e.className.split(" ");
		for (var cls in classes) if (classes[cls]) {
			if (cArray.indexOf(cls) === -1) cArray.push(cls);
		} else {
			var idx = cArray.indexOf(cls);
			if (idx !== -1) cArray.splice(idx, 1);
		}
		e.className = cArray.join(" ");
		if (styles["position"]) stl["position"] = styles["position"];
		if (ns) return;
		for (var key in styles) stl[key] = styles[key];
	};
	_proto.update = function update(updatedProps) {
		var _this4 = this;
		if (updatedProps === void 0) updatedProps = null;
		this.instances.forEach(function(instance) {
			_this4.computeScrollOffsets(instance);
			if (updatedProps) for (var updatedProp in updatedProps) instance.props[updatedProp] = updatedProps[updatedProp];
		});
		return this;
	};
	_proto.removeInstance = function removeInstance(instance) {
		var _styles4, _classes3;
		var e = instance.el;
		var p = instance.props;
		this.applyStyle({
			styles: (_styles4 = { position: "" }, _styles4[p.verticalPosition] = "", _styles4),
			classes: (_classes3 = {}, _classes3[p.stickyClass] = "", _classes3[p.stuckClass] = "", _classes3)
		}, instance);
		this.toggleClasses(e.parentNode, p.parentClass);
	};
	_proto.cleanup = function cleanup() {
		for (var i = 0; i < this.instances.length; i += 1) {
			var instance = this.instances[i];
			if (instance.stateContainer) instance.props.scrollEl.removeEventListener("scroll", instance.stateContainer);
			this.removeInstance(instance);
		}
		this.manageState = false;
		this.instances = [];
	};
	return Stickybits;
}();
function stickybits(target, o) {
	return new Stickybits(target, o);
}
//#endregion
//#region node_modules/lodash.debounce/index.js
var require_lodash_debounce = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright jQuery Foundation and other contributors <https://jquery.org/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = "Expected a function";
	/** Used as references for various `Number` constants. */
	var NAN = NaN;
	/** `Object#toString` result references. */
	var symbolTag = "[object Symbol]";
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
	/** Detect free variable `self`. */
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function("return this")();
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = Object.prototype.toString;
	var nativeMax = Math.max, nativeMin = Math.min;
	/**
	* Gets the timestamp of the number of milliseconds that have elapsed since
	* the Unix epoch (1 January 1970 00:00:00 UTC).
	*
	* @static
	* @memberOf _
	* @since 2.4.0
	* @category Date
	* @returns {number} Returns the timestamp.
	* @example
	*
	* _.defer(function(stamp) {
	*   console.log(_.now() - stamp);
	* }, _.now());
	* // => Logs the number of milliseconds it took for the deferred invocation.
	*/
	var now = function() {
		return root.Date.now();
	};
	/**
	* Creates a debounced function that delays invoking `func` until after `wait`
	* milliseconds have elapsed since the last time the debounced function was
	* invoked. The debounced function comes with a `cancel` method to cancel
	* delayed `func` invocations and a `flush` method to immediately invoke them.
	* Provide `options` to indicate whether `func` should be invoked on the
	* leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	* with the last arguments provided to the debounced function. Subsequent
	* calls to the debounced function return the result of the last `func`
	* invocation.
	*
	* **Note:** If `leading` and `trailing` options are `true`, `func` is
	* invoked on the trailing edge of the timeout only if the debounced function
	* is invoked more than once during the `wait` timeout.
	*
	* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	* until to the next tick, similar to `setTimeout` with a timeout of `0`.
	*
	* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	* for details over the differences between `_.debounce` and `_.throttle`.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Function
	* @param {Function} func The function to debounce.
	* @param {number} [wait=0] The number of milliseconds to delay.
	* @param {Object} [options={}] The options object.
	* @param {boolean} [options.leading=false]
	*  Specify invoking on the leading edge of the timeout.
	* @param {number} [options.maxWait]
	*  The maximum time `func` is allowed to be delayed before it's invoked.
	* @param {boolean} [options.trailing=true]
	*  Specify invoking on the trailing edge of the timeout.
	* @returns {Function} Returns the new debounced function.
	* @example
	*
	* // Avoid costly calculations while the window size is in flux.
	* jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	*
	* // Invoke `sendMail` when clicked, debouncing subsequent calls.
	* jQuery(element).on('click', _.debounce(sendMail, 300, {
	*   'leading': true,
	*   'trailing': false
	* }));
	*
	* // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	* var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	* var source = new EventSource('/stream');
	* jQuery(source).on('message', debounced);
	*
	* // Cancel the trailing debounced invocation.
	* jQuery(window).on('popstate', debounced.cancel);
	*/
	function debounce(func, wait, options) {
		var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
		if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
		wait = toNumber(wait) || 0;
		if (isObject(options)) {
			leading = !!options.leading;
			maxing = "maxWait" in options;
			maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
			trailing = "trailing" in options ? !!options.trailing : trailing;
		}
		function invokeFunc(time) {
			var args = lastArgs, thisArg = lastThis;
			lastArgs = lastThis = void 0;
			lastInvokeTime = time;
			result = func.apply(thisArg, args);
			return result;
		}
		function leadingEdge(time) {
			lastInvokeTime = time;
			timerId = setTimeout(timerExpired, wait);
			return leading ? invokeFunc(time) : result;
		}
		function remainingWait(time) {
			var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result = wait - timeSinceLastCall;
			return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
		}
		function shouldInvoke(time) {
			var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
			return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
		}
		function timerExpired() {
			var time = now();
			if (shouldInvoke(time)) return trailingEdge(time);
			timerId = setTimeout(timerExpired, remainingWait(time));
		}
		function trailingEdge(time) {
			timerId = void 0;
			if (trailing && lastArgs) return invokeFunc(time);
			lastArgs = lastThis = void 0;
			return result;
		}
		function cancel() {
			if (timerId !== void 0) clearTimeout(timerId);
			lastInvokeTime = 0;
			lastArgs = lastCallTime = lastThis = timerId = void 0;
		}
		function flush() {
			return timerId === void 0 ? result : trailingEdge(now());
		}
		function debounced() {
			var time = now(), isInvoking = shouldInvoke(time);
			lastArgs = arguments;
			lastThis = this;
			lastCallTime = time;
			if (isInvoking) {
				if (timerId === void 0) return leadingEdge(lastCallTime);
				if (maxing) {
					timerId = setTimeout(timerExpired, wait);
					return invokeFunc(lastCallTime);
				}
			}
			if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
			return result;
		}
		debounced.cancel = cancel;
		debounced.flush = flush;
		return debounced;
	}
	/**
	* Checks if `value` is the
	* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an object, else `false`.
	* @example
	*
	* _.isObject({});
	* // => true
	*
	* _.isObject([1, 2, 3]);
	* // => true
	*
	* _.isObject(_.noop);
	* // => true
	*
	* _.isObject(null);
	* // => false
	*/
	function isObject(value) {
		var type = typeof value;
		return !!value && (type == "object" || type == "function");
	}
	/**
	* Checks if `value` is object-like. A value is object-like if it's not `null`
	* and has a `typeof` result of "object".
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	* @example
	*
	* _.isObjectLike({});
	* // => true
	*
	* _.isObjectLike([1, 2, 3]);
	* // => true
	*
	* _.isObjectLike(_.noop);
	* // => false
	*
	* _.isObjectLike(null);
	* // => false
	*/
	function isObjectLike(value) {
		return !!value && typeof value == "object";
	}
	/**
	* Checks if `value` is classified as a `Symbol` primitive or object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	* @example
	*
	* _.isSymbol(Symbol.iterator);
	* // => true
	*
	* _.isSymbol('abc');
	* // => false
	*/
	function isSymbol(value) {
		return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	/**
	* Converts `value` to a number.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to process.
	* @returns {number} Returns the number.
	* @example
	*
	* _.toNumber(3.2);
	* // => 3.2
	*
	* _.toNumber(Number.MIN_VALUE);
	* // => 5e-324
	*
	* _.toNumber(Infinity);
	* // => Infinity
	*
	* _.toNumber('3.2');
	* // => 3.2
	*/
	function toNumber(value) {
		if (typeof value == "number") return value;
		if (isSymbol(value)) return NAN;
		if (isObject(value)) {
			var other = typeof value.valueOf == "function" ? value.valueOf() : value;
			value = isObject(other) ? other + "" : other;
		}
		if (typeof value != "string") return value === 0 ? value : +value;
		value = value.replace(reTrim, "");
		var isBinary = reIsBinary.test(value);
		return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}
	module.exports = debounce;
}));
//#endregion
//#region node_modules/immutability-helper/index.js
var require_immutability_helper = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function stringifiable(obj) {
		/* istanbul ignore next */
		return typeof obj === "object" && !("toString" in obj) ? Object.prototype.toString.call(obj).slice(8, -1) : obj;
	}
	var isProduction = typeof process === "object" && true;
	function invariant(condition, message) {
		if (!condition) {
			/* istanbul ignore next */
			if (isProduction) throw new Error("Invariant failed");
			throw new Error(message());
		}
	}
	exports.invariant = invariant;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var splice = Array.prototype.splice;
	var toString = Object.prototype.toString;
	function type(obj) {
		return toString.call(obj).slice(8, -1);
	}
	var assign = Object.assign || (function(target, source) {
		getAllKeys(source).forEach(function(key) {
			if (hasOwnProperty.call(source, key)) target[key] = source[key];
		});
		return target;
	});
	var getAllKeys = typeof Object.getOwnPropertySymbols === "function" ? function(obj) {
		return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj));
	} : function(obj) {
		return Object.keys(obj);
	};
	function copy(object) {
		return Array.isArray(object) ? assign(object.constructor(object.length), object) : type(object) === "Map" ? new Map(object) : type(object) === "Set" ? new Set(object) : object && typeof object === "object" ? assign(Object.create(Object.getPrototypeOf(object)), object) : object;
	}
	var Context = function() {
		function Context() {
			this.commands = assign({}, defaultCommands);
			this.update = this.update.bind(this);
			this.update.extend = this.extend = this.extend.bind(this);
			this.update.isEquals = function(x, y) {
				return x === y;
			};
			this.update.newContext = function() {
				return new Context().update;
			};
		}
		Object.defineProperty(Context.prototype, "isEquals", {
			get: function() {
				return this.update.isEquals;
			},
			set: function(value) {
				this.update.isEquals = value;
			},
			enumerable: true,
			configurable: true
		});
		Context.prototype.extend = function(directive, fn) {
			this.commands[directive] = fn;
		};
		Context.prototype.update = function(object, $spec) {
			var _this = this;
			var spec = typeof $spec === "function" ? { $apply: $spec } : $spec;
			if (!(Array.isArray(object) && Array.isArray(spec))) invariant(!Array.isArray(spec), function() {
				return "update(): You provided an invalid spec to update(). The spec may not contain an array except as the value of $set, $push, $unshift, $splice or any custom command allowing an array value.";
			});
			invariant(typeof spec === "object" && spec !== null, function() {
				return "update(): You provided an invalid spec to update(). The spec and every included key path must be plain objects containing one of the " + ("following commands: " + Object.keys(_this.commands).join(", ") + ".");
			});
			var nextObject = object;
			getAllKeys(spec).forEach(function(key) {
				if (hasOwnProperty.call(_this.commands, key)) {
					var objectWasNextObject = object === nextObject;
					nextObject = _this.commands[key](spec[key], nextObject, spec, object);
					if (objectWasNextObject && _this.isEquals(nextObject, object)) nextObject = object;
				} else {
					var nextValueForKey = type(object) === "Map" ? _this.update(object.get(key), spec[key]) : _this.update(object[key], spec[key]);
					var nextObjectValue = type(nextObject) === "Map" ? nextObject.get(key) : nextObject[key];
					if (!_this.isEquals(nextValueForKey, nextObjectValue) || typeof nextValueForKey === "undefined" && !hasOwnProperty.call(object, key)) {
						if (nextObject === object) nextObject = copy(object);
						if (type(nextObject) === "Map") nextObject.set(key, nextValueForKey);
						else nextObject[key] = nextValueForKey;
					}
				}
			});
			return nextObject;
		};
		return Context;
	}();
	exports.Context = Context;
	var defaultCommands = {
		$push: function(value, nextObject, spec) {
			invariantPushAndUnshift(nextObject, spec, "$push");
			return value.length ? nextObject.concat(value) : nextObject;
		},
		$unshift: function(value, nextObject, spec) {
			invariantPushAndUnshift(nextObject, spec, "$unshift");
			return value.length ? value.concat(nextObject) : nextObject;
		},
		$splice: function(value, nextObject, spec, originalObject) {
			invariantSplices(nextObject, spec);
			value.forEach(function(args) {
				invariantSplice(args);
				if (nextObject === originalObject && args.length) nextObject = copy(originalObject);
				splice.apply(nextObject, args);
			});
			return nextObject;
		},
		$set: function(value, _nextObject, spec) {
			invariantSet(spec);
			return value;
		},
		$toggle: function(targets, nextObject) {
			invariantSpecArray(targets, "$toggle");
			var nextObjectCopy = targets.length ? copy(nextObject) : nextObject;
			targets.forEach(function(target) {
				nextObjectCopy[target] = !nextObject[target];
			});
			return nextObjectCopy;
		},
		$unset: function(value, nextObject, _spec, originalObject) {
			invariantSpecArray(value, "$unset");
			value.forEach(function(key) {
				if (Object.hasOwnProperty.call(nextObject, key)) {
					if (nextObject === originalObject) nextObject = copy(originalObject);
					delete nextObject[key];
				}
			});
			return nextObject;
		},
		$add: function(values, nextObject, _spec, originalObject) {
			invariantMapOrSet(nextObject, "$add");
			invariantSpecArray(values, "$add");
			if (type(nextObject) === "Map") values.forEach(function(_a) {
				var key = _a[0], value = _a[1];
				if (nextObject === originalObject && nextObject.get(key) !== value) nextObject = copy(originalObject);
				nextObject.set(key, value);
			});
			else values.forEach(function(value) {
				if (nextObject === originalObject && !nextObject.has(value)) nextObject = copy(originalObject);
				nextObject.add(value);
			});
			return nextObject;
		},
		$remove: function(value, nextObject, _spec, originalObject) {
			invariantMapOrSet(nextObject, "$remove");
			invariantSpecArray(value, "$remove");
			value.forEach(function(key) {
				if (nextObject === originalObject && nextObject.has(key)) nextObject = copy(originalObject);
				nextObject.delete(key);
			});
			return nextObject;
		},
		$merge: function(value, nextObject, _spec, originalObject) {
			invariantMerge(nextObject, value);
			getAllKeys(value).forEach(function(key) {
				if (value[key] !== nextObject[key]) {
					if (nextObject === originalObject) nextObject = copy(originalObject);
					nextObject[key] = value[key];
				}
			});
			return nextObject;
		},
		$apply: function(value, original) {
			invariantApply(value);
			return value(original);
		}
	};
	var defaultContext = new Context();
	exports.isEquals = defaultContext.update.isEquals;
	exports.extend = defaultContext.extend;
	exports.default = defaultContext.update;
	exports.default.default = module.exports = assign(exports.default, exports);
	function invariantPushAndUnshift(value, spec, command) {
		invariant(Array.isArray(value), function() {
			return "update(): expected target of " + stringifiable(command) + " to be an array; got " + stringifiable(value) + ".";
		});
		invariantSpecArray(spec[command], command);
	}
	function invariantSpecArray(spec, command) {
		invariant(Array.isArray(spec), function() {
			return "update(): expected spec of " + stringifiable(command) + " to be an array; got " + stringifiable(spec) + ". Did you forget to wrap your parameter in an array?";
		});
	}
	function invariantSplices(value, spec) {
		invariant(Array.isArray(value), function() {
			return "Expected $splice target to be an array; got " + stringifiable(value);
		});
		invariantSplice(spec.$splice);
	}
	function invariantSplice(value) {
		invariant(Array.isArray(value), function() {
			return "update(): expected spec of $splice to be an array of arrays; got " + stringifiable(value) + ". Did you forget to wrap your parameters in an array?";
		});
	}
	function invariantApply(fn) {
		invariant(typeof fn === "function", function() {
			return "update(): expected spec of $apply to be a function; got " + stringifiable(fn) + ".";
		});
	}
	function invariantSet(spec) {
		invariant(Object.keys(spec).length === 1, function() {
			return "Cannot have more than one key in an object with $set";
		});
	}
	function invariantMerge(target, specValue) {
		invariant(specValue && typeof specValue === "object", function() {
			return "update(): $merge expects a spec of type 'object'; got " + stringifiable(specValue);
		});
		invariant(target && typeof target === "object", function() {
			return "update(): $merge expects a target of type 'object'; got " + stringifiable(target);
		});
	}
	function invariantMapOrSet(target, command) {
		var typeOfTarget = type(target);
		invariant(typeOfTarget === "Map" || typeOfTarget === "Set", function() {
			return "update(): " + stringifiable(command) + " expects a target of type Set or Map; got " + stringifiable(typeOfTarget);
		});
	}
}));
//#endregion
export { require_Popover as C, zt as S, combineReducers as _, Z as a, require_lodash_xor as b, Rnd as c, useDispatch as d, Provider as f, createSelector as g, configureStore as h, index as i, require_cjs as l, import_react_dom as m, require_lodash_debounce as n, geojsonvt as o, useSelector as p, stickybits as r, require_papaparse_min as s, require_immutability_helper as t, purify as u, proj4 as v, Fe as x, require_lodash_xorby as y };

//# sourceMappingURL=vendor-debug.js.map