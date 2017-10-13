import { Action, createSelector } from '@ngrx/store';
import * as actions from './collection.actions';
import { Project } from '../models';

/**
 * State
 */
export interface State {
  editId: number;
  ids: number[];
  entities: { [id: number]: Project };
}

const initialState: State = {
  editId: null,
  ids: [],
  entities: {}
};

/**
 * Selectors
 */
export const getEditId = (state: State) => state.editId;
export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getCollection = createSelector(
  getIds,
  getEntities,
  (ids, entities) => ids.map(id => entities[id]) || []
);
export const getEntityEditing = createSelector(
  getEditId,
  getEntities,
  (id, entities) => entities[id] || null
);

/**
 * Reducer
 */
export function reducer(state: State = initialState, action: actions.Actions) {
  switch (action.type) {

    case actions.LOAD_SUCCESS: {
      const projects: Project[] = action.payload;
      const projectIds = projects.map(project => project.projectId);
      const projectEntities = projects.reduce(
        (entities: { [id: number]: Project }, project: Project) =>
          Object.assign(
            entities,
            { [project.projectId]: project }
          ),
        {}
      );

      return Object.assign({}, state, {
        ids: projectIds,
        entities: projectEntities
      });
    }

    case actions.ADD_SUCCESS: {
      const project: Project = action.payload;

      return Object.assign({}, state, {
        ids: [...state.ids, project.projectId],
        entities: Object.assign({}, state.entities, {
          [project.projectId]: project
        })
      });
    }

    case actions.EDIT: {
      return Object.assign({}, state, {
        editId: action.payload
      });
    }

    case actions.UPDATE_SUCCESS: {
      const project: Project = action.payload;

      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities, {
          [project.projectId]: project
        })
      });
    }

    default: {
      return state;
    }
  }
}
