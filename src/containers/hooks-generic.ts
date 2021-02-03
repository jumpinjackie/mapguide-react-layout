import { IGenericSubjectMapLayer } from '../actions/defs';
import { useAppState } from '../components/map-providers/context';

export function useActiveMapSubjectLayer() {
    return useAppState<IGenericSubjectMapLayer | undefined>(state => {
        if (state.config.activeMapName) {
            return state.mapState[state.config.activeMapName].generic?.subject;
        }
        return undefined;
    });
}
