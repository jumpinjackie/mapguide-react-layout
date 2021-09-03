import Feature from "ol/Feature";
import Geometry from 'ol/geom/Geometry';
import { Expression, Parser } from 'expr-eval';
import { strReplaceAll } from '../utils/string';
import { isClusteredFeature } from './ol-style-helpers';
export class ExprEvalContext {
    private exprCache: {
        [expr: string]: Expression;
    };
    private filterCache: {
        [expr: string]: Expression;
    };
    private clusterExprCache: {
        [expr: string]: Expression;
    };
    private clusterFilterCache: {
        [expr: string]: Expression;
    };
    private parser: Parser;
    constructor() {
        this.exprCache = {};
        this.filterCache = {};
        this.clusterExprCache = {};
        this.clusterFilterCache = {};
        this.parser = new Parser();
        this.parser.functions.agg_sum = function (collectionProperty: any, property: string) {
            if (Array.isArray(collectionProperty)) {
                const res = collectionProperty.reduce((running, currentItem) => running + (currentItem.get(property) ?? 0), 0);
                return res;
            }
            return undefined;
        };
        this.parser.functions.arr_size = function(collectionProperty: any) {
            if (Array.isArray(collectionProperty)) {
                return collectionProperty.length;
            }
            return 1;
        }
    }
    public addFilter(expr: string) {
        if (!this.filterCache[expr]) {
            this.filterCache[expr] = this.parser.parse(expr);
        }
    }
    public addExpr(expr: string) {
        if (!this.exprCache[expr]) {
            this.exprCache[expr] = this.parser.parse(expr);
        }
    }
    public addClusterFilter(expr: string) {
        if (!this.clusterFilterCache[expr]) {
            this.clusterFilterCache[expr] = this.parser.parse(expr);
        }
    }
    public addClusterExpr(expr: string) {
        if (!this.clusterExprCache[expr]) {
            this.clusterExprCache[expr] = this.parser.parse(expr);
        }
    }
    private cleanValues(feat: Feature<Geometry>) {
        const vals = feat.getProperties();
        //UGLY: We have no guarantee that the properties in question will not have
        //spaces in them (that will break evaluation), so force the matter by replacing
        //spaces with underscores. What this means is if we find a property named "OFFICE TYPE", it
        //will be converted to "OFFICE_TYPE"
        const keys = Object.keys(vals);
        const cvals: any = {};
        for (const k of keys) {
            cvals[strReplaceAll(k, " ", "_")] = vals[k];
        }
        return cvals;
    }
    public evaluateFilter(feat: Feature<Geometry>): string | undefined {
        const cvals = this.cleanValues(feat);
        const cache = isClusteredFeature(feat) ? this.clusterFilterCache : this.filterCache;
        for (const filter in cache) {
            // Does this feature match an expression?
            if (cache[filter].evaluate(cvals) == true) {
                return filter;
            }
        }
        return undefined;
    }
    public evaluate(expr: string, feat: Feature<Geometry>): any {
        const cvals = this.cleanValues(feat);
        if (isClusteredFeature(feat)) {
            this.addClusterExpr(expr);
            return this.clusterExprCache[expr].evaluate(cvals);
        }
        else {
            this.addExpr(expr);
            return this.exprCache[expr].evaluate(cvals);
        }
    }
}
