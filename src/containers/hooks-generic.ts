import { IGenericSubjectMapLayer } from 'actions/defs';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../api/common';

export function useActiveMapSubjectLayer() {
    return useSelector<IApplicationState, IGenericSubjectMapLayer | undefined>(state => {
        if (state.config.activeMapName) {
            return state.mapState[state.config.activeMapName].generic?.subject;
        }
        return undefined;
    });
}
