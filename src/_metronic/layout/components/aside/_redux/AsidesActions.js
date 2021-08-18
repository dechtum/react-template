import * as requestFromServer from "./AsidesCrud";
import {AsidesSlice, callTypes} from "./AsidesSlice";

const {actions} = AsidesSlice;

export const fetchAsides = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAsides(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.AsidesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find Asides";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAside = id => dispatch => {
  if (!id) {    
    return dispatch(actions.AsideFetched({ AsideForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAsideById(id)
    .then(response => {
      const Aside = response.data;
      dispatch(actions.AsideFetched({ AsideForEdit: Aside }));
    })
    .catch(error => {
      error.clientMessage = "Can't find Aside";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAside = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAside(id)
    .then(response => {
      dispatch(actions.AsideDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete Aside";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createAside = AsideForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createAside(AsideForCreation)
    .then(response => {
      const { Aside } = response.data;
    
      dispatch(actions.AsideCreated({ Aside }));
    })
    .catch(error => {
      error.clientMessage = "Can't create Aside";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAside = Aside => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAside(Aside)
    .then(() => {
      dispatch(actions.AsideUpdated({ Aside }));
    })
    .catch(error => {
      error.clientMessage = "Can't update Aside";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAsidesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForAsides(ids, status)
    .then(() => {
      dispatch(actions.AsidesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update Asides status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAsides = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAsides(ids)
    .then(() => {
      dispatch(actions.AsidesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete Asides";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
